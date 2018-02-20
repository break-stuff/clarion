import { IFileService, FileService } from "../services/fileService";
import * as program from "commander";

export interface IWebPak {
    createWebPackConfig(projectName: string): void;
    createWebPackDependencies(): string[];
    createProgramCommands(): string;
}

export class WebPack implements IWebPak {
    fileService: IFileService = new FileService();

    createWebPackConfig(projectName: string): void {
        let rootPath = './' + projectName;
        this.fileService.saveFile(rootPath + '/webpack.config.js', this.createWebPackConfigContents());
    }
    createWebPackDependencies(): string[] {
        let devDependencies: string[] = [
            "autoprefixer",
            "pixrem",
            "css-loader",
            "cross-env",
            "extract-text-webpack-plugin",
            "postcss-loader",
            "webpack",
            "webpack-dev-server",
            "cssnano",
        ]

        if (program.less) {
            devDependencies.push('less-loader');
        } else {
            devDependencies.push('node-sass');
            devDependencies.push('sass-loader');
        }

        return devDependencies;
    }

    createWebPackConfigContents(): string {
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

    createProgramCommands(): string {
        let commands: any = {
            "dev": "cross-env NODE_ENV=development webpack-dev-server --progress --open --hot",
            "build": "cross-env NODE_ENV=production webpack --progress --hide-modules -p"
        };
        return commands;
    }

    addLoaders(): string {
        let extension = this.fileService.getFileExtension(null);
        let styleFormat = this.fileService.getStyleFormat(extension);

        return `{test: /\\${extension}$/, loader: ExtractTextPlugin.extract(['css-loader', 'postcss-loader', '${styleFormat}-loader'])}`;

    }
}