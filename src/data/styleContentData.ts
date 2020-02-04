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
                content: `// CONTAINERS
$content-width: 600px !default;                    

//   FONTS
$font-size-base: 16px !default;

$fonts: (
    accent: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, Noto Sans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    base: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, Noto Sans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    monospace: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
) !default;

$font-sizes: (
    xxs: 0.75rem, // 12px
    xs: 0.875rem, // 14px
    sm: 1rem,     // 16px
    md: 1.25rem,  // 30px
    lg: 1.5rem,   // 24px
    xl: 2rem,     // 32px
    xxl: 3rem     // 48px
) !default;

$line-height-base: 1.5 !default;

// SPACING

$spacing-sizes: (
    auto: auto,
    none: 0,
    3xs: 0.0625rem, // 1px
    xxs: 0.125rem,  // 2px
    xs: 0.25rem,    // 4px
    sm: 0.5rem,     // 8px
    md: 0.75rem,    // 12px
    lg: 1rem,       // 16px
    xl: 1.25rem,    // 20px
    xxl: 2rem       // 32px
) !default;


// COLORS

$theme-colors: (
    primary: #24598d,
    secondary: #117d47,
    success: #669c1f, 
    info: #509BCE, 
    warning: #B88A00, 
    danger: #c70000, 
    light: #ababab,
    dark: #545454
) !default;

$color-variation: 8% !default;


// BREAKPOINTS

$breakpoints: (
    xxs: 20rem,  // 320px
    xs: 30rem,   // 480px
    sm: 48rem,   // 768px
    md: 62rem,   // 992px
    lg: 75rem,   // 1200px
    xl: 90rem    // 1440px
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

$border: (
    style: solid,
    size: 3xs,    // from $spacing-sizes
    color: light lighter
) !default;

$border-radiuses: (
    none: 0,
    sm: 0.25rem, // 4px
    md: 0.5rem,  // 8px
    lg: 0.75rem, // 12px
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

@function default-border($setting) {
    @if map-has-key($border, $setting) {
        @return map-get($border, $setting);
    } 
    @else {
        @error "Invalid default border value: '#{$setting}'.";
    }
}

@function border($style, $size, $color, $variant: base, $opacity: 1, $important: false) {
    @if ($important == true) {
        @return $style spacing($size) split-color-list($color, $variant, $opacity) !important;
    } @else {
        @return $style spacing($size) split-color-list($color, $variant, $opacity);
    }
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

    @if (type-of($variant) == 'number') {
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

// Used for splitting up color blocks - ex: "primary dark 0.75"
@function split-color-list($color, $variant: base, $opacity: 1) {
    @if (length($color) > 1) {
        $g-color: nth($color, 1);
        $g-variant: nth($color, 2);
        $g-opacity: 1;

        @if (length($color) > 2) {
            $g-opacity: nth($color, 3);
        }

        @return color($g-color, $g-variant, $g-opacity);
    } @else {
        @return color($color, $variant, $opacity);
    }
}
`
            },
            {
                file: "00_Abstracts/functions/_spacing.scss",
                content: `@import '../variables';
@import 'strings';

@function spacing($name, $important: false) {
    $prefix: "";

    // This enables negative values to be used.
    @if (str-contains($name, "-")) {
        $prefix: "-";
        $name: str-replace($name, "-", "");
    }

    @if map-has-key($spacing-sizes, $name) {
        @if ($important == true) {
            @return unquote($prefix + map-get($spacing-sizes, $name)) !important;
        } @else {
            @return unquote($prefix + map-get($spacing-sizes, $name));
        }
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

@function get-contrast-ratio($backgroundColor, $foregroundColor) {
    $backgroundLuminance: get-luminance($backgroundColor) + .05;
    $foregroundLuminance: get-luminance($foregroundColor) + .05;

    @return max($backgroundLuminance, $foregroundLuminance) / min($backgroundLuminance, $foregroundLuminance);
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
                content: `@function pow($base, $exponent, $precision: 12) {
    @if (floor($exponent) !=$exponent) {
        $precision2: pow(10, $precision);
        $exponent: round($exponent * $precision2);
        $denominator: greatest-common-divisor($exponent, $precision2);
        @return nthRoot(pow($base, $exponent / $denominator), $precision2 / $denominator, $precision);
    }

    $value: $base;

    @if $exponent>1 {
        @for $i from 2 through $exponent {
            $value: $value * $base;
        }
    }

    @else if $exponent < 1 {
        @for $i from 0 through -$exponent {
            $value: $value / $base;
        }
    }

    @return $value;
}

@function greatest-common-divisor($a, $b) {
    @if ($b !=0) {
        @return greatest-common-divisor($b, $a % $b);
    }

    @else {
        @return abs($a);
    }
}

@function nthRoot($num, $n: 2, $precision: 12) {
    $x: 1;

    @for $i from 0 through $precision {
        $x: 1 / $n * (($n - 1) * $x + ($num / pow($x, $n - 1)));
    }

    @return $x;
}              
`
            },
            {
                file: "00_Abstracts/functions/_strings.scss",
                content: `@function str-replace($string, $search, $replace: '') {
    $index: str-index($string, $search);

    @if $index {
        @return str-slice($string, 1, $index - 1) + $replace + str-replace(str-slice($string, $index + str-length($search)), $search, $replace);
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

@mixin border($style: default-border(style), $size: default-border(size), $color: default-border(color), $variant: base, $opacity: 1, $important: false) {
    border: border($style, $size, $color, $variant, $opacity, $important);
}

@mixin border-t($style: default-border(style), $size: default-border(size), $color: default-border(color), $variant: base, $opacity: 1, $important: false) {
    border-top: border($style, $size, $color, $variant, $opacity, $important);
}

@mixin border-b($style: default-border(style), $size: default-border(size), $color: default-border(color), $variant: base, $opacity: 1, $important: false) {
    border-bottom: border($style, $size, $color, $variant, $opacity, $important);
}

@mixin border-l($style: default-border(style), $size: default-border(size), $color: default-border(color), $variant: base, $opacity: 1, $important: false) {
    border-left: border($style, $size, $color, $variant, $opacity, $important);
}

@mixin border-r($style: default-border(style), $size: default-border(size), $color: default-border(color), $variant: base, $opacity: 1, $important: false) {
    border-right: border($style, $size, $color, $variant, $opacity, $important);
}

@mixin border-x($style: default-border(style), $size: default-border(size), $color: default-border(color), $variant: base, $opacity: 1, $important: false) {
    @include border-l($style, $size, $color, $variant, $opacity, $important);
    @include border-r($style, $size, $color, $variant, $opacity, $important);
}

@mixin border-y($style: default-border(style), $size: default-border(size), $color: default-border(color), $variant: base, $opacity: 1, $important: false) {
    @include border-t($style, $size, $color, $variant, $opacity, $important);
    @include border-b($style, $size, $color, $variant, $opacity, $important);
}                    
`
            },
            {
                file: "00_Abstracts/mixins/_border-radius.scss",
                content: `@import '../variables';

@mixin radius($size, $important: false) {
    @include radius-t($size, $important);
    @include radius-b($size, $important);
}

@mixin radius-t($size, $important: false) {
    @include radius-tl($size, $important);
    @include radius-tr($size, $important);
}

@mixin radius-b($size, $important: false) {
    @include radius-bl($size, $important);
    @include radius-br($size, $important);
}

@mixin radius-l($size, $important: false) {
    @include radius-tl($size, $important);
    @include radius-bl($size, $important);
}

@mixin radius-r($size, $important: false) {
    @include radius-tr($size, $important);
    @include radius-br($size, $important);
}

@mixin radius-tl($size, $important: false) {
    @if map-has-key($border-radiuses, $size) {
        @if ($important == true) {
            border-top-left-radius: map-get($border-radiuses, $size) !important;
        } @else {
            border-top-left-radius: map-get($border-radiuses, $size);
        }
    } 
    @else {
        @error "Invalid border-radius size: '#{$size}'.";
    }
}

@mixin radius-tr($size, $important: false) {
    @if map-has-key($border-radiuses, $size) {
        @if ($important == true) {
            border-top-right-radius: map-get($border-radiuses, $size) !important;
        } @else {
            border-top-right-radius: map-get($border-radiuses, $size);
        }
    } 
    @else {
        @error "Invalid border-radius size: '#{$size}'.";
    }
}

@mixin radius-bl($size, $important: false) {
    @if map-has-key($border-radiuses, $size) {
        @if ($important == true) {
            border-bottom-left-radius: map-get($border-radiuses, $size) !important;
        } @else {
            border-bottom-left-radius: map-get($border-radiuses, $size);
        }
    } 
    @else {
        @error "Invalid border-radius size: '#{$size}'.";
    }
}

@mixin radius-br($size, $important: false) {
    @if map-has-key($border-radiuses, $size) {
        @if ($important == true) {
            border-bottom-right-radius: map-get($border-radiuses, $size) !important;
        } @else {
            border-bottom-right-radius: map-get($border-radiuses, $size);
        }
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
                file: "00_Abstracts/mixins/_display.scss",
                content: `@mixin full-width($important: false) {
    @if ($important == true) {
        position: relative !important;
        left: 50% !important;
        right: 50% !important;
        width: 100vw !important;
        margin-left: -50vw !important;
        margin-right: -50vw !important;
        max-width: 100vw !important;
    } @else {
        position: relative;
        left: 50%;
        right: 50%;
        width: 100vw;
        margin-left: -50vw;
        margin-right: -50vw;
        max-width: 100vw;
    }
}

@mixin full-height($important: false) {
    @if ($important == true) {
        position: fixed !important;
        top: 50% !important;
        bottom: 50% !important;
        height: 100vh !important;
        margin-top: -50vh !important;
        margin-bottom: -50vh !important;
        max-height: 100vh !important;
    } @else {
        position: fixed;
        top: 50%;
        bottom: 50%;
        height: 100vh;
        margin-top: -50vh;
        margin-bottom: -50vh;
        max-height: 100vh;
    }
}

@mixin full-screen($important: false) {
    @include full-width($important);
    @include full-height($important);
}

@mixin screen-reader-only {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
}  
`
            },
            {
                file: "00_Abstracts/mixins/_font-sizes.scss",
                content: `@import '../variables';

@mixin font-size($size, $important: false) {
    @if map-has-key($font-sizes, $size) {
        @if ($important == true) {
            font-size: map-get($font-sizes, $size) !important;
        } @else {
            font-size: map-get($font-sizes, $size);
        }
    } 
    @else {
        @error "Invalid font size: '#{$size}'.";
    }
}    
`
            },
            {
                file: "00_Abstracts/mixins/_font.scss",
                content: `@import '../variables';

@mixin font($font: base, $important: false) {
    @if map-has-key($fonts, $font) {
        @if ($important == true) {
            font-family: unquote(map-get($fonts, $font)) !important;
        } @else {
            font-family: unquote(map-get($fonts, $font));
        }
    } 
    @else {
        @error "Invalid shadow size: '#{$font}'.";
    }
} 
                    `
            },
            {
                file: "00_Abstracts/mixins/_colors.scss",
                content: `@import '../functions/colors';

@mixin bg-color($name: 'primary', $variant: 'base', $opacity: 1, $important: false) {
    @if ($important) {
        color: text-color($name, $variant, $opacity) !important;
        background-color: color($name, $variant, $opacity) !important;
    }

    @else {
        color: text-color($name, $variant, $opacity);
        background-color: color($name, $variant, $opacity);
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

@mixin m($top, $right: $top, $bottom: $top, $left: $right, $important: false) {
    @include mt($top, $important);
    @include mb($bottom, $important);
    @include ml($left, $important);
    @include mr($right, $important);
}

@mixin mx($left, $right: $left, $important: false) {
    @include ml($left, $important);
    @include mr($right, $important);
}

@mixin my($top, $bottom: $top, $important: false) {
    @include mt($top, $important);
    @include mb($bottom, $important);
}

@mixin ml($size, $important: false) {
    margin-left: spacing($size);
}

@mixin mt($size, $important: false) {
    margin-top: spacing($size);
}

@mixin mr($size, $important: false) {
    margin-right: spacing($size);
}

@mixin mb($size, $important: false) {
    margin-bottom: spacing($size);
}

@mixin p($top, $right: $top, $bottom: $top, $left: $right, $important: false) {
    @include pt($top, $important);
    @include pb($bottom, $important);
    @include pl($left, $important);
    @include pr($right, $important);
}

@mixin px($left, $right: $left, $important: false) {
    @include pl($left, $important);
    @include pr($right, $important);
}

@mixin py($top, $bottom: $top, $important: false) {
    @include pt($top, $important);
    @include pb($bottom, $important);
}

@mixin pl($size, $important: false) {
    padding-left: spacing($size, $important);
}

@mixin pt($size, $important: false) {
    padding-top: spacing($size, $important);
}

@mixin pr($size, $important: false) {
    padding-right: spacing($size, $important);
}

@mixin pb($size, $important: false) {
    padding-bottom: spacing($size, $important);
}
`
            },
            {
                file: "00_Abstracts/mixins/_shadows.scss",
                content: `@import '../variables';

@mixin shadow($size: sm, $important: false) {
    @if map-has-key($shadows, $size) {
        @if ($important == true) {
            box-shadow: unquote(map-get($shadows, $size)) !important;
        } @else {
            box-shadow: unquote(map-get($shadows, $size));
        }
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

@mixin transition-ease-in-out($speed: fast, $important: false) {
    @if map-has-key($transitions, $speed) {
        @if ($important == true) {
            transition: all map-get($transitions, $speed) ease-in-out !important;
        } @else {
            transition: all map-get($transitions, $speed) ease-in-out;
        }
    } 
    @else {
        @error "Invalid transition speed: '#{$speed}'.";
    }
}    
`
            },
            {
                file: "00_Abstracts/mixins/_z-index.scss",
                content: `@import '../variables';

@mixin z-index($size, $important: false) {
    @if map-has-key($z-indexes, $size) {
        @if ($important == true) {
            z-index: map-get($z-indexes, $size) !important;
        }
        @else {
            z-index: map-get($z-indexes, $size);
        }
    }
    @else {
        @error "Invalid z-index: '#{$size}'.";
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
@import 'mixins/colors';
@import 'mixins/display';
@import 'mixins/font';
@import 'mixins/font-sizes';
@import 'mixins/hover';
@import 'mixins/shadows';
@import 'mixins/spacing';
@import 'mixins/transitions';  
@import 'mixins/z-index';                
`
            },
            {
                file: "01_Base/_base.scss",
                content: `@import '../00_Abstracts/index';
    
html,
body {
    font-size: $font-size-base;
    line-height: $line-height-base;
    @include font(base);

    main {
        max-width: $content-width;
        @include mx(auto);
    }

    code,
    pre {
        @include font(monospace);
    }
}                            
`
            },
            {
                file: "01_Base/index.scss",
                content: `@import 'base';`
            }
        ]
    },
    {
        format: "sass",
        styles: [
            {
                file: "00_Abstracts/_variables.sass",
                content: `// CONTAINERS

$content-width: 600px !default

//   FONTS

$font-size-base: 16px !default

$fonts: (accent: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, Noto Sans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', base: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, Noto Sans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', monospace: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace') !default

$font-sizes: ( xxs: 0.75rem, xs: 0.875rem, sm: 1rem, md: 1.25rem, lg: 1.5rem, xl: 2rem, xxl: 3rem) !default

$line-height-base: 1.5 !default

// SPACING

$spacing-sizes: ( auto: auto, none: 0, 3xs: 0.0625rem, xxs: 0.125rem, xs: 0.25rem, sm: 0.5rem, md: 0.75rem, lg: 1rem, xl: 1.25rem, xxl: 2rem) !default

// COLORS

$theme-colors: (primary: #24598d, secondary: #117d47, success: #669c1f, info: #509BCE, warning: #B88A00, danger: #c70000, light: #ababab, dark: #545454) !default

$color-variation: 8% !default


// BREAKPOINTS

$breakpoints: (xxs: 20rem, xs: 30rem, sm: 48rem, md: 62rem, lg: 75rem, xl: 90rem) !default

// Z-INDEX

$z-indexes: (sub: -1, none: 0, xxs: 1, xs: 10, sm: 50, md: 100, lg: 200, xl: 500, trump: 99999) !default;

// BORDERS

$border: (style: solid, size: 3xs, color: light lighter) !default

$border-radiuses: (none: 0, sm: 0.25rem, md: 0.5rem, lg: 0.75rem, pill: 10rem, circle: 50%) !default

//  SHADOWS

$shadows: (none: none, inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)", outline: "0 0 0 3px rgba(0, 0, 0, 0.5)", xs: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)", sm: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)", md: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)", lg: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)", xl: "0 25px 50px -12px rgba(0, 0, 0, 0.25)") !default

//  TRANSITIONS

$transitions: (slow: .5s, med: .3s, fast: .1s) !default
`
            },
            {
                file: '00_Abstracts/functions/_borders.sass',
                content: `@import '../variables'
@import 'colors'

@function default-border($setting)
    @if map-has-key($border, $setting)
        @return map-get($border, $setting)
    @else
        @error "Invalid default border value: '#{$setting}'."

@function border($style, $size, $color, $variant: base, $opacity: 1, $important: false)
    @if ($important == true)
        @return $style spacing($size) split-color-list($color, $variant, $opacity) !important
    @else
        @return $style spacing($size) split-color-list($color, $variant, $opacity)
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

    @if (type-of($variant) == 'number')
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

@function get-contrast-ratio($backgroundColor, $foregroundColor)
    $backgroundLuminance: get-luminance($backgroundColor) + .05
    $foregroundLuminance: get-luminance($foregroundColor) + .05

    @return max($backgroundLuminance, $foregroundLuminance) / min($backgroundLuminance, $foregroundLuminance)
    
@function get-contrast-color($color) 
    $lightContrast: get-contrast-ratio($color, white)
    $darkContrast: get-contrast-ratio($color, black)

    @if ($lightContrast > 4.5 or $darkContrast < 4.5)
        @return white

    @return black

// Used for splitting up color blocks - ex: "primary dark 0.75"
@function split-color-list($color, $variant: base, $opacity: 1)
    @if (length($color) > 1)
        $g-color: nth($color, 1)
        $g-variant: nth($color, 2)
        $g-opacity: 1

        @if (length($color) > 2)
            $g-opacity: nth($color, 3)

        @return color($g-color, $g-variant, $g-opacity)
    @else
        @return color($color, $variant, $opacity);
`
            },
            {
                file: "00_Abstracts/functions/_math.sass",
                content: `@function pow($base, $exponent, $precision: 12)
    @if (floor($exponent) !=$exponent)
        $precision2: pow(10, $precision)
        $exponent: round($exponent * $precision2)
        $denominator: greatest-common-divisor($exponent, $precision2)
        @return nthRoot(pow($base, $exponent / $denominator), $precision2 / $denominator, $precision)

    $value: $base

    @if $exponent>1
        @for $i from 2 through $exponent
            $value: $value * $base;
    @else if $exponent < 1
        @for $i from 0 through -$exponent
            $value: $value / $base;

    @return $value

@function greatest-common-divisor($a, $b)
    @if ($b !=0)
        @return greatest-common-divisor($b, $a % $b)
    @else 
        @return abs($a)

@function nthRoot($num, $n: 2, $precision: 12)
    $x: 1

    @for $i from 0 through $precision
        $x: 1 / $n * (($n - 1) * $x + ($num / pow($x, $n - 1)))

    @return $x
`
            },
            {
                file: "00_Abstracts/functions/_strings.sass",
                content: `@function str-replace($string, $search, $replace: '')
    $index: str-index($string, $search)

    @if $index
        @return str-slice($string, 1, $index - 1) + $replace + str-replace(str-slice($string, $index + str-length($search)), $search, $replace)

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

@function spacing($name, $important: flase)
    $prefix: ""

    // This enables negative values to be used.
    @if (str-contains($name, "-"))
        $prefix: "-";
        $name: str-replace($name, "-", "")

    @if map-has-key($spacing-sizes, $name)
        @if ($important == true)
            @return unquote($prefix + map-get($spacing-sizes, $name)) !important
        @else
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
                content: `@import '../variables';

@mixin radius($size, $important: false)
    @include radius-t($size, $important)
    @include radius-b($size, $important)

@mixin radius-t($size, $important: false) 
    @include radius-tl($size, $important)
    @include radius-tr($size, $important)

@mixin radius-b($size, $important: false)
    @include radius-bl($size, $important)
    @include radius-br($size, $important)

@mixin radius-l($size, $important: false)
    @include radius-tl($size, $important)
    @include radius-bl($size, $important)

@mixin radius-r($size, $important: false)
    @include radius-tr($size, $important)
    @include radius-br($size, $important)

@mixin radius-tl($size, $important: false)
    @if map-has-key($border-radiuses, $size)
        @if ($important == true)
            border-top-left-radius: map-get($border-radiuses, $size) !important
        @else
            border-top-left-radius: map-get($border-radiuses, $size)
    @else
        @error "Invalid border-radius size: '#{$size}'."

@mixin radius-tr($size, $important: false)
    @if map-has-key($border-radiuses, $size)
        @if ($important == true)
            border-top-right-radius: map-get($border-radiuses, $size) !important
        @else
            border-top-right-radius: map-get($border-radiuses, $size)
    @else
        @error "Invalid border-radius size: '#{$size}'."

@mixin radius-bl($size, $important: false)
    @if map-has-key($border-radiuses, $size)
        @if ($important == true)
            border-bottom-left-radius: map-get($border-radiuses, $size) !important
        @else
            border-bottom-left-radius: map-get($border-radiuses, $size)
    @else
        @error "Invalid border-radius size: '#{$size}'."

@mixin radius-br($size, $important: false)
    @if map-has-key($border-radiuses, $size)
        @if ($important == true)
            border-bottom-right-radius: map-get($border-radiuses, $size) !important
        @else
            border-bottom-right-radius: map-get($border-radiuses, $size)
    @else
        @error "Invalid border-radius size: '#{$size}'."
`
            },
            {
                file: "00_Abstracts/mixins/_borders.sass",
                content: `@import '../functions/borders';

@mixin border($style: default-border(style), $size: default-border(size), $color: default-border(color), $variant: base, $opacity: 1, $important: false)
    border: border($style, $size, $color, $variant, $opacity, $important)

@mixin border-t($style: default-border(style), $size: default-border(size), $color: default-border(color), $variant: base, $opacity: 1, $important: false)
    border-top: border($style, $size, $color, $variant, $opacity, $important);

@mixin border-b($style: default-border(style), $size: default-border(size), $color: default-border(color), $variant: base, $opacity: 1, $important: false)
    border-bottom: border($style, $size, $color, $variant, $opacity, $important)

@mixin border-l($style: default-border(style), $size: default-border(size), $color: default-border(color), $variant: base, $opacity: 1, $important: false)
    border-left: border($style, $size, $color, $variant, $opacity, $important)

@mixin border-r($style: default-border(style), $size: default-border(size), $color: default-border(color), $variant: base, $opacity: 1, $important: false)
    border-right: border($style, $size, $color, $variant, $opacity, $important)

@mixin border-x($style: default-border(style), $size: default-border(size), $color: default-border(color), $variant: base, $opacity: 1, $important: false)
    @include border-l($style, $size, $color, $variant, $opacity, $important)
    @include border-r($style, $size, $color, $variant, $opacity, $important)

@mixin border-y($style: default-border(style), $size: default-border(size), $color: default-border(color), $variant: base, $opacity: 1, $important: false)
    @include border-t($style, $size, $color, $variant, $opacity, $important)
    @include border-b($style, $size, $color, $variant, $opacity, $important)
`
            },
            {
                file: "00_Abstracts/mixins/_breakpoints.sass",
                content: `@import '../variables'
    
//    BREAKPOINT ABOVE
//
//    Usage:
//        @include breakpoint-above(sm) 
@mixin breakpoint-above($breakpoint) 
    @if map-has-key($breakpoints, $breakpoint) 
        $breakpoint-value: map-get($breakpoints, $breakpoint)

        @media (min-width: $breakpoint-value) 
            @content
    @else 
        @warn "Invalid breakpoint: '#{$breakpoint}'."


//    BREAKPOINT BELOW
//
//    Usage:
//        @include breakpoint-below(sm) 
@mixin breakpoint-below($breakpoint) 
    @if map-has-key($breakpoints, $breakpoint) 
        $breakpoint-value: map-get($breakpoints, $breakpoint)

        @media (max-width: ($breakpoint-value - 1)) 
            @content
    @else 
        @warn "Invalid breakpoint: '#{$breakpoint}'."


//    BREAKPOINT BETWEEN
//
//    Usage:
//        @include breakpoint-between(sm, md) 
@mixin breakpoint-between($lower, $upper) 
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
                file: "00_Abstracts/mixins/_display.sass",
                content: `@mixin full-width($important: false)
    @if ($important == true)
        position: relative !important
        left: 50% !important
        right: 50% !important
        width: 100vw !important
        margin-left: -50vw !important
        margin-right: -50vw !important
        max-width: 100vw !important
    @else
        position: relative
        left: 50%
        right: 50%
        width: 100vw
        margin-left: -50vw
        margin-right: -50vw
        max-width: 100vw

@mixin full-height($important: false)
    @if ($important == true)
        position: fixed !important
        top: 50% !important
        bottom: 50% !important
        height: 100vh !important
        margin-top: -50vh !important
        margin-bottom: -50vh !important
        max-height: 100vh !important
    @else
        position: fixed
        top: 50%
        bottom: 50%
        height: 100vh
        margin-top: -50vh
        margin-bottom: -50vh
        max-height: 100vh

@mixin full-screen($important: false)
    @include full-width(true)
    @include full-height(true)

@mixin screen-reader-only
    position: absolute !important
    width: 1px !important
    height: 1px !important
    padding: 0 !important
    margin: -1px !important
    overflow: hidden !important
    clip: rect(0, 0, 0, 0) !important
    white-space: nowrap !important
    border: 0 !important
`
            },
            {
                file: "00_Abstracts/mixins/_font-sizes.sass",
                content: `@import '../variables'
        
@mixin font-size($size) 
    @if map-has-key($font-sizes, $size) 
        @if ($important == true)
            font-size: map-get($font-sizes, $size) !important
        @else
            font-size: map-get($font-sizes, $size)
    @else 
        @error "Invalid font size: '#{$size}'."
`
            },
            {
                file: "00_Abstracts/mixins/_font.sass",
                content: `@import '../variables';

@mixin font($font: base, $important: false)
    @if map-has-key($fonts, $font)
        @if ($important == true)
            font-family: unquote(map-get($fonts, $font)) !important;
        @else
            font-family: unquote(map-get($fonts, $font));
    @else 
        @error "Invalid shadow size: '#{$font}'.";
`
            },
            {
                file: "00_Abstracts/mixins/_colors.sass",
                content: `@import '../functions/colors';

@mixin bg-color($name: 'primary', $variant: 'base', $opacity: 1, $important: false)
    @if ($important)
        color: text-color($name, $variant, $opacity) !important
        background-color: color($name, $variant, $opacity) !important

    @else
        color: text-color($name, $variant, $opacity);
        background-color: color($name, $variant, $opacity);
`
            },
            {
                file: "00_Abstracts/mixins/_hover.sass",
                content: `@mixin hover 
    &:hover 
        @content

@mixin hover-focus 
    &:hover,
    &:focus 
        @content

@mixin hover-focus-active 
    &:hover,
    &:focus,
    &:active 
        @content
`
            },
            {
                file: "00_Abstracts/mixins/_spacing.sass",
                content: `@import '../variables';
@import '../functions/spacing';

@mixin m($top, $right: $top, $bottom: $top, $left: $right, $important: false)
    @include mt($top, $important)
    @include mb($bottom, $important)
    @include ml($left, $important)
    @include mr($right, $important)

@mixin mx($left, $right: $left, $important: false)
    @include ml($left, $important)
    @include mr($right, $important)

@mixin my($top, $bottom: $top, $important: false)
    @include mt($top, $important)
    @include mb($bottom, $important)

@mixin ml($size, $important: false)
    margin-left: spacing($size)

@mixin mt($size, $important: false)
    margin-top: spacing($size)

@mixin mr($size, $important: false)
    margin-right: spacing($size)

@mixin mb($size, $important: false)
    margin-bottom: spacing($size)

@mixin p($top, $right: $top, $bottom: $top, $left: $right, $important: false)
    @include pt($top, $important)
    @include pb($bottom, $important)
    @include pl($left, $important)
    @include pr($right, $important)

@mixin px($left, $right: $left, $important: false)
    @include pl($left, $important)
    @include pr($right, $important)

@mixin py($top, $bottom: $top, $important: false)
    @include pt($top, $important)
    @include pb($bottom, $important)

@mixin pl($size, $important: false)
    padding-left: spacing($size, $important)

@mixin pt($size, $important: false)
    padding-top: spacing($size, $important)

@mixin pr($size, $important: false)
    padding-right: spacing($size, $important)

@mixin pb($size, $important: false)
    padding-bottom: spacing($size, $important)
`
            },
            {
                file: "00_Abstracts/mixins/_shadows.sass",
                content: `@import '../variables'
    
@mixin shadow($size: sm) 
    @if map-has-key($shadows, $size)
        @if ($important == true)
            box-shadow: unquote(map-get($shadows, $size)) !important
        @else
            box-shadow: unquote(map-get($shadows, $size))
    @else
        @error "Invalid shadow size: '#{$size}'."
`
            },
            {
                file: "00_Abstracts/mixins/_transitions.sass",
                content: `@import '../variables'
    
@mixin transition-ease-in-out($speed: fast) 
    @if map-has-key($transitions, $speed) 
        @if ($important == true)
            transition: all map-get($transitions, $speed) ease-in-out !important
        @else
            transition: all map-get($transitions, $speed) ease-in-out
    @else 
        @error "Invalid transition speed: '#{$speed}'."
`
            },
            {
                file: "00_Abstracts/mixins/_z-index.sass",
                content: `@import '../variables';

@mixin z-index($size, $important: false)
    @if map-has-key($z-indexes, $size)
        @if ($important == true)
            z-index: map-get($z-indexes, $size) !important
        @else
            z-index: map-get($z-indexes, $size)
    @else
        @error "Invalid z-index: '#{$size}'."
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
@import 'mixins/colors'
@import 'mixins/display'
@import 'mixins/font'
@import 'mixins/font-sizes'
@import 'mixins/hover'
@import 'mixins/shadows'
@import 'mixins/spacing'
@import 'mixins/transitions'
@import 'mixins/z-index'
`
            },
            {
                file: "01_Base/_base.sass",
                content: `@import '../00_Abstracts/index';
    
html,
body
    font-size: $font-size-base
    line-height: $line-height-base
    @include font(base)

    main
        max-width: $content-width
        @include mx(auto)

    code,
    pre
        @include font(monospace)
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
