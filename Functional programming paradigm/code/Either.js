/* 
    Either函子
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
function Either (parameter) {
    try {
        // 利用JSON.parse第一个参数的限制，来空值左右的调用
        return Right.of(JSON.parse(parameter))
    } catch (e) {
        return Left.of({ error: e.message })
    }
}
const fn = Either() // 传入空值
                .map(x => x)
console.log(fn) // 输出内容: Left { _value: { error: 'Unexpected token u in JSON at position 0' } }