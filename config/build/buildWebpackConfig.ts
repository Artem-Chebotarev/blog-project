import webpack from 'webpack';

import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { BuildOptions } from './types/config';

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
    const { paths, mode, isDev } = options;

    return {
        mode,
        // resolve склеивает участки пути, __dirname это корень (где именно находится js файл)
        entry: paths.entry, // стартовая точка js приложения
        output: {
            filename: '[name].[contenthash].js',
            path: paths.build,
            clean: true,
            // для правильной работы страниц с :id в роутере
            publicPath: '/',
        },
        plugins: buildPlugins(options),
        module: {
            // обрабатываются те файлы, которые выходят за рамки js
            rules: buildLoaders(options),
        },
        // указываем те файлы, для которых при импорте не будем указывать расширение
        resolve: buildResolvers(options),
        // исходные карты кода
        devtool: isDev ? 'eval-cheap-module-source-map' : undefined,
        devServer: isDev ? buildDevServer(options) : undefined,
    };
}
