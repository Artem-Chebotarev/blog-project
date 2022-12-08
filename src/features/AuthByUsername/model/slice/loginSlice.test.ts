import { DeepPartial } from '@reduxjs/toolkit';
import { LoginSchema } from '../types/loginSchema';
import { loginActions, loginReducer } from './loginSlice';

// ПИСАТЬ ТЕСТЫ НА РЕДЮСЕРЫ ИЗМЕНЯЮЩИЕ ВСЕГО ЛИШЬ ОДНО ПОЛЕ В СТЕЙТЕ - ИЗБЫТОЧНО!
describe('loginSlice', () => {
    test('test set username', () => {
        const state: DeepPartial<LoginSchema> = {
            username: 'Stefan',
        };
        expect(loginReducer(state as LoginSchema, loginActions.setUsername('Stefan'))).toEqual({ username: 'Stefan' });
    });

    test('test set password', () => {
        const state: DeepPartial<LoginSchema> = {
            password: '333',
        };
        expect(loginReducer(state as LoginSchema, loginActions.setPassword('333'))).toEqual({ password: '333' });
    });

    test('test set error', () => {
        const state: DeepPartial<LoginSchema> = {
            error: 'ERROR',
        };
        expect(loginReducer(state as LoginSchema, loginActions.setError('ERROR'))).toEqual({ error: 'ERROR' });
    });
});
