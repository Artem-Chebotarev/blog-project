import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { Applink, ApplinkTheme } from './Applink';

export default {
    title: 'shared/Applink',
    component: Applink,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        to: '/',
    },
} as ComponentMeta<typeof Applink>;

const Template: ComponentStory<typeof Applink> = (args) => <Applink {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: 'Text',
    theme: ApplinkTheme.PRIMARY,
};

export const Secondary = Template.bind({});
Secondary.args = {
    children: 'Text',
    theme: ApplinkTheme.SECONDARY,
};

export const Red = Template.bind({});
Red.args = {
    children: 'Text',
    theme: ApplinkTheme.RED,
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    children: 'Text',
    theme: ApplinkTheme.PRIMARY,
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SecondaryDark = Template.bind({});
SecondaryDark.args = {
    children: 'Text',
    theme: ApplinkTheme.SECONDARY,
};
SecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const RedDark = Template.bind({});
RedDark.args = {
    children: 'Text',
    theme: ApplinkTheme.RED,
};
RedDark.decorators = [ThemeDecorator(Theme.DARK)];
