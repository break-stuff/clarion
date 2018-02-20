"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileService_1 = require("../services/fileService");
const program = require("commander");
class WebPack {
    constructor() {
        this.fileService = new fileService_1.FileService();
    }
    createWebPackConfig(projectName) {
        let rootPath = './' + projectName;
        this.fileService.saveFile(rootPath + '/webpack.config.js', this.createWebPackConfigContents());
    }
    createWebPackDependencies() {
        let devDependencies = [
            "autoprefixer",
            "pixrem",
            "css-loader",
            "cross-env",
            "extract-text-webpack-plugin",
            "postcss-loader",
            "webpack",
            "webpack-dev-server",
            "cssnano",
        ];
        if (program.less) {
            devDependencies.push('less-loader');
        }
        else {
            devDependencies.push('node-sass');
            devDependencies.push('sass-loader');
        }
        return devDependencies;
    }
    createWebPackConfigContents() {
        let extension = this.fileService.getFileExtension(null);
        let styleFormat = this.fileService.getStyleFormat(extension);
        let contents = 'var ExtractTextPlugin = require("extract-text-webpack-plugin");\n'
            + '\n'
            + 'module.exports = {\n'
            + '    entry: \'./src/scripts/main.js\',\n'
            + '    output: {\n'
            + '        filename: \'./build/scripts.js\'\n'
            + '    },\n'
            + '    module: {\n'
            + '        loaders: [\n'
            + `            {test: /\\${extension}$/, loader: ExtractTextPlugin.extract(['css-loader', 'postcss-loader', '${styleFormat}-loader'])}\n`
            + '        ]\n'
            + '    },\n'
            + '    devtool: "source-map",\n'
            + '    plugins: [\n'
            + '        new ExtractTextPlugin("./build/styles.css")\n'
            + '    ]\n'
            + '}';
        return contents;
    }
    createProgramCommands() {
        let commands = {
            "dev": "cross-env NODE_ENV=development webpack-dev-server --progress --open --hot",
            "build": "cross-env NODE_ENV=production webpack --progress --hide-modules -p"
        };
        return commands;
    }
    addLoaders() {
        let extension = this.fileService.getFileExtension(null);
        let styleFormat = this.fileService.getStyleFormat(extension);
        return `{test: /\\${extension}$/, loader: ExtractTextPlugin.extract(['css-loader', 'postcss-loader', '${styleFormat}-loader'])}`;
    }
}
exports.WebPack = WebPack;
