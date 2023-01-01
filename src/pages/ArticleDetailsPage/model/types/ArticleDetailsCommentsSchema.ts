import { EntityState } from '@reduxjs/toolkit';
import { Comment } from '@/entities/Comment';

// расширением типа автоматически добавляем ids и entities
export interface ArticleDetailsCommentsSchema extends EntityState<Comment> {
    isLoading?: boolean;
    error?: string;
}
