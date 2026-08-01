import './smokePolyfill';
import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LMSPage from './pages/Projects/LMSPage';
import { skinFor } from './transitions/skins';

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={['/projects/lms']}>
      <LMSPage />
    </MemoryRouter>
  );

test('renders the case study end to end', () => {
  renderPage();

  // Hero
  expect(screen.getByRole('heading', { level: 1, name: 'LMS' })).toBeInTheDocument();
  expect(screen.getByText('Learn to code, one line at a time.')).toBeInTheDocument();

  // The brief, all five chapters, the screens rail and the notes. LMS is the
  // first case study to run five chapters, so this list is also the guard that
  // the extra one is actually laid out rather than silently dropped.
  [
    "Reading about code isn't writing it",
    'Eighteen modules, six tracks, one grid',
    'Lessons and assessments, side by side',
    'Write, run and submit in the browser',
    'Everything an instructor ships, in one list',
    'Grade with the whole picture in view',
    'Sign-in to graded, six screens',
    'Decisions under the paint',
  ].forEach((t) => expect(screen.getByRole('heading', { name: t })).toBeInTheDocument());

  // Six screens + seven wide figures = thirteen assets
  expect(document.querySelectorAll('img').length).toBe(13);

  // Navigation affordances
  expect(screen.getAllByRole('button', { name: /all work/i }).length).toBeGreaterThan(0);
  expect(screen.getByLabelText('Scroll screens forward')).toBeInTheDocument();
});

test('the sequence wraps forward to Ledger and runs back to ICTD', () => {
  renderPage();

  // LMS is N°05, the end of the run, so the forward link loops to the first
  // case study — and is named "First" rather than promising a sixth.
  expect(screen.getByRole('button', { name: /first — ledger/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /first case — ledger/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /prev case — ictd app/i })).toBeInTheDocument();
});

test('clicking a figure opens the lightbox and Escape closes it', async () => {
  renderPage();

  const hero = screen.getByAltText(/module catalog and the browser code editor/i);
  fireEvent.click(hero.closest('figure'));

  const dialog = screen.getByRole('dialog', { name: /image preview/i });
  expect(dialog).toBeInTheDocument();
  expect(screen.getByText('LMS — presentation hero, 2026')).toBeInTheDocument();

  fireEvent.keyDown(window, { key: 'Escape' });
  await waitForElementToBeRemoved(() => screen.queryByRole('dialog'));
});

test('the hero heading is the transition wordmark landing pad', () => {
  renderPage();

  // The flight plate flies its wordmark onto this element and dissolves. The
  // morph takes its scale from the ratio of the two boxes' heights, so the
  // skin's leading has to equal the heading's or the wordmark lands at the
  // wrong size — a mismatch that is invisible in review and obvious on screen.
  const heading = screen.getByRole('heading', { level: 1, name: 'LMS' });
  expect(heading).toHaveAttribute('data-flight-title');
  expect(heading).toHaveStyle({
    lineHeight: String(skinFor('/projects/lms').titleLeading),
  });
});

test('a missing asset degrades to a labelled placeholder', () => {
  renderPage();

  const hero = screen.getByAltText(/module catalog and the browser code editor/i);
  fireEvent.error(hero);

  expect(screen.getByText('images/lms/hero.png')).toBeInTheDocument();
});
