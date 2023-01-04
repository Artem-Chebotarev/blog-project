// TODO не работает addon-mock для storybook
import { ComponentStory, ComponentMeta } from '@storybook/react';
import withMock from 'storybook-addon-mock';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import ArticleRating from './ArticleRating';

export default {
    title: 'features/ArticleRating',
    component: ArticleRating,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [withMock],
} as ComponentMeta<typeof ArticleRating>;

const Template: ComponentStory<typeof ArticleRating> = (args) => <ArticleRating {...args} />;

export const Normal = Template.bind({});

Normal.args = {
    id: '1',
};
Normal.decorators = [StoreDecorator({
    user: {
        authData: {
            id: 1,
        },
    },
})];

Normal.parameters = {
    mockData: [
        {
            url: `${__API__}/article-rating?userId=1&articleId=1`,
            method: 'GET',
            status: 200,
            response: [
                {
                    rate: 4,
                },
            ],
        },
    ],
};

export const WithoutRate = Template.bind({});

WithoutRate.args = {
    id: '1',
};
WithoutRate.decorators = [StoreDecorator({
    user: {
        authData: {
            id: 1,
        },
    },
})];

WithoutRate.parameters = {
    mockData: [
        {
            url: `${__API__}/article-rating?userId=1&articleId=1`,
            method: 'GET',
            status: 200,
            response: [],
        },
    ],
};
