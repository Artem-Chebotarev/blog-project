import { createSelector, Selector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { getUserAuthData, User } from 'entities/User';
import { Profile } from '../../types/profile';
import { getProfileData } from '../getProfileData/getProfileData';

const selectors: [
    Selector<StateSchema, User | undefined>, Selector<StateSchema, Profile | undefined>
] = [getUserAuthData, getProfileData];

export const getCanEdit = createSelector(
    selectors,
    (authData, profileData) => authData?.id === profileData?.id,
);
