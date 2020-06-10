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