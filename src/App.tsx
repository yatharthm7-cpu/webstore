import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Store from './pages/Store';
import Leaderboards from './pages/Leaderboards';
import StaffGuide from './pages/StaffGuide';
import MediaGuide from './pages/MediaGuide';
import Login from './pages/Login';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col font-sans">
          <Toaster theme="dark" position="bottom-right" />
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/store" element={<Store />} />
              <Route path="/leaderboard" element={<Leaderboards />} />
              <Route path="/guides/staff" element={<StaffGuide />} />
              <Route path="/guides/media" element={<MediaGuide />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

