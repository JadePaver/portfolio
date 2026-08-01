import './smokePolyfill';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import { RouteTransitionProvider } from './transitions/RouteTransition';
import ProjectCard from './components/ProjectCard';
import ProjectLayout from './layouts/ProjectLayout';

// Furniture has no registered transition skin, so it exercises the portfolio
// default. Every project on the home grid now claims one, so the fallback path
// has to be covered by one of the routes that is still on the old layout.
const plain = {
  title: 'Furniture',
  color: '#F97B0C',
  image: '/images/furniture1.png',
  category: ['UI/UX', '3D'],
  link: '/furniture',
  year: '2025',
  summary: 'Furniture visualisation.',
  tech: [{ label: 'React', icon: 'react.svg' }],
};

// Ledger claims its own skin in transitions/skins.js.
const ledger = {
  title: 'Ledger App',
  color: '#12B48F',
  image: '/images/ledger_cover.png',
  category: ['UI/UX', 'Mobile App'],
  link: '/ledger',
  year: '2025',
  summary: 'Multi-wallet finance app.',
  tech: [{ label: 'Dart', icon: 'dart.svg' }],
};

function Harness({ project = plain, start = '/' }) {
  const path = `/projects${project.link}`;
  return (
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[start]}>
        <RouteTransitionProvider>
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <p>home grid</p>
                  <ProjectCard project={project} />
                </div>
              }
            />
            <Route
              path={path}
              element={
                <ProjectLayout title={project.title}>
                  <p>case study body</p>
                </ProjectLayout>
              }
            />
          </Routes>
        </RouteTransitionProvider>
      </MemoryRouter>
    </ThemeProvider>
  );
}

const openCard = (name) =>
  fireEvent.click(screen.getByRole('link', { name: new RegExp(`${name} — open case study`, 'i') }));

test('clicking a card flies its cover up as a title card, then lands on the case study', async () => {
  render(<Harness />);

  openCard('Furniture');

  // The overlay is aria-hidden (it is decorative), so assert on its text.
  // "Case Study" is the default skin's kicker and belongs to the title card alone.
  expect(await screen.findByText('Case Study')).toBeInTheDocument();
  // Its title renders alongside the card's own still-mounted heading.
  expect(screen.getAllByText('Furniture').length).toBeGreaterThan(1);

  // The route swaps underneath while the cover still covers the screen.
  await waitFor(() => expect(screen.getByText('case study body')).toBeInTheDocument(), {
    timeout: 4000,
  });

  // ...and the overlay dissolves away rather than sticking around.
  await waitFor(() => expect(screen.queryByText('Case Study')).not.toBeInTheDocument(), {
    timeout: 4000,
  });
}, 15000);

test('a route with its own skin dresses the title card in it', async () => {
  render(<Harness project={ledger} />);

  openCard('Ledger App');

  // Ledger's skin overrides both the kicker and the title, so the plate hands
  // off to the wordmark the case study actually opens with.
  expect(await screen.findByText('Case study N°01')).toBeInTheDocument();
  expect(screen.getByText('Ledger')).toBeInTheDocument();
  expect(screen.queryByText('Case Study')).not.toBeInTheDocument();

  await waitFor(() => expect(screen.getByText('case study body')).toBeInTheDocument(), {
    timeout: 4000,
  });
  await waitFor(
    () => expect(screen.queryByText('Case study N°01')).not.toBeInTheDocument(),
    { timeout: 4000 }
  );
}, 15000);

test('resets scroll instantly rather than gliding the page up', async () => {
  // <html> carries `scroll-behavior: smooth` for the in-page jumps, and the
  // two-argument scrollTo obeys it. If the route reset inherits that, arriving
  // at a page animates it up from the previous page's offset, dragging every
  // reveal through the viewport and firing all of them before you get there.
  const seen = [];
  const spy = jest
    .spyOn(window, 'scrollTo')
    .mockImplementation(() => seen.push(document.documentElement.style.scrollBehavior));

  render(<Harness />);
  openCard('Furniture');

  await waitFor(() => expect(screen.getByText('case study body')).toBeInTheDocument(), {
    timeout: 4000,
  });

  expect(seen.length).toBeGreaterThan(0);
  expect(seen.every((behaviour) => behaviour === 'auto')).toBe(true);

  spy.mockRestore();
}, 15000);

test('Back wipes a curtain across, returns home, and clears itself', async () => {
  render(<Harness start="/projects/furniture" />);

  expect(screen.getByText('case study body')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /back/i }));

  expect(await screen.findByText('Back to projects')).toBeInTheDocument();

  await waitFor(() => expect(screen.getByText('home grid')).toBeInTheDocument(), {
    timeout: 4000,
  });

  await waitFor(
    () => expect(screen.queryByText('Back to projects')).not.toBeInTheDocument(),
    { timeout: 4000 }
  );
}, 15000);

test('the curtain still runs on a skinned route', async () => {
  render(<Harness project={ledger} start="/projects/ledger" />);

  fireEvent.click(screen.getByRole('button', { name: /back/i }));

  expect(await screen.findByText('Back to projects')).toBeInTheDocument();

  await waitFor(() => expect(screen.getByText('home grid')).toBeInTheDocument(), {
    timeout: 4000,
  });
  await waitFor(
    () => expect(screen.queryByText('Back to projects')).not.toBeInTheDocument(),
    { timeout: 4000 }
  );
}, 15000);
