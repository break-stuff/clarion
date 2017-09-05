"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    webPack: {
        dependencies: {
            "autoprefixer": "^7.1.2",
            "css-loader": "^0.28.4",
            "cross-env": "^3.0.0",
            "extract-text-webpack-plugin": "^3.0.0",
            "postcss-loader": "^2.0.6",
            "webpack": "^3.5.5",
            "webpack-dev-server": "^2.7.1",
            "cssnano": "^3.10.0",
        },
        commands: {
            "dev": "cross-env NODE_ENV=development webpack-dev-server --progress --open --hot",
            "build": "cross-env NODE_ENV=production webpack --progress --hide-modules -p"
        }
    },
    gulp: {
        dependencies: {
            "autoprefixer": "^7.1.2",
            "cross-env": "^3.0.0",
            "gulp": "^3.9.1",
            "gulp-postcss": "^7.0.0",
            "gulp-webserver": "^0.9.1",
            "cssnano": "^3.10.0",
        },
        commands: {
            "dev": "cross-env NODE_ENV=development gulp dev",
            "build": "cross-env NODE_ENV=production gulp build"
        }
    },
};
