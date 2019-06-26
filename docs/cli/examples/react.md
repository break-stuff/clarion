# Custom React Themes Using Clarion

React is a fantastically flexible framework that focuses on rendering complex views. This flexibility can make documentation a little difficult, so for this example I will be using the create-react-app command line scaffolding tool.

## Starting Your Project

Before you get started, make sure Clarion and create-react-app are installed:

```bash
npm install -g clarion create-react-app
```

After the install is finished, create your new project:

::: tip NOTE
You must use all lower-case letters in your new project name.
:::

```bash
create-react-app my-app
```

## Update Your Project for SASS

Install the SASS Compiler

```bash
npm install node-sass -D
```

## Adding Clarion
Adding Clarion to the project can be done in 5 easy steps:

1. In your command terminal, navigate to the root of the `/src` directory.
2. Initialize a new Clarion project by running the following command:

   ```bash
   clarion new
   ```
3. Select `Manual Configuration`
4. Select either `Styles Only` or `Architecture Only` - if you don't know the difference, check out the [documentation](/cli/documentation/new.html#styles-only/)
5. Select `SCSS`

## Add Styles to Project

Import the main manifest file into the main `/src/index.js` file.

```js
import '/scss/styles.scss';
```

## Conclusion

You should be able to use the Clarion CLI as you normally would. No additional configuration is necessary.