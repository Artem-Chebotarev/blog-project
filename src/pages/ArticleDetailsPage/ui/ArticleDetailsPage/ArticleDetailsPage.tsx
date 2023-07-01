import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { ArticleDetails } from '@/entities/Article';
import { ArticleRating } from '@/features/ArticleRating';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';
import { getFeatureFlags, toggleFeatures } from '@/shared/lib/features';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import {
    ReducersList,
    useDynamicModuleLoader,
} from '@/shared/lib/helpers/hooks/useDynamicModuleLoad/useDynamicModuleLoad';
import { Card } from '@/shared/ui/Card';
import { VStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page';

import { articleDetailsPageReducer } from '../../model/slice';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';

import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
    className?: string;
}

const CounterRedisigned = () => <div>Counter</div>

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    const { t } = useTranslation();

    const { id } = useParams<{ id: string }>();

    useDynamicModuleLoader(reducers);

    const isArticleRatingEnabled = getFeatureFlags('isArticleRatingEnabled');
    const isCounterEnabled = getFeatureFlags('isCounterEnabled');

    if (!id) {
        return null;
    }

    const articleRatingCard = toggleFeatures({
        name: 'isCounterEnabled',
        on: () => <ArticleRating id={id} />,
        off: () => <Card>{t('Оценка статей скоро появится!')}</Card>,
    })

    return (
        <Page
            className={classNames(cls.ArticleDetailsPage, {}, [className])}
            data-testid="ArticleDetailsPage"
        >
            <VStack gap="16" max>
                <ArticleDetailsPageHeader />
                <ArticleDetails id={id} />
                {articleRatingCard}
                <ArticleRecommendationsList />
                <ArticleDetailsComments id={id} />
            </VStack>
        </Page>
    );
};

export default memo(ArticleDetailsPage);
