import { memo } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Applink } from '@/shared/ui/Applink';
import { Card, CardTheme } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';

import { Notification } from '../../model/types/notification';

import cls from './NotificationItem.module.scss';

interface NotificationItemProps {
    className?: string;
    item: Notification;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
    const { className, item } = props;

    const content = (
        <Card
            className={classNames(cls.NotificationItem, {}, [className])}
            theme={CardTheme.OUTLINED}
        >
            <Text title={item.title} text={item.description} />
        </Card>
    );

    if (item.href) {
        return (
            <Applink className={cls.link} to={item.href} target="_blank">
                {content}
            </Applink>
        );
    }

    return content;
});
