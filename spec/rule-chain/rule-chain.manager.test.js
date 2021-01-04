/* 
 # Copyright (C) 2021 Francisco Hernández (github.com/onuba)
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
const RuleChainManager = require('../../rule-chain/rule-chain.manager'),
    fs = require('fs');

var ruleChainManager;
var jsonObj;

beforeAll(() => {
    // Relative path to rule-chain.manager.js module
    ruleChainManager = new RuleChainManager('../spec/rule-chain/rule-chain-def')
});

beforeEach(() => {
    jsonObj = JSON.parse(fs.readFileSync('./spec/rule-chain/json.json').toString())
});

test('test rules with object', () => {
  
    expect(ruleChainManager).toBeDefined();
    expect(jsonObj).toBeDefined();

    var context = {}

    ruleChainManager.parse(context, jsonObj)

    console.log(JSON.stringify(jsonObj))
});