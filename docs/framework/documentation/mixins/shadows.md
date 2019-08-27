# Shadows

The `shadow()` mixin is an easy way to get UI consistency with your box shadows throughout your application as well as clean up the development environment.

The mixins will pull the values based on the `$shadows` [variable](/framework/documentation/variables.html#shadows) in the `_variables.scss` file at the root of the `/00_Abstracts` directory.

::: tip NOTE
You may have already noticed, but the shadows _must_ be in quotes. Otherwise, the commas separating the shadow values confuse the SASS map.
:::

Shadows can play an important role in the various states of you UI elements. Take your button elements for example. They have a number ways they communicate their functionality to your users.

### Example:

```scss
.button {
    text-align: center;
    @include p(md); // add medium padding to the button

    &:hover {
        @include shadow(md);
    }

    &:disabled {
        background-color: color(light, lighter); // uses lighter variation of the light color in your palette
        color: text-color(light, lighter); // automatically selects accessible color for text based on background color
        @include shadow(inner);
    }

    &:focus {
        @include shadow(outline);
    }
}
```

## `!important`

Setting the `!important` property on your rules is as simple as adding another value to your your mixin - `shadow(lg, true)`.
