import { FileService, IFileService } from "../services/fileService";
import { ILogService, LogService } from "../services/logService";
import { IDirectoryService, DirectoryService } from "../services/directoryService";

export interface IRemove {
    removeFileFromCurrentDirectory(fileName: string): void;
    removeFileFromSpecifiedDirectory(dir: string, fileName: string): void;
}

export class Remove implements IRemove {
    _fileService: IFileService = new FileService();
    _logService: ILogService = new LogService();
    _directoryService: IDirectoryService = new DirectoryService();

    removeFileFromCurrentDirectory(fileName: string): void {
        if (!this._fileService.getManifestFile('./')) {
            this._logService.warning('Sorry, this is not a directory you can remove styles from or you may be missing parameters.');
        } else {
            this.processFileRemoval('.', fileName);
        }
    }

    removeFileFromSpecifiedDirectory(dir: string, fileName: string): void {
        let directoryName = this._directoryService.findDirectoryByName(dir);
        
        if (directoryName) {
            let pathToDirectory = this._directoryService.findDirectory(directoryName);
            if (pathToDirectory) {
				this.processFileRemoval(pathToDirectory, fileName);
			} else {
				this._logService.warning(
					"Sorry, the directory you specified was not found."
				);
			}
        } else {
            this._directoryService.promptForMissingDirectory()
                .then(directory => this.removeFileFromSpecifiedDirectory(directory, fileName));
        }
    }

    processFileRemoval(pathToDirectory: string, fileName: string): void {
        let extension = this._fileService.getFileExtension(pathToDirectory);
        let fileToRemove = `_${fileName}.${extension}`;
        let manifestFile = `${pathToDirectory}/${this._fileService.getManifestFile(pathToDirectory)}`;
        this._fileService.removeFile(`${pathToDirectory}/${fileToRemove}`);
        this._fileService.removeFileFromManifest(extension === 'sass' || extension === 'scss' ? fileName : fileToRemove, manifestFile);
    }
}