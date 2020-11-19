// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require("webpack");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        "./api-test/main.ts"
    ],

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist/'),
    },

    devtool: "cheap-module-source-map",
    devtool: 'inline-source-map',

    devServer: {
        port: 3000,
        index: "api-test/index.html"
    },

    resolve: {
        extensions: ['.ts', '.js'],
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        "configFile": "./tsconfig.json",
                    },
                },
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "less-loader",
                    }
                ],
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            env: JSON.stringify(process.env)
        }),
        new HtmlWebpackPlugin({
            filename: "api-test/index.html"
        })
    ]
};
