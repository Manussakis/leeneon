const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); 
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const { merge } = require('webpack-merge');
const path = require("path");

let mergeOptions = {
    mode: "development",
    target: "web",
    devtool: "source-map",
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html"
        }),
        new HtmlWebpackPlugin({
            filename: "fullscreen.html",
            template: "./src/fullscreen.html"
        }),
    ],
};

let outputFilename = "[name].js";

if(process.env.NODE_ENV === 'production') {
    mergeOptions = {
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
        plugins: [
            new CleanWebpackPlugin(),
            new CopyWebpackPlugin({
                patterns:[
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
        ],
    }

    outputFilename = "[name].[contenthash].js"
}

module.exports = merge(mergeOptions, {
    entry: [
        "./src/index.js"
    ],
    output: {
        filename: outputFilename,
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: "./assets/[name][ext]"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    "babel-loader"
                ]
            },
            {
                test: /\.css$/i,
                use:[
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: "asset/resource"
            },
            {
                test: /\.html$/,
                use: [
                    "html-loader"
                ]
            }
        ]
    },
});