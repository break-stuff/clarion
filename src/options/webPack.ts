import { IFileService, FileService } from "../services/fileService";
import * as program from "commander";

export interface IWebPak {
    createWebPackConfig(projectName: string): void;
    createWebPackDependencies(): string;
    createProgramCommands(): string;
}

export class WebPack implements IWebPak {
    fileService: IFileService = new FileService();

    createWebPackConfig(projectName: string): void {
        let rootPath = './' + projectName;
        this.fileService.saveFile(rootPath + '/webpack.config.js', this.createWebPackConfigContents());
    }
    createWebPackDependencies(): string {
        let devDependencies: any = {
            "autoprefixer": "^7.1.2",
            "css-loader": "^0.28.4",
            "cross-env": "^3.0.0",
            "extract-text-webpack-plugin": "^3.0.0",
            "postcss-loader": "^2.0.6",
            "webpack": "^3.5.5",
            "webpack-dev-server": "^2.7.1",
            "cssnano": "^3.10.0",
        }

        if (program.less) {
            devDependencies['less-loader'] = "^4.0.5";
        } else {
            devDependencies['node-sass'] = "^4.5.3";
            devDependencies['sass-loader'] = "^6.0.6";
        }

        return devDependencies;
    }

    createWebPackConfigContents(): string {
        let extension = this.fileService.getFileExtension(null);
        let styleFormat = this.fileService.getStyleFormat(extension);

        let contents = 'var ExtractTextPlugin = require("extract-text-webpack-plugin")\n'
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