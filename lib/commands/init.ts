import * as program from "commander";
import { FileManager, IFileManager } from "../fileManager";
import { IWebPak, WebPack } from "../options/webPack";
import { IGulp, Gulp } from "../options/gulp";
import { IGrunt, Grunt } from "../options/grunt";
import { IPostCssConfig, PostCssConfig } from "../options/postCss";
import { data } from "../data";
import * as chalk from 'chalk';

export interface IInit {
    createNewProject(): void;
}

export class Init implements IInit {
    fileManager: IFileManager = new FileManager();
    projectDependencies: string = '';
    projectCommands: string = '';

    createNewProject(): void {
        let projectName = program.args[1] || '';
        if (!program.only) {
            this.createScriptScaffolding(projectName);
            this.createTaskRunner(projectName);
            this.createPackageJson(projectName);
        }
        this.createStyleScaffolding(projectName);
        this.displayStartupInstructions(projectName);
    }

    createScriptScaffolding(projectName: string) {
        let extension = this.fileManager.getFileExtension(null);
        let styleFormat = this.fileManager.getStyleFormat(extension);        
        let mainContents = this.isWebPack ? `import '../${styleFormat}/styles${extension}';`: '';
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

    isWebPack(): boolean {
        switch (true) {
            case program.gulp:
                return false;
            case program.grunt:
                return false;
            default:
                return true;
        }
    }

    createStyleScaffolding(projectName: string) {
        let extension = this.fileManager.getFileExtension(null);
        let rootPath = this.createStyleRootDirectory(projectName, extension);
        let importStatements = this.createStyleDirectories(rootPath, extension);
        this.createRootManifest(rootPath, extension, importStatements);
    }

    createStyleRootDirectory(projectName: string, extension: string): string {
        let rootPath = '';
        if (!program.only) {
            extension = this.fileManager.getStyleFormat(extension);
            rootPath = `./${projectName}/src/${extension}`;
            this.fileManager.createDirectory(rootPath);
        }
        return rootPath;
    }

    createStyleDirectories(rootPath: string, extension: string): string {
        let importStatements = '';

        data.directories.forEach((dir, i) => {
            this.fileManager.createDirectory(`${rootPath}/${dir}`);
            if (i > 0) {
                this.fileManager.saveFile(`${rootPath}/${dir}/_index${extension}`, '');
                importStatements += `@import './${dir}/_index${extension}';\n`;
            }
        });

        return importStatements
    }

    createRootManifest(rootPath: string, extension: string, importStatements: string): void {
        this.fileManager.saveFile(`${rootPath}/styles${extension}`, importStatements);
    }

    createPackageJson(projectName: string) {
        let configProjectName = projectName || 'your_project_name';
        let config: any = {
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

    createTaskRunner(projectName: string): void {
        let postCss: IPostCssConfig = new PostCssConfig();
        switch (true) {
            case program.grunt:
                let grunt:IGrunt = new Grunt();
                grunt.createGruntfile(projectName);
                this.projectDependencies = grunt.createGruntDependencies();
                break;
            case program.gulp:
                let gulp:IGulp = new Gulp();
                gulp.createGulpfile(projectName);
                this.projectDependencies = gulp.createGulpDependencies();
                this.projectCommands = gulp.createProgramCommands();
                postCss.createPostCssConfig(projectName);
                break;
            default:
                let webPack: IWebPak = new WebPack();
                webPack.createWebPackConfig(projectName);
                this.projectDependencies = webPack.createWebPackDependencies();
                this.projectCommands = webPack.createProgramCommands();
                postCss.createPostCssConfig(projectName);
                break;
        }
    }

    displayStartupInstructions(projectName: string): void {
        let instructions = '';

        if(projectName) instructions = `cd ${projectName} && `;

        console.log(chalk.yellow('\nTo get started run the following command:'));
        console.log(chalk.white(instructions + 'npm install'));
    }
}