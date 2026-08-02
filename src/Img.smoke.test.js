import './smokePolyfill';
import { render, screen } from '@testing-library/react';
import Img, { imageMeta } from './components/Img';
import manifest from './generated/imageManifest.json';

// A real entry, so the test breaks if the optimiser ever stops producing one.
const COVER = '/images/ledger_cover.png';

test('an optimised source is served as AVIF and WebP with the original as fallback', () => {
  render(<Img src={COVER} alt="Ledger cover" sizes="344px" />);

  const img = screen.getByAltText('Ledger cover');
  expect(img).toHaveAttribute('src', COVER);

  const sources = img.closest('picture').querySelectorAll('source');
  expect([...sources].map((s) => s.type)).toEqual(['image/avif', 'image/webp']);

  const { widths, w, h } = manifest[COVER.slice(1)];
  for (const source of sources) {
    const ext = source.type === 'image/avif' ? 'avif' : 'webp';
    expect(source.getAttribute('sizes')).toBe('344px');
    expect(source.getAttribute('srcset').split(', ')).toEqual(
      widths.map((width) => `/images-opt/images/ledger_cover-${width}.${ext} ${width}w`)
    );
  }

  // The intrinsic size is on the element so the layout holds before it loads.
  expect(img).toHaveAttribute('width', String(w));
  expect(img).toHaveAttribute('height', String(h));
});

test('images stay lazy unless marked as the one that opens the page', () => {
  const { rerender } = render(<Img src={COVER} alt="Ledger cover" />);
  expect(screen.getByAltText('Ledger cover')).toHaveAttribute('loading', 'lazy');

  rerender(<Img src={COVER} alt="Ledger cover" priority />);
  const img = screen.getByAltText('Ledger cover');
  expect(img).toHaveAttribute('loading', 'eager');
  expect(img).toHaveAttribute('fetchpriority', 'high');
});

test('an unoptimised source renders as a plain img, with no picture around it', () => {
  render(<Img src="/images/portfolio_logo.svg" alt="Logo" />);

  const img = screen.getByAltText('Logo');
  expect(imageMeta('/images/portfolio_logo.svg')).toBeNull();
  expect(img.closest('picture')).toBeNull();
  expect(img).toHaveAttribute('src', '/images/portfolio_logo.svg');
});
