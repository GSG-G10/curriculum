# An introduction to npm

Node is a way of running Chrome's V8 JavaScript engine outside of the browser. You'll be learning more about this later in the course.

npm is Node's package manager. It's a repository of hundreds of thousands of useful pieces of code that you may want to integrate with your Node project.

npm also has a command line tool that lets us easily install, manage and run projects.

### `npm init`

`npm init` is the first command you need to know to create a Node project. It will 'initialise' your project by adding a file called `package.json` in the root directory.

npm will ask you some questions in your terminal after you run the command — your answers will be pre-filled into the `package.json`.

Don't worry, you can change your answers later by editing `package.json` manually.

### `npm install`

`npm install <package-name>` is how you install third party npm 'modules' (pieces of code from the npm repository). E.g. `npm install tape` will install the Tape testing library we'll be using soon.

npm will create a `node_modules` folder at the root of your project. This is where any third party modules you install are stored. Don't worry if you see way more files than you expect — npm also puts all the dependencies of the modules you install in here (and their dependencies, and their dependencies and ...)

You may see `npm install -g <package-name>`. The `-g` flag installs the module globally to your machine, rather than into the `node_modules` folder of that specific project. This can be useful for certain kinds of modules (e.g. command-line utilities that you might want to use anywhere).

### `.gitignore`

This is a good time to mention that you want to keep your `node_modules` folder off Github. There can be hundreds of thousands of files in this directory, which can make for some ugly commits. It can also take up a huge amount of space on something like Github as this folder can easily exceed 100MB for applications with lots of dependencies.

A `.gitignore` file is a way to tell Git to leave certain things alone.

If you are creating a repository on Github then you can use the 'Add .gitignore file' dropdown to automatically generate a variety of `.gitignore` files for different kinds of projects. You'll want to choose 'Node' here.

If you're working locally you can create a file called `.gitignore` at the root of your project and add `node_modules`.

### Saving dependencies

It's useful to declare dependencies within your project. This ensures that other people who clone your repo will be able to replicate your exact environment (since your node modules don't get synced with Github).

There are two ways to save dependencies:

- `npm install <package-name>` (prior to npm5 you had to save this way: `npm install <package-name> --save`)
- `npm install <package-name> -D`

At first glance these appear similar, but there is a distinction: the default save is for dependencies that your application needs to run (i.e. things that need to be installed on the server delivering your application). `-D` is for development dependencies that your project doesn't need in production (e.g. testing frameworks are generally only used in development — you don't need it on your live server).

`npm install <package-name>` will update your `package.json` with a section called 'dependencies', whilst adding `-D` will put the dependency in a section called 'dev-dependencies'.

The idea is to make it clear to other developers who might work on your project what dependencies are required for it to work and what are only needed for the dev environment.

### npm scripts

You may have noticed that npm created a section called "scripts" in your `package.json`. These are handy shortcuts you can create to run dependencies you install. Think of them as per project command line aliases.

npm installs executable packages into `node_modules/.bin`, which means you can run them via the command line like this (for example) `node_modules/.bin/cowsay hello`. 

npm scripts will automatically look inside `node_modules/.bin` for the package, allowing you to avoid typing the full path `node_modules/.bin/cowsay`, and instead use just the package name, `cowsay`.

This means you can instead add a test script like this:

```json
{
  "scripts": {
    "greeting": "cowsay hello"
  }
}
```

and run it with `npm run greeting`, which is now equivalent to `node_modules/.bin/cowsay hello`.

Note that running `cowsay hello` directly in the terminal will not work, as the terminal does not know to look inside `node_modules/.bin` to find `cowsay`.
This is an added feature of npm scripts.

## Tasks

1. Create a new directory
2. Inside the new directory, initialise the project with `npm init` (you can skip all the questions with `npm init -y`)
3. Install Cowsay `npm install cowsay -D`
4. Have a look at the `package.json` file
5. Open `node_modules` and see if you can find Cowsay
6. Run `node_modules/.bin/cowsay hello`
7. Add `"greeting": "cowsay hello"` to your npm scripts
8. Run `npm run greeting`
