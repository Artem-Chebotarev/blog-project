import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import { BuildOptions } from './types/config';

export function buildLoaders({ isDev, paths }: BuildOptions): webpack.RuleSetRule[]  {
    // Если не используем тайпскрипт - нужен babel-loader
    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
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

    const cssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          {
            loader: 'css-loader',
            // настройки лоадера
            options: {
                modules: {
                    auto: (resPath: string) => Boolean(resPath.includes('.module.scss')),
                    localIdentName: isDev 
                        ? '[path][name]__[local]--[hash:base64:5]' 
                        : '[hash:base64:8]',
                },
            }
          },
          // Compiles Sass to CSS
          "sass-loader",
        ],
      };

      const fontLoader = {
        test: /\.(woff|eot|ttf)$/,
        type: 'asset/resource',
        generator: {
            filename: './fonts/[name][ext]',
        },
      }

    // ПОРЯДОК ПЛАГИНОВ ОЧЕНЬ ВАЖЕН!!!
    return [
        typescriptLoader,
        svgLoader,
        fileLoader,
        cssLoader,
        fontLoader,
    ];
}