import {
    memo,
    useCallback,
    useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { LoginModal, loginActions } from '@/features/AuthByUsername';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Applink, ApplinkTheme } from '@/shared/ui/Applink/Applink';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { HStack } from '@/shared/ui/Stack';
import { Text, TextTheme } from '@/shared/ui/Text/Text';
import { NotificationButton } from '@/features/NotificationButton';
import { AvatarDropdown } from '@/features/AvatarDropdown';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch/useAppDispatch';

import cls from './Navbar.module.scss';
import { RoutePath } from '@/shared/const/router';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);
    const [isAuthModal, setIsAuthModal] = useState(false);

    // для всех функций, которые будем передавать куда то как props, будем использовать useCallback
    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
        dispatch(loginActions.setError(''));
    }, [dispatch]);

    if (authData) {
        return (
            <header className={classNames(cls.Navbar, {}, [className])}>
                <Text
                    className={cls.appName}
                    theme={TextTheme.INVERTED}
                    title={t('Новостной блог')}
                />
                <Applink
                    theme={ApplinkTheme.SECONDARY}
                    to={RoutePath.article_create}
                >
                    {t('Создать статью')}
                </Applink>
                <HStack
                    className={cls.actions}
                    gap="16"
                >
                    <NotificationButton />
                    <AvatarDropdown />
                </HStack>
            </header>
        );
    }

    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <Text
                className={cls.appName}
                theme={TextTheme.INVERTED}
                title={t('Новостной блог')}
            />
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                className={cls.links}
                onClick={onShowModal}
            >
                {t('Войти')}
            </Button>
            {isAuthModal && (
                <LoginModal
                    isOpen={isAuthModal}
                    onClose={onCloseModal}
                />
            )}
        </header>
    );
});
