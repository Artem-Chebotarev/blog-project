import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Comment } from '@/entities/Comment';
import { ThunkErrors } from '@/shared/const/common';

/**
 * 1 арг в дженерике - что возвращаем с бека
 * 2 арг в дженерике - тип аргумента на входе
 * 3 арг - настройки конфига thunk (AsyncThunkConfig), где можем задавать dispatch, rejectValue
 */
export const fetchCommentsByArticleId = createAsyncThunk<
    Comment[],
    string | undefined,
    ThunkConfig<string>
>(
    'articleDetails/fetchCommentsByArticleId',
    async (articleId, thunkAPI) => {
        // деструктуризация из thunkAPI
        const { extra, rejectWithValue } = thunkAPI;

        if (!articleId) {
            return rejectWithValue('error');
        }

        try {
            const response = await extra.api.get<Comment[]>('/comments', {
                params: {
                    articleId,
                    _expand: 'user',
                },
            });

            if (!response.data) {
                throw new Error(ThunkErrors.NO_DATA);
            }

            return response.data;
        } catch (e) {
            // обработка ошибок в thunk
            return rejectWithValue('error');
        }
    },
);
