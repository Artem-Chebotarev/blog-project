import { EntityState } from '@reduxjs/toolkit';
import { Article } from '@/entities/Article';

// расширением типа автоматически добавляем ids и entities
export interface ArticleDetailsRecommendationsSchema extends EntityState<Article> {
    isLoading?: boolean;
    error?: string;
}
