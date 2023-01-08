import { AnyAction, ReducersMapObject } from '@reduxjs/toolkit';

import { loginReducer } from '@/features/AuthByUsername/testing';

import { StateSchema } from './StateSchema';
import { createReducerManager } from './reducerManager';

describe('reducerManager', () => {
    const mountedReducers = [];

    const initialReducers = {
        loginForm: loginReducer,
    };

    const reducers = { ...initialReducers };

    const reducerManager = createReducerManager(
        reducers as ReducersMapObject<StateSchema, AnyAction>,
    );

    test('reducer is not added', () => {
        reducerManager.add('' as keyof StateSchema, loginReducer);

        expect(mountedReducers.length).toBe(0);
    });
    test('reducer is not removed', () => {
        reducerManager.remove('' as keyof StateSchema);

        expect(mountedReducers.length).toBe(0);
    });
});
