/* 
    Folktale:一个标准的函数式编程库
        - 和lodash、ramda不同的是，他没有提供很多功能函数
        - 只提供了一些函数式处理的操作，例如：compose、curry等，一些函子Task、Either、MayBe等
    安装：包名称：folktale
    导入
*/
// TODO: 根据官方文档提示，判断导入的库中的具体模块
const { compose, curry } = require('folktale/core/lambda')
const { toUpper, first } = require('lodash/fp')

// folktale中curry的使用
/* let f = curry(2, (x, y) => {
    return x + y
})
console.log(f(1, 2))
console.log(f(1)(2)) */

/* let f = compose(toUpper, first)
console.log(f(['one', 'two'])) */

// TODO: task函子，处理异步任务----------------------------
/* 
    folktale 2.3.2版本演示
        需求分析：获取配置文件，并对配置文件中的内容进行操作
*/
const fs = require('fs')
const { task } = require('folktale/concurrency/task')
const { split, find } = require('lodash/fp')
// 定义一个读文件的方法
function readFile (filename) {
    // task函子的使用
    return task(resolver => {
        fs.readFile(filename, 'utf-8', (err, data) => {
            if(err) resolver.reject(err)
            resolver.resolve(data)
        })
    })
}
// 调用异步任务
readFile('package.json')
    .map(split('\n'))
    .map(find(x => x.includes('version')))
    .run()
    .listen({
        onRejected: err => {
            console.log(err)
        },
        onResolved: value => {
            console.log(value) // 输出结果："version": "1.0.0"
        }
    })

// TODO: Pointed函子，自带of静态方法 -------------------------------------------
/* 
    Pointed函子：概念
        - Ponited函子是实现了of静态方法的函子
        - of方法是为了避免使用new来创建对象，更深层次的含义是of方法用来把值放到上下文Context(把值放到容器中去，使用map来处理值)
*/
// TODO: Monad函子，弥补IO函数的不足----------------------------------------------------
/*  IO函数存在的不足
        实现一个读取文件，并打印的案例
*/
const fp = require('lodash/fp')
class IO {
    static of (value) {
        return new IO(function () {
            return value
        })
    }
    constructor (fn) {
        this._value = fn
    }
    map (fn) {
        return new IO(fp.flowRight(fn, this._value))
    }
}
// 定义一个读取文件操作
let readFile_IO = function (filename) {
    return new IO(function () {
        return fs.readFileSync(filename, 'utf-8')
    })
}
// 定义一个打印操作
let print_IO = function (x) {
    return new IO(function () {
        console.log(x)
        return x
    })
}
/* let cat = fp.flowRight(print_IO, readFile_IO)
let r = cat('package.json')._value()._value() // FIXME: 需要多次调用才能打印出所需内容
console.log(r) */
/* 
    Monad函子：
        - Monad函子是可以变扁的Pointed函子,IO(IO(x))
        - 一个函子如果具有join和of两个方法并遵守一些定律就是一个Monad
            - of: 用来干掉new
            - join: 直接返回调用，从而解决函子嵌套的问题
*/
// const fp = require('lodash/fp')
class IO_Monad {
    static of (value) {
        return new IO_Monad(function () {
            return value
        })
    }
    constructor (fn) {
        this._value = fn
    }
    // 用于组合函数与函子内部的_value
    map (fn) {
        return new IO_Monad(fp.flowRight(fn, this._value))
    }
    // TODO: 加上join方法后,就符合了monad的要求
    // 将函子调用变扁，拍平的核心所在
    join () {
        return this._value()
    }
    // 组合map与join方法
    flatMap (fn) {
        return this.map(fn).join()
    }
}
// 定义一个读取文件操作
let readFile_IO_Monad = function (filename) {
    return new IO_Monad(function () {
        return fs.readFileSync(filename, 'utf-8')
    })
}
// 定义一个打印操作
let print_IO_Monad = function (x) {
    return new IO_Monad(function () {
        console.log(x)
        return x
    })
}
let r_IO_Monad = readFile_IO_Monad('package.json')
            .map(fp.toUpper)
            .flatMap(print_IO_Monad)
            .join()
console.log(r_IO_Monad)
