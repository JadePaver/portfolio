import './smokePolyfill';
import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AspentechPage from './pages/Projects/AspentechPage';
import { skinFor } from './transitions/skins';

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={['/projects/aspentech']}>
      <AspentechPage />
    </MemoryRouter>
  );

test('renders the case study end to end', () => {
  renderPage();

  // Hero
  expect(screen.getByRole('heading', { level: 1, name: 'Aspentech' })).toBeInTheDocument();
  expect(screen.getByText('See it before you build it.')).toBeInTheDocument();

  // Every chapter heading. "The demo is the spec" is assembled from three
  // nodes around an italic serif word, so matching it by accessible name also
  // proves the emphasised-title shape still reads as one heading.
  [
    "Nobody buys a system they can't picture",
    'Start from something that already runs',
    'The demo is the spec',
    'Every system makes its own case',
    'The same config, in the hand',
    'Home to handover',
    'Decisions under the paint',
  ].forEach((t) => expect(screen.getByRole('heading', { name: t })).toBeInTheDocument());

  // Eleven screens + eight wide figures = nineteen assets
  expect(document.querySelectorAll('img').length).toBe(19);

  // Navigation affordances
  expect(screen.getAllByRole('button', { name: /all work/i }).length).toBeGreaterThan(0);
  expect(screen.getByLabelText('Scroll screens forward')).toBeInTheDocument();
});

test('the sequence runs forward to ICTD and back to PasaBay', () => {
  renderPage();

  // Aspentech is N°03 of five. It used to point forward at N°01, skipping the
  // two case studies that come after it.
  expect(screen.getByRole('button', { name: /next — ictd app/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /next case — ictd app/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /prev case — pasabay/i })).toBeInTheDocument();
});

test('clicking a figure opens the lightbox and Escape closes it', async () => {
  renderPage();

  const hero = screen.getByAltText(/see your future software system before you build it/i);
  fireEvent.click(hero.closest('figure'));

  const dialog = screen.getByRole('dialog', { name: /image preview/i });
  expect(dialog).toBeInTheDocument();
  expect(screen.getByText('Aspentech Solutions · homepage hero, 2026')).toBeInTheDocument();

  fireEvent.keyDown(window, { key: 'Escape' });
  await waitForElementToBeRemoved(() => screen.queryByRole('dialog'));
});

test('the hero heading is the transition wordmark landing pad', () => {
  renderPage();

  // The flight plate flies its wordmark onto this element and dissolves. The
  // morph takes its scale from the ratio of the two boxes' heights, so the
  // skin's leading has to equal the heading's or the wordmark lands at the
  // wrong size — a mismatch that is invisible in review and obvious on screen.
  const heading = screen.getByRole('heading', { level: 1, name: 'Aspentech' });
  expect(heading).toHaveAttribute('data-flight-title');
  expect(heading).toHaveStyle({
    lineHeight: String(skinFor('/projects/aspentech').titleLeading),
  });
});

test('a missing asset degrades to a labelled placeholder', () => {
  renderPage();

  const hero = screen.getByAltText(/see your future software system before you build it/i);
  fireEvent.error(hero);

  expect(screen.getByText('images/aspentech/hero.png')).toBeInTheDocument();
});
