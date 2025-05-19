'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import Vapi from '@vapi-ai/web';

interface VapiContextType {
  isVapiActive: boolean;
  startVapi: () => void;
  stopVapi: () => void;
  vapiState: 'initial' | 'loading' | 'active';
}

const VapiContext = createContext<VapiContextType | undefined>(undefined);

const vapi = new Vapi('7b2422cb-d622-47b4-b6b7-38e8cb567ec1');

export const VapiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVapiActive, setIsVapiActive] = useState(false);
  const [vapiState, setVapiState] = useState<'initial' | 'loading' | 'active'>('initial');

  const startVapi = useCallback(() => {
    if (!isVapiActive) {
      vapi.start('ae62d6ef-2748-4027-b79c-b407a45c384f');
      setIsVapiActive(true);
      setVapiState('loading');
      setTimeout(() => {
        setVapiState('active');
      }, 6000);
    }
  }, [isVapiActive]);

  const stopVapi = useCallback(() => {
    if (isVapiActive) {
      vapi.stop();
      setIsVapiActive(false);
    }
  }, [isVapiActive]);

  React.useEffect(() => {
    const onCallEnd = () => setVapiState('initial');

    vapi.on('call-end', onCallEnd);

    return () => {
      vapi.off('call-end', onCallEnd);
    };
  }, []);

  return (
    <VapiContext.Provider value={{ isVapiActive, startVapi, stopVapi, vapiState }}>
      {children}
    </VapiContext.Provider>
  );
};

export const useVapi = () => {
  const context = useContext(VapiContext);
  if (context === undefined) {
    throw new Error('useVapi must be used within a VapiProvider');
  }
  return context;
}; 