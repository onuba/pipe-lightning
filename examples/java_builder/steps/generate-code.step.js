const _ = fs = require('fs'),
    TemplaterManager = require('../../../template/templater.manager'),
    path = require('path')

module.exports = {
    name: "generate_code",
    conf: {},
    run: {
        readFile(context, resolve, reject) {
            
            context.model.forEach(m => {

                try {

                    var template_engine = new TemplaterManager('ejs', {})

                    template_engine.data = {data: m}

                    template_engine.templateToFile('./resources/templates/dto_builder.ejs', 
                        path.join(context.conf.basedir, `/resources/dest/${m.package.replace(/\./g, '/')}`), `${m.name}.java`);

                    resolve()
                } catch(e) {
                    reject(e)
                }
            })
        }
    }
}