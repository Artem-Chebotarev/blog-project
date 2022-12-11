import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { profileActions } from '../../slice/profileSlice';
import { Profile } from '../../types/profile';

// 1 арг в дженерике - что возвращаем с бека
// 2 арг в дженерике - тип аргумента на входе
// 3 арг - настройки конфига thunk (AsyncThunkConfig), где можем задавать dispatch, rejectValue
export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
    'profile/updateProfileData',
    async (_, thunkAPI) => {
        // деструктуризация из thunkAPI
        const { extra, rejectWithValue, getState } = thunkAPI;

        // используем getState внутри асинк фанков, чтобы получить стейт
        const formData = getProfileForm(getState());

        try {
            const response = await extra.api.put<Profile>('/profile', formData);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            // обработка ошибок в thunk
            return rejectWithValue('error');
        }
    },
);
