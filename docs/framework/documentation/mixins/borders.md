# Borders Mixins

The mixins will pull the values based on the border [variables](/framework/documentation/variables.html#borders) in the `_variables.scss` file at the root of the `/00_Abstracts` directory.

## Global Settings

There are two global settings that allow you to create consistency throughout your application as well as reduce the amount of typing you need to do to get borders set up.

1. `$border-style` - This is used to determine the style of the of your border - `solid`, `dashed`, etc.
2. `$border-size` - This will use values from the  `$spacing-sizes` [variable](/framework/documentation/variables.html#spacing). The default value for this is `1` or `0.0625rem` (`1px` if your base font size is set to `16px`).
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


### Example:

<div class="grid-wrap col-3">
    <div>
        <h4>border()</h4>
        <div style="width:100%; height:100px" class="shadow-xs border-1 bg-white"></div>
    </div>
    <div>
        <h4>border-x()</h4>
        <div style="width:100%; height:100px" class="shadow-xs border-x-1 bg-white"></div>
    </div>
    <div>
        <h4>border-y()</h4>
        <div style="width:100%; height:100px" class="shadow-xs border-y-1 bg-white"></div>
    </div>
    <div>
        <h4>border-l()</h4>
        <div style="width:100%; height:100px" class="shadow-xs border-l-1 bg-white"></div>
    </div>
    <div>
        <h4>border-r()</h4>
        <div style="width:100%; height:100px" class="shadow-xs border-r-1 bg-white"></div>
    </div>
    <div>
        <h4>border-t()</h4>
        <div style="width:100%; height:100px" class="shadow-xs border-t-1 bg-white"></div>
    </div>
    <div>
        <h4>border-b()</h4>
        <div style="width:100%; height:100px" class="shadow-xs border-b-1 bg-white"></div>
    </div>
</div>

## Parameters

The mixin can accept additional parameters in order to override the default settings.

Parameter | Default Value | Summary
-- | -- | --
style | `$border-style` | Determines the style of the borer - `solid`, `dashed`, etc.
size | `$border-size` | The width of the border
color | `$border-color` | The base color of the border
variant | `$border-color` | The variation of the base color
opacity | `$border-color` | The opacity of the color

### Example :

<div class="grid-wrap col-3">
    <div>
        <h4>border(dashed, xs)</h4>
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
