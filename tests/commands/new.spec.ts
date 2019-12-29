import { should, expect } from 'chai';
import { INewProject, NewProject } from '../../src/commands/new';

describe('New Project Services', () => {
    describe('convertToKebabCase()', () => {
        it('it should convert string to kebab case', () => {
            // Arrange
            let sut = new NewProject();
            let text = 'MyTestProjectName';
            let expectedResult = 'my-test-project-name';

            // Act
            let result = sut.convertToKebabCase(text);

            // Assert
            expect(result).is.equal(expectedResult);
        });
    });

    // describe('', ()=> {

    // });
});