import webpack, { DefinePlugin, RuleSetRule } from 'webpack';
import path from 'path';
import { BuildPaths } from '../build/types/config';
import { buildCssLoader } from '../build/loaders/buildCssLoader';

export default ({ config }: {config: webpack.Configuration}) => {
    const paths: BuildPaths = {
        build: '',
        html: '',
        entry: '',
        src: path.resolve(__dirname, '..', '..', 'src'),
    };
    config.resolve?.modules?.push(paths.src);

    config.resolve?.extensions?.push('.ts', '.tsx');

    // чтобы исключить svg лоадер встроенный в сторибук и подключить далее свой лоадер
    // @ts-ignore next-line
    // eslint-disable-next-line no-param-reassign
    config.module.rules = config.module.rules.map((rule: RuleSetRule) => {
        if (rule.test instanceof RegExp && rule.test.toString().includes('svg')) {
            return { ...rule, exclude: /\.svg$/i };
        }

        return rule;
    });

    config.module?.rules?.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    });

    config.module?.rules?.push(buildCssLoader(true));

    config.plugins?.push(new DefinePlugin({
        __IS_DEV__: JSON.stringify(true),
        __API__: JSON.stringify(''),
    }));

    return config;
};
