import React from 'react';
import { Search } from 'lucide-react';
import { stats, topProspects } from '../data/mockData';
import { MetricCard } from '../components/MetricCard';

const Dashboard = () => {

  return (
    <div className="p-8 transition-colors duration-300">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Overview of your sales intelligence and performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <MetricCard key={i} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-colors duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Top Prospects by ICP Score</h2>
            <button className="text-primary text-sm font-medium hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
                  <th className="pb-3">Prospect</th>
                  <th className="pb-3">Company</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3 text-right">ICP Score</th>
                </tr>
              </thead>
              <tbody>
                {topProspects.map((prospect, i) => (
                  <tr key={i} className="border-b border-gray-50 dark:border-gray-700/50 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 font-bold text-xs">
                          {prospect.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-medium text-gray-900 dark:text-gray-200">{prospect.name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-gray-600 dark:text-gray-400">{prospect.company}</td>
                    <td className="py-4 text-gray-600 dark:text-gray-400">{prospect.role}</td>
                    <td className="py-4 text-right">
                      <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-bold text-sm">
                        {prospect.score}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col justify-center items-center text-center transition-colors duration-300">
          <div className="bg-blue-50 dark:bg-blue-900/30 w-20 h-20 rounded-full flex items-center justify-center mb-4">
            <Search className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Ready to Research?</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Use our AI agent to build a comprehensive buyer profile in seconds.</p>
          <a href="/research" className="block w-full bg-primary hover:bg-primary-hover text-white font-medium py-3 px-6 rounded-xl transition-colors shadow-md text-center">
            Start New Research
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
