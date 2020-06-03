/* 
    Monad函子：
        - Monad函子是可以变扁的Pointed函子,IO(IO(x))
        - 一个函子如果具有join和of两个方法并遵守一些定律就是一个Monad
            - of: 用来干掉new
            - join: 直接返回调用，从而解决函子嵌套的问题
*/
const fs = require('fs')
const fp = require('lodash/fp')
class Monad {
    static of (value) {
        return new Monad(function () {
            return value
        })
    }
    constructor (fn) {
        this._value = fn
    }
    // 用于组合函数与函子内部的_value
    map (fn) {
        return new Monad(fp.flowRight(fn, this._value))
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
/*  需求：
        - 读取文件
        - 打印内容
*/
/*  技术使用:
        - Monad函子的使用
            - Map()
            - join()
            - flatMap()
*/
// 定义一个读取文件操作
let readFile_Monad = function (filename) {
    return new Monad(function () {
        return fs.readFileSync(filename, 'utf-8')
    })
}
// 定义一个打印操作
let print_Monad = function (x) {
    return new Monad(function () {
        console.log(x)
        return x
    })
}
let r_Monad = readFile_Monad('package.json')
            .map(fp.toUpper)
            .flatMap(print_Monad)
            .join()
console.log(r_Monad)