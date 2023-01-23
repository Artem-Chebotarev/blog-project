import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article, ArticleType } from '@/entities/Article';
import { ThunkErrors } from '@/shared/const/common';
import { addQueryParams } from '@/shared/lib/helpers/url/addQueryParams/addQueryParams';

import {
    getArticlesPageNumber,
    getArticlesPageLimit,
    getArticlesPageOrder,
    getArticlesPageSort,
    getArticlesPageSearch,
    getArticlesPageType,
} from '../../selectors/articlesPageSelectors';

interface FetchArticlesListProps {
    replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<
    Article[],
    FetchArticlesListProps,
    ThunkConfig<string>
>('articlesPage/fetchArticlesList', async (_, thunkAPI) => {
    const { extra, rejectWithValue, getState } = thunkAPI;

    const page = getArticlesPageNumber(getState());
    const limit = getArticlesPageLimit(getState());
    const order = getArticlesPageOrder(getState());
    const sort = getArticlesPageSort(getState());
    const search = getArticlesPageSearch(getState());
    const type = getArticlesPageType(getState());

    try {
        addQueryParams({
            order,
            sort,
            search,
            type,
        });
        const response = await extra.api.get<Article[]>('/articles', {
            params: {
                _expand: 'user',
                _limit: limit,
                _page: page,
                _order: order,
                _sort: sort,
                q: search,
                type: type === ArticleType.ALL ? undefined : type,
            },
        });

        if (!response.data) {
            throw new Error(ThunkErrors.NO_DATA);
        }

        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
