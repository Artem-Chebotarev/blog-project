import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

import { Text, TextSize, TextTheme } from './Text';

export default {
    title: 'shared/Text',
    component: Text,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    title: 'Title',
    text: 'Some Text',
};

export const Error = Template.bind({});

Error.args = {
    title: 'Title',
    text: 'Some Text',
    theme: TextTheme.ERROR,
};

export const onlyTitle = Template.bind({});

onlyTitle.args = {
    title: 'Title',
};

export const onlyText = Template.bind({});

onlyText.args = {
    text: 'Some Text',
};

export const PrimaryDark = Template.bind({});

Primary.args = {
    title: 'Title',
    text: 'Some Text',
};

PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const onlyTitleDark = Template.bind({});

onlyTitleDark.args = {
    title: 'Title',
};

onlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const onlyTextDark = Template.bind({});

onlyTextDark.args = {
    text: 'Some Text',
};

onlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SizeL = Template.bind({});

SizeL.args = {
    title: 'Title',
    text: 'Some Text',
    size: TextSize.L,
};

export const SizeM = Template.bind({});

SizeM.args = {
    title: 'Title',
    text: 'Some Text',
    size: TextSize.M,
};

export const SizeS = Template.bind({});

SizeS.args = {
    title: 'Title',
    text: 'Some Text',
    size: TextSize.S,
};
