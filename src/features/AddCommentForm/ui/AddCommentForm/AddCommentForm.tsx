import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useAppDispatch } from 'shared/lib/helpers/hooks/useAppDispatch/useAppDispatch';
import { ReducersList, useDynamicModuleLoader } from 'shared/lib/helpers/hooks/useDynamicModuleLoad/useDynamicModuleLoad';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { HStack } from 'shared/ui/Stack';
import { addCommentFormActions, addCommentFormReducer } from '../../model/slice/addCommentFormSlice';
import { getAddCommentFormError, getAddCommentFormText } from '../../model/selectors/addCommentFormSelectors';

import cls from './AddCommentForm.module.scss';

export interface AddCommentFormProps {
    className?: string;
    onSendComment: (value: string) => void;
}

const reducers: ReducersList = {
    addCommentForm: addCommentFormReducer,
};

const AddCommentForm = memo((props: AddCommentFormProps) => {
    const {
        className,
        onSendComment,
    } = props;

    const { t } = useTranslation('article-details');

    const dispatch = useAppDispatch();

    useDynamicModuleLoader(reducers);

    const text = useSelector(getAddCommentFormText);
    const error = useSelector(getAddCommentFormError);

    // так как передаем пропсом, то нужно использовать useCallback
    const onCommentTextChange = useCallback((value: string) => {
        dispatch(addCommentFormActions.setText(value));
    }, [dispatch]);

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
        >
            <Input
                className={cls.input}
                placeholder={t('Введите текст комментария')}
                value={text}
                onChange={onCommentTextChange}
            />
            <Button
                theme={ButtonTheme.OUTLINE}
                onClick={onSendHandler}
            >
                {t('Отправить')}
            </Button>
        </HStack>
    );
});

export default AddCommentForm;
