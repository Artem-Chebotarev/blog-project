import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { loginReducer } from '@/features/AuthByUsername/testing';
import { ReducersList } from '@/shared/lib/helpers/hooks/useDynamicModuleLoad/useDynamicModuleLoad';
import { articleDetailsReducer } from '@/entities/Article/testing';
import { addCommentFormReducer } from '@/features/AddCommentForm/testing';
import { articleDetailsPageReducer } from '@/pages/ArticleDetailsPage/testing';
import { profileReducer } from '@/features/EditableProfileCard/testing';

const defaultAsyncReducers: ReducersList = {
    loginForm: loginReducer,
    profile: profileReducer,
    articleDetails: articleDetailsReducer,
    addCommentForm: addCommentFormReducer,
    articleDetailsPage: articleDetailsPageReducer,
};

// в сторибук можем задавать любые асинхронные редьюсеры для каждого компонента
export const StoreDecorator = (
    state: DeepPartial<StateSchema>,
    asyncReducers?: ReducersList,
) => (StoryComponet: Story) => (
    <StoreProvider
        initialState={state}
        asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
    >
        <StoryComponet />
    </StoreProvider>
);
