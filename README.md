# Clarion

<p align="center">
    <a href="https://projectclarion.com/"><img src="https://projectclarion.com/images/clarion_default_image.png" alt="product clarion logo" style="width: 100%; max-width: 500px;" /></a>
</p>

## A CSS and Design System Framework for well crafted applications.

_Check out the official Documentation here: [projectclarion.com](http://projectclarion.com)_

## Installation

Install [Node.js](https://nodejs.org/), if you don't already have it installed.

In your terminal or command prompt type:

```bash
npm install -g clarion
- or -
yarn global add clarion
```

## Start a New Project

```bash
clarion new
```

Answer a few questions about you would like to configure your project and it will be scaffolded out for you.

Your dependencies will also automatically be installed!

## Run Your New Project

After your dependencies are installed you can run your project.

```bash
cd ProjectName
npm run dev
```

## About Your New Project

The default project is configured with [SASS](http://sass-lang.com/) using the `.scss` syntax and [webpack](https://webpack.js.org/) as the compiler and module manager.

The project architecture implements the Clarion Style Architecture.

```bash
MyProject/
|
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
```

## Adding a New File

Additional style files can easily be manged through the CLI as well.

### Usage

```bash
clarion add <directory> <file name>
```

#### Example

```bash
clarion add element headings
```

This will create the file _headings.scss in the 03_Elements directory as well as add "@import '_headings.scss'" import statement to the directory manifest file so it can be included in your final CSS file.

## Removing a File

Similar to adding a file, removing files can also be done through the CLI.

### Usage

```bash
clarion remove <directory> <file name>
```

#### Example

```bash
clarion remove element headings
```

This will remove the file _headings.scss in the 03_Elements directory as well as remove "@import '_headings.scss'" import statement from the directory manifest file.

## Building Your Project

To build your application for final use, run the build command.

```bash
npm run build
```

The final compiled JavaScript and CSS file are in build directory in the root of your project.

## Options

These are options you can run when initializing you project.

## Project Content

| Option | Description |
| --- | --- |
| Starter Project | generate  the style architecture, the style framework, as well as any task runners/bundlers and optimizers needed to begin developing a web application.
| Styles Only  |  generate the style architecture only (great for integrating into frameworks) |
| Architecture Only  |  generate a the style architecture without any of the start-up files |

## Style Format

| Option | Description |
| --- | --- |
| [SCSS](https://sass-lang.com/)  |   files are in .scss format |
| [SASS](https://sass-lang.com/)  |   files are in .sass format |
| [LESS](http://lesscss.org/)  |   files are in .less format |

## Task Runners and Bundlers

| Option | Description |
| --- | --- |
| [Webpack](https://webpack.js.org/) | configure project for WebPack bundler |
| [Parcel](https://parceljs.org/)  | configure project for Parcel bundler |
| [Gulp](https://gulpjs.com/)   |  configure project for Gulp task runner |
| [Grunt](https://gruntjs.com/)  |  configure project for Grunt task runner |

## Changelog

3.7.1 - Fixed bug in `Pow` function for some bundlers/task runners for decimals.

3.7.0 - Added [display mixins](https://projectclarion.com/framework/documentation/mixins/display.html) - `full-width`, `full-height`, `full-screen`, and `screen-reader-only`

3.6.0 - Added `important` parameter on mixins

3.5.1 - Updated spacing variable to be more inline with naming convention

3.5.0 - Add [border mixin](https://projectclarion.com/framework/documentation/mixins/border.html)

3.4.0 - Fix [padding and margin mixin](https://projectclarion.com/framework/documentation/mixins/spacing.html) parameter order

3.4.0 - Fix [directory creation](https://projectclarion.com/cli/documentation/add.html#adding-directories) logic

3.2.2 - Fix CleanWebpackPlugin error for WebPack projects.

3.2.1 - Fix color functions to handle "black" and "white" values

3.2.0 - Streamlined new project setup.

3.1.0 - Updated variables, added new color contrast logic, and fixed SASS file references.

3.0.2 - Fixed file reference error in SCSS.

3.0.1 - Added additional border radius mixins and fixed some error messages.

3.0.0 - Added style framework for SASS and SCSS.

2.1.0 - Added a default configuration option and some bug fixes.

2.0.1 - Updated documentation.

2.0.0 - Added new CLI interface.

1.1.2 - Fixed hot reloading for Webpack.

1.1.1 - Added ability to add new Directories [via the CLI](https://projectclarion.com/documentation/architecture/).

1.0.3 - Replaced failing 'extract-text-webpack-plugin' with 'mini-css-extract-plugin' for Webpack 4.

1.0.1 - Fixed an type-o in the Grunt project.

1.0.0 - Final testing and added documentation via markdown files in each directory.

0.9.2 - Fixed bugs in SASS projects.

0.9.1 - Fixed Webpack build error.

0.9.0 - Refactored to use a better templating system and added unit tests.

0.8.7 - Updated documentation to include new site URL and install instructions.

0.8.6 - Temporarily removed "extract-text-webpack-plugin" as it is currently incompatible with Webpack v4.

0.8.5 - Updated Webpack project for changes in version 4.

0.8.1 - Added option for Parcel project creation.

0.7.1 - Added missing dependency for Gulp project.

0.7.0 - Revised dependency management so the latest packages are always installed, added Grunt, and added 'pixrem' to postcss.

0.6.1 - Fixed error in gulpfile.js.

0.6.0 - Modified add feature to find any directory name rather than only those in the Clarion Style Architecture.

0.5.0 - Renamed 02_Themes to 02_Vendors.

0.4.1 - Added link to documentation site.
