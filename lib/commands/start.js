"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const fileManager_1 = require("../fileManager");
const webPack_1 = require("../options/webPack");
const gulp_1 = require("../options/gulp");
const grunt_1 = require("../options/grunt");
const postCss_1 = require("../options/postCss");
const logManager_1 = require("../logManager");
const data_1 = require("../data");
class Start {
    constructor() {
        this._fileManager = new fileManager_1.FileManager();
        this._projectDependencies = '';
        this._projectCommands = '';
        this._logManager = new logManager_1.LogManager();
    }
    createNewProject() {
        let projectName = program.args[1] || '';
        if (!program.only) {
            this.createScriptScaffolding(projectName);
            this.createTaskRunner(projectName);
            this.createPackageJson(projectName);
            this.createIndexHtml(projectName);
        }
        this.createStyleScaffolding(projectName);
        this.displayStartupInstructions(projectName);
    }
    createScriptScaffolding(projectName) {
        let extension = this._fileManager.getFileExtension(null);
        let styleFormat = this._fileManager.getStyleFormat(extension);
        let mainContents = this.isWebPack ? `import '../${styleFormat}/styles${extension}';` : '';
        if (projectName) {
            this._fileManager.createDirectory(projectName);
        }
        this._fileManager.createDirectory(`./${projectName}/build`);
        this._fileManager.createDirectory(`./${projectName}/src`);
        this._fileManager.createDirectory(`./${projectName}/src/scripts`);
        this._fileManager.createDirectory(`./${projectName}/src/scripts/components`);
        this._fileManager.createDirectory(`./${projectName}/src/scripts/services`);
        this._fileManager.saveFile(`./${projectName}/src/scripts/main.js`, mainContents);
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
        let extension = this._fileManager.getFileExtension(null);
        let rootPath = this.createStyleRootDirectory(projectName, extension);
        let importStatements = this.createStyleDirectories(rootPath, extension);
        this.createRootManifest(rootPath, extension, importStatements);
    }
    createStyleRootDirectory(projectName, extension) {
        let rootPath = './';
        if (!program.only) {
            extension = this._fileManager.getStyleFormat(extension);
            rootPath = `./${projectName}/src/${extension}`;
            this._fileManager.createDirectory(rootPath);
        }
        return rootPath;
    }
    createStyleDirectories(rootPath, extension) {
        let importStatements = '';
        data_1.data.directories.forEach((dir, i) => {
            this._fileManager.createDirectory(`${rootPath}/${dir}`);
            if (i > 0) {
                this._fileManager.saveFile(`${rootPath}/${dir}/_index${extension}`, '');
                importStatements += `@import './${dir}/_index${extension}';\n`;
            }
        });
        return importStatements;
    }
    createRootManifest(rootPath, extension, importStatements) {
        this._fileManager.saveFile(`${rootPath}/styles${extension}`, importStatements);
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
        config.devDependencies = this._projectDependencies;
        config.scripts = this._projectCommands;
        this._fileManager.saveFile(`./${projectName}/package.json`, JSON.stringify(config, null, '\t'));
    }
    createTaskRunner(projectName) {
        let postCss = new postCss_1.PostCssConfig();
        switch (true) {
            case program.grunt:
                let grunt = new grunt_1.Grunt();
                grunt.createGruntfile(projectName);
                this._projectDependencies = grunt.createGruntDependencies();
                break;
            case program.gulp:
                let gulp = new gulp_1.Gulp();
                gulp.createGulpfile(projectName);
                this._projectDependencies = gulp.createGulpDependencies();
                this._projectCommands = gulp.createProgramCommands();
                postCss.createPostCssConfig(projectName);
                break;
            default:
                let webPack = new webPack_1.WebPack();
                webPack.createWebPackConfig(projectName);
                this._projectDependencies = webPack.createWebPackDependencies();
                this._projectCommands = webPack.createProgramCommands();
                postCss.createPostCssConfig(projectName);
                break;
        }
    }
    createIndexHtml(projectName) {
        let contents = '<html lang="en">\n'
            + '\n'
            + '<head>\n'
            + '    <meta charset="UTF-8">\n'
            + '    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">\n'
            + '    <meta http-equiv="X-UA-Compatible" content="ie=edge">\n'
            + '    <title>Clarion</title>\n'
            + '    <link rel="stylesheet" href="./build/styles.css">\n'
            + '</head>\n'
            + '\n'
            + '<body>\n'
            + '    <h1 style="text-align:center; font-family:sans-serif">Congratulations! You did it!</h1>\n'
            + '    <img src="https://media.giphy.com/media/2xO491sY6f0cM/giphy.gif" alt="tobias huzzah!" style="display:block; margin:auto;">\n'
            + '    <script src="./build/scripts.js"></script>\n'
            + '</body>\n'
            + '\n'
            + '</html>\n';
        this._fileManager.saveFile(`./${projectName}/index.html`, contents);
    }
    displayStartupInstructions(projectName) {
        if (!program.only) {
            let instructions = '';
            if (projectName)
                instructions = `cd ${projectName} && `;
            this._logManager.info('\nTo get started run the following command:');
            this._logManager.info(instructions + 'npm install');
        }
    }
}
exports.Start = Start;
