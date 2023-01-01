import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User, userActions } from '@/entities/User';
import { ThunkErrors } from '@/shared/const/common';
import { USER_LOCAL_STORAGE_KEY } from '@/shared/const/localStorage';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

// 1 арг в дженерике - что возвращаем с бека
// 2 арг в дженерике - тип аргумента на входе
// 3 арг - настройки конфига thunk (AsyncThunkConfig), где можем задавать dispatch, rejectValue
export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, ThunkConfig<string>>(
    'login/loginByUsername',
    // деструктуризация из thunkAPI
    async (authData, thunkAPI) => {
        const { dispatch, extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.post<User>('/login', authData);

            // если ответ от сервера пришел пустой, то это будет ошибкой
            if (!response.data) {
                throw new Error(ThunkErrors.NO_DATA);
            }

            localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(response.data));

            dispatch(userActions.setAuthData(response.data));

            return response.data;
        } catch (e) {
            // обработка ошибок в thunk
            return rejectWithValue('error');
        }
    },
);
