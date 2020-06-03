/* 
    柯里化
*/

/* 
    解决硬编码问题
*/
// function checkAge (min)  {
//     return function (age) {
//         return age >= min
//     }
// }
let checkAge = min => (age => age >= min)
let checkAge_18 = checkAge(18)
let checkAge_20 = checkAge(20)
// console.log(checkAge_18(20), checkAge_20(20))

/* 
    lodash 中curry的使用
*/
const _ = require('lodash') 
let getSum = (a, b, c) => a + b + c
// const curried = _.curry(getSum)
// console.log(curried(1, 2, 3))
// console.log(curried(1)(2, 3))
// console.log(curried(1)(2)(3)) 

// -----------------------------------------------柯里化案例
/* 
    字段筛选
*/
// 返回匹配到的字段
const match = _.curry((req, str) => str.match(req))
const haveSpace = match(/\s+/g)
const haveNumber = match(/\d+/g)
// console.log(haveSpace('I dont know'))
// 传入数组，返回匹配到字段的该字符串
const filter = _.curry((func, array) => array.filter(func))
const findSpace = filter(haveSpace)
// console.log(findSpace(['abel zhi', 'double kill', 'tripl kill', 'kill']))

/* 
    模拟柯里化实现原理
*/
function curry (func) {
    return function curriedFn (...args) {
        if (args.length < func.length) return function () {
            return curriedFn(...args.concat(Array.from(arguments)))
        } 
        return func(...args)
    }

}
const curried = curry(getSum)
console.log(curried(1, 2, 3))
console.log(curried(1)(2, 3))
console.log(curried(1)(2)(3))