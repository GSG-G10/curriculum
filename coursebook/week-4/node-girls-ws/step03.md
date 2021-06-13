# Step 3 - Communicate with the server

### What is a router function?

When a request reaches the server, we need a way of responding to it. In comes the **router** function. The router function is just a function which receives requests and handles and directs them.

The router function always takes a `request` and `response` object and sends the response back to the client along with some information. You can decide what to send back in your response.

```js
const router = (request, response) => {
  // deal with request and sending response
}
```

## 1. Create your own router function.

We are now making a router function with a custom message in our response. You can write any message you want.

**Add the following code to `server.js`**


```js
const http = require('http');

const message = 'I am so happy to be part of the Node Girls workshop!';

const router = (request, response) => {

}

const server = http.createServer();
const port = 3000;

server.listen(port, ()=> {
  console.log(`Server is listening on port ${port}.  Ready to accept requests!`);
});


```

## 2. Tell your router function what to do

We want our router function to send our message in a response. To do that we will use one of the method of `response` object, which is: ```response.write()```. You can find more about `response.write()` [here](https://nodejs.org/dist/latest-v12.x/docs/api/http.html#http_response_write_chunk_encoding_callback)

Every response has a header, which contains information about the response. We can add information to the header using `response.writeHead()`. The `writeHead` takes 3 parameters: status code, status message and header object, for now we will omit the status message, and use only the status code and the header object.

**Add these line to the router function**

```js
const router = (request, response) => {

  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(message); //response body
  response.end(); // finish response
}

```

## 3. Pass the router function to your server

The createServer() method takes a router function as an argument.

**Pass your router function to createServer method**

```js
const server = http.createServer(router);

```

## 4. Rerun your server and go to your favourite browser

**Rerun your server by typing again**


```
node server.js
```

**Type in your browser** `localhost:3000`

If you see your message in the browser, **congratulations** you just sent your first response from the server.

**Hint** 

It will get a bit annoying having to run the server any time we make a change from the terminal with `node server.js` .
Install nodemon as a dev dependancy and write an npm script for starting the server file with nodemon.

---

## [**next step >>>**](step04.md)
---
### Keywords:
* ['status code'](https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/)
* ['response.writeHead()'](https://nodejs.org/api/http.html#http_response_writehead_statuscode_statusmessage_headers)
