import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticleView } from '@/entities/Article';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import ArticlesPage from './ArticlesPage';

export default {
    title: 'pages/ArticlesPage/ArticlesPage',
    component: ArticlesPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticlesPage>;

const Template: ComponentStory<typeof ArticlesPage> = (args) => (
    <ArticlesPage {...args} />
);

export const Primary = Template.bind({});

Primary.args = {};

Primary.decorators = [
    StoreDecorator({
        articlesPage: {
            page: 2,
            view: ArticleView.GRID,
            hasMore: true,
            _inited: true,
        },
    }),
];
