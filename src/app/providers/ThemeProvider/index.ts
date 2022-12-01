// Этот файл и есть Public API (то есть регулируем то, что выдаем наружу)
import { useTheme } from './hooks/useTheme';
import { ThemeProvider } from './ui/ThemeProvider';
import { Theme } from './lib/ThemeContext';

export { ThemeProvider, useTheme, Theme };
