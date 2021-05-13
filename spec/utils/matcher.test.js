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
const matcher = require('../../utils/matcher');

test('test right expression one time', () => {
  
    const str = 'lorem ipsum time="100" ipsum lorem';

    const regex = /time\s*=\s*"(\d+)"/g

    expect(matcher.hasMatch(str, regex)).toBeTruthy();

    const matchs = matcher.match(str, regex)

    expect(matchs).toBeInstanceOf(Array);
    expect(matchs.length).toBe(1);
    expect(matchs[0]).toBeInstanceOf(Array);
    expect(matchs[0].length).toBe(2);
    expect(matchs[0][0]).toBe('time="100"')
    expect(matchs[0][1]).toBe('100')
});

test('add one 0 to match', () => {
  
    const str = 'lorem ipsum time="100" ipsum lorem';

    const regex = /time\s*=\s*"(\d+)"/g

    expect(matcher.hasMatch(str, regex)).toBeTruthy();

    const newStr = matcher.replaceAll(str, regex, 'time="${group_1}0"')
    
    expect(newStr).toBeDefined();
    expect(newStr).toBe('lorem ipsum time="1000" ipsum lorem')
});

test('test right expression 2 time', () => {
  
    const str = 'lorem ipsum time="100" ipsum lorem time = "1000"';

    const regex = /time\s*=\s*"(\d+)"/g

    expect(matcher.hasMatch(str, regex)).toBeTruthy();

    const matchs = matcher.match(str, regex)

    expect(matchs).toBeInstanceOf(Array);
    expect(matchs.length).toBe(2);

    expect(matchs[0]).toBeInstanceOf(Array);
    expect(matchs[0].length).toBe(2);
    expect(matchs[0][0]).toBe('time="100"')
    expect(matchs[0][1]).toBe('100')

    expect(matchs[1]).toBeInstanceOf(Array);
    expect(matchs[1].length).toBe(2);
    expect(matchs[1][0]).toBe('time = "1000"')
    expect(matchs[1][1]).toBe('1000')
});

test('add one 0 to all match', () => {
  
    const str = 'lorem ipsum time="100" ipsum lorem time = "1000"';

    const regex = /time\s*=\s*"(\d+)"/g

    expect(matcher.hasMatch(str, regex)).toBeTruthy();

    const newStr = matcher.replaceAll(str, regex, 'time="${group_1}0"')
    
    expect(newStr).toBeDefined();
    expect(newStr).toBe('lorem ipsum time="1000" ipsum lorem time="10000"')
});

test('add one 0 to all match with named groups', () => {
  
    const str = 'lorem ipsum time="100" ipsum lorem time = "1000"';

    const regex = /time\s*=\s*"(?<time>\d+)"/g

    expect(matcher.hasMatch(str, regex)).toBeTruthy();

    const newStr = matcher.replaceAll(str, regex, 'time="${time}0"')
    
    expect(newStr).toBeDefined();
    expect(newStr).toBe('lorem ipsum time="1000" ipsum lorem time="10000"')
});

test('test one match in buildInteroperableObject', () => {
  
    const str = '1 2';

    const regex = /(?<number>\d+)/

    expect(matcher.hasMatch(str, regex)).toBeTruthy();
    match = matcher.match(str, regex)
    expect(match).toBeDefined();

    expect(match).toBeInstanceOf(Array);
    expect(match.length).toBe(1);
    expect(match[0]).toBeInstanceOf(Array);

    interopMatch = matcher.buildInterpolableObject(match)

    expect(interopMatch).toBeDefined();
    expect(interopMatch).toBeInstanceOf(Object);
    expect(interopMatch.number).toBe('1')
    
    
});
test('test more than one match in buildInteroperableObject', () => {
  
    const str = '1 2';

    const regex = /(?<number>\d+)/g

    expect(matcher.hasMatch(str, regex)).toBeTruthy();
    match = matcher.match(str, regex)
    expect(match).toBeDefined();

    expect(match).toBeInstanceOf(Array);
    expect(match.length).toBe(2);
    expect(match[0]).toBeInstanceOf(Array);
    expect(match[1]).toBeInstanceOf(Array);

    interopMatch = matcher.buildInterpolableObject(match)

    expect(interopMatch).toBeDefined();
    expect(interopMatch).toBeInstanceOf(Array);
    expect(interopMatch.length).toBe(2)
    expect(interopMatch[0].number).toBe('1')
    expect(interopMatch[1].number).toBe('2')
    
    
});