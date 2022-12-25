import React, { lazy } from 'react';
import { LoginFormProps } from './LoginForm';

// чтобы предотвратить потерю типов для компонента при использовании memo и промиса
export const LoginFormAsync = lazy<React.FC<LoginFormProps>>(() => import('./LoginForm'));
