const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); 
const path = require("path");

module.exports = {
    mode: "development",
    target: "web",
    entry: [
        "./src/index.js"
    ],
    output: {
        filename: "[name].js",
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
                test: /\.scss$/i,
                use:[
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
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
                test: /\.(png|jpg|gif|svg)$/i,
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
    plugins: [
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