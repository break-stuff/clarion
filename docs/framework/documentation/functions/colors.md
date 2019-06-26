# Color Functions

There are two main color functions we will be working with. The rest are variations. These functions are:

1. `color()`
2. `text-color()`


## Color Function

The `color()` function allows you to select a color from the `$theme-colors` variable that is set up in your `00_Abstracts/_variables.scss` directory. This will allow you to maximize your reuse as well as provide some other cool features like theme chaining and dynamically generating components like buttons.

Example:
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