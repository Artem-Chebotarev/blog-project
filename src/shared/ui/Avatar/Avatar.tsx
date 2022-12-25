import { memo } from 'react';
import { classNames, Mods } from 'shared/lib/helpers/classNames/classNames';

import cls from './Avatar.module.scss';

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
}

export const Avatar = memo((props: AvatarProps) => {
    const {
        className,
        src,
        size,
        alt,
    } = props;

    const mods: Mods = {};

    // стили это объект, чтобы не было перерисовок используем useMemo
    const styles = {
        width: size || 100,
        height: size || 100,
    };

    return (
        <img
            src={src}
            alt={alt || 'avatar'}
            style={styles}
            className={classNames(cls.Avatar, mods, [className])}
        />
    );
});
