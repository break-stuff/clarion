import { execSync } from "child_process";
import { ILogService, LogService } from "./logService";

export interface IShellService {
    executeCommand(command: string);
    installNPMDependencies(projectName:string, packages: string[], devDependency:boolean);
}

export class ShellService implements IShellService {
    _logger: ILogService = new LogService();

    executeCommand(command: string) {
        try {
            this._logger.info('Installing your dependencies... (This may take a minute.)')
            execSync(command);
        } catch (error) {
            this._logger.error('There was a problem installing your dependencies.');
            this._logger.error(error);
            return
        }

        this._logger.warning(`Your command '${command}' was successfully executed.`);
    }
    
    installNPMDependencies(projectName:string, packages: string[], devDependency:boolean = false) {
        let dependencyType = devDependency ? "-D" : "-S";
        let command = `cd ./${projectName} && npm install ${dependencyType} ${packages.join(' ')}`;

        this.executeCommand(command);
    }
}