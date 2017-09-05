"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const start_1 = require("./commands/start");
const add_1 = require("./commands/add");
const remove_1 = require("./commands/remove");
const config_1 = require("./commands/config");
const logService_1 = require("./services/logService");
class TaskService {
    constructor() {
        this._logService = new logService_1.LogService();
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
                case 'config':
                    let config = new config_1.Config();
                    config.updateConfig();
                    break;
                default:
                    this._logService.warning(`${commands[0]} is not a recognized command.`);
                    break;
            }
        }
        else {
            this._logService.warning('Please enter a valid command. Try "clarion --help" for more information.');
        }
    }
}
exports.TaskService = TaskService;
