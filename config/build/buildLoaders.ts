import webpack from 'webpack';

import { buildBabelLoader } from './loaders/buildBabelLoader';
import { buildCssLoader } from './loaders/buildCssLoader';
import { BuildOptions } from './types/config';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const { isDev } = options;

    const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false });
    const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true });

    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    };

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

    return [
        codeBabelLoader,
        tsxCodeBabelLoader,
        svgLoader,
        fileLoader,
        cssLoader,
        fontLoader,
    ];
}
