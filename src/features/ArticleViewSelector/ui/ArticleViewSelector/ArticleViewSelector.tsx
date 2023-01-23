import { memo, useCallback } from 'react';

import { ArticleView } from '@/entities/Article';
import ListIcon from '@/shared/assets/icons/list-24-24.svg';
import GridIcon from '@/shared/assets/icons/tiled-24-24.svg';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';

import cls from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView;
    onViewClick?: (value: ArticleView) => void;
}

const viewTypes = [
    {
        view: ArticleView.GRID,
        icon: GridIcon,
    },
    {
        view: ArticleView.LIST,
        icon: ListIcon,
    },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    const { className, view, onViewClick } = props;

    const onClick = useCallback(
        (newView: ArticleView) => () => {
            onViewClick?.(newView);
        },
        [onViewClick],
    );
    return (
        <div className={classNames('', {}, [className])}>
            {viewTypes.map((elem) => (
                <Button
                    key={elem.view}
                    theme={ButtonTheme.CLEAR}
                    onClick={onClick(elem.view)}
                >
                    <Icon
                        className={classNames(
                            '',
                            { [cls.selected]: elem.view === view },
                            [],
                        )}
                        Svg={elem.icon}
                    />
                </Button>
            ))}
        </div>
    );
});
