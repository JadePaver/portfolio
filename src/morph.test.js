import { flipBetween, morphBetween } from './transitions/morph';
import { skinFor } from './transitions/skins';

/** Rect as getBoundingClientRect reports it, for a single line of type. */
const line = ({ left, top, width, fontSize, leading }) => ({
  left,
  top,
  width,
  height: fontSize * leading,
});

test('lands the top-left corner exactly on the target', () => {
  const from = { left: 100, top: 200, width: 180, height: 40 };
  const to = { left: 340, top: 96, width: 900, height: 40 };

  const m = morphBetween(from, to);

  // With transform-origin at the top-left, translating by the corner delta is
  // what puts one box on the other.
  expect(m.x).toBe(240);
  expect(m.y).toBe(-104);
  expect(m.scale).toBe(1);
});

test('takes its scale from the height ratio, never the width', () => {
  // The destination heading is a block filling its column, so it is far wider
  // than its own text. Scaling on width would blow the wordmark up wildly.
  const from = { left: 0, top: 0, width: 160, height: 50 };
  const to = { left: 0, top: 0, width: 1196, height: 100 };

  expect(morphBetween(from, to).scale).toBe(2);
});

test('resolves the Ledger hand-off to the type-size ratio', () => {
  const leading = skinFor('/projects/ledger').titleLeading;

  // The plate's wordmark at its md size, and the case study's <h1> at the top
  // of its clamp — both Archivo 800 at the same leading.
  const plate = line({ left: 620, top: 430, width: 172, fontSize: 51.2, leading });
  const heading = line({ left: 340, top: 274, width: 1196, fontSize: 132, leading });

  const m = morphBetween(plate, heading);

  // Leading cancels, so the scale is exactly 132 / 51.2.
  expect(m.scale).toBeCloseTo(132 / 51.2, 10);
  expect(m.x).toBe(-280);
  expect(m.y).toBe(-156);
});

test('a shared leading is what makes the height ratio the size ratio', () => {
  const leading = 0.92;
  const plate = line({ left: 0, top: 0, width: 100, fontSize: 51.2, leading });
  const matched = line({ left: 0, top: 0, width: 100, fontSize: 132, leading });
  const mismatched = line({ left: 0, top: 0, width: 100, fontSize: 132, leading: 1.05 });

  expect(morphBetween(plate, matched).scale).toBeCloseTo(132 / 51.2, 10);
  // A skin whose leading drifts from its page's lands the wordmark oversized —
  // the failure the contract test in LedgerPage.smoke.test.js guards against.
  expect(morphBetween(plate, mismatched).scale).toBeGreaterThan(132 / 51.2);
});

describe('flipBetween — the lightbox growing out of its thumbnail', () => {
  test('inverts an enlarged image back onto the thumbnail exactly', () => {
    // A 240x420 thumbnail low on the page, enlarged to 600x1050 centred.
    const thumb = { left: 200, top: 600, width: 240, height: 420 };
    const full = { left: 660, top: 40, width: 600, height: 1050 };

    const f = flipBetween(thumb, full);

    // Centres: thumb (320, 810), full (960, 565).
    expect(f.x).toBe(-640);
    expect(f.y).toBe(245);
    expect(f.scaleX).toBeCloseTo(0.4, 10);
    expect(f.scaleY).toBeCloseTo(0.4, 10);
  });

  test('scales each axis on its own', () => {
    // Thumbnails are cropped with object-fit: cover, so a 16/9 tile can open
    // into a squarer picture. One uniform scale would leave an axis short.
    const cropped = { left: 0, top: 0, width: 320, height: 180 };
    const uncropped = { left: 0, top: 0, width: 640, height: 480 };

    const f = flipBetween(cropped, uncropped);

    expect(f.scaleX).toBeCloseTo(0.5, 10);
    expect(f.scaleY).toBeCloseTo(0.375, 10);
    expect(f.scaleX).not.toBeCloseTo(f.scaleY, 5);
  });

  test('needs no move when the boxes already sit on each other', () => {
    const box = { left: 120, top: 80, width: 400, height: 300 };

    expect(flipBetween(box, box)).toEqual({ x: 0, y: 0, scaleX: 1, scaleY: 1 });
  });

  test('declines when there is no thumbnail to grow from', () => {
    const real = { left: 0, top: 0, width: 400, height: 300 };
    // An image that has not loaded, or an open with no originating element.
    const empty = { left: 0, top: 0, width: 0, height: 0 };

    expect(flipBetween(real, null)).toBeNull();
    expect(flipBetween(null, real)).toBeNull();
    expect(flipBetween(real, empty)).toBeNull();
    expect(flipBetween(empty, real)).toBeNull();
  });
});

test('declines to morph when there is nothing to land on', () => {
  const real = { left: 0, top: 0, width: 100, height: 40 };
  // A page with no [data-flight-title], or a heading that has not laid out.
  const empty = { left: 0, top: 0, width: 0, height: 0 };

  expect(morphBetween(real, null)).toBeNull();
  expect(morphBetween(null, real)).toBeNull();
  expect(morphBetween(real, empty)).toBeNull();
  expect(morphBetween(empty, real)).toBeNull();
});
