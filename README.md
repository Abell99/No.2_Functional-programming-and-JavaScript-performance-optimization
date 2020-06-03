# 简答题

## 1.描述引用计数的工作原理和优缺点

- ##### 引用计数的工作原理

  - 设置引用数
  - 当引用关系改变时修改引用数字
  - 引用为0时立即回收

- ##### 引用计数算法的优缺点

  - 优点
    - 发现垃圾时立即回收
    - 最大限度减少程序暂停
  - 缺点
    - 无法回收循环引用的对象
    - 时间，资源开销大

## 2.描述标记整理算法的工作流程

- 标记整理可以看做是标记清除的增强
- 标记阶段的操作和标记清除一致
  - 分标记和清除两个阶段完成
  - 遍历所有对象并标记活动对象
  - 遍历所有对象清除没有标记的对象
- 清除阶段会先执行整理，移动对象位置，再进行清除

## 3.描述V8中新生代存储区垃圾回收的流程

- 新生代指的是存活时间较短的对象

  > 例如局部作用域中的对象

- 回收过程采用**复制算法+标记整理**

- 新生代内存区分为两个等大的空间

  - 使用空间为From，空闲空间为To

  - 活动对象存储于From空间

    > 当From空间应用到一定程度，触发GC操作

  - 标记整理后将活动对象拷贝至To

    - 在拷贝过程中可能出现**晋升**

      > 晋升就是将新生代对象移动至老年代

    - 经过一轮GC还存活的新生代需要晋升
    - 如果To空间的使用率超过25%则本次GC操作的所有活动对象都移动至老生代

  - From与To交换空间完全释放
    - 这一步将所有的活动对象挪出了from区域，并清空from完成回收

## 4.描述增量标记算法在何时使用，及其工作原理

- 标记增量法在V8回收老生代对象的时候使用，从而进行效率优化
- 工作原理：
  - 将一整个的垃圾回收操作，拆分为多个小的部分，垃圾回收和程序交替执行
    - 使程序执行的时候，划分出一些时间用来进行垃圾回收，不至于让垃圾回收占有一大段的时间影响程序运行，让用户感受到明显的卡顿

# 代码题

## 代码题一

- 练习1

```js
let isLastInStock = fp.flowRight(fp.prop('in_stock'), fp.last)
console.log('练习一:' + isLastInStock(cars)) // 输出结果: false
```

- 练习2

```js
let getCarName = fp.flowRight(fp.prop('name'), fp.first)
console.log('练习二:' + getCarName(cars)) // 输出结果: Ferrari FF
```

- 练习3

```js
let _average = function(xs) {
    return fp.reduce(fp.add, 0, xs) / xs.length
}
let averageDollarValue = fp.flowRight(_average, fp.map('dollar_value'))
console.log('练习三:' + averageDollarValue(cars)) // 输出结果: 790700
```

- 练习4

```js
let _underscore = fp.replace(/\W+/g, '_')
let sanitizeNames = fp.flowRight(fp.map(_underscore), fp.map(fp.toLower), fp.map('name'))
console.log('练习四:' + sanitizeNames(cars)) // 输出结果: ferrari_ff,spyker_c12_zagato,jaguar_xkr_s,audi_r8,aston_martin_one_77,pagani_huayra
```

## 代码题二

- 练习1

```js
let maybe = Maybe.of([5, 6, 1])
let ex1 = maybe.map(x => fp.map(fp.add(1), x))._value
console.log('练习一:' + ex1) // 输出结果: [6,7,2]
```

- 练习2

```js
let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])
let ex2 = xs.map(fp.first)._value
console.log('练习二:' + ex2) // 输出结果: do
```

- 练习3

```js
let safeProp = fp.curry(function (x, o) {
    return Maybe.of(o[x])
})
let user = { id: 2, name: 'Albert' }
let ex3 = obj => safeProp('name', obj).map(fp.first)._value
console.log('练习三:' + ex3(user)) // 输出结果: A
```

- 练习4

```js
let ex4 = n => Maybe.of(n).map(parseInt)._value
console.log('练习四:' + ex4(123)) // 输出结果: 123
```



