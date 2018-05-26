var func1 = require('./function1.js');
var func2 = require('./function2.js');
var func3 = require('./function3.js');

function indexFunction()
{
    console.log(func1.function1());
    console.log(func2.function2());
    console.log(func3.function3());
    console.log(" in index function");
}

module.exports = {
    indexFunction:indexFunction
}