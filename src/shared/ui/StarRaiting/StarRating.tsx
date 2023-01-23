import { memo, useCallback, useState } from 'react';

import StarIcon from '@/shared/assets/icons/star.svg';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';

import { Icon } from '../Icon/Icon';
import { Text, TextAlign } from '../Text/Text';

import cls from './StarRating.module.scss';

interface StarRatingProps {
    className?: string;
    onSelect?: (starsCount: number) => void;
    size?: number;
    selectedStars?: number;
    align?: TextAlign.CENTER;
}

const maxStar = 5;

export const StarRating = memo((props: StarRatingProps) => {
    const { className, onSelect, size = 30, selectedStars = 3, align } = props;

    const [rating, setRating] = useState(selectedStars);
    const [hover, setHover] = useState(0);

    const onHover = useCallback(
        (starsCount: number) => () => {
            setHover(starsCount);
        },
        [],
    );

    const onLeave = useCallback(() => {
        setHover(0);
    }, []);

    const onClick = useCallback(
        (starsCount: number) => () => {
            setRating(starsCount);
            onSelect?.(starsCount);
        },
        [onSelect],
    );

    return (
        <div className={classNames('', {}, [className])}>
            {[...Array(maxStar)].map((_, index) => {
                const value = index + 1;

                return (
                    <Icon
                        className={classNames(
                            cls.starIcon,
                            {
                                [cls.filled]: (hover || rating) >= value,
                            },
                            [className, cls.normal],
                        )}
                        Svg={StarIcon}
                        key={value}
                        width={size}
                        height={size}
                        onMouseEnter={onHover(value)}
                        onMouseLeave={onLeave}
                        onClick={onClick(value)}
                        data-testid={`StarRating.${value}`}
                        data-selected={rating >= value}
                    />
                );
            })}
            <Text title={`Rating: ${rating}`} align={align} />
        </div>
    );
});
