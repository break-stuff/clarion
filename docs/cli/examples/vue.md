# Custom Vue.js Themes Using Clarion

Vue.js is a powerful JavaScript framework for building advanced user interfaces. From the Vue.js documentation:

> Vue (pronounced /vjuː/, like view) is a progressive framework for building user interfaces. Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable. The core library is focused on the view layer only, and is easy to pick up and integrate with other libraries or existing projects. On the other hand, Vue is also perfectly capable of powering sophisticated Single-Page Applications when used in combination with modern tooling and supporting libraries.

## Starting Your Project

Before you get started, make sure Clarion and the Vue CLI are installed:

```bash
npm install -g clarion vue-cli
```

After the install is finished, create your new project by running the following commands (make sure you indicate you would like to use SASS if you want to use SASS or SCSS):

```bash
vue init webpack-simple my-project
cd my-project
npm install
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
