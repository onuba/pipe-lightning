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

var noCompactJson;
var compactJson;

beforeAll(() => {
    noCompactJson = fs.readFileSync('./spec/parser/files/from_no_compact_text_xml.json').toString();
    compactJson = fs.readFileSync('./spec/parser/files/from_compact_text_xml.json').toString();
});

test('json2xml with not exist file', (done) => {

    parserManager.parseFrom('json2xml', {}).then(
        (data) => {
            try {
                expect(data).toEqual('');
            } catch(err) {
                done(err);
            }

            done();
        },
        (error) => {
        }
    );
});

test('json2xml with valid file as compact', (done) => {

    parserManager.parseFrom('json2xml', { data: compactJson, compact: true }).then(
        (data) => {

            try {
                expect(data).toBeDefined();
                expect(typeof data).toBe('string');

                expect(data).toBe(`<xml>
    <tag1 property1="a"/>
    <tag1 property1="b"/>
    <tag1 property1="f"/>
    <tag2 property1="c" property2="d">
        <tag1 property1="e"/>
        <tag3/>
    </tag2>
</xml>`)

                done();
            } catch (error) {
                done(error);
            }
        },
        (error) => {
        }
    );
});

test('json2xml with valid file as no compact', (done) => {

    parserManager.parseFrom('json2xml', { data: noCompactJson, compact: false }).then(
        (data) => {

            try {
                expect(data).toBeDefined();
                expect(typeof data).toBe('string');

                expect(data).toBe(`<xml>
    <tag1 property1="a"/>
    <tag1 property1="b"/>
    <tag2 property1="c" property2="d">
        <tag1 property1="e"/>
        <tag3/>
    </tag2>
    <tag1 property1="f"/>
</xml>`)

                done();
            } catch (error) {
                done(error);
            }
        },
        (error) => {
        }
    );
});

/*test('json2xml with valid file as no compact as object', (done) => {

    parserManager.parseFrom('json2xml', { data: xmlFile, compact: false, toObject: true },
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