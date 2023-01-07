import { Menu } from '@headlessui/react';
import { createRef, Fragment, ReactNode } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';

import { Applink } from '../../../Applink/Applink';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';

import cls from './Dropdown.module.scss';

export interface DropdowItem {
    id: string;
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
}

interface DropdownProps {
    className?: string;
    items: DropdowItem[];
    trigger: ReactNode;
    direction?: DropdownDirection;
}

export const Dropdown = (props: DropdownProps) => {
    const { className, items, trigger, direction = 'bottom right' } = props;

    const ref = createRef();

    const menuClasses = [mapDirectionClass[direction]];

    return (
        <Menu
            className={classNames(cls.Dropdown, {}, [
                className,
                popupCls.popup,
            ])}
            as="div">
            <Menu.Button className={popupCls.trigger}>{trigger}</Menu.Button>
            <Menu.Items className={classNames(cls.menu, {}, menuClasses)}>
                {items.map((elem) => {
                    const content = ({ active }: { active: boolean }) => (
                        <button
                            className={classNames(
                                cls.item,
                                {
                                    [cls.active]: active,
                                },
                                [className],
                            )}
                            disabled={elem.disabled}
                            type="button"
                            onClick={elem.onClick}>
                            {elem.content}
                        </button>
                    );

                    if (elem.href) {
                        return (
                            <Menu.Item
                                key={elem.id}
                                as={Applink}
                                to={elem.href}
                                disabled={elem.disabled}
                                ref={ref}>
                                {content}
                            </Menu.Item>
                        );
                    }

                    return (
                        <Menu.Item
                            key={elem.id}
                            as={Fragment}
                            disabled={elem.disabled}>
                            {content}
                        </Menu.Item>
                    );
                })}
            </Menu.Items>
        </Menu>
    );
};
