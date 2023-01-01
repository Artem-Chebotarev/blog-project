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
    max?: boolean;
}

export const Card = (props: CardProps) => {
    const {
        className,
        children,
        theme = CardTheme.NORMAL,
        max,
        ...other
    } = props;

    return (
        <div
            {...other}
            className={classNames(cls.Card, { [cls.max]: max }, [className, cls[theme]])}
        >
            {children}
        </div>
    );
};
