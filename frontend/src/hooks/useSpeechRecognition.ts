import { useState, useEffect, useRef } from 'react';

const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

export const useSpeechRecognition = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [duration, setDuration] = useState(0);
  
  const recognitionRef = useRef<any>(null);
  const currentChunkRef = useRef('');
  const durationTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      
      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
            currentChunkRef.current += event.results[i][0].transcript + ' ';
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        setTranscript(finalTranscript + interimTranscript);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        if(event.error === 'not-allowed') {
          setIsRecording(false);
        }
      };
      
      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch(e) {}
      }
      if (durationTimerRef.current) clearInterval(durationTimerRef.current);
    };
  }, []);

  const startRecording = () => {
    if (!recognitionRef.current) {
      alert("Speech Recognition API is not supported in this browser. Try Chrome.");
      return;
    }
    setTranscript('');
    currentChunkRef.current = '';
    setDuration(0);
    
    try {
      recognitionRef.current.start();
      setIsRecording(true);
      
      durationTimerRef.current = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    } catch(e) {
      console.error(e);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch(e) {}
    }
    setIsRecording(false);
    if (durationTimerRef.current) clearInterval(durationTimerRef.current);
  };

  return { 
    isRecording, 
    transcript, 
    duration, 
    currentChunkRef, 
    startRecording, 
    stopRecording 
  };
};
