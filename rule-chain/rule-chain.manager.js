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
const matcher = require('../utils/matcher'),
    utils = require('../utils/utils')
    fs = require('fs'),
    _ = require('lodash');

const parser_helper = {

    traverse(parserContext, jsonObj, refs, condition, finder_mode) {

        var ret = false;

        if(jsonObj !== null && typeof jsonObj == "object" ) {
            for (let value of Object.values(jsonObj)) {
                // key is either an array index or object key
                if ((finder_mode && !value.condition1_OK) || !finder_mode) {
                    if (parser_helper.verificateNode(parserContext, value, refs, condition)) {
                        if (finder_mode) {
                            value.condition1_OK = true
                        }
                        return true
                    } else {
                        ret = parser_helper.traverse(parserContext, value, refs, condition, finder_mode);
                        if (ret) {
                            break;
                        }
                    }
                }
            }
        }

        return ret;
    },

    verificateNode(parserContext, jsonObj, refs, condition) {

        var ret = false;

        if (condition.search(jsonObj)) {
            refs[condition.ref] = jsonObj;

            var params = {}
            if (condition.match_data) {
                
                condition.match_data.forEach(match_data => {
                    var pathValue = _.get(jsonObj, match_data.path_to_apply)
                    //console.log(pathValue)
                    //console.log(typeof pathValue)
                    if (pathValue && typeof pathValue === 'string') {
                        const matchs = matcher.match(pathValue, match_data.exp)
                        //console.log(matcher.buildInterpolableObject(matchs))
                        if (matchs) {
                            utils.addToObject(params, 'values', {}, matcher.buildInterpolableObject(matchs));
                            //console.log(params)
                        }
                    }
                })
            }

            ret = condition.validate(parserContext, jsonObj, params.values);
        }

        //console.log(`verificateNode ${ret}`)
        return ret;
    },

    parser(context, rules, jsonObj) {

        rules.forEach(rule => {

            console.log(`verifying rule ${rule.name}...`)

            if (rule.conditions) {
                // Get all nodes that pass codition 1
                nodes = []
                mustSearch = true                
                do {
                    var parserContext = {}
                    var refs = {}
                    mustSearch = parser_helper.traverse(parserContext, jsonObj, refs, rule.conditions[0], true)
                    if (mustSearch) {
                        nodes.push({
                            refs: refs,
                            parserContext: parserContext
                        })
                    }
                } while (mustSearch);
            }

            //console.log(nodes)
            console.log(`Rule ${rule.name} has ${nodes.length} candidates...`)

            // now, for all detected nodes, try to pass the other validations
            nodes.forEach(node => {
                
                let allPassed = true;
                let counter = 1;

                for (let condition of rule.conditions) {    

                    // bypass condition 1
                    if (counter > 1) {
                        if (!parser_helper.traverse(node.parserContext, jsonObj, node.refs, condition, false)) {
                            
                            console.log(`Condition ${counter} NOT pass! This condition is mandatory? ${condition.must}`)
                            
                            if (condition.must) {
                                allPassed = false
                                break;
                            }
                        }    
                        console.log(`Condition ${counter} pass!`)
                    }
                    counter++
                }

                if (allPassed) {
                    //console.log(node.refs)
                    rule.successfull(node.parserContext, context, jsonObj, node.refs);
                }
    
                console.log(`Rule ${rule.name} verified? ${allPassed}`)
    
                parserContext = {}
                refs = {}
            });
        })
    }
}
/*

*/
class RuleChainManager {

    constructor(rulesFilePath) {
        //this.rules = JSON.parse(JSON.stringify(fs.readFileSync(rulesFilePath).toString()))
        this.rules = require(rulesFilePath)
    }

    parse(context, jsonObj) {
        parser_helper.parser(context, this.rules, jsonObj)
    }

    /*error(err) {
        console.error(err);
        this.done();
    }

    done(cb) {
        console.log('Done!');
        cb && cb(); 
    }*/
}

module.exports = RuleChainManager