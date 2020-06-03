/* 
    引用计数的实现
*/
const user1 = {age: 11}
const user2 = {age: 22}
const user3 = {age: 33}
// 再次引用，引用计数加一
const nameList = [user1.age, user2.age, user3.age]

function fn() {
    const num1 = 1
    const num2 = 2
}
// 当函数执行完毕之后，内部的值引用为零，即被销毁
fn()


// 引用计数之殇
// 循环引用
function fn() {
    const obj1 = {}
    const obj2 = {}
    obj1.name = obj2
    obj2.name = obj1
    return '从根上找不到，却再局部作用域中有互相的访问'
}
fn()