import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const BuyerProfileCard = ({ buyerProfile }: { buyerProfile: any }) => (
  <div className="mt-6 p-6 border border-green-500/30 bg-green-50 dark:bg-green-500/10 rounded-2xl animate-slide-in">
    <div className="flex items-center text-green-600 dark:text-green-400 font-bold mb-4 font-sans text-xl">
      <CheckCircle2 className="w-6 h-6 mr-2" /> Profile Generated Successfully
    </div>
    <div className="grid grid-cols-2 gap-6">
      <div>
        <span className="text-gray-500 dark:text-gray-400 block text-xs uppercase tracking-wider mb-1">ICP Score</span>
        <span className="text-4xl font-black text-gray-900 dark:text-white">{buyerProfile.icp_score}</span>
      </div>
      <div>
        <span className="text-gray-500 dark:text-gray-400 block text-xs uppercase tracking-wider mb-2">Tech Stack Found</span>
        <div className="flex flex-wrap gap-2">
          {buyerProfile.tech_stack.slice(0, 3).map((tech: string, i: number) => (
            <span key={i} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-1 rounded-md text-xs font-medium text-gray-700 dark:text-gray-300 shadow-sm">{tech}</span>
          ))}
        </div>
      </div>
    </div>
    <div className="mt-6 pt-4 border-t border-green-200 dark:border-green-800/50">
      <span className="text-gray-500 dark:text-gray-400 block text-xs uppercase tracking-wider mb-2">Key Pain Point</span>
      <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">"{buyerProfile.pain_points[0]}"</p>
    </div>
  </div>
);
