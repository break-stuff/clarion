# Get Started

CSS doesn't suck (or at least it doesn't have to)! The days of the monolithic styles.css page are gone! Use Clarion to help you and your teams build better projects that are easier to maintain, collaborate in and built for scale. The last thing you need to do is waste your time wrestling with styles that don't seem to cooperate.

### Maintainable and Scalable CSS

The Clarion CSS Architecture is designed so your CSS actually "cascades" and allows you to avoid sprinkling those pesky `!important` attributes throughout your code. Now you can avoid spending hours trying to figure out why your menu won't align properly.

### Easy Scaffolding

Creating new projects and making sure all of the necessary components are working properly can slow things WAY down. After you've done that, adding new files and maintaining references can get confusing and frustrating. Using the CLI, you can scaffold out projects and create new integrated style sheets with no additional work.

### Use Your Favorite Tools

Clarion makes it easy to use your favorite tools! Write your styles in `SASS`, `SCSS`, or `LESS`. Run your projects with your favorite task runners and bundlers like `Grunt`, `Gulp`, `WebPack`, or `Parcel`. the goal is to get you up and running as quickly as possible and help you create amazing things.

## Getting Started

::: tip NOTE
**_Make sure you have [Node.js and npm](https://nodejs.org/en/) installed._**
:::

```bash
npm install -g clarion  or  yarn global add clarion
clarion new ProjectName
cd ProjectName
npm run dev
```

### Your New Project

The project architecture implements the [Clarion CSS Architecture](/framework/documentation/architecture/).

## Adding a New File

Additional style files can easily be manged through the CLI as well. In your terminal type the following command:

`clarion add element headings`

This will create the file `_headings.scss` in the `03_Elements directory` as well as add `@import '_headings.scss';` import statement to the directory manifest file so it can be included in your final CSS file.

## Removing a File

Similar to adding a file, removing files can also be done through the CLI:

`clarion remove element headings`

This will remove the file `_headings.scss` in the `03_Elements` directory as well as remove `@import '_headings.scss';` import statement from the directory manifest file.

## Building Your Project

To build your application for final use, run the build command:

`npm run build`

The final compiled JavaScript and CSS file are in `dist` directory in the root of your project.