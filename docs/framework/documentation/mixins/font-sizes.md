# Font Sizes Mixins

By establishing a set of predefined font sizes can really do a lot to speed up development time and smooth out the user experience.

The mixins will pull the values based on the `$font-sizes` [variable](/framework/documentation/variables.html#font-sizes) in the `_variables.scss` file at the root of the `/00_Abstracts` directory.

::: tip NOTE
For accessibility reasons, it is a good idea to keep your base font size at least `16px`. If you are using the default `$font-sizes` variables values, the `xs` and `xxs` font sizes should be used sparingly.
:::

## Example

Here is an example of how you can use the mixin to build out your application's headings:

```scss
h1 {
    @include font-size(xxl);
}

h2 { 
    @include font-size(xl);
}

h3 {
    @include font-size(lg);
}

h4 {
    @include font-size(md);
}

h5 {
    @include font-size(sm);
}

h6 {
    @include font-size(xs);
}
```

## `!important`

Setting the `!important` property on your rules is as simple as adding another value to your your mixin - `font-size(lg, true)`.
