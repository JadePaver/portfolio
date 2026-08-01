import './smokePolyfill';
import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PasabayPage from './pages/Projects/PasabayPage';
import { skinFor } from './transitions/skins';

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={['/projects/pasabay']}>
      <PasabayPage />
    </MemoryRouter>
  );

test('renders the case study end to end', () => {
  renderPage();

  // Hero
  expect(screen.getByRole('heading', { level: 1, name: 'PasaBay' })).toBeInTheDocument();
  expect(screen.getByText('Home-cooked Filipino food, sent your way.')).toBeInTheDocument();

  // Every chapter heading
  [
    'A home kitchen is not a restaurant',
    "Three screens, then you're in",
    'What the neighborhood is cooking',
    'From dish sheet to confirmed',
    'Addresses that riders can actually find',
    'Sign-up to doorstep',
    'Decisions under the paint',
  ].forEach((t) => expect(screen.getByRole('heading', { name: t })).toBeInTheDocument());

  // Ten screens + six wide figures = sixteen assets
  expect(document.querySelectorAll('img').length).toBe(16);

  // Navigation affordances
  expect(screen.getAllByRole('button', { name: /all work/i }).length).toBeGreaterThan(0);
  expect(screen.getByLabelText('Scroll screens forward')).toBeInTheDocument();
});

test('the sequence runs forward to Aspentech and back to Ledger', () => {
  renderPage();

  // PasaBay is N°02 of five, so forward is Aspentech and back is Ledger. It
  // used to offer Ledger in both directions — a leftover from when the series
  // was a pair and PasaBay really was the end of it.
  expect(screen.getByRole('button', { name: /next — aspentech/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /next case — aspentech/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /prev case — ledger/i })).toBeInTheDocument();
});

test('clicking a figure opens the lightbox and Escape closes it', async () => {
  renderPage();

  const hero = screen.getByAltText(/three phones showing the home feed/i);
  fireEvent.click(hero.closest('figure'));

  const dialog = screen.getByRole('dialog', { name: /image preview/i });
  expect(dialog).toBeInTheDocument();
  expect(screen.getByText('PasaBay — presentation hero, 2024')).toBeInTheDocument();

  fireEvent.keyDown(window, { key: 'Escape' });
  await waitForElementToBeRemoved(() => screen.queryByRole('dialog'));
});

test('the hero heading is the transition wordmark landing pad', () => {
  renderPage();

  // The flight plate flies its wordmark onto this element and dissolves. The
  // morph takes its scale from the ratio of the two boxes' heights, so the
  // skin's leading has to equal the heading's or the wordmark lands at the
  // wrong size — a mismatch that is invisible in review and obvious on screen.
  const heading = screen.getByRole('heading', { level: 1, name: 'PasaBay' });
  expect(heading).toHaveAttribute('data-flight-title');
  expect(heading).toHaveStyle({
    lineHeight: String(skinFor('/projects/pasabay').titleLeading),
  });
});

test('a missing screenshot degrades to a labelled placeholder', () => {
  renderPage();

  // The ten phone screenshots are not exported yet, so this fallback is what
  // the screens rail actually renders today.
  const shot = screen.getByAltText('PasaBay sign-in screen');
  fireEvent.error(shot);

  expect(screen.getByText('images/pasabay/scr-signin.png')).toBeInTheDocument();
});
