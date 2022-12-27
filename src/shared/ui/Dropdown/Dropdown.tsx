import { Menu } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { DropdownDirection } from 'shared/types/ui';
import { Applink } from '../Applink/Applink';

import cls from './Dropdown.module.scss';

export interface DropdowItem {
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

const mapDirectionClass: Record<DropdownDirection, string> = {
    'bottom left': cls.optionsBottomLeft,
    'bottom right': cls.optionsBottomRight,
    'top left': cls.optionsTopLeft,
    'top right': cls.optionsTopRight,
};

export const Dropdown = (props: DropdownProps) => {
    const {
        className,
        items,
        trigger,
        direction = 'bottom right',
    } = props;

    const menuClasses = [mapDirectionClass[direction]];

    return (
        <Menu
            className={classNames(cls.Dropdown, {}, [className])}
            as="div"
        >
            <Menu.Button className={cls.btn}>
                {trigger}
            </Menu.Button>
            <Menu.Items className={classNames(cls.menu, {}, menuClasses)}>
                {items.map((elem) => {
                    const content = ({ active }: { active: boolean }) => (
                        <button
                            className={classNames(cls.item, {
                                [cls.active]: active,
                            }, [className])}
                            disabled={elem.disabled}
                            type="button"
                            onClick={elem.onClick}
                        >
                            {elem.content}
                        </button>
                    );

                    if (elem.href) {
                        return (
                            <Menu.Item
                                key={elem.href}
                                as={Applink}
                                to={elem.href}
                                disabled={elem.disabled}
                            >
                                {content}
                            </Menu.Item>
                        );
                    }

                    return (
                        <Menu.Item
                            key={elem.href}
                            as={Fragment}
                            disabled={elem.disabled}
                        >
                            {content}
                        </Menu.Item>
                    );
                })}
            </Menu.Items>
        </Menu>
    );
};
