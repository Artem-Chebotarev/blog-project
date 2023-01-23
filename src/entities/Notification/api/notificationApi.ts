import { rtkApi } from '@/shared/api/rtkApi';

import { Notification } from '../model/types/notification';

const notificationApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getNotificationsList: build.query<Notification[], null>({
            query: () => ({
                url: '/notifications',
            }),
        }),
    }),
});

export const useNotificationsList =
    notificationApi.useGetNotificationsListQuery;
