import { useCallback, useState } from 'react';
import { NotificationList } from '@/entities/Notification';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Icon } from '@/shared/ui/Icon/Icon';
import { Popover } from '@/shared/ui/Popups';
import NotificationIcon from '@/shared/assets/icons/notification-20-20.svg';
import { Drawer } from '@/shared/ui/Drawer/Drawer';
import { detectDevice as isMobile } from '@/shared/lib/helpers/detectDevice/detectDevice';

import { AnimationProvider } from '@/shared/lib/helpers/components/AnimationProvider';
import cls from './NotificationButton.module.scss';

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = (props: NotificationButtonProps) => {
    const { className } = props;

    const [isOpen, setIsOpen] = useState(false);

    const onOpenDrawer = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onCloseDrawer = useCallback(() => {
        setIsOpen(false);
    }, []);

    const trigger = (
        <Button
            theme={ButtonTheme.CLEAR}
            onClick={onOpenDrawer}
        >
            <Icon
                Svg={NotificationIcon}
                inverted
            />
        </Button>
    );

    return (
        isMobile() ? (
            <AnimationProvider>
                {trigger}
                <Drawer
                    isOpen={isOpen}
                    onClose={onCloseDrawer}
                >
                    <NotificationList />
                </Drawer>
            </AnimationProvider>
        )
            : (
                <Popover
                    className={classNames(cls.NotificationButton, {}, [className])}
                    trigger={trigger}
                    direction="bottom left"
                >
                    <NotificationList className={cls.notifications} />
                </Popover>
            )
    );
};
