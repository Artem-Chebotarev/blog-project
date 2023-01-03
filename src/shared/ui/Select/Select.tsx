import { ChangeEvent, memo, useMemo } from 'react';

import { classNames, Mods } from '@/shared/lib/helpers/classNames/classNames';

import cls from './Select.module.scss';

export interface SelectOption<T extends string> {
    value: T;
    content: string;
}

interface SelectProps<T extends string> {
    className?: string;
    label?: string;
    options?: SelectOption<T>[];
    value?: T;
    onChange?: (value: T) => void;
    readonly?: boolean;
}

/**
 * создаем typedMemo, так как обычный memo плохо работает с дженериками
 */
const typedMemo: <K>(c: K) => K = memo;

export const Select = typedMemo(<T extends string>(props: SelectProps<T>) => {
    const {
        className,
        label,
        options,
        value,
        onChange,
        readonly,
    } = props;

    const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(event.target.value as T);
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

    const mods: Mods = {
        [cls.readonly]: readonly,
    };

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
                disabled={readonly}
            >
                {optionsList}
            </select>
        </div>
    );
});
