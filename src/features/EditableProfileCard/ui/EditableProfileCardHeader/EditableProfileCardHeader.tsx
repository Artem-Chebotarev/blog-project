import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch/useAppDispatch';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import { getCanEditProfile } from '../../model/selectors/getCanEditProfile/getCanEditProfile';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { profileActions } from '../../model/slice/profileSlice';

interface EditableProfileCardHeaderProps {
    className?: string;
}

export const EditableProfileCardHeader = ({
    className,
}: EditableProfileCardHeaderProps) => {
    const { t } = useTranslation('profile');

    const dispatch = useAppDispatch();

    const readonly = useSelector(getProfileReadonly);

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
            {canEditProfile &&
                (readonly ? (
                    <Button
                        theme={ButtonTheme.OUTLINE}
                        onClick={onEdit}
                        data-testid="EditableProfileCardHeader.EditButton"
                    >
                        {t('Редактировать')}
                    </Button>
                ) : (
                    <HStack gap="8">
                        <Button
                            theme={ButtonTheme.OUTLINE_RED}
                            onClick={onCalcelEdit}
                            data-testid="EditableProfileCardHeader.CancelButton"
                        >
                            {t('Отменить')}
                        </Button>
                        <Button
                            theme={ButtonTheme.OUTLINE}
                            onClick={onSave}
                            data-testid="EditableProfileCardHeader.SaveButton"
                        >
                            {t('Сохранить')}
                        </Button>
                    </HStack>
                ))}
        </HStack>
    );
};
