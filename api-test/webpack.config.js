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
        path: path.resolve(__dirname, 'api-test/dist/'),
    },

    watch: true,
    devtool: "cheap-module-source-map",
    devServer: {
        port: 3000,
        index: "api-test/index.html"
    },

    devtool: 'inline-source-map',

    resolve: {
        extensions: ['.ts', '.d.ts', '.js', '.json']
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
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
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
            },
            {
                test: /.*\.(gif|png|jpe?g|svg)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "assets/[name].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: path.join("assets", "[name].[ext]")
                        }
                    }
                ]
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
