const path = require('path')
const nodeExternals = require('webpack-node-externals')
const nodemonPlugin = require('nodemon-webpack-plugin')
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const JS_PATH = path.resolve(__dirname, 'public', 'javascripts');
const OUTPUT_PATH = path.resolve(__dirname, 'public', 'javascripts', 'dist');
const PUBLIC_PATH = '/public/javascripts/dist';
const VIEWS_PATH = path.resolve(__dirname, 'views');
module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: {
        profesor: `${JS_PATH}/profesor.js`,
        operador: `${JS_PATH}/operador.js`,
        tecnico: `${JS_PATH}/tecnico.js`,
        admin: `${JS_PATH}/admin.js`,

    },

    output: {
        filename: '[name].bundle.js',
        publicPath: PUBLIC_PATH,
        path: OUTPUT_PATH,
    },

    module: {
        rules: [{
                test: require.resolve('jquery'),
                use: [{
                        loader: 'expose-loader',
                        options: 'jQuery'
                    },
                    {
                        loader: 'expose-loader',
                        options: '$'
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it uses publicPath in webpackOptions.output
                            publicPath: PUBLIC_PATH,
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader'
                ],
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true, // webpack@1.x
                            disable: true, // webpack@2.x and newer
                        },
                    },
                ]
            },
            {
                test: /\.(woff(2)?|ttf|otf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }                    
                }]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({}),
        // new HtmlWebpackPlugin({
        //     filename: `${VIEWS_PATH}/index.html`,
        //     template: `${VIEWS_PATH}/index.html`,
        //     chunks: ['index']
        // }),
    ],
}