import { lazy } from 'react';
import { AddCommentFormProps } from './AddCommentForm';

// чтобы предотвратить потерю типов для компонента при использовании memo и промиса
export const AddCommentFormAsync = lazy<React.FC<AddCommentFormProps>>(() => import('./AddCommentForm'));
