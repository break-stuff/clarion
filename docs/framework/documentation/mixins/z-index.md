# Z-Index Mixin

The default behavior for most developers is to set the `z-index` to `99999` so that whatever `<div>` you're working on will be on top. If that doesn't work, continue to add a `9` to the end until you get the desired result. _(Please, don't do that!)_ Instead of "hacking" your way to a horrible developer experience, used predefined, meaningful `z-indexes`.

## Setup

This mixin will pull the values based on the `$z-indexes` [variable](/framework/documentation/variables.html#z-indexes) in the `_variables.scss` file at the root of the `/00_Abstracts` directory.

## Usage

Using the mixin is fairly straight forward:

```scss
.modal {
    @include z-index(xl);
}
```

Which will result in:

```css
.modal {
    z-index: 500;
}
```
