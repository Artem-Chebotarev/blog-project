import {
    createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState,
} from 'react';

// типы не влияют на размер бандла, так как они не уходяь в бандл
type SpringType = typeof import('@react-spring/web');
type GestureType = typeof import('@use-gesture/react');

interface AnimationContextPayload {
    Gesture?: GestureType,
    Spring?: SpringType,
    isLoaded?: boolean,
}

const AnimationContext = createContext<AnimationContextPayload>({});

// Обе либы зависят друг от друга
const getAsyncAnimationModules = () => Promise.all([
    // асинхронный импорт (работает с промисами) - ленивый импорт
    import('@react-spring/web'),
    import('@use-gesture/react'),
]);

export const useAnimationLibs = () => useContext(
    AnimationContext,
) as Required<AnimationContextPayload>;

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
    // складываем библиотеки внутрь рефов
    // чтобы от рендера к рендуру был доступ к значению,
    // но не было перерисовок
    const SpringRef = useRef<SpringType>();
    const GestureRef = useRef<GestureType>();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getAsyncAnimationModules().then(([Spring, Gesture]) => {
            SpringRef.current = Spring;
            GestureRef.current = Gesture;
            setIsLoaded(true);
        });
    }, []);

    const value = useMemo(() => ({
        Gesture: GestureRef.current,
        Spring: SpringRef.current,
        isLoaded,
    }), [isLoaded]);

    return (
        <AnimationContext.Provider
            value={value}
        >
            {children}
        </AnimationContext.Provider>
    );
};
