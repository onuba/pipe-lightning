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
const utils = require('../../utils/utils');

var context;

beforeEach(() => {
    context = {};
});

test('add value to object', () => {
    
    expect(context.path).toBeUndefined();
    utils.addToObject(context, 'path', {}, {a: 1});

    expect(context.path).toBeDefined();
    expect(context.path).toBeInstanceOf(Object);
    
    expect(context.path.a).toBe(1);
    
});

test('add array to object', () => {
    
    expect(context.path).toBeUndefined();
    utils.addToObject(context, 'path', {}, [1]);

    expect(context.path).toBeDefined();
    expect(context.path).toBeInstanceOf(Object);
    
    expect(context.path[0]).toEqual(1);
    
});

test('add wrong value to object', () => {
    
    expect(context.path).toBeUndefined();
    utils.addToObject(context, 'path', {}, 1);

    expect(context.path).toBeDefined();
    expect(context.path).toBeInstanceOf(Object);
    
    expect(context.path).toEqual({});
    
});

test('add empty value to object', () => {
    
    expect(context.path).toBeUndefined();
    utils.addToObject(context, 'path', {}, {});

    expect(context.path).toBeDefined();
    expect(context.path).toBeInstanceOf(Object);
    
    expect(context.path).toEqual({});
    
});

test('add undefined value to object', () => {
    
    expect(context.path).toBeUndefined();
    utils.addToObject(context, 'path', {}, undefined);

    expect(context.path).toBeDefined();
    expect(context.path).toBeInstanceOf(Object);
    
    expect(context.path).toEqual({});
    
});

test('add value to array', () => {
    
    expect(context.path).toBeUndefined();
    utils.addToObject(context, 'path', [], 1);

    expect(context.path).toBeDefined();
    expect(context.path).toBeInstanceOf(Array);
    expect(context.path.length).toBe(1);
    expect(context.path[0]).toBe(1);
    
});

test('add undefined value to array', () => {
    
    expect(context.path).toBeUndefined();
    utils.addToObject(context, 'path', [], undefined);

    expect(context.path).toBeDefined();
    expect(context.path).toBeInstanceOf(Array);
    expect(context.path.length).toBe(1);
    expect(context.path[0]).toBeUndefined();
    
});

test('add array to array', () => {
    
    expect(context.path).toBeUndefined();
    utils.addToObject(context, 'path', [], [1]);

    expect(context.path).toBeDefined();
    expect(context.path).toBeInstanceOf(Array);
    expect(context.path.length).toBe(1);
    expect(context.path[0]).toBe(1);
    
});

test('add two arrays to array', () => {
    
    expect(context.path).toBeUndefined();
    utils.addToObject(context, 'path', [], [1]);
    utils.addToObject(context, 'path', [], [2]);
    
    expect(context.path).toBeDefined();
    expect(context.path).toBeInstanceOf(Array);
    expect(context.path.length).toBe(2);
    expect(context.path[0]).toBe(1);
    expect(context.path[1]).toBe(2);
    
});

test('add objet to array', () => {
    
    expect(context.path).toBeUndefined();
    utils.addToObject(context, 'path', [], {a: 1});

    expect(context.path).toBeDefined();
    expect(context.path).toBeInstanceOf(Array);
    expect(context.path.length).toBe(1);
    expect(context.path[0]).toBeInstanceOf(Object);
    expect(context.path[0].a).toBe(1);
    
});

test('Add two object with sames arrays and combined it', () => {

    context.input = {}
    context.input.input1 = { 'a': [1], 'b': [2] };
    var other = { 'a': [3], 'b': [4] };

    utils.addToObject(context, 'input.input1', {}, other);

    expect(context.input.input1.a).toBeDefined();
    expect(context.input.input1.a).toBeInstanceOf(Array);
    expect(context.input.input1.a.length).toBe(2);
    expect(context.input.input1.a[0]).toBe(1);
    expect(context.input.input1.a[1]).toBe(3);

    expect(context.input.input1.b).toBeInstanceOf(Array);
    expect(context.input.input1.b.length).toBe(2);
    expect(context.input.input1.b[0]).toBe(2);
    expect(context.input.input1.b[1]).toBe(4);

});

