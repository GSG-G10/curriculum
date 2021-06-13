# Testing & Test-driven Development

## What is testing?

Testing in general is the process of executing your code to check it does what it's supposed to do. It demonstrates that your code meets the design requirements and can also provide a template for writing new code.

We're mostly concerned with automated unit testing for now, which involves writing code that will call your functions and tell you if they return what you expect. The idea is to test as many small "units" of code as you can, which will give you a good idea if the application as a whole is working.

It's very easy to create bugs in code, especially when you're editing an existing code base. A robust suite of automated tests gives you confidence to make changes, knowing that the tests will tell you if you introduce any bugs.

### Unit test example

Here's a slightly contrived example:

```js
function double(num) {
	return num * 2;
}

function testDouble() {
	var actual = double(2);
	var expected = 4;
	if (actual !== expected) {
		console.log(actual + ' should equal ' + expected + '╳');
	} else {
		console.log('Test passed ✔︎');
	}
}
```

We can run `testDouble` to make sure that our `double` function is still returning the right value. Now if someone else needs to make changes to `double` they have an easy way to see if they broke anything.

### Testing frameworks

Testing like the example above won't get you very far, which is why we use frameworks to help us. We'll be using [Jest](https://jestjs.io/docs/en/getting-started) on the course.

Frameworks give you "assertions" or "matchers" like `toBe`, `toEqual` and `toBeNull` to check your values. They also let you easily describe what you're testing and what result was expected, which gives you good test outputs that can act as bug reports when something goes wrong.

## What is Test-driven Development?

TDD is a methodology for writing code where you write the tests _before_ your functions. This way you are forced to really think through exactly what you want your code to do (i.e. what values your function takes and returns) before you start writing it. It's like planning an essay (if your plan could also tell you if you've got the right answer).

You also end up with a complete test-suite for your code as soon as you're finished. This is valuable because it's harder to go back and write tests once you're done (especially if you don't do it right away).

### TDD process

Generally TDD follows the "red, green, refactor" cycle:

![](https://user-images.githubusercontent.com/9408641/27683709-e1c5e8c0-5cbe-11e7-99a4-215a5dae63f1.png)

1. Write a failing test. This ensures you understand the requirements. Having the test fail also demonstrates that there are no false positives (so you know it's your code causing it to pass). E.g. "`double` should take a number `num` and return it doubled".

2. Make the test pass. This is where you actually write the code to do what you need. Make sure you don't cause any previous tests to fail.

3. Refactor the code (if necessary) to improve it. You now have the test to show you when the code stops working, so you can be confident in making changes.

## Testing advice

It's much easier to test "pure" functions. These are functions that always return the same thing if given the same input. The `double` function above is pure because no matter what number it's given we know what it will return.

Making your functions single-purpose will also help you test them. You can combine lots of small functions with their own tests to achieve bigger results.

Think of tests as bug reports. What do you want a failing test to tell you?

1. What part of your code were you testing?
2. What should that code do?
3. What did it do?
4. What should it have done?

A good template for writing tests with Jest would look something like this:

```js
// Answer these questions for each unit test you write:
describe('What component aspect are you testing?', function() {
	test('What should the feature do?', function() {
		const actual = 'What is the actual output?';
		const expected = 'What is the expected output?';
		expect(actual).toBe(expected);
	});
});
```

## Further reading

- [The Jest documentation](https://jestjs.io/docs/en/getting-started)
- [5 Questions Every Unit Test Must Answer](https://medium.com/javascript-scene/what-every-unit-test-needs-f6cd34d9836d)
- [TDD the RITE Way](https://medium.com/javascript-scene/tdd-the-rite-way-53c9b46f45e3)
