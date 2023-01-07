import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CommentItem } from './CommentItem';

export default {
    title: 'entities/Comment/CommentItem',
    component: CommentItem,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentItem>;

const Template: ComponentStory<typeof CommentItem> = (args) => (
    <CommentItem {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
    comment: {
        id: 1,
        text: 'hello world',
        user: { id: 1, username: 'Vasya' },
    },
};

export const Loading = Template.bind({});
Loading.args = {
    comment: {
        id: 1,
        text: 'hello world',
        user: { id: 1, username: 'Vasya' },
    },
    isLoading: true,
};
