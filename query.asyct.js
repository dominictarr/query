

var query = require('query')
  , should = require('should')

exports ['can find in a list'] = function (test){

  var l = [1,2,3,4,5,6,7,8,9,10]
    
  function even (v,k){ return v % 2 === 0 }
  function odd (v,k){ return v % 2 !== 0 }
    
  (function (){}).should.be.a('function')
  
 query(l).should.be.a('function')
    
  query(l)().should.eql(l)
  query(l)(even).should.eql([2,4,6,8,10])
  query(l)(odd).should.eql([1,3,5,7,9])
    
  query(l).first(even).should.eql(2)
  query(l).first(odd).should.eql(1)

  query(l).last(even).should.eql(10)
  query(l).last(odd).should.eql(9)

  test.finish()
}

exports ['can map on a query'] = function (test){
  var l = [1,2,3,4,5,6,7,8,9,10]
  var d = [2,4,6,8,10,12,14,16,18,20]

  query(l).map(function (x){return 2*x}).should.eql(d)

  test.finish()
}

exports ['can map mapping an object maintains keys'] = function (test){
  var l = {one: 1, two: 2, three: 3}
  var d = {one: 2, two: 4, three: 6}

  query(l).map(function (x){return 2*x}).should.eql(d)

  test.finish()
}


exports ['can match directly with a primitive'] = function (test){

  var l = [1,2,3,4,5,6,7,8,9,10]
  var d = [2,4,6,8,10,12,14,16,18,20]
    
  function even (v,k){ return v % 2 === 0 }
  function odd (v,k){ return v % 2 !== 0 }
    
  (function (){}).should.be.a('function')
  
 query(l).should.be.a('function')
    
  query(l)().should.eql(l)
  query(l)(5).should.eql([5])
  query(l)(7).should.eql([7])
  query(l)(17).should.eql([])
    
  query(l).first(2).should.eql(2)
  should.equal(query(l).first(16),null)

  query(l).last(10).should.eql(10)
  should.equal(query(l).last(12),null)

  test.finish()
}

/*
  finding all strings may not be _that_ useful yet, 
  but when it's applied to object keys...

*/

exports ['can string matches are regular expressions'] = function (test){

  var l = 
      [ "sadflasdfl"
      , 'ewryozxcvn'
      , '8345jf43j'
      , 'f4jdnls'
      , 'hello'
      , 'hello there'
      , 'f3j49fi4'
      , 'xxxxxx'  
      , 'xxxxxxxx' ] 
    
  function even (v,k){ return v % 2 === 0 }
  function odd (v,k){ return v % 2 !== 0 }
    
  (function (){}).should.be.a('function')
  
 query(l).should.be.a('function')
    
  query(l)().should.eql(l)
  query(l)('hello').should.eql(['hello'])
  query(l)('/hello.*/').should.eql(['hello','hello there'])
    
  query(l).first('/e.+/').should.eql('ewryozxcvn')
  should.equal(query(l).first(''),null)

  query(l).last('/.*/').should.eql('xxxxxxxx')

  test.finish()
}

exports ['can match keys and values of an object'] = function (test){
  var john =  {name: 'john'}
    , jane = {name: 'jane'}
    , ben = {name: 'ben'}
  var people = [john,jane,ben]

  var p = query(people).all({name: "ben"})

  p.should.eql([ben])
  
  var q = query(people)({name: "/j.*/"}) //get names beginning with j
  
  q.should.contain(john)
  q.should.contain(jane)
  q.should.not.contain(ben)

  query(people).first({name: "ben"}).should.eql(ben)
  query(people).last({name: "ben"}).should.eql(ben)

  test.finish()
}

exports ['can call function on every item matched by a key'] = function (test){
  var john =  {name: 'john'}
    , jane = {name: 'jane'}
    , ben = {name: 'ben'}
  var people = [john,jane,ben]
  var people2 = []
  var people3 = []
  
  people.forEach(query(people2).push)
  people.forEach(query(people3).set)

  people2.sort().should.eql(people.sort())
  people3.should.eql(people.sort())

  var names = []

  var p = query(people).each({name: query(names).push})

  names.should.eql(['john','jane','ben'])
 
  test.finish()
}

exports ['can search by keys'] = function (test){
/*
  I was turning strings in regex! very silly! i want to take every character literially, unless it's specificially a regex!
*/


  var star =  {'*': 'star'}
    , dot = {'.': 'dot'}
    , slash = {'/': 'slash'}
    , question = {'?': 'question-mark'}
  var vic = [star,dot,slash,question]

//these queries will match any value, but only one key.

  test.deepEqual(query(vic).all({'*':/.*?/}),[star])
  test.deepEqual(query(vic).all({'.':/.*?/}),[dot])
  test.deepEqual(query(vic).all({'/':/.*?/}),[slash])
  test.deepEqual(query(vic).all({'?':/.*?/}),[question])

  test.deepEqual(query(vic).first({'*':/.*?/}),star)
  test.deepEqual(query(vic).first({'.':/.*?/}),dot)
  test.deepEqual(query(vic).first({'/':/.*?/}),slash)
  test.deepEqual(query(vic).first({'?':/.*?/}),question)

  test.deepEqual(query(vic).last({'*':/.*?/}),star)
  test.deepEqual(query(vic).last({'.':/.*?/}),dot)
  test.deepEqual(query(vic).last({'/':/.*?/}),slash)
  test.deepEqual(query(vic).last({'?':/.*?/}),question)


  test.finish()
}
