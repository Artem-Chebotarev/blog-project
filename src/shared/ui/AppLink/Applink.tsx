import { Link, LinkProps} from "react-router-dom";
import { classNames } from "shared/lib/helpers/classNames/classNames";

import cls from "./Applink.module.scss";

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}

interface ApplinkProps extends LinkProps{
    className?: string;
    theme?: AppLinkTheme;
};

export const Applink: React.FC<ApplinkProps> = (props) => {
    const { 
        className, 
        to, 
        children, 
        theme = AppLinkTheme.PRIMARY,
        ...otherProps
    } = props;
    // otherProps другие (оставшиеся props) которые нам надо передать дальше во вложенные компоненты

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