"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const fileManager_1 = require("../fileManager");
const webPack_1 = require("../options/webPack");
const gulp_1 = require("../options/gulp");
const grunt_1 = require("../options/grunt");
const postCss_1 = require("../options/postCss");
const data_1 = require("../data");
const chalk = require("chalk");
class Init {
    constructor() {
        this.fileManager = new fileManager_1.FileManager();
        this.projectDependencies = '';
        this.projectCommands = '';
    }
    createNewProject() {
        let projectName = program.args[1] || '';
        if (!program.only) {
            this.createScriptScaffolding(projectName);
            this.createTaskRunner(projectName);
            this.createPackageJson(projectName);
        }
        this.createStyleScaffolding(projectName);
        this.displayStartupInstructions(projectName);
    }
    createScriptScaffolding(projectName) {
        let extension = this.fileManager.getFileExtension(null);
        let styleFormat = this.fileManager.getStyleFormat(extension);
        let mainContents = this.isWebPack ? `import '../${styleFormat}/styles${extension}';` : '';
        if (projectName) {
            this.fileManager.createDirectory(projectName);
        }
        this.fileManager.createDirectory(`./${projectName}/build`);
        this.fileManager.createDirectory(`./${projectName}/src`);
        this.fileManager.createDirectory(`./${projectName}/src/scripts`);
        this.fileManager.createDirectory(`./${projectName}/src/scripts/components`);
        this.fileManager.createDirectory(`./${projectName}/src/scripts/services`);
        this.fileManager.saveFile(`./${projectName}/src/scripts/main.js`, mainContents);
    }
    isWebPack() {
        switch (true) {
            case program.gulp:
                return false;
            case program.grunt:
                return false;
            default:
                return true;
        }
    }
    createStyleScaffolding(projectName) {
        let extension = this.fileManager.getFileExtension(null);
        let rootPath = this.createStyleRootDirectory(projectName, extension);
        let importStatements = this.createStyleDirectories(rootPath, extension);
        this.createRootManifest(rootPath, extension, importStatements);
    }
    createStyleRootDirectory(projectName, extension) {
        let rootPath = '';
        if (!program.only) {
            extension = this.fileManager.getStyleFormat(extension);
            rootPath = `./${projectName}/src/${extension}`;
            this.fileManager.createDirectory(rootPath);
        }
        return rootPath;
    }
    createStyleDirectories(rootPath, extension) {
        let importStatements = '';
        data_1.data.directories.forEach((dir, i) => {
            this.fileManager.createDirectory(`${rootPath}/${dir}`);
            if (i > 0) {
                this.fileManager.saveFile(`${rootPath}/${dir}/_index${extension}`, '');
                importStatements += `@import './${dir}/_index${extension}';\n`;
            }
        });
        return importStatements;
    }
    createRootManifest(rootPath, extension, importStatements) {
        this.fileManager.saveFile(`${rootPath}/styles${extension}`, importStatements);
    }
    createPackageJson(projectName) {
        let configProjectName = projectName || 'your_project_name';
        let config = {
            "name": configProjectName,
            "version": "0.1.0",
            "description": "",
            "main": "index.js",
            "scripts": {
                "test": "echo \"Error: no test specified\" && exit 1"
            },
            "keywords": [],
            "author": "",
            "license": "ISC",
        };
        config.devDependencies = this.projectDependencies;
        config.scripts = this.projectCommands;
        this.fileManager.saveFile(`./${projectName}/package.json`, JSON.stringify(config, null, '\t'));
    }
    createTaskRunner(projectName) {
        let postCss = new postCss_1.PostCssConfig();
        switch (true) {
            case program.grunt:
                let grunt = new grunt_1.Grunt();
                grunt.createGruntfile(projectName);
                this.projectDependencies = grunt.createGruntDependencies();
                break;
            case program.gulp:
                let gulp = new gulp_1.Gulp();
                gulp.createGulpfile(projectName);
                this.projectDependencies = gulp.createGulpDependencies();
                this.projectCommands = gulp.createProgramCommands();
                postCss.createPostCssConfig(projectName);
                break;
            default:
                let webPack = new webPack_1.WebPack();
                webPack.createWebPackConfig(projectName);
                this.projectDependencies = webPack.createWebPackDependencies();
                this.projectCommands = webPack.createProgramCommands();
                postCss.createPostCssConfig(projectName);
                break;
        }
    }
    displayStartupInstructions(projectName) {
        let instructions = '';
        if (projectName)
            instructions = `cd ${projectName} && `;
        console.log(chalk.yellow('\nTo get started run the following command:'));
        console.log(chalk.white(instructions + 'npm install'));
    }
}
exports.Init = Init;
