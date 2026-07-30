import './smokePolyfill';
import { useState } from 'react';
import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import ProjectsGrid from './components/ProjectsGrid';

// 'Design Systems' is deliberately unused by every item so the empty state is reachable.
const categories = [
  'All',
  'UI/UX',
  'Web Development',
  'Mobile App',
  'Project Management',
  'Design Systems',
];

const items = [
  {
    title: 'Ledger App',
    image: '/images/ledger_cover.png',
    category: ['UI/UX', 'Mobile App', 'Project Management'],
    link: '/ledger',
    year: '2025',
    summary: 'Multi-wallet finance app.',
    tech: [{ label: 'Dart', icon: 'dart.svg' }],
  },
  {
    title: 'LMS',
    image: '/images/lms_cover.png',
    category: ['UI/UX', 'Web Development', 'Project Management'],
    link: '/lms',
    year: '2025',
    summary: 'Coding education platform.',
    tech: [{ label: 'React', icon: 'react.svg' }],
  },
];

function Harness() {
  const [cat, setCat] = useState('All');
  return (
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <ProjectsGrid
          items={items}
          categoryValue={cat}
          onCategoryChange={setCat}
          categoryOptions={categories}
        />
      </MemoryRouter>
    </ThemeProvider>
  );
}

test('renders every project as a link to its case study', () => {
  render(<Harness />);

  const ledger = screen.getByRole('link', { name: /Ledger App — open case study/i });
  expect(ledger).toHaveAttribute('href', '/projects/ledger');
  expect(screen.getByRole('link', { name: /LMS — open case study/i })).toHaveAttribute(
    'href',
    '/projects/lms'
  );

  expect(within(ledger).getByRole('heading', { name: 'Ledger App' })).toBeInTheDocument();
  expect(within(ledger).getByText('Multi-wallet finance app.')).toBeInTheDocument();
  expect(within(ledger).getByAltText('Ledger App cover')).toBeInTheDocument();
});

test('filter buttons carry per-category counts', () => {
  render(<Harness />);
  const group = screen.getByRole('group', { name: /filter projects by category/i });
  expect(within(group).getByRole('button', { name: /^All ?2$/ })).toBeInTheDocument();
  expect(within(group).getByRole('button', { name: /^Mobile App ?1$/ })).toBeInTheDocument();
});

test('filtering narrows the grid and reports the result count', async () => {
  render(<Harness />);

  fireEvent.click(screen.getByRole('button', { name: /^Mobile App ?1$/ }));

  expect(screen.getByRole('status')).toHaveAttribute(
    'aria-label',
    '1 of 2 projects · Mobile App'
  );
  expect(screen.getByRole('link', { name: /Ledger App/i })).toBeInTheDocument();
  // The filtered-out card leaves via a 0.7s exit animation, so it clears
  // async — and slower than waitFor's 1s default allows on a busy machine.
  await waitFor(
    () => expect(screen.queryByRole('link', { name: /LMS/i })).not.toBeInTheDocument(),
    { timeout: 4000 }
  );
});

test('an empty category shows a recovery affordance that restores the grid', async () => {
  render(<Harness />);

  fireEvent.click(screen.getByRole('button', { name: /^Design Systems ?0$/ }));

  expect(await screen.findByText(/Nothing here yet/)).toBeInTheDocument();
  await waitFor(() => expect(screen.queryAllByRole('link')).toHaveLength(0), {
    timeout: 4000,
  });

  fireEvent.click(screen.getByRole('button', { name: /Show all projects/i }));

  await waitFor(() => expect(screen.getAllByRole('link')).toHaveLength(2), {
    timeout: 4000,
  });
  // The empty state leaves via its own exit animation, so it clears async too.
  await waitFor(
    () => expect(screen.queryByText(/Nothing here yet/)).not.toBeInTheDocument(),
    { timeout: 4000 }
  );
});
