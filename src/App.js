import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import AESPage from './pages/Projects/AESPage';
import PasabayPage from './pages/Projects/PasabayPage';
import LedgerPage from './pages/Projects/LedgerPage';
import FurniturePage from './pages/Projects/FurniturePage';
import GSOPMDPage from './pages/Projects/GSOPMDPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/projects/aes" element={<AESPage />} />
        <Route path="/projects/pasabay" element={<PasabayPage />} />
        <Route path="/projects/ledger" element={<LedgerPage />} />
        <Route path="/projects/furniture" element={<FurniturePage />} />
        <Route path="/projects/gso_pmd" element={<GSOPMDPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;