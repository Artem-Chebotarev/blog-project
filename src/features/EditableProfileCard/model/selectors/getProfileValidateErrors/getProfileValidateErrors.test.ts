import { StateSchema } from '@/app/providers/StoreProvider';

import { ValidateProfileError } from '../../consts/consts';

import { getProfileValidateErrors } from './getProfileValidateErrors';

describe('getProfileReadonly', () => {
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                validateErrors: [ValidateProfileError.INCORRECT_AGE],
            },
        };
        expect(getProfileValidateErrors(state as StateSchema)).toEqual([
            ValidateProfileError.INCORRECT_AGE,
        ]);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileValidateErrors(state as StateSchema)).toEqual(
            undefined,
        );
    });
});
