import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { setJsonSettingsMutation } from '../../api/userApi';
import { getJsonSettings } from '../selectors/getJsonSettings/getJsonSettings.ts';
import { getUserAuthData } from '../selectors/getUserAuthData/getUserAuthData';
import { JsonSettings } from '../types/jsonSettings';

export const saveJsonSettings = createAsyncThunk<
    JsonSettings,
    JsonSettings,
    ThunkConfig<string>
>('user/saveJsonSettings', async (newJsonSettings, thunkAPI) => {
    const { rejectWithValue, getState, dispatch } = thunkAPI;

    const userData = getUserAuthData(getState());
    const currentSettings = getJsonSettings(getState());

    if (!userData) {
      return rejectWithValue('');
    }

    try {
      const response = await dispatch(setJsonSettingsMutation({
        userId: userData.id,
        jsonSettings: {
          ...currentSettings,
          ...newJsonSettings
        }
      })).unwrap();

      if (!response.jsonSettings) {
        return rejectWithValue('');
      }

      return response.jsonSettings;
    } catch (e) {
      return rejectWithValue('');
    }
});
