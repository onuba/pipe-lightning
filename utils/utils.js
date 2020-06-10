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
    }
}

module.exports = utils;