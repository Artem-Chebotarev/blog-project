import { StateSchema } from 'app/providers/StoreProvider';

export const getError = (state: StateSchema) => state.loginForm?.error;
