/* 
    Functor(函子)
*/

// TODO: 基本的函子----------------------------------------
// 函子的基本示例：
/* class Container {
    constructor (value) {
        this._value = value
    }
    map (fn) {
        // 将经过传入的函数处理后的结果，交给下一个函子保存
        return new Container(fn(this._value))
    }
}
let r = new Container(5)
    .map(x => x + 1)
    .map(x => x * x)
console.log(r) // 输出结果：Container { _value: 36 } */

// TODO: 去除new的函子---------------------------------------
/* class Container {
    static of (value) {
        return new Container(value)
    }
    constructor (value) {
        this._value = value
    }
    map(fn) {
        return Container.of(fn(this._value))
    }
} */
/* FIXME: (新问题) :向函子中传递空值会报错
   let r = Container.of(null)
*/

/* let r = Container.of(5)
            .map(x => x + 2)
            .map(x => x * x)
console.log(r) */

// TODO: MayBe函子------------------------------------------------------
/*  
    MayBe函子
    由于函子中传入空值会出现异常，出现了MayBay，通过参数的判断来解决这一问题 
*/
class MayBe {
    static of (value) {
        return new MayBe(value)
    }
    constructor (value) {
        this._value = value
    }
    map (fn) {
        return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this._value))
    }
    isNothing () {
        return this._value === null || this._value === undefined
    }
}
// MayBe函子准许传入空值
/* let r = MayBe.of(null)
            .map(x => x.toUpperCase())
console.log(r) // 输出结果:MayBe { _value: null } */
// FIXME: (新问题) : 如果多次调用map()方法，就无法判断是哪一次传入了空值 
let r = MayBe.of('hello world')
            .map(x => x.toUpperCase())
            .map(x => null)
            .map(x => x.split(' '))
// console.log(r) // 输出结果:MayBe { _value: null }

// TODO: Either函子-----------------------------------------------------
/* 
    Either函子
        - 类似于if...else，两者中任何一个
        - 异常会使函数变的不纯，Either函子用来处理异常,并记录下来出错的信息
*/
class Left {
    static of (value) {
        return new Left(value)
    }
    constructor (value) {
        this._value = value
    }
    map (fn) {
        return this
    }
}
class Right {
    static of (value) {
        return new Right(value)
    }
    constructor (value) {
        this._value = value
    }
    map (fn) {
        return Right.of(fn(this._value))
    }
}
/* let r1 = Left.of(12).map(x => x + 2)
let r2 = Right.of(12).map(x => x + 2)
console.log(r1) // 输出内容：12 分析： return this 返回原数字，不处理函数内容
console.log(r2) // 输出内容：14 */

// Either的正确使用
function parseJson (str) {
    try {
        return Right.of(JSON.parse(str))
    } catch (e) {
        return Left.of({ error: e.message })
    }
}
// 错误示范：
// console.log(parseJson('{ name: zs }')) // 输出结果：Left { _value: { error: 'Unexpected token n in JSON at position 2' } }
// 正确示范：
// console.log(parseJson('{ "name": "zs" }')) // 输出结果：Right { _value: { name: 'zs' } }

// 连续使用示范：
// console.log(parseJson('{ "name": "zs" }').map(x => x.name.toUpperCase()))

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
// console.log(IO.of(process).map(p => p.execPath)._value()) // 输出结果：C:\dev\nodejs\node.exe
// 无论过程如何，执行操作肯定是纯的，在调用的时候才会体现

