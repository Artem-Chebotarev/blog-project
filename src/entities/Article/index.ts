export { ArticleDetails } from './ui/ArticleDetails/ArticleDetails';

export type { Article } from './model/types/article';
export {
    ArticleView,
    ArticleSortField,
    ArticleType,
    ArticleBlockType,
} from './model/consts/consts';
export type { ArticleDetailsSchema } from './model/types/articleDetailsSchema';
export { articleDetailsReducer } from './model/slice/articleDetailsSlice';
export { getArticleDetailsData } from './model/selectors/articleDetails';
export { ArticleList } from './ui/ArticleList/ArticleList';
export { ArticleSortSelector } from './ui/ArticleSortSelector/ArticleSortSelector';
export { ArticleTypeTabs } from './ui/ArticleTypeTabs/ArticleTypeTabs';
