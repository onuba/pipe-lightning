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
const TemplaterManager = require('../../template/templater.manager');

test('test not existing template engine', () => {
  
    
    expect(() => 
        new TemplaterManager('not_exists')
    ).toThrowError(new Error("No adapter found for not_exists template engine!"));
});

test('test existing template engine', () => {
  
    
    var template_engine = new TemplaterManager('ejs')

    expect(template_engine).toBeDefined();

    template_engine.data = {data1: 'aaaaa'}

    template_engine.strTemplateToString('poc');
});

test('test differents objects for template engine', () => {
  
    
    var template_engine = new TemplaterManager('ejs')
    var template_engine2 = new TemplaterManager('ejs')

    expect(template_engine).toBeDefined();
    expect(template_engine2).toBeDefined();

    template_engine.data = {data1: 'aaaaa'}
    template_engine.strTemplateToString('poc');

    template_engine2.data = {data1: 'bbbbb'}
    template_engine2.strTemplateToString('poc');

    template_engine.strTemplateToString('poc2');
});

/*test('add one 0 to match', () => {
  
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
});*/