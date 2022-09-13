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

    return [
        typescriptLoader,
        cssLoader,
        fontLoader,
    ];
}