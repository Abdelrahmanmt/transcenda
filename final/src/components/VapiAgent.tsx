/// <reference lib="dom" />
'use client';

import { motion } from 'framer-motion';
import React from 'react';

import { useVapi } from '@/contexts/VapiContext';

interface CustomSpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onresult: ((event: CustomSpeechRecognitionEvent) => void) | null;
  start(): void;
  stop(): void;
}

interface CustomSpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
    [index: number]: SpeechRecognitionResult;
    length: number;
    item(index: number): SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
    [index: number]: SpeechRecognitionAlternative;
    length: number;
    item(index: number): SpeechRecognitionAlternative;
    isFinal: boolean;
}

interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
}

declare global {
  interface Window {
    SpeechRecognition: new () => CustomSpeechRecognition;
    webkitSpeechRecognition: new () => CustomSpeechRecognition;
  }
}

// const vapi = new Vapi('7b2422cb-d622-47b4-b6b7-38e8cb567ec1'); // Moved to context

const VapiAgent = () => {
  const { startVapi, vapiState } = useVapi();
  // const [vapiState, setVapiState] = React.useState('initial'); // State moved to context

  // Remove the useEffect for automatic listening and wake word
  /*
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition: CustomSpeechRecognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.onresult = (event: CustomSpeechRecognitionEvent) => {
          const current = event.resultIndex;
          const transcript = event.results[current][0].transcript;
          console.log("Transcript:", transcript);

          if (transcript.toLowerCase().includes('hello')) {
            console.log('Wake word detected!');
            recognition.stop();
            setIsListening(false);
            vapi.start('ae62d6ef-2748-4027-b79c-b407a45c384f');
          }
        };

        recognition.start();

        return () => {
          recognition.stop();
          vapi.stop();
        };
      }
    }
  }, []);
  */

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <div 
        className="bg-white/10 backdrop-blur-lg rounded-lg p-4 shadow-lg border border-white/20 cursor-pointer"
        onClick={startVapi} // Call startVapi on click
      >
        <div className="flex items-center space-x-2">
          {/* Use vapiState to show status */}
          <div className={`w-3 h-3 rounded-full ${vapiState === 'active' ? 'bg-green-500 animate-pulse' : vapiState === 'loading' ? 'bg-yellow-500' : 'bg-gray-400'}`} />
          <p className="text-white text-sm">
            {/* Display text based on vapiState */}
            {vapiState === 'initial' && 'Test our AI agent'}
            {vapiState === 'loading' && 'Loading...'}
            {vapiState === 'active' && 'AI Agent Active...'}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default VapiAgent; 