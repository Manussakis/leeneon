const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const path = require("path");

module.exports = merge(common, {
    mode: "production",
    target: "browserslist",
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
            })
        ]
    },
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: "./assets/[name][ext]"
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "src/browserconfig.xml",
                },
                {
                    from: "src/site.webmanifest",
                },
            ]
        }),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html"
        }),
        new HtmlWebpackPlugin({
            filename: "fullscreen.html",
            template: "./src/fullscreen.html"
        }),
        new HtmlWebpackPlugin({
            filename: "404.html",
            template: "./src/404.html"
        }),
    ],
});
