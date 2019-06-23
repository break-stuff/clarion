# Custom Angular Themes Using Clarion

Clarion plays really well with Angular, especially if you are using Angular CLI. If you don't have it installed already, make sure you [install it now](https://cli.angular.io/).

## Starting Your Project

Before you get started, make sure Clarion and the Angular CLI are installed:

```bash
npm install -g clarion @angular/cli
```

By default, new projects that are created using the Angular CLI use `.css` as the style format. Fortunately, the Angular team has built in a way for you to also configure your project with `.scss`, `.sass`, or `.less` when you create a new project. To get started we will run the command to create a new project, but specify the style option:

```bash
ng new MyProject --style=scss
```

## Changing an Existing Project

If you have an existing project that uses the default .css format or would like to change from one format to another, you can do so by changing the Angular CLI configuration. If you already have an existing `.angular-cli.json` configuration file located at the root of your project, you can manually change the `styleExt` property of your choice. If you would like to play it safe, you can also use the Angular CLI to update your project:

```bash
ng set defaults.styleExt scss
```

You should now see the `.angular-cli.json.` Inside that file you should see, under the `defaults` property, the `styleExt` value set to `scss`.

If you already has styles written in another format, you will need to rewrite them in the new format. Angular will not convert them.

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

## Conclusion

You should be able to use the Clarion CLI as you normally would. No additional configuration is necessary.