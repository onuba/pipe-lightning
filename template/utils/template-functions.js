const _ = require('lodash'),
    utils = require('../../utils/utils')

const helper = {

    __it: (iterable, separator, decorator) => {
        items = ""
        for (i = 0; i < iterable.length; i++) {
            items += decorator + iterable[i] + decorator
            if (i < iterable.length - 1) {
                items += separator
            }
        }

        return items;
    },
}
module.exports = {

    __itInterpolated: (iterable, expression, separator) => {
        var newIterables = iterable.map(i => utils.interpolate(expression, i))
        
        return helper.__it(newIterables, separator, '');
    },

    __itColon: (iterable) => {
        return helper.__it(iterable, ', ', '\"');
    },

    __it: (iterable, separator) => {
        
        return helper.__it(iterable, separator, '')
    },

    __camelCaseAndCap: (str) => {
        let camelStr = _.camelCase(str)
        return _.toUpper(camelStr.substring(0, 1)) + camelStr.substring(1)
    },

    __cap: (str) => {
        return _.toUpper(str.substring(0, 1)) + str.substring(1);
    },

    __uncap: (str) => {
        return _.toLower(str.substring(0, 1)) + str.substring(1);
    }
}