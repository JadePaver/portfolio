import './smokePolyfill';
import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LedgerPage from './pages/Projects/LedgerPage';
import { skinFor } from './transitions/skins';

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={['/projects/ledger']}>
      <LedgerPage />
    </MemoryRouter>
  );

test('renders the case study end to end', () => {
  renderPage();

  // Hero
  expect(screen.getByRole('heading', { level: 1, name: 'Ledger' })).toBeInTheDocument();
  expect(screen.getByText('Every peso, accounted for.')).toBeInTheDocument();

  // Every chapter heading
  [
    'Why budgeting apps get deleted',
    'One glance, one number',
    'Numbers that explain themselves',
    'The two missing ledgers',
    'Answers, not dashboards',
    'End to end, on device',
    'Decisions under the paint',
  ].forEach((t) => expect(screen.getByRole('heading', { name: t })).toBeInTheDocument());

  // Nine screens + six wide figures = fifteen assets
  expect(document.querySelectorAll('img').length).toBe(15);

  // Navigation affordances
  expect(screen.getAllByRole('button', { name: /all work/i }).length).toBeGreaterThan(0);
  expect(screen.getByLabelText('Scroll screens forward')).toBeInTheDocument();
});

test('the sequence runs forward to PasaBay and wraps back to the last case', () => {
  renderPage();

  // Ledger is N°01, so forward is PasaBay and there is nothing before it —
  // the backward link wraps to the end of the run and is named for that.
  expect(screen.getByRole('button', { name: /next — pasabay/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /next case — pasabay/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /last case — lms/i })).toBeInTheDocument();
});

test('clicking a figure opens the lightbox and Escape closes it', async () => {
  renderPage();

  const hero = screen.getByAltText(/three phones showing the wallets home screen/i);
  fireEvent.click(hero.closest('figure'));

  const dialog = screen.getByRole('dialog', { name: /image preview/i });
  expect(dialog).toBeInTheDocument();
  expect(screen.getByText('Ledger — presentation hero, 2025')).toBeInTheDocument();

  fireEvent.keyDown(window, { key: 'Escape' });
  await waitForElementToBeRemoved(() => screen.queryByRole('dialog'));
});

test('the hero heading is the transition wordmark landing pad', () => {
  renderPage();

  // The flight plate flies its wordmark onto this element and dissolves. The
  // morph takes its scale from the ratio of the two boxes' heights, so the
  // skin's leading has to equal the heading's or the wordmark lands at the
  // wrong size — a mismatch that is invisible in review and obvious on screen.
  const heading = screen.getByRole('heading', { level: 1, name: 'Ledger' });
  expect(heading).toHaveAttribute('data-flight-title');
  expect(heading).toHaveStyle({
    lineHeight: String(skinFor('/projects/ledger').titleLeading),
  });
});

test('a missing asset degrades to a labelled placeholder', () => {
  renderPage();

  const hero = screen.getByAltText(/three phones showing the wallets home screen/i);
  fireEvent.error(hero);

  expect(screen.getByText('images/ledger/hero.png')).toBeInTheDocument();
});
