# Adding the Clarion to an Existing Project

If you already have build pipeline for your front-end code, but want to take advantage of the Clarion Style Architecture or Framework, adding Clarion to your project is a cinch.

::: tip NOTE
If you don't have a build pipeline for your code, feel free to create an new project using the [Clarion CLI](/cli/documentation/new.html) and pull over what you would like.
:::

## Adding Clarion Using the CLI

1. In your terminal or command-line tool, navigate to the directory where you would like to add Clarion
2. Type `clarion new`
3. Select `Manual Configuration`
4. If you would like the Architecture and Style Framework select `Styles Only`, otherwise select `Architecture Only`
5. Select the format you would like your styles to be in (for this demo I will choose `SCSS`)

You should now see a new directory based on your style format (in this case called `/scss`).

## Adding You New Styles to your Build Pipeline

Different build tools handle preprocessors differently so make sure you consult the documentation on how to incorporate them into your build pipeline. If you are using a tool like webpack, incorporating them into your project may be as easy as adding importing the [main manifest](http://localhost:8080/framework/documentation/architecture.html#manifest-files) to your main script file (some [additional set up](https://webpack.js.org/loaders/sass-loader/) may be required).

If you are using a framework like [Vue.js](https://vue-loader.vuejs.org/guide/pre-processors.html) or [React](https://facebook.github.io/create-react-app/docs/adding-a-sass-stylesheet), they have made it very simple to add a your styles to the project pipeline. Again, consult the documentation for additional information and support.

## Configuring Your Project for the Clarion CLI

::: tip NOTE
If you added the new directory to the 
If you have added your new styles to a directory other than the `/src` directory, you will need to set up a configuration file so the CLI knows where to add new files.
:::
