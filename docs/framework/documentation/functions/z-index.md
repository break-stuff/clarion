# Z-Index Functions

## Set Up

The `z()` function is about as straight forward as they come, but will be immensely helpful in keeping your sanity intact. The function will pull the values based on the `$z-indexes` [variable](/framework/documentation/variables.html#z-indexes) in the `_variables.scss` file at the root of the `/00_Abstracts` directory.  

### Example

```scss
.modal {
    z-index: z(xl);
}

.tooltip {
    z-index: z(xs);
}

.toast {
    z-index: z(md);
}

.very-important-message {
    z-index: z(trump);
}
```
::: tip NOTE
Another common pattern is, rather than using the default values, use the component name that you are setting the z-index for (`tooltip`, `modal`, etc.). This could be very useful, but be careful, as it could also result in a lot of unnecessary values.
:::
