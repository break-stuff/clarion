"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
class LogManager {
    log(message) {
        console.log(message);
    }
    error(message) {
        console.log(chalk.red(message));
    }
    warning(message) {
        console.log(chalk.yellow(message));
    }
    success(message) {
        console.log(chalk.green(message));
    }
    info(message) {
        console.log(chalk.blue(message));
    }
}
exports.LogManager = LogManager;
