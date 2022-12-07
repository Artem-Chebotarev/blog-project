import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { ButtonHTMLAttributes, FC } from 'react';
import cls from './Button.module.scss';

export enum ButtonTheme {
    CLEAR = 'clear',
    CLEAR_INVERTED = 'clearInverted',
    OUTLINE = 'outline',
    BACKGROUND = 'background',
    BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ButtonTheme;
    square?: boolean;
    size?: ButtonSize;
    // Пропс disabled было необязательно передавать вручную,
    // он и так бы передался в otherProps rest оператор
    // disabled?: boolean;
}

export const Button: FC<ButtonProps> = (props) => {
    const {
        className,
        children,
        theme,
        square,
        size = ButtonSize.M,
        disabled,
        ...otherProps
    } = props;

    const mods: Record<string, boolean> = {
        // [cls[theme]]: true,
        [cls.square]: square,
        // [cls[size]]: true,
        [cls.disabled]: disabled,
    };

    return (
        <button
            {...otherProps}
            type="button"
            className={classNames(cls.Button, mods, [className, cls[theme], cls[size]])}
        >
            {children}
        </button>
    );
};
