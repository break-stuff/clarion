import * as program from "commander";
import { ITaskService, TaskService } from "./taskManager";

program
    .version('0.6.0')
    .usage('<command> [project or file name] [options]')
    .command('new', 'generate a new project')
    .command('add', 'add a new file to your project')
    .command('remove', 'remove a file from your project')
    .command('config', 'configure Clarion to your development environment')
    .option('-O, --only', 'generate the style architecture only (great for integrating into frameworks)')
    .option('-E, --empty', 'generate an empty project without any of the start-up files')
    .option('-C, --scss', 'files are in .scss format (default)')
    .option('-A, --sass', 'files are in .sass format')
    .option('-L, --less', 'files are in .less format')
    .option('-W, --webpack', 'configure project for WebPack bundler (default)')
    .option('-U, --gulp', 'configure project for Gulp task runner')
    .option('-R, --grunt', 'configure project for Grunt task runner (COMING SOON!!!)')
    .parse(process.argv);

if (program.args.length) {
    let taskService = new TaskService();
    taskService.processUserAction(program.args);
}