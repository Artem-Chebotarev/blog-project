import { ReactElement, SVGProps } from 'react';

export interface SidebarItemType {
    Icon: (props: SVGProps<SVGElement>) => ReactElement;
    path: string;
    text: string;
    authOnly?: boolean;
}
