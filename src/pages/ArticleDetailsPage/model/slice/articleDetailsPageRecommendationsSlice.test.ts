import { ArticleType } from '@/entities/Article';

import { fetchArticleRecommendations } from '../services/fetchArticleRecommendations/fetchArticleRecommendations';
import { ArticleDetailsRecommendationsSchema } from '../types/ArticleDetailsRecommendationsSchema';

import { articleDetailsPageRecommendationsReducer } from './articleDetailsPageRecommendationsSlice';

const data = [
    {
        id: 1,
        title: 'Javascript news',
        subtitle: 'Что нового в JS за 2022 год?',
        img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
        views: 1022,
        createdAt: '26.02.2022',
        user: {
            id: 1,
            username: 'Fill',
        },
        type: [ArticleType.IT],
        blocks: [],
    },
];

const normalizedData = {
    entities: {
        1: {
            id: 1,
            title: 'Javascript news',
            subtitle: 'Что нового в JS за 2022 год?',
            img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
            views: 1022,
            createdAt: '26.02.2022',
            user: {
                id: 1,
                username: 'Fill',
            },
            type: [ArticleType.IT],
            blocks: [],
        },
    },
    ids: [1],
};

describe('articleDetailsPageRecommendationsSlice', () => {
    test('test fetchArticleRecommendations service pending', () => {
        const state: DeepPartial<ArticleDetailsRecommendationsSchema> = {
            isLoading: false,
        };

        expect(
            articleDetailsPageRecommendationsReducer(
                state as ArticleDetailsRecommendationsSchema,
                fetchArticleRecommendations.pending,
            ),
        ).toEqual({
            isLoading: true,
            error: undefined,
        });
    });

    test('test fetchArticleRecommendations service fulfilled', () => {
        const state: DeepPartial<ArticleDetailsRecommendationsSchema> = {
            isLoading: false,
        };

        expect(
            articleDetailsPageRecommendationsReducer(
                state as ArticleDetailsRecommendationsSchema,
                fetchArticleRecommendations.fulfilled(data, '1'),
            ),
        ).toEqual({
            isLoading: false,
            entities: normalizedData.entities,
            ids: normalizedData.ids,
        });
    });

    test('test fetchArticleRecommendations service rejected', () => {
        const fn = jest.fn();
        const state: DeepPartial<ArticleDetailsRecommendationsSchema> = {
            isLoading: false,
        };

        expect(
            articleDetailsPageRecommendationsReducer(
                state as ArticleDetailsRecommendationsSchema,
                fetchArticleRecommendations.rejected(
                    new Error(),
                    '',
                    fn(),
                    'error',
                ),
            ),
        ).toEqual({
            isLoading: false,
            error: 'error',
        });
    });
});
