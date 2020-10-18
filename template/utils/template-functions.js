const _ = require('lodash');

module.exports = {

    __itColon: (iterable) => {
        items = ""
        for (i = 0; i < iterable.length; i++) {
            items += "\"" + iterable[i] + "\""
            if (i < iterable.length - 1) {
                items += ", "
            }
        }

        return items;
    },

    __camelCaseAndCap: (str) => {
        let camelStr = _.camelCase(str)
        return _.toUpper(camelStr.substring(0, 1)) + camelStr.substring(1)
    },

    __cap: (str) => {
        return _.toUpper(str.substring(0, 1)) + _.toLower(str.substring(1));
    },

    __uncap: (str) => {
        return _.toLower(str.substring(0, 1)) + _.toLower(str.substring(1));
    }
}