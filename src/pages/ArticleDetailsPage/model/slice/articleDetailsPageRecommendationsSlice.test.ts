import { fetchArticleRecommendations } from '../services/fetchArticleRecommendations/fetchArticleRecommendations';
import { ArticleDetailsRecommendationsSchema } from '../types/ArticleDetailsRecommendationsSchema';

import { articleDetailsPageRecommendationsReducer } from './articleDetailsPageRecommendationsSlice';

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

    // test('test fetchCommentsByArticleId service fulfilled', () => {
    //     const state: DeepPartial<ArticleDetailsCommentsSchema> = {
    //         isLoading: false,
    //     };

    //     expect(
    //         articleDetailsCommentsReducer(
    //             state as ArticleDetailsCommentsSchema,
    //             fetchCommentsByArticleId.fulfilled(data, '1', ''),
    //         ),
    //     ).toEqual({
    //         isLoading: false,
    //         entities: normalizedData.entities,
    //         ids: normalizedData.ids,
    //     });
    // });

    // test('test fetchCommentsByArticleId service rejected', () => {
    //     const fn = jest.fn();
    //     const state: DeepPartial<ArticleDetailsCommentsSchema> = {
    //         isLoading: false,
    //     };

    //     expect(
    //         articleDetailsCommentsReducer(
    //             state as ArticleDetailsCommentsSchema,
    //             fetchCommentsByArticleId.rejected(
    //                 new Error(),
    //                 '',
    //                 fn(),
    //                 'error',
    //             ),
    //         ),
    //     ).toEqual({
    //         isLoading: false,
    //         error: 'error',
    //     });
    // });
});
