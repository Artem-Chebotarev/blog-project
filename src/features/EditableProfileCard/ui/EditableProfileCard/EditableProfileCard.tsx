import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { ProfileCard } from '@/entities/Profile';
import { ThunkErrors } from '@/shared/const/common';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch/useAppDispatch';
import { ReducersList, useDynamicModuleLoader } from '@/shared/lib/helpers/hooks/useDynamicModuleLoad/useDynamicModuleLoad';
import { VStack } from '@/shared/ui/Stack';
import { Text, TextTheme } from '@/shared/ui/Text';

import { ValidateProfileError } from '../../model/consts/consts';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileValidateErrors } from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { profileActions, profileReducer } from '../../model/slice/profileSlice';
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader';

interface EditableProfileCardProps {
    className?: string;
    id: string;
}

const reducers: ReducersList = {
    profile: profileReducer,
};

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
    const {
        className,
        id,
    } = props;

    const { t } = useTranslation('profile');

    const dispatch = useAppDispatch();

    useDynamicModuleLoader(reducers);

    const formData = useSelector(getProfileForm);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);
    const readonly = useSelector(getProfileReadonly);
    const validateErrors = useSelector(getProfileValidateErrors);

    const validateErrorTranslates = {
        [ThunkErrors.SERVER_ERROR]: t('Серверная ошибка при сохранении'),
        [ValidateProfileError.INCORRECT_COUNTRY]: t('Некорректный регион'),
        [ThunkErrors.NO_DATA]: t('Данные не указаны'),
        [ValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
        [ValidateProfileError.INCORRECT_USER_DATA]: t('Имя и фамилия обязательны'),
    };

    useEffect(() => {
        if (__PROJECT__ !== 'storybook' && __PROJECT__ !== 'jest') {
            if (id) {
                dispatch(fetchProfileData(id));
            }
        }
    }, [dispatch, id]);

    const onChangeFirstname = useCallback((value: string) => {
        dispatch(profileActions.updateProfile({
            first: value,
        }));
    }, [dispatch]);

    const onChangeLastname = useCallback((value: string) => {
        dispatch(profileActions.updateProfile({
            lastname: value,
        }));
    }, [dispatch]);

    const onChangeAge = useCallback((value: string) => {
        dispatch(profileActions.updateProfile({
            age: Number(value || 0),
        }));
    }, [dispatch]);

    const onChangeCity = useCallback((value: string) => {
        dispatch(profileActions.updateProfile({
            city: value,
        }));
    }, [dispatch]);

    const onChangeUsername = useCallback((value: string) => {
        dispatch(profileActions.updateProfile({
            username: value,
        }));
    }, [dispatch]);

    const onChangeAvatar = useCallback((value: string) => {
        dispatch(profileActions.updateProfile({
            avatar: value,
        }));
    }, [dispatch]);

    const onChangeCurrency = useCallback((value: Currency) => {
        dispatch(profileActions.updateProfile({
            currency: value,
        }));
    }, [dispatch]);

    const onChangeCountry = useCallback((value: Country) => {
        dispatch(profileActions.updateProfile({
            country: value,
        }));
    }, [dispatch]);

    return (
        <VStack
            gap="16"
            max
        >
            <EditableProfileCardHeader />
            {validateErrors?.length && validateErrors.map((elem) => (
                <Text
                    key={elem}
                    theme={TextTheme.ERROR}
                    title={validateErrorTranslates[elem]}
                    data-testid="EditableProfileCard.Error"
                />
            ))}
            <ProfileCard
                data={formData}
                isLoading={isLoading}
                error={error}
                onChangeFirstname={onChangeFirstname}
                onChangeLastname={onChangeLastname}
                onChangeAge={onChangeAge}
                onChangeCity={onChangeCity}
                onChangeUsername={onChangeUsername}
                onChangeAvatar={onChangeAvatar}
                onChangeCurrency={onChangeCurrency}
                onChangeCountry={onChangeCountry}
                readonly={readonly}
            />
        </VStack>
    );
});
