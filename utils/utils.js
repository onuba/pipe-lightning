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
const _ = require('lodash');

const utils = {

    addToObject(object, path, initValue, value) {

        _.get(object, path) || _.set(object, path, initValue);
        
        if (_.isArray(value) && _.isArray(_.get(object, path))) {
            
            _.set(object, path, _.get(object, path).concat(value));

        } else if (_.isArray(_.get(object, path))) {
            _.get(object, path).push(value);
            
        } else {
            _.set(object, path, _.mergeWith(_.get(object, path), value, (objValue, srcValue) => {
                //console.log(`objValue: ${objValue} srcValue: ${srcValue}`)
                if (_.isArray(objValue)) {
                    return objValue.concat(srcValue);
                }
                if (_.isObject(objValue)) {
                    return objValue.push(srcValue);
                }
            }));
        }
    },

    listAsStrWithSeparator(iterable, separator) {

        if (!iterable) return '';
        
        let str = iterable.join(separator);

        return str;
    },

    // https://stackoverflow.com/questions/29182244/convert-a-string-to-a-template-string
    interpolate(str, params) {

        const names = Object.keys(params);
        const vals = Object.values(params);
        
        return new Function(...names, `return \`${str}\`;`)(...vals);
        
    },

    /**
     * Split with rejoin capacity.
     * 
     * @param {string} str String to split 
     * @param {string} delimiter Delimiter for split
     * @param {string} rejoin Rejoin parts that have this string in open/close way, for example, if you split a string
     * by semicolon and contains literals ('literal') that can have delimitier string inside, rejoin this part
     */
    split(str, delimiter, rejoin) {

        if (!str) {
            return []
        }

        if (!delimiter) {
            return [str]
        }

        var parts = str.split(delimiter);

        var realParts = []
        buffer = ''
        joining = false
        parts.forEach(p => {

            if (rejoin) {

                count = (p.match(new RegExp(rejoin, 'g')) || []).length
                if (!joining && count === 0 || count === 2 || count > 2) {
                    realParts.push(p)
                } else if (!joining && count === 1) {
                    joining = true
                    buffer += p
                    buffer += delimiter
                } else if (joining && count === 1) {
                    buffer += p
                    joining = false
                    realParts.push(buffer)
                    buffer = ''
                } else if (joining && count === 0) {
                    buffer += p
                    buffer += delimiter
                }
            } else {
                realParts.push(p)
            } 
        })

        return realParts;
    }
}

module.exports = utils;