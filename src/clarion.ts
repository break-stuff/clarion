import * as program from "commander";
import { ITaskManager, TaskManager } from "./taskManager";

program
    .version('0.1.1')
    .usage('<command> [project or file name] [options]')
    .command('start', 'generate a new project')
    .command('add', 'add a new file to your project')
    .command('remove', 'remove a file from your project')
    .option('-O, --only', 'generate the style architecture only (great for integrating into frameworks)')
    .option('-E, --empty', 'generate an empty project without any of the start-up files')
    .option('-C, --scss', 'files are in .scss format (default)')
    .option('-A, --sass', 'files are in .sass format')
    .option('-L, --less', 'files are in .less format')
    .option('-W, --webpack', 'configure project for WebPack bundler (default)')
    .option('-U, --gulp', 'configure project for Gulp task runner')
    .option('-R, --grunt', 'configure project for Grunt task runner (COMING SOON!!!)')
    .parse(process.argv);

if(program.args.length){
    let taskManager = new TaskManager();
    taskManager.processUserAction(program.args);
}