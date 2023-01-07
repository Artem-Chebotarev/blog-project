import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

import ProfilePage from './ProfilePage';

export default {
    title: 'pages/ProfilePage',
    component: ProfilePage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = () => <ProfilePage />;

export const Normal = Template.bind({});

Normal.args = {};

Normal.decorators = [
    ThemeDecorator(Theme.LIGHT),
    StoreDecorator({
        profile: {
            form: {
                username: 'Admin',
                age: 22,
                country: Country.Russia,
                lastname: 'Ch',
                first: 'Art',
                city: 'New-York',
                currency: Currency.USD,
            },
        },
    }),
];

export const Dark = Template.bind({});

Dark.args = {};

Dark.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
        profile: {
            form: {
                username: 'Admin',
                age: 22,
                country: Country.Russia,
                lastname: 'Ch',
                first: 'Art',
                city: 'New-York',
                currency: Currency.USD,
            },
        },
    }),
];
