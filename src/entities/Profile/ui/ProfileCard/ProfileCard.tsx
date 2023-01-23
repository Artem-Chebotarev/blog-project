import { useTranslation } from 'react-i18next';

import { Country, CountrySelect } from '@/entities/Country';
import { Currency, CurrencySelect } from '@/entities/Currency';
import { validKeyboardKeys } from '@/shared/const/common';
import { classNames, Mods } from '@/shared/lib/helpers/classNames/classNames';
import { Avatar } from '@/shared/ui/Avatar';
import { Input } from '@/shared/ui/Input';
import { Loader } from '@/shared/ui/Loader';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text, TextAlign, TextTheme } from '@/shared/ui/Text';

import { Profile } from '../../model/types/profile';

import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?: string;
    data?: Profile;
    isLoading?: boolean;
    error?: string;
    onChangeFirstname?: (value: string) => void;
    onChangeLastname?: (value: string) => void;
    onChangeAge?: (value: string) => void;
    onChangeCity?: (value: string) => void;
    onChangeUsername?: (value: string) => void;
    onChangeAvatar?: (value: string) => void;
    onChangeCurrency?: (value: Currency) => void;
    onChangeCountry?: (value: Country) => void;
    readonly?: boolean;
}

export const ProfileCard = (props: ProfileCardProps) => {
    const {
        className,
        data,
        isLoading,
        error,
        onChangeFirstname,
        onChangeLastname,
        onChangeAge,
        onChangeCity,
        onChangeUsername,
        onChangeAvatar,
        onChangeCurrency,
        onChangeCountry,
        readonly,
    } = props;

    const { t } = useTranslation('profile');

    if (isLoading) {
        return (
            <HStack
                className={classNames(cls.ProfileCard, {}, [
                    className,
                    cls.loading,
                ])}
                justify="center"
                max
            >
                <Loader />
            </HStack>
        );
    }

    if (error) {
        return (
            <HStack
                className={classNames(cls.ProfileCard, {}, [
                    className,
                    cls.error,
                ])}
                justify="center"
                max
            >
                <Text
                    theme={TextTheme.ERROR}
                    title={t('Произошла ошибка при загрузке профиля')}
                    text={t('Попробуйте обновить страницу')}
                    align={TextAlign.CENTER}
                />
            </HStack>
        );
    }

    const onKeyPress = (event: React.KeyboardEvent) => {
        if (
            !/[0-9]/.test(event.key) &&
            !Object.values(validKeyboardKeys).some((elem) => elem === event.key)
        ) {
            event.preventDefault();
        }
    };

    const mods: Mods = {
        [cls.editing]: !readonly,
    };

    return (
        <VStack
            className={classNames(cls.ProfileCard, mods, [className])}
            gap="16"
            max
        >
            {data?.avatar && (
                <HStack justify="center" max>
                    <Avatar src={data?.avatar} alt="avatar" />
                </HStack>
            )}
            <Input
                value={data?.first}
                placeholder={t('Ваше имя')}
                onChange={onChangeFirstname}
                readonly={readonly}
                data-testid="ProfileCard.firstname"
            />
            <Input
                value={data?.lastname}
                placeholder={t('Вашa фамилия')}
                onChange={onChangeLastname}
                readonly={readonly}
                data-testid="ProfileCard.lastname"
            />
            <Input
                value={data?.age}
                placeholder={t('Возраст')}
                onChange={onChangeAge}
                readonly={readonly}
                onKeyPress={onKeyPress}
                data-testid="ProfileCard.age"
            />
            <Input
                value={data?.city}
                placeholder={t('Город')}
                onChange={onChangeCity}
                readonly={readonly}
                data-testid="ProfileCard.city"
            />
            <Input
                value={data?.username}
                placeholder={t('Имя пользователя')}
                onChange={onChangeUsername}
                readonly={readonly}
                data-testid="ProfileCard.username"
            />
            <Input
                value={data?.avatar}
                placeholder={t('Ссылка на аватар')}
                onChange={onChangeAvatar}
                readonly={readonly}
                data-testid="ProfileCard.avatar"
            />
            <CurrencySelect
                value={data?.currency}
                onChange={onChangeCurrency}
                readonly={readonly}
            />
            <CountrySelect
                value={data?.country}
                onChange={onChangeCountry}
                readonly={readonly}
            />
        </VStack>
    );
};
