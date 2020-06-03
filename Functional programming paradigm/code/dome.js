// 基本的函子组成
class Function {
    // 约定的of方法，用于生成新的容器
    static of (value) {
        return new Function(value)
    }
    // 定义一个内部维护的值
    constructor (value) {
        this._value = value
    }
    // 对外提供的map方法，接收一个函数，通过of调用，用来改变内部的值， 并返回一个包含改变过的值的新的函子
    map (fn) {
        return Function.of(fn(this._value))
    }
}
/* 需求:
    - 传入一个字符串
    - 根据` `空格键将之分割成数组
    - 将数组中的每一段字符串的首字母转换为大写
*/
/* 使用技术:
    - 基本的函子使用
    - lodash提供的方法
        - split: 分割字符串
        - map: 遍历
        - upperFirst: 首字母大写
*/
// 定义一个拥有以上需求的方法
const fp = require('lodash/fp')
let str_to_Arr = Function.of('i love you')
                        .map(fp.split(' '))
                        .map(fp.map(fp.upperFirst))
console.log(str_to_Arr) // 输出结果：Function { _value: [ 'I', 'Love', 'You' ] }
let May = fp.MayBe.of