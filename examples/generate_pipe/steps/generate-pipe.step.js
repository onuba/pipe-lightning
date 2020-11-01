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

                    template_engine.templateToFile('./resources/templates/pipe_file.ejs', 
                        path.join(context.conf.basedir, `/resources/dest`), `${m.name}.pipe.js`);

                    m.steps.forEach(s => {
                        template_engine.data = {data: s}

                        template_engine.templateToFile('./resources/templates/step_file.ejs', 
                            path.join(context.conf.basedir, `/resources/dest/steps`), `${s}.step.js`);
                    })

                    resolve()
                } catch(e) {
                    reject(e)
                }
            })
        }
    }
}