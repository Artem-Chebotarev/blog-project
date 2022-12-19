import { lazy } from 'react';
import { AddCommentFormProps } from './AddCommentForm';

// чтобы предотвратить потерю типов для компонента при использовании memo и промиса
export const AddCommentFormAsync = lazy<React.FC<AddCommentFormProps>>(() => new Promise(
    (resolve) => {
        // @ts-ignore
        // ТАК В РЕАЛЬНЫХ ПРОЕКТАХ НЕ ДЕЛАТЬ!!!!! ДЕЛАЕМ ДЛЯ КУРСА!
        setTimeout(() => resolve(import('./AddCommentForm')), 1500);
    },
));
