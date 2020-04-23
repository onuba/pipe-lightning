const _ = fs = require('fs');

module.exports = {
    name: "initialize",
    conf: {},
    run: {
        readFile(context, resolve, reject) {
            
            fs.readFile('../resources/src/mysql.ddl.sql', (err, data) => {
                if (err) reject(err);

                context.sqlfile = data.toString();
                resolve(data);
            })
        }
    }
}