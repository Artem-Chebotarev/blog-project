import { useCallback } from '@storybook/addons';
import { Currency } from 'entities/Currency/model/types/currency';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Select } from 'shared/ui/Select/Select';

interface CurrencySelectProps {
    className?: string;
    value?: string;
    onChange?: (value: Currency) => void;
}

// ЛЮБЫЕ ОБЪЕКТЫ ИЛИ МАССИВЫ, КОТОРЫЕ ПЕРЕДАЕМ КУДА-ТО ПРОПСАМИ НУЖНО МЕМОИЗИРОВАТЬ

// если массив статичный, то его можно вынести за пределы компонента
const currencyOptions = Object.entries(Currency)
    .map(([value, content]) => ({ value, content }));

export const CurrencySelect = memo(({ className, value, onChange }: CurrencySelectProps) => {
    const { t } = useTranslation();

    const onChangeHandler = useCallback((value: string) => {
        // кастуем тип, когда мы уверены что будут эти значения Currency
        onChange?.(value as Currency);
    }, [onChange]);

    return (
        <Select
            className={classNames('', {}, [className])}
            label={t('Укажите валюту')}
            options={currencyOptions}
            value={value}
            onChange={onChangeHandler}
        />

    );
});
