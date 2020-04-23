const _ = fs = require('fs');

module.exports = {
    name: "write_new_file",
    conf: {},
    run: {
        writeFile(context, resolve, reject) {
            
            fs.writeFile('../resources/dest/replaced_mysql.ddl.sql', context.sqlfile, (err) => {
                if (err) reject(err);

                resolve();
            })
        }
    }
}