import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type PerformanceMode = 'high' | 'low';

interface PerformanceContextType {
    mode: PerformanceMode;
    setMode: (mode: PerformanceMode) => void;
    toggleMode: () => void;
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined);

const STORAGE_KEY = 'animation-performance-mode';

export const PerformanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [mode, setModeState] = useState<PerformanceMode>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return (saved as PerformanceMode) || 'high';
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, mode);
    }, [mode]);

    const setMode = (newMode: PerformanceMode) => {
        setModeState(newMode);
    };

    const toggleMode = () => {
        setModeState(prev => prev === 'high' ? 'low' : 'high');
    };

    return (
        <PerformanceContext.Provider value={{ mode, setMode, toggleMode }}>
            {children}
        </PerformanceContext.Provider>
    );
};

export const usePerformance = (): PerformanceContextType => {
    const context = useContext(PerformanceContext);
    if (!context) {
        throw new Error('usePerformance must be used within a PerformanceProvider');
    }
    return context;
};

export default PerformanceContext;
