import { Currency } from 'entities/Currency';
import { Country } from 'shared/const/common';

export interface Profile {
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
}
