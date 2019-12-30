"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = require("inquirer");
const projectData_1 = require("../data/projectData");
const fileService_1 = require("../services/fileService");
const logService_1 = require("./logService");
class ConfigService {
    constructor() {
        this._fileService = new fileService_1.FileService();
        this._logger = new logService_1.LogService();
        this._configFileName = 'clarion-config.json';
    }
    getConfigData() {
        if (this._fileService.fileExists('./' + this._configFileName)) {
            let config = this._fileService.readFile('./' + this._configFileName);
            return JSON.parse(config);
        }
        return projectData_1.projectData.clarionConfig;
    }
    updateConfigInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            let responses = yield this.promptUserInput();
            let config = this.updateConfigData(responses);
            this._fileService.saveFile(this._configFileName, JSON.stringify(config, null, '\t'));
        });
    }
    updateConfigData(responses) {
        return {
            paths: {
                styles: responses.stylePath || './src',
            },
            format: {
                styles: responses.styleFormat || 'scss',
            },
            addToManifest: responses.addToManifest === true,
            importAbstracts: responses.importAbstracts === true
        };
    }
    promptUserInput() {
        return __awaiter(this, void 0, void 0, function* () {
            let questions = [
                {
                    type: "input",
                    name: "stylePath",
                    message: "What is the path to your styles directory?",
                    default: "./src",
                    validate: value => value.length > 0 || "This questions is required."
                },
                {
                    type: "input",
                    name: "styleFormat",
                    message: "What format are your styles in?",
                    default: "scss",
                    validate: value => value.length > 0 || "Project Name is required."
                },
                {
                    type: "confirm",
                    name: "addToManifest",
                    message: "Would you like a reference to your new style sheets to automatically be added to the directory manifest (it's very convenient)?",
                    default: "y"
                },
                {
                    type: "confirm",
                    name: "importAbstracts",
                    message: "Would you like a reference to your abstracts to automatically be added to your new style sheets (again, it's very convenient)?",
                    default: "y"
                }
            ];
            return yield inquirer_1.prompt(questions);
            ;
        });
    }
}
exports.ConfigService = ConfigService;
