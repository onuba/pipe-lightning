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

test('excel2json with not exist file', (done) => {

    parserManager.parseFrom('excel2json', {}).then(
        (data) => {
        },
        (error) => {
            expect(error).toBeDefined();
            expect(error.message).toBe('The "path" argument must be of type string or an instance of Buffer or URL. Received undefined');
            done();
        }
    );
});

test('excel2json with valid file', (done) => {

    parserManager.parseFrom('excel2json', { filePath: './spec/parser/files/test.xlsx' }).then(
        (data) => {

            try {
                expect(data).toBeDefined();
                expect(typeof data).toBe('object');

                expect(data.headers).toBeDefined();
                expect(typeof data.headers).toBe('object')

                expect(data.data).toBeDefined();
                expect(typeof data.data).toBe('object');

                expect(data.headers[0]).toBe('cab1');
                expect(data.headers[1]).toBe('cab2');
                expect(data.headers[2]).toBe('cab3');

                expect(data.data.length).toBe(5);

                expect(data.data[0].cab1).toBe(1);
                /*expect(obj.xml.tag1).toBeDefined();
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
                expect(obj.xml.tag2.tag3).toBeInstanceOf(Object);*/

                done();
            } catch (error) {
                done(error);
            }
        },
        (error) => {
        }
    );
});