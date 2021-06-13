// leave me alone :) :) :) <3 <3 <3
var constantNumber = 5;
var constantArray = [5, 7, 23, 4];
var constantObject = {
  "a": 5,
  "b": 2,
  "c": 8
};
// leave me alone :) :) :) <3 <3 <3

// Refactor the following functions into pure functions:

var addOne = function () {
  constantNumber += 1;
  return constantNumber;
};


var timesTwo = function () {
  constantNumber = constantNumber * 2
  return constantNumber
};


var incrementArray = function (array) {
  array.forEach(function(x, i) {
    array[i] =  x + 1;
  })
  return array
}

var addNumberArray = function (array, number) {
  array.push(number);
  return array;
};

var incrementObject = function (object) {
  Object.keys(object).forEach(function(x) {
    object[x] = object[x] + 1
  });
  return object;
};

module.exports = {
  addOne,
  timesTwo,
  incrementArray,
  addNumberArray,
  incrementObject,
  constantNumber,
  constantArray,
  constantObject
}
