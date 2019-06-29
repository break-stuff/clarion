# Z-Index Functions

The default behavior for most developers is to set the `z-index` to `99999` so that whatever `<div>` your're working on will be on top. If that doesn't work, continue to add a `9` to the end until you get the desired result. _(Please, don't do that!)_ Instead of "hacking" your way to a horrible developer experience, used predefined, meaningful `z-indexes`.

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
