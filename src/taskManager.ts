import { IStart, Start } from "./commands/start";
import { IAdd, Add } from "./commands/add";
import { IRemove, Remove } from "./commands/remove";
import * as chalk from "chalk";

export interface ITaskManager {
    processUserAction(commands: string[]);
}

export class TaskManager implements ITaskManager {
    processUserAction(commands: string[]) {
        let action = commands[0];

        if (action) {
            switch (action.toLowerCase()) {
                case 'start':
                    let start: IStart = new Start();
                    start.createNewProject();
                    break;
                case 'add':
                    let add: IAdd = new Add();
                    add.addNewFile();
                    break;
                case 'remove':
                    let remove: IRemove = new Remove();
                    remove.removeFile();
                    break;
                default:
                    console.log(chalk.red(`${commands[0]} is not a recognized command.`));
                    break;
            }
        } else {
            console.log(chalk.red('Please enter a valid command. Try "clarion --help" for more information.'))
        }
    }
}