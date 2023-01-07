import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';

import { StateSchema } from '@/app/providers/StoreProvider';
import {
    Article,
    ArticleSortField,
    ArticleType,
    ArticleView,
} from '@/entities/Article';
import { ARTICLES_VIEW_LOCAL_STORAGE_KEY } from '@/shared/const/localStorage';
import { SortOrder } from '@/shared/types/sort';

import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';
import { ArticlesPageSchema } from '../types/articlesPageSchema';

const articlesAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id,
});

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
    (state) => state.articlesPage || articlesAdapter.getInitialState(),
);

const articlesPageSlice = createSlice({
    name: 'articlesPageSlice',
    initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
        view: ArticleView.GRID,
        page: 1,
        limit: 9,
        hasMore: true,
        _inited: false,
        order: SortOrder.ASC,
        sort: ArticleSortField.CREATED,
        search: '',
        type: ArticleType.ALL,
    }),
    reducers: {
        setView: (state, action: PayloadAction<ArticleView>) => {
            localStorage.setItem(
                ARTICLES_VIEW_LOCAL_STORAGE_KEY,
                action.payload,
            );
            state.view = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        initView: (state) => {
            const view = localStorage.getItem(
                ARTICLES_VIEW_LOCAL_STORAGE_KEY,
            ) as ArticleView;

            if (view) {
                state.view = view;
            }

            state.limit = view === ArticleView.LIST ? 4 : 9;
            state._inited = true;
        },
        setOrder: (state, action: PayloadAction<SortOrder>) => {
            state.order = action.payload;
        },
        setSort: (state, action: PayloadAction<ArticleSortField>) => {
            state.sort = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setType: (state, action: PayloadAction<ArticleType>) => {
            state.type = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticlesList.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;

                if (action.meta.arg.replace) {
                    articlesAdapter.removeAll(state);
                }
            })
            .addCase(fetchArticlesList.fulfilled, (state, action) => {
                state.isLoading = false;

                /**
                 * ЭТОТ ФЛАГ НУЖНО ПОЛУЧАТЬ С БЭКА,
                 * ТАК КАК ПРИ ТАКОЙ РЕАЛИЗАЦИИ ЕСТЬ ЛИШНЯЯ ПОДГРУЗКА СКЕЛЕТОНОВ
                 */
                state.hasMore = action.payload.length >= state.limit;

                if (action.meta.arg.replace) {
                    articlesAdapter.setMany(state, action.payload);
                } else {
                    /**
                     * для правильной работы бесконечного скролла
                     */
                    articlesAdapter.addMany(state, action.payload);
                }
            })
            .addCase(fetchArticlesList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: articlesPageReducer, actions: articlesPageActions } =
    articlesPageSlice;
