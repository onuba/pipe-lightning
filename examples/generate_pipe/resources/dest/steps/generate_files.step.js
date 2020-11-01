const fs = require('fs')

module.exports = {
    name: "generate_files",
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