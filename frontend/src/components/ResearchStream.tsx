import React from 'react';
import { Search, Loader2, Check } from 'lucide-react';

const formatToolName = (name: string) => {
  return name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

export const ResearchStream = ({ activeSteps, isLoading }: { activeSteps: any[], isLoading: boolean }) => (
  <>
    <h2 className="font-sans text-xl font-bold mb-4 flex items-center">
      Agent Execution Log
      {isLoading && <span className="ml-3 flex h-3 w-3 relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
      </span>}
    </h2>
    
    <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar pr-2">
      {activeSteps.length === 0 && (
        <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 italic">
          <Search className="w-12 h-12 mb-4 opacity-20" />
          Awaiting mission parameters...
        </div>
      )}
      
      {activeSteps.map((step, i) => (
        <div key={i} className={`bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border ${step.status === 'running' ? 'border-blue-200 dark:border-blue-800 animate-pulse-slow' : 'border-green-200 dark:border-green-800'} animate-slide-in flex items-center transition-colors duration-300`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 shrink-0 ${step.status === 'running' ? 'bg-blue-50 dark:bg-blue-900/30 text-primary' : 'bg-green-50 dark:bg-green-900/30 text-green-500'}`}>
            {step.status === 'running' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
          </div>
          <div>
            <h4 className="font-bold text-gray-900 dark:text-gray-100">{formatToolName(step.name)}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {step.status === 'running' ? 'Agent is analyzing data...' : 'Analysis complete.'}
            </p>
          </div>
        </div>
      ))}
    </div>
  </>
);
