# Step 7 - Reorganising your project

Let's make the code a bit more structured and organised. The best way to do that is:

* split code up into separate files
* organise code into different folders

`server.js` has got quite messy now. It's good practice to separate routes and handlers into their own files.

### Basic folder structure

**public** --> all client-side assets (e.g. html, css, images etc)
* index.html
* main.css
* image.jpg
* favicon.ico

**src** --> `src` is short for 'source'. This will contain the server-side code that deals with logic

* move `server.js` inside `src` folder.
* create a `router.js` file in the `src` folder.
* paste router function and related dependencies into router.js


## Making your own modules!

Way back in step 2, we mentioned that there are three types of modules in Node. You are about to make the third type of module - your own one!

In this context, a module is some code that you've written in its own JavaScript file. You can share this code with other files. This is handy, because it means we can split big, messy files into smaller ones.

To connect one file with another, we use the same `require()` as with core modules. The only difference is we instead of:
```js
const coreModule = require('nameOfModule');
```

we do this:
```js
const myModule = require('path/to/my/file');
```

**Require your router.js file into your server.js file**


**In `router.js`, you will need to add the following**

```js
module.exports = router;
```

`module.exports` makes our router function available to be required in other files.

Try running the server again and reloading the page.

## Fixing your broken paths

If you handled the error correctly you would see Internal Server Error  

```js
if (error) {
console.log('error:', error);
res.writeHead(500, { 'Content-Type': 'text/html' });
res.end('<h1>Internal Server Error</h1>');
}
```

If not, you won't see anything

**There's a reason for that!**

**hint** read the `error` object in the terminal, and try to see where's the error.

When the handler function was in `server.js`, the paths to our assets (html, css etc) that were assigned to the `pathToFile` and `pathToIndex` variables, were correct. Now the handler function has moved inside the `src` folder, we need to update the paths to our assets to make sure they point to the right location.

We can use **relative paths**. `..` means "go up one level to the folder above".  `.` means "look inside the current folder". For example: '../myComputer/home.txt' means "go up one folder, then go to the 'myComputer' folder, then go to the 'home.txt' file". Another example: './home.txt' means "look inside the current folder for the 'home.txt' file"

Remember that `__dirname` gives us the current directory. We can combine `__dirname`, the dots, and any folder names to point to the correct location.

See if you can do this by yourself. Work with your team if you're struggling.


## More modularisation!!!

You could split `router.js` even further, by separating your routes and make each route handle its code by calling handlers routes functions from inside `handlers.js` . **We will not do this now**.

---

## [**Next step >>>**](step08.md)

---
## Keywords
* root
* relative paths
* [module.exports](http://www.sitepoint.com/understanding-module-exports-exports-node-js/)
