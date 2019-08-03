import * as commander from "commander";
import { prompt } from "inquirer";
import { starterQuestions } from './data/newProject';
import { NewProject } from "./commands/new";
import { IAdd, Add } from "./commands/add";
import { IRemove, Remove } from "./commands/remove";
import { IConfigService, ConfigService } from "./services/configService";

commander
    .version("3.4.2")
    .usage("<command>");

commander
    .command("new")
    .description('Create a new project')
    .action(async () => {
        let projectName: string = '';
        let pipeline: string = '';
        const projectStartResponse = await prompt(starterQuestions.projectStart);
        const newProject = new NewProject();
        if (projectStartResponse.projectStart === 'Manual Configuration') {
            const projectTypeResponse = await prompt(starterQuestions.projectType)
            if (projectTypeResponse.projectType === 'Starter Project') {
                const projectNameResponse = await prompt(starterQuestions.projectName);
                const pipelineResponse = await prompt(starterQuestions.pipeline);

                projectName = projectNameResponse.projectName;
                pipeline = pipelineResponse.pipeline;
            }

            const styleFormatResponses = await prompt(starterQuestions.styleFormat);
            newProject.init(projectTypeResponse.projectType, projectName, styleFormatResponses.styleFormat, pipeline);
        } else {
            const projectnameResponse = await prompt(starterQuestions.projectName);
            newProject.init('default', projectnameResponse.projectName, 'SCSS', 'Webpack');
        }
    });


commander
    .command('add <dir> [filename]')
    .description('Use "add <dir> <filename>" to add a style sheet to a specific directory || Use "add <filename>" to add a style sheet to current directory')
    .action((dir, filename) => {
        let add: IAdd = new Add();

        if (dir === 'directory') {
            add.addNewDirectory(filename);
        } else {
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
