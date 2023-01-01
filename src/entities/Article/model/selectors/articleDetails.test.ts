import { StateSchema } from '@/app/providers/StoreProvider';
import {
    getArticleDetailsData,
    getArticleDetailsIsLoading,
    getArticleDetailsError,
} from './articleDetails';

describe('getArticleDetailsData', () => {
    test('getArticleDetailsData should return data', () => {
        const data = {
            id: 1,
            subtitle: 'subtitle',
        };

        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                data,
            },
        };
        expect(getArticleDetailsData(state as StateSchema)).toEqual(data);
    });

    test('getArticleDetailsData should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticleDetailsData(state as StateSchema)).toEqual(undefined);
    });

    test('getArticleDetailsIsLoading should return isLoading', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                isLoading: true,
            },
        };
        expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(true);
    });

    test('getArticleDetailsIsLoading should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(false);
    });

    test('getArticleDetailsError should return isLoading', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                error: 'ERROR',
            },
        };
        expect(getArticleDetailsError(state as StateSchema)).toEqual('ERROR');
    });

    test('getArticleDetailsError should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticleDetailsError(state as StateSchema)).toEqual(undefined);
    });
});
