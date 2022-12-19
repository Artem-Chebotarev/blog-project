import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticleDetailsData } from 'entities/Article';
import { Comment } from 'entities/Comment';
import { getUserAuthData } from 'entities/User';
import { ThunkErrors } from 'shared/const/common';
import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId';

// 1 арг в дженерике - что возвращаем с бека
// 2 арг в дженерике - тип аргумента на входе
// 3 арг - настройки конфига thunk (AsyncThunkConfig), где можем задавать dispatch, rejectValue
export const addCommentForArticle = createAsyncThunk<Comment, string, ThunkConfig<string>>(
    'articleDetails/addCommentForArticle',
    // деструктуризация из thunkAPI
    async (text, thunkAPI) => {
        const {
            dispatch,
            extra,
            rejectWithValue,
            getState,
        } = thunkAPI;

        const userData = getUserAuthData(getState());
        const article = getArticleDetailsData(getState());

        if (!userData || !text || !article) {
            return rejectWithValue(ThunkErrors.NO_DATA);
        }

        try {
            const response = await extra.api.post<Comment>('/comments', {
                articleId: article.id,
                userId: userData.id,
                text,
            });

            // если ответ от сервера пришел пустой, то это будет ошибкой
            if (!response.data) {
                throw new Error(ThunkErrors.NO_DATA);
            }

            // либо добавлять в стейт этот коммент, но
            // идеальный вариант на добавление комента получить от бэка все коменты,
            // включая добавленный
            dispatch(fetchCommentsByArticleId(String(article.id)));

            return response.data;
        } catch (e) {
            // обработка ошибок в thunk
            return rejectWithValue('error');
        }
    },
);
