import { createSelector, Selector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Profile } from '@/entities/Profile';
import { getUserAuthData, User } from '@/entities/User';
import { getProfileData } from '../getProfileData/getProfileData';

const selectors: [
    Selector<StateSchema, User | undefined>, Selector<StateSchema, Profile | undefined>
] = [getUserAuthData, getProfileData];

export const getCanEditProfile = createSelector(
    selectors,
    (authData, profileData) => {
        if (!authData || !profileData) {
            return false;
        }

        return authData?.id === profileData?.id;
    },
);
