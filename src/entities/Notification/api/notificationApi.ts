import { rtkApi } from '@/shared/api/rtkApi';

import { Notification } from '../model/types/notification';

// lazy подгрузка(injection) эндпоинтов и не попадают в main bundle
const notificationApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        // 1 арг - что возвращаем
        // 2 арг - что отдаем на входе
        getNotificationsList: build.query<Notification[], null>({
            // настраиваем запрос (аналогично axios)
            query: () => ({
                url: '/notifications',
            }),
        }),
    }),
});

// хук был сгенерирован автоматически rtkApi
export const useNotificationsList =
    notificationApi.useGetNotificationsListQuery;
