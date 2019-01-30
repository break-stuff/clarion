"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newProjectQuestions = [
    {
        type: 'input',
        name: 'projectName',
        message: 'Project Name:',
        validate: value => value.length > 0 || 'Project Name is required.'
    },
    {
        type: 'list',
        name: 'projectType',
        message: 'What can we get you started with?',
        choices: ['Starter Project', 'Styles Only', 'Architecture Only']
    },
    {
        type: 'list',
        name: 'styleFormat',
        message: 'What style format would you like to use?',
        choices: ['SCSS', 'SASS', 'LESS']
    },
    {
        type: 'list',
        name: 'pipeline',
        message: 'What bundler or task-runner would you like to use?',
        choices: ['Webpack', 'Parcel', 'Gulp', 'Grunt']
    }
];
