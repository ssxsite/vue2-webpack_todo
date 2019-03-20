//次项目为 vue-todo项目
收获：
1.此项目为手动搭建webpack,分生产环境和开发环境分别配置
2.此项目也用jsx写vue组件
3.extract-text-webpack-plugin 的作用是把css文件单独打包成一个文件，在生产环境的时候使用。


//build出现bug，原因是extract-text-webpack-plugin": 4.0.0-beta.0 对应的webpack版本要4.2.0,太高或太低都有问题。
extract-text-webpack-plugin建议换成其他功能类似的loader。

//contentHash 和 chunkhash 还有hash的区别。hash是每次打包所有文件的hash都是一样的，这样一个文件修改，其他文件都得重新打包，缓存就失效了。chunkhash，一个chunk就一个hash；
contentHash 内容有变化的时候才生成新的hash.