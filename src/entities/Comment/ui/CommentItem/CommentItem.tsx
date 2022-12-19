import { memo } from 'react';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Applink } from 'shared/ui/Applink/Applink';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Text } from 'shared/ui/Text/Text';
import { Comment } from '../../model/types/comment';

import cls from './CommentItem.module.scss';

interface CommentItemProps {
    className?: string;
    comment?: Comment;
    isLoading?: boolean;
}

export const CommentItem = memo((props: CommentItemProps) => {
    const {
        className,
        comment,
        isLoading,
    } = props;

    if (isLoading) {
        return (
            <div className={classNames(cls.CommentItem, {}, [className, cls.loading])}>
                <div className={cls.header}>
                    <Skeleton
                        width={30}
                        height={30}
                        border="50%"
                    />
                    <Skeleton
                        width={100}
                        height={16}
                    />
                </div>
                <Skeleton
                    className={cls.text}
                    width="100%"
                    height={50}
                />
            </div>
        );
    }

    if (!comment) {
        return null;
    }

    return (
        <div className={classNames(cls.CommentItem, {}, [className])}>
            <Applink
                className={cls.header}
                to={`${RoutePath.profile}${comment.user.id}`}
            >
                {comment.user.avatar && (
                    <Avatar
                        src={comment.user.avatar}
                        size={30}
                    />
                )}
                <Text title={comment.user.username} />
            </Applink>
            <Text
                className={cls.text}
                text={comment.text}
            />
        </div>
    );
});
