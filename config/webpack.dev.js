const path = require('path')
const webpack = require('webpack')
module.exports = {
    mode: 'development',
    devServer: {
        hot: true,
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        historyApiFallback: {
            index: "/index.html"
        }
    },
    devtool: 'source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
}