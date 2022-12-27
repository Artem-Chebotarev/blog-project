import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { useSelector } from 'react-redux';
import {
    getCanEditProfile,
    getProfileReadonly,
    profileActions,
    updateProfileData,
} from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/helpers/hooks/useAppDispatch/useAppDispatch';
import { memo, useCallback } from 'react';
import { VStack } from 'shared/ui/Stack/VStack/VStack';
import { HStack } from 'shared/ui/Stack/HStack/HStack';

interface ProfilePageHeaderProps {
    className?: string;
}

export const ProfilePageHeader = memo(({ className }: ProfilePageHeaderProps) => {
    const { t } = useTranslation('profile');

    const dispatch = useAppDispatch();

    // readonly это состояние editable для формы профиля
    const readonly = useSelector(getProfileReadonly);

    // селектор с использованием реселект
    const canEditProfile = useSelector(getCanEditProfile);

    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadonly(false));
    }, [dispatch]);

    const onCalcelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSave = useCallback(() => {
        dispatch(updateProfileData());
    }, [dispatch]);

    return (
        <HStack
            className={classNames('', {}, [className])}
            justify="between"
            max
        >
            <Text title={t('Профиль')} />
            {canEditProfile && (
                readonly ? (
                    <Button
                        theme={ButtonTheme.OUTLINE}
                        onClick={onEdit}
                    >
                        {t('Редактировать')}
                    </Button>
                ) : (
                    <HStack
                        gap="8"
                    >
                        <Button
                            theme={ButtonTheme.OUTLINE_RED}
                            onClick={onCalcelEdit}
                        >
                            {t('Отменить')}
                        </Button>
                        <Button
                            theme={ButtonTheme.OUTLINE}
                            onClick={onSave}
                        >
                            {t('Сохранить')}
                        </Button>
                    </HStack>
                )
            )}
        </HStack>
    );
});
