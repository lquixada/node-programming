const {my_function} = require('./build/Release/hello_in_clang');
const value = 8;

console.log(`${value} times 2 equals`, my_function(value));