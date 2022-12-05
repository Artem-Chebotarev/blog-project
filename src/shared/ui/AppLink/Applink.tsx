import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Link, LinkProps } from 'react-router-dom';
import { FC } from 'react';
import cls from './Applink.module.scss';

export enum ApplinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    RED = 'red',
}

interface ApplinkProps extends LinkProps {
    className?: string;
    theme?: ApplinkTheme;
}

export const Applink: FC<ApplinkProps> = (props) => {
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
            className={classNames(cls.Applink, {}, [className, cls[theme]])}
        >
            {children}
        </Link>
    );
};
