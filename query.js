//query

inspect = require('inspect')

module.exports = query

function query (object){

  var q = function(func){return all (object,func)}
  q.all = function(func){return all (object,func)}
  q.first = function(func){return first (object,func)}
  q.last = function(func){return last (object,func)}
  q.map = function(func){return map (object,func)}
  q.each = function(func){return each (object,func)}
  q.set = function (value,key) {object[key] = value}

  if(object instanceof Array){
    q.push = function (value) {object.push(value)}
    q.unshift = function (value) {object.unshift(value)}
  }
  return q
}

function first(obj,func){
  throw new Error("not implemented yet")
  for (i in obj){
    
  }
}

function all (object,func){
  if(func === undefined)
    return object
  func = checker(func)

  var l = newObj(object),n,push = (object instanceof Array)
  for(key in object){
      var value = object[key]
          if(func(value,key)) {

      if(push) {l.push(value)} else {l[key] = value}//perserve keys if it's an object.

    }
  }
  
  return l
}

function newObj(object){
  if(object instanceof Array)
    return []
  return {}
}

function map (object, func){
  if(func === undefined)
    return object
  func = checker(func)
  var l = newObj(object)
  for(i in object){
      l[i] = func(object[i],i)
  }
  return l
  
}

function first(object,func){
  if(func === undefined)
    return object

  func = checker(func)

  for(key in object){
    var value = object[key]
    if(func(value,key))
      return value
  }
}

function last(object,func){
  if(func === undefined)
    return object

  func = checker(func)

  var last
  
  for(key in object){
    var value = object[key]
    if(func(value,key))
      last = value
  }

  return last
}

function each(object,func){
  if(func === undefined)
    return object

  func = checker(func)

  var last
  
  for(key in object){
    var value = object[key]
    func(value,key)
  }
  return object
}
var isRegExp = /\/(.*?)\/([gimy]*)/

function checker(func){
  if('function' == typeof func)
    return func

  if('object' != typeof func) {
    var e
    if('string' === typeof func && (e = isRegExp.exec(func))){
      //check if string is a regular expression
      var r = new RegExp(e[1],e[2])
      return function (other){
      var m = r.exec(other); 
      return m && m[0]
      }
    } else {
      
      x = function (other){ return other == func }
      x.target = func // information for debuging, 
      return x
    }
  }
  return function (other){

    for (i in func){
      key = checker(i)  //currently rebuilding checkers each iteration, bad.
      value = checker(func[i])

      var match = false
      for(j in other){
        if(key(j)){
          if(value(other[j]))
            match = true
        }
      }
      if (!match){
        return undefined
      }
    }
    return other
  }
}
