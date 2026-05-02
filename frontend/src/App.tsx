import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Sidebar from './components/Sidebar';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Research from './pages/Research';
import Outreach from './pages/Outreach';
import CallCoach from './pages/CallCoach';
import Analytics from './pages/Analytics';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Sidebar />
      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="animate-fade-in h-full">
          {children}
        </div>
      </main>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/research" element={<AppLayout><Research /></AppLayout>} />
          <Route path="/outreach" element={<AppLayout><Outreach /></AppLayout>} />
          <Route path="/call-coach" element={<AppLayout><CallCoach /></AppLayout>} />
          <Route path="/analytics" element={<AppLayout><Analytics /></AppLayout>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
