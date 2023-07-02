import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { USER_LOCAL_STORAGE_KEY } from '@/shared/const/localStorage';

import { getUserDataByIdQuery } from '../../api/userApi';
import { User } from '../types/user';

export const initAuthData = createAsyncThunk<
    User,
    void,
    ThunkConfig<string>
>('user/initAuthData', async (newJsonSettings, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;

    const userId = localStorage.getItem(USER_LOCAL_STORAGE_KEY);

    if (!userId) {
      return rejectWithValue('');
    }

    try {
      const response = await dispatch(getUserDataByIdQuery(userId)).unwrap();

      if (!response.jsonSettings) {
        return rejectWithValue('');
      }

      return response;
    } catch (e) {
      return rejectWithValue('');
    }
});
