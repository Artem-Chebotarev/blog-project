import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { ArticleDetails } from '@/entities/Article';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { ReducersList, useDynamicModuleLoader } from '@/shared/lib/helpers/hooks/useDynamicModuleLoad/useDynamicModuleLoad';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/Stack';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';
import { articleDetailsPageReducer } from '../../model/slice';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleRating } from '@/features/ArticleRating';

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

    return (
        <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            <VStack
                gap="16"
                max
            >
                <ArticleDetailsPageHeader />
                <ArticleDetails id={id!} />
                <ArticleRating id={id!} />
                <ArticleRecommendationsList />
                <ArticleDetailsComments id={id!} />
            </VStack>
        </Page>
    );
};

export default memo(ArticleDetailsPage);
