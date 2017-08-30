"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileManager_1 = require("../fileManager");
class PostCssConfig {
    constructor() {
        this._fileManager = new fileManager_1.FileManager();
    }
    createPostCssConfig(projectName) {
        let content = `module.exports = {\n` +
            `\tplugins: {\n` +
            `\t\t'autoprefixer': {},\n` +
            `\t\t'cssnano': {}\n` +
            `\t}\n` +
            `};`;
        this._fileManager.saveFile(`./${projectName}/postcss.config.js`, content);
    }
}
exports.PostCssConfig = PostCssConfig;
