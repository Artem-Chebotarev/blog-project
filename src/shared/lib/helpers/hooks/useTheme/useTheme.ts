import { useContext } from 'react';

import { LOCAL_STORAGE_THEME_KEY } from '../../../../const/localStorage';
import { Theme } from '../../../../const/theme';
import { ThemeContext } from '../../../context/ThemeContext';

interface UseThemeResult {
    toggleTheme: () => void;
    theme: Theme;
}

/**
 * Хук для переключения темы
 * @returns
 */
export function useTheme(): UseThemeResult {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
        let newTheme: Theme;
        switch (theme) {
            case Theme.DARK:
                newTheme = Theme.LIGHT;
                break;
            case Theme.LIGHT:
                newTheme = Theme.ORANGE;
                break;
            case Theme.ORANGE:
                newTheme = Theme.DARK;
                break;
            default:
                newTheme = Theme.LIGHT;
        }
        // опшеонал чейнинг для функции
        setTheme?.(newTheme);
        // надо при маунте приложения просто тему из локал стороджа брать и накидывать на body
        document.body.className = newTheme;
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    };

    return {
        theme: theme || Theme.LIGHT,
        toggleTheme,
    };
}
