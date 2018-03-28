import { should, expect } from 'chai';
import program from '../../src/clarion';
import { IProjectDataService, ProjectDataService } from '../../src/services/projectService';

describe('Project Data Service', () => {
    describe('getProjectTypeData()', () => {
        it('it should return the grunt object', () => {
            // arrange
            let sut = new ProjectDataService();
            let gruntConfigFile = 'gruntfile.js';

            // act
            program.parse(['clarion', 'new', 'Test', '--grunt']);
            let projectTypeData = sut.getProjectTypeData();

            // assert
            expect(projectTypeData.configFile).to.equal(gruntConfigFile);
        });
    });

    describe('getProjectDependencies()', () => {
        it('it should return less dependencies for a Grunt project', () => {
            // arrange
            let sut = new ProjectDataService();
            let gruntLessDependencies = [
                "autoprefixer",
                "cssnano",
                "pixrem",
                "grunt",
                "grunt-postcss",
                "grunt-contrib-watch",
                "grunt-contrib-connect",
                "cross-env",
                'grunt-contrib-less'
            ];

            // act
            program.parse(['clarion', 'new', 'Test', '--grunt', '--less']);
            let projectDependencies = sut.getProjectDependencies();

            // assert
            expect(projectDependencies).to.deep.equal(gruntLessDependencies);
        });
    });

    describe('getConfigFileContents()', () => {
        it('it should return grunt config file content for sass project', () => {
            // arrange
            let sut = new ProjectDataService();
            let configContents = `
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                files: {
                    'build/styles.css': 'src/sass/styles.sass'
                }
            }
        },
        watch: {
            css: {
                files: '**/*.sass',
                tasks: [
                    'sass'
                ]
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')(),
                    require('cssnano')(),
                    require('pixrem')()
                ]
            },
            dist: {
                src: 'css/*.css'
            }
        },
        connect: {
            uses_defaults: {}
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.registerTask('dev', ['sass', 'connect', 'watch']);
    grunt.registerTask('build', ['sass']);
}`;
    
            // act
            program.parse(['clarion', 'new', 'Test', '--grunt', '--sass']);
            let configFile =  sut.getConfigFileContents();

            // assert
            expect(configFile).to.equal(configContents);
        });
    });
});