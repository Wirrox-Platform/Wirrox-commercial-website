import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Capabilities from './pages/Capabilities';
import Security from './pages/Security';
import About from './pages/About';
import ForBusinesses from './pages/ForBusinesses';
import PageNotFound from './lib/PageNotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/capabilities" element={<Capabilities />} />
        <Route path="/security" element={<Security />} />
        <Route path="/about" element={<About />} />
        <Route path="/for-businesses" element={<ForBusinesses />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
