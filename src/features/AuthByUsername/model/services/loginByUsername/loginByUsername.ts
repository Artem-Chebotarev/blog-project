import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User, userActions } from '@/entities/User';
import { ThunkErrors } from '@/shared/const/common';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<
    User,
    LoginByUsernameProps,
    ThunkConfig<string>
>('login/loginByUsername', async (authData, thunkAPI) => {
    const { dispatch, extra, rejectWithValue } = thunkAPI;

    try {
        const response = await extra.api.post<User>('/login', authData);

        if (!response.data) {
            throw new Error(ThunkErrors.NO_DATA);
        }

        dispatch(userActions.setAuthData(response.data));

        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
