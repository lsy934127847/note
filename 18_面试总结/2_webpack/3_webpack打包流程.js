
// 1.ast语法树 用来描述js语法的对象
// 利用ast及其一些方法可以将js语法转换成ast,可以通过ast生成对应的js代码

// 2.webpack打包流程、
/*
 // 1.初始化参数 : 从配置文件webpack.config.js 和命令行 读取并合并参数,得出最初的配置对象
 // 2. 初始化Compiler实例对象  let compiler = new Compiler(finallConfig)
 // 3. 获取所有的插件实例 依次调用apply方法 加载所有配置的插件
            let {plugins} = finallConfig
            plugins.forEach( plugin =>{
                plugin.apply(compiler)
            })
//  4. 根据配置文件中的entry找出入口文件
//  5. 从入口文件触发 调用所有的配置的loader对模块进行编译
//  6. 将编译好的模块输出到指定目录
*/
// 3.如何实现loader?
// 使用loader 实际上是引入了一个模块 这个模块暴漏了了一个函数
// 这个函数只能使用普通函数不能使用箭头函数,因为webpack在调用时会修改this
// 这个函数参数会接受当前打包的内容,并且将打包的内容传递(return)给下一个loader (使用多个loader)
// loader默认是 是从下至上,从右至左执行的 可配置改变执行顺序
// 可通过getOptions获取配置loader时传递的选项参数等
/*
 所以loader的作用一般为获取到当前打包内容进行处理  (可以utf8的形,也可以其他形式)

 比如获取到js文件内容 去除空格 去除注释 es6转es5 jsx语法转换等
 比如获取到图片文件内容  正常情况下我们不能import 一个图片,但是通过file-loader
                    webpack根据图片地址将图片文件内容读取出来 传递file-loader
                    file-loader 将图片内容(2进制)可以转成base64 返回出去
                    也可以将图片通过fs模块写入到输出目录 然后返回一个图片的绝对地址
 比如获取到less文件内容 经过正则匹配等等转成css文件 返回出去 

*/
//4. 如何实现一个插件?
// https://webpack.js.org/api/compiler-hooks/
// plugin 插件通常是一个类  
// 插件的主要功能就是 
//     webpack打包过程中,进行一些额外的处理
//     比如 clean-webpack-plugin 插件 需要在打包后文件写入输出目录之前 先清空原有目录内容
//     比如 html-webpack-plugin 需要给输出目录写入一个html文件,并自动引入打包后的js文件

// 在webpack编译的时候,会执行插件的apply方法  的时候,并传递compiler对象 
// compiler对象上有 compiler.hooks 中存有所有的 生命周期 钩子
// 
// 这些钩子 贯穿整个webpack打包过程 
//         基于 Tapable 实现  
//         Tapable基于发布订阅模式实现
// compiler对象上有 compiler.options 存有所有的配置选项 

// 所以clean-webpack-plugin 只需要在文件被写入输出目录之前 订阅一个消息 
// 这个消息就会在webpack就会在文件被写入之前 被执行
// 
/*
  let outputpath = compiler.options.output.path
         compiler.hooks.entryOption.tap("CleanWebpackPlugin",() =>{
             this.cleanDir(outputpath)
         })
*/

// 总之 插件就是被创建后 , 通过生命周期钩子发布消息,然后在某个特定阶段执行这个消息
// 所以要了解就是webpack的生命周期钩子 
// done 编译完成触发 run开始编译 emit写入文件之前触发

// 5.讲一讲 tapable ? 
// tapable 是基于发布订阅封装一些同步和异步钩子 在webpack插件中定义的apply方法中使用
// 如SyncHook syncbailhook AsyncSerieHook等等

// 6.sourcemap

// sourcemap 浏览器控制台输出的一些日志默认映射的是打包之后的文件 不利于调试
// 开启后     将映射到打包之前本地开发时的文件
/*
企业开发配置:
development: eval-cheap-module-source-map
只需要行(cheap)错误信息, 并且包含第三方模块错误信息(module), 
并且不会生成单独sourcemap文件,并通过eval存储映射关系
不需要单独生成map文件,生成map会加大打包时间
production: cheap-module-source-map
只需要行(cheap)错误信息, 并且包含第三方模块(module)错误信息, 并且会生成单独sourcemap文件
生产阶段需要生成map文件 以减少bundle的体积,请求时不会请求map文件,依旧保留有映射关系
// 对于生产环境如果将map文件发布到线上 会泄露代码 造成一些安全风险 
// 所以可以将生成的map文件保存在本地 在本地去使用这个map文件去调试线上的代码
*/










 


