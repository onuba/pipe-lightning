const moo = require('moo'),
    mooDecorator = require('./moo.decorator')

var lexer = moo.compile({
    lparen: '(',
    rparen: ')',
    create_table: /CREATE\s+TABLE/,
    alter_table: /ALTER\s+TABLE/,
    add_constraint: /ADD\s+CONSTRAINT/,
    foreign_key: /FOREIGN\s+KEY/,
    references: /REFERENCES/,
    pk: /PRIMARY KEY/,
    keydef: /KEY/,
    keyword: ['CREATE', 'TABLE', 'KEY', 'AUTO_INCREMENT'],
    SPACE: { match: /\s+/, lineBreaks: true },
    identifier: /[a-zA-Z_]+/,
    number: /[0-9]+/,
    comma: /,/,
    equal: /=/,
    instruction_end: /;/,
    not_recognized: moo.error,
})

lexer = mooDecorator.decorate(lexer)

lexer.reset(`CREATE TABLE categories(
    categoryId INT AUTO_INCREMENT PRIMARY KEY,
    categoryName VARCHAR(100) NOT NULL
) ENGINE=INNODB;

CREATE TABLE products(
    productId INT AUTO_INCREMENT PRIMARY KEY,
    productName varchar(100) not null,
    categoryId INT,
    categoryId2 INT, 
    KEY fk_category categoryId,
    KEY fk_category2 categoryId2,
) ENGINE=INNODB;

ALTER TABLE products 
    ADD CONSTRAINT fk_category FOREIGN KEY (categoryId) REFERENCES categories(categoryId),
    ADD CONSTRAINT fk_category2 FOREIGN KEY (categoryId2) REFERENCES categories(categoryId);`)

lexer.init(lexer);
//lexer.log();
//console.log(lexer.get('alter_table', 'instruction_end'));
//console.log(lexer.getSplitted('alter_table', 'instruction_end', ','));
const matches = lexer.getHierarchy('alter_table', 'instruction_end', 'add_constraint', 'foreign_key');
console.log(matches)
matches.forEach(m => console.log(`Childs: ${JSON.stringify(m.childs, null, 2)}`));

// Tables
console.log(lexer.get('create_table', 'lparen'));

// Tables key def
const tables = lexer.getHierarchy('create_table', 'instruction_end', 'keydef', ['comma', 'rparen'])
//tables.forEach(m => console.log(`Childs: ${JSON.stringify(m.childs, null, 2)}`));

