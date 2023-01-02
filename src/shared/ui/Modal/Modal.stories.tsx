import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from '@/shared/const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Modal } from './Modal';

// import 'app/styles/index.scss';

export default {
    title: 'shared/Modal',
    component: Modal,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    isOpen: true,
    children: 'Some Text',
};

export const Dark = Template.bind({});

Dark.args = {
    isOpen: true,
    children: 'Some Text',
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];
