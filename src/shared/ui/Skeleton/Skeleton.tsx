import { CSSProperties, memo } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';

import cls from './Skeleton.module.scss';

interface SkeletonProps {
    className?: string;
    // либо пиксили, либо проценты
    height?: string | number;
    width?: string | number;
    border?: string;
}

export const Skeleton = memo((props: SkeletonProps) => {
    const {
        className,
        height,
        width,
        border,
    } = props;

    const styles: CSSProperties = {
        width,
        height,
        borderRadius: border,
    };

    return (
        <div
            className={classNames(cls.Skeleton, {}, [className])}
            style={styles}
        />
    );
});
