import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Profile } from '@/entities/Profile';
import { ThunkErrors } from '@/shared/const/common';

import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { ValidateAndThunkErrors } from '../../types/editableProfileCardSchema';
import { validateProfileData } from '../validateProfileData/validateProfileData';

export const updateProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<ValidateAndThunkErrors[]>
>('profile/updateProfileData', async (_, thunkAPI) => {
    const { extra, rejectWithValue, getState } = thunkAPI;

    const formData = getProfileForm(getState());

    const errors = validateProfileData(formData);

    if (errors.length) {
        return rejectWithValue(errors);
    }

    try {
        const response = await extra.api.put<Profile>(
            `/profile/${formData?.id}`,
            formData,
        );

        if (!response.data) {
            throw new Error(ThunkErrors.NO_DATA);
        }

        return response.data;
    } catch (e) {
        return rejectWithValue([ThunkErrors.SERVER_ERROR]);
    }
});
