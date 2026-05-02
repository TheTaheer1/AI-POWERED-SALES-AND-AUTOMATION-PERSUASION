import React from 'react';
import { BarChart, PieChart, TrendingUp } from 'lucide-react';
import { pipelineStages, emailPerformance, icpDistribution } from '../data/mockData';

const Analytics = () => {
  const maxPipelineCount = Math.max(...pipelineStages.map(s => s.count));

  return (
    <div className="p-8 max-w-6xl mx-auto transition-colors duration-300">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Deep dive into your sales funnel and agent performance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-colors duration-300">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <BarChart className="w-5 h-5 mr-2 text-primary" />
            Pipeline by Stage
          </h2>
          <div className="space-y-4">
            {pipelineStages.map((stage, i) => (
              <div key={i} className="flex items-center">
                <div className="w-32 text-sm font-medium text-gray-600 dark:text-gray-300">{stage.stage}</div>
                <div className="flex-1 ml-4 relative">
                  <div className={`h-8 rounded-md ${stage.color} flex items-center px-3 text-white dark:text-gray-100 text-xs font-bold transition-all duration-1000 ease-out`} style={{ width: `${(stage.count / maxPipelineCount) * 100}%` }}>
                    {stage.count}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-colors duration-300">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-primary" />
            Email Performance
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {emailPerformance.map((metric, i) => (
              <div key={i} className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700 flex flex-col justify-center items-center text-center transition-colors">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{metric.label}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{metric.value}%</p>
                <p className={`text-xs font-bold mt-2 ${metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {metric.change}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-colors duration-300">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <PieChart className="w-5 h-5 mr-2 text-primary" />
          ICP Score Distribution
        </h2>
        <div className="flex h-12 rounded-xl overflow-hidden w-full">
          {icpDistribution.map((dist, i) => (
            <div 
              key={i} 
              className={`h-full flex items-center justify-center text-xs font-bold text-white cursor-pointer group relative ${
                i === 0 ? 'bg-green-600 dark:bg-green-500' : 
                i === 1 ? 'bg-green-400 dark:bg-green-400' : 
                i === 2 ? 'bg-yellow-400 dark:bg-yellow-500' : 
                i === 3 ? 'bg-orange-400 dark:bg-orange-500' : 'bg-red-400 dark:bg-red-500'
              }`}
              style={{ width: `${dist.percentage}%` }}
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-gray-900 dark:bg-gray-700 text-white px-2 py-1 rounded">
                Score {dist.range} ({dist.percentage}%)
              </span>
              {dist.percentage > 10 && `${dist.percentage}%`}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4 px-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
          <div className="flex items-center"><div className="w-3 h-3 bg-green-600 dark:bg-green-500 rounded-full mr-2"></div>90+</div>
          <div className="flex items-center"><div className="w-3 h-3 bg-green-400 dark:bg-green-400 rounded-full mr-2"></div>80-89</div>
          <div className="flex items-center"><div className="w-3 h-3 bg-yellow-400 dark:bg-yellow-500 rounded-full mr-2"></div>70-79</div>
          <div className="flex items-center"><div className="w-3 h-3 bg-orange-400 dark:bg-orange-500 rounded-full mr-2"></div>60-69</div>
          <div className="flex items-center"><div className="w-3 h-3 bg-red-400 dark:bg-red-500 rounded-full mr-2"></div>&lt;60</div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
