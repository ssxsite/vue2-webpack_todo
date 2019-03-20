const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractPlugin = require('extract-text-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const config = {
    target: 'web',
    entry: path.join(__dirname, 'src/index.js'),   // 输入：项目主文件（入口文件）
    output: {       // 输出
        filename: 'build.[hash:8].js',  // 输出的文件名
        path: path.join(__dirname, 'dist')  // 输出路径
    },
    module: {       // 配置加载资源
        rules: [    // 规则
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,  // 文件小于1024字节，转换成base64编码，写入文件里面
                            name: '[name]-output.[ext]'
                        }
                    }
                ]
            }
        ]
    },
    // webpack插件配置
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new HTMLPlugin()
    ]
};

if (isDev) {
    // 开发坏境的配置
    config.module.rules.push({
        test: /\.css$/,
        use: [
            'style-loader',
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: false
                }
            }
        ]
    });
    config.module.rules.push({
        test: /\.scss$/,
        use: [
            'style-loader',
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: false
                }
            },
            'sass-loader'
        ]
    });
    config.devtool = '#cheap-module-eval-source-map';
    config.devServer = {
        port: '8888',
        host: '0.0.0.0',
        overlay: {  // webpack编译出现错误，则显示到网页上
            errors: true,
        },
        // open: true,

        // 不刷新热加载数据
        hot: true
    };
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoEmitOnErrorsPlugin()
    )
} else {
    // 生成坏境的配置
    config.entry = {   // 将所用到的类库单独打包
        app: path.join(__dirname, 'src/index.js'),
        vendor: ['vue']//这里的意思是把vue的框架代码打包成vendor文件，如果后续还增加了vue-router，也可以加入这里
    };
    config.output.filename = '[name].[chunkhash:8].js';
    config.module.rules.push({
        test: /\.css$/,
        use: ExtractPlugin.extract({//使用ExtractPlugin是把css单独打包成一个单独的文件，这样的话开启sourceMap: true是没用的
            fallback: 'style-loader',
            use: [
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true
                    }
                }
            ]
        })
    });
    config.module.rules.push({
        test: /\.scss$/,
        use: ExtractPlugin.extract({
            fallback: 'style-loader',
            use: [
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true
                    }
                },
                'sass-loader'
            ]
        })
    });
    config.plugins.push(
        new ExtractPlugin('styles.[contentHash:8].css')

        // // 将类库文件单独打包出来
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor'
        // })

        // webpack相关的代码单独打包
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'runtime'
        // })
    );

    config.optimization = {
        splitChunks: {
            cacheGroups: {                  // 这里开始设置缓存的 chunks
                commons: {
                    chunks: 'all',      // 必须三选一： "initial" | "all" | "async"(默认就是异步)
                    minSize: 0,             // 最小尺寸，默认0,
                    minChunks: 2,           // 最小 chunk ，默认1
                    maxInitialRequests: 5   // 最大初始化请求书，默认1
                },
                vendor: {
                    test: /node_modules/,   // 正则规则验证，如果符合就提取 chunk
                    chunks: 'initial',      // 必须三选一： "initial" | "all" | "async"(默认就是异步)
                    name: 'vendor',         // 要缓存的 分隔出来的 chunk 名称
                    priority: 10,           // 缓存组优先级
                    enforce: true
                }
            }
        },
        runtimeChunk: true
    }


}

module.exports = config;
