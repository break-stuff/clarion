import { should, expect } from 'chai';
import { IAdd, Add } from '../../src/commands/add';

describe('New Project Services', () => {
    describe('getNewFile()', () => {
        it('it should convert new file path to proper file format', () => {
            // arrange
            let fileName = 'test/test/file';
            let extension = 'sass';
            let sut = new Add();

            // act
            let result = sut.getNewFile(fileName, extension);

            // assert
            expect(result).to.equal('test/test/_file.sass');
        });
    });

    describe('getPathToRoot()', () => {
        it('it should return the path to the root directory', () => {
            // arrange
            let fileName = 'test/test/file';
            let sut = new Add();

            // act
            let result = sut.getPathToRoot(fileName);

            // assert
            expect(result).to.equal('../../../');
        });
    });
});