import { Story } from '@storybook/react';
import { Theme, ThemeProvider } from 'app/providers/ThemeProvider';

import 'app/styles/index.scss';

export const ThemeDecorator = (theme: Theme) => (StoryComponet: Story) => (
    <div className={`app ${theme}`}>
        <ThemeProvider>
            <StoryComponet />
        </ThemeProvider>
    </div>
);
