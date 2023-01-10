import { ArticleType } from '../consts/consts';
import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';
import { ArticleDetailsSchema } from '../types/articleDetailsSchema';

import { articleDetailsReducer } from './articleDetailsSlice';

const data = {
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
};

describe('articleDetailsSlice', () => {
    test('test fetchArticleById service pending', () => {
        const state: DeepPartial<ArticleDetailsSchema> = {
            isLoading: false,
        };

        expect(
            articleDetailsReducer(
                state as ArticleDetailsSchema,
                fetchArticleById.pending,
            ),
        ).toEqual({
            isLoading: true,
            error: undefined,
        });
    });
    test('test fetchArticleById service fulfilled', () => {
        const state: DeepPartial<ArticleDetailsSchema> = {
            isLoading: false,
        };

        expect(
            articleDetailsReducer(
                state as ArticleDetailsSchema,
                fetchArticleById.fulfilled(data, '1', ''),
            ),
        ).toEqual({
            isLoading: false,
            data,
        });
    });

    test('test fetchArticleById service rejected', () => {
        const fn = jest.fn();
        const state: DeepPartial<ArticleDetailsSchema> = {
            isLoading: false,
        };

        expect(
            articleDetailsReducer(
                state as ArticleDetailsSchema,
                fetchArticleById.rejected(new Error(), '', fn(), 'error'),
            ),
        ).toEqual({
            isLoading: false,
            error: 'error',
        });
    });
});
