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

test('xml2json with not exist file', (done) => {

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

test('xml2json with valid file as compact', (done) => {

    parserManager.parseFrom('xml2json', { data: xmlFile, compact: true },
        (data) => {

            try {
                expect(data).toBeDefined();
                expect(typeof data).toBe('string');

                const obj = JSON.parse(data);
                expect(obj).toBeDefined();

                expect(obj.xml).toBeDefined();
                expect(obj.xml.tag1).toBeDefined();
                expect(obj.xml.tag1).toBeInstanceOf(Array);
                expect(obj.xml.tag1.length).toBe(3);

                expect(obj.xml.tag2).toBeDefined();
                expect(obj.xml.tag2).toBeInstanceOf(Object);
                
                expect(obj.xml.tag2._attributes).toBeDefined();
                expect(obj.xml.tag2._attributes).toBeInstanceOf(Object);
                expect(obj.xml.tag2._attributes.property1).toBe('c');
                expect(obj.xml.tag2._attributes.property2).toBe('d');

                expect(obj.xml.tag2.tag1).toBeDefined();
                expect(obj.xml.tag2.tag1).toBeInstanceOf(Object);
                expect(obj.xml.tag2.tag1._attributes).toBeDefined();
                expect(obj.xml.tag2.tag1._attributes).toBeInstanceOf(Object);
                expect(obj.xml.tag2.tag1._attributes.property1).toBe('e');

                expect(obj.xml.tag2.tag3).toBeDefined();
                expect(obj.xml.tag2.tag3).toBeInstanceOf(Object);

                done();
            } catch (error) {
                done(error);
            }
        },
        (error) => {
        }
    );
});

test('xml2json with valid file as no compact', (done) => {

    parserManager.parseFrom('xml2json', { data: xmlFile, toObject: true, compact: true },
        (data) => {

            try {
                expect(data).toBeDefined();
                expect(data).toBeInstanceOf(Object);
                
                expect(data.xml).toBeDefined();
                expect(data.xml.tag1).toBeDefined();
                expect(data.xml.tag1).toBeInstanceOf(Array);
                expect(data.xml.tag1.length).toBe(3);

                expect(data.xml.tag2).toBeDefined();
                expect(data.xml.tag2).toBeInstanceOf(Object);
                
                expect(data.xml.tag2._attributes).toBeDefined();
                expect(data.xml.tag2._attributes).toBeInstanceOf(Object);
                expect(data.xml.tag2._attributes.property1).toBe('c');
                expect(data.xml.tag2._attributes.property2).toBe('d');

                expect(data.xml.tag2.tag1).toBeDefined();
                expect(data.xml.tag2.tag1).toBeInstanceOf(Object);
                expect(data.xml.tag2.tag1._attributes).toBeDefined();
                expect(data.xml.tag2.tag1._attributes).toBeInstanceOf(Object);
                expect(data.xml.tag2.tag1._attributes.property1).toBe('e');

                expect(data.xml.tag2.tag3).toBeDefined();
                expect(data.xml.tag2.tag3).toBeInstanceOf(Object);

                done();
            } catch (error) {
                done(error);
            }
        },
        (error) => {
        }
    );
});