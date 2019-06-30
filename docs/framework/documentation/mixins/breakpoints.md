# Breakpoint Mixins

The term "breakpoints" is, unfortunately, an overloaded term in programming. In this context, they are often referred to as "media queries", but media queries actually do a lot more than specifying what styles to use ad specific screen widths. Because _these_ mixins focus on the specifying rules at various device sizes, they are referred to as "breakpoint mixins".

::: tip NOTE
For more information on the various types of media queries, check out this [MDN article](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries).
:::

## Breakpoint Mixin Overview

The breakpoint mixins provide a way for you create highly responsive designs while still writing modular and maintainable code. The mixins will pull the values based on the `$breakpoints` [variable](/framework/documentation/variables.html#breakpoints) in the `_variables.scss` file at the root of the `/00_Abstracts` directory.

There are three variations of the the breakpoint mixin:

```scss
// apply styles above a specified breakpoint
@include breakpoint-above(xl) {
    // your styles
}

// apply styles between two breakpoints
@include breakpoint-between(sm, lg) {
    // your styles
}

// apply styles below a specified breakpoint
@include breakpoint-below(xs) {
    // your styles
}
```

## Using Standard CSS

Using the breakpoint mixins is fairly straight forward, but is different than the way media queries are normally written in your `CSS`. A typical breakpoint would look something like this:

```css
.card {
    font-size: 1.25rem;
}

/*
 *
 * ... other css code ...
 *
 */

// at the bottom of the page
@media only screen and (max-width: 600px) {
    .card {
        font-size: 1rem;
    }
}

@media only screen and (max-width: 300px) {
    .card {
        font-size: 0.75rem;
    }
}
```

## Using the Breakpoint Mixins

This example is pretty simple, but as this code becomes more and more complex, you now need to manage code in multiple places across a style sheet that could be very large. Fortunately, using the code nesting features of preprocessors like `SASS` and `LESS`, this code can be greatly simplified.

```scss
.card {
    font-size: 1.25rem;

    @include breakpoint-below(md) {
        font-size: 1rem;
    }

    @include breakpoint-below(sm) {
        font-size: 0.75rem;
    }
}
```

By nesting our breakpoints in a single place, all of our code now becomes modular. We can now easily change the name our classes in a single place. We can also move or remove our code much more efficiently. Maintenance efficiency just shot up exponentially!