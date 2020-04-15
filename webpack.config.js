const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const tsImportPluginFactory = require('ts-import-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const dev = require('./config/webpack.dev')
const prod = require('./config/webpack.prod')
const merge = require('webpack-merge')
const { InjectManifest } = require('workbox-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");


module.exports = (env) => {
    const isdev = env.development
    const base = {
        entry: './src/index.tsx',
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'bundle.js',
            chunkFilename: '[name].[contenthash:8].js'
        },
        devtool: 'source-map',

        resolve: {
            alias: {
                "@": path.resolve(__dirname, 'src'),
                "~": path.resolve(__dirname, 'node_modules'),
                '@ant-design/icons/lib/dist$': path.resolve(__dirname, 'src/icon.ts'),
            },
            extensions: ['.ts', '.tsx', '.js', '.json']
        },
        node: {
            fs: 'empty'
        },
        module: {
            rules: [
                {
                    test: /\.(j|t)sx?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                    options: {
                        transpileOnly: true,
                        getCustomTransformers: () => ({
                            before: [tsImportPluginFactory([{
                                libraryName: 'antd',
                                libraryDirectory: 'lib',
                                style: false
                            }])]
                        }),
                        compilerOptions: {
                            module: 'es2015'
                        }
                    },
                },
                {
                    test: /\.(j|t)sx?$/,
                    enforce: 'pre',
                    loader: 'source-map-loader'
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', {
                        loader: MiniCssExtractPlugin.loader,
                        options: { hmr: true }
                    }, {
                            loader: 'css-loader',
                            options: { importLoaders: 2 }
                        }, 'postcss-loader'
                        , {
                            loader: 'px2rem-loader',
                            options: {
                                remUni: 75,
                                remPrecision: 8
                            }
                        }]
                },
                {
                    test: /\.less$/,
                    use: ['style-loader',
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: { hmr: true }
                        },
                        {
                            loader: 'css-loader',
                            options: { importLoaders: 3 }
                        }, 'postcss-loader'
                        , {
                            loader: 'px2rem-loader',
                            options: {
                                remUni: 75,
                                remPrecision: 8
                            }
                        }, {
                            loader: 'less-loader',
                            options: {
                                javascriptEnabled: false
                            }
                        }]
                },
                {
                    test: /\.(jpg|png|gif|svg|jepg)$/,
                    use: ['url-loader']
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/assets/index.html',
                favicon: './src/assets/favicon.ico',
                minify: !isdev && { removeAttributeQuotes: true, collapseWhitespace: true, removeComments: true, }
            }),
            new CopyWebpackPlugin([
                {
                    from: './src/assets/manifest.json',
                    to: './'
                },
                {
                    from: './src/assets/icon.png',
                    to: './'
                }
            ]),

            new OptimizeCSSAssetsPlugin({
                assetNameRegExp: /\.css$/g,       //一个正则表达式，指示应优化/最小化的资产的名称。提供的正则表达式针对配置中ExtractTextPlugin实例导出的文件的文件名运行，而不是源CSS文件的文件名。默认为/\.css$/g
                cssProcessor: require('cssnano'), //用于优化\最小化CSS的CSS处理器，默认为cssnano
                cssProcessorOptions: { safe: true, discardComments: { removeAll: true } }, //传递给cssProcessor的选项，默认为{}
                canPrint: true                    //一个布尔值，指示插件是否可以将消息打印到控制台，默认为true
            }),
            new MiniCssExtractPlugin({
                filname: '**/*.less'
            }),
            new InjectManifest({
                swSrc: './src/assets/sw.js',
                swDest: 'sw.js',
                maximumFileSizeToCacheInBytes: 5 * 1024 * 1024
            })

        ],
        optimization: {
            splitChunks: {//分割代码块
                cacheGroups: {
                    vendor: {
                        priority: 1, //设置优先级
                        name: 'vendor',//起名
                        test: /node_modules/,//如果模块匹配，就添加进vendor
                        chunks: 'initial',//分割类型 all async initial
                        minSize: 100,
                        minChunks: 1 //最少引入了1次
                    },
                    common: {
                        //公共模块
                        priority: 2,
                        chunks: 'initial',
                        name: 'common',
                        minSize: 100, //大小超过100个字节要分割
                        minChunks: 2 //最少被几个chunk引用提取
                    }
                }
            }
        }
    }
    if (isdev) {
        return merge(base, dev)
    } else {
        return merge(base, prod)
    }

}