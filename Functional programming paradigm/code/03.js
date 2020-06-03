/* 
    纯函数
*/
let array = [1, 2, 3, 4, 5, 6]

// slice纯函数
// console.log(array.slice(0, 3), array.slice(0, 3), array.slice(0, 3))
// splice不纯函数
// console.log(array.splice(0, 3), array.splice(0, 3), array.splice(0, 3))
/* 结果输出;
[ 1, 2, 3 ] [ 1, 2, 3 ] [ 1, 2, 3 ]
[ 1, 2, 3 ] [ 4, 5, 6 ] [] */

// -----------------------------------------传函数的优点
/* 
    记忆函数
*/
// 引入lodash
const _ = require('lodash')

function getArea (r) {
    console.log(r)
    return Math.PI * r * r

}
// let getAreaWithMemory = _.memoize(getArea)
// console.log(getAreaWithMemory(4))
// console.log(getAreaWithMemory(4))
// console.log(getAreaWithMemory(4))
/* 输出结果：
4
50.26548245743669
50.26548245743669
50.26548245743669 */

// 模拟memoize()方法的实现
function memoize (f) {
    let cache = {}
    return function () {
        let key = JSON.stringify(arguments)
        cache[key] = cache[key] || f.apply(f, arguments)
        return cache[key]
    }
}
let getAreaWithMemory = memoize(getArea)
console.log(getAreaWithMemory(4))
console.log(getAreaWithMemory(4))
console.log(getAreaWithMemory(4))