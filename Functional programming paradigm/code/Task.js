// TODO: task函子，处理异步任务----------------------------
/* 
    folktale 2.3.2版本演示
    需求：
        - 获取配置文件
        - 并对配置文件中的内容进行操作
*/
/*  使用技术：
        - fs文件请求
        - task的使用方法
        - lodash提供的方法
            - split: 拆分字符串string
            - find: 遍历 collection（集合）元素，返回 predicate（断言函数）第一个返回真值的第一个元素

*/
const fs = require('fs')
const { task } = require('folktale/concurrency/task')
const { split, find } = require('lodash/fp')
// 定义一个读文件的方法
function readFile (filename) {
    // task函子的使用
    return task(resolver => {
        fs.readFile(filename, 'utf-8', (err, data) => {
            if(err) resolver.reject(err)
            resolver.resolve(data)
        })
    })
}
// 调用异步任务
readFile('package.json')
    .map(split('\n'))
    .map(find(x => x.includes('version')))
    .run()
    .listen({
        onRejected: err => {
            console.log(err)
        },
        onResolved: value => {
            console.log(value) // 输出结果："version": "1.0.0"
        }
    })