import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Comment } from '../../model/types/comment';
import { CommentItem } from '../CommentItem/CommentItem';

import cls from './CommentList.module.scss';

interface CommentListProps {
    className?: string;
    comments?: Comment[];
    isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
    const {
        className,
        comments,
        isLoading,
    } = props;

    const { t } = useTranslation();

    return (
        <div className={classNames(cls.CommentList, {}, [className])}>
            {comments?.length ? (
                comments.map((elem) => (
                    <CommentItem
                        key={elem.id}
                        className={cls.comment}
                        comment={elem}
                        isLoading={isLoading}
                    />
                ))
            ) : (<Text title={t('Комментарии отсутствуют')} />)}
        </div>
    );
});
