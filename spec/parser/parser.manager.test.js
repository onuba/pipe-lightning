/* 
 # Copyright (C) 2020 Francisco Hernández (github.com/onuba)
 # This file is part of pipe-lightning project <https://github.com/onuba/pipe-lightning>.
 #
 # pipe-lightning is free software: you can redistribute it and/or modify
 # it under the terms of the GNU General Public License as published by
 # the Free Software Foundation, either version 3 of the License, or
 # (at your option) any later version.
 #
 # pipe-lightning is distributed in the hope that it will be useful,
 # but WITHOUT ANY WARRANTY; without even the implied warranty of
 # MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 # GNU General Public License for more details.
 #
 # You should have received a copy of the GNU General Public License
 # along with pipe-lightning. If not, see <http://www.gnu.org/licenses/>.
 */
const parserManager = require('../../parser/parser.manager'),
    fs = require('fs');

var xmlFile;

beforeAll(() => {
    xmlFile = fs.readFileSync('./spec/parser/files/test.xml');
});

test('not exists parser strategy', () => {

    expect(() => parserManager.parseFrom('no_exists', {},
        (data) => {
        },
        (error) => {
        }
    )).toThrowError(new Error("Cannot find module './parsers/no_exists.parser' from 'parser.manager.js'"));
});

test('a valid strategy with not exist file', (done) => {

    parserManager.parseFrom('xml2json', {},
        (data) => {
        },
        (error) => {
            expect(error).toBeDefined();
            expect(error.message).toBe("Cannot read property 'length' of undefined");
            done();
        }
    );
});

test('a valid strategy with valid file', (done) => {

    parserManager.parseFrom('xml2json', { data: xmlFile, compact: true },
        (data) => {

            try {
                expect(data).toBeDefined();

                done();
            } catch (error) {
                done(error);
            }
        },
        (error) => {
        }
    );
});