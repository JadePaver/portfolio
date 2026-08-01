import {
  CASE_SERIES,
  caseNumber,
  seriesFor,
} from './pages/Projects/caseStudy/series';
import { DEFAULT_SKIN, skinFor } from './transitions/skins';

// The order the case studies are numbered in — the same order their hero
// kickers, header labels, footer labels and transition skins all claim.
const ORDER = ['ledger', 'pasabay', 'aspentech', 'ictd', 'lms'];

test('the series is the numbered run, in order', () => {
  expect(CASE_SERIES.map((c) => c.key)).toEqual(ORDER);
});

test('each entry is keyed by the colourway its page hands the template', () => {
  // `seriesFor` is looked up by `theme.key`, so an entry whose theme disagrees
  // with its key would simply never be found.
  CASE_SERIES.forEach((entry) => expect(entry.theme.key).toBe(entry.key));
});

test('every case study points at the one after it', () => {
  // What this replaces: five hand-written sibling links, four of them wrong.
  // N°02 pointed backwards at N°01, N°03 and N°05 both pointed at N°01 from
  // inside the run, and N°04 pointed back at N°03 while calling it "next".
  ORDER.forEach((key, i) => {
    expect(seriesFor(key).next.key).toBe(ORDER[(i + 1) % ORDER.length]);
  });
});

test('every case study points back at the one before it', () => {
  ORDER.forEach((key, i) => {
    expect(seriesFor(key).prev.key).toBe(
      ORDER[(i - 1 + ORDER.length) % ORDER.length]
    );
  });
});

test('walking next from the first returns to the first', () => {
  // Walking the ring rather than spot-checking a pair: this is the assertion
  // that stays true as the series grows, and the one that would have caught
  // the original drift the moment the third case study landed.
  const walked = [];
  let cursor = seriesFor(ORDER[0]);

  for (let i = 0; i < ORDER.length; i += 1) {
    walked.push(cursor.key);
    cursor = seriesFor(cursor.next.key);
  }

  expect(walked).toEqual(ORDER);
  expect(cursor.key).toBe(ORDER[0]);
});

test('the ends wrap, and the wording says so', () => {
  // The last case study's "next" is the first one. Calling that "Next" would
  // promise a sixth case study, so the wrap is named for what it is.
  expect(seriesFor('lms').next).toMatchObject({
    key: 'ledger',
    wraps: true,
    label: 'First — Ledger',
  });
  expect(seriesFor('ledger').prev).toMatchObject({
    key: 'lms',
    wraps: true,
    label: 'Last — LMS',
  });

  // Mid-run, both directions read plainly.
  expect(seriesFor('ledger').next).toMatchObject({
    wraps: false,
    label: 'Next — PasaBay',
  });
  expect(seriesFor('lms').prev).toMatchObject({
    wraps: false,
    label: 'Prev — ICTD App',
  });
});

test('a case study number is its position in the run', () => {
  expect(CASE_SERIES.map((_, i) => caseNumber(i))).toEqual([
    'N°01',
    'N°02',
    'N°03',
    'N°04',
    'N°05',
  ]);
  expect(seriesFor('aspentech').number).toBe('N°03');
  expect(seriesFor('aspentech').next.number).toBe('N°04');
  expect(seriesFor('aspentech').total).toBe(ORDER.length);
});

test('every destination is a route the transition already dresses', () => {
  CASE_SERIES.forEach(({ path, name }) => {
    // A mistyped path would still navigate — to the 404 — and would wear the
    // portfolio orange on the way rather than the case study's own colour, so
    // falling back to the default skin is the signal that catches it.
    const skin = skinFor(path);
    expect(skin).not.toBe(DEFAULT_SKIN);

    // The flight plate flies this word onto the destination's <h1> while the
    // link that started the journey promises the same word. One string.
    expect(skin.title).toBe(name);
  });
});

test('a colourway outside the run drops the sequence instead of throwing', () => {
  expect(seriesFor('not-a-case-study')).toBeNull();
});
