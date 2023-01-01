import { ArticleView } from '@/entities/Article';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import GridIcon from '@/shared/assets/icons/tiled-24-24.svg';
import ListIcon from '@/shared/assets/icons/list-24-24.svg';

import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Icon } from '@/shared/ui/Icon/Icon';
import { memo, useCallback } from 'react';
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
    const {
        className,
        view,
        onViewClick,
    } = props;

    // обход ошибки с event через замыкание
    const onClick = useCallback((newView: ArticleView) => () => {
        onViewClick?.(newView);
    }, [onViewClick]);
    return (
        <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
            {viewTypes.map((elem) => (
                <Button
                    key={elem.view}
                    theme={ButtonTheme.CLEAR}
                    onClick={onClick(elem.view)}
                >
                    <Icon
                        className={classNames('', { [cls.selected]: elem.view === view }, [])}
                        Svg={elem.icon}
                    />
                </Button>
            ))}
        </div>
    );
});
