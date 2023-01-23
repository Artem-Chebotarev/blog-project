import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';

import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import { getRouteArticleDetails } from '@/shared/const/router';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { AppImage } from '@/shared/ui/AppImage';
import { Applink } from '@/shared/ui/Applink';
import { Avatar } from '@/shared/ui/Avatar';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Icon } from '@/shared/ui/Icon';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Text } from '@/shared/ui/Text';

import { ArticleBlockType, ArticleView } from '../../model/consts/consts';
import { Article, ArticleTextBlock } from '../../model/types/article';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

import cls from './ArticleListItem.module.scss';

interface ArticleListItemProps {
    className?: string;
    article: Article;
    view: ArticleView;
    target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
    const { className, article, view, target } = props;

    const { t } = useTranslation();

    const types = <Text className={cls.types} text={article.type.join(', ')} />;

    const views = (
        <>
            <Text className={cls.views} text={String(article.views)} />
            <Icon Svg={EyeIcon} />
        </>
    );

    if (view === ArticleView.LIST) {
        const textBlock = article.blocks.find(
            (elem) => elem.type === ArticleBlockType.TEXT,
        ) as ArticleTextBlock;

        return (
            <div
                className={classNames('', {}, [className, cls[view]])}
                data-testid="ArticleListItem"
            >
                <Card>
                    <div className={cls.header}>
                        <Avatar size={30} src={article.user.avatar} />
                        <Text
                            className={cls.username}
                            text={article.user.username}
                        />
                        <Text className={cls.date} text={article.createdAt} />
                    </div>
                    <Text className={cls.title} text={article.title} />
                    {types}
                    <AppImage
                        className={cls.img}
                        src={article.img}
                        alt={article.title}
                        fallback={<Skeleton width="100%" height={250} />}
                    />
                    {textBlock && (
                        <ArticleTextBlockComponent
                            className={cls.textBlock}
                            block={textBlock}
                        />
                    )}
                    <div className={cls.footer}>
                        <Applink
                            to={getRouteArticleDetails(String(article.id))}
                            target={target}
                        >
                            <Button theme={ButtonTheme.OUTLINE}>
                                {t('Читать далее...')}
                            </Button>
                        </Applink>
                        {views}
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <Applink
            className={classNames('', {}, [className, cls[view]])}
            to={getRouteArticleDetails(String(article.id))}
            target={target}
        >
            <Card>
                <div className={cls.imageWrapper} data-testid="ArticleListItem">
                    <AppImage
                        className={cls.img}
                        src={article.img}
                        alt={article.title}
                        fallback={<Skeleton width={200} height={200} />}
                    />
                    <Text className={cls.date} text={article.createdAt} />
                </div>
                <div className={cls.infoWrapper}>
                    {types}
                    {views}
                </div>
                <Text className={cls.title} text={article.title} />
            </Card>
        </Applink>
    );
});
