"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectData = {
    styleDirectories: [
        {
            name: "00_Abstracts",
            readMe: '# Abstracts\n\nThis folder is for your style tools and helpers used across the project. Your reusable code such as global variables, functions, mixins and placeholders should be put in here.\n\nThe code contained in this folder should not be code that outputs CSS directly.\n\nWith larger projects you may want to break this into subdirectories like variables, functions, and mixins. Subdirectories are supported in the Clarion CLI.'
        },
        {
            name: "01_Base",
            readMe: '# Base\n\nThis folder holds the boilerplate code for the project. You would add your reset files and typographic rules. Keep in mind that most front-end frameworks like Bootstrap and Foundation already have their own CSS resets built into their styles, so additional resets may not be necessary.'
        },
        {
            name: "02_Vendors",
            readMe: '# Vendors\n\nThe Themes folder contains third-party themes for your website and for things like styles for plugins. This folder has been added higher in the architecture so that if you would like to create customizations, you can do so in the subsequent folders like Components, Layouts, and Pages. This will allow you to override the theme\'s rules without modifying the theme directly and ruining the integrity of the code.'
        },
        {
            name: "03_Elements",
            readMe: '# Elements\n\nThe Elements folder is for styling specific elements such as links, buttons, form inputs, and header tags. These are the smallest building blocks in the web and cannot be broken up into smaller parts. Browsers, by default, have their own styling in place for these elements, but tend to be inconsistent. Because of this, adding a reset to the 01_Base directory or adding one to the build pipeline is recommended.'
        },
        {
            name: "04_Components",
            readMe: '# Components\n\nComponents are groups of elements. This can be things like a search box, navbar, or carousel. These groups of elements together have a specific purpose.'
        },
        {
            name: "05_Layouts",
            readMe: '# Layouts\n\nThis folder contains everything that takes part in laying out the web site or application. These could be containers used for organizing elements and components within them like like a header, footer, or sidebar. This could also be used for your grid-system.'
        },
        {
            name: "06_Pages",
            readMe: '# Pages\n\nThis folder is for any page-specific styles, if you have any. Some sites may have custom styling for the Home page or the Contact Us page.'
        },
        {
            name: "07_Utilities",
            readMe: '# Utilities\n\nThe Utilities are used to create overrides or call out specific rules for an elements or components. For example, you could have a class for making text bold or aligning it to the right. The rule of thumb is to make it specific and make it simple.'
        }
    ],
    styleTypes: [
        "less",
        "sass",
        "scss"
    ],
    projectDirectories: [
        './%%projectName%%/dist',
        './%%projectName%%/src',
        './%%projectName%%/src/scripts',
        './%%projectName%%/src/scripts/components',
        './%%projectName%%/src/scripts/services'
    ],
    packageJson: {
        name: '',
        version: "0.1.0",
        description: "",
        main: "index.js",
        scripts: {},
        keywords: [],
        author: "",
        license: "ISC",
    },
    clarionConfig: {
        paths: {
            styles: './src',
            scripts: './src'
        },
        format: {
            styles: 'scss',
            scripts: 'js'
        },
        addToManifest: "true",
        importAbstracts: "true"
    },
    postCssConfig: {
        plugins: {
            autoprefixer: {},
            cssnano: {},
            pixrem: {}
        }
    },
    grunt: {
        configFile: 'gruntfile.js',
        devDependencies: [
            "autoprefixer",
            "cssnano",
            "pixrem",
            "grunt",
            "grunt-postcss",
            "grunt-contrib-watch",
            "grunt-contrib-connect",
            "cross-env"
        ],
        lessDependencies: [
            'grunt-contrib-less'
        ],
        sassDependencies: [
            'grunt-sass'
        ],
        npmCommands: {
            "dev": "cross-env NODE_ENV=development grunt dev",
            "build": "cross-env NODE_ENV=production grunt build"
        },
        configContents: `
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        %%styleFormat%%: {
            dist: {
                files: {
                    'dist/styles.css': 'src/%%styleFormat%%/styles.%%extension%%'
                }
            }
        },
        watch: {
            css: {
                files: '**/*.%%extension%%',
                tasks: [
                    '%%styleFormat%%'
                ]
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')(),
                    require('cssnano')(),
                    require('pixrem')()
                ]
            },
            dist: {
                src: 'css/*.css'
            }
        },
        connect: {
            uses_defaults: {}
        }
    });
    grunt.loadNpmTasks('grunt-%%styleFormat%%');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.registerTask('dev', ['%%styleFormat%%', 'connect', 'watch']);
    grunt.registerTask('build', ['%%styleFormat%%']);
}`
    },
    gulp: {
        configFile: 'gulpfile.js',
        devDependencies: [
            "autoprefixer",
            "cssnano",
            "pixrem",
            "cross-env",
            "gulp",
            "gulp-postcss",
            "gulp-webserver",
            "gulp-sourcemaps"
        ],
        lessDependencies: [
            'gulp-less'
        ],
        sassDependencies: [
            'gulp-sass'
        ],
        npmCommands: {
            "dev": "cross-env NODE_ENV=development gulp dev",
            "build": "cross-env NODE_ENV=production gulp build"
        },
        configContents: `'use strict';

var gulp = require('gulp');
var %%styleFormat%% = require('gulp-%%styleFormat%%');
var postcss = require('gulp-postcss');
var webserver = require('gulp-webserver');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('dev', ['%%styleFormat%%', '%%styleFormat%%:watch', 'webserver'])

gulp.task('build', ['%%styleFormat%%'])

gulp.task('webserver', function() {
    gulp.src('.')
        .pipe(webserver({
            livereload:       true,
            directoryListing: false,
            open:             true
        }));
});
    
gulp.task('%%styleFormat%%', function () {
    return gulp.src('./src/%%styleFormat%%/styles.%%extension%%')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('%%styleFormat%%:watch', function () {
    gulp.watch('./src/%%styleFormat%%/**/*.%%extension%%', ['%%styleFormat%%']);
});`
    },
    parcel: {
        configFile: null,
        devDependencies: [
            "autoprefixer",
            "cssnano",
            "pixrem",
            "cross-env",
        ],
        lessDependencies: [],
        sassDependencies: [],
        npmCommands: {
            "dev": "cross-env NODE_ENV=development parcel index.html",
            "build": "cross-env NODE_ENV=production parcel build index.html -d ./dist"
        },
        configContents: null
    },
    webpack: {
        configFile: 'webpack.config.js',
        devDependencies: [
            "autoprefixer",
            "pixrem",
            "css-loader",
            "style-loader",
            "cross-env",
            "extract-text-webpack-plugin",
            "postcss-loader",
            "webpack",
            "webpack-cli",
            "webpack-dev-server",
            "cssnano",
        ],
        lessDependencies: [
            'less-loader'
        ],
        sassDependencies: [
            'node-sass',
            'sass-loader'
        ],
        npmCommands: {
            "dev": "cross-env NODE_ENV=development webpack-dev-server --progress --open --hot --mode development",
            "build": "cross-env NODE_ENV=production webpack --progress --hide-modules -p --mode production"
        },
        configContents: `//var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './src/scripts/main.js',
    output: {
        filename: 'scripts.js'
    },
    module: {
        rules: [
            {
                test: /\.%%extension%%$/,
                use: [{
                    loader: 'style-loader'
                  },
                  {
                    loader: 'css-loader'
                  },
                  {
                    loader: 'sass-loader'
                  },
                  {
                    loader: 'postcss-loader'
                  }
                ]
            }
        ]
    },
//    plugins: [
//    devtool: "source-map",
//        new ExtractTextPlugin("./dist/styles.css")
//    ]
}`
    },
    indexHtml: `<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Clarion</title>
        <link rel="stylesheet" href="%%cssDir%%">
    </head>
    
    <body>
        <h1>Congratulations! You did it!</h1>
        <img src="https://media.giphy.com/media/2xO491sY6f0cM/giphy.gif" alt="tobias huzzah!">
        <h2>This page is intentionally ugly!</h2>
        <p>Create some styles and start having fun!</p>
        <ul>
            <li>Modify headings by creating a headings file: <code>clarion add element headings</code>.</li>
            <li>Modify paragraphs by creating a paragraphs file: <code>clarion add element paragraphs</code>.</li>
        </ul>
        <h3>Here is some sweet, sweet dummy text to play with. Enjoy!</h3>
        <p>Bacon ipsum dolor amet ball tip hamburger adipisicing chicken prosciutto non. Shoulder venison quis, flank leberkas turducken dolor tenderloin nostrud. Ham strip steak swine boudin tempor. Shoulder doner mollit brisket. Cillum strip steak picanha kevin et culpa commodo lorem pastrami.</p>
        <p>Elit est ut prosciutto sausage spare ribs tenderloin pork loin cupidatat brisket dolore pancetta occaecat. Elit meatball leberkas burgdoggen ham hock beef ribs ut bresaola voluptate pork belly eu culpa t-bone esse pork loin. Quis corned beef minim eu velit excepteur. Quis consequat bacon corned beef boudin chicken anim sint labore kielbasa do ipsum sed. Frankfurter laborum turkey do brisket elit exercitation adipisicing doner irure jowl leberkas. Culpa flank kevin drumstick sunt porchetta kielbasa pancetta picanha ea dolor ad. Irure tongue in pork belly alcatra sirloin mollit reprehenderit tri-tip dolore.</p>
        <p>Id tri-tip meatball pork belly, mollit burgdoggen leberkas cupim. Do nostrud sirloin jerky capicola ham hock deserunt, spare ribs pork belly boudin culpa salami in duis. Biltong ut aute chuck nostrud drumstick short ribs et ham hock in lorem. Prosciutto exercitation salami in enim. Laborum shoulder ribeye kielbasa exercitation bacon officia ut alcatra rump pork turkey. Excepteur ut voluptate, qui labore est pork chop pastrami hamburger cupim laborum doner shank.</p>
        <script src="%%jsDir%%"></script>
    </body>
    
</html>`
};
