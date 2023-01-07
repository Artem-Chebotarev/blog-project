import { useCallback, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { ListBox } from '@/shared/ui/Popups';

import { Country } from '../../model/types/country';

interface CountrySelectProps {
    className?: string;
    value?: string;
    onChange?: (value: Country) => void;
    readonly?: boolean;
}

// ЛЮБЫЕ ОБЪЕКТЫ ИЛИ МАССИВЫ, КОТОРЫЕ ПЕРЕДАЕМ КУДА-ТО ПРОПСАМИ НУЖНО МЕМОИЗИРОВАТЬ

// если массив статичный, то его можно вынести за пределы компонента
const countryOptions = Object.entries(Country).map(([value, content]) => ({
    value,
    content,
}));

export const CountrySelect = memo((props: CountrySelectProps) => {
    const { className, value, onChange, readonly } = props;

    const { t } = useTranslation('profile');

    const onChangeHandler = useCallback(
        (value: string) => {
            // кастуем тип, когда мы уверены что будут эти значения Currency
            onChange?.(value as Country);
        },
        [onChange],
    );

    return (
        <ListBox
            className={classNames('', {}, [className])}
            items={countryOptions}
            value={value}
            defaultValue={t('Страна')}
            label={t('Страна')}
            onChange={onChangeHandler}
            readonly={readonly}
            direction="top right"
        />
    );
});
