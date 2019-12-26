"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander = require("commander");
const inquirer_1 = require("inquirer");
const newProject_1 = require("./data/newProject");
const new_1 = require("./commands/new");
const add_1 = require("./commands/add");
const remove_1 = require("./commands/remove");
const configService_1 = require("./services/configService");
commander
    .version("3.8.0")
    .usage("<command>");
commander
    .command("new")
    .description('Create a new project')
    .action(() => __awaiter(this, void 0, void 0, function* () {
    let projectName = '';
    let pipeline = '';
    const projectStartResponse = yield inquirer_1.prompt(newProject_1.starterQuestions.projectStart);
    const newProject = new new_1.NewProject();
    if (projectStartResponse.projectStart === 'Manual Configuration') {
        const projectTypeResponse = yield inquirer_1.prompt(newProject_1.starterQuestions.projectType);
        if (projectTypeResponse.projectType === 'Starter Project') {
            const projectNameResponse = yield inquirer_1.prompt(newProject_1.starterQuestions.projectName);
            const pipelineResponse = yield inquirer_1.prompt(newProject_1.starterQuestions.pipeline);
            projectName = projectNameResponse.projectName;
            pipeline = pipelineResponse.pipeline;
        }
        const styleFormatResponses = yield inquirer_1.prompt(newProject_1.starterQuestions.styleFormat);
        newProject.init(projectTypeResponse.projectType, projectName, styleFormatResponses.styleFormat, pipeline);
    }
    else {
        const projectnameResponse = yield inquirer_1.prompt(newProject_1.starterQuestions.projectName);
        newProject.init('default', projectnameResponse.projectName, 'SCSS', 'Webpack');
    }
}));
commander
    .command('add <dir> [filename]')
    .description('Use "add <dir> <filename>" to add a style sheet to a specific directory || Use "add <filename>" to add a style sheet to current directory')
    .action((dir, filename) => {
    let add = new add_1.Add();
    if (dir === 'directory') {
        add.addNewDirectory(filename);
    }
    else {
        if (filename)
            add.addFileToSpecifiedDirectory(dir, filename);
        else
            add.addFileToCurrentDirectory(dir);
    }
});
commander
    .command('mkdir <foldername>')
    .description('Add new style directory to architecture')
    .action((foldername) => {
    let add = new add_1.Add();
    add.addNewDirectory(foldername);
});
commander
    .command('remove <dir> [filename]')
    .description('Use "add <dir> <filename>" to add a style sheet to a specific directory || Use "add <filename>" to add a style sheet to current directory')
    .action((dir, filename) => {
    let remove = new remove_1.Remove();
    if (filename)
        remove.removeFileFromSpecifiedDirectory(dir, filename);
    else
        remove.removeFileFromCurrentDirectory(dir);
});
commander
    .command('config')
    .description('Configure Clarion to your development environment')
    .action(() => {
    let configService = new configService_1.ConfigService();
    configService.updateConfigInfo();
});
commander.parse(process.argv);
