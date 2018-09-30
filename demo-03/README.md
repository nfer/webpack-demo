# demo-03 webpack loader

## 引言

在前面的demo中，我们只使用了js，而作为前端核心三剑客之一的css目前还没有使用，这一部分我们就引入css。

常规的使用方式是，通过link引入外部css文件或在html文件头部插入style代码，但是在demo-02中我们大刀阔斧直接砍掉了index.html文件，然后通过webpack来生成html文件。

因此问题来了：webpack能不能在生成的html文件中自动插入style或者link css文件？

## style-loader

> Adds CSS to the DOM by injecting a `style` tag

从style-loader的官方说明来看，这正是我们需要的。但是在使用这个loader之前，我们还需要另外一个loader：css-loader，关于这两个loader的关系，在[stackoverflow](https://stackoverflow.com/questions/34039826/webpack-style-loader-vs-css-loader)上有一个解释：

 - The CSS loader takes a CSS file and returns the CSS with imports and url(...) resolved via webpack's require functionality, It doesn't actually do anything with the returned CSS.
 - The style loader takes CSS and actually inserts it into the page so that the styles are active on the page.
 - They perform different operations, but it's often useful to chain them together, like Unix pipes.

翻译并简化就是：

 - css-loader只是负责把css文件引入进来（没有它，在css中使用import语法就报错）
 - style-loader负责把css的内容插入到html中
 - css-loader和style-loader是合作关系，并且是链式关系，有点像unix中的通道

## 使用方法

 - 安装相关的npm包

```shell
npm install --save-dev style-loader css-loader
```

 - 在webpack中添加loader配置项

```js
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
        ]
    },
```

 - 创建hello.css文件

```css
body {
    color: red;
}
```

 - 修改index.js文件，引入css

```js
require('./hello.js');
require('./hello.css');
```

运行`npm run build`之后打开index.html页面可以看到，字体的颜色变为红色。并且使用编辑器打开生成的index.html文件，可以看到在head部分插入了style代码，具体内容为hello.css的内容。

## webpack loader概念

> Loaders are transformations that are applied on the source code of a module. They allow you to pre-process files as you import or “load” them. 

从官方文档来看，loader的作用主要是对源文件进行预处理，其实在这个例子中不是太明显，如果你是用less来书写css，那么从less到css的转换就需要对应的loader来进行操作。