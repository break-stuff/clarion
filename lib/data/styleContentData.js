"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.styleContent = [
    {
        format: "scss",
        styles: [
            {
                file: '00_Abstracts/_variables.scss',
                content: `//   FONTS

$font-family-sans-serif: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, Noto Sans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" !default;
$font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !default;
$font-family-base: $font-family-sans-serif !default;

$font-size-base: 16px;
$font-sizes: (
    xxs: 0.75rem,
    xs: 0.875rem,
    sm: 1rem,
    md: 1.25rem,
    lg: 1.5rem,
    xl: 2rem,
    xxl: 3rem
) !default;

$line-height-base: 1.5;

// SPACING

$spacing-sizes: (
    auto: auto,
    0: 0,
    xxs: 0.125rem,
    xs: 0.25rem,
    sm: 0.5rem,
    md: 0.75rem,
    lg: 1rem,
    xl: 1.25rem,
    xxl: 2rem
) !default;


// COLORS

$theme-colors: (
    'primary': #ca4800,
    'secondary': #0971b2,
    'default': #6c757d,
    'success': #6f943e,
    'info': #4f9acc,
    'warning': #ffc107,
    'danger': #ff0000,
    'light': #f8f9fa,
    'dark': #343a40,
    'black': #000,
    'white': #fff
) !default;

$color-variation: 8%;


// BREAKPOINTS

$breakpoints: (
    xs: 480px,
    sm: 768px,
    md: 992px,
    lg: 1200px,
    xl: 1440px
) !default;


// Z-INDEX

$z-indexes: (
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal-backdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070
) !default;


// BORDERS

$border-radiuses: (
    none: 0,
    sm: 0.25rem,
    md: 0.5rem,
    lg: 0.75rem,
    pill: 10rem,
    circle: 50%
) !default;


//  TRANSITIONS

$transitions: (
    slow: .5s,
    med: .3s,
    fast: .1s
) !default;
`
            },
            {
                file: '00_Abstracts/functions/_colors.scss',
                content: `@import '../variables';

@function build-pallet() {
    $result: ();

    @each $key,
    $value in $theme-colors {
        $group: ($key: ('base': $value,
            'light': lighten($value, $color-variation),
            'lighter': lighten($value, $color-variation * 2),
            'dark': darken($value, $color-variation),
            'darker': darken($value, $color-variation * 2)));

        $result: map-merge($result, $group);
    }

    @return $result;
}

$color-pallette: build-pallet();

/*
    GET COLOR

    usage:
        // for the base color
        color(primary);

        // for variations of a color
        color(primary, lighter);
        color(primary, light);
        color(primary, dark);
        color(primary, darker);
*/
@function color($name: 'primary', $variant: 'base', $opacity: 1) {
    $color: null;

    // Get the color name
    $color-name: map-get($color-pallette, $name + unquote(""));

    // Get the color variant
    @if $color-name {
        $color: map-get($color-name, $variant);

        @if $color {
            @return rgba($color, $opacity);
        }

        @else {
            @error "Invalid color variation: \`#{$name}, #{$variant}\`.";
        }
    }

    @else {
        @error "Invalid color name: \`#{$name}\`.";
    }

    @return $color;
}

/*
    GET CONTRASTING COLOR FOR TEXT ACCESSIBILITY (WCAG 2.0 AA+)

    usage:
        // text for the base color
        text-color(primary);

        // for variations of a color
        text-color(primary, lighter);
        text-color(primary, light);
        text-color(primary, dark);
        text-color(primary, darker);
*/
@function text-color($name: 'primary', $variant: 'base') {
    $color: color($name, $variant);

    $color-brightness: round((red($color)*299)+(green($color)*587)+(blue($color)*114)/1000);
    $light-color: round((red(#ffffff)*299)+(green(#ffffff)*587)+(blue(#ffffff)*114)/1000);

    @if abs($color-brightness) < ($light-color/2) {
        @return color(white);
    }

    @else {
        @return color(black);
    }
}
`
            },
            {
                file: '00_Abstracts/functions/_spacing.scss',
                content: `@import '../variables';
@import 'strings';

@function spacing($name) {
    $prefix: "";

    // This enables negative values to be used.
    @if(str-contains($name, "-")) {
        $prefix: "-";
        $name: str-replace($name, "-", "");
    }

    @if map-has-key($spacing-sizes, $name) {
        @return unquote($prefix + map-get($spacing-sizes, $name));
    } 
    @else {
        @warn "Invalid spacing size: \`#{$name}\`.";
    }
}
`
            },
            {
                file: '00_Abstracts/functions/_strings.scss',
                content: `@function str-replace($string, $search, $replace: '') {
    $index: str-index($string, $search);

    @if $index {
        @return str-slice($string, 1, $index - 1)+$replace+str-replace(str-slice($string, $index + str-length($search)), $search, $replace);
    }

    @return $string;
}

@function str-ends-with($string, $search) {
    @return str-slice(quote($string), (str-length($string) - str-length($search) + 1)) == $search;
}

@function str-contains($string, $search) {
    @return str-index(quote($string), $search) != null;
}
`
            },
            {
                file: '00_Abstracts/functions/_z-index.scss',
                content: `@import '../variables';

@function z($name) {
    @if map-has-key($z-indexes, $name) {
        @return map-get($z-indexes, $name);
    } 
    @else {
        @warn "Invalid spacing size: \`#{$name}\`.";
    }
}
`
            },
            {
                file: '00_Abstracts/mixins/_border-radius.scss',
                content: `@import '../variables';

@mixin border-radius($size) {
    @if map-has-key($border-radiuses, $size) {
        border-radius: map-get($border-radiuses, $size);
    } 
    @else {
        @warn "Invalid font size: \`#{$size}\`.";
    }
}

@mixin border-radius-top($size) {
    @if map-has-key($border-radiuses, $size) {
        border-radius: 0;
        border-top-left-radius: map-get($border-radiuses, $size);
        border-top-right-radius: map-get($border-radiuses, $size);
    } 
    @else {
        @warn "Invalid font size: \`#{$size}\`.";
    }
}

@mixin border-radius-bottom($size) {
    @if map-has-key($border-radiuses, $size) {
        border-radius: 0;
        border-bottom-left-radius: map-get($border-radiuses, $size);
        border-bottom-right-radius: map-get($border-radiuses, $size);
    } 
    @else {
        @warn "Invalid font size: \`#{$size}\`.";
    }
}

@mixin border-radius-left($size) {
    @if map-has-key($border-radiuses, $size) {
        border-radius: 0;
        border-bottom-left-radius: map-get($border-radiuses, $size);
        border-top-left-radius: map-get($border-radiuses, $size);
    } 
    @else {
        @warn "Invalid font size: \`#{$size}\`.";
    }
}

@mixin border-radius-right($size) {
    @if map-has-key($border-radiuses, $size) {
        border-radius: 0;
        border-bottom-right-radius: map-get($border-radiuses, $size);
        border-top-right-radius: map-get($border-radiuses, $size);
    } 
    @else {
        @warn "Invalid font size: \`#{$size}\`.";
    }
}
`
            },
            {
                file: '00_Abstracts/mixins/_border-radius.scss',
                content: `@import '../variables';

/*
    BREAKPOINT ABOVE

    Usage:
        @include breakpoint-above(sm) {}
*/
@mixin breakpoint-above($breakpoint) {
    @if map-has-key($breakpoints, $breakpoint) {
        $breakpoint-value: map-get($breakpoints, $breakpoint);

        @media (min-width: $breakpoint-value) {
            @content;
        }
    }
    @else {
        @warn 'Invalid breakpoint: #{$breakpoint}.';
    }
}

    

/*
    BREAKPOINT BELOW

    Usage:
        @include breakpoint-below(sm) {}
*/
@mixin breakpoint-below($breakpoint) {
    @if map-has-key($breakpoints, $breakpoint) {
        $breakpoint-value: map-get($breakpoints, $breakpoint);

        @media (max-width: ($breakpoint-value - 1)) {
            @content;
        }
    }
    @else {
        @warn 'Invalid breakpoint: #{$breakpoint}.';
    }
}

    

/*
    BREAKPOINT BETWEEN

    Usage:
        @include breakpoint-between(sm, md) {}
*/
@mixin breakpoint-between($lower, $upper) {
    @if map-has-key($breakpoints, $lower) and map-has-key($breakpoints, $upper) {
        $lower-breakpoint: map-get($breakpoints, $lower);
        $upper-breakpoint: map-get($breakpoints, $upper);

        @media (min-width: $lower-breakpoint) and (max-width: ($upper-breakpoint - 1)) {
            @content;
        }
    }
    @else {
        @if (map-has-key($breakpoints, $lower)==false) {
            @warn 'Your lower breakpoint was invalid: #{$lower}.';
        }

        @if (map-has-key($breakpoints, $upper)==false) {
            @warn 'Your upper breakpoint was invalid: #{$upper}.';
        }
    }
}
`
            },
            {
                file: '00_Abstracts/mixins/_font-sizes.scss',
                content: `@import '../variables';

@mixin font-size($size) {
    @if map-has-key($font-sizes, $size) {
        font-size: map-get($font-sizes, $size);
    } 
    @else {
        @warn "Invalid font size: \`#{$size}\`.";
    }
}
`
            },
            {
                file: '00_Abstracts/mixins/_hover.scss',
                content: `@mixin hover {
    &:hover {
        @content;
    }
}

@mixin hover-focus {
    &:hover,
    &:focus {
        @content;
    }
}

@mixin hover-focus-active {
    &:hover,
    &:focus,
    &:active {
        @content;
    }
}
`
            },
            {
                file: '00_Abstracts/mixins/_spacing.scss',
                content: `@import '../variables';
@import '../functions/spacing';

@mixin m($top: auto, $bottom: null, $left: null, $right: null) {
    @if ($top and not $bottom and not $left and not $right) {
        @include mx($top);
        @include my($top);
    }

    @else {
        @include mt($top);
        @include mb($bottom);
        @include ml($left);
        @include mr($right);
    }
}

@mixin mx($left: auto, $right: null) {
    @if ($left and $right) {
        @include ml($left);
        @include mr($right);
    }

    @else if ($left and not $right) {
        @include ml($left);
        @include mr($left);
    }

    @else {
        @error "mx(#{$left}, #{$right}): Invalid parameters. Expects mx($size) or mx($left, $right)";
    }
}

@mixin my($top : auto, $bottom : null) {
    @if ($top and $bottom) {
        @include mt($top);
        @include mb($bottom);
    }

    @else if ($top and not $bottom) {
        @include mt($top);
        @include mb($top);
    }

    @else {
        @error "my(#{$top}, #{$bottom}): Invalid parameters. Expects my($size) or my($top, $bottom)";
    }
}

@mixin ml($size) {
    margin-left: spacing($size);
}

@mixin mt($size) {
    margin-top: spacing($size);
}

@mixin mr($size) {
    margin-right: spacing($size);
}

@mixin mb($size) {
    margin-bottom: spacing($size);
}

@mixin p($top: auto, $bottom: null, $left: null, $right: null) {
    @if ($top and not $bottom and not $left and not $right) {
        @include px($top);
        @include py($top);
    }

    @else {
        @include pt($top);
        @include pb($bottom);
        @include pl($left);
        @include pr($right);
    }
}

@mixin px($left: auto, $right: null) {
    @if ($left and $right) {
        @include pl($left);
        @include pr($right);
    }

    @else if ($left and not $right) {
        @include pl($left);
        @include pr($left);
    }

    @else {
        @error "px(#{$left}, #{$right}): Invalid parameters. Expects px($size) or px($left, $right)";
    }
}

@mixin py($top : 1, $bottom : null) {
    @if ($top and $bottom) {
        @include pt($top);
        @include pb($bottom);
    }

    @else if ($top and not $bottom) {
        @include pt($top);
        @include pb($top);
    }

    @else {
        @error "py(#{$top}, #{$bottom}): Invalid parameters. Expects py($size) or py($top, $bottom)";
    }
}

@mixin pl($size : auto) {
    padding-left: spacing($size);
}

@mixin pt($size : auto) {
    padding-top: spacing($size);
}

@mixin pr($size : auto) {
    padding-right: spacing($size);
}

@mixin pb($size : auto) {
    padding-bottom: spacing($size);
}
`
            },
            {
                file: '00_Abstracts/mixins/_shadows.scss',
                content: `@import '../variables';
@import '../functions/colors';

@mixin box-shadow($size: sm) {
    @if($size == sm) {
        box-shadow: 0 2px 2px 0 color(black, base, .14), 
                    0 3px 1px -2px color(black, base, .2), 
                    0 1px 5px 0 color(black, base, .12);
    }

    @else if($size == md) {
        box-shadow: 0 3px 3px 1px color(black, base, .14), 
                    0 4px 2px -3px color(black, base, 0.2), 
                    0 2px 6px 1px color(black, base, 0.12);
    }

    @else if($size == lg) {
        box-shadow: 0 9px 46px 8px color(black, base, .14), 
                    0 11px 15px -7px color(black, base, 0.12), 
                    0 24px 38px 3px color(black, base, 0.2);
    }

    @else if($size == none) {
        box-shadow: none;
    }
}
`
            },
            {
                file: '00_Abstracts/mixins/_transitions.scss',
                content: `@import '../variables';

@mixin transition-ease-in-out($speed: fast) {
    @if map-has-key($transitions, $speed) {
        transition: all map-get($transitions, $speed) ease-in-out;
    } 
    @else {
        @warn "Invalid font size: \`#{$speed}\`.";
    }
}
`
            },
            {
                file: '00_Abstracts/index.scss',
                content: `@import '_variables.scss';
@import 'functions/_colors.scss';
@import 'functions/_spacing.scss';
@import 'functions/_strings.scss';
@import 'functions/_z-index.scss';
@import 'mixins/_border-radius.scss';
@import 'mixins/_breakpoints.scss';
@import 'mixins/_font-sizes.scss';
@import 'mixins/_hover.scss';
@import 'mixins/_shadows.scss';
@import 'mixins/_spacing.scss';
@import 'mixins/_transitions.scss';
`
            }
        ]
    },
    {
        format: "sass",
        styles: []
    },
    {
        format: "less",
        styles: []
    },
];
