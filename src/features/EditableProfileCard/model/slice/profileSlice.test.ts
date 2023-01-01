import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { ThunkErrors } from '@/shared/const/common';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { ProfileSchema } from '../types/editableProfileCardSchema';
import { profileActions, profileReducer } from './profileSlice';

const data = {
    username: 'Admin',
    age: 22,
    country: Country.Russia,
    lastname: 'Ch',
    first: 'Art',
    city: 'New-York',
    currency: Currency.USD,
};

describe('profileSlice', () => {
    test('test set readonly', () => {
        const state: DeepPartial<ProfileSchema> = {
            readonly: false,
        };
        expect(profileReducer(state as ProfileSchema, profileActions.setReadonly(true))).toEqual({ readonly: true });
    });

    test('test cancel edit', () => {
        const state: DeepPartial<ProfileSchema> = {
            data,
            form: { username: '' },
        };

        expect(profileReducer(state as ProfileSchema, profileActions.cancelEdit())).toEqual({
            readonly: true,
            validateErrors: undefined,
            data,
            form: data,
        });
    });

    test('test update profile', () => {
        const state: DeepPartial<ProfileSchema> = {
            form: { username: 'Art' },
        };

        expect(profileReducer(state as ProfileSchema, profileActions.updateProfile({ username: 'John' }))).toEqual({
            form: {
                username: 'John',
            },
        });
    });

    test('test update profile service pending', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: false,
            validateErrors: [ThunkErrors.SERVER_ERROR],

        };

        expect(profileReducer(state as ProfileSchema, updateProfileData.pending)).toEqual({
            isLoading: true,
            validateErrors: undefined,
        });
    });

    test('test update profile service fulfilled', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: true,
        };

        expect(profileReducer(state as ProfileSchema, updateProfileData.fulfilled(data, ''))).toEqual({
            isLoading: false,
            validateErrors: undefined,
            readonly: true,
            form: data,
            data,
        });
    });

    test('test update profile service rejected', () => {
        const fn = jest.fn();
        const state: DeepPartial<ProfileSchema> = {
            isLoading: true,
            validateErrors: undefined,
        };

        expect(profileReducer(state as ProfileSchema, updateProfileData.rejected(new Error(), '', fn(), [ThunkErrors.SERVER_ERROR]))).toEqual({
            isLoading: false,
            validateErrors: [ThunkErrors.SERVER_ERROR],
        });
    });
});
