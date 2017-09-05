"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileService_1 = require("../services/fileService");
const postCss_1 = require("../data/postCss");
class PostCssConfig {
    constructor() {
        this._fileService = new fileService_1.FileService();
    }
    createPostCssConfig(projectName) {
        let content = 'module.exports = ' + JSON.stringify(postCss_1.default.config, null, '\t');
        this._fileService.saveFile(`./${projectName}/postcss.config.js`, content);
    }
}
exports.PostCssConfig = PostCssConfig;
