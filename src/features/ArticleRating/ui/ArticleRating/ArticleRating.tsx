import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { RatingCard } from '@/entities/Rating';
import { getUserAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TextAlign } from '@/shared/ui/Text';

import { useArticleRating, useRateArticle } from '../../api/articleRatingApi';

export interface ArticleRatingProps {
    className?: string;
    id: string;
}

const ArticleRating = memo((props: ArticleRatingProps) => {
    const { className, id } = props;

    const { t } = useTranslation();

    const authData = useSelector(getUserAuthData);

    const { data, isLoading } = useArticleRating({
        userId: authData!.id,
        articleId: id,
    });

    const [rateArticleMutation] = useRateArticle();

    const rating = data?.at(-1);

    const handleRateArticle = useCallback(
        (starsCount: number, feedback?: string) => {
            try {
                rateArticleMutation({
                    userId: authData!.id,
                    articleId: id,
                    rate: starsCount,
                    feedback,
                });
            } catch (error) {
                console.log(error);
            }
        },
        [authData, id, rateArticleMutation],
    );

    const onCancel = useCallback(
        (starsCount: number) => {
            handleRateArticle(starsCount);
        },
        [handleRateArticle],
    );

    const onAccept = useCallback(
        (starsCount: number, feedback?: string) => {
            handleRateArticle(starsCount, feedback);
        },
        [handleRateArticle],
    );

    if (isLoading) {
        return <Skeleton width="100%" height={120} />;
    }

    return (
        <RatingCard
            className={className}
            onAccept={onAccept}
            onCancel={onCancel}
            title={t('Оцените стaтью')}
            feedbackTitle={t(
                'Оставьте свой отзыв о статье, это поможет улучшить качество',
            )}
            hasFeedback
            align={TextAlign.CENTER}
            rate={rating?.rate}
        />
    );
});

export default ArticleRating;
