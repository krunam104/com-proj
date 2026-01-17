'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of our game state
interface GameState {
    collectedPatterns: string[];
    peacockHealth: number; // 0-100 (Alias)
    peacockSpirit: number; // 0-100 (Source of truth)
    currentProvince: string; // Deprecated
    currentProvinceIndex: number; // 0-19
    unlockedStamps: string[]; // Alias
    completedProvinces: string[]; // Source of truth
    score: number;
}

interface GameContextType extends GameState {
    completeMission: (provinceId: string, scoreEarned: number, rewardId: string) => void;
    unlockStamp: (provinceId: string) => void;
    updateHealth: (amount: number) => void;
    setCurrentProvince: (provinceId: string) => void;
    resetGame: () => void;
    nextStage: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
    // Initialize state with default values matching strict user requirements
    const [collectedPatterns, setCollectedPatterns] = useState<string[]>([]);

    // 1. peacockSpirit (0-100), starts at 0
    const [peacockSpirit, setPeacockSpirit] = useState<number>(0);

    // 2. linear progression index
    const [currentProvinceIndex, setCurrentProvinceIndex] = useState<number>(0);

    // 3. completed provinces
    const [completedProvinces, setCompletedProvinces] = useState<string[]>([]);

    const [score, setScore] = useState<number>(0);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const savedState = localStorage.getItem('queensWeaverState_v2');
        if (savedState) {
            try {
                const parsedState = JSON.parse(savedState);
                setCollectedPatterns(parsedState.collectedPatterns || []);
                setPeacockSpirit(parsedState.peacockSpirit ?? 0);
                setCurrentProvinceIndex(parsedState.currentProvinceIndex ?? 0);
                setCompletedProvinces(parsedState.completedProvinces || []);
                setScore(parsedState.score || 0);
            } catch (error) {
                console.error('Failed to load game state:', error);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage whenever state changes
    useEffect(() => {
        if (!isLoaded) return;

        const stateToSave = {
            collectedPatterns,
            peacockSpirit,
            currentProvinceIndex,
            completedProvinces,
            score,
        };
        localStorage.setItem('queensWeaverState_v2', JSON.stringify(stateToSave));
    }, [collectedPatterns, peacockSpirit, currentProvinceIndex, completedProvinces, score, isLoaded]);

    const completeMission = (provinceId: string, scoreEarned: number, rewardId: string) => {
        setScore(prev => prev + scoreEarned);

        // Add to completed provinces if not already there
        if (!completedProvinces.includes(provinceId)) {
            setCompletedProvinces(prev => [...prev, provinceId]);
            // Increase Spirit by exactly 5
            updateHealth(5);
        }
    };

    const nextStage = () => {
        setCurrentProvinceIndex(prev => prev + 1);
    };

    // Kept distinct to allow manual unlocking if needed, but primary flow is linear
    const unlockStamp = (provinceId: string) => {
        if (!completedProvinces.includes(provinceId)) {
            setCompletedProvinces(prev => [...prev, provinceId]);
        }
    };

    const updateHealth = (amount: number) => {
        setPeacockSpirit(prev => Math.min(100, Math.max(0, prev + amount)));
    };

    const resetGame = () => {
        setCollectedPatterns([]);
        setPeacockSpirit(0);
        setCurrentProvinceIndex(0);
        setCompletedProvinces([]);
        setScore(0);
        localStorage.removeItem('queensWeaverState_v2');
    };

    // Alias for backward compatibility if components use 'peacockHealth'
    // but we encourage using peacockSpirit
    const peacockHealth = peacockSpirit;
    const unlockedStamps = completedProvinces;
    const currentProvince = ""; // Deprecated in favor of index but kept to satisfy interface

    return (
        <GameContext.Provider
            value={{
                collectedPatterns,
                peacockHealth, // Aliased to peacockSpirit
                peacockSpirit,
                currentProvince,
                currentProvinceIndex,
                unlockedStamps,
                completedProvinces,
                score,
                completeMission,
                unlockStamp,
                updateHealth,
                setCurrentProvince: () => { }, // No-op, driven by index now
                resetGame,
                nextStage,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};
