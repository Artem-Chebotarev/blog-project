import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { ArticleDetailsCommentsSchema } from '../types/ArticleDetailsCommentsSchema';

import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice';

const data = [
    {
        id: 1,
        text: 'some comment',
        user: {
            id: 1,
            username: 'admin',
        },
    },
    {
        id: 2,
        text: 'some comment1',
        user: {
            id: 1,
            username: 'admin',
        },
    },
];

const normalizedData = {
    entities: {
        1: {
            id: 1,
            text: 'some comment',
            user: {
                id: 1,
                username: 'admin',
            },
        },
        2: {
            id: 2,
            text: 'some comment1',
            user: {
                id: 1,
                username: 'admin',
            },
        },
    },
    ids: [1, 2],
};

describe('articleDetailsCommentsSlice', () => {
    test('test fetchCommentsByArticleId service pending', () => {
        const state: DeepPartial<ArticleDetailsCommentsSchema> = {
            isLoading: false,
        };

        expect(
            articleDetailsCommentsReducer(
                state as ArticleDetailsCommentsSchema,
                fetchCommentsByArticleId.pending,
            ),
        ).toEqual({
            isLoading: true,
            error: undefined,
        });
    });
    test('test fetchCommentsByArticleId service fulfilled', () => {
        const state: DeepPartial<ArticleDetailsCommentsSchema> = {
            isLoading: false,
        };

        expect(
            articleDetailsCommentsReducer(
                state as ArticleDetailsCommentsSchema,
                fetchCommentsByArticleId.fulfilled(data, '1', ''),
            ),
        ).toEqual({
            isLoading: false,
            entities: normalizedData.entities,
            ids: normalizedData.ids,
        });
    });

    // test('test fetchCommentsByArticleId service rejected', () => {
    //     const fn = jest.fn();
    //     const state: DeepPartial<ArticleDetailsSchema> = {
    //         isLoading: false,
    //     };

    //     expect(
    //         articleDetailsReducer(
    //             state as ArticleDetailsSchema,
    //             fetchArticleById.rejected(new Error(), '', fn(), 'error'),
    //         ),
    //     ).toEqual({
    //         isLoading: false,
    //         error: 'error',
    //     });
    // });
});
