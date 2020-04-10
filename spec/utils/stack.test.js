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
const Stack = require('../../utils/stack');

var stack;

beforeEach(() => {
    stack = new Stack();
});

test('empty stack', () => {
    
    expect(stack.hasElements()).toBeFalsy();
    expect(stack.pop()).toBeUndefined();
    expect(() => stack.peek()).toThrowError(new Error('Stack out of bounds!!'));
});

test('stack push one element', () => {
    
    expect(stack.hasElements()).toBeFalsy();

    stack.push('a');
    expect(stack.hasElements()).toBeTruthy();

    expect(stack.peek()).toBe('a');

    expect(stack.hasElements()).toBeTruthy();
});

test('stack push and pop one element', () => {
    
    expect(stack.hasElements()).toBeFalsy();

    stack.push('a');
    expect(stack.hasElements()).toBeTruthy();
    
    expect(stack.peek()).toBe('a');
    expect(stack.hasElements()).toBeTruthy();

    stack.pop();

    expect(stack.hasElements()).toBeFalsy();
    expect(() => stack.peek()).toThrowError(new Error('Stack out of bounds!!'));
});

test('stack push two elements and pop one element', () => {
    
    expect(stack.hasElements()).toBeFalsy();

    stack.push('a');
    expect(stack.hasElements()).toBeTruthy();

    stack.push('b');
    expect(stack.hasElements()).toBeTruthy();
    
    expect(stack.peek()).toBe('b');
    expect(stack.hasElements()).toBeTruthy();

    stack.pop();
    
    expect(stack.hasElements()).toBeTruthy();
    
});

test('stack push two elements and pop two elements', () => {
    
    expect(stack.hasElements()).toBeFalsy();

    stack.push('a');
    expect(stack.hasElements()).toBeTruthy();
    
    expect(stack.peek()).toBe('a');
    expect(stack.hasElements()).toBeTruthy();

    stack.push('b');
    expect(stack.hasElements()).toBeTruthy();
    
    expect(stack.peek()).toBe('b');
    expect(stack.hasElements()).toBeTruthy();

    stack.pop();

    expect(stack.peek()).toBe('a');
    expect(stack.hasElements()).toBeTruthy();

    stack.pop();

    expect(stack.hasElements()).toBeFalsy();
    expect(() => stack.peek()).toThrowError(new Error('Stack out of bounds!!'));
});