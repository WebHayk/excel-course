const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV === "production";
const isDevelopment = !isProduction;

const fileNameHelper = (ext) => isDevelopment ? `bundle.${ext}` : `bundle.[hash].${ext}`;

module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: "development",
    entry: "./index.js",
    output: {
        filename: fileNameHelper("js"),
        path: path.resolve(__dirname, "dist"),
        clean: true
    },
    optimization: {
        removeEmptyChunks: true,
        minimize: true
    },
    resolve: {
        extensions: [".js"],
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@core": path.resolve(__dirname, "src/core")
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html",
            inject: "body",
            minify: {
                removeComments: isProduction,
                collapseWhitespace: isProduction
            }
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src/favicon.ico"),
                    to: path.resolve(__dirname, "dist")
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: fileNameHelper("css")
        })
    ],
    devtool: isDevelopment && "source-map",
    devServer: {
        port: 3000,
        hot: isDevelopment
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: "sass-loader",
                        options: {
                            warnRuleAsWarning: true,
                            implementation: require("sass"),
                        },
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};