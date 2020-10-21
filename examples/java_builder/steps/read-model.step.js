const { match } = require('assert');

const _ = fs = require('fs'),
    parserManager = require('../../../parser/parser.manager'),
    matcher = require('../../../utils/matcher')

module.exports = {
    name: "read_model",
    conf: {},
    run: {
        readFile(context, resolve, reject) {
            
            try {
                modelStr = fs.readFileSync(context.conf.input_modelFile).toString();

                context.model = JSON.parse(modelStr);

                resolve();
            } catch (e) {
                reject(e);
            }
        }
    }
}