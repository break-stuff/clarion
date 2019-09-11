# Getting Started

CSS doesn't suck (_or at least it doesn't have to_)! The days of the monolithic `styles.css` page are gone! Use Clarion to help you and your teams build better projects that are easier to maintain, collaborate in, and built for scale. The last thing you need to do is waste your time wrestling with styles that don't seem to cooperate.

## Create Your Project

::: tip NOTE
**_Make sure you have [Node.js and npm](https://nodejs.org/en/) installed._**
:::

```bash
npm install -g clarion  
# or  
yarn global add clarion

clarion new
# answer a few questions about your project
cd <project-name>
npm run dev
```

::: warning NOTE
The Style Framework is not currently available for `LESS`. However, the CLI and Style Architecture are fully supported.
:::

## Your New Project

The default project is configured with [SASS](http://sass-lang.com/) using the `.scss` syntax and [webpack](https://webpack.js.org/) as the compiler and module manager.

The project implements the Clarion Style Architecture.

```bash
ProjectName/
|
|--dist/
|
|--src/
|  |--sass/
|  |  |--00_Abstracts/       # Variables, Functions, Mixins, and Placeholders
|  |  |  |--mixins           # Reusable styles
|  |  |  |--functions        # Calculated style values
|  |  |  |--_variables.scss  # Style Architecture Variables
|  |  |  |--index.scss       # Directory Manifest File
|  |  |
|  |  |--01_Base/            # Resets/Normalize, Typography Rules, Etc.
|  |  |  |--index.scss       # Directory Manifest File
|  |  |
|  |  |--02_Vendors/         # Style sheets provided by a third party such as themes or plug-ins
|  |  |  |--index.scss       # Directory Manifest File
|  |  |
|  |  |--03_Elements/        # Styles for HTML tags, such as a form label, an input or a button
|  |  |  |--index.scss       # Directory Manifest File
|  |  |
|  |  |--04_Components/      # Cards, Carousels, and Navbars
|  |  |  |--index.scss       # Directory Manifest File
|  |  |  
|  |  |--05_Layouts/         # Grid System, Header, Footer, and Sidebars
|  |  |  |--index.scss       # Directory Manifest File
|  |  |
|  |  |--06_Pages/           # Page specific styles
|  |  |  |--index.scss       # Directory Manifest File
|  |  |
|  |  |--07_Utilities/       # Utilities and Helper Classes
|  |  |  |--index.scss       # Directory Manifest File
|  |  |
|  |  |--styles.scss/        # Main Manifest
|  |
|  |--scripts/
|     |--components/         # Component-Specific Scripts
|     |--services/           # Reusable Functionality
|     |--main.js             # The Main Manifest that ties the project together
|
|--index.html
|--package.json
|--postcss.config.js
|--webpack.config.js
```

::: tip NOTE
To find out more about the Clarion Style Architecture check out our official [documentation](/framework/documentation/architecture.html).
:::

## Adding a New File

Additional style files can easily be managed through the CLI as well. In your terminal type the following command:

```bash
clarion add element headings
```

This will create the file `_headings.scss` in the `03_Elements directory` as well as add `@import '_headings.scss';` import statement to the directory manifest file so it can be included in your final CSS file.

## Removing a File

Similar to adding a file, removing files can also be done through the CLI:

```bash
clarion remove element headings
```

This will remove the file `_headings.scss` in the `03_Elements` directory as well as remove `@import '_headings.scss';` import statement from the directory manifest file.

## Building Your Project

To build your application for final use, run the build command:

```bash
npm run build
```

The final compiled `scripts.js` and `styles.css` files are in `dist` directory in the root of your project.

Find out more at <https://projectclarion.com!>
