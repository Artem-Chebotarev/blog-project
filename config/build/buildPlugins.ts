import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import CopyPlugin from 'copy-webpack-plugin';
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
        // применяет изменения без обновления браузера
        ...(isDev ? [new ReactRefreshWebpackPlugin()] : []),
        // new BundleAnalyzerPlugin({
        //     openAnalyzer: false,
        // }),
        ...(analyze ? [new BundleAnalyzerPlugin()] : []),
    ].filter(Boolean);
}
