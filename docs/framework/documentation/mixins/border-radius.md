# Border Radius Mixins

The mixins will pull the values based on the `$border-radiuses` [variable](/framework/documentation/variables.html#border-radiuses) in the `_variables.scss` file at the root of the `/00_Abstracts` directory.

The mixins use an abbreviation syntax that is designed for developer efficiency. If you find that they are not to you're liking, you are always free to change them to something that works better for you, but before you do, give them a chance. You may like them.

Abbreviation | Meaning
-- | --
radius(lg) | border radius - all corners (large)
radius-t(lg) | border radius - top (large)
radius-tl(lg) | border radius - top left (large)
radius-tr(lg) | border radius - top right (large)
radius-b(lg) | border radius - bottom (large)
radius-bl(lg) | border radius - bottom left (large)
radius-br(lg) | border radius - bottom right (large)
radius(pill) | border radius (pill)
radius(circle) | border radius (circle)

## Example:

<border-radius-grid />

::: tip NOTE
For `circle` and `pill`, as the aspect ratios change for the object you are adding border radiuses to, you may get different results than you expected. 

See how the two compare when they are be added to a _square_ rather than a _rectangle_:

<div class="grid-wrap col-3">
    <rectangle title="radius(pill)"
                height="100"
                width="100"
                rectangle-class="radius-pill" />
    <rectangle title="radius(pill)"
                height="100"
                width="200"
                rectangle-class="radius-pill" />
</div>
<div class="grid-wrap col-3">
    <rectangle title="radius(circle)"
                height="100"
                width="100"
                rectangle-class="radius-circle" />
    <rectangle title="radius(circle)"
                height="100"
                width="200"
                rectangle-class="radius-circle" />
</div>
:::
