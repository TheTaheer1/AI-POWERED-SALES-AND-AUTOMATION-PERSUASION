import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Bot, Mail, BarChart, Mic, ArrowRight } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col transition-colors duration-300">
      {/* Navbar */}
      <nav className="p-4 md:p-6 flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto w-full z-10 gap-4 sm:gap-0">
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <div className="bg-primary p-2 rounded-lg shadow-lg shadow-blue-500/30">
            <Zap className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-wide">SalesGenie<span className="text-primary">.ai</span></h1>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium px-3 md:px-4 py-2 transition-colors text-sm md:text-base"
          >
            Sign In
          </button>
          <button 
            onClick={() => navigate('/dashboard')}
            className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium px-4 md:px-5 py-2 md:py-2.5 rounded-xl hover:scale-105 transition-transform text-sm md:text-base whitespace-nowrap"
          >
            Go to App
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/20 dark:bg-purple-600/20 rounded-full blur-3xl"></div>

        <div className="z-10 max-w-4xl animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full font-medium text-sm mb-8 border border-blue-200 dark:border-blue-800/50">
            <span className="relative flex h-3 w-3 mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            Powered by Google Gemini 1.5
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Close more deals with <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              autonomous AI intelligence.
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            SalesGenie AI automates deep prospect research, writes hyper-personalized emails, and coaches you live during sales calls.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-xl shadow-blue-500/20 transition-all hover:-translate-y-1 flex items-center justify-center"
            >
              Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-16 md:mt-24 max-w-5xl w-full z-10 animate-fade-in" style={{animationDelay: '0.2s'}}>
          {[
            { icon: Search, title: 'Deep Research', desc: 'Agentic web scraping' },
            { icon: Mail, title: 'Smart Outreach', desc: 'Contextual sequences' },
            { icon: Mic, title: 'Live Call Coach', desc: 'Real-time objection handling' },
            { icon: BarChart, title: 'Intelligence', desc: 'Post-call summaries' },
          ].map((feat, i) => (
            <div key={i} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-100 dark:border-gray-700 p-6 rounded-2xl flex flex-col items-center text-center shadow-sm">
              <feat.icon className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">{feat.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Simple Search icon since it wasn't imported from lucide-react above
import { Search } from 'lucide-react';

export default Landing;
