import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { VStack } from 'shared/ui/Stack';
import { ArticleList } from 'entities/Article';
import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation();

    const {
        data: articles,
        isLoading,
        error,
    } = useArticleRecommendationsList(3);

    if (isLoading || error) {
        return null;
    }

    return (
        <VStack
            className={classNames('', {}, [className])}
            gap="8"
        >
            <Text
                title={t('Рекомендуем')}
                size={TextSize.M}
            />
            <ArticleList
                articles={articles}
                target="_blank"
            />
        </VStack>
    );
});
