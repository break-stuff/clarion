# Start Your Project

First, make sure you have the clarion CLI installed:

```bash
npm install -g clarion  or  yarn global add clarion
```

After installing the Clarion CLI running the following command will provide you with the default project:

```bash
clarion new
```

The default project comes pre-configured for SASS using the .scss format and WebPack as the compiler and bundler. There are some additional features that come out-of-the-box for you to help simplify your development process.

## Options

One fo the great things about the Clarion CLI is the amount of flexibility you have with your project tooling. There are so many options on the tools to use in your projects, it can be very overwhelming. The objective of Clarion CLI is to help simplify that process and reduce the time to start-up a new project.

## Project Contents

### Starter Project

If you are starting an application from scratch, this is a great boilerplate! This will install the style architecture, the style framework, as well as any task runners/bundlers and optimizers needed to begin developing a web application.

In the Starter Project the following tools will also be installed to optimize your code:

#### PostCSS

PostCSS is a post-compiler for your CSS. This allows additional functionality to be added to your styles without needing additional work on your end. PostCSS transforms styles with JS plugins. These plugins can lint your CSS, support variables and mixins, transpile future CSS syntax, inline images, and more.

#### _Autoprefixer_

Autoprefixer is a plugin to parse CSS and add vendor prefixes to CSS rules using values from [Can I Use](https://caniuse.com/). This will help make your application more consistent across each browser.

#### _CSSNano_

CSSNano takes your nicely formatted CSS and runs it through many focused optimizations, to ensure that the final result is as small as possible for a production environment.

### Styles Only

This will only install the style architecture as well as the style framework. If you are using a front-end framework or your team has a specific architecture pattern, this will allow you leverage the style architecture while still adhering to an existing specifications.

### Architecture Only

This option will only scaffold out the style architecture and will not contain any of the style framework code.

## Style Format

### SCSS

This will configure the style files to use .scss format. This is a SASS format. Many people prefer this format as the syntax is more consistent with standard CSS. This syntax is great for those who are starting out with SASS.

### SASS

This will configure the style files to use .sass format. This is also (obviously) a SASS format. This is more of a minimalist approach for writing SASS.

### LESS

This will configure the style files to use .less format.

## Bundlers and Task Runners

### Webpack

Webpack is the default bundler for your project. Webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset. This project uses webpack and webpack-dev-server CLI tools and will need to be installed (`npm i -g webpack`).

### Parcel

Parcel is a web application bundler, differentiated by its developer experience. It offers blazing fast performance utilizing multicore processing, and requires zero configuration. This project uses the parcel CLI tool and will need to be installed (`npm i -g parcel-bundler`).

### Gulp

Gulp is a task runner built on Node.js and npm, used for automation of time-consuming and repetitive tasks involved in web development like minification, concatenation, cache busting, unit testing, linting, optimization etc. This project uses the gulp CLI tool and will need to be installed (`npm i -g gulp-cli`).

### Grunt

Grunt is also a task runner similar to Gulp and is used to automatically perform frequently used tasks such as minification, compilation, unit testing, linting, etc. It uses a command-line interface to run custom tasks defined in a file (known as a Gruntfile). This project uses the grunt CLI tool and will need to be installed (`npm i -g grunt-cli`).
