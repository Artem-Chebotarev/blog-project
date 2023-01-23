import { BuildOptions } from './types/config';

import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

const path = require('path');

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
    return {
        port: options.port,
        open: true,
        historyApiFallback: true,
        hot: true,
    };
}
