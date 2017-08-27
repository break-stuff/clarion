"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const init_1 = require("./commands/init");
const add_1 = require("./commands/add");
const remove_1 = require("./commands/remove");
class TaskManager {
    processUserAction(commands) {
        switch (commands[0]) {
            case 'init':
                let init = new init_1.Init();
                init.createNewProject();
                break;
            case 'add':
                let add = new add_1.Add();
                add.addNewFile();
                break;
            case 'remove':
                let remove = new remove_1.Remove();
                remove.removeFile();
                break;
            default:
                console.log(`${commands[0]} is not a recognized command.`);
                break;
        }
    }
}
exports.TaskManager = TaskManager;
