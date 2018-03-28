export interface IProjectData {
    styleDirectories: string[];
    styleTypes: string[];
    projectDirectories: string[];
    packageJson: IPackageJson;
    clarionConfig: IClarionConfig;
    postCssConfig: object;
    grunt: IProjectTypeData;
    gulp: IProjectTypeData;
    parcel: IProjectTypeData;
    webpack: IProjectTypeData;
    indexHtml: string;
}

export interface IPackageJson {
    name: string;
    version: string;
    description: string;
    main: string;
    scripts: object;
    keywords: string[];
    author: string;
    license: string;
}

export interface IClarionConfig {
    paths: {
        styles: string,
        scripts: string
    },
    format: {
        styles: string,
        scripts: string
    },
    addToManifest: string,
    importAbstracts: string
}

export interface IProjectTypeData {
    configFile: string;
    devDependencies: string[];
    lessDependencies: string[];
    sassDependencies: string[];
    npmCommands: object;
    configContents: string;
}

export var projectData: IProjectData = {
    styleDirectories: [
        "00_Abstracts",
        "01_Base",
        "02_Vendors",
        "03_Elements",
        "04_Components",
        "05_Layouts",
        "06_Pages",
        "07_Utilities"
    ],
    styleTypes: [
        "less",
        "sass",
        "scss"
    ],
    projectDirectories: [
        './%%projectName%%/build',
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
            'grunt-contrib-sass'
        ],
        npmCommands: {
            "dev": "cross-env NODE_ENV=development grunt dev",
            "build": "cross-env NODE_ENV=production gulp build"
        },
        configContents: `
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        %%styleFormat%%: {
            dist: {
                files: {
                    'build/styles.css': 'src/%%styleFormat%%/styles.%%extension%%'
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
    grunt.loadNpmTasks('grunt-contrib-%%styleFormat%%');
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
        configContents:
`'use strict';

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
    return gulp.src('./src/%%styleFormat%%/styles%%extension%%')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build'));
});

gulp.task('%%styleFormat%%:watch', function () {
    gulp.watch('./src/%%styleFormat%%/**/*%%extension%%', ['%%styleFormat%%']);
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
        lessDependencies: [
        ],
        sassDependencies: [
        ],
        npmCommands: {
            "dev": "cross-env NODE_ENV=development parcel index.html",
            "build": "cross-env NODE_ENV=production parcel build index.html -d ./build"
        },
        configContents: null
    },
    webpack: {
        configFile: 'webpack.config.js',
        devDependencies: [
            "autoprefixer",
            "pixrem",
            "css-loader",
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
        configContents: 
`//var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './src/scripts/main.js',
    output: {
        filename: './build/scripts.js'
    },
    module: {
        rules: [
            {test: /\\%%extension%%$/, loader: ['css-loader', 'postcss-loader', '%%styleFormat%%-loader']}
        ]
    },
//    plugins: [
//    devtool: "source-map",
//        new ExtractTextPlugin("./build/styles.css")
//    ]
}`
    },
    indexHtml : 
`<html lang="en">
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
}