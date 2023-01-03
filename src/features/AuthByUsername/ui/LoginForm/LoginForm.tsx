import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch/useAppDispatch';
import { ReducersList, useDynamicModuleLoader } from '@/shared/lib/helpers/hooks/useDynamicModuleLoad/useDynamicModuleLoad';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Text, TextTheme } from '@/shared/ui/Text';

import { getError } from '../../model/selectors/getError/getError';
import { getIsLoading } from '../../model/selectors/getIsLoading/getIsLoading';
import { getPassword } from '../../model/selectors/getPassword/getPassword';
import { getUsername } from '../../model/selectors/getUsername/getUsername';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';

import cls from './LoginForm.module.scss';

export interface LoginFormProps {
    className?: string;
    onSuccess: () => void;
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
    const { t } = useTranslation();

    useDynamicModuleLoader(initialReducers);

    const dispatch = useAppDispatch();

    // лучше делать селекторы на мелкие кускочки стейта (например пароль и юзернейм лучше,
    // чем один логинФорм)
    const username = useSelector(getUsername);

    const password = useSelector(getPassword);

    const isLoading = useSelector(getIsLoading);

    const error = useSelector(getError);

    // useEffect(() => {
    //     // в момент монтирования комнонента нужно добавить редюсер с помощью редюсер менеджера
    //     store.reducerManager.add('loginForm', loginReducer);
    //     dispatch({ type: '@INIT loginForm reducer' });

    //     // при размонтировании - удаляем редюсер
    //     return () => {
    //         store.reducerManager.remove('loginForm');

    //         dispatch({ type: '@DESTROY loginForm reducer' });
    //     };

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUsername({ username, password }));

        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
        }
    }, [dispatch, onSuccess, username, password]);

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Text title={t('Форма авторизации')} />

            {error && (
                <Text
                    text={t('Вы ввели неверный логин или пароль')}
                    theme={TextTheme.ERROR}
                />
            )}

            <Input
                autofocus
                type="text"
                className={cls.input}
                placeholder={t('Имя пользователя')}
                onChange={onChangeUsername}
                value={username}
            />
            <Input
                type="text"
                className={cls.input}
                placeholder={t('Пароль')}
                onChange={onChangePassword}
                value={password}
            />
            <Button
                className={cls.loginBtn}
                theme={ButtonTheme.OUTLINE}
                onClick={onLoginClick}
                disabled={isLoading}
            >
                {t('Войти')}
            </Button>
        </div>
    );
});

export default LoginForm;
