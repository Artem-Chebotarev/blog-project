import { useCallback, memo } from 'react';
import { Country } from 'entities/Country/model/types/country';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Select } from 'shared/ui/Select/Select';

interface CountrySelectProps {
    className?: string;
    value?: string;
    onChange?: (value: Country) => void;
    readonly?: boolean;
}

// ЛЮБЫЕ ОБЪЕКТЫ ИЛИ МАССИВЫ, КОТОРЫЕ ПЕРЕДАЕМ КУДА-ТО ПРОПСАМИ НУЖНО МЕМОИЗИРОВАТЬ

// если массив статичный, то его можно вынести за пределы компонента
const countryOptions = Object.entries(Country)
    .map(([value, content]) => ({ value, content }));

export const CountrySelect = memo((props: CountrySelectProps) => {
    const {
        className,
        value,
        onChange,
        readonly,
    } = props;

    const { t } = useTranslation();

    const onChangeHandler = useCallback((value: string) => {
        // кастуем тип, когда мы уверены что будут эти значения Currency
        onChange?.(value as Country);
    }, [onChange]);

    return (
        <Select
            className={classNames('', {}, [className])}
            label={t('Укажите страну')}
            options={countryOptions}
            value={value}
            onChange={onChangeHandler}
            readonly={readonly}
        />

    );
});
