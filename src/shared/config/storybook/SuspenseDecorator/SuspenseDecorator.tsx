import { Story } from '@storybook/react';
import { Suspense } from 'react';

export const SuspenseDecorator = (StoryComponet: Story) => (
    <Suspense>
        <StoryComponet />
    </Suspense>
);
