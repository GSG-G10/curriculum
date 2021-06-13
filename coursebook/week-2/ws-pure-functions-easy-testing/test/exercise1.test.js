const { addOne, timesTwo, incrementArray, addNumberArray, incrementObject, constantNumber, constantArray, constantObject } = require('../exercises/exercise1.js');

test('Refactor our addOne function so it is pure.', function () {
  expect(addOne(constantNumber)).toBe(6);
  expect(constantNumber).toBe(5);
  expect(addOne(constantNumber)).toBe(6);
  expect(addOne(4)).toBe(5);
  expect(addOne(104)).toBe(105);
  expect(addOne(7)).toBe(8);
  expect(addOne(78)).toBe(79);
})

test('Refactor our timesTwo function so it is pure.', function () {
  expect(timesTwo(constantNumber)).toBe(10);
  expect(constantNumber).toBe(5);
  expect(timesTwo(constantNumber)).toBe(10);
  expect(timesTwo(4)).toBe(8);
  expect(timesTwo(27)).toBe(54);
  expect(timesTwo(7)).toBe(14);
  expect(timesTwo(23)).toBe(46);
})

test('Refactor our incrementArray function so it is pure.', function () {
  expect(incrementArray(constantArray)).toEqual([6, 8, 24, 5]);
  expect(constantArray).toEqual([5, 7, 23, 4]);
  expect(incrementArray(constantArray)).toEqual([6, 8, 24, 5]);
  expect(incrementArray([3, 5, 12])).toEqual([4, 6, 13]);
  expect(incrementArray([7, 54, 1])).toEqual([8, 55, 2]);
  expect(incrementArray([1])).toEqual([2]);
})

test('Refactor our addNumberArray function so it is pure.', function () {
  expect(addNumberArray(constantArray, constantNumber)).toEqual([5, 7, 23, 4, 5]);
  expect(constantArray).toEqual([5, 7, 23, 4]);
  expect(addNumberArray(constantArray, constantNumber)).toEqual([5, 7, 23, 4, 5]);
  expect(addNumberArray([4, 100, 12], 27)).toEqual([4, 100, 12, 27]);
  expect(addNumberArray([2], 5)).toEqual([2, 5]);
})

test('Refactor our incrementObject function so it is pure', function () {
  var expected = {
    "a": 6,
    "b": 3,
    "c": 9
  };
  var startingObject = {
    "a": 5,
    "b": 2,
    "c": 8
  };

  expect(incrementObject(constantObject)).toEqual(expected);
  expect(constantObject).toEqual(startingObject);
  expect(incrementObject(constantObject)).toEqual(expected);
  expect(incrementObject({ "a": 4, "b": 12, "c": 9 })).toEqual({ "a": 5, "b": 13, "c": 10 });
})
