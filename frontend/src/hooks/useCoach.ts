import { useState, useRef, useEffect } from 'react';
import { apiClient } from '../api/client';

export const useCoach = (isRecording: boolean, currentChunkRef: React.MutableRefObject<string>) => {
  const [history, setHistory] = useState<string[]>([]);
  const [coachingCard, setCoachingCard] = useState<any>(null);
  const [sentiment, setSentiment] = useState('neutral');
  const [urgency, setUrgency] = useState(5);
  const [postCallData, setPostCallData] = useState<any>(null);
  const [isLoadingPostCall, setIsLoadingPostCall] = useState(false);
  
  const chunkTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRecording) {
      chunkTimerRef.current = setInterval(() => {
        sendChunkToCoach();
      }, 8000);
    } else {
      if (chunkTimerRef.current) clearInterval(chunkTimerRef.current);
    }
    
    // Clear state when recording starts
    if (isRecording) {
      setHistory([]);
      setPostCallData(null);
      setCoachingCard(null);
    }
  }, [isRecording]);

  const sendChunkToCoach = async () => {
    const chunk = currentChunkRef.current.trim();
    if (!chunk) return;
    
    const newHistory = [...history, chunk];
    setHistory(newHistory);
    currentChunkRef.current = '';

    try {
      const data = await apiClient.fetchCoachingFeedback(chunk, history.slice(-5));
      
      setCoachingCard(null);
      setTimeout(() => {
        setCoachingCard(data);
        setSentiment(data.sentiment);
        setUrgency(data.urgency_to_close);
      }, 50);

    } catch (error) {
      console.error(error);
    }
  };

  const generatePostCall = async () => {
    setIsLoadingPostCall(true);
    const fullText = [...history, currentChunkRef.current].join(' ');
    
    const saved = localStorage.getItem('buyerProfile');
    let buyerProfile = null;
    if (saved) {
      buyerProfile = JSON.parse(saved);
    } else {
      buyerProfile = {
        company_info: "Unknown", contact_details: "Unknown", tech_stack: [],
        buying_signals: [], pain_points: [], icp_score: 50, personalization_hooks: []
      };
    }

    try {
      const data = await apiClient.fetchPostCallIntelligence(fullText, buyerProfile);
      setPostCallData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingPostCall(false);
    }
  };

  return {
    history,
    coachingCard,
    sentiment,
    urgency,
    postCallData,
    isLoadingPostCall,
    generatePostCall
  };
};
