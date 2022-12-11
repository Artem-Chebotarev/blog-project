import { ChangeEvent, memo, useMemo } from 'react';
import { classNames, Mods } from 'shared/lib/helpers/classNames/classNames';

import cls from './Select.module.scss';

export interface SelectOption {
    value: string;
    content: string;
}

interface SelectProps {
    className?: string;
    label?: string;
    options?: SelectOption[];
    value?: string;
    onChange?: (value: string) => void;
}

export const Select = memo((props: SelectProps) => {
    const {
        className,
        label,
        options,
        value,
        onChange,
    } = props;

    const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(event.target.value);
        }
        // либо onChange?.(event.target.value);
    };

    const optionsList = useMemo(() => options?.map((elem) => (
        <option
            className={cls.option}
            value={elem.value}
            key={elem.value}
        >
            {elem.content}
        </option>
    )), [options]);

    const mods: Mods = {};

    return (
        <div className={classNames(cls.Wrapper, mods, [className])}>
            {label && (
                <span className={cls.label}>
                    {`${label}>`}
                </span>
            )}
            <select
                className={cls.select}
                value={value}
                onChange={onChangeHandler}
            >
                {optionsList}
            </select>
        </div>
    );
});
