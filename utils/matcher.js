const utils = require('./utils')
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

const helper_matcher = {

    _extract_match_info(m) {

        let params = {
            fullMatch: m[0]
        }

        console.log(m)

        m.forEach((part, _index) =>{

            if (_index > 0) {
                
                params[`group_${_index}`] = part;
            } 
        })
        
        // named groups
        if (m.groups) {

            Object.keys(m.groups).forEach(key => {
                params[key] = m.groups[key]
            })
        }
        
        return params;
    }
}

matcher = {
    
    match(str, regex) {

        // For each match, 0-> fullMatch, 1..n -> n match group
        return [...str.matchAll(regex)];
    },

    hasMatch(str, regex) {
        return matcher.match(str, regex).length > 0
    },

    replaceOneMatch(str, match, replaceStr) {

        var newStr = str;

        let params = matcher.buildInterpolableObject(match);
        newStr = newStr.replace(match[0], utils.interpolate(replaceStr, params));
        
        return newStr;
    },

    replaceAll(str, regex, replaceStr) {

        var newStr = str;

        const matchs = matcher.match(str, regex);
        //console.log(matchs)

        matchs.forEach(m => {

            newStr = matcher.replaceOneMatch(newStr, m, replaceStr);
        })

        return newStr;
    },

    /**
     * Single match of array matches interpolable Object.
     * 
     * @param {Array} match If the passed object is a match of matches, an array
     * of interpolateObjects will be return. An Object in other case.
     */
    buildInterpolableObject(match) {

        var internMatch = match
        var interopObj;

        if (Array.isArray(internMatch) && Array.isArray(internMatch[0])) {
            if (internMatch.length > 1) {
                interopObj = []
            } else {
                internMatch = internMatch[0]
                interopObj = {}
            }            
        } else {
            interopObj = {}
        }

        //console.log(internMatch)
        if (Array.isArray(interopObj)) {

            internMatch.forEach(m => {
                interopObj.push(helper_matcher._extract_match_info(m))
            })
        } else {
            interopObj = helper_matcher._extract_match_info(internMatch)
        }
        
        return interopObj;
    }
}

module.exports = matcher;