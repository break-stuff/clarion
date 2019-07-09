# Spacing  Mixins

The spacing mixins are some of the most handy in this framework. They can make managing layouts and aligning contents so much simpler. These mixins relate to _margins_ and _padding_, but additional uses can be made with the [spacing function](/framework/documentation/functions/spacing.html).

::: tip NOTE
At first glance, these may seem to be a little unconventionally named and you may be inspired to rename them (which you can). _However_, these are designed for a faster developer experience and once you become familiar with them, you may appreciate the naming convention.
:::

The mixins will pull the values based on the `$spacing-sizes` [variable](/framework/documentation/variables.html#spacing) in the `_variables.scss` file at the root of the `/00_Abstracts` directory.

## Padding

The available padding mixins are a s follows:

- `p()`  - padding for all four sides of element
- `pt()` - padding-top
- `pl()` - padding-left
- `pr()` - padding-right
- `px()` - padding-left and padding-right
- `py()` - padding-top and padding-bottom

## Margin

The available margin mixins are a s follows:

- `m()`  - margin for all four sides of element
- `mt()` - margin-top
- `ml()` - margin-left
- `mr()` - margin-right
- `mx()` - margin-left and margin-right
- `my()` - margin-top and margin-bottom

## Example

```scss
.card {
    @include p(lg);

    .card-header {
        @include mb(md);
    }

    .card-body {
        @include mb(md);
    }

    .card-footer {
        .button {
            @include px(lg);
            @include py(sm);
        }
    }
}
```
