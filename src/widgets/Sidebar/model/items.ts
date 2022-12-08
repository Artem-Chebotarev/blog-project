import React from 'react';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import MainIcon from 'shared/assets/icons/main-20-20.svg';
import AboutIcon from 'shared/assets/icons/about-20-20.svg';
import ProfileIcon from 'shared/assets/icons/profile-20-20.svg';

export interface SidebarItemType {
    Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
    to: string;
    text: string;
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
    },
];