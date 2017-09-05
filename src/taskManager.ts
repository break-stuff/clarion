import { IStart, Start } from "./commands/start";
import { IAdd, Add } from "./commands/add";
import { IRemove, Remove } from "./commands/remove";
import { IConfig, Config } from "./commands/config";
import { ILogService, LogService } from "./services/logService";

export interface ITaskService {
    processUserAction(commands: string[]);
}

export class TaskService implements ITaskService {
    _logService: ILogService = new LogService();

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
                case 'config':
                    let config: IConfig = new Config();
                    config.updateConfig();
                    break;
                default:
                    this._logService.warning(`${commands[0]} is not a recognized command.`);
                    break;
            }
        } else {
            this._logService.warning('Please enter a valid command. Try "clarion --help" for more information.');
        }
    }
}