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
const fs = require('fs'),
    LRU = require('lru-cache'),
    path = require('path')

const ejsAdapterUtils = {

    // Utils functions for ejs
}

const ejsAdapterHelper = {

    loadTemplateFile(ejs, templateFile, data, options) {

        // include resolution needed
        options.filename = templateFile;
        
        let template = ejs.compile(ejs.fileLoader(templateFile).toString(), options);
        // avoid 'user is not definied': https://stackoverflow.com/questions/31776471/ejs-template-variable-is-not-defined-on-page-load-and-errors
        return template(data)//{user: {name: 'Fran'}});
    },

    toFile(str, dir, fileName, cb) {

        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFile(path.join(dir, fileName), str, (err) => {
            if (err) throw err
            cb();
        })
    },

    decorateData(data) {

        var newData = data || {}
        newData.get = ejsAdapterUtils.get
        return newData;
    }
}

// defined as a singleton but the factory will create objects
const ejsAdapter = {

    data: {},
    options: {},

    init() {

        this.ejs = require('ejs')
        this.ejs.cache = new LRU(256)
    },

    strTemplateToString(strTemplate) {
        return new Promise((resolve, reject) => {

            try {
                this.data = ejsAdapterHelper.decorateData(this.data);
                var result = this.ejs.render(strTemplate, this.data);
                resolve(result);
            } catch (err) {
                reject(err);
            }
        });
    },

    strTemplateToFile(strTemplate, outFilePath, outFileName) {
        return new Promise((resolve, reject) => {

            try {
                this.data = ejsAdapterHelper.decorateData(this.data);
                var result = this.ejs.render(strTemplate, this.data);
                ejsAdapterHelper.toFile(result, outFilePath, outFileName, () => resolve(result));
            } catch (err) {
                reject(err);
            }
        });
    },

    templateToString(templateName) {
        return new Promise((resolve, reject) => {

            try {
                this.data = ejsAdapterHelper.decorateData(this.data);
                var result = ejsAdapterHelper.loadTemplateFile(this.ejs, templateName, this.data, this.options);
                console.log(result);
                resolve(result);
            } catch (err) {
                reject(err);
            }
        });
    },

    templateToFile(templateName, outFilePath, outFileName) {
        return new Promise((resolve, reject) => {

            try {
                this.data = ejsAdapterHelper.decorateData(this.data);
                var result = ejsAdapterHelper.loadTemplateFile(this.ejs, templateName, this.data, this.options)
                ejsAdapterHelper.toFile(result, outFilePath, outFileName, () => resolve(result));
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = ejsAdapter;