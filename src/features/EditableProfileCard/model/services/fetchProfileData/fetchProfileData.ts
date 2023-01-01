import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Profile } from '@/entities/Profile';
import { ThunkErrors } from '@/shared/const/common';

// 1 арг в дженерике - что возвращаем с бека
// 2 арг в дженерике - тип аргумента на входе
// 3 арг - настройки конфига thunk (AsyncThunkConfig), где можем задавать dispatch, rejectValue
export const fetchProfileData = createAsyncThunk<Profile, string, ThunkConfig<string>>(
    'profile/fetchProfileData',
    async (profileId, thunkAPI) => {
        // деструктуризация из thunkAPI
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.get<Profile>(`/profile/${profileId}`);

            if (!response.data) {
                throw new Error(ThunkErrors.NO_DATA);
            }

            return response.data;
        } catch (e) {
            // обработка ошибок в thunk
            return rejectWithValue('error');
        }
    },
);
