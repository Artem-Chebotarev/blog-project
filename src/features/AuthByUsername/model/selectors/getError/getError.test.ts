import { StateSchema } from '@/app/providers/StoreProvider';
import { getError } from './getError';

describe('getError', () => {
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                error: 'error',
            },
        };
        expect(getError(state as StateSchema)).toEqual('error');
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getError(state as StateSchema)).toEqual(undefined);
    });
});
