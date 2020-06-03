/* 
    MayBe函数
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
    // 在Functor的基础上实现了空值的判断
    isNothing () {
        return this._value === null || this._value === undefined
    }
}

/* 需求:
    - 传入一个字符串
    - 将字符串转换为驼峰写法
    - 传入一个空值null
*/
/* 使用技术:
    - MayBe函子的使用
    - lodash提供的方法
        - camelCase: 将字符串转换为驼峰写法
*/
const fp = require('lodash/fp')
const fn = MayBe.of('maybe')
                .map(fp.camelCase)
                .map(x => null)
console.log(fn._value) // 输出结果: null