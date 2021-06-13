# Step 4 - Request/responses

At the moment our server only does one thing. When it receives any requests, it sends back the same response - your message.

**If you don't believe it, try typing localhost:3000/chocolate and see what happens**

We can make the server send different responses depending on the request it receives.

### What is an endpoint?

An endpoint is the part of the url which comes after  `/`, in above case it's `/chocolate`.

There is a particular method on the request object that allows you to see the endpoint, which was put in the url.

**Inside your router function, at the top, add the following:**

```js
const endpoint = request.url;
console.log(endpoint);

```

All requests use one of the HTTP methods. The main ones are: `GET, POST, PUT, DELETE`.  


### Check which method was used for your request.

**Type inside your router function at the top :**

```js
const method = request.method;
console.log(method);

```

## 1. Create your own endpoints and send different responses.

Now, you know how to get the endpoint using `request.url`. Change your router function so that it sends one message when requested url is `/node` and another one when requested url is `/girls`.

Good luck :) Feel free to discuss it with your team or mentor.

## 2. Serve index.html

Now you know how to send the message. How do you send a whole html page?

You will see that we have a `public` folder with `index.html` and an image.

To be able to send any file from the server we need a core node module called `fs` - **file system.** 
`Fs` allows you to **read and write** to and from your hard drive. Before we can send our `index.html`, our server first needs to read it.

One of the `fs` methods is `fs.readFile('path to the file', callback);`. You can read more about `fs` [here](https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_fs_readfile_path_options_callback).

Also, we need to spacify the file `path` that our `index.html` acutely in our hard drive. We use for that a core module called `path`.  You can read more about `path` [here](https://nodejs.org/api/path.html).

We use one of `path` methods called `path.join([...paths])` that joins all given path segments together using the platform-specific separator as a delimiter, then normalizes the resulting path.  You can read more about `path.join()` [here](https://nodejs.org/api/path.html#path_path_join_paths).


Let's try it.

**Use `fs` and `path` to read in `index.html`**

**Require `fs` and `path` modules at the top of your file**

```js
const http = require('http');
const fs = require('fs');
const path= require('path');

const router = (request, response) => {
  const endpoint = request.url;
  console.log(endpoint);

  if(endpoint === '/') {

    const filePath = path.join(__dirname,'public','index.html');
    fs.readFile(filePath, (error, file) => {
      if (error) {
        console.log(error);
        return;
      } else {
        response.writeHead(200, { 'Content-Type': 'text/html' })
        response.end(file);
      }
    })
  } 
}
```


`__dirname` is a Node global object that gives you a path to current working directory. We can use this instead of writing the whole path. 

**Bouns**, what can you do to handle `error` from `readFile` instead of `console.log` ?, also try to handle unknown routes.

---

## [**next step >>>**](step05.md)

---
### Keywords:
- http methods
- fs
- fs.readFile()
- [__dirname](https://nodejs.org/docs/latest/api/globals.html#globals_dirname)
