import { ReactElement, SVGProps } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';

import cls from './Icon.module.scss';

interface IconProps {
    className?: string;
    Svg: (props: SVGProps<SVGElement>) => ReactElement;
    inverted?: boolean;
}

export const Icon = (props: IconProps) => {
    const {
        className,
        Svg,
        inverted,
    } = props;

    return (
        <Svg className={classNames(inverted ? cls.inverted : cls.Icon, {}, [className])} />
    );
};
