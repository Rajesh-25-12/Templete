const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/mfp/assets/',
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'assets',
            filename: 'remoteEntry.js',
            exposes: {
                './AssetsApp': './src/bootstrap'
            },
            shared: ['react', 'react-dom']
        })
    ]

};
module.exports = merge(commonConfig, prodConfig);