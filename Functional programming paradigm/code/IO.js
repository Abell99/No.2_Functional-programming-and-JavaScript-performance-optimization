// TODO: IO函子-------------------------------------------------
/* 
    IO函子：输入输出函子
        - IO函子中的_value是一个函数，这里是把函数作为值来处理
        - IO函子可以把不纯的动作存储到_value中，包装当前的操作使其变为纯的，延迟执行这个不纯的操作(惰性执行)到调用的时候 
        - 把不纯的操作交给调度者来处理
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
// 调用
// TODO: IO函子的值的调用方法：._value()
console.log(IO.of(process).map(p => p.execPath)._value()) // 输出结果：C:\dev\nodejs\node.exe
// 无论过程如何，执行操作肯定是纯的，在调用的时候才会体现