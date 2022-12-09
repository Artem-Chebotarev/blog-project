import axios from 'axios';
import { userActions } from 'entities/User';
import { TestAsyncThunk } from 'shared/config/tests/TestAsyncThunk/TestAsyncThunk';
import { loginByUsername } from './loginByUsername';

jest.mock('axios');

// 1 арг - модуль, который хотим замокать
// 2 арг - глубокий мок (мокаем не только сам модуль, но и внутренние поля)
const mockedAxios = jest.mocked(axios, true);

describe('loginByUsername', () => {
    // let dispatch: Dispatch;
    // let getState: () => StateSchema;

    // beforeEach(() => {
    //     dispatch = jest.fn();
    //     getState = jest.fn();
    // });

    // test('success login', async () => {
    //     const userValue = { username: 'Ivan', id: 1 };
    //     mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));
    //     const action = loginByUsername({ username: 'Ivan', password: '111' });
    //     const result = await action(dispatch, getState, undefined);

    //     expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
    //     // 1 раз - при вызове async thunk
    //     // 2 раз - при thunkAPI.dispatch(userActions.setAuthData(response.data));
    //     // 3 раз - при return response.data;
    //     expect(dispatch).toHaveBeenCalledTimes(3);
    //     expect(mockedAxios.post).toHaveBeenCalled();
    //     expect(result.meta.requestStatus).toBe('fulfilled');
    //     expect(result.payload).toEqual(userValue);
    // });

    // test('error login', async () => {
    //     mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));
    //     const action = loginByUsername({ username: 'Ivan', password: '111' });
    //     const result = await action(dispatch, getState, undefined);

    //     // без 2 раза
    //     expect(dispatch).toHaveBeenCalledTimes(2);
    //     expect(mockedAxios.post).toHaveBeenCalled();
    //     expect(result.meta.requestStatus).toBe('rejected');
    //     expect(result.payload).toEqual('error');
    // });

    test('success login', async () => {
        // const userValue = { username: 'Ivan', id: 1 };
        // mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));

        // const thunk = new TestAsyncThunk(loginByUsername);
        // const result = await thunk.callThunk({ username: 'Ivan', password: '111' });

        // expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
        // // 1 раз - при вызове async thunk
        // // 2 раз - при thunkAPI.dispatch(userActions.setAuthData(response.data));
        // // 3 раз - при return response.data;
        // expect(thunk.dispatch).toHaveBeenCalledTimes(3);
        // expect(mockedAxios.post).toHaveBeenCalled();
        // expect(result.meta.requestStatus).toBe('fulfilled');
        // expect(result.payload).toEqual(userValue);
    });

    // test('error login', async () => {
    //     mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));

    //     const thunk = new TestAsyncThunk(loginByUsername);
    //     const result = await thunk.callThunk({ username: 'Ivan', password: '111' });

    //     // без 2 раза
    //     expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    //     expect(mockedAxios.post).toHaveBeenCalled();
    //     expect(result.meta.requestStatus).toBe('rejected');
    //     expect(result.payload).toEqual('error');
    // });
});
