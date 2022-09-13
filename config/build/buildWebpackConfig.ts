import webpack from 'webpack';
import { BuildOptions } from "./types/config";
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { buildDevServer } from './buildDevServer';

export function buildWebpackConfig (options: BuildOptions): webpack.Configuration {
    const { paths, mode, isDev } = options;

    return {
        mode,
        // resolve  склеивает участки пути, __dirname это корень (где именно находится js файл)
        entry:  paths.entry, // стартовая точка js приложения
        output: {
            filename: '[name].[contenthash].js',
            path: paths.build,
            clean: true,
        },
        plugins: buildPlugins(options),
        module: {
            // обрабатываются те файлы, которые выходят за рамки js
            rules: buildLoaders(options),
        },
        // указываем те файлы, для которых при импорте не будем указывать расширение
        resolve: buildResolvers(),
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: isDev ? buildDevServer(options) : undefined,
    }
}