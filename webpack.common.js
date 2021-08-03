const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: [
        "./src/index.js"
    ],
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
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            },            
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: "asset/resource"
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        sources: {
                            list: [
                                '...',
                                {
                                    tag: 'img',
                                    attribute: 'data-src',
                                    type: 'src',
                                },
                                {
                                    tag: 'img',
                                    attribute: 'data-srcset',
                                    type: 'srcset',
                                }
                            ]
                        }
                    }
                }
            }
        ]
    },
};