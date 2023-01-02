// наружу отдаем только модалку. Сама форма изолирована внутри этого модуля
export { LoginModal } from './ui/LoginModal/LoginModal';
export type { LoginSchema } from './model/types/loginSchema';
// удаляем этот редюсер, так как он изолирован внутри модулю и подгружается асинхронно
// export { loginReducer } from './model/slice/loginSlice';
export { loginActions } from './model/slice/loginSlice';
