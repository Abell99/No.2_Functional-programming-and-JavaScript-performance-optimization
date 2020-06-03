/* 原始代码 */
const fp = require('lodash/fp')

// 数据
// horsepower 马力, dollar_value 价格, in_stock 库存
const cars = [
    { name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true },
    { name: 'Spyker C12 Zagato', horsepower: 650, dollar_value: 648000, in_stock: false },
    { name: 'Jaguar XKR-S', horsepower: 550, dollar_value: 132000, in_stock: false },
    { name: 'Audi R8', horsepower: 525, dollar_value: 114200, in_stock: false },
    { name: 'Aston Martin One-77', horsepower: 750, dollar_value: 1850000, in_stock: true },
    { name: 'Pagani Huayra', horsepower: 700, dollar_value: 1300000, in_stock: false },
]

/* 
    练习1：
        使用函数组合fp.flowRight()重新实现下面这个函数
        let isLastInStock = function (cars) {
            // 获取最后一条数据
            let last_car = fp.last(cars)
            // 获取最后一条数据的in_stock属性值
            return fp.prop('in_stock', last_car)
        }
*/
let isLastInStock = fp.flowRight(fp.prop('in_stock'), fp.last)
console.log('练习一:' + isLastInStock(cars)) // 输出结果: false

/* 
    练习2：
        使用fp.flowRight()、fp.prop()和fp.first() 获取第一个car的name
*/
let getCarName = fp.flowRight(fp.prop('name'), fp.first)
console.log('练习二:' + getCarName(cars)) // 输出结果: Ferrari FF

/* 
    练习3：
        使用帮助函数_average重构averageDollarValue，使用函数组合的方法实现
        let averageDollarValue = function (cars) {
            let dollar_values = fp.map(function (cars) {
                return car.dollar_value
            }, cars)
            return _average(dollar_values)
        }
*/
let _average = function(xs) {
    return fp.reduce(fp.add, 0, xs) / xs.length
}
let averageDollarValue = fp.flowRight(_average, fp.map('dollar_value'))
console.log('练习三:' + averageDollarValue(cars)) // 输出结果: 790700

/* 
    练习4：
        使用flowRight写一个sanitizeNames()函数，返回一个下划线连接的小写字符串，把数组
        中的name转换为这种格式，例如：sanitizeNames(["Hellow World"]) => ["hello_world"]
*/
let _underscore = fp.replace(/\W+/g, '_')
let sanitizeNames = fp.flowRight(fp.map(_underscore), fp.map(fp.toLower), fp.map('name'))
console.log('练习四:' + sanitizeNames(cars)) // 输出结果: ferrari_ff,spyker_c12_zagato,jaguar_xkr_s,audi_r8,aston_martin_one_77,pagani_huayra
