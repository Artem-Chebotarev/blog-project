import { User } from '@/entities/User';

import { ArticleBlockType, ArticleType } from '../consts/consts';

export interface ArticleBlockBase {
    id: number;
    type: ArticleBlockType;
}

export interface ArticleTextBlock extends ArticleBlockBase {
    // для работы автокомплита нужно явно указать это свойство
    type: ArticleBlockType.TEXT;
    title?: string;
    paragraphs: string[];
}

export interface ArticleCodeBlock extends ArticleBlockBase {
    type: ArticleBlockType.CODE;
    code: string;
}

export interface ArticleImageBlock extends ArticleBlockBase {
    type: ArticleBlockType.IMAGE;
    title: string;
    src: string;
}

export type ArticleBlock =
    | ArticleImageBlock
    | ArticleCodeBlock
    | ArticleTextBlock;

export interface Article {
    id: number;
    title: string;
    subtitle: string;
    img: string;
    views: number;
    user: User;
    createdAt: string;
    type: Array<ArticleType>;
    blocks: Array<ArticleBlock>;
}
