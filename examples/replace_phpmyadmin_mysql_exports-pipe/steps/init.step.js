const _ = fs = require('fs');

module.exports = {
    name: "initialize",
    conf: {},
    run: {
        readFile(context, resolve, reject) {
            
            console.log(JSON.stringify(context, '', null));

            fs.readFile(context.conf.input_file, (err, data) => {
                if (err) reject(err);

                context.sqlfile = data.toString();
                resolve(data);
            })
        }
    }
}