export interface IStyleContent {
        file: string;
        content: string;
    }
    
    export interface IStyleList {
        format: string;
        styles: IStyleContent[];
    }
    
    export const styleContent: IStyleList[] = [
        {
            format: "scss",
            styles: [
                {
                    file: "00_Abstracts/_variables.scss",
                    content: `//   FONTS
    
$font-accent: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, Noto Sans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" !default;
$font-base: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, Noto Sans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" !default;
$font-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !default;

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
    none: 0,
    3xs: 0.0625rem,
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
    'primary': #d15f01,
    'secondary': #30629e,
    'success': #76b524,
    'info': #8ebede,
    'warning': #ffc107,
    'danger': #ff0000,
    'light': #c7c7c7,
    'dark': #494949
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
    sub: -1,
    none: 0,
    xxs: 1,
    xs: 10,
    sm: 50,
    md: 100,
    lg: 200,
    xl: 500,
    trump: 99999
) !default;


// BORDERS

$border-style: solid !default;
$border-size: 3xs !default; // 1px
$border-color: light !default;

$border-radiuses: (
    none: 0,
    sm: 0.25rem,
    md: 0.5rem,
    lg: 0.75rem,
    pill: 10rem,
    circle: 50%
) !default;

//  SHADOWS

$shadows: (
    none: none,
    inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
    outline: "0 0 0 3px rgba(0, 0, 0, 0.5)",
    xs: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    sm: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    md: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    lg: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    xl: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
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
                    file: '00_Abstracts/functions/_borders.scss',
                    content: `@import '../variables';
@import 'colors';

@function border($style, $size, $color, $variant: base, $opacity: 1) {
    $b-size: '';
    $b-style: $border-style;
    $b-color: '';

    @if($size == '') {
        @if map-has-key($spacing-sizes, $border-size) {
            $b-size: map-get($spacing-sizes, $border-size);
        } @else {
            @error "Invalid border size: '#{$size}'. Values must be selected from the '$spacing-sizes' variable.";
        }
    } @else {
        @if map-has-key($spacing-sizes, $size) {
            $b-size: map-get($spacing-sizes, $size);
        } @else {
            @error "Invalid border size: '#{$size}'. Values must be selected from the '$spacing-sizes' variable.";
        }
    }

    @if($style != '') {
        $b-style: $style;
    }

    @if($color != '') {
        $b-color: color($color, $variant, $opacity);
    } @else {
        @if(length($border-color) > 1) {
            $g-color: nth($border-color, 1);
            $g-variant: nth($border-color, 2);
            $g-opacity: 1;

            @if(length($border-color) > 2) {
                $g-opacity: nth($border-color, 3);
            }

            $b-color: color($g-color, $g-variant, $g-opacity);
        } @else {
            $b-color: color($border-color);
        }
    }

    @return $b-size $b-style $b-color;
}
`
                },
                {
                    file: "00_Abstracts/functions/_colors.scss",
                    content: `@import '../variables';
@import 'color-contrast';

@function build-pallet() {
    $result: ();

    @each $key, $value in $theme-colors {
        $group: ($key: ('base': $value,
            'light': lighten($value, $color-variation),
            'lighter': lighten($value, $color-variation * 2),
            'lightest': lighten($value, $color-variation * 3),
            'dark': darken($value, $color-variation),
            'darker': darken($value, $color-variation * 2),
            'darkest': darken($value, $color-variation * 3)));

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

    $name: $name + unquote("");

    @if(type-of($variant) == 'number') {
        $opacity: $variant;
        $variant: 'base';
    }

    // Get the color name
    $color-name: map-get($color-pallette, $name);

    // Get the color variant
    @if $color-name or $name == 'black' or $name == 'white' {
        @if $name == 'black' {
            $color: black;
        } @else if $name == 'white' {
            $color: white;
        } @else {
            $color: map-get($color-name, $variant);
        }
    
        @if $color {
            @return rgba($color, $opacity);
        } @else {
            @error "Invalid color variation: '#{$name}', '#{$variant}'."
        }
    } @else {
        @error "Invalid color name: '#{$name}'."
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
@function text-color($name: 'primary', $variant: 'base', $opacity: 1) {
    $color: color($name, $variant, $opacity);

    @return get-contrast-color($color);
}              
`
                },
                {
                    file: "00_Abstracts/functions/_spacing.scss",
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
        @error "Invalid spacing size: '#{$name}'.";
    }
}
`
                },
                {
                    file: "00_Abstracts/functions/_color-contrast.scss",
                    content: `@import 'math';
    
/*
    Adopted with gratitude from w3.org:
    https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
*/

@function get-relative-luminance($color) {
    $color: $color / 255;

    @if ($color < 0.03928) {
        @return $color / 12.92
    }
    
    @return pow(($color + 0.055) / 1.055, 2.4);
}

@function get-luminance($color) {
    $red: get-relative-luminance(red($color));
    $green: get-relative-luminance(green($color));
    $blue: get-relative-luminance(blue($color));

    @return (.2126 * $red) + (.7152 * $green) + (.0722 * $blue);
}

@function get-contrast-ratio($back, $front) {
    $backLum: get-luminance($back) + .05;
    $frontLum: get-luminance($front) + .05;

    @return max($backLum, $frontLum) / min($backLum, $frontLum);
}

@function get-contrast-color($color) {
    $lightContrast: get-contrast-ratio($color, white);
    $darkContrast: get-contrast-ratio($color, black);

    @if ($lightContrast > 4.5 or $darkContrast < 4.5) {
        @return white;
    }

    @return black;
}                
`
                },
                {
                    file: "00_Abstracts/functions/_math.scss",
                    content: `@function pow($number, $exponent) {
    $value: 1;

    @if $exponent > 0 {
        @for $i from 1 through $exponent {
            $value: $value * $number;
        }
    }

    @return $value;
}                
`
                },
                {
                    file: "00_Abstracts/functions/_strings.scss",
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
                    file: "00_Abstracts/functions/_z-index.scss",
                    content: `@import '../variables';
    
@function z($name) {
    @if map-has-key($z-indexes, $name) {
        @return map-get($z-indexes, $name);
    } 
    @else {
        @error "Invalid 'z' value: '#{$name}'.";
    }
}
`
                },
                {
                    file: '00_Abstracts/mixins/_borders.scss',
                    content: `@import '../functions/borders';

@mixin border($style: '', $size: '', $color: '', $variant: base, $opacity: 1) {
    border: border($style, $size, $color, $variant, $opacity);
}

@mixin border-t($style: '', $size: '', $color: '', $variant: base, $opacity: 1) {
    border-top: border($style, $size, $color, $variant, $opacity);
}

@mixin border-b($style: '', $size: '', $color: '', $variant: base, $opacity: 1) {
    border-bottom: border($style, $size, $color, $variant, $opacity);
}

@mixin border-l($style: '', $size: '', $color: '', $variant: base, $opacity: 1) {
    border-left: border($style, $size, $color, $variant, $opacity);
}

@mixin border-r($style: '', $size: '', $color: '', $variant: base, $opacity: 1) {
    border-right: border($style, $size, $color, $variant, $opacity);
}

@mixin border-x($style: '', $size: '', $color: '', $variant: base, $opacity: 1) {
    @include border-l($style, $size, $color, $variant, $opacity);
    @include border-r($style, $size, $color, $variant, $opacity);
}

@mixin border-y($style: '', $size: '', $color: '', $variant: base, $opacity: 1) {
    @include border-t($style, $size, $color, $variant, $opacity);
    @include border-b($style, $size, $color, $variant, $opacity);
}
`
                },
                {
                    file: "00_Abstracts/mixins/_border-radius.scss",
                    content: `@import '../variables';
    
@mixin radius($size) {
    @if map-has-key($border-radiuses, $size) {
        border-radius: map-get($border-radiuses, $size);
    } 
    @else {
        @error "Invalid border-radius size: '#{$size}'.";
    }
}

@mixin radius-t($size) {
    @if map-has-key($border-radiuses, $size) {
        border-top-left-radius: map-get($border-radiuses, $size);
        border-top-right-radius: map-get($border-radiuses, $size);
    } 
    @else {
        @error "Invalid border-radius size: '#{$size}'.";
    }
}

@mixin radius-tl($size) {
    @if map-has-key($border-radiuses, $size) {
        border-top-left-radius: map-get($border-radiuses, $size);
    } 
    @else {
        @error "Invalid border-radius size: '#{$size}'.";
    }
}

@mixin radius-tr($size) {
    @if map-has-key($border-radiuses, $size) {
        border-top-right-radius: map-get($border-radiuses, $size);
    } 
    @else {
        @error "Invalid border-radius size: '#{$size}'.";
    }
}

@mixin radius-b($size) {
    @if map-has-key($border-radiuses, $size) {
        border-bottom-left-radius: map-get($border-radiuses, $size);
        border-bottom-right-radius: map-get($border-radiuses, $size);
    } 
    @else {
        @error "Invalid border-radius size: '#{$size}'.";
    }
}

@mixin radius-bl($size) {
    @if map-has-key($border-radiuses, $size) {
        border-bottom-left-radius: map-get($border-radiuses, $size);
    } 
    @else {
        @error "Invalid border-radius size: '#{$size}'.";
    }
}

@mixin radius-br($size) {
    @if map-has-key($border-radiuses, $size) {
        border-bottom-right-radius: map-get($border-radiuses, $size);
    } 
    @else {
        @error "Invalid border-radius size: '#{$size}'.";
    }
}

@mixin radius-l($size) {
    @if map-has-key($border-radiuses, $size) {
        border-radius: 0;
        border-bottom-left-radius: map-get($border-radiuses, $size);
        border-top-left-radius: map-get($border-radiuses, $size);
    } 
    @else {
        @error "Invalid border-radius size: '#{$size}'.";
    }
}

@mixin radius-r($size) {
    @if map-has-key($border-radiuses, $size) {
        border-radius: 0;
        border-bottom-right-radius: map-get($border-radiuses, $size);
        border-top-right-radius: map-get($border-radiuses, $size);
    } 
    @else {
        @error "Invalid border-radius size: '#{$size}'.";
    }
}
`
                },
                {
                    file: "00_Abstracts/mixins/_breakpoints.scss",
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
        @error "Invalid breakpoint: '#{$breakpoint}'.";
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
        @error "Invalid breakpoint: '#{$breakpoint}'.";
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
            @error 'Your lower breakpoint was invalid: #{$lower}.';
        }

        @if (map-has-key($breakpoints, $upper)==false) {
            @error 'Your upper breakpoint was invalid: #{$upper}.';
        }
    }
}
`
                },
                {
                    file: "00_Abstracts/mixins/_font-sizes.scss",
                    content: `@import '../variables';
    
@mixin font-size($size) {
    @if map-has-key($font-sizes, $size) {
        font-size: map-get($font-sizes, $size);
    } 
    @else {
        @error "Invalid font size: \`#{$size}\`.";
    }
}
`
                },
                {
                    file: "00_Abstracts/mixins/_hover.scss",
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
                    file: "00_Abstracts/mixins/_spacing.scss",
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
                    file: "00_Abstracts/mixins/_shadows.scss",
                    content: `@import '../variables';
    
@mixin shadow($size: sm) {
    @if map-has-key($shadows, $size) {
        box-shadow: unquote(map-get($shadows, $size));
    } 
    @else {
        @error "Invalid shadow size: '#{$size}'.";
    }
}
`
                },
                {
                    file: "00_Abstracts/mixins/_transitions.scss",
                    content: `@import '../variables';
    
@mixin transition-ease-in-out($speed: fast) {
    @if map-has-key($transitions, $speed) {
        transition: all map-get($transitions, $speed) ease-in-out;
    } 
    @else {
        @error "Invalid transition speed: \`#{$speed}\`.";
    }
}
`
                },
                {
                    file: "00_Abstracts/index.scss",
                    content: `@import 'variables';
@import 'functions/colors';
@import 'functions/math';
@import 'functions/strings';
@import 'functions/z-index';
@import 'mixins/borders';
@import 'mixins/border-radius';
@import 'mixins/breakpoints';
@import 'mixins/font-sizes';
@import 'mixins/hover';
@import 'mixins/shadows';
@import 'mixins/spacing';
@import 'mixins/transitions';                
`
                },
                {
                    file: "01_Base/_base.scss",
                    content: `@import '../00_Abstracts/index';
    
html,
body {
    font-family: $font-base;
    font-size: $font-size-base;
    line-height: $line-height-base;

    code,
    pre {
        font-family: $font-monospace;
    }
}                            
`
                },
                {
                    file: "01_Base/_index.scss",
                    content: `@import 'base';`
                }
            ]
        },
        {
            format: "sass",
            styles: [
                {
                    file: "00_Abstracts/_variables.sass",
                    content: `//   FONTS
    
$font-accent: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, Noto Sans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" !default
$font-base: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, Noto Sans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" !default
$font-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !default
                
$font-size-base: 16px
$font-sizes: ( xxs: 0.75rem, xs: 0.875rem, sm: 1rem, md: 1.25rem, lg: 1.5rem, xl: 2rem, xxl: 3rem) !default

$line-height-base: 1.5

// SPACING

$spacing-sizes: ( auto: auto, none: 0, 3xs: 0.0625rem, xxs: 0.125rem, xs: 0.25rem, sm: 0.5rem, md: 0.75rem, lg: 1rem, xl: 1.25rem, xxl: 2rem) !default

// COLORS

$theme-colors: ('primary': #d15f01, 'secondary': #30629e, 'success': #76b524, 'info': #8ebede, 'warning': #ffc107, 'danger': #ff0000, 'light': #c7c7c7, 'dark': #494949) !default

$color-variation: 8%


// BREAKPOINTS

$breakpoints: ( xs: 480px, sm: 768px, md: 992px, lg: 1200px, xl: 1440px) !default

// Z-INDEX

$z-indexes: (sub: -1, none: 0, xxs: 1, xs: 10, sm: 50, md: 100, lg: 200, xl: 500, trump: 99999) !default;

// BORDERS

$border-style: solid !default
$border-size: 3xs !default
$border-color: light !default

$border-radiuses: (none: 0, sm: 0.25rem, md: 0.5rem, lg: 0.75rem, pill: 10rem, circle: 50%) !default

//  SHADOWS

$shadows: (none: none, inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)", outline: "0 0 0 3px rgba(0, 0, 0, 0.5)", xs: "0 1px 3px 0 rgba(0, 0, 0, 0.1)", "0 1px 2px 0 rgba(0, 0, 0, 0.06)", sm: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)", md: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)", lg: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)", xl: "0 25px 50px -12px rgba(0, 0, 0, 0.25)") !default

//  TRANSITIONS

$transitions: (slow: .5s, med: .3s, fast: .1s) !default
`
                },
                {
                    file: '00_Abstracts/functions/_borders.sass',
                    content: `@import '../variables'
@import 'colors'

@function border($style, $size, $color, $variant: base, $opacity: 1)
    $b-size: ''
    $b-style: $border-style
    $b-color: ''

    @if($size == '')
        @if map-has-key($spacing-sizes, $border-size)
            $b-size: map-get($spacing-sizes, $border-size)
        @else
            @error "Invalid border size: '#{$size}'. Values must be selected from the '$spacing-sizes' variable."
        }
    @else
        @if map-has-key($spacing-sizes, $size)
            $b-size: map-get($spacing-sizes, $size)
        @else
            @error "Invalid border size: '#{$size}'. Values must be selected from the '$spacing-sizes' variable."

    @if($style != '')
        $b-style: $style

    @if($color != '')
        $b-color: color($color, $variant, $opacity)
    @else
        @if(length($border-color) > 1)
            $g-color: nth($border-color, 1)
            $g-variant: nth($border-color, 2)
            $g-opacity: 1

            @if(length($border-color) > 2)
                $g-opacity: nth($border-color, 3)

            $b-color: color($g-color, $g-variant, $g-opacity)
        @else
            $b-color: color($border-color)

    @return $b-size $b-style $b-color
}
`
                },
                {
                    file: "00_Abstracts/functions/_colors.sass",
                    content: `@import '../variables'
    
@function build-pallet() 
    $result: ()

    @each $key, $value in $theme-colors 
        $group: ($key: ('base': $value, 'light': lighten($value, $color-variation), 'lighter': lighten($value, $color-variation * 2), 'dark': darken($value, $color-variation), 'darker': darken($value, $color-variation * 2)))
        $result: map-merge($result, $group)

    @return $result


$color-pallette: build-pallet()

//    GET COLOR
//
//    usage:
//        // for the base color
//        color(primary)
//
//        // for variations of a color
//        color(primary, lighter)
//        color(primary, light)
//        color(primary, dark)
//        color(primary, darker)
//
//        // opacity can also be adjusted using a third (optional) parameter
//        color(primary, lighter, .25)
@function color($name: 'primary', $variant: 'base', $opacity: 1) 
    $color: null

    $name: $name + unquote("")

    @if(type-of($variant) == 'number')
        $opacity: $variant
        $variant: 'base'

    // Get the color name
    $color-name: map-get($color-pallette, $name)

    // Get the color variant
    @if $color-name or $name == 'black' or $name == 'white'
        @if $name == 'black'
            $color: black
        @else if $name == 'white'
            $color: white
        @else
            $color: map-get($color-name, $variant)

        @if $color 
            @return rgba($color, $opacity)
        @else 
            @error "Invalid color variation: '#{$name}', '#{$variant}'."
    @else 
        @error "Invalid color name: '#{$name}'."

    @return $color


//    GET CONTRASTING COLOR FOR TEXT ACCESSIBILITY (WCAG 2.0 AA+)
//
//    usage:
//        // text for the base color
//        text-color(primary)
//
//        // for variations of a color
//        text-color(primary, lighter)
//        text-color(primary, light)
//        text-color(primary, dark)
//        text-color(primary, darker)
@function text-color($name: 'primary', $variant: 'base', $opacity: 1)
    $color: color($name, $variant, $opacity)

    @return get-contrast-color($color)
`
                },
                {
                    file: "00_Abstracts/functions/_color-contrast.sass",
                    content: `@import 'math'
    
/*
    Adopted with gratitude from w3.org:
    https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
*/

@function get-relative-luminance($color)
    $color: $color / 255

    @if ($color < 0.03928)
        @return $color / 12.92
    
    @return pow(($color + 0.055) / 1.055, 2.4)

@function get-luminance($color)
    $red: get-relative-luminance(red($color))
    $green: get-relative-luminance(green($color))
    $blue: get-relative-luminance(blue($color))

    @return (.2126 * $red) + (.7152 * $green) + (.0722 * $blue)

@function get-contrast-ratio($back, $front)
    $backLum: get-luminance($back) + .05
    $frontLum: get-luminance($front) + .05

    @return max($backLum, $frontLum) / min($backLum, $frontLum)

@function get-contrast-color($color) 
    $lightContrast: get-contrast-ratio($color, white)
    $darkContrast: get-contrast-ratio($color, black)

    @if ($lightContrast > 4.5 or $darkContrast < 4.5)
        @return white

    @return black;
`
                },
                {
                    file: "00_Abstracts/functions/_math.sass",
                    content: `@function pow($number, $exponent)
    $value: 1;

    @if $exponent > 0
        @for $i from 1 through $exponent
            $value: $value * $number;

    @return $value;
`
                },
                {
                    file: "00_Abstracts/functions/_strings.sass",
                    content: `@function str-replace($string, $search, $replace: '')
    $index: str-index($string, $search)

    @if $index
        @return str-slice($string, 1, $index - 1)+$replace+str-replace(str-slice($string, $index + str-length($search)), $search, $replace)

    @return $string;

@function str-ends-with($string, $search)
    @return str-slice(quote($string), (str-length($string) - str-length($search) + 1)) == $search

@function str-contains($string, $search)
    @return str-index(quote($string), $search) != null
`
                },
                {
                    file: "00_Abstracts/functions/_spacing.sass",
                    content: `@import '../variables'
@import 'strings'

@function spacing($name)
    $prefix: ""

    // This enables negative values to be used.
    @if(str-contains($name, "-"))
        $prefix: "-";
        $name: str-replace($name, "-", "")

    @if map-has-key($spacing-sizes, $name)
        @return unquote($prefix + map-get($spacing-sizes, $name))
    @else
        @error "Invalid spacing size: '#{$name}'."
`
                },
                {
                    file: "00_Abstracts/functions/_z-index.sass",
                    content: `@import '../variables'
    
@function z($name) 
    @if map-has-key($z-indexes, $name) 
        @return map-get($z-indexes, $name)
    @else 
        @error "Invalid 'z' value: '#{$name}'."
`
                },
                {
                    file: "00_Abstracts/mixins/_border-radius.sass",
                    content: `@import '../variables'
    
=radius($size) 
    @if map-has-key($border-radiuses, $size) 
        border-radius: map-get($border-radiuses, $size)
    @else 
        @error "Invalid border-radius size: '#{$size}'."

=radius-t($size) 
    @if map-has-key($border-radiuses, $size) 
        border-top-left-radius: map-get($border-radiuses, $size)
        border-top-right-radius: map-get($border-radiuses, $size)
    @else 
        @error "Invalid border-radius size: '#{$size}'."

=radius-tl($size) 
    @if map-has-key($border-radiuses, $size) 
        border-top-left-radius: map-get($border-radiuses, $size)
    @else 
        @error "Invalid border-radius size: '#{$size}'."

=radius-tr($size) 
    @if map-has-key($border-radiuses, $size) 
        border-top-right-radius: map-get($border-radiuses, $size)
    @else 
        @error "Invalid border-radius size: '#{$size}'."

=radius-b($size) 
    @if map-has-key($border-radiuses, $size) 
        border-bottom-left-radius: map-get($border-radiuses, $size)
        border-bottom-right-radius: map-get($border-radiuses, $size)
    @else 
        @error "Invalid border-radius size: '#{$size}'."

=radius-br($size) 
    @if map-has-key($border-radiuses, $size) 
        border-bottom-right-radius: map-get($border-radiuses, $size)
    @else 
        @error "Invalid border-radius size: '#{$size}'."

=radius-bl($size) 
    @if map-has-key($border-radiuses, $size) 
        border-bottom-left-radius: map-get($border-radiuses, $size)
    @else 
        @error "Invalid border-radius size: '#{$size}'."

=radius-l($size) 
    @if map-has-key($border-radiuses, $size) 
        border-bottom-left-radius: map-get($border-radiuses, $size)
        border-top-left-radius: map-get($border-radiuses, $size)
    @else 
        @error "Invalid border-radius size: '#{$size}'."

=radius-r($size) 
    @if map-has-key($border-radiuses, $size) 
        border-bottom-right-radius: map-get($border-radiuses, $size)
        border-top-right-radius: map-get($border-radiuses, $size)
    @else 
        @error "Invalid border-radius size: '#{$size}'."
`
                },
                {
                    file: "00_Abstracts/mixins/_borders.sass",
                    content: `@import '../functions/borders'

=border($style: '', $size: '', $color: '', $variant: base, $opacity: 1)
    border: border($style, $size, $color, $variant, $opacity)

=border-t($style: '', $size: '', $color: '', $variant: base, $opacity: 1)
    border-top: border($style, $size, $color, $variant, $opacity)

=border-b($style: '', $size: '', $color: '', $variant: base, $opacity: 1)
    border-bottom: border($style, $size, $color, $variant, $opacity)

=border-l($style: '', $size: '', $color: '', $variant: base, $opacity: 1)
    border-left: border($style, $size, $color, $variant, $opacity)

=border-r($style: '', $size: '', $color: '', $variant: base, $opacity: 1)
    border-right: border($style, $size, $color, $variant, $opacity)

=border-x($style: '', $size: '', $color: '', $variant: base, $opacity: 1)
    @include border-l($style, $size, $color, $variant, $opacity)
    @include border-r($style, $size, $color, $variant, $opacity)

=border-y($style: '', $size: '', $color: '', $variant: base, $opacity: 1)
    @include border-t($style, $size, $color, $variant, $opacity)
    @include border-b($style, $size, $color, $variant, $opacity)
`
                },
                {
                    file: "00_Abstracts/mixins/_breakpoints.sass",
                    content: `@import '../variables'
    
//    BREAKPOINT ABOVE
//
//    Usage:
//        +breakpoint-above(sm) 
=breakpoint-above($breakpoint) 
    @if map-has-key($breakpoints, $breakpoint) 
        $breakpoint-value: map-get($breakpoints, $breakpoint)

        @media (min-width: $breakpoint-value) 
            @content
    @else 
        @warn "Invalid breakpoint: '#{$breakpoint}'."


//    BREAKPOINT BELOW
//
//    Usage:
//        +breakpoint-below(sm) 
=breakpoint-below($breakpoint) 
    @if map-has-key($breakpoints, $breakpoint) 
        $breakpoint-value: map-get($breakpoints, $breakpoint)

        @media (max-width: ($breakpoint-value - 1)) 
            @content
    @else 
        @warn "Invalid breakpoint: '#{$breakpoint}'."


//    BREAKPOINT BETWEEN
//
//    Usage:
//        +breakpoint-between(sm, md) 
=breakpoint-between($lower, $upper) 
    @if map-has-key($breakpoints, $lower) and map-has-key($breakpoints, $upper) 
        $lower-breakpoint: map-get($breakpoints, $lower)
        $upper-breakpoint: map-get($breakpoints, $upper)

        @media (min-width: $lower-breakpoint) and (max-width: ($upper-breakpoint - 1)) 
            @content
    @else 
        @if (map-has-key($breakpoints, $lower)==false) 
            @warn "Your lower breakpoint was invalid: '#{$lower}'."

    @if (map-has-key($breakpoints, $upper)==false) 
        @warn "Your upper breakpoint was invalid: '#{$upper}'."                
`
                },
                {
                    file: "00_Abstracts/mixins/_font-sizes.sass",
                    content: `@import '../variables'
    
=font-size($size) 
    @if map-has-key($font-sizes, $size) 
        font-size: map-get($font-sizes, $size)
    @else 
        @error "Invalid font size: '#{$size}'."
`
                },
                {
                    file: "00_Abstracts/mixins/_hover.sass",
                    content: `=hover 
    &:hover 
        @content

=hover-focus 
    &:hover,
    &:focus 
        @content

=hover-focus-active 
    &:hover,
    &:focus,
    &:active 
        @content
`
                },
                {
                    file: "00_Abstracts/mixins/_spacing.sass",
                    content: `@import '../variables'
@import '../functions/spacing'

// MARGINS

=m($top: auto, $bottom: null, $left: null, $right: null) 
    @if ($top and not $bottom and not $left and not $right) 
        +mx($top)
        +my($top)
    @else 
        +mt($top)
        +mb($bottom)
        +ml($left)
        +mr($right)

=mx($left: auto, $right: null) 
    @if ($left and $right) 
        +ml($left)
        +mr($right)
    @else if ($left and not $right) 
        +ml($left)
        +mr($left)
    @else 
        @error "mx(#{$left}, #{$right}): Invalid parameters. Expects mx($size) or mx($left, $right)"

=my($top : auto, $bottom : null) 
    @if ($top and $bottom) 
        +mt($top)
        +mb($bottom)
    @else if ($top and not $bottom) 
        +mt($top)
        +mb($top)
    @else 
        @error "my(#{$top}, #{$bottom}): Invalid parameters. Expects my($size) or my($top, $bottom)"

=ml($size) 
    margin-left: spacing($size)

=mt($size) 
    margin-top: spacing($size)

=mr($size) 
    margin-right: spacing($size)

=mb($size) 
    margin-bottom: spacing($size)


// PADDING

=p($top: auto, $bottom: null, $left: null, $right: null) 
    @if ($top and not $bottom and not $left and not $right) 
        +px($top)
        +py($top)
    @else 
        +pt($top)
        +pb($bottom)
        +pl($left)
        +pr($right)

=px($left: auto, $right: null) 
    @if ($left and $right) 
        +pl($left)
        +pr($right)
    @else if ($left and not $right) 
        +pl($left)
        +pr($left)
    @else 
        @error "px(#{$left}, #{$right}): Invalid parameters. Expects px($size) or px($left, $right)"

=py($top : 1, $bottom : null) 
    @if ($top and $bottom) 
        +pt($top)
        +pb($bottom)
    @else if ($top and not $bottom) 
        +pt($top)
        +pb($top)
    @else 
        @error "py(#$top, #$bottom): Invalid parameters. Expects py($size) or py($top, $bottom)"

=pl($size : auto) 
    padding-left: spacing($size)

=pt($size : auto) 
    padding-top: spacing($size)

=pr($size : auto) 
    padding-right: spacing($size)

=pb($size : auto) 
    padding-bottom: spacing($size)
`
                },
                {
                    file: "00_Abstracts/mixins/_shadows.sass",
                    content: `@import '../variables'
    
=shadow($size: sm) 
    @if map-has-key($shadows, $size)
        box-shadow: unquote(map-get($shadows, $size));
    @else
        @error "Invalid shadow size: '#{$size}'.";
`
                },
                {
                    file: "00_Abstracts/mixins/_transitions.sass",
                    content: `@import '../variables'
    
=transition-ease-in-out($speed: fast) 
    @if map-has-key($transitions, $speed) 
        transition: all map-get($transitions, $speed) ease-in-out
    @else 
        @error "Invalid transition speed: '#{$speed}'."
`
                },
                {
                    file: "00_Abstracts/index.sass",
                    content: `@import 'variables'
@import 'functions/colors'
@import 'functions/math'
@import 'functions/strings'
@import 'functions/z-index'
@import 'mixins/border-radius'
@import 'mixins/borders'
@import 'mixins/breakpoints'
@import 'mixins/font-sizes'
@import 'mixins/hover'
@import 'mixins/shadows'
@import 'mixins/spacing'
@import 'mixins/transitions'
`
                },
                {
                    file: "01_Base/_base.sass",
                    content: `@import '../00_Abstracts/index';
    
html,
body
    font-family: $font-base;
    font-size: $font-size-base;
    line-height: $line-height-base;

    code,
    pre
        font-family: $font-monospace;
`
                },
                {
                    file: "01_Base/_index.sass",
                    content: `@import 'base'`
                }
            ]
        },
        {
            format: "less",
            styles: []
        }
    ];
    
    