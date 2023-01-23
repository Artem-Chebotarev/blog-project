import { useCallback, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { ListBox } from '@/shared/ui/Popups';

import { Currency } from '../../model/types/currency';

interface CurrencySelectProps {
    className?: string;
    value?: string;
    onChange?: (value: Currency) => void;
    readonly?: boolean;
}

const currencyOptions = Object.entries(Currency).map(([value, content]) => ({
    value,
    content,
}));

export const CurrencySelect = memo((props: CurrencySelectProps) => {
    const { className, value, onChange, readonly } = props;

    const { t } = useTranslation('profile');

    const onChangeHandler = useCallback(
        (value: string) => {
            onChange?.(value as Currency);
        },
        [onChange],
    );

    return (
        <ListBox
            className={classNames('', {}, [className])}
            items={currencyOptions}
            value={value}
            defaultValue={t('Валюта')}
            label={t('Валюта')}
            onChange={onChangeHandler}
            readonly={readonly}
            direction="top right"
        />
    );
});
