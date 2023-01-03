import { forwardRef, ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';

import cls from './Applink.module.scss';

export enum ApplinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    RED = 'red',
}

interface ApplinkProps extends LinkProps {
    className?: string;
    theme?: ApplinkTheme;
    children?: ReactNode;
}

export const Applink = forwardRef((props: ApplinkProps, ref) => {
    const {
        to,
        className,
        children,
        theme = ApplinkTheme.PRIMARY,
        ...otherProps
    } = props;

    return (
        <Link
            className={classNames(cls.AppLink, { [cls[theme]]: true }, [className])}
            to={to}
            {...otherProps}
        >
            {children}
        </Link>
    );
});
