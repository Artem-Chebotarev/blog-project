import { createSelector, Selector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Article, getArticleDetailsData } from 'entities/Article';
import { getUserAuthData, User } from 'entities/User';

const selectors: [
    Selector<StateSchema, Article | undefined>, Selector<StateSchema, User | undefined>
] = [getArticleDetailsData, getUserAuthData];

export const getCanEditArticle = createSelector(
    selectors,
    (article, user) => {
        if (!article || !user) {
            return false;
        }

        return article.user.id === user.id;
    },
);
