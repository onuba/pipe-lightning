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

// private factory
const adapterFactory = {

    getAdapterForEngine(str) {
        
        !str && adapterFactory.error(str);

        // strategy
        try {
            const adapter = require(`./adapters/${str.toLowerCase()}.template.adapter.js`);

            return Object.create(adapter);

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

    constructor(templateEngine) {
        this.templateEngine = templateEngine;
        this.adapter = adapterFactory.getAdapterForEngine(templateEngine);
    }

    set data(data) {
        this.adapter.data = data;
    }

    strTemplateToString(strTemplate) {
        this.adapter.strTemplateToString(strTemplate)
    }

    strTemplateToFile(strTemplate, outFilePath) {
        this.adapter.strTemplateToFile(strTemplate, outFilePath)
    }

    templateToString(templateName) {
        this.adapter.templateToString(templateName)
    }

    templateToFile(templateName, outFilePath) {
        this.adapter.templateToFile(templateName, outFilePath)
    }
}

module.exports = TemplaterManager