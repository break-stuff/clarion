# Color Functions

There are two main color functions we will be working with. The rest are variations. These functions are:

1. `color()`
2. `text-color()`

## `color()` Function

The `color()` function allows you to select a color from the `$theme-colors` variable that is set up in your `00_Abstracts/_variables.scss` directory. This will allow you to maximize your reuse as well as provide some other cool features like theme chaining and dynamically generating components like buttons.

### Example:

```scss
h1 {
    color: color(primary);
}

/*  or  */

.alert {
    .warning {
        border: solid 1px color(warning);
    }

    .danger {
        border: solid 1px color(danger);
    }
}
```

Now, using the `color()` function and passing in the color name is only the most basic feature available. By default, passing in the name of the color you want as the only parameter will get the color value that you specified in the `00_Abstracts/_variables` file. However, there are 3 possible parameters that can be passed into this function to produce different results: 

| Parameter | Value Type | Description | Default Value |
|---|---|---|---|
| name | string | name of the color specified in the `00_Abstracts/_variables` file (as seen in the example above) | primary |
| variant | string | selecting a variation of that color based on your color palette | base |
| opacity | number (between 0 and 1) | Adjusting this number between 0 and 1 will adjust the opacity of the color select. 0 is completely opaque and 1 is completely solid. | 1 |

## Variant

Behind the scenes, Clarion has constructed a color palette based on the colors you provided in your variable file. This is a huge time saver in terms of finding color variations as well as it keeps your code light and clean. Out of the box, the palette consists of 5 variations (`lighter`, `light`, `base`, `dark`, and `darker`).

Taking advantage of these variations is as simple as adding another value to your function:

```scss
.alert {
    &.warning {
        .header {
            background-color: color(warning, dark);
        }

        .body {
            background-color: color(warning, lighter);
        }
    }

    &.danger {
        .header {
            background-color: color(danger, darker);
        }

        .body {
            background-color: color(warning, light);
        }
    }
}
```

::: tip NOTE
When using the `base` color, you do not need to specify `color(primary, base)` as it is the default variation, so all you need to do is specify the color - `color(primary)`.
:::

Once you have updated the `$theme-colors` variable in the `_variables.scss` file, Clarion will automatically build out your color palette for you.

### Color Palette:

<color-palette />

## Opacity

The opacity parameter in the `color()` function controls the transparency of the color. The value _must_ be between `0` and `1` (the closer to 0 it is the more transparent it is). This can be specified for the base and variation colors.

### Example

```scss
.modal-background {
    background-color: color(dark, 0.75);

    .modal {
        .head {
            background-color: color(light, darker, 0.2);
        }
    }
}
```

## Color Variation

With Clarion you also have the ability to control the difference in the color variations. If you want your darks to be darker and your lights to be lighter (or _vice versa_), you can update the `$color-variation` variable in the `_variables.scss` file. The value _must be a percentage_. The default value is `8%`. Increasing the number will increase the difference in the variations and decreasing will do the opposite.

## `text-color()` Function

As users of the web and our applications become more and more diverse, inclusive design can be difficult and sometimes very daunting. The `text-color()` function helps find an appropriately contrasting color (`black`, or `white`) for your text based on a given background color. Simply pass the function color of the back (as you would with the `color()` function) and a contrasting color will be returned.

### Example:

```scss
blockquote {
    background-color: color(dark, lighter);
    color: text-color(dark, lighter); // returns white text
}

.button {
    .primary {
        background-color: color(primary);
        color: text-color(primary); // returns white text
    }
}
```

::: tip ACCESSIBILITY
The `text-color()` result should meet the [WCAG 2.0 AA](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) color contrast requirement. If you are finding this is not the case, please [contact me](/contact/).
:::

::: warning
Using these tools are intended to help your application more accessible and is not fool-proof. Make sure you are using tools to audit your application's accessibility like [Lighthouse](https://developers.google.com/web/tools/lighthouse/) and [Accessibility Insights](https://accessibilityinsights.io/).
:::

## Additional Functions

There are additional functions that run behind the scenes to make these two color functions work. We will not go into detail on what these do right now, but you should know what they are and what they do.

### Color Contrast

In the `_color-contrast.scss` are a number of functions that calculate the _luminance_ and _contrast ratios_ to get the contrasting colors for the `text-color()` function.

### Math

One downside to `SASS` is that its math functions are pretty basic. Unfortunately, there is no `POW` function to deal with exponents, so I had to write one to help calculate the color contrast.
