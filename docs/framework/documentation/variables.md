# Variables

Variables are one of the core pieces of your project. They help bring consistency and organization to your application. You can find your variables file at the root of the `00_Abstracts` directory. If you have values that you use regularly throughout our site or application, it is highly recommended that you add them here to maximize their reuse and minimize maintenance time.

## Fonts

There are 3 default font types set up to start out with (`$font-accent`, `$font-base`, and `$font-monospace`). This should usually be more than enough to get you started. If you feel like you need more font families in your project than this, feel free to add them, but do so carefully. Having all of those fancy fonts on your site may look nice, but they come at a cost (both technically and cognitively).

For performance reasons, the default values that have been set for these variables are system fonts. For further reading on this, check out Marcin Wichary's excellent [Smashing Magazine article](https://www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/).

## Font Types

| Type | Description |
|---|---|
| Accent | This is primarily used for things like headings or bloquotes. This should help those pieces of your design stand out from the rest of your content.
| Base | This is the default font for your site. If it is not text that should stand out more than other text, it should be using this font. This font should be simple and easy to read at both large and small font sizes. |
| Monospace	| If you are creating a tutorial site that has code snippets or special call-out text, this font is an excellent way to help highlight those parts of your application. |

## Font Sizes

The default font sizes are `xxs-xxl`. They also use `rem`'s for the unit of measure. This is to provide proper scaling when the user's browser default font size is increase or they zoom in.

```scss
$font-sizes: (
    xxs: 0.75rem,
    xs: 0.875rem,
    sm: 1rem,
    md: 1.25rem,
    lg: 1.5rem,
    xl: 2rem,
    xxl: 3rem
) !default;
```

For accessibility reasons, it is usally not a good idea to go below `16px` for your reagular font size, so the `xxs` and `xs` font sizes should be used sparingly. If you are setting up heading styles, may be happy to know that the `xs-xxl` match very nicely with the `h6-h1` tags, respectively.

## Line Height

The `$line-height-base` is a way to globally set the line-height (space between each line of text) property. For readability purposes, it has been defaulted to `1.5`. Mozilla (MDN) provides some excellent documentation on line-height and how to use it.

## Spacing

The spacing variables control the padding and margin values for your site. At first you may think that globally restricting these properties is extremely limiting, but it actually makes development so much simpler when you're not always pixel counting or doing math to get things to line up properly. It's also nice to know that because they are using `rem`'s for their units, it will scale with your other content as users zoom or adjust their font sizes.

```scss
$spacing-sizes: (
    auto: auto,
    0: 0,
    xxs: 0.125rem,
    xs: 0.25rem,
    sm: 0.5rem,
    md: 0.75rem,
    lg: 1rem,
    xl: 1.25rem,
    xxl: 2rem
) !default;
```

## Colors

Colors are easily one of the most complext things about your site. Trying to capture your brand and make sure it is well represented in your design, making sure that you are using the right colors to convey the right message (because colors have meaning), and making sure that your site is accessible to all users are just some of the considerations that need to be made when choosing colors. The list goes on and on. A lot rides on your color choices and how you use them. The tools provided by clarion should hopegully help with some of these concerns.

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

The `primary` and `secondary` colors should be reserved for your brand, but the rest are there for either communication purposed or content styling (borders, text, backgrounds, etc.).

## Breakpoints

These values are used to help you make your site responsive. Having consistency in these values will help proved a sense of stability in your site and simplify your development experience. If you are using a UI framework like Bootstrap or Foundation, it is a really good idea to replace the default values with their values.

```scss
$breakpoints: (
    xs: 480px,
    sm: 768px,
    md: 992px,
    lg: 1200px,
    xl: 1440px
) !default;
```

## Z-Indexes

This is usually on of the most obvious and yet most comical implementations to talk about. When asking developers how they handle z-indexes in their application, the most common answer is to set the value to `9999`. If that doesn't work, continue adding a 9 on the end until it does. Having a repeatable pattern and process for this should help remove this behavior as well as some of the unpredictability of your application. Another common pattern is, rather than using the values below, use the component that you are setting the z-index for (`tooltip`, `modal`, etc.).

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

These are pretty straigh forward. This is a way to keep your rounded corners consistent throughout your application.

```scss
$border-radiuses: (
    none: 0,
    sm: 0.25rem,
    md: 0.5rem,
    lg: 0.75rem,
    pill: 10rem,
    circle: 50%
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