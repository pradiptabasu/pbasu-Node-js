var func4 = require('./function4.js');

function function3()
{
    return "hello function 3 ... " + func4.function4();
}

module.exports = {
    function3 : function3
}