import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch/useAppDispatch';
import {
    ReducersList,
    useDynamicModuleLoader,
} from '@/shared/lib/helpers/hooks/useDynamicModuleLoad/useDynamicModuleLoad';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { HStack } from '@/shared/ui/Stack';

import { getAddCommentFormText } from '../../model/selectors/addCommentFormSelectors';
import {
    addCommentFormActions,
    addCommentFormReducer,
} from '../../model/slice/addCommentFormSlice';

import cls from './AddCommentForm.module.scss';

export interface AddCommentFormProps {
    className?: string;
    onSendComment: (value: string) => void;
}

const reducers: ReducersList = {
    addCommentForm: addCommentFormReducer,
};

const AddCommentForm = memo((props: AddCommentFormProps) => {
    const { className, onSendComment } = props;

    const { t } = useTranslation('article-details');

    const dispatch = useAppDispatch();

    useDynamicModuleLoader(reducers);

    const text = useSelector(getAddCommentFormText);

    // так как передаем пропсом, то нужно использовать useCallback
    const onCommentTextChange = useCallback(
        (value: string) => {
            dispatch(addCommentFormActions.setText(value));
        },
        [dispatch],
    );

    const onSendHandler = useCallback(() => {
        if (text) {
            onCommentTextChange('');

            onSendComment(text);
        }
    }, [onCommentTextChange, onSendComment, text]);

    return (
        <HStack
            className={classNames(cls.AddCommentForm, {}, [className])}
            justify="between"
            max
            data-testid="AddCommentForm">
            <Input
                className={cls.input}
                placeholder={t('Введите текст комментария')}
                value={text}
                onChange={onCommentTextChange}
                data-testid="AddCommentForm.Input"
            />
            <Button
                theme={ButtonTheme.OUTLINE}
                onClick={onSendHandler}
                data-testid="AddCommentForm.Button">
                {t('Отправить')}
            </Button>
        </HStack>
    );
});

export default AddCommentForm;
