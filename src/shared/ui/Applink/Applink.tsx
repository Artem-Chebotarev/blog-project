import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Link, LinkProps } from 'react-router-dom';
import { memo, ReactNode } from 'react';
// import cls from './Applink.module.scss';

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

export const Applink = memo((props: ApplinkProps) => {
    const {
        to,
        className,
        children,
        theme = ApplinkTheme.PRIMARY,
        ...otherProps
    } = props;

    return (
        <Link
            {...otherProps}
            to={to}
            // className={classNames(cls.Applink, {}, [className, cls[theme]])}
        >
            {children}
        </Link>
    );
});
