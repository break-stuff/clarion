<template>
    <div>
        <h1>Custom Bootstrap Themes Using Clarion</h1>

        <p>Bootstrap is the most popular the world's most popular front-end component library. It provides you with an incredible responsive grid system, extensive prebuilt components, and powerful plugins built on jQuery. Creating sites with is is fast and easy. Combining it with the Clarion Style Architecture will make customizing your site scalable and easy to maintain.</p>

        <h2>Starting Your Project</h2>
        <p>Before you get started, make sure Clarion is installed:</p>
        <p>
            <code>npm install -g clarion</code>
        </p>

        <p>Create a new project using the Clarion CLI:</p>
        <pre>
clarion new
cd &lt;your-project&gt;
</pre>

        <p>Install Bootstrap (we will be using version 4 for this example):</p>
        <p>
            <code>npm install bootstrap --save</code>
        </p>

        <h2>Adding Bootstrap to Your Project</h2>
        <p>
            In order to add Bootstrap so it does not clash with the rest of your styles, add the following import statement to your manifest (
            <code>index.scss</code>) file in the
            <code>vendors</code> directory:
        </p>
        <p>
            <code>@import "~bootstrap/scss/bootstrap";</code>
        </p>

        <p>Now, any styles that are added will override the default Bootstrap styles so you can easily customize the library to fit your needs.</p>

        <h2>Customize Bootstrap</h2>

        <p>
            One of the great things about Bootstrap 4 is that all of the variables used in their
            <code>SASS</code> files use the
            <code>!default</code> attribute. This means that if you set a value to a variable with the same name Bootstrap will automatically take your value over the value defined in the framework. Now customizing things like colors is incredibly easy!
        </p>

        <p>For example, the variables for colors in Bootstrap 4 look like this:</p>

        <pre>
$blue:    #007bff !default;
$indigo:  #6610f2 !default;
$purple:  #6f42c1 !default;
$pink:    #e83e8c !default;
$red:     #dc3545 !default;
$orange:  #fd7e14 !default;
$yellow:  #ffc107 !default;
$green:   #28a745 !default;
$teal:    #20c997 !default;
$cyan:    #17a2b8 !default;
    
$theme-colors: (
  primary: $blue,
  secondary: $gray-600,
  success: $green,
  info: $cyan,
  warning: $yellow,
  danger: $red,
  light: $gray-100,
  dark: $gray-800
) !default;
</pre>

        <p>
            Now you can easily override this by creating a colors file in your Abstracts directory (
            <code>clarion add abstract colors</code>), pasting in this code, and changing the color values (make sure you remove the
            <code>!default</code> attribute in your code). The entire framework will now adopt your new color scheme.
        </p>

        <h2>SASS Mixins and Functions</h2>

        <p>You can also inject Bootstrap's SASS mixins and funtions by adding a reference to them in to your
            <code>00_Abstracts</code> directory (either explicitly in their own file or directly in the manifest file). This will give you access to that functionality throughout your project.
        </p>

        <p>For exaple, of you wanted to leverage Bootstrap's mixin for media queries, you could add a reference to that SCSS file (
            <code>@import '~/bootstrap/scss/mixins/breakpoints'</code>) and begin using the
            <code>media-breakpoint-down(), media-breakpoint-between(), and media-breakpoint-only()</code> anywhere in your SCSS project.
        </p>

        <h2>Conclusion</h2>

        <p>The new Bootstrap 4 framework is incredible flexible and Clarion allows you to take advantage in a way that helps you stay organized and with minimal effort.</p>
    </div>
</template>

<script>
export default {
    name: 'BootstrapExample',
    layout: 'examples',
    head: {
        title: 'Bootstrap Themes Using Clarion',
        meta: [
            {
                hid: 'description',
                name: 'description',
                content:
                    'See how to use the Clarion CLI and style framework to create Bootstrap themes.'
            },
            {
                hid: 'og:description',
                name: 'og:description',
                content:
                    'See how to use the Clarion CLI and style framework to create Bootstrap themes.'
            },
            {
                hid: 'og:url',
                name: 'og:url',
                content: 'https://projectclarion.com/examples/bootstrap'
            }
        ]
    }
};
</script>
