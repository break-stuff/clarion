<template>
    <div class="new-project">
        <h1>Start Your Project</h1>
        <p>After installing the Clarion CLI running the following command will provide you with the default project:</p>
        <code>clarion new ProjectName</code>
        <br>
        <br>
        <p>The default project comes pre-configured for SASS using the .scss format and WebPack as the compiler and bundler. There are some additional features that come out-of-the-box for you to help simplify your development process.</p>

        <h2>Options</h2>
        <p>One fo the great things about the Clarion CLI is the amount of flexibility you have with your project tooling. There are so many options on the tools to use in your projects, it can be very overwhelming. The objective of Clarion CLI is to help simplify that process and reduce the time to start-up a new project.</p>

        <h3>Project Contents</h3>

        <h4>Starter Project</h4>
        <p>If you are starting an application from scratch, this is a great boilerplate! This will install the style architecture, the style framwork, as well as any task runners/bundlers and optimizers needed to begin developing a web application.</p>

        <p>In the Starter Project the following tools will also be installed to optimize your code:</p>

        <h5>PostCSS</h5>
        <p>PostCSS is a post-compiler for your CSS. This allows additional functionality to be added to your styles without needing additional work on your end. PostCSS transforms styles with JS plugins. These plugins can lint your CSS, support variables and mixins, transpile future CSS syntax, inline images, and more.</p>

        <h6>Autoprefixer</h6>
        <p>Autoprefixer is a plugin to parse CSS and add vendor prefixes to CSS rules using values from
            <a href="http://caniuse.com">Can I Use</a>. This will help make your application more consistent across each browser.
        </p>

        <h6>CSSNano</h6>
        <p>CSSNano takes your nicely formatted CSS and runs it through many focused optimizations, to ensure that the final result is as small as possible for a production environment.</p>

        <h6>Pixrem</h6>
        <p>Pixrem is a CSS post-processor that, given CSS and a root em (rem) value, returns CSS with pixel unit fallbacks or replacements. It's based on browser data so only needed fallbacks will be added. Basically, it's for IE8 or less, and for IE9 &amp; IE10 in the font shorthand property and in pseudo-elements.</p>


        <h4>Styles Only (Coming Soon!)</h4>
        <p>This will only install the style architecture as well as the style framwork. If you are using a front-end framework or your team has a specific architecture pattern, this will allow you leverage the style architecture while still adhering to an existing specifications.</p>

        <h4>Architecture Only</h4>
        <p>This option will only scaffold out the style architecture and will not contain any of the style framework code.</p>

        <h3>Style Format</h3>

        <h4>SCSS</h4>
        <p>This will configure the style files to use .scss format. This is a SASS format. Many people prefer this format as the syntax is more consistent with standard CSS. This syntax is great for those who are starting out with SASS.</p>

        <h4>SASS</h4>
        <p>This will configure the style files to use .sass format. This is also (obviously) a SASS format. This is more of a minimalist approach for writing SASS.</p>

        <h4>LESS</h4>
        <p>This will configure the style files to use .sass format.</p>

        <h3>Bundlers and Task Runners</h3>

        <h4>Webpack</h4>
        <p>Webpack is the default bundler for your project. Webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset. This project uses
            <strong>webpack</strong> and
            <strong>webpack-dev-server</strong> CLI tools and will need to be installed (
            <code>npm i -g webpack webpack-dev-server</code>).
        </p>

        <h4>Parcel</h4>
        <p>Parcel is a web application bundler, differentiated by its developer experience. It offers blazing fast performance utilizing multicore processing, and requires zero configuration. This project uses the
            <strong>parcel</strong> CLI tool and will need to be installed (
            <code>npm i -g parcel-bundler</code>).
        </p>

        <h4>Gulp</h4>
        <p>Gulp is a task runner built on Node.js and npm, used for automation of time-consuming and repetitive tasks involved in web development like minification, concatenation, cache busting, unit testing, linting, optimization etc. This project uses the
            <strong>gulp</strong> CLI tool and will need to be installed (
            <code>npm i -g gulp-cli</code>).
        </p>

        <h4>Grunt</h4>
        <p>Grunt is also a task runner similar to Gulp and is used to automatically perform frequently used tasks such as minification, compilation, unit testing, linting, etc. It uses a command-line interface to run custom tasks defined in a file (known as a Gruntfile). This project uses the
            <strong>grunt</strong> CLI tool and will need to be installed (
            <code>npm i -g grunt-cli</code>).
        </p>
    </div>
</template>

<script>
export default {
    name: 'NewProject',
    layout: 'documentation',
    head: {
        title: 'Start Your Project with Clarion',
        meta: [
            {
                hid: 'description',
                name: 'description',
                content:
                    'Whether you are making a small static site or a complext enterprise application, the Clarion style architecture and style framework will make managing your styles easier.'
            },
            {
                hid: 'og:description',
                property: 'og:description',
                content:
                    'Whether you are making a small static site or a complext enterprise application, the Clarion style architecture and style framework will make managing your styles easier.'
            },
            {
                hid: 'og:url',
                property: 'og:url',
                content: 'https://projectclarion.com/new'
            },
            {
                hid: 'og:title',
                property: 'og:title',
                content: 'Start Your Project with Clarion'
            }
        ]
    }
};
</script>
