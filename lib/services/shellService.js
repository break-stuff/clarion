"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const logService_1 = require("./logService");
class ShellService {
    constructor() {
        this._logger = new logService_1.LogService();
    }
    executeCommand(command) {
        try {
            this._logger.info('Installing your dependencies... (This may take a minute.)');
            child_process_1.execSync(command);
        }
        catch (error) {
            this._logger.error('There was a problem installing your dependencies.');
            this._logger.error(error);
            return;
        }
        this._logger.warning(`Your command '${command}' was successfully executed.`);
    }
    installNPMDependencies(projectName, packages, devDependency = false) {
        let dependencyType = devDependency ? "-D" : "-S";
        let command = `cd ./${projectName} && npm install ${dependencyType} ${packages.join(' ')}`;
        this.executeCommand(command);
    }
}
exports.ShellService = ShellService;
