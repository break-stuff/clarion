"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const logService_1 = require("../services/logService");
const configService_1 = require("../services/configService");
class Config {
    constructor() {
        this._logger = new logService_1.LogService();
        this._configService = new configService_1.ConfigService();
    }
    updateConfig() {
        switch (program.args.length) {
            case 1:
                this._logger.warning('Please be sure to include the configuration property and value or initialize a config file using the "init" keyword.');
                break;
            case 2:
                this.initializeConfig();
                break;
            case 3:
                this._configService.saveConfig(program.args[1], program.args[2]);
                break;
            default:
                this._logger.warning('Sorry, we were not able to process your request.');
                break;
        }
    }
    initializeConfig() {
        if (program.args[1].toLowerCase() === 'init') {
            this._configService.saveConfig();
        }
        else {
            this._logger.warning('Please be sure to include the configuration property and value');
        }
    }
}
exports.Config = Config;
