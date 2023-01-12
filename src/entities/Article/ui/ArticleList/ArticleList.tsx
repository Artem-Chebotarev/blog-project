import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Text, TextSize } from '@/shared/ui/Text';

import { ArticleView } from '../../model/consts/consts';
import { Article } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';

import cls from './ArticleList.module.scss';

interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    view?: ArticleView;
    target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticleView) =>
    new Array(view === ArticleView.GRID ? 8 : 3).fill(0).map((elem, index) => (
        /**
         * если элементы не изменяются, не удаляются,
         * то индекс можно использовать в качестве ключа
         */
        // eslint-disable-next-line react/no-array-index-key
        <ArticleListItemSkeleton key={index} view={view} />
    ));

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        className,
        articles,
        isLoading,
        view = ArticleView.GRID,
        target,
    } = props;

    const { t } = useTranslation();

    if (!isLoading && !articles.length) {
        return (
            <div
                className={classNames(cls.ArticleList, {}, [
                    className,
                    cls[view],
                ])}
            >
                <Text title={t('Статьи не найдены')} size={TextSize.L} />
            </div>
        );
    }

    return (
        <div
            className={classNames(cls.ArticleList, {}, [className, cls[view]])}
            data-testid="ArticleList"
        >
            {articles.map((elem) => (
                <ArticleListItem
                    className={cls.card}
                    article={elem}
                    view={view}
                    target={target}
                    key={elem.id}
                />
            ))}
            {isLoading && getSkeletons(view)}
        </div>
    );
});
