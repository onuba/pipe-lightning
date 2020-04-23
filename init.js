const ejs = require('ejs'),
    fs = require('fs')

// TODO
// cache
// options
// delmiter
// toString
// toFile
people = ['geddy', 'neil', 'alex'],
html = ejs.render('<%= people.join(", "); %>', {people: people});

console.log(html);

let myFileLoader = function (filePath) {
    return 'myFileLoader: ' + fs.readFileSync(filePath);
};

ejs.fileLoader = myFileLoader;

let template = ejs.compile(ejs.fileLoader('./template/poc.ejs').toString(), {});
// avoid 'user is not definied': https://stackoverflow.com/questions/31776471/ejs-template-variable-is-not-defined-on-page-load-and-errors
let result = template({})//{user: {name: 'Fran'}});
console.log(result);

/*ejs.renderFile(filename, data, options, function(err, str){
    // str => Rendered HTML string
});*/