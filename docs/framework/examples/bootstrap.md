# Creating Bootstrap Themes Using Clarion

Bootstrap is the most popular the world's most popular front-end component library. It provides you with an incredible responsive grid system, extensive prebuilt components, and powerful plugins built on jQuery. Creating sites with is is fast and easy. Combining it with the Clarion Style Architecture will make customizing your site scalable and easy to maintain.

To get started, install Bootstrap (we will be using version 4 for this example):

```bash
npm install bootstrap --save
```

## Adding Bootstrap to Your Project

Create a Bootstrap file in the 02_Vendors section of your styles.

```bash
clarion add vendor bootstrap
```

In the new `_bootstrap.scss` file, feel free to import the styles you need from the framework. If you would like all of them, just add the following import statement to the file.

```scss
@import "~bootstrap/scss/bootstrap";
```

Now, any styles that are added will override the default Bootstrap styles so you can easily customize the library to fit your needs.

## Customize Bootstrap

One of the great things about Bootstrap 4 is that all of the variables used in their SASS files use the !default attribute. This means that if you set a value to a variable with the same name Bootstrap will automatically take your value over the value defined in the framework. Now customizing things like colors is incredibly easy!

For example, the variables for colors in Bootstrap 4 look like this:

```scss
$blue:    #007bff !default;
$indigo:  #6610f2 !default;
$purple:  #6f42c1 !default;
$pink:    #e83e8c !default;
$red:     #dc3545 !default;
$orange:  #fd7e14 !default;
$yellow:  #ffc107 !default;
$green:   #28a745 !default;
$teal:    #20c997 !default;
$cyan:    #17a2b8 !default;
    
$theme-colors: (
  primary: $blue,
  secondary: $gray-600,
  success: $green,
  info: $cyan,
  warning: $yellow,
  danger: $red,
  light: $gray-100,
  dark: $gray-800
) !default;
```

If you are using the style framework, you can update the existing `$theme-colors` variable with your desired colors and the entire framework will now adopt your new color scheme.

If you are not using the style framework, you can still easily achieve this by creating a colors file in your Abstracts directory (`clarion add abstract colors`), pasting in this code, and changing the color values (make sure you remove the `!default` attribute in your code).

The Bootstrap team has done a great job making the framework customizable and values that can be overridden can be found in the `/scss/_variables.scss` file in the [Bootstrap project](https://github.com/twbs/bootstrap/blob/master/scss/_variables.scss);

## Bootstrap's SASS Mixins and Functions

You can also inject Bootstrap's SASS mixins and functions by adding a reference to them in to your `00_Abstracts` directory (either explicitly in their own file or directly in the manifest file). This will give you access to that functionality throughout your project.

For example, of you wanted to leverage Bootstrap's mixin for media queries, you could add a reference to that SCSS file (`@import '~/bootstrap/scss/mixins/breakpoints'`) and begin using the `media-breakpoint-down()`, `media-breakpoint-between()`, and `media-breakpoint-only()` anywhere in your SCSS project.

## Conclusion

The new Bootstrap 4 framework is incredible flexible and Clarion allows you to take advantage in a way that helps you stay organized and with minimal effort.
