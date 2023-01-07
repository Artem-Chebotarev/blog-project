import { ReactElement, SVGProps } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';

import cls from './Icon.module.scss';

interface IconProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
    Svg: (props: SVGProps<SVGSVGElement>) => ReactElement;
    inverted?: boolean;
}

export const Icon = (props: IconProps) => {
    const { className, Svg, inverted, ...otherProps } = props;

    return (
        <Svg
            {...otherProps}
            className={classNames(inverted ? cls.inverted : cls.Icon, {}, [
                className,
            ])}
        />
    );
};
