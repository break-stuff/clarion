// import { ILogService, LogService } from "../services/logService";
// import { IConfigService, ConfigService } from "../services/configService";
// export interface IConfig {
//     updateConfig(): void;
// }
// export class Config implements IConfig {
//     _logger: ILogService = new LogService();
//     _configService: IConfigService = new ConfigService();
//     updateConfig(): void {
//         let config = {
//             paths: {
//                 styles: "./src",
//             },
//             format: {
//                 styles: "scss",
//             },
//             addToManifest: true,
//             importAbstracts: true
//         };
//         // switch (program.args.length) {
//         //     case 1:
//         //         this._logger.warning('Please be sure to include the configuration property and value or initialize a config file using the "init" keyword.')
//         //         break;
//         //     case 2:
//         //         this.initializeConfig();
//         //         break;
//         //     case 3:
//         //         this._configService.saveConfig(program.args[1], program.args[2]);
//         //         break;
//         //     default:
//         //         this._logger.warning('Sorry, we were not able to process your request.');
//         //         break;
//         // }
//     }
//     initializeConfig(): void {
//         if (program.args[1].toLowerCase() === 'init') {
//             this._configService.saveConfig();
//         } else {
//             this._logger.warning('Please be sure to include the configuration property and value');
//         }
//     }
// }
