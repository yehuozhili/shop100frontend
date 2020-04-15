const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const TerserPlugin = require('terser-webpack-plugin');


module.exports = {
    mode: 'production',
    devtool: 'none',
    plugins: [
        new CleanWebpackPlugin(),
        //   new BundleAnalyzerPlugin()
    ],
    // optimization: {
    //     minimize: true,
    //     minimizer: [new TerserPlugin()],
    // }
}