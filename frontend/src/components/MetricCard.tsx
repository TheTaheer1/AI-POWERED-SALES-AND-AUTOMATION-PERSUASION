import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon: Icon }) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between transition-colors duration-300 hover:shadow-md">
    <div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</h3>
      <p className="text-sm text-green-500 font-medium mt-1">{change} vs last month</p>
    </div>
    <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl">
      <Icon className="w-8 h-8 text-primary" />
    </div>
  </div>
);
