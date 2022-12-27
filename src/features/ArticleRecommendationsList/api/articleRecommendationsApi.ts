import { rtkApi } from 'shared/api/rtkApi';

// lazy подгрузка(injection) эндпоинтов и не попадают в main bundle
const recommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRecommendationsList: build.query({
            // настраиваем запрос (аналогично axios)
            query: (limit) => ({
                url: '/articles',
                params: {
                    _limit: limit,
                },
            }),
        }),
        // на создание или редактирование данных
        // createArticleRecommendation: build.mutation({
        //     // настраиваем запрос (аналогично axios)
        //     query: (limit) => ({
        //         url: '/articles',
        //         params: {
        //             _limit: limit,
        //         },
        //         method: 'POST',
        //     }),
        // }),
    }),
});

// хук был сгенерирован автоматически rtkApi
export const useArticleRecommendationsList = recommendationsApi
    .useGetArticleRecommendationsListQuery;

// export const useCreateArticleRecommendation = recommendationsApi
//     .useCreateArticleRecommendationMutation;
