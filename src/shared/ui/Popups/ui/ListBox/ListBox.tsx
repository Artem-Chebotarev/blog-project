import { Listbox as HListBox } from '@headlessui/react';
import { Fragment, memo, ReactNode } from 'react';

import CheckIcon from '@/shared/assets/icons/check-20-20.svg';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';

import { Button } from '../../../Button/Button';
import { Icon } from '../../../Icon/Icon';
import { HStack } from '../../../Stack';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';

import cls from './ListBox.module.scss';

export interface ListBoxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

interface ListBoxProps {
    className?: string;
    items?: ListBoxItem[];
    value?: string;
    defaultValue?: string;
    onChange?: <T extends string>(value: T) => void;
    readonly?: boolean;
    direction?: DropdownDirection;
    label?: string;
}

export const ListBox = memo((props: ListBoxProps) => {
    const {
        className,
        items,
        value,
        defaultValue,
        onChange,
        readonly,
        direction = 'bottom left',
        label,
    } = props;

    const optionsClasses = [mapDirectionClass[direction]];

    return (
        <HStack gap="4">
            {label && (
                <span
                    className={classNames('', { [cls.readonly]: readonly }, [
                        className,
                    ])}
                >{`${label}>`}</span>
            )}
            <HListBox
                className={classNames(cls.ListBox, {}, [
                    className,
                    popupCls.popup,
                ])}
                as="div"
                value={value}
                onChange={onChange}
                disabled={readonly}
            >
                <HListBox.Button className={popupCls.trigger} as="div">
                    <Button disabled={readonly}>{value ?? defaultValue}</Button>
                </HListBox.Button>

                <HListBox.Options
                    className={classNames(cls.options, {}, optionsClasses)}
                >
                    {items?.map((item) => (
                        <HListBox.Option
                            key={item.value}
                            value={item.value}
                            disabled={item.disabled}
                            as={Fragment}
                        >
                            {({ active, selected, disabled }) => (
                                <li
                                    className={classNames(
                                        cls.item,
                                        {
                                            [popupCls.active]: active,
                                            [popupCls.disabled]: disabled,
                                        },
                                        [],
                                    )}
                                >
                                    {item.content}
                                    {selected && (
                                        <Icon
                                            className={cls.checkIcon}
                                            Svg={CheckIcon}
                                        />
                                    )}
                                </li>
                            )}
                        </HListBox.Option>
                    ))}
                </HListBox.Options>
            </HListBox>
        </HStack>
    );
});
