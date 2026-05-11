import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Metodologia from './pages/Metodologia';
import Resultados from './pages/Resultados';
import Equipo from './pages/Equipo';
import Recursos from './pages/Recursos';
import Invertir from './pages/Invertir';

function GAPageviews() {
  const location = useLocation();
  useEffect(() => {
    window.gtag?.('event', 'page_view', {
      page_path: location.pathname + location.search,
    });
  }, [location]);
  return null;
}

function App() {
  return (
    <Router>
      <div className="bg-white min-h-screen">
        <Navigation />
        <GAPageviews />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/metodologia" element={<Metodologia />} />
          <Route path="/resultados" element={<Resultados />} />
          <Route path="/equipo" element={<Equipo />} />
          <Route path="/recursos" element={<Recursos />} />
          <Route path="/invertir" element={<Invertir />} />
        </Routes>
        <Analytics />
      </div>
    </Router>
  );
}

export default App;
