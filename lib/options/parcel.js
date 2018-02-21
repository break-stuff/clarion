"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileService_1 = require("../services/fileService");
class Parcel {
    constructor() {
        this._fileService = new fileService_1.FileService();
    }
    createParcelDependencies() {
        let dependencies = [
            "autoprefixer",
            "cssnano",
            "pixrem",
            "cross-env",
        ];
        return dependencies;
    }
    createProgramCommands() {
        let commands = {
            "dev": "cross-env NODE_ENV=development parcel index.html",
            "build": "cross-env NODE_ENV=production parcel build index.html -d ./build"
        };
        return commands;
    }
}
exports.Parcel = Parcel;
