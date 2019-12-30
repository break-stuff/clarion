import { should, expect } from 'chai';
import { IProjectTypeData, projectData } from '../../src/data/projectData';
import { INewProjectInfo, newProject } from "../../src/data/newProject";
import { IProjectDataService, ProjectDataService } from  '../../src/services/projectService';

describe('Project Data Service', () => {
    describe('getHtmlTemplate()', () => {
        it('it should replace template strings with specified file paths', () => {
            // arrange
            let sut = new ProjectDataService('grunt', 'scss');

            // act
            let htmlTemplate = sut.getHtmlTemplate('/dist/styles.css', '/dist/scripts.js');

            // assert
            expect(htmlTemplate.includes('/dist/styles.css')).to.be.true;
            expect(htmlTemplate.includes('/dist/scripts.js')).to.be.true;
        });
    });

    describe('updateConfigTemplateWithProjectData()', () => {
        it('it should update Grunt config with "grunt-contrib-less"', () => {
            // arrange
            let sut = new ProjectDataService('Grunt', 'less');

            // act
            let gruntConfig = sut.updateConfigTemplateWithProjectData('less', 'less');

            // assert
            expect(gruntConfig.includes('grunt-contrib-less')).to.be.true;
        });

        it('it should import "node-sass" library into Grunt config', () => {
            // arrange
            let sut = new ProjectDataService('Grunt', 'sass');

            // act
            let gruntConfig = sut.updateConfigTemplateWithProjectData('scss', 'sass');

            // assert
            expect(gruntConfig.includes('const sass = require("node-sass");')).to.be.true;
        });

        it('it should update Grunt config to look for files in the "SCSS" format', () => {
            // arrange
            let sut = new ProjectDataService('Grunt', 'sass');

            // act
            let gruntConfig = sut.updateConfigTemplateWithProjectData('scss', 'sass');

            // assert
            expect(gruntConfig.includes('src/scss/styles.scss')).to.be.true;
        });

        it('it should update Webpack config to look for files in the "LESS" format', () => {
            // arrange
            let sut = new ProjectDataService('Webpack', 'less');

            // act
            let webpackConfig = sut.updateConfigTemplateWithProjectData('less', 'less');
            
            // assert
            expect(webpackConfig.includes('.less$')).to.be.true;
        });
    });

    describe('getProjectDependencies()', () => {
        it('it should return an array of "sass" dependencies for Grunt', () => {
            // arrange
            let sut = new ProjectDataService('Grunt', 'SCSS');

            // act
            let sassDependencies = sut.getProjectDependencies();

            // assert
            expect(sassDependencies.some(x => x === 'grunt-sass')).to.be.true;
        });
    });
});