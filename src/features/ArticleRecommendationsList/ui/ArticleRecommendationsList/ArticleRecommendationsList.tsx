import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleList } from '@/entities/Article';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { Text, TextSize } from '@/shared/ui/Text';

import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo(
    (props: ArticleRecommendationsListProps) => {
        const { className } = props;
        const { t } = useTranslation('article-details');

        const {
            data: articles,
            isLoading,
            error,
        } = useArticleRecommendationsList(3);

        if (isLoading || error || !articles) {
            return null;
        }

        return (
            <VStack
                className={classNames('', {}, [className])}
                gap="8"
                data-testid="ArticleRecommendationsList"
            >
                <Text title={t('Рекомендуем')} size={TextSize.M} />
                <ArticleList articles={articles} target="_blank" />
            </VStack>
        );
    },
);
