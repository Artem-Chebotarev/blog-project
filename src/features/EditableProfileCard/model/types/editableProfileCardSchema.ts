import { Profile } from '@/entities/Profile';
import { ThunkErrors } from '@/shared/const/common';

import { ValidateProfileError } from '../consts/consts';

export type ValidateAndThunkErrors = ValidateProfileError | ThunkErrors;

export interface ProfileSchema {
    data?: Profile;
    form?: Profile;
    isLoading: boolean;
    error?: string;
    readonly: boolean;
    validateErrors?: ValidateAndThunkErrors[];
}
