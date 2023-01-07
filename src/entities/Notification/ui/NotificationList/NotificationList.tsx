import { memo } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Skeleton } from '@/shared/ui/Skeleton';
import { VStack } from '@/shared/ui/Stack';

import { useNotificationsList } from '../../api/notificationApi';
import { NotificationItem } from '../NotificationItem/NotificationItem';

interface NotificationListProps {
    className?: string;
}

export const NotificationList = memo((props: NotificationListProps) => {
    const { className } = props;

    const { data: notifications, isLoading } = useNotificationsList(null, {
        pollingInterval: 5000,
    });

    if (isLoading) {
        return (
            <VStack className={classNames('', {}, [className])} gap="16" max>
                <Skeleton width="100%" height="80px" border="8px" />
                <Skeleton width="100%" height="80px" border="8px" />
                <Skeleton width="100%" height="80px" border="8px" />
            </VStack>
        );
    }

    return (
        <VStack className={classNames('', {}, [className])} gap="16" max>
            {notifications?.map((elem) => (
                <NotificationItem key={elem.id} item={elem} />
            ))}
        </VStack>
    );
});
