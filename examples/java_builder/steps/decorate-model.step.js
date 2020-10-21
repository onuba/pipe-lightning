const _ = fs = require('fs')

module.exports = {
    name: "decorate_model",
    conf: {},
    run: {
        readFile(context, resolve, reject) {
            
            try {
                
                // extract the fields info: type and name
                context.model.forEach(e => {
                    
                    e.extractedFields = []
                    e.fields.forEach(f => {
                        console.log(f.split(' '))
                        let fWithoutSpaces = f.trim();
                        let lastSpaceIndex = fWithoutSpaces.lastIndexOf(' ')
                        e.extractedFields.push({
                            type: fWithoutSpaces.substring(0, lastSpaceIndex),
                            name: fWithoutSpaces.substring(lastSpaceIndex + 1)
                        })
                    })
                });

                console.log(JSON.stringify(context.model, null, 2))

                resolve();
            } catch (e) {
                reject(e);
            }
        }
    }
}