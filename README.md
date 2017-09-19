# Clarion

A simple CLI for scaffolding front-end projects using the Clarion Style Architecture.

Check out the official Documentation here: [https://break-stuff.github.io/clarion](https://break-stuff.github.io/clarion/)

**Please note that this project is still in alpha as features are still being ironed out. But please do not let it deter you from taking advantage of its great capabilities.**

## Installation

Install [Node.js](https://nodejs.org/en/), if you don't already have it installed.

In your terminal or command prompt type:

    npm install -g clarion

<!-- ** **Mac and Linux Users: There is a permissions bug. This can be fixed by running the following command. Sorry, this will be updated shortly.**

    chmod -R 755 /usr/local/lib/node_modules/clarion

**or if you are using nvm**

    chmod -R 755 /Users/<username>/.nvm/versions/node/<node version>/lib/node_modules/clarion -->

## Start a New Project
    clarion new MyProject


## Run Your New Project
First make sure all of your dependencies get installed.

    cd MyProject
    npm install

After your dependencies are installed you can run your project.

    npm run dev

## About Your New Project

The default project is configured with [SASS](http://sass-lang.com/) using the .scss syntax and [webpack](https://webpack.js.org/) as the transpiler and module manager.

The project architecture implements the Clarion Style Architecture.

    MyProject/
    |--build/
    |
    |--src/
    |  |--sass/
    |  |  |--00_Abstracts/     # Variables, Functions, Mixins, and Placeholders
    |  |  |
    |  |  |--01_Base/          # Resets/Normalize, Typography Rules, Etc.
    |  |  |  |--index.scss     # Manifest File
    |  |  |
    |  |  |--02_Themes/        # Themes and Third Party Plug-In Styles
    |  |  |  |--index.scss     # Manifest File
    |  |  |
    |  |  |--03_Elements/      # Styles for HTML tags, such as a form label, an input or a button
    |  |  |  |--index.scss     # Manifest File
    |  |  |
    |  |  |--04_Components/    # Cards, Carousels, and Navbars
    |  |  |  |--index.scss     # Manifest File
    |  |  |  
    |  |  |--05_Layouts/       # Grid System, Header, Footer, and Sidebars
    |  |  |  |--index.scss     # Manifest File
    |  |  |
    |  |  |--06_Pages/         # Page specific styles
    |  |  |  |--index.scss     # Manifest File
    |  |  |
    |  |  |--07_Utilities/     # Utilities and Helper Classes
    |  |  |  |--index.scss     # Manifest File
    |  |  |
    |  |  |--styles.scss/      # Main Sass Manifest
    |  |
    |  |--scripts/
    |     |--components/       # Component-Specific Scripts
    |     |--services/         # Reusable Functionality
    |     |--main.js
    |   
    |--index.html
    |--package.json
    |--postcss.config.js
    |--webpack.config.js

## Adding a New File

Additional style files can easily be manged through the CLI as well.

### Usage

    clarion add <directory> <file name>

### Example

    clarion add element headings

This will create the file _headings.scss in the 03_Elements directory as well as add "@import '_headings.scss'" import statement to the directory manifest file so it can be included in your final CSS file.

## Removing a File

Similar to adding a file, removing files can also be done through the CLI.

### Usage

    clarion remove <directory> <file name>

### Example

    clarion remove element headings

This will remove the file _headings.scss in the 03_Elements directory as well as remove "@import '_headings.scss'" import statement from the directory manifest file.

## Building Your Project

To build your application for final use, run the build command.

    npm run build

The final transpiled JavaScript and CSS file are in build directory in the root of your project.

## Options

These are options you can run when initializing you project.

    -O, --only     generate the style architecture only (great for integrating into frameworks)
    -E, --empty    generate an empty project without any of the start-up files (COMING SOON!!!)
    -C, --scss     files are in .scss format (default)
    -A, --sass     files are in .sass format
    -L, --less     files are in .less format
    -W, --webpack  configure project for WebPack bundler (default)
    -U, --gulp     configure project for Gulp task runner
    -R, --grunt    configure project for Grunt task runner (COMING SOON!!!)


## Changelog

    0.4.1 - Added link to documentation site.