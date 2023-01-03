import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import { BuildOptions } from './types/config';

export function buildPlugins({
    paths,
    isDev,
    apiUrl,
    analyze,
    project,
}: BuildOptions): webpack.WebpackPluginInstance[] {
    return [
        // файл index.html будет использоваться как шаблон куда будет встраиваться
        // скомпилированный js код
        new HtmlWebpackPlugin({ template: paths.html }),
        new webpack.ProgressPlugin(),
        // позволяет вынести код css в отдельный файл (из main)
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css', // для асинхронной подгрузки файлов css
        }),
        // позволяет прокидывать в приложение глобальные переменные (isDev, project, apiUrl)
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __API__: JSON.stringify(apiUrl),
            __PROJECT__: JSON.stringify(project),
        }),
        // откуда перемещаем, куда перемещаем
        new CopyPlugin({
            patterns: [
                { from: paths.locales, to: paths.buidLocales },
            ],
        }),
        // для отлавливания кольцевых зависимостей в проекте(напр. модуль А импортирует
        // что-то из модуля Б, а модуль Б импортирует что-то из модуля А)
        new CircularDependencyPlugin({
            exclude: /node_modules/,
            failOnError: true,
        }),
        // позволяет вынести проверку ts типов в отдельнй процесс, и не загружать рантайм
        // теперь проверка типов не влияет на скорость сборки основного кода
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                diagnosticOptions: {
                    semantic: true,
                    syntactic: true,
                },
                mode: 'write-references',
            },
        }),
        // применяет изменения без обновления браузера
        ...(isDev ? [new ReactRefreshWebpackPlugin()] : []),
        // new BundleAnalyzerPlugin({
        //     openAnalyzer: false,
        // }),
        ...(analyze ? [new BundleAnalyzerPlugin()] : []),
    ].filter(Boolean);
}
