# Test Driven Development Server with Jest and Supertest
 ## IMPORTANT! Do NOT clone this repo!
 Repeat: DO NOT CLONE! This whole repo IS the solution to the challenge, so please read below for further instructions :wink:

## Learning Outcomes
To understand the potential of faking requests to your server for the purposes of testing responses, using the tools below:

## Tools

### Jest
[Jest](https://jestjs.io/) is a `testing framework`

### Supertest
[Supertest](https://github.com/visionmedia/supertest) is used in this workshop to simulate fake server requests *without* the need to have the server listening via a socket connection to respond to the requests. Fake requests are simply objects passed to your routes;
```javascript
test('route', (done) => {
    supertest(router)
        .post("/")
        .send(['a', 'b']) // to send a payload
        .set({ Headers }) //setting headers
        .expect(200)
        .expect('Content-Type', 'application/json')
        .end((err, res) => {
            if(err) return done(err);
            else done();
        });
});
```

# Walkthrough

Throughout this workshop, it is very important that you don't copy/paste the code, but write each line yourself _and make sure you understand what you're writing_. This may seem unnecessary and slightly irritating, but if you copy/paste now, you will find yourself copy/pasting from your old repos in future. It is far better that you write it from scratch enough times for you to remember it. It's a good idea to give your partner a gentle reminder [when you're pairing too](https://github.com/foundersandcoders/master-reference/blob/master/coursebook/general/tips-for-mentoring.md).

- Create a new directory, move into it, and then set up blank node project with a package.json
```
mkdir <<name of directory>> && cd <<name of directory>>
```
```
npm init
```
- Create a server file (not strictly necessary in this walkthrough but you might as well get the practice of doing a full set up), and enter the necessary code to get your server running;
```
$ touch server.js
```

```javascript
const http = require('http');
const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 4000;

http.createServer().listen(port, hostname, () => {
  console.log(`Server running at port http://${hostname}:${port}`)
});
```
- Remember that [`npm start` is a default command](https://docs.npmjs.com/cli/start) that will run `node server.js` unless you specify otherwise. So, if you have called this file server.js, there is no need to write a start script yourself. Type this into your terminal now, just to make sure everything has been written correctly (N.B. if you go to localhost:4000 in your browser at this stage, it won't load as we haven't any routes yet)
```
$ npm start
```
- Install jest and supertest as dev dependencies
```
$ npm install jest supertest --save-dev
```
- Create a file to hold your tests
```
$ touch test.js
```
- Inside `test.js`, require supertest;
```javascript
const supertest = require('supertest');
```
- Write a test to ensure Jest is working;
```javascript
test('Initialise', () => {
  let num = 2
  expect(num).toBe(2);
})
```
- Edit the test script in your package.json file so you can run the tests

- Run `npm test` in the terminal to check the test is passing-

- You're going to start by testing your routes, so create a router file
```
$ touch router.js
```
- Back in `test.js`, require in your new router file
```javascript
const router = require('./router'); // remember: relative paths are needed for local modules, and if you're working with a javascript file, the '.js' extension is not required (you can still add the extension if you like)
```
- Now let's create a failing test to check your `router.js` logic. Start by describing what you are testing
```javascript
// Home Route
test('Home route returns a status code of 200', done => {
})
```
- Supertest is given the argument of ```router```. We then define the type of request (here we are saying we want to make a `GET` request to the home route `'/'` and the content type), and end with a callback function with the error and response.
```javascript
// Home Route
test('Home route returns a status code of 200', done => {
    supertest(router)
        .get("/")
        .expect(200)
        .expect('Content-Type', /html/)
        .end((err, res) => {
            // we will deal with the response here
        });
});
```

- In this callback, we  want to check the `status code` of the response in the form of res.statusCode.
```javascript
// Home Route
test('Home route returns a status code of 200', (done) => {
  expect.assertions(1);
    supertest(router)
        .get("/")
        .expect(200)
        .expect('Content-Type', /html/)
        .end((err, res) => {
            if(err) return done(err);
            expect(res.statusCode).toBe(200); // note we have used .expect(200) above so this assertion is not neccesary. This is to show you how to check the statusCode in the res.
            done();
        });
});
```

Now when you run `npm test` you should see the following error;
```
TypeError: app.address is not a function
```
This is because we are not exporting our router, which means it cannot be accessed by our test file. So let's get started on our router file.

- In router.js, add a function called router, that includes arguments `req` and `res`
```javascript
const router = (req, res) => {
}
```
And **export the router function**;
```javascript
module.exports = router;
```
- Add an `if` branch, the condition should be if the url property of the request object matches `'/'`;
```javascript
const router = (req, res) => {
  if (req.url == '/') {
  }
}
```
- Next, inside this branch, call the `writeHead` method with a response code of `200` and a header object containing the content-type;
```javascript
const router = (req, res) => {
  if (req.url == '/') {
    res.writeHead(200, {'content-type' : "text/html"})
  }
}
```
- Finally, call the *end* method on the response object;
```javascript
const router = (req, res) => {
  if (req.url == '/') {
    res.writeHead(200, {'content-type' : "text/html"})
    res.end()
  }
}
```
- Update your server.js file so that you are requiring in your router (this is not for the tests!)

```javascript
const http = require('http');
const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 4000;
const router = require('./router');

