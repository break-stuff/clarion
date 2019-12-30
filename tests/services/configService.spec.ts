import { should, expect } from 'chai';
import { ConfigService } from '../../src/services/configService';

describe('Config Service', () => {
    describe('updateConfigData()', () => {
        it('it should return an updated config object', () => {
            // arrange
            let sut = new ConfigService();
            let response = {
                stylePath: '/src/test',
                styleFormat: 'sass',
                addToManifest: false,
                importAbstracts: true
            };
            let expectedResult = {
                paths: {
                    styles: '/src/test',
                },
                format: {
                    styles: 'sass',
                },
                addToManifest: false,
                importAbstracts: true
            };

            // act
            let config = sut.updateConfigData(response);

            // assert
            expect(config).to.deep.equal(expectedResult);
        });
    });
});