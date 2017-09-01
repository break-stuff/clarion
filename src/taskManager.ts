import { IStart, Start } from "./commands/start";
import { IAdd, Add } from "./commands/add";
import { IRemove, Remove } from "./commands/remove";
import { ILogManager, LogManager } from "./logManager";

export interface ITaskManager {
    processUserAction(commands: string[]);
}

export class TaskManager implements ITaskManager {
    _logManager: ILogManager = new LogManager();

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
                    this._logManager.warning(`${commands[0]} is not a recognized command.`);
                    break;
            }
        } else {
            this._logManager.warning('Please enter a valid command. Try "clarion --help" for more information.');
        }
    }
}