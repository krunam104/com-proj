'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'th' | 'en';

type LanguageContextType = {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (content: { th: string; en: string }) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>('en');

    useEffect(() => {
        // Enforce English
        setLanguageState('en');
    }, []);

    const setLanguage = (lang: Language) => {
        // Prevent changing language
        console.warn("Language changing is disabled.");
        setLanguageState('en');
    };

    const t = (content: { th: string; en: string }) => {
        return content[language];
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
