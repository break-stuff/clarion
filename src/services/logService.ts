import * as chalk from "chalk";

export interface ILogService {
    log(message: string): void;
    error(message: string): void;
    warning(message: string): void;
    success(message: string): void;
    info(message: string): void;
}

export class LogService implements ILogService {
    log(message: string): void {
        console.log(message);
    }

    error(message: string): void {
        console.log(chalk.red(message));
    }

    warning(message: string): void {
        console.log(chalk.yellow(message));
    }

    success(message: string): void {
        console.log(chalk.green(message));
    }

    info(message: string): void {
        console.log(chalk.blue(message));
    }
}