import path from 'path';

import { Configuration, DefinePlugin, RuleSetRule } from 'webpack';

import { buildCssLoader } from '../build/loaders/buildCssLoader';

export default {
    stories: ['../../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        {
            name: '@storybook/addon-essentials',
            options: {
                backgrounds: false,
            },
        },
        '@storybook/addon-interactions',
        'storybook-addon-mock',
        'storybook-addon-themes',
    ],
    framework: '@storybook/react',
    core: {
        builder: 'webpack5',
    },
    webpackFinal: async (config: Configuration) => {
        const paths = {
            build: '',
            html: '',
            entry: '',
            src: path.resolve(__dirname, '..', '..', 'src'),
            locales: '',
            buidLocales: '',
        };
        config.resolve!.alias = {
            ...config.resolve?.alias,
            '@': paths.src,
        };
        config.resolve!.modules?.push(paths.src);

        config.resolve!.extensions?.push('.ts', '.tsx');

        // чтобы исключить svg лоадер встроенный в сторибук и подключить далее свой лоадер
        const rules = config.module!.rules as RuleSetRule[];
        config.module!.rules = rules.map((rule: RuleSetRule) => {
            if (
                rule.test instanceof RegExp &&
                rule.test.toString().includes('svg')
            ) {
                return { ...rule, exclude: /\.(png|svg|jpe?g"gif)$/i };
                // return { ...rule, exclude: /\.(svg)$/i };
            }

            return rule;
        });

        config.module!.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        // config.module!.rules.push(buildFileLoader());

        config.module!.rules.push(buildCssLoader(true));

        config.plugins!.push(
            new DefinePlugin({
                __IS_DEV__: JSON.stringify(true),
                __API__: JSON.stringify('https://testapi.ru'),
                __PROJECT__: JSON.stringify('storybook'),
            }),
        );

        return config;
    },
};
