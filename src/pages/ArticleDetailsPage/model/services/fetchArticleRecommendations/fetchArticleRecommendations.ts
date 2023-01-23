import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article } from '@/entities/Article';
import { ThunkErrors } from '@/shared/const/common';

/**
 * 1 арг в дженерике - что возвращаем с бека
 * 2 арг в дженерике - тип аргумента на входе
 * 3 арг - настройки конфига thunk (AsyncThunkConfig), где можем задавать dispatch, rejectValue
 */
export const fetchArticleRecommendations = createAsyncThunk<
    Article[],
    void,
    ThunkConfig<string>
>('articleDetails/fetchArticleRecommendations', async (_, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    try {
        const response = await extra.api.get<Article[]>('/articles', {
            params: {
                _limit: 4,
                _expand: 'user',
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
