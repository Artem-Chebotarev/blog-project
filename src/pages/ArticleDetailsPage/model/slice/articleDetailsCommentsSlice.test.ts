import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { ArticleDetailsCommentsSchema } from '../types/ArticleDetailsCommentsSchema';

import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice';

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
    // test('test fetchCommentsByArticleId service fulfilled', () => {
    //     const state: DeepPartial<ArticleDetailsSchema> = {
    //         isLoading: false,
    //     };

    //     expect(
    //         articleDetailsReducer(
    //             state as ArticleDetailsSchema,
    //             fetchArticleById.fulfilled(data, '1', ''),
    //         ),
    //     ).toEqual({
    //         isLoading: false,
    //         data,
    //     });
    // });

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
