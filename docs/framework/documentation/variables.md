# Variables

Variables (sometimes called _design tokens_) are one of the core pieces of your project. They help bring consistency and organization to your application. You can find your variables file at the root of the `00_Abstracts` directory. If you have values that you use regularly throughout our site or application, it is highly recommended that you add them here to maximize their reuse and minimize maintenance time.

## Containers

There is currently only 1 container variable and it is `$content-width`. This is the max-width of the main content of your pages. The default value is set to `600px` for optimal readability for pages with a lot of text (documentation sites, blogs, etc.), but feel free to tweak this to suit your needs.

## Fonts

There are 3 default font types set up to start out with (`accent`, `base`, and `monospace`). This should usually be more than enough for a website or application. If you feel like you need more font families in your project than this, feel free to add them, but do so carefully. Having all of those fancy fonts on your site may look nice, but they come at a cost (both for performance and usability).

For performance reasons, the default values that have been set for these variables are system fonts. For further reading on this, check out Marcin Wichary's excellent [Smashing Magazine article](https://www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/).

For more information on how to use your fonts, check out the documentation on the [font mixin](/framework/documentation/mixins/font.html).

## Font Families

| Type | Description |
|---|---|
| Accent | This is primarily used for things like headings or blockquotes. This should help those pieces of your design stand out from the rest of your content.
| Base | This is the default font for your site. If it is not text that should stand out more than other text, it should be using this font. This font should be simple and easy to read at both large and small font sizes. |
| Monospace | If you are creating a tutorial site that has code snippets or special call-out text, this font is an excellent way to help highlight those parts of your application. |

```scss
$fonts: (
    accent: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, Noto Sans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    base: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, Noto Sans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    monospace: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
) !default;
```

## Font Sizes

The default font sizes are `xxs-xxl`. They also use `rem`'s for the unit of measure. This is to provide proper scaling when the user's browser default font size is increased or they zoom in and out or adjust their default font size.

```scss
$font-sizes: (
    xxs: 0.75rem, // 12px
    xs: 0.875rem, // 14px
    sm: 1rem,     // 16px
    md: 1.25rem,  // 30px
    lg: 1.5rem,   // 24px
    xl: 2rem,     // 32px
    xxl: 3rem     // 48px
) !default;
```

For accessibility reasons, it is usually not a good idea to go below `16px` for your regular font size, so the `xxs` and `xs` font sizes should be used sparingly. If you are setting up heading styles, you may be happy to know that the `xs-xxl` match very nicely with the `h6-h1` tags, respectively.

## Line Height

The `$line-height-base` is a way to globally set the line-height (space between each line of text) property. For readability purposes, it has been defaulted to `1.5`. Mozilla (MDN) provides some excellent documentation on [line-height and how to use it](https://developer.mozilla.org/en-US/docs/Web/CSS/line-height).

## Spacing

The spacing variables control things like padding and margins for your site. At first you may think that globally restricting these properties is extremely limiting, but it actually makes development so much simpler when you're not always pixel counting or doing math to get things to line up properly. It's also nice to know that because they are using `rem`'s for their units, it will scale with your other content as users zoom or adjust their font sizes.

```scss
$spacing-sizes: (
    auto: auto,
    none: 0,
    3xs: 0.0625rem, // 1px
    xxs: 0.125rem,  // 2px
    xs: 0.25rem,    // 4px
    sm: 0.5rem,     // 8px
    md: 0.75rem,    // 12px
    lg: 1rem,       // 16px
    xl: 1.25rem,    // 20px
    xxl: 2rem       // 32px
) !default;
```

## Colors

Colors are easily one of the most complex things about your site. Trying to capture your brand and make sure it is well represented in your design, making sure that you are using the right colors to convey the right message (because colors have meaning), and making sure that your site is accessible to all users are just some of the considerations that need to be made when choosing colors. The list goes on and on. A lot rides on your color choices and how you use them. Clarion's color tools should help with some of these concerns.

The default colors that have been chosen are just a basic pallet, but should be a good starting place.

```scss
$theme-colors: (
    'primary': #d15f01,
    'secondary': #30629e,
    'success': #76b524,
    'info': #8ebede,
    'warning': #ffc107,
    'danger': #ff0000,
    'light': #c7c7c7,
    'dark': #494949
) !default;
```

The `primary` and `secondary` colors should be reserved for your brand, but the rest are there for either communication purposes or content styling (borders, text, backgrounds, etc.).

## Breakpoints

These values are used to help you make your site responsive. Having consistency in these values will help provide a sense of stability in your site and simplify your development experience. If you are using a UI framework like Bootstrap or Foundation, it is a really good idea to replace the default values with their values to add consistency and predictability to your application.

```scss
$breakpoints: (
    xxs: 20rem,  // 320px
    xs: 30rem,   // 480px
    sm: 48rem,   // 768px
    md: 62rem,   // 992px
    lg: 75rem,   // 1200px
    xl: 90rem    // 1440px
) !default;
```

## Z-Indexes

This is usually on of the most obvious and yet most comical implementations to talk about. When asking developers how they handle z-indexes in their application, the most common answer is to set the value to `9999`. If that doesn't work, continue adding a 9 on the end until it does. Having a repeatable pattern and process for this should help remove this behavior as well as some of the unpredictability of your application.

To take advantage of these values there is a [z-index function](/framework/documentation/functions/z-index.html), but more importantly [z-index mixin](/framework/documentation/mixins/z-index.html). You will probably use the mixin more than the function.

```scss
$z-indexes: (
    sub: -1,
    none: 0,
    xxs: 1,
    xs: 10,
    sm: 50,
    md: 100,
    lg: 200,
    xl: 500,
    trump: 99999
) !default;
```

## Border Radiuses

These are pretty straight forward. This is a way to keep your rounded corners consistent throughout your application.

```scss
$border-radiuses: (
    none: 0,
    sm: 0.25rem, // 4px
    md: 0.5rem,  // 8px
    lg: 0.75rem, // 12px
    pill: 10rem, // 160px
    circle: 50%
) !default;
```

## Borders

The border variables are a little unique from the other variables in that they use values from other variables. For example, the `$border-size` uses values from the [`$spacing-sizes`](#spacing) variable and the `$border-color` variable uses values from the [`$theme-colors`](#colors) variable. It is important to remember that when changing these default values, or you may have unexpected results.

It is not very likely that you will use these values regularly since they are already implemented in the [borders mixin](/framework/documentation/mixins/borders.html), but there is a [default border mixin](/framework/documentation/mixins/borders.html#default-border) available to use get these values.

```scss
$border: (
    style: solid,
    size: 3xs,    // from $spacing-sizes
    color: light lighter
) !default;
```

## Shadows

Shadows can add very attractive depth and interaction to your design. Keeping them consistent from one component to another can be a little frustrating. They can also create a great deal of clutter in your code. Abstracting them into a reusable place and using them with the `shadow()` mixin will keep your UI consistent and your code clean.

```scss
$shadows: (
    none: none,
    inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
    outline: "0 0 0 3px rgba(0, 0, 0, 0.5)",
    xs: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    sm: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    md: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    lg: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    xl: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
) !default;
```

## Transitions

This set of values is where you can keep track of your transition speeds for your application. Having consistent transitions throughout you application can really give it a polished look and feel.

```scss
$transitions: (
    slow: .5s,
    med: .3s,
    fast: .1s
) !default;
```