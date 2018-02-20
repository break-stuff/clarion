"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileService_1 = require("../services/fileService");
const program = require("commander");
class Grunt {
    constructor() {
        this.fileService = new fileService_1.FileService();
    }
    createGruntfile(projectName) {
        let rootPath = './' + projectName;
        this.fileService.saveFile(rootPath + '/gruntfile.js', this.createGruntfileContents());
    }
    createGruntDependencies() {
        let dependencies = [
            "autoprefixer",
            "cssnano",
            "pixrem",
            "grunt",
            "grunt-postcss",
            "grunt-contrib-watch",
            "grunt-contrib-connect",
            "cross-env"
        ];
        dependencies.push(program.less ? "grunt-contrib-less" : "grunt-contrib-sass");
        return dependencies;
    }
    createGruntfileContents() {
        let extension = this.fileService.getFileExtension(null).replace('.', '');
        let packageName = extension === 'less' ? 'less' : 'sass';
        let contents = `module.exports = function (grunt) {\n` +
            `    grunt.initConfig({\n` +
            `        pkg: grunt.file.readJSON('package.json'),\n` +
            `        ${packageName}: {\n` +
            `            dist: {\n` +
            `                files: {\n` +
            `                    'build/styles.css': 'src/${packageName}/styles.${extension}'\n` +
            `                }\n` +
            `            }\n` +
            `        },\n` +
            `        watch: {\n` +
            `            css: {\n` +
            `                files: '**/*.${extension}',\n` +
            `                tasks: ['${packageName}']\n` +
            `            }\n` +
            `        },\n` +
            `        postcss: {\n` +
            `            options: {\n` +
            `                map: true,\n` +
            `                processors: [\n` +
            `                    require('autoprefixer')(),\n` +
            `                    require('cssnano')(),\n` +
            `                    require('pixrem')()\n` +
            `                ]\n` +
            `            },\n` +
            `            dist: {\n` +
            `                src: 'css/*.css'\n` +
            `            }\n` +
            `        },\n` +
            `        connect: {\n` +
            `           uses_defaults: {}\n` +
            `        }\n` +
            `    });\n` +
            `    grunt.loadNpmTasks('grunt-contrib-${packageName}');\n` +
            `    grunt.loadNpmTasks('grunt-postcss');\n` +
            `    grunt.loadNpmTasks('grunt-contrib-watch');\n` +
            `    grunt.loadNpmTasks('grunt-contrib-connect');\n` +
            `    grunt.registerTask('dev', ['${packageName}', 'connect', 'watch']);\n` +
            `    grunt.registerTask('build', ['${packageName}']);\n` +
            `}`;
        return contents;
    }
    createProgramCommands() {
        let commands = {
            "dev": "cross-env NODE_ENV=development grunt dev",
            "build": "cross-env NODE_ENV=production gulp build"
        };
        return commands;
    }
}
exports.Grunt = Grunt;
