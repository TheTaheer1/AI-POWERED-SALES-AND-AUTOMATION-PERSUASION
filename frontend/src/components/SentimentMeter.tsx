import React from 'react';
import { Activity } from 'lucide-react';

export const SentimentMeter = ({ sentiment, urgency }: { sentiment: string, urgency: number }) => (
  <div className="flex items-center space-x-8 w-1/3">
    <div className="flex-1 flex items-center">
      <Activity className="w-4 h-4 text-gray-400 mr-3 shrink-0" />
      <div className="flex-1 h-2 rounded-full bg-gray-800 flex overflow-hidden">
        {['negative', 'neutral', 'positive'].map(s => (
          <div 
            key={s} 
            className={`flex-1 transition-colors duration-500 ${
              sentiment.toLowerCase() === s 
                ? (s === 'positive' ? 'bg-green-500' : s === 'negative' ? 'bg-red-500' : 'bg-yellow-400') 
                : 'bg-transparent'
            }`}
          />
        ))}
      </div>
    </div>
    <div className="flex-1 flex items-center">
      <span className="text-xs font-bold text-gray-500 mr-3 uppercase shrink-0">Urgency</span>
      <div className="flex-1 bg-gray-800 rounded-full h-2 overflow-hidden relative">
        <div 
          className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ease-out" 
          style={{ width: `${(urgency / 10) * 100}%` }}
        ></div>
      </div>
    </div>
  </div>
);
