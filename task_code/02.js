/* 原始代码 */
// support.js
const fp = require('lodash/fp')
const { Maybe, Container } = require('./support')
/* 
    练习一：
        使用fp.add(x, y)和fp.map(f, x)创建一个能让functor里面的值增加的函数exl
*/
let maybe = Maybe.of([5, 6, 1])
let ex1 = maybe.map(x => fp.map(fp.add(1), x))._value
console.log('练习一:' + ex1) // 输出结果: [6,7,2]

/* 
    练习二：
        实现一个函数ex2,能够使用fp.first获取列表的第一个元素
*/
let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])
let ex2 = xs.map(fp.first)._value
console.log('练习二:' + ex2) // 输出结果: do

/* 
    练习三：
        实现一个函数ex3,使用safeProp和fp.first找到user的名字的首字母
*/
let safeProp = fp.curry(function (x, o) {
    return Maybe.of(o[x])
})
let user = { id: 2, name: 'Albert' }
let ex3 = obj => safeProp('name', obj).map(fp.first)._value
console.log('练习三:' + ex3(user)) // 输出结果: A

/* 
    练习四
        使用Maybe重写ex4,不要有if语句
*/
let ex4 = n => Maybe.of(n).map(parseInt)._value
console.log('练习四:' + ex4(123)) // 输出结果: 123