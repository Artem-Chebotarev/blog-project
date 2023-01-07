import { Rating } from '@/entities/Rating';
import { rtkApi } from '@/shared/api/rtkApi';

interface GetArticleRatingArg {
    userId: number;
    articleId: string;
}

interface RateArticleArg {
    userId: number;
    articleId: string;
    rate: number;
    feedback?: string;
}

// lazy подгрузка(injection) эндпоинтов и не попадают в main bundle
const articleRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        // 1 арг - что возвращаем
        // 2 арг - что отдаем на входе
        getArticleRating: build.query<Rating[], GetArticleRatingArg>({
            // настраиваем запрос (аналогично axios)
            query: ({ userId, articleId }) => ({
                url: '/article-ratings',
                params: {
                    articleId,
                    userId,
                },
            }),
        }),
        rateArticle: build.mutation<void, RateArticleArg>({
            // настраиваем запрос (аналогично axios)
            query: (arg) => ({
                url: '/article-ratings',
                method: 'POST',
                body: arg,
            }),
        }),
    }),
});

// хук был сгенерирован автоматически rtkApi
export const useArticleRating = articleRatingApi.useGetArticleRatingQuery;
export const useRateArticle = articleRatingApi.useRateArticleMutation;
