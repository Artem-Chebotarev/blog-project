import {
    ImgHTMLAttributes,
    memo,
    ReactElement,
    useLayoutEffect,
    useState,
} from 'react';

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
    /**
     * Компонент, который будет отображаться во время загрузки
     */
    fallback?: ReactElement;
    /**
     * Компонент, который будет отображаться в случае ошибки
     */
    errorFallback?: ReactElement;
}

export const AppImage = memo((props: AppImageProps) => {
    const {
        className,
        src,
        alt = 'image',
        fallback,
        errorFallback,
        ...otherProps
    } = props;

    const [isLoading, setIsLoading] = useState(true);
    /**
     * запасное состояние, на случай если при загрузке изображения произошла ошибка
     * (отрисовываем заглушку)
     */
    const [hasError, setHasError] = useState(false);

    /**
     * вызывается до того, как компонент вмонтируется (синхронный хук)
     */
    useLayoutEffect(() => {
        const img = new Image();
        /**
         * в этот момент начинается фоновая загрузка изображения
         */
        img.src = src ?? '';
        /**
         * onload отрабатывает в момент, когда изображение закончило грузиться
         */
        img.onload = () => {
            setIsLoading(false);
        };
        /**
         * onerror отрабатывает если возникла ошибка при загрузке изображения
         */
        img.onerror = () => {
            setIsLoading(false);
            setHasError(true);
        };
    }, [src]);

    if (isLoading && fallback) {
        return fallback;
    }

    if (hasError && errorFallback) {
        return errorFallback;
    }

    return <img {...otherProps} className={className} src={src} alt={alt} />;
});
