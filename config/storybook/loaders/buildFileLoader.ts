export function buildFileLoader() {
    return {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
            name: '[path][name].[ext]',
        },
        // test: /\.(png|jpe?g|gif)$/i,
        // use: [
        //     {
        //         loader: 'file-loader',
        //     },
        // ],
    };
}
