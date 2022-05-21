/*
 * Copyright (c) 2018 Jed Watson.
 * Licensed under the MIT License (MIT), see
 * http://jedwatson.github.io/classnames
 */

type Value = string | number | boolean | undefined | null
type Mapping = Record<string, unknown>
type Argument = Value | Mapping | ArgumentArray
interface ArgumentArray extends Array<Argument> {}
type Binding = Record<string, string>

var hasOwn = {}.hasOwnProperty

function classNames(this: Binding | undefined, ..._args: ArgumentArray): string {
  var classes = []
  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i]
    if (!arg) continue
    var argType = typeof arg
    if (argType === 'string' || argType === 'number') {
      classes.push((this && this[arg]) || arg)
    } else if (Array.isArray(arg)) {
      classes.push(classNames.apply(this, arg))
    } else if (argType === 'object') {
      if (arg.toString === Object.prototype.toString) {
        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes.push((this && this[key]) || key)
          }
        }
      } else {
        classes.push(arg.toString())
      }
    }
  }
  return classes.join(' ')
}

export default classNames
