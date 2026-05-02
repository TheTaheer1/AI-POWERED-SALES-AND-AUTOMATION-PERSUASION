import React from 'react';
import { Mic } from 'lucide-react';

export const CoachingCard = ({ coachingCard }: { coachingCard: any }) => {
  if (!coachingCard) return null;

  return (
    <div className="absolute right-8 top-8 w-[400px] flex flex-col gap-4 z-30 perspective-1000">
      {coachingCard.objection_type && (
        <div className="bg-red-950/80 backdrop-blur-lg border-l-4 border-red-500 rounded-xl p-5 shadow-2xl shadow-red-900/20 animate-slide-in-right" style={{ animationDelay: '0ms' }}>
          <span className="text-red-400 text-xs font-black uppercase tracking-widest block mb-2">Objection Detected</span>
          <p className="text-red-50 font-medium text-lg">{coachingCard.objection_type}</p>
        </div>
      )}
      
      <div className="bg-blue-950/90 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 shadow-2xl shadow-blue-900/30 animate-slide-in-right transform-gpu" style={{ animationDelay: '100ms' }}>
        <span className="text-blue-400 text-xs font-black uppercase tracking-widest block mb-3 flex items-center">
          <Mic className="w-4 h-4 mr-2" /> Suggested Response
        </span>
        <p className="text-white text-2xl font-bold leading-snug">"{coachingCard.suggested_response}"</p>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 bg-gray-800/90 backdrop-blur-lg border border-gray-700 rounded-xl p-4 shadow-xl animate-slide-in-right" style={{ animationDelay: '200ms' }}>
          <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest block mb-1">Tone</span>
          <p className="text-gray-100 font-medium">{coachingCard.tone_tip}</p>
        </div>
        <div className="flex-1 bg-green-950/80 backdrop-blur-lg border border-green-500/30 rounded-xl p-4 shadow-xl animate-slide-in-right" style={{ animationDelay: '300ms' }}>
          <span className="text-green-400 text-[10px] font-black uppercase tracking-widest block mb-1">Next Ask</span>
          <p className="text-green-50 font-medium">{coachingCard.next_question}</p>
        </div>
      </div>
    </div>
  );
};
