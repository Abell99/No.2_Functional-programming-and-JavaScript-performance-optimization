/* 
    高阶函数
*/
// ---------------------------------------------函数作为参数
let arr = [1, 2, 3, 4, 5]
/* 
    模拟forEach
*/
function forEach (array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i])
    }
}

// 测试
forEach(arr, function (item) {
    // console.log(item)
})
/* 
   模拟filter 
*/
function filter (array, fn) {
    let results = []
    for(let i = 0; i < array.length; i++) {
        if (fn(array[i])) {
            results.push(array[i])
        }
    }
    return results
}

// 测试
// console.log(
//     filter(arr, function (item) {
//         return item % 2 === 0
//     })
// )

/* 
    模拟map
*/
const map = (array, fn) => {
    let results = []
    for (let value of array) {
        results.push(fn(value))
    }
    return results
}
// arr = map(arr, v => v * v)
// console.log(arr)

/* 
    模拟every
*/
const every = (array, fn) => {
    let result = true
    for (let value of array) {
        result = fn(value)
        if (!result) break 
    }
    return result
}
// console.log(every(arr, v => v > 8))

/* 
    模拟some
*/
const some = (array, fn) => {
    let result = false
    for (let value of array) {
        result = fn(value)
        if (result) break
    }
    return result
}
// console.log(some(arr, v => v > 15))



// ---------------------------------------函数作为返回值
/* 
    基本语法演示
*/
function makeFn () {
    let msg = 'hello world'
    return function () {
        console.log(msg)
    }
}
// 两种调用方式
// const fn = makeFn()
// fn()
// makeFn()()

/* 
    模拟once函数
*/
function once (fn) {
    let done = false
    return function () {
        if (!done) {
            done = true
            return fn.apply(this, arguments)
        }
    }
}

let pay = once(function (money) {
    console.log(`支付：${money} RMB`)
})

// 多次调用也只会执行依次
// pay(2)
// pay(2)
// pay(3)
