import { ButtonHTMLAttributes, ReactNode } from "react";
import { classNames } from "shared/lib/helpers/classNames/classNames";

import cls from "./Button.module.scss";

export enum ThemeButton {
    CLEAR = 'clear',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ThemeButton;
};

export const Button: React.FC<ButtonProps> = (props) => {
    const { 
        className, 
        children,
        theme, 
        ...otherProps
    } = props;

    return (
        <button 
            {...otherProps} 
            className={classNames(cls.Button, {}, [className, cls[theme]])}
        >
            { children }
        </button>
    );
};