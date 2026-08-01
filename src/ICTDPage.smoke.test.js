import './smokePolyfill';
import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ICTDPage from './pages/Projects/ICTDPage';
import { skinFor } from './transitions/skins';

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={['/projects/ictd']}>
      <ICTDPage />
    </MemoryRouter>
  );

test('renders the case study end to end', () => {
  renderPage();

  // Hero
  expect(screen.getByRole('heading', { level: 1, name: 'ICTD App' })).toBeInTheDocument();
  expect(screen.getByText('Asset & custody management.')).toBeInTheDocument();

  // Every chapter heading. The requests lead pivots on an italic serif clause,
  // so matching the plain heading beside it also proves the paper chapters
  // still assemble as one head row.
  [
    'Where the logbook kept failing',
    'Every request keeps its own thread',
    'Book it in, track it out',
    'Triage from one board',
    'Ask the person holding your unit',
    'Sign-in to sign-off',
    'Decisions under the paint',
  ].forEach((t) => expect(screen.getByRole('heading', { name: t })).toBeInTheDocument());

  // Nine screens + seven wide figures = sixteen assets
  expect(document.querySelectorAll('img').length).toBe(16);

  // Navigation affordances
  expect(screen.getAllByRole('button', { name: /all work/i }).length).toBeGreaterThan(0);
  expect(screen.getByLabelText('Scroll screens forward')).toBeInTheDocument();
});

test('the sequence runs forward to LMS and back to Aspentech', () => {
  renderPage();

  // ICTD is N°04 of five. Its "next" used to point at N°03 — backwards, while
  // still calling itself next.
  expect(screen.getByRole('button', { name: /next — lms/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /next case — lms/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /prev case — aspentech/i })).toBeInTheDocument();
});

test('clicking a figure opens the lightbox and Escape closes it', async () => {
  renderPage();

  const hero = screen.getByAltText(/sign in, requests, and repairs on three phones/i);
  fireEvent.click(hero.closest('figure'));

  const dialog = screen.getByRole('dialog', { name: /image preview/i });
  expect(dialog).toBeInTheDocument();
  expect(screen.getByText('ICTD App — presentation hero, 2026')).toBeInTheDocument();

  fireEvent.keyDown(window, { key: 'Escape' });
  await waitForElementToBeRemoved(() => screen.queryByRole('dialog'));
});

test('the hero heading is the transition wordmark landing pad', () => {
  renderPage();

  // The flight plate flies its wordmark onto this element and dissolves. The
  // morph takes its scale from the ratio of the two boxes' heights, so the
  // skin's leading has to equal the heading's or the wordmark lands at the
  // wrong size — a mismatch that is invisible in review and obvious on screen.
  const heading = screen.getByRole('heading', { level: 1, name: 'ICTD App' });
  expect(heading).toHaveAttribute('data-flight-title');
  expect(heading).toHaveStyle({
    lineHeight: String(skinFor('/projects/ictd').titleLeading),
  });
});

test('a missing asset degrades to a labelled placeholder', () => {
  renderPage();

  const hero = screen.getByAltText(/sign in, requests, and repairs on three phones/i);
  fireEvent.error(hero);

  expect(screen.getByText('images/ictd/hero.png')).toBeInTheDocument();
});
