import { renderHook, act } from '@testing-library/react';
import { ReactNode } from 'react';

import { Theme } from '@/shared/const/theme';

import { ThemeContext } from '../../../context/ThemeContext';

import { useTheme } from './useTheme';

describe('useTheme', () => {
    test('returns the theme and toggleTheme function', () => {
        const wrapper = ({ children }: { children: ReactNode }) => (
            <ThemeContext.Provider
                value={{ theme: Theme.DARK, setTheme: jest.fn() }}
            >
                {children}
            </ThemeContext.Provider>
        );

        const { result } = renderHook(() => useTheme(), { wrapper });
        expect(result.current.theme).toBe(Theme.DARK);
        expect(typeof result.current.toggleTheme).toBe('function');
    });

    test('returns the LIGHT theme', () => {
        const { result } = renderHook(() => useTheme());
        expect(result.current.theme).toBe(Theme.LIGHT);
        expect(typeof result.current.toggleTheme).toBe('function');
    });

    test('updates the theme from DARK to LIGHT and local storage on toggleTheme', () => {
        const setTheme = jest.fn();
        const wrapper = ({ children }: { children: ReactNode }) => (
            <ThemeContext.Provider value={{ theme: Theme.DARK, setTheme }}>
                {children}
            </ThemeContext.Provider>
        );

        const { result } = renderHook(() => useTheme(), { wrapper });

        act(() => {
            result.current.toggleTheme();
        });

        expect(setTheme).toHaveBeenCalledWith(Theme.LIGHT);
        expect(document.body.className).toBe(Theme.LIGHT);
    });
    test('updates the theme from LIGHT to ORANGE and local storage on toggleTheme', () => {
        const setTheme = jest.fn();
        const wrapper = ({ children }: { children: ReactNode }) => (
            <ThemeContext.Provider value={{ theme: Theme.LIGHT, setTheme }}>
                {children}
            </ThemeContext.Provider>
        );

        const { result } = renderHook(() => useTheme(), { wrapper });

        act(() => {
            result.current.toggleTheme();
        });

        expect(setTheme).toHaveBeenCalledWith(Theme.ORANGE);
        expect(document.body.className).toBe(Theme.ORANGE);
    });
    test('updates the theme from ORANGE to DARK and local storage on toggleTheme', () => {
        const setTheme = jest.fn();
        const wrapper = ({ children }: { children: ReactNode }) => (
            <ThemeContext.Provider value={{ theme: Theme.ORANGE, setTheme }}>
                {children}
            </ThemeContext.Provider>
        );

        const { result } = renderHook(() => useTheme(), { wrapper });

        act(() => {
            result.current.toggleTheme();
        });

        expect(setTheme).toHaveBeenCalledWith(Theme.DARK);
        expect(document.body.className).toBe(Theme.DARK);
    });
    test('updates the theme LIGHT and local storage on toggleTheme', () => {
        const setTheme = jest.fn();
        const wrapper = ({ children }: { children: ReactNode }) => (
            <ThemeContext.Provider value={{ setTheme }}>
                {children}
            </ThemeContext.Provider>
        );

        const { result } = renderHook(() => useTheme(), { wrapper });

        act(() => {
            result.current.toggleTheme();
        });

        expect(setTheme).toHaveBeenCalledWith(Theme.LIGHT);
        expect(document.body.className).toBe(Theme.LIGHT);
    });
});
