import React from 'react';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import MainIcon from 'shared/assets/icons/main-20-20.svg';
import AboutIcon from 'shared/assets/icons/about-20-20.svg';
import ProfileIcon from 'shared/assets/icons/profile-20-20.svg';
import ArticleIcon from 'shared/assets/icons/article-20-20.svg';

export interface SidebarItemType {
    Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
    to: string;
    text: string;
    authOnly?: boolean;
}

export const SidebarItemsList: SidebarItemType[] = [
    {
        to: RoutePath.main,
        text: 'Главная',
        Icon: MainIcon,
    },
    {
        to: RoutePath.about,
        text: 'О сайте',
        Icon: AboutIcon,
    },
    {
        to: RoutePath.profile,
        text: 'Профиль',
        Icon: ProfileIcon,
        authOnly: true,
    },
    {
        to: RoutePath.articles,
        text: 'Статьи',
        Icon: ArticleIcon,
        authOnly: true,
    },
];
