"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const projectData_1 = require("../data/projectData");
const fileService_1 = require("../services/fileService");
const logService_1 = require("./logService");
class ConfigService {
    constructor() {
        this._fileService = new fileService_1.FileService();
        this._logger = new logService_1.LogService();
    }
    saveConfig(property, value) {
        let config = this.getConfigData();
        if (property)
            config = this.updateConfigProperty(config, property, value);
        if (config)
            this._fileService.saveFile('.clarion', JSON.stringify(config, null, '\t'));
    }
    getConfigData() {
        if (this._fileService.fileExists('./.clarion')) {
            let config = this._fileService.readFile('./.clarion');
            return JSON.parse(config);
        }
        return projectData_1.projectData.clarionConfig;
    }
    updateConfigProperty(config, property, value) {
        let properties = typeof property === "string" ? property.split('.') : property;
        if (properties.length > 1) {
            var p = properties.shift();
            if (config[p] == null || typeof config[p] !== 'object') {
                config[p] = {};
            }
            this.updateConfigProperty(config[p], properties, value);
        }
        else {
            if (properties[0] in config) {
                config[properties[0]] = value;
            }
            else {
                this._logger.warning(properties[0] + ' was not found.');
                return false;
            }
        }
        return config;
    }
}
exports.ConfigService = ConfigService;
