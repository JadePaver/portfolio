import './smokePolyfill';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import { RouteTransitionProvider } from './transitions/RouteTransition';
import ProjectCard from './components/ProjectCard';
import ProjectLayout from './layouts/ProjectLayout';

const project = {
  title: 'Ledger App',
  color: '#F97B0C',
  image: '/images/ledger_cover.png',
  category: ['UI/UX', 'Mobile App'],
  link: '/ledger',
  year: '2025',
  summary: 'Multi-wallet finance app.',
  tech: [{ label: 'Dart', icon: 'dart.svg' }],
};

function Harness({ start = '/' }) {
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
              path="/projects/ledger"
              element={
                <ProjectLayout title="Ledger App">
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

test('clicking a card flies its cover up as a title card, then lands on the case study', async () => {
  render(<Harness />);

  fireEvent.click(screen.getByRole('link', { name: /Ledger App — open case study/i }));

  // The overlay is aria-hidden (it is decorative), so assert on its text.
  // "Case Study" belongs to the title card alone.
  expect(await screen.findByText('Case Study')).toBeInTheDocument();
  // Its title renders alongside the card's own still-mounted heading.
  expect(screen.getAllByText('Ledger App').length).toBeGreaterThan(1);

  // The route swaps underneath while the cover still covers the screen.
  await waitFor(() => expect(screen.getByText('case study body')).toBeInTheDocument(), {
    timeout: 4000,
  });

  // ...and the overlay dissolves away rather than sticking around.
  await waitFor(() => expect(screen.queryByText('Case Study')).not.toBeInTheDocument(), {
    timeout: 4000,
  });
}, 15000);

test('Back wipes a curtain across, returns home, and clears itself', async () => {
  render(<Harness start="/projects/ledger" />);

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
