import { IInit, Init } from "./commands/init";
import { IAdd, Add } from "./commands/add";
import { IRemove, Remove } from "./commands/remove";

export interface ITaskManager {
    processUserAction(commands:string[]);
}

export class TaskManager implements ITaskManager {
    processUserAction(commands: string[]) {
        switch (commands[0]) {
            case 'init':
                let init: IInit = new Init();
                init.createNewProject();
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
                console.log(`${commands[0]} is not a recognized command.`)
                break;
        }
    }
}