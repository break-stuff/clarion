"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.starterQuestions = {
    projectStart: [
        {
            type: "list",
            name: "projectStart",
            message: "Start with default settings or would you like to customize your setup?",
            choices: ["Default (Starter Project, SCSS, Webpack)", "Manual Configuration"]
        }
    ],
    projectType: [
        {
            type: "list",
            name: "projectType",
            message: "What can we get you started with?",
            choices: ["Starter Project", "Styles Only", "Architecture Only"]
        }
    ],
    projectName: [
        {
            type: "input",
            name: "projectName",
            message: "Project Name:",
            validate: (value) => value.length > 0 || "Project Name is required."
        }
    ],
    styleFormat: [
        {
            type: "list",
            name: "styleFormat",
            message: "What style format would you like to use?",
            choices: ["SCSS", "SASS", "LESS"]
        }
    ],
    pipeline: [
        {
            type: "list",
            name: "pipeline",
            message: "What bundler or task-runner would you like to use?",
            choices: ["Webpack", "Parcel", "Gulp", "Grunt"]
        }
    ]
};
exports.newProject = {
    options: {
        projectType: {
            starter: "Starter Project",
            stylesOnly: "Styles Only",
            architectureOnly: "Architecture Only"
        },
        styleFormat: {
            scss: "SCSS",
            sass: "SASS",
            less: "LESS"
        },
        pipeline: {
            webpack: "Webpack",
            parcel: "Parcel",
            gulp: "Gulp",
            grunt: "Grunt"
        }
    }
};
