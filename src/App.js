import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './App.css';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import AESPage from './pages/Projects/AESPage';
import PasabayPage from './pages/Projects/PasabayPage';
import LedgerPage from './pages/Projects/LedgerPage';
import FurniturePage from './pages/Projects/FurniturePage';
import GSOPMDPage from './pages/Projects/GSOPMDPage';
import AspentechPage from './pages/Projects/AspentechPage';
import ICTDPage from './pages/Projects/ICTDPage';
import LMSPage from './pages/Projects/LMSPage';
import Page404 from './pages/Page404';
import { RouteTransitionProvider } from './transitions/RouteTransition';

// Let the app control scroll on route change instead of the browser
// restoring the previous position, which made pages open scrolled down.
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/projects/aes" element={<AESPage />} />
        <Route path="/projects/pasabay" element={<PasabayPage />} />
        <Route path="/projects/ledger" element={<LedgerPage />} />
        <Route path="/projects/furniture" element={<FurniturePage />} />
        <Route path="/projects/gso_pmd" element={<GSOPMDPage />} />
        <Route path="/projects/aspentech" element={<AspentechPage />} />
        <Route path="/projects/ictd" element={<ICTDPage />} />
        <Route path="/projects/lms" element={<LMSPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <HashRouter>
      <RouteTransitionProvider>
        <AnimatedRoutes />
      </RouteTransitionProvider>
    </HashRouter>
  );
}

export default App;