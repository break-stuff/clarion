# Spacing Functions

The `spacing()` function is fairly basic, but help ensure consistency in your UI. The function will pull the values based on the `$spacing-sizes` [variable](/framework/documentation/variables.html#spacing) in the `_variables.scss` file at the root of the `/00_Abstracts` directory.

## Application

You are most likely to get the most milage out of this function using the [spacing mixins](/framework/documentation/mixins/spacing.html), but you are still able to use the function to access the values for additional functions or directly in your style sheets.

### Example

Here is an example of using the `spacing()` function along with the [`color()` function](/framework/documentation/functions/colors.html#color-function).

```scss
.alert {
    border-left: solid color(primary) spacing(sm);
}
```

The function can also take negative values.

```scss
.negative-margin {
    margin-left: spacing(-sm);
}
```

::: tip NOTE
While there may be a need to call the spacing function directly, in general, for _margin_ and _padding_, it is better to use the [spacing mixins](/framework/documentation/mixins/spacing.html).
:::
