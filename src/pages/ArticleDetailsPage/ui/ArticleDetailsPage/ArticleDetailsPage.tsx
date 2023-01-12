import { memo } from 'react';
import { useParams } from 'react-router-dom';

import { ArticleDetails } from '@/entities/Article';
import { ArticleRating } from '@/features/ArticleRating';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import {
    ReducersList,
    useDynamicModuleLoader,
} from '@/shared/lib/helpers/hooks/useDynamicModuleLoad/useDynamicModuleLoad';
import { VStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page';

import { articleDetailsPageReducer } from '../../model/slice';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';

import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    const { id } = useParams<{ id: string }>();

    useDynamicModuleLoader(reducers);

    if (!id) {
        return null;
    }

    return (
        <Page
            className={classNames(cls.ArticleDetailsPage, {}, [className])}
            data-testid="ArticleDetailsPage"
        >
            <VStack gap="16" max>
                <ArticleDetailsPageHeader />
                <ArticleDetails id={id} />
                <ArticleRating id={id} />
                <ArticleRecommendationsList />
                <ArticleDetailsComments id={id} />
            </VStack>
        </Page>
    );
};

export default memo(ArticleDetailsPage);
