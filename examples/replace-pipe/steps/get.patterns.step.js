const _ = fs = require('fs'),
    moo = require('moo'),
    mooDecorator = require('../../../moo/moo.decorator')

const mooGrammnar = {
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
};

const mooGrammnarState = {
    main: {
        lparen: '(',
        rparen: ')',
        create_table: { match: /CREATE\s+TABLE\s+/, push: 'def_table'},
        alter_table: { match: /ALTER\s+TABLE\s+/, push: 'def_table'},
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
    },
    def_table: {
        table_name: { match: /[a-zA-Z_]+/, pop: true }
    }
};

const step_helper = {

    getPattenrs: (lexer) => {

        const matches = lexer.getHierarchy('alter_table', 'instruction_end', 'add_constraint', 'foreign_key');
        alter_table_with_fks_def = matches.map(m => { m.tokens = m.tokens.filter(t => t.type === 'table_name'); return m})
        alter_table_with_fks_def.forEach(m => console.log(`Table: ${m.tokens[0].text}, Childs: ${JSON.stringify(m.childs, null, 2)}`));

        // Tables key def
        const keys_in_tables = lexer.getHierarchy('create_table', 'instruction_end', 'keydef', ['comma', 'rparen'])
        create_table_with_fks_def = keys_in_tables.map(m => { m.tokens = m.tokens.filter(t => t.type === 'table_name'); return m})
        create_table_with_fks_def.forEach(m => console.log(`Table: ${m.tokens[0].text}, Childs: ${JSON.stringify(m.childs, null, 2)}`));
    }
}

module.exports = {
    name: "getPatterns",
    conf: {},
    run: {
        getPatterns(context, resolve, reject) {
            console.log(context.sqlfile);
            
            //var lexer = moo.compile(mooGrammnar)
            var lexer = moo.states(mooGrammnarState)
            
            lexer = mooDecorator.decorate(lexer)
            
            lexer.reset(context.sqlfile)
            
            lexer.init(lexer);

            step_helper.getPattenrs(lexer);

            resolve();
        }
    }
}