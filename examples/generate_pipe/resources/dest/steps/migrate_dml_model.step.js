const fs = require('fs')

module.exports = {
    name: "migrate_dml_model",
    conf: {},
    run: {
        readFile(context, resolve, reject) {
            
            try {
                
                // TODO add your code here!
                
                resolve();
            } catch (e) {
                reject(e);
            }
        }
    }
}