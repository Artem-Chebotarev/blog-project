import { StateSchema } from '@/app/providers/StoreProvider';

// когда левый операнд null или undefined
export const getAddCommentFormText = (state: StateSchema) =>
    state.addCommentForm?.text ?? '';

export const getAddCommentFormError = (state: StateSchema) =>
    state.addCommentForm?.error;
