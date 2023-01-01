import { HTMLAttributes, ReactNode } from 'react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';

import cls from './Card.module.scss';

export enum CardTheme {
    NORMAL = 'normal',
    OUTLINED = 'outlined',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    theme?: CardTheme;
}

export const Card = (props: CardProps) => {
    const {
        className,
        children,
        theme = CardTheme.NORMAL,
        ...other
    } = props;

    return (
        <div
            {...other}
            className={classNames(cls.Card, {}, [className, cls[theme]])}
        >
            {children}
        </div>
    );
};
