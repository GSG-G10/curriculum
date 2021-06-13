# express-and-testing-workshop

Learning Outcomes
==

* Add Tests to an express backend server/API
* Integration testing
* Learn to add tests to Express JS Routes - testing that routes work as
  expected and return what is expected

## Introduction

* Express routes can be tested using TDD, to create a route in express you use
  `express.Router`.
* This is then added to the server as follows

```js
// In Routes.js
router.get('/', (res, req) => {
  //Do Stuff
})
// In Server.js
const app = express()
app.use(routes)
```

* In this workshop you will find a `server` folder **(we fetch the data from `server/models/data.json` to simulate a Database)**, which have been set up for you, so you should not have to change any code in these folders but feel free to have a look.

* The objective of this workshop is to write integration tests for a backend
  server which has already been setup.

* 'Integration tests' are tests that check the correct functioning of several interconnected functions all working together.

* `Supertest` and `Jest` allow us to perform Integration tests checking that the Server and Database are communicating properly, and calls to the Server endpoints respond with the correct status codes and any data requested.

* In the server folder there is a `routes` subfolder inside of which all the
  servers routes have been written for you.

* In the server folder there is a `controllers` subfolder inside of which all the controllers functions have been written for you.

* Your tests will ensure that not only these functions but also the database
  queries they depend on all work together to provide the information from each
  endpoint


## Requirements

* [Postman](https://www.getpostman.com/) is a tool which allows you to test
  api endpoints to see what these return.
* An alternative is that you can use `curl` a command line took to ping an
  endpoint for example
  ```sh
   curl http://www.example.org:1234/
  ```
  to check each endpoint (though
  this is slighty more involved and I recommend downloading postman).

## List of Endpoints
* `/facsters`
* `/facsters/:name` e.g. `facsters/amelie`
* `/facster/new` - This is a post request expecting an object
* `/facsters/:name/superpower`
* `/facsters/:name/hobby`

## Tasks
* `git clone` this repository, run `npm install`.
* Run `npm start`. Now you can use postman or another tool to make requests to the endpoints.
* In **another** terminal pane run npm test **(for this we don't actually need the server to be running)**.
* Then go to you test folder, and open `routes.test.js`
* Inside this file you will be using `Jest` and `supertest`(a testing
  framework - [link to the docs!!](https://github.com/visionmedia/supertest))
* Jest allows you to make assertions and check that things are equal
  etc. `supertest` will allow you to make requests to your server and expect
  certain results, and also has some limited assertion/testing functionality.
* The structure of your tests should be as below. Note that ```supertest``` is assigned to ```request``` as this is a convention.
  ```js
  const request = require('supertest');

  test('What your tests is testing', (done) => {
      request(app)
        .get('/facsters')
        .expect(200)
        .end(function(err, res) {
          /* INSERT Jest TESTS HERE
          Don't forget to end your test, documentation is your friend */ 
        })
      })
  ```

## Notes / Tips
* What should you test?
  - Think about what response you would want from the API and see if you can test that.
  - For example, you might test the status code (as above), the content type, and the contents of the body.
  - Make sure you write tests for each route, and test each response thoroughly.
*  Although `supertest` is new to you there is a whole wide world of
  frameworks and libraries in javascript (#JS_Fatigue) and learning to use the docs
  is probably half of what it means to be a good js developer.
