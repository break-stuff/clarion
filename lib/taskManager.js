"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const start_1 = require("./commands/start");
const add_1 = require("./commands/add");
const remove_1 = require("./commands/remove");
const logManager_1 = require("./logManager");
class TaskManager {
    constructor() {
        this._logManager = new logManager_1.LogManager();
    }
    processUserAction(commands) {
        let action = commands[0];
        if (action) {
            switch (action.toLowerCase()) {
                case 'start':
                    let start = new start_1.Start();
                    start.createNewProject();
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
                    this._logManager.warning(`${commands[0]} is not a recognized command.`);
                    break;
            }
        }
        else {
            this._logManager.warning('Please enter a valid command. Try "clarion --help" for more information.');
        }
    }
}
exports.TaskManager = TaskManager;
