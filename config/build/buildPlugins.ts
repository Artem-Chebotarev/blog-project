import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/config';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

export function buildPlugins({ paths, isDev }: BuildOptions): webpack.WebpackPluginInstance[] {
    return [
        // файл index.html будет использоваться как шаблон куда будет встраиваться скомпилированный js код
        new HtmlWebpackPlugin({ template: paths.html }),
        new webpack.ProgressPlugin(),
        // позволяет вынести код css в отдельный файл (из main)
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css', // для асинхронной подгрузки файлов css
        }),
        // позволяет прокидывать в приложение глобальные переменные (isDev)
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
        }),
        // применяет изменения без обновления браузера
        ...(isDev ? [new ReactRefreshWebpackPlugin(), new webpack.HotModuleReplacementPlugin()] : []), // наш hmr плагин
    ];
}