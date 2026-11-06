import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Capabilities from './pages/Capabilities';
import Security from './pages/Security';
import About from './pages/About';
import ForBusinesses from './pages/ForBusinesses';
import PageNotFound from './lib/PageNotFound';
import ScrollToTop from './components/wirrox/ScrollToTop';
import PageMetadata from './components/wirrox/PageMetadata';
import Legal from './pages/Legal';
import { RequestAccessProvider } from './components/wirrox/RequestAccessContext';

function App() {
  return (
    <Router>
      <RequestAccessProvider>
        <ScrollToTop />
        <PageMetadata />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/capabilities" element={<Capabilities />} />
          <Route path="/security" element={<Security />} />
          <Route path="/about" element={<About />} />
          <Route path="/for-businesses" element={<ForBusinesses />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/legal/:slug" element={<Legal />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </RequestAccessProvider>
    </Router>
  );
}

export default App;
