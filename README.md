# Clarion

A simple CLI for scaffolding front-end projects using the Clarion Style Architecture.

Check out the official Documentation here: [www.projectclarion.com](http://projectclarion.com)


## Installation

Install [Node.js](https://nodejs.org/en/), if you don't already have it installed.

In your terminal or command prompt type:

    npm install -g clarion


## Start a New Project
    clarion new MyProject

Your dependencies will automatically be installed!


## Run Your New Project
After your dependencies are installed you can run your project.

    cd MyProject
    npm run dev

## About Your New Project

The default project is configured with [SASS](http://sass-lang.com/) using the .scss syntax and [webpack](https://webpack.js.org/) as the compiler and module manager.

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
    |  |  |--02_Vendors/       # Style sheets provided by a third party such as themes or plug-ins
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

The final compiled JavaScript and CSS file are in build directory in the root of your project.

## Options

These are options you can run when initializing you project.

    -O, --only     generate the style architecture only (great for integrating into frameworks)
    -E, --empty    generate an empty project without any of the start-up files (COMING SOON!!!)
    -C, --scss     files are in .scss format (default)
    -A, --sass     files are in .sass format
    -L, --less     files are in .less format
    -W, --webpack  configure project for WebPack bundler (default)
    -P, --parcel   configure project for Parcel bundler
    -U, --gulp     configure project for Gulp task runner
    -R, --grunt    configure project for Grunt task runner


## Changelog

0.9.1 - Fixed Webpack build error.

0.9.0 - Refactored to use a better templating system and added unit tests.

0.8.7 - Updated documentation to include new site URL and install instructions.

0.8.6 - Temporarily removed "extract-text-webpack-plugin" as it is currently incompatible with Webpack v4.

0.8.5 - Updated Webpack project for changes in version 4.

0.8.4 - Added example for [Vue.js](http://projectclarion.com/examples/vuejs/).

0.8.1 - Added option for Parcel project creation.

0.7.1 - Added missing dependency for Gulp project.

0.7.0 - Revised dependency management so the latest packages are always installed, added Grunt, and added 'pixrem' to postcss.

0.6.1 - Fixed error in gulpfile.js.

0.6.0 - Modified add feature to find any directory name rather than only those in the Clarion Style Architecture.

0.5.1 - Added example for [ASP.Net](http://projectclarion.com/examples/aspnet/).

0.5.0 - Renamed 02_Themes to 02_Vendors.

0.4.4 - Added example for [Jekyll](http://projectclarion.com/examples/jekyll/).

0.4.3 - Added example for [React](http://projectclarion.com/examples/react/).

0.4.2 - Added example for [Angular](http://projectclarion.com/examples/angular/).

0.4.1 - Added link to documentation site.


