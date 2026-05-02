import React, { useEffect, useRef } from 'react';
import { Mic, PhoneOff, AlertCircle, BarChart, CheckCircle2, ChevronRight, Clock } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useCoach } from '../hooks/useCoach';
import { SentimentMeter } from '../components/SentimentMeter';
import { CoachingCard } from '../components/CoachingCard';

const CallCoach = () => {
  const { isRecording, transcript, duration, currentChunkRef, startRecording, stopRecording } = useSpeechRecognition();
  const { history, coachingCard, sentiment, urgency, postCallData, isLoadingPostCall, generatePostCall } = useCoach(isRecording, currentChunkRef);
  
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (transcriptEndRef.current) {
      transcriptEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, transcript]);

  const handleStopRecording = () => {
    stopRecording();
    if (history.length > 0 || currentChunkRef.current.length > 0) {
      generatePostCall();
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="h-full flex flex-col bg-gray-900 text-gray-100 overflow-hidden relative">
      
      {/* Top HUD Bar */}
      <div className="h-16 border-b border-gray-800 bg-black/50 backdrop-blur-md flex items-center justify-between px-6 z-20">
        <div className="flex items-center space-x-6">
          <button
            onClick={isRecording ? handleStopRecording : startRecording}
            className={`flex items-center px-5 py-2 rounded-lg font-bold uppercase tracking-wider text-sm transition-all ${
              isRecording 
                ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20' 
                : 'bg-primary hover:bg-primary-hover text-white shadow-lg shadow-blue-500/20'
            }`}
          >
            {isRecording ? <PhoneOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
            {isRecording ? 'End Call' : 'Start Call'}
          </button>
          
          {isRecording && (
            <div className="flex items-center text-red-500 font-mono font-bold animate-pulse">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 mr-2"></div>
              LIVE
            </div>
          )}

          <div className="flex items-center text-gray-400 font-mono text-xl">
            <Clock className="w-5 h-5 mr-2" />
            {formatTime(duration)}
          </div>
        </div>

        <SentimentMeter sentiment={sentiment} urgency={urgency} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative flex">
        
        {/* Teleprompter Transcript */}
        <div className="flex-1 p-10 overflow-y-auto custom-scrollbar scroll-smooth">
          <div className="max-w-4xl mx-auto pb-40">
            {history.length === 0 && !transcript && !isRecording && !postCallData && !isLoadingPostCall && (
               <div className="flex flex-col items-center justify-center h-[60vh] opacity-30">
                 <Mic className="w-24 h-24 mb-6" />
                 <h2 className="text-3xl font-bold text-center">Ready for your call</h2>
                 <p className="text-xl mt-2 text-center">Click Start Call to begin live transcription.</p>
               </div>
            )}

            {history.map((h, i) => (
              <p key={i} className="text-3xl lg:text-4xl leading-relaxed text-gray-400 font-medium mb-6 animate-fade-in">
                {h}
              </p>
            ))}
            
            {isRecording && (
              <p className="text-3xl lg:text-5xl leading-relaxed text-white font-bold mb-6">
                {transcript || currentChunkRef.current || <span className="text-gray-600 animate-pulse">Listening...</span>}
              </p>
            )}

            {/* Post Call Render inside teleprompter view when done */}
            {isLoadingPostCall && (
              <div className="flex flex-col items-center justify-center h-[60vh]">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-2xl font-bold">Generating Intelligence Report...</p>
              </div>
            )}

            {postCallData && !isLoadingPostCall && (
              <div className="mt-12 bg-gray-800/50 border border-gray-700 rounded-3xl p-10 animate-fade-in">
                <h2 className="text-3xl font-bold mb-8 flex items-center">
                  <BarChart className="w-8 h-8 mr-4 text-primary" /> 
                  Post-Call Intelligence
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
                    <span className="text-sm text-gray-400 uppercase tracking-wider block mb-2 font-bold">Deal Score Delta</span>
                    <span className={`font-black text-5xl ${postCallData.deal_score_delta > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {postCallData.deal_score_delta > 0 ? '+' : ''}{postCallData.deal_score_delta}
                    </span>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-300 mb-4">Executive Summary</h3>
                    <ul className="space-y-3">
                      {postCallData.executive_summary.map((pt: string, i: number) => (
                        <li key={i} className="flex items-start text-lg text-gray-100">
                          <ChevronRight className="w-6 h-6 text-primary shrink-0 mt-0.5 mr-2" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {postCallData.commitments_made?.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-300 mb-4 flex items-center">
                        <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" /> Commitments
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {postCallData.commitments_made.map((pt: string, i: number) => (
                          <span key={i} className="bg-green-500/10 text-green-400 border border-green-500/30 px-4 py-2 rounded-xl text-lg font-medium">
                            {pt}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {postCallData.key_objections_raised?.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-300 mb-4 flex items-center">
                        <AlertCircle className="w-5 h-5 mr-2 text-red-500" /> Objections Raised
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {postCallData.key_objections_raised.map((obj: string, i: number) => (
                          <span key={i} className="bg-red-500/10 text-red-400 border border-red-500/30 px-4 py-2 rounded-xl text-lg font-medium">
                            {obj}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <div ref={transcriptEndRef} />
          </div>
        </div>

        {isRecording && !isLoadingPostCall && <CoachingCard coachingCard={coachingCard} />}
      </div>
    </div>
  );
};

export default CallCoach;
