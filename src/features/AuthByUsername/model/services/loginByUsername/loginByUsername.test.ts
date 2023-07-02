import { userActions } from '@/entities/User';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import { loginByUsername } from './loginByUsername';

describe('loginByUsername', () => {
    test('success login', async () => {
        const userValue = { username: 'Ivan', id: '1' };

        const thunk = new TestAsyncThunk(loginByUsername);

        thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }));

        const result = await thunk.callThunk({
            username: 'Ivan',
            password: '111',
        });

        expect(thunk.dispatch).toHaveBeenCalledWith(
            userActions.setAuthData(userValue),
        );
        // 1 раз - при вызове async thunk
        // 2 раз - при thunkAPI.dispatch(userActions.setAuthData(response.data));
        // 3 раз - при return response.data;
        expect(thunk.dispatch).toHaveBeenCalledTimes(3);
        expect(thunk.api.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(userValue);
    });

    test('error login', async () => {
        const thunk = new TestAsyncThunk(loginByUsername);

        thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));

        const result = await thunk.callThunk({
            username: 'Ivan',
            password: '111',
        });

        // без 2го раза
        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(thunk.api.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual('error');
    });
});
