# Font Sizes Mixins

By establishing a set of predefined font sizes can really do a lot to speed up development time and smooth out the user experience.

The mixins will pull the values based on the `$font-sizes` [variable](/framework/documentation/variables.html#font-sizes) in the `_variables.scss` file at the root of the `/00_Abstracts` directory.

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