http.createServer(router).listen(port, hostname, () => {
  console.log(`Server running at port http://${hostname}:${port}`)
});
```
- Run `npm test` again to validate
- You've written your first passing test of your servers logic, congrats! Now you can build on this test by adding another test to check the response payload;
```javascript
test('Home route', done => {
    expect.assertions(1);
    supertest(router)
        .get("/")
        .expect(200)
        .expect('Content-Type', /html/)
        .end((err, res) => {
            if(err) return done(err);
            expect(res.text).toBe('Hello');
            done();
        });
});
```

We're using jest's `expect` method which takes an initial argument and `toBe` Takes the comparison argument.`toBe` will only succeed if the two arguments are equal.

Also note that we have taken out the `expect.toBe(res.statusCode, 200);` assertion.

- Run `npm test` to make sure this test fails as expected
- Now make the test pass by adding `'Hello'` to the payload in your home route
```javascript
const router = (req, res) => {
  if (req.url == '/') {
    res.writeHead(200, {'content-type' : "text/html"})
    res.end('Hello')
  }
}
```
## Next Steps
`supertest` introduces the `expect` API, which does some of the work `Jest` was doing for us (eg: `res.statusCode` assertions). The [documentation](https://www.npmjs.com/package/supertest#api) indicate that we can use `expect` for testing status codes, header fields, response body, or to pass an arbitrary function to. Combined with [Jest](https://jestjs.io/) you can build a robust set of tests to ensure all your server endpoints are tested.

Extra notes on the `expect` API can be found [here](https://dzone.com/articles/testing-http-apis-with-supertest).
also read about how to test asynchronys code in jest [here](https://jestjs.io/docs/en/asynchronous) 

## Exercises

Next, find a partner that you haven't worked with before. Use TDD and the ping-pong method [that you learned in week 1](https://github.com/foundersandcoders/master-reference/blob/master/coursebook/week-1/pair-programming.md) to add & test the following features :

| Exercises  | URL              | Headers              | Body  | Status Code | Response Body |
|:-----------:|:-----------------:|:--------------------:| -----:|------------:|--------------:|
|   1        | `GET /elephants`  | N/A                  | N/A   | `404`         |`'unknown uri'`|
|    2      | `GET /blog`       | N/A                  | N/A   | `200`        | `["one", "two", "three"]` |
|     3     | `POST /blog`      | `{ password: potato}`|`['a','b']`  | `200`         | `['a','b']`|
|     4     | `POST /blog`      | N/A                  | N/A   | `403`         | `'Forbidden'` |
|      5    | `POST /blog`      | `{ password: potato}`| N/A   | `302`         | `{ Location : /blog }` |
