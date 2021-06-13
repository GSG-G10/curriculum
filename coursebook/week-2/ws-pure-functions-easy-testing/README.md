# Pure functions for easy testing

## Learning aims

This workshop aims to help you understand:

- What is a pure function?
- Why code with pure functions?
- How can you adapt your code to use pure functions?

_Some other things you will need to know about before you start (with resources if you need to refresh your memory):_

- If you're unclear on testing with Jest, revise what you've looked at earlier this week
- The difference between [global and local variable scope](https://docs.microsoft.com/en-us/scripting/javascript/advanced/variable-scope-javascript)
- [Array.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) - review the Free Code Camp exercise [here](https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/functional-programming/use-the-map-method-to-extract-data-from-an-array/)
- [Math.Random()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)

## Why test with pure functions?

Testing your code lets you spot which of your functions are not doing what you're expecting them to. If you have a failing test, it tells you which part of your code needs attention.

BUT - if your test covers a massive chunk of code with hundreds of functions, how do you know which one to fix?

The answer is to make sure your tests each cover a single function and that each of those functions are small and predictable - pure functions. Pure functions aren't always easy to write, so this workshop aims to give you some ideas of where to start.

## What is a _pure function_?

### A pure function always returns the same result from the same arguments.

Functions take in some number of arguments and then return a value. A _pure function_ will **always** return the same result when run with the same arguments.

For example, if you call...

```js
function stringLength(str) {
  return str.length;
};
```

... with the argument `str='hello'` the answer will always be `5`, no matter how many times you run the function.

However, if you call...

```js
function randomAdd(x) {
  return Math.random() + x;
};
```

... with the argument `x=5` the answer should be different each time, as x is added to a random number between 0 and 1. This would not be a pure function.

### A pure function has no side effects.

A side effect is anything a function does outside of calculating the return value. This means that simply calling the function should have no effect on the rest of your program - it should do nothing but return a value.

One example of a side effect is **changing a global variable**, which would happen in this case:

```js
var age = 1;

function howOldNextBirthday(a){
  age = a + 1;
  return age;
}
```

The first time we call `howOldNextBirthday(age)`, it would return `2`, but if we were to call `howOldNextBirthday(age)` a second time, it would return `3`. This is because the global variable `age` was changed by the function as it ran. If you had other functions that relied on the `age` variable, they may not behave in the way you expected because of this change.
[See this in repl.it](https://repl.it/LwTb)

Other side effects include **making HTTP requests** and **manipulating the DOM**.

## Examples:

### Example 1 - avoiding unneeded global variables

Imagine we've been asked to write some code that takes an array of words and returns an array of those words capitalised and with 3 exclamation marks:

```js
['dog', 'cat', 'mouse']
// becomes
['DOG!!!', 'CAT!!!', 'MOUSE!!!']

['chocolate', 'crisps', 'icecream']
// becomes
['CHOCOLATE!!!', 'CRISPS!!!', 'ICECREAM!!!']
```

One way to write this would involve creating an empty array `excitedWords`, and then mutate (change) it:

```js
var wordList = ['chocolate', 'crisps', 'icecream'];

var excitedWords=[];

for (var i=0; i<wordList.length; i++){
  var word = wordList[i].toUpperCase() + '!!!'
  excitedWords.push(word);
};
```

However, this code is not divided into functions, and relies on global variables. This makes it hard to test: there is no function for our testing framework to call on, and `excitedWords` would need to be reset for each test.

To make this code testable, we can wrap it into a function `excite()` that takes an array as an argument and returns the information we want. This means we can run tests with any array, and that we can create our `excitedWords` array in the form we want without ever having to mutate it.

```js
function excite(words) {
  return words.map(function(word) {
    return word.toUpperCase()+'!!!';
  });
}

var wordList = ['chocolate', 'crisps', 'icecream'];
var excitedWords = excite(wordList);
```

### Example 2 - but what if I need side effects?

Most programs we want to write wouldn't work if we completely disallowed side effects. How then can we ensure that our impure functions are testable?

In this example, we have a function that toggles the opacity of an image (when the opacity is 0, it cannot be seen). Once the function is called, if the image is visible, it becomes invisible, but if it is already invisible, it instead becomes visible.

In the first version below, the function takes no arguments, alters the DOM after checking the global variable `changeTransition`, then changes the global variable `changeTransition`.

```js
var changeTransition = true;

function visionChange() {
  var visionimage = document.getElementById("visionimage");

  if (changeTransition === true) {
    visionimage.style.opacity = 0;
  }

  if (changeTransition === false) {
    visionimage.style.opacity = 1;
  }

  if (changeTransition === true) {
    changeTransition = false;
  } else {
    changeTransition = true;
  }
}
```

Next we rewrite the function as two separate functions, both of which will return the same value every time, when given the same argument.

Can you see what each functions return? How might you test the functions?

```js
function visionChange(changeTransition) {
  if (changeTransition) {
    return false;
  } else {
    return true;
  }
}

function updateDom(changeTransition) {
  return function() {
    var visionimage = document.getElementById("visionimage");

    if (changeTransition) {
      visionimage.style.opacity = 0;
    } else {
      visionimage.style.opacity = 1;
    }
  };
}

var impureUpdateDom = updateDom(visionChange(changeTransition));

// When we're ready...
impureUpdateDom();
```

`visionChange()` returns either `true` or `false`, and we can test whether the function returns the expected boolean case.

`updateDOM` returns a function which is impure (because it changes the DOM). We can test that the returned output is indeed a function.

Here's what our tests might look like:

```js
test("visionChange correctly switches boolean", function() {
  expect(visionChange(true)).toBeFalsy();
});

test("updateDom returns correct type", function() {
  expect(typeof updateDom(true)).toBe('function');
});
```

We now have two easily testable functions, which we can chain together to get the same functionality we had before.

Before you start the exercises, please look at this [example](https://github.com/foundersandcoders/master-reference/blob/master/coursebook/fragments/object-pass-by-reference.js) to understand how to copy an object.

## Exercises!

In these exercises, you have a number of impure functions and a number of failing tests. Your task is to rewrite the functions (and not the tests!) to make sure that the tests pass and the functions are pure.

- clone this repo and run `npm install`
- if you wish to automatically re-run your tests when you save, search about how to run jest in watch mode.
- run the tests using `npm test` (don't worry about the package-lock.json notice)
- look at the passing and failing tests
- open `exercises/exercise1.js`
- refactor the functions to make the tests pass. It will be useful to open the tests and look at exactly what is expected.

Hint: avoid changing any global variables...