test('Add two object with different arrays and keys and combined it', () => {

    context.input = {}
    context.input.input1 = { 'a': [1], 'b': [2] };
    var other = { 'a': [3], 'b': [4], c: [2,3], d: 'd_value', f: {f_prop1: 'f_prop1_value'} };

    utils.addToObject(context, 'input.input1', {}, other);

    expect(context.input.input1.a).toBeDefined();
    expect(context.input.input1.a).toBeInstanceOf(Array);
    expect(context.input.input1.a.length).toBe(2);
    expect(context.input.input1.a[0]).toBe(1);
    expect(context.input.input1.a[1]).toBe(3);

    expect(context.input.input1.b).toBeInstanceOf(Array);
    expect(context.input.input1.b.length).toBe(2);
    expect(context.input.input1.b[0]).toBe(2);
    expect(context.input.input1.b[1]).toBe(4);

    expect(context.input.input1.c).toBeInstanceOf(Array);
    expect(context.input.input1.c.length).toBe(2);
    expect(context.input.input1.c[0]).toBe(2);
    expect(context.input.input1.c[1]).toBe(3);

    expect(context.input.input1.d).toBe('d_value');

    expect(context.input.input1.f).toBeInstanceOf(Object);
    expect(context.input.input1.f.f_prop1).toBe('f_prop1_value');

});

// ---------------------- listAsStrWithSeparator

test('listAsStrWithSeparator iterable as undefined ', () => {

    const str = utils.listAsStrWithSeparator(undefined, '')

    expect(str).toBeDefined();
    expect(str).toBe('');
});

test('listAsStrWithSeparator iterable as empty ', () => {

    const str = utils.listAsStrWithSeparator([], '')

    expect(str).toBeDefined();
    expect(str).toBe('');
});

test('listAsStrWithSeparator separator as undefined ', () => {

    const str = utils.listAsStrWithSeparator([], undefined)

    expect(str).toBeDefined();
    expect(str).toBe('');
});

test('listAsStrWithSeparator iterable empty separator as whitespace ', () => {

    const str = utils.listAsStrWithSeparator([], ' ')

    expect(str).toBeDefined();
    expect(str).toBe('');
});

test('listAsStrWithSeparator separator as ; whitouth last ', () => {

    const str = utils.listAsStrWithSeparator(['a', 'b'], ';')

    expect(str).toBeDefined();
    expect(str).toBe('a;b');
});

// ---------------------- split

test('split all null', () => {

    const parts = utils.split(undefined, undefined, undefined)

    expect(parts).toBeDefined();
    expect(parts).toBeInstanceOf(Array);
    expect(parts.length).toBe(0);
});

test('split delimiter and rejoin null', () => {

    const parts = utils.split('', undefined, undefined)

    expect(parts).toBeDefined();
    expect(parts).toBeInstanceOf(Array);
    expect(parts.length).toBe(0);
});

test('split rejoin null', () => {

    const parts = utils.split('', '', undefined)

    expect(parts).toBeDefined();
    expect(parts).toBeInstanceOf(Array);
    expect(parts.length).toBe(0);
});

test('split all empty', () => {

    const parts = utils.split('', '', '')

    expect(parts).toBeDefined();
    expect(parts).toBeInstanceOf(Array);
    expect(parts.length).toBe(0);
});

test('split delimiter and rejoin empty', () => {

    str = "this is a test, 'a good, or valid, test', let´s see"
    const parts = utils.split(str, '', '')

    expect(parts).toBeDefined();
    expect(parts).toBeInstanceOf(Array);
    expect(parts.length).toBe(1);
    expect(parts[0]).toBe(str);
});

test('split delimiter not exists', () => {

    str = "this is a test, 'a good, or valid, test', let´s see"
    const parts = utils.split(str, '<', '')

    expect(parts).toBeDefined();
    expect(parts).toBeInstanceOf(Array);
    expect(parts.length).toBe(1);
    expect(parts[0]).toBe(str);
});

