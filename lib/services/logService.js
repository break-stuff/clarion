"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
class LogService {
    log(message) {
        console.log(message);
    }
    error(message) {
        console.log(chalk_1.default.red(message));
    }
    warning(message) {
        console.log(chalk_1.default.yellow(message));
    }
    success(message) {
        console.log(chalk_1.default.green(message));
    }
    info(message) {
        console.log(chalk_1.default.blue(message));
    }
}
exports.LogService = LogService;
