import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Search, Mail, Mic, BarChart2, Zap, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Sidebar = () => {
  const { isDark, toggleTheme } = useTheme();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Research', path: '/research', icon: Search },
    { name: 'Outreach', path: '/outreach', icon: Mail },
    { name: 'Call Coach', path: '/call-coach', icon: Mic },
    { name: 'Analytics', path: '/analytics', icon: BarChart2 },
  ];

  return (
    <div className="w-64 bg-sidebar-bg text-sidebar-text flex flex-col h-full shadow-xl transition-colors duration-300">
      <div className="p-6 flex items-center space-x-3 mb-6">
        <div className="bg-primary p-2 rounded-lg">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold text-white tracking-wide">SalesGenie<span className="text-primary">.ai</span></h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-sidebar-hover text-sidebar-active shadow-md'
                  : 'hover:bg-sidebar-hover/50 hover:text-white'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="p-6 mt-auto">
        {/* Dark Mode Toggle */}
        <button 
          onClick={toggleTheme}
          className="w-full flex items-center justify-between bg-sidebar-hover/50 hover:bg-sidebar-hover text-sidebar-text px-4 py-3 rounded-xl transition-colors mb-4"
        >
          <span className="font-medium">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
          {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-blue-400" />}
        </button>

        <div className="bg-sidebar-hover p-4 rounded-xl flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-blue-400 flex items-center justify-center text-white font-bold">
            JD
          </div>
          <div>
            <p className="text-sm font-medium text-white">John Doe</p>
            <p className="text-xs text-sidebar-text">Sales Executive</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
