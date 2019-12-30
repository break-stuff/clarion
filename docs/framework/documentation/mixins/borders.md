# Border Mixins

The mixins will pull the values based on the border [variables](/framework/documentation/variables.html#borders) in the `_variables.scss` file at the root of the `/00_Abstracts` directory.

## Global Settings

There are two global settings that allow you to create consistency throughout your application as well as reduce the amount of typing you need to do to get borders set up.

1. `$border-style` - This is used to determine the style of the of your border - `solid`, `dashed`, etc.
2. `$border-size` - This will use values from the  `$spacing-sizes` [variable](/framework/documentation/variables.html#spacing). The default value for this is `3xs` or `0.0625rem` (`1px` if your base font size is set to `16px`).
3. `$border-color` - This will pull values from the `$theme-colors` [variable](/framework/documentation/variables.html#colors). The default value for this is set to `light`.

:::tip NOTE
The `$border-color` variable can also be set up with a variation and opacity like the other color features - ex: `light, darker, 0.75`.
:::

### Summary of Abbreviations

Abbreviation | Meaning
-- | --
border() | border - all sides
border-x() | border - left and right
border-y() | border - top and bottom
border-t() | border - top
border-l() | border - left
border-r() | border - right
border-b() | border - bottom

### Example

<div class="grid-wrap col-3">
    <div>
        <h4>border()</h4>
        <div style="width:100%; height:100px" class="shadow-xs border-3xs bg-white"></div>
    </div>
    <div>
        <h4>border-x()</h4>
        <div style="width:100%; height:100px" class="shadow-xs border-x-3xs bg-white"></div>
    </div>
    <div>
        <h4>border-y()</h4>
        <div style="width:100%; height:100px" class="shadow-xs border-y-3xs bg-white"></div>
    </div>
    <div>
        <h4>border-l()</h4>
        <div style="width:100%; height:100px" class="shadow-xs border-l-3xs bg-white"></div>
    </div>
    <div>
        <h4>border-r()</h4>
        <div style="width:100%; height:100px" class="shadow-xs border-r-3xs bg-white"></div>
    </div>
    <div>
        <h4>border-t()</h4>
        <div style="width:100%; height:100px" class="shadow-xs border-t-3xs bg-white"></div>
    </div>
    <div>
        <h4>border-b()</h4>
        <div style="width:100%; height:100px" class="shadow-xs border-b-3xs bg-white"></div>
    </div>
</div>

## Parameters

The mixin can accept additional parameters in order to override the default settings.

Name | Type | Default Value | Description
-- | -- | -- | --
style | string | `$border-style` | Determines the style of the borer - (`solid`, `dashed`, etc.)
size | string | `$border-size` | The width of the border - (`xs`, `sm`, `md`, etc.)
color | string | `$border-color` | The base color of the border - (`primary`, `dark`, `light`, etc.)
variant | string | `base` (if not defined in `$border-color`) | This variation of the border color - (`lighter`, `light`, `darker`, etc.)
opacity | decimal | `1` (if not defined in `$border-color`) | The opacity of the color - (a number between 0 and 1)
important | bool | false | determines whether or not the `!important` property is added to the css rule

### Example

<div class="grid-wrap col-3">
    <div>
        <h4>border(dashed, xxs)</h4>
        <div style="width:100%; height:100px" class="shadow-xs border-dashed bg-white"></div>
    </div>
    <div>
        <h4>border(dotted, xs)</h4>
        <div style="width:100%; height:100px" class="shadow-xs border-dotted bg-white"></div>
    </div>
    <div>
        <h4>border-l(solid, md, primary)</h4>
        <div style="width:100%; height:100px" class="shadow-xs border-l-primary bg-white"></div>
    </div>
</div>

## `!important`

The last parameter in this mixin is `$important` and defining all of the parameters just to make your style `!important` may seem a bit tedious - `border-l(solid, md, primary, base, 1, true)`. Don't worry! You can pass in a named parameter as a shortcut: `border(dashed, $important: true);`.

## Default Styles

You will probably not use this mixin as it is already implemented in the `border()` mixins, but there is a `default-border()` mixin that takes one parameter - the setting name. The default setting names are `style`, `size`, and `color`.
