# query #

ideas:

    in(data).query({key: 'value'})

search through data and find first/all? object who's 'key' property is 'value'

    in(data).query.literal({key: 'value'}) 

find all object which match {key: 'value'} 

    in(data).query(['green','tomato']) 

or query

    in(data).query.literial(['green','tomato']) 
    
look for array ['green','tomato']

    in(data).query({key: '.*'}) no, simpler to use regular expressions!

find everything with a 'key' property

    in(data).query({key: '\*'})

find everything with a 'key' property set to '*'

    in(data).query({key: '*'})


NEXT:

use test_reports to generate examples to check test adapters against!
