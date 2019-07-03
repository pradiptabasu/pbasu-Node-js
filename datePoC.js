var format = require('date-format');
var datetime = new Date();
console.log(datetime)
var datetimeISOString = datetime.toISOString()
console.log(datetimeISOString)
var date = datetimeISOString.substring(0, datetimeISOString.indexOf("T"));
console.log(date)
console.log(format("yyyy-MM-dd", new Date()));