test('split delimiter exists, not rejoin', () => {

    str = "this is a test, 'a good, or valid, test', let´s see"
    const parts = utils.split(str, ',', '')

    expect(parts).toBeDefined();
    expect(parts).toBeInstanceOf(Array);
    expect(parts.length).toBe(5);
    expect(parts[0]).toBe('this is a test');
    expect(parts[1]).toBe(" 'a good");
    expect(parts[2]).toBe(' or valid');
    expect(parts[3]).toBe(" test'");
    expect(parts[4]).toBe(" let´s see");
});

test('split delimiter exists and rejoin', () => {

    str = "this is a test, 'a good, or valid, test', let´s see"
    const parts = utils.split(str, ',', "'")

    expect(parts).toBeDefined();
    expect(parts).toBeInstanceOf(Array);
    expect(parts.length).toBe(3);
    expect(parts[0]).toBe('this is a test');
    expect(parts[1]).toBe(" 'a good, or valid, test'");
    expect(parts[2]).toBe(" let´s see");
});

test('split delimiter exists and rejoin insert expression', () => {

    str = "('www.dominio.com', 'Consultors', 'https://dominio.com/pdp/', 'Consultoria', NULL, NULL, NULL, NULL, NULL, NULL, 'Web corporativa l''empresa informatiu', 0, NULL, NULL, NULL, NULL, NULL, 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, '', '', '', 0, 0, 'info@email.com'),"
    const parts = utils.split(str, ',', "'")

    expect(parts).toBeDefined();
    expect(parts).toBeInstanceOf(Array);
    expect(parts.length).toBe(44);
    expect(parts[0]).toBe("('www.dominio.com'");
    expect(parts[1]).toBe(" 'Consultors'");
    expect(parts[2]).toBe(" 'https://dominio.com/pdp/'");
    expect(parts[3]).toBe(" 'Consultoria'")
    expect(parts[4]).toBe(" NULL")
    expect(parts[5]).toBe(" NULL")
    expect(parts[6]).toBe(" NULL")
    expect(parts[7]).toBe(" NULL")
    expect(parts[8]).toBe(" NULL")
    expect(parts[9]).toBe(" NULL")
    expect(parts[10]).toBe(" 'Web corporativa l''empresa informatiu'")
    expect(parts[11]).toBe(" 0")
    expect(parts[12]).toBe(" NULL")
    expect(parts[13]).toBe(" NULL")
    expect(parts[14]).toBe(" NULL")
    expect(parts[15]).toBe(" NULL")
    expect(parts[16]).toBe(" NULL")
    expect(parts[17]).toBe(" 0")
    expect(parts[18]).toBe(" ''")
    expect(parts[19]).toBe(" 0")
    expect(parts[20]).toBe(" 0")
    expect(parts[21]).toBe(" 0")
    expect(parts[22]).toBe(" 0")
    expect(parts[23]).toBe(" 0")
    expect(parts[24]).toBe(" 0")
    expect(parts[25]).toBe(" 0")
    expect(parts[26]).toBe(" 0")
    expect(parts[27]).toBe(" 0")
    expect(parts[28]).toBe(" 1")
    expect(parts[29]).toBe(" NULL")
    expect(parts[30]).toBe(" NULL")
    expect(parts[31]).toBe(" NULL")
    expect(parts[32]).toBe(" NULL")
    expect(parts[33]).toBe(" NULL")
    expect(parts[34]).toBe(" 0")
    expect(parts[35]).toBe(" 0")
    expect(parts[36]).toBe(" 0")
    expect(parts[37]).toBe(" ''")
    expect(parts[38]).toBe(" ''")
    expect(parts[39]).toBe(" ''")
    expect(parts[40]).toBe(" 0")
    expect(parts[41]).toBe(" 0")
    expect(parts[42]).toBe(" 'info@email.com')")
    expect(parts[43]).toBe("")
});
