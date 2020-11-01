const fs = require('fs')

module.exports = {
    name: "read_ddl_and_dml_file",
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