const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: ['@svgr/webpack'],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './static/index.html'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: "static",
                    to: ".",
                    globOptions: {
                        ignore: [ "**/index.html" ]
                    }
                },
            ],
        }),
    ],
    devServer: {
        port: 8080,
        historyApiFallback: true
    }
};
