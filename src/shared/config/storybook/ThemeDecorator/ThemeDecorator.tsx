import { Story } from '@storybook/react';

// eslint-disable-next-line path-checker-fsd/layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { Theme } from '@/shared/const/theme';

// eslint-disable-next-line path-checker-fsd/layer-imports
import '@/app/styles/index.scss';

export const ThemeDecorator = (theme: Theme) => (StoryComponet: Story) =>
    (
        <ThemeProvider initialTheme={theme}>
            <div className={`app ${theme}`}>
                <StoryComponet />
            </div>
        </ThemeProvider>
    );
