import { ArticleType } from '@/entities/Article';

import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';
import { ArticlesPageSchema } from '../types/articlesPageSchema';

import { articlesPageReducer } from './articlesPageSlice';

const data = [
    {
        id: 1,
        title: 'Javascript news',
        subtitle: 'Что нового в JS за 2022 год?',
        img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
        views: 1022,
        createdAt: '26.02.2022',
        user: {
            id: '1',
            username: 'Fill',
        },
        type: [ArticleType.IT],
        blocks: [],
    },
    {
        id: 2,
        title: 'Javascript NEWS',
        subtitle: 'Что нового в JS за 2022 год?',
        img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
        views: 1022,
        createdAt: '26.02.2022',
        user: {
            id: '1',
            username: 'Fill',
        },
        type: [ArticleType.IT],
        blocks: [],
    },
];

describe('articlesPageSlice', () => {
    test('test fetchArticlesList service pending', () => {
        const state: DeepPartial<ArticlesPageSchema> = {
            isLoading: false,
        };

        expect(
            articlesPageReducer(
                state as ArticlesPageSchema,
                fetchArticlesList.pending('', { replace: true }, ''),
            ),
        ).toEqual({
            isLoading: true,
            error: undefined,
            entities: {},
            ids: [],
        });
    });
    test('test fetchArticlesList service fulfilled with addMany', () => {
        const state: DeepPartial<ArticlesPageSchema> = {
            isLoading: false,
            entities: {},
            ids: [],
        };

        expect(
            articlesPageReducer(
                state as ArticlesPageSchema,
                fetchArticlesList.fulfilled(data, '', { replace: false }),
            ),
        ).toEqual({
            isLoading: false,
            entities: { 1: data[0], 2: data[1] },
            ids: [1, 2],
            hasMore: false,
        });

        // const nextState = articlesPageReducer(
        //     state as ArticlesPageSchema,
        //     fetchArticlesList.fulfilled(data, '', { replace: false }),
        // );

        // expect(nextState.isLoading).toBe(false);
        // expect(nextState.entities).toEqual({ 1: data[0], 2: data[1] });
        // expect(nextState.ids).toEqual([1, 2]);
    });
    test('test fetchArticlesList service fulfilled with setMany', () => {
        const state: DeepPartial<ArticlesPageSchema> = {
            isLoading: false,
            entities: {},
            ids: [],
        };

        expect(
            articlesPageReducer(
                state as ArticlesPageSchema,
                fetchArticlesList.fulfilled(data, '', { replace: true }),
            ),
        ).toEqual({
            isLoading: false,
            entities: { 1: data[0], 2: data[1] },
            ids: [1, 2],
            hasMore: false,
        });
    });
    test('test fetchArticlesList service rejected', () => {
        const fn = jest.fn();
        const state: DeepPartial<ArticlesPageSchema> = {
            isLoading: false,
        };

        expect(
            articlesPageReducer(
                state as ArticlesPageSchema,
                fetchArticlesList.rejected(new Error(), '', fn(), 'error'),
            ),
        ).toEqual({
            isLoading: false,
            error: 'error',
        });
    });
});
