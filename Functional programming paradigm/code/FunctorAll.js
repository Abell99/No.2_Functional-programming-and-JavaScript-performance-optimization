/*
    封装各种函子
*/
// TODO: Functor ---------------------------------------------
// 基本的函子
class Function {
    static of (value) {
        return new Function(value)
    }
    constructor (value) {
        this._value = value
    }
    map (fn) {
        return Function.of(fn(this._value))
    }
}
// TODO: MayBe ------------------------------------------------
// MayBe函子
class MayBe {
    static of (value) {
        return new MayBe(value)
    }
    constructor (value) {
        this._value = value
    }
    map (fn) {
        return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this._value))
    }
    isNothing () {
        return this._value === null || this._value === undefined
    }
}
// TODO: Either ------------------------------------------------
// Either函子
class Left {
    static of (value) {
        return new Left(value)
    }
    constructor (value) {
        this._value = value
    }
    map (fn) {
        return this
    }
}
class Right {
    static of (value) {
        return new Right(value)
    }
    constructor (value) {
        this._value = value
    }
    map (fn) {
        return Right.of(fn(this._value))
    }
}
function Either (str) {
    try {
        return Right.of(JSON.parse(str))
    } catch (e) {
        return Left.of({ error: e.message })
    }
}
// TODO: IO -----------------------------------------------------
// IO函子
const fp = require('lodash/fp')
class IO {
    static of (value) {
        return new IO(function () {
            return value
        })
    }
    constructor (fn) {
        this._value = fn
    }
    map (fn) {
        return new IO(fp.flowRight(fn, this._value))
    }
}
// TODO: Task ------------------------------------------------------
// Task函子
const { task: Task } = require('folktale/concurrency/task')
// TODO: Monad -----------------------------------------------------
// Monad函子
const fp = require('lodash/fp')
class Monad {
    static of (value) {
        return new Monad(function () {
            return value
        })
    }
    constructor (fn) {
        this._value = fn
    }
    map (fn) {
        return new Monad(fp.flowRight(fn, this._value))
    }
    join () {
        return this._value()
    }
    flatMap (fn) {
        return this.map(fn).join()
    }
}