import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Icon } from 'shared/ui/Icon/Icon';
import { Text } from 'shared/ui/Text/Text';
import EyeIcon from 'shared/assets/icons/eye-20-20.svg';
import { Card } from 'shared/ui/Card/Card';
import { useHover } from 'shared/lib/helpers/hooks/useHover/useHover';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import {
    Article, ArticleBlockType, ArticleTextBlock, ArticleView,
} from '../../model/types/article';

import cls from './ArticleListItem.module.scss';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

interface ArticleListItemProps {
    className?: string;
    article: Article;
    view: ArticleView;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
    const {
        className,
        article,
        view,
    } = props;

    const { t } = useTranslation();

    // хук useHover
    // const [isHover, bindHover] = useHover();

    const navigate = useNavigate();

    const onOpenArticle = useCallback(() => {
        navigate(`${RoutePath.article_details}${article.id}`);
    }, [navigate, article.id]);

    const types = (
        <Text
            className={cls.types}
            text={article.type.join(', ')}
        />
    );

    const views = (
        <>
            <Text
                className={cls.views}
                text={String(article.views)}
            />
            <Icon Svg={EyeIcon} />
        </>
    );

    if (view === ArticleView.LIST) {
        const textBlock = article.blocks.find(
            (elem) => elem.type === ArticleBlockType.TEXT,
        ) as ArticleTextBlock;

        return (
            <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
                <Card>
                    <div className={cls.header}>
                        <Avatar
                            size={30}
                            src={article.user.avatar}
                        />
                        <Text
                            className={cls.username}
                            text={article.user.username}
                        />
                        <Text
                            className={cls.date}
                            text={article.createdAt}
                        />
                    </div>
                    <Text
                        className={cls.title}
                        text={article.title}
                    />
                    {types}
                    <img
                        className={cls.img}
                        src={article.img}
                        alt={article.title}
                    />
                    {textBlock && (
                        <ArticleTextBlockComponent
                            className={cls.textBlock}
                            block={textBlock}
                        />
                    )}
                    <div className={cls.footer}>
                        <Button
                            theme={ButtonTheme.OUTLINE}
                            onClick={onOpenArticle}
                        >
                            {t('Читать далее...')}
                        </Button>
                        {views}
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div
            // хук useHover
            // {...bindHover}
            className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
        >
            <Card onClick={onOpenArticle}>
                <div className={cls.imageWrapper}>
                    <img
                        className={cls.img}
                        src={article.img}
                        alt={article.title}
                    />
                    <Text
                        className={cls.date}
                        text={article.createdAt}
                    />
                </div>
                <div className={cls.infoWrapper}>
                    {types}
                    {views}
                </div>
                <Text
                    className={cls.title}
                    text={article.title}
                />
            </Card>
        </div>
    );
});
