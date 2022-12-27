import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Button } from '../Button/Button';

import { Dropdown } from './Dropdown';

export default {
    title: 'shared/Dropdown',
    component: Dropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args} />;

export const Normal = Template.bind({});

Normal.args = {
    trigger: <Button>Open</Button>,
    items: [
        {
            id: '1',
            content: 'first',
        },
        {
            id: '2',
            content: 'second',
        },
        {
            id: '3',
            content: 'third',
        },
    ],
};
