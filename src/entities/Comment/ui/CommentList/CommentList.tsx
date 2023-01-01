import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { Comment } from '../../model/types/comment';
import { CommentItem } from '../CommentItem/CommentItem';

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

    if (isLoading) {
        if (isLoading) {
            return (
                <VStack
                    gap="16"
                    max
                >
                    <CommentItem isLoading />
                    <CommentItem isLoading />
                    <CommentItem isLoading />
                </VStack>
            );
        }
    }

    return (
        <VStack
            gap="16"
            max
        >
            {comments?.length ? (
                comments.map((elem) => (
                    <CommentItem
                        key={elem.id}
                        comment={elem}
                        isLoading={isLoading}
                    />
                ))
            ) : (<Text title={t('Комментарии отсутствуют')} />)}
        </VStack>
    );
});
