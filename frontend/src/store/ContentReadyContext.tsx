import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ContentReadyContextType {
    isContentReady: boolean;
    setContentReady: (ready: boolean) => void;
}

const ContentReadyContext = createContext<ContentReadyContextType>({
    isContentReady: false,
    setContentReady: () => { },
});

/**
 * Provider to share content ready state across the app
 * Animation components can subscribe to this to delay their animations
 * until after the loading screen has faded out
 */
export const ContentReadyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isContentReady, setContentReady] = useState(false);

    return (
        <ContentReadyContext.Provider value={{ isContentReady, setContentReady }}>
            {children}
        </ContentReadyContext.Provider>
    );
};

/**
 * Hook to check if content is ready (loading screen is gone)
 * Use this to delay animations until content is visible
 */
export const useContentReady = () => {
    const context = useContext(ContentReadyContext);
    if (!context) {
        throw new Error('useContentReady must be used within a ContentReadyProvider');
    }
    return context;
};

export default ContentReadyContext;
