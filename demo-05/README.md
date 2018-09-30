# demo-05 缓存处理

## 引言

浏览器是有缓存机制的，尤其对于js/css等资源文件，缓存的时间相对于html文件会长很多。那么就有可能出现这样一种情况，源码修改并重新打包，但是客户端仍然访问的是旧的缓存文件。

暴力解决的方式是，关闭缓存或者通过时间戳参数的方式强制刷新，但这与资源缓存的设计明显相背离。因此，webpack提供了一种方法**源码修改后打包后的文件名发生变化**来确保加载最新的资源文件，并最大化的利用缓存机制。

## hash参数

修改webpack.config.js:

```js
    output: {
        path: __dirname + '/dist/',
        filename: 'index.[hash:7].js'
    },
    ...
        new ExtractTextPlugin('index.[hash:7].css'),
```

注意，上面的修改设计到两处，webpack的参数以及mini-css-extract-plugin插件的参数，因为该插件是由webpack官方维护，所以在参数设置做了尽量统一。

再次运行`npm run build`进行打包后，发现dist目录下生成的js和css文件名都带上了hash值：

```
$ ls dist/
index.7ad1b5a.css       index.7ad1b5a.js        index.html
```

## 后记

其实在webpack官方文档中，建议使用`chunkhash`来替代`hash`，但是在目前我们这个炒鸡简单的demo中，`chunkhash`并没有体现出其价值，后续我们会专门讨论`chunkhash`和`hash`的差异。
