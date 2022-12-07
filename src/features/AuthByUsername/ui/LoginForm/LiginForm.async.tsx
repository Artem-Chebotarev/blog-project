import React, { lazy } from 'react';
import { LoginFormProps } from './LoginForm';

// чтобы предотвратить потерю типов для компонента при использовании memo и промиса
export const LoginFormAsync = lazy<React.FC<LoginFormProps>>(() => new Promise((resolve) => {
    // @ts-ignore
    // ТАК В РЕАЛЬНЫХ ПРОЕКТАХ НЕ ДЕЛАТЬ!!!!! ДЕЛАЕМ ДЛЯ КУРСА!
    setTimeout(() => resolve(import('./LoginForm')), 1500);
}));
