import configData from "../data/config";
import { IFileService, FileService } from "../services/fileService";
import { ILogService, LogService } from "./logService";

export interface IConfigService {
    saveConfig(property?: string, value?: string): void;
    getConfigData(): any;
}

export interface IConfig {
    paths: {
        styles: string,
        scripts: string
    },
    format: {
        styles: string,
        scripts: string
    },
    addToManifest: string,
    importAbstracts: string
}

export class ConfigService implements IConfigService {
    _fileService: IFileService = new FileService();
    _logger: ILogService = new LogService();

    saveConfig(property?: string, value?: string): void {
        let config = this.getConfigData();
        if (property)
            config = this.updateConfigProperty(config, property, value);

        if (config)
            this._fileService.saveFile('.clarion', JSON.stringify(config, null, '\t'));
    }

    getConfigData(): IConfig {
        if (this._fileService.fileExists('./.clarion')) {
            let config = this._fileService.readFile('./.clarion');

            return JSON.parse(config);
        }

        return configData;
    }

    updateConfigProperty(config: any, property: string | string[], value: string) {
        let properties = typeof property === "string" ? property.split('.') : property;

        if (properties.length > 1) {
            var p = properties.shift();
            if (config[p] == null || typeof config[p] !== 'object') {
                config[p] = {};
            }
            this.updateConfigProperty(config[p], properties, value);
        } else {
            if (properties[0] in config) {
                config[properties[0]] = value;
            } else {
                this._logger.warning(properties[0] + ' was not found.');
                return false;
            }
        }

        return config;
    }
}