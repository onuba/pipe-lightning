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
const template_functions = require('./utils/template-functions'),
    utils = require('../utils/utils'),
    _ = require('lodash')

// private factory
const adapterFactory = {

    getAdapterForEngine(str, options) {
        
        !str && adapterFactory.error(str);

        // strategy
        try {
            const adapter = require(`./adapters/${str.toLowerCase()}.template.adapter.js`);

            var adapterObj = Object.create(adapter);

            adapterObj.options = options;
            adapterObj.init();

            return adapterObj;

        } catch (e) {
            console.error(e);
            this.error(str)
        }
    },

    error(str) {
        throw new Error(`No adapter found for ${str} template engine!`)
    }
}

class TemplaterManager {

    constructor(templateEngine, options) {
        this.templateEngine = templateEngine;
        this.options = options;
        this.adapter = adapterFactory.getAdapterForEngine(templateEngine, options);
    }

    set data(data) {
        utils.addToObject(data, 'data', null, template_functions);
        this.adapter.data = data;
    }

    get data() {
        return this.adapter.data;
    }

    strTemplateToString(strTemplate) {
        
        return new Promise((resolve, reject) => {
            try {
                resolve(this.adapter.strTemplateToString(strTemplate))
            } catch (err) {
                reject(err);
            }
        });
    }

    strTemplateToFile(strTemplate, outFilePath) {
        return new Promise((resolve, reject) => {
            try {
                resolve(this.adapter.strTemplateToFile(strTemplate, outFilePath));
            } catch (err) {
                reject(err);
            }
        });
        
    }

    templateToString(templateName) {
        return new Promise((resolve, reject) => {
            try {
                resolve(this.adapter.templateToString(templateName));
            } catch (err) {
                reject(err);
            }
        });
    }

    templateToFile(templateName, outFilePath) {
        return new Promise((resolve, reject) => {
            try {
                resolve(this.adapter.templateToFile(templateName, outFilePath));
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = TemplaterManager