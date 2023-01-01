import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import StarIcon from '@/shared/assets/icons/star.svg';
import { Icon } from '../Icon/Icon';

import cls from './StarRating.module.scss';
import { Text } from '../Text/Text';

interface StarRatingProps {
    className?: string;
    onSelect?: (starsCount: number) => void;
    size?: number;
    selectedStars?: number;
}

const maxStar = 5;
// const stars = [1, 2, 3, 4, 5];

export const StarRating = memo((props: StarRatingProps) => {
    const {
        className,
        onSelect,
        size = 30,
        selectedStars = 3,
    } = props;

    const [rating, setRating] = useState(selectedStars);
    const [hover, setHover] = useState(0);

    const onHover = (starsCount: number) => () => {
        setHover(starsCount);
    };

    const onLeave = () => {
        setHover(0);
    };

    const onClick = (starsCount: number) => () => {
        setRating(starsCount);
        onSelect?.(starsCount);
    };

    return (
        <div className={classNames(cls.StarRating, {}, [])}>
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
                    />
                );
            })}
            <Text title={`Rating: ${rating}`} />
        </div>
    );
});
