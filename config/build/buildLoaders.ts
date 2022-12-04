import webpack from 'webpack';
import { buildCssLoader } from './loaders/buildCssLoader';
import { BuildOptions } from './types/config';

export function buildLoaders({ isDev, paths }: BuildOptions): webpack.RuleSetRule[] {
    // Если не используем тайпскрипт - нужен babel-loader
    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    };

    // транспилятор babel
    const babelLoader = {
        test: /\.(js|jsx|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
            },
        },
    };

    // для работы с svg файлами
    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    };

    // для работы с png, jpg, gif файлами
    const fileLoader = {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    };

    const cssLoader = buildCssLoader(isDev);

    const fontLoader = {
        test: /\.(woff|eot|ttf)$/,
        type: 'asset/resource',
        generator: {
            filename: './fonts/[name][ext]',
        },
    };

    // ПОРЯДОК ПЛАГИНОВ ОЧЕНЬ ВАЖЕН!!!
    return [
        babelLoader,
        typescriptLoader,
        svgLoader,
        fileLoader,
        cssLoader,
        fontLoader,
    ];
}
