import { Story } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

export const RouterDecorator = (StoryComponet: Story) => (
    <BrowserRouter>
        <StoryComponet />
    </BrowserRouter>
);
