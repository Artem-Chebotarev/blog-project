import { memo } from 'react';

import { classNames, Mods } from '@/shared/lib/helpers/classNames/classNames';

import UserIcon from '../../assets/icons/user-filled.svg';
import { AppImage } from '../AppImage';
import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';

import cls from './Avatar.module.scss';

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
    /**
     * В случае инвертированных цветов
     */
    fallbackInverted?: boolean;
}

export const Avatar = memo((props: AvatarProps) => {
    const { className, src, size = 100, alt, fallbackInverted } = props;

    const mods: Mods = {};

    // стили это объект, чтобы не было перерисовок используем useMemo
    const styles = {
        width: size,
        height: size,
    };

    const fallback = <Skeleton width={size} height={size} border="50%" />;
    const errorFallback = (
        <Icon
            inverted={fallbackInverted}
            width={size}
            height={size}
            Svg={UserIcon}
        />
    );

    return (
        <AppImage
            className={classNames(cls.Avatar, mods, [className])}
            src={src}
            alt={alt || 'avatar'}
            style={styles}
            fallback={fallback}
            errorFallback={errorFallback}
        />
    );
});
