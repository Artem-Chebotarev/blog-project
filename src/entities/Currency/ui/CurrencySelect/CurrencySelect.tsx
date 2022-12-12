import { useCallback, memo } from 'react';
import { Currency } from 'entities/Currency/model/types/currency';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Select } from 'shared/ui/Select/Select';

interface CurrencySelectProps {
    className?: string;
    value?: string;
    onChange?: (value: Currency) => void;
    readonly?: boolean;
}

// ЛЮБЫЕ ОБЪЕКТЫ ИЛИ МАССИВЫ, КОТОРЫЕ ПЕРЕДАЕМ КУДА-ТО ПРОПСАМИ НУЖНО МЕМОИЗИРОВАТЬ

// если массив статичный, то его можно вынести за пределы компонента
const currencyOptions = Object.entries(Currency)
    .map(([value, content]) => ({ value, content }));

export const CurrencySelect = memo((props: CurrencySelectProps) => {
    const {
        className,
        value,
        onChange,
        readonly,
    } = props;

    const { t } = useTranslation('profile');

    const onChangeHandler = useCallback((value: string) => {
        // кастуем тип, когда мы уверены что будут эти значения Currency
        onChange?.(value as Currency);
    }, [onChange]);

    return (
        <Select
            className={classNames('', {}, [className])}
            label={t('Валюта')}
            options={currencyOptions}
            value={value}
            onChange={onChangeHandler}
            readonly={readonly}
        />

    );
});
