import axios from 'axios';
import { USER_LOCAL_STORAGE_KEY } from 'shared/const/localStorage';

// создаем инстанс axios, чтобы удобнее было работать
export const $api = axios.create({
    baseURL: __API__,
});

// interceptors - перехватчик, которй отрабатывает перед каким-то действием
// т. е. перед тем как отправлять любой запрос у нас будет отрабатывать этот interceptor
$api.interceptors.request.use((config) => {
    if (config.headers) {
        // имитация авторизации, так как на бэке проверяется только наличие этого
        // заголовка, а не сам токен
        config.headers = { authorization: localStorage.getItem(USER_LOCAL_STORAGE_KEY) || '' };
    }
    return config;
});
