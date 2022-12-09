import axios from 'axios';
import { USER_LOCAL_STORAGE_KEY } from 'shared/const/localStorage';

// создаем инстанс axios, чтобы удобнее было работать
export const $api = axios.create({
    baseURL: __API__,
    headers: {
        // имитация авторизации, так как на бэке проверяется только наличие этого
        // заголовка, а не сам токен
        authorization: localStorage.getItem(USER_LOCAL_STORAGE_KEY) || '',
    },
});
