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

var ddlFile;

beforeAll(() => {
    ddlFile = fs.readFileSync('./spec/parser/files/replaced_mysql.ddl.sql').toString();
});

test('ddl2json with not exist file', (done) => {

    parserManager.parseFrom('ddl2json', {},
        (data) => {
        },
        (error) => {
            expect(error).toBeDefined();
            expect(error.message).toBe("Cannot read property 'length' of undefined");
            done();
        }
    );
});

test('ddl2json with valid file as compactJson', (done) => {

    parserManager.parseFrom('ddl2json', { data: ddlFile },
        (data) => {

            try {
                expect(data).toBeDefined();
                console.log(data)
                expect(typeof data).toBe('object');

                /*const obj = JSON.parse(data);
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

/*test('ddl2json with valid file as object', (done) => {

    parserManager.parseFrom('ddl2json', { data: xmlFile, toObject: true, compact: true },
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

test('ddl2json with valid file as no compact', (done) => {

    parserManager.parseFrom('ddl2json', { data: xmlFile, compact: false },
        (data) => {

            try {
                expect(data).toBeDefined();
                expect(typeof data).toBe('string');

                const obj = JSON.parse(data);
                expect(obj).toBeDefined();

                expect(obj.elements).toBeDefined();
                expect(obj.elements).toBeInstanceOf(Array);
                expect(obj.elements.length).toBe(1);

                expect(obj.elements[0].type).toBe('element');
                expect(obj.elements[0].name).toBe('xml');

                expect(obj.elements[0].elements).toBeDefined();
                expect(obj.elements[0].elements).toBeInstanceOf(Array);
                expect(obj.elements[0].elements.length).toBe(4);
               
                expect(obj.elements[0].elements[0].type).toBe('element');
                expect(obj.elements[0].elements[0].name).toBe('tag1');

                expect(obj.elements[0].elements[0].attributes).toBeDefined();
                expect(obj.elements[0].elements[0].attributes).toBeInstanceOf(Object);
                
                expect(obj.elements[0].elements[0].attributes.property1).toBe('a');

                expect(obj.elements[0].elements[1].type).toBe('element');
                expect(obj.elements[0].elements[1].name).toBe('tag1');

                expect(obj.elements[0].elements[1].attributes.property1).toBe('b');

                expect(obj.elements[0].elements[2].type).toBe('element');
                expect(obj.elements[0].elements[2].name).toBe('tag2');
                
                expect(obj.elements[0].elements[2].attributes.property1).toBe('c');
                expect(obj.elements[0].elements[2].attributes.property2).toBe('d');

                expect(obj.elements[0].elements[2].elements).toBeDefined();
                expect(obj.elements[0].elements[2].elements).toBeInstanceOf(Array);
                expect(obj.elements[0].elements[2].elements.length).toBe(2);

                expect(obj.elements[0].elements[2].elements[0].type).toBe('element');
                expect(obj.elements[0].elements[2].elements[0].name).toBe('tag1');
                
                expect(obj.elements[0].elements[2].elements[0].attributes).toBeDefined();
                expect(obj.elements[0].elements[2].elements[0].attributes.property1).toBe('e');

                expect(obj.elements[0].elements[2].elements[1].type).toBe('element');
                expect(obj.elements[0].elements[2].elements[1].name).toBe('tag3');

                expect(obj.elements[0].elements[2].elements[1].attributes).toBeUndefined();

                expect(obj.elements[0].elements[3].type).toBe('element');
                expect(obj.elements[0].elements[3].name).toBe('tag1');

                expect(obj.elements[0].elements[3].attributes).toBeDefined();
                expect(obj.elements[0].elements[3].attributes).toBeInstanceOf(Object);
                
                expect(obj.elements[0].elements[3].attributes.property1).toBe('f');
                
                done();
            } catch (error) {
                done(error);
            }
        },
        (error) => {
        }
    );
});

test('ddl2json with valid file as no compact as object', (done) => {

    parserManager.parseFrom('ddl2json', { data: xmlFile, compact: false, toObject: true },
        (data) => {

            try {
                expect(data).toBeDefined();
                expect(data).toBeInstanceOf(Object);

                expect(data.elements).toBeDefined();
                expect(data.elements).toBeInstanceOf(Array);
                expect(data.elements.length).toBe(1);

                expect(data.elements[0].type).toBe('element');
                expect(data.elements[0].name).toBe('xml');

                expect(data.elements[0].elements).toBeDefined();
                expect(data.elements[0].elements).toBeInstanceOf(Array);
                expect(data.elements[0].elements.length).toBe(4);
               
                expect(data.elements[0].elements[0].type).toBe('element');
                expect(data.elements[0].elements[0].name).toBe('tag1');

                expect(data.elements[0].elements[0].attributes).toBeDefined();
                expect(data.elements[0].elements[0].attributes).toBeInstanceOf(Object);
                
                expect(data.elements[0].elements[0].attributes.property1).toBe('a');

                expect(data.elements[0].elements[1].type).toBe('element');
                expect(data.elements[0].elements[1].name).toBe('tag1');

                expect(data.elements[0].elements[1].attributes.property1).toBe('b');

                expect(data.elements[0].elements[2].type).toBe('element');
                expect(data.elements[0].elements[2].name).toBe('tag2');
                
                expect(data.elements[0].elements[2].attributes.property1).toBe('c');
                expect(data.elements[0].elements[2].attributes.property2).toBe('d');

                expect(data.elements[0].elements[2].elements).toBeDefined();
                expect(data.elements[0].elements[2].elements).toBeInstanceOf(Array);
                expect(data.elements[0].elements[2].elements.length).toBe(2);

                expect(data.elements[0].elements[2].elements[0].type).toBe('element');
                expect(data.elements[0].elements[2].elements[0].name).toBe('tag1');
                
                expect(data.elements[0].elements[2].elements[0].attributes).toBeDefined();
                expect(data.elements[0].elements[2].elements[0].attributes.property1).toBe('e');

                expect(data.elements[0].elements[2].elements[1].type).toBe('element');
                expect(data.elements[0].elements[2].elements[1].name).toBe('tag3');

                expect(data.elements[0].elements[2].elements[1].attributes).toBeUndefined();

                expect(data.elements[0].elements[3].type).toBe('element');
                expect(data.elements[0].elements[3].name).toBe('tag1');

                expect(data.elements[0].elements[3].attributes).toBeDefined();
                expect(data.elements[0].elements[3].attributes).toBeInstanceOf(Object);
                
                expect(data.elements[0].elements[3].attributes.property1).toBe('f');
                
                done();
            } catch (error) {
                done(error);
            }
        },
        (error) => {
        }
    );
});*/