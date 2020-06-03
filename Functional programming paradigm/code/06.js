/* 
    函数的组合
*/
// 初步模拟函数组合
// 


// ------------------------------------------lodash中的组合函数
/* 
    flow() / flowRight()
*/
const _ = require('lodash')
const reverse = arr => arr.reverse()
const first = arr => arr[0]
const toUpper = s => s.toUpperCase()
// const f = _.flowRight(toUpper, first, reverse)
// console.log(f['one', 'two', 'three'])

/* 
    组合函数原理模拟
*/
const compose = (...args) => value => args.reverse().reduce((acc, fn) => fn(acc), value)
// const f = compose(toUpper, first, reverse)
// console.log(f(['one', 'two', 'three']))

/* 
    组合函数的调试
        trace
*/
// 定义一个函数，用来返回同输入值相同的输出值
let trace = _.curry((tag, v) => {
    console.log(tag, v)
    return v
})
// 处理方法,对其柯里化处理，使其数据优先，函数置后
const split = _.curry((sep, str) => _.split(str, sep))
const join = _.curry((sep, array) => _.join(array, sep))
const map = _.curry((fn, array) => _.map(array, fn))
// 在每一个方法执行结束之后，输出结果
const f = _.flowRight(join('-'), trace('map之后输出的结果:'), map(_.toLower), trace('split之后输出的结果'), split(' '))
console.log(f('NEVER SAY DIE'))
// -----------------------------------------------------------lodash/fp
/* 
    lodash和lodash/fp模块中map方法的区别
*/
// ---------lodash
// const _ = require('lodash')
console.log(_.map(['23', '8', '10'], parseInt)) // 输出结果：[ 23, NaN, 2 ]

// ---------lodash/fp
const fp = require('lodash/fp')
console.log(fp.map(parseInt, ['23', '8', '10']))
// 总结： 因为fp方法都是经过处理的，参数只有一个，所以不会导致传入parseInt方法的参数中，包含map的索引，从而改变转换进制

/* 
    把一个字符串中的首字母提取并转换成大写，使用`.`作为分隔符
        world wild web ==> W.W.W
*/
// const fp = require('lodash/fp')
// 遵循组合函数从右到左的原则，先拆分字符串形成数组，遍历数组，并对数组进行取首字母并大写的操作，组后使用`.`连接数组形成字符串
const firstLetterToUpper = fp.flowRight(fp.join('.'), fp.map(fp.flowRight(fp.first, fp.toUpper)), fp.split(' '))
console.log(firstLetterToUpper('world wild web'))