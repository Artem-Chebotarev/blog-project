import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { Profile, ValidateProfileError } from '../../types/profile';
import { validateProfileData } from '../validateProfileData/validateProfileData';

// 1 арг в дженерике - что возвращаем с бека
// 2 арг в дженерике - тип аргумента на входе
// 3 арг - настройки конфига thunk (AsyncThunkConfig), где можем задавать dispatch, rejectValue
export const updateProfileData = createAsyncThunk<Profile, void,
    ThunkConfig<ValidateProfileError[]>>(
        'profile/updateProfileData',
        async (_, thunkAPI) => {
            // деструктуризация из thunkAPI
            const { extra, rejectWithValue, getState } = thunkAPI;

            // используем getState внутри асинк фанков, чтобы получить стейт
            const formData = getProfileForm(getState());

            const errors = validateProfileData(formData);

            if (errors.length) {
                return rejectWithValue(errors);
            }

            try {
                const response = await extra.api.put<Profile>('/profile', formData);

                if (!response.data) {
                    throw new Error(ValidateProfileError.NO_DATA);
                }

                return response.data;
            } catch (e) {
                // обработка серверных ошибок в thunk
                return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
            }
        },
    );
