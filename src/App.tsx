import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Metodologia from './pages/Metodologia';
import Resultados from './pages/Resultados';
import Equipo from './pages/Equipo';
import Recursos from './pages/Recursos';
import Invertir from './pages/Invertir';

function App() {
  return (
    <Router>
      <div className="bg-white min-h-screen">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/metodologia" element={<Metodologia />} />
          <Route path="/resultados" element={<Resultados />} />
          <Route path="/equipo" element={<Equipo />} />
          <Route path="/recursos" element={<Recursos />} />
          <Route path="/invertir" element={<Invertir />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
