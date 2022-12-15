// Этот файл и есть Public API (то есть регулируем то, что выдаем наружу)
import { useTheme } from './hooks/useTheme';
import { ThemeProvider } from './ui/ThemeProvider';
import { Theme, LOCAL_STORAGE_THEME_KEY } from './lib/ThemeContext';

export {
    ThemeProvider, useTheme, Theme, LOCAL_STORAGE_THEME_KEY,
};
