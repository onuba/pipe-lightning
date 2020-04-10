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
matcher_helper = {
    
    // https://stackoverflow.com/questions/29182244/convert-a-string-to-a-template-string
    interpolate(str, params) {

        const names = Object.keys(params);
        const vals = Object.values(params);
        
        return new Function(...names, `return \`${str}\`;`)(...vals);
        
    },

    buildInterpolableObject(match) {

        let params = {
            fullMatch: match[0]
        }

        match.forEach((part, _index) =>{

            if (_index > 0) {
                params[`group_${_index}`] = part;
            } 
        })

        return params;
    }

} 
matcher = {
    
    match(str, regex) {

        const matchs = str.matchAll(regex);

        // For each match, 0-> fullMatch, 1..n -> n match group
        return Array.from(matchs);
    },

    hasMatch(str, regex) {
        return matcher.match(str, regex).length > 0
    },

    replaceOneMatch(str, match, replaceStr) {

        var newStr = str;

        let params = matcher_helper.buildInterpolableObject(match);
        newStr = newStr.replace(match[0], matcher_helper.interpolate(replaceStr, params));
        
        return newStr;
    },

    replaceAll(str, regex, replaceStr) {

        var newStr = str;

        const matchs = matcher.match(str, regex);

        matchs.forEach(m => {

            newStr = matcher.replaceOneMatch(newStr, m, replaceStr);
        })

        return newStr;
    }
}

module.exports = matcher;