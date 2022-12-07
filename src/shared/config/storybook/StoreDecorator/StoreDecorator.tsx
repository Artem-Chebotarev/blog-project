import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { DeepPartial } from '@reduxjs/toolkit';

export const StoreDecorator = (state: DeepPartial<StateSchema>) => (StoryComponet: Story) => (
    <StoreProvider initialState={state}>
        <StoryComponet />
    </StoreProvider>
);
