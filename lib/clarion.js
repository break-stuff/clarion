"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander = require("commander");
const inquirer_1 = require("inquirer");
const newProjectData = require("./data/newProject");
const new_1 = require("./commands/new");
const add_1 = require("./commands/add");
const remove_1 = require("./commands/remove");
const configService_1 = require("./services/configService");
commander
    .version("2.0.1")
    .usage("<command> [project or file name] [options]");
commander
    .command("new")
    .description('Create a new project')
    .action(() => {
    inquirer_1.prompt(newProjectData.questions)
        .then(answers => {
        const newProject = new new_1.NewProject();
        newProject.init(answers);
    });
});
commander
    .command('add <dir> [filename]')
    .description('Use "add <dir> <filename>" to add a style sheet to a specific directory || Use "add <filename>" to add a style sheet to current directory')
    .action((dir, filename) => {
    let add = new add_1.Add();
    if (filename)
        add.addFileToSpecifiedDirectory(dir, filename);
    else
        add.addFileToCurrentDirectory(dir);
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
