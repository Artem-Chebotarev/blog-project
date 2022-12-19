import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { ThunkErrors } from 'shared/const/common';

export enum ValidateProfileError {
    INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
    INCORRECT_AGE = 'INCORRECT_AGE',
    INCORRECT_COUNTRY = 'INCORRECT_COUNTRY',
}

export type ValidateAndThunkErrors = ValidateProfileError | ThunkErrors;

export interface Profile {
    id?: number,
    first?: string,
    lastname?: string,
    age?: number,
    currency?: Currency,
    country?: Country,
    city?: string,
    username?: string,
    avatar?: string,
}

export interface ProfileSchema {
    // данные от сервера
    data?: Profile;
    // то, что наизменял сам пользователь во время редактирования
    form?: Profile;
    isLoading: boolean;
    error?: string;
    // доступен ли пользователь для редактирования
    readonly: boolean;
    validateErrors?: ValidateAndThunkErrors[];
}
