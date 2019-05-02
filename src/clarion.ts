import * as commander from "commander";
import { prompt } from "inquirer";
import * as newProjectData from './data/newProject';
import { NewProject } from "./commands/new";
import { IAdd, Add } from "./commands/add";
import { IRemove, Remove } from "./commands/remove";
import { IConfigService, ConfigService } from "./services/configService";

commander
    .version("3.1.0")
    .usage("<command> [project or file name] [options]");

commander
    .command("new <projectname>")
    .description('Create a new project')
    .action((projectname) => {
        prompt(newProjectData.starterQuestions)
            .then(answer => {
                const newProject = new NewProject();
                if(answer.projectStart === 'Manual Configuration') {
                    prompt(newProjectData.manualSetupQuestions)
                        .then(answers => {
                            newProject.init(projectname, answers);
                        });
                } else {
                    newProject.init(projectname, newProjectData.defaultProjectValues);
                }
            });
});

commander
    .command('add <dir> [filename]')
    .description('Use "add <dir> <filename>" to add a style sheet to a specific directory || Use "add <filename>" to add a style sheet to current directory')
    .action((dir, filename) => {
        let add: IAdd = new Add();
        if(filename)
            add.addFileToSpecifiedDirectory(dir, filename);
        else
            add.addFileToCurrentDirectory(dir);
});

commander
    .command('mkdir <foldername>')
    .description('Add new style directory to architecture')
    .action((foldername) => {
        let add: IAdd = new Add();
        add.addNewDirectory(foldername);
});

commander
    .command('remove <dir> [filename]')
    .description('Use "add <dir> <filename>" to add a style sheet to a specific directory || Use "add <filename>" to add a style sheet to current directory')
    .action((dir, filename) => {
        let remove: IRemove = new Remove();
        if(filename)
            remove.removeFileFromSpecifiedDirectory(dir, filename);
        else
            remove.removeFileFromCurrentDirectory(dir);
    });

    
commander
    .command('config')
    .description('Configure Clarion to your development environment')
    .action(() => {
        let configService: IConfigService = new ConfigService();
        configService.updateConfigInfo();
    });

commander.parse(process.argv);
