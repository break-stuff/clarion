import { IFileService, FileService } from "../services/fileService";
import * as program from "commander";

export interface IParcel {
    createParcelDependencies():string[];
    createProgramCommands():string;
}

export class Parcel implements IParcel {
    _fileService: IFileService = new FileService();

    createParcelDependencies(): string[] {
        let dependencies:string[] = [
            "autoprefixer",
            "cssnano",
            "pixrem",
            "cross-env",
        ];

        return dependencies;
    }

    createProgramCommands(): string {
        let commands:any = {
            "dev": "cross-env NODE_ENV=development parcel index.html",
            "build": "cross-env NODE_ENV=production parcel build index.html -d ./build"
        }

        return commands;
    }
}