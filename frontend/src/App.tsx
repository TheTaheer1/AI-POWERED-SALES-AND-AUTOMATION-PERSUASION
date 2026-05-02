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

import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar with responsive classes */}
      <div className={`fixed inset-y-0 left-0 z-30 transform lg:static lg:translate-x-0 transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="bg-primary p-1.5 rounded-lg">
              <span className="text-white font-bold text-sm">SG</span>
            </div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">SalesGenie<span className="text-primary">.ai</span></h1>
          </div>
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8 flex flex-col relative">
          <div className="animate-fade-in flex-1 w-full max-w-7xl mx-auto flex flex-col">
            {children}
          </div>
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
