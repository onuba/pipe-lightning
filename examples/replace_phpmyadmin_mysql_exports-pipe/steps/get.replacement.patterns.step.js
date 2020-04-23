/* 
 # Copyright (C) 2020 Francisco Hernández (github.com/onuba)
 # This file is part of pipe-lightning project <https://github.com/onuba/pipe-lightning>.
 #
 # pipe-lightning is free software: you can redistribute it and/or modify
 # it under the terms of the GNU General Public License as published by
 # the Free Software Foundation, either version 3 of the License, or
 # (at your option) any later version.
 #
 # pipe-lightning is distributed in the hope that it will be useful,
 # but WITHOUT ANY WARRANTY; without even the implied warranty of
 # MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 # GNU General Public License for more details.
 #
 # You should have received a copy of the GNU General Public License
 # along with pipe-lightning. If not, see <http://www.gnu.org/licenses/>.
 */
const _ = fs = require('fs'),
    moo = require('moo'),
    mooDecorator = require('../../../moo/moo.decorator'),
    matcher = require('../../../utils/matcher')

/*const mooGrammnar = {
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
};*/

const mooGrammnarState = {
    main: {
        lparen: '(',
        rparen: ')',
        apos: '`',
        squote: '\'',
        dot: '.',
        create_table: { match: /CREATE\s+TABLE(?:\s+IF\s+NOT\s+EXISTS)?\s+/, push: 'def_table'},
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
        comma: ',',
        equal: '=',
        instruction_end: ';',
        not_recognized: moo.error,
    },
    def_table: {
        apos: '`',
        table_name: { match: /[a-zA-Z_]+/, pop: true }
    }
};

const step_helper = {

    getTablesFkDef: (lexer, tokenInit, tokenEnd, childInit, childEnd) => {
        
        const matches = lexer.getHierarchy(tokenInit, tokenEnd, childInit, childEnd);
        
        matchesFiltered = matches.map(m => { 
        
            m.tokens = m.tokens.filter(t => t.type === 'table_name'); 
            
            m.childs = m.childs.map(ch => { delete ch.tokens; return ch; });

            return m
        })
        
        //matchesFiltered.forEach(m => console.log(`Table: ${m.tokens[0].text}, Childs: ${JSON.stringify(m.childs, null, 2)}`));

        return matchesFiltered;
    },

    createReplacements: (create_table_with_fks_def, alter_table_with_fks_def) => {

        var replacements = create_table_with_fks_def.map(m => { 
        
            m.table = m.tokens[0].text;

            m.replaces = [];

            m.childs.forEach(ch => {

                var defKeyMatch = matcher.match(ch.plainText, /KEY\s+`?'?(\w+)\s*`?'?\s+\(`?'?\s*(\w+)\s*`?'?\)/);
                //console.log(defKeyMatch)

                var alterTable = alter_table_with_fks_def.find(item => item.tokens[0].text === m.table);
                //console.log(alterTable);
                var alterTableChild = alterTable.childs.find(alterCh => 
                    matcher.match(alterCh.plainText, /ADD\s+CONSTRAINT\s+`?'?(\w+)`?'?\s+FOREIGN KEY/)[0][1] === defKeyMatch[0][1]
                );

                //console.log(alterTableChild);
                var replace = alterTableChild.plainText;
                
                m.replaces.push({
                    text: ch.plainText.replace(',', '').replace(/\r?\n/, ''),
                    replace: replace.replace(',', '').replace(';', '')
                });
            })

            delete m.childs;
            delete m.tokens;
            delete m.plainText;

            return m
        })

        /*replacements.forEach(m => {
            console.log(`Table: ${m.table}, Childs: ${JSON.stringify(m.replaces, null, 2)}`)
        });*/

        return replacements;
    },
    
    getFkReplacements: (lexer) => {

        const alter_table_with_fks_def = step_helper.getTablesFkDef(lexer, 
            'alter_table', 
            'instruction_end', 
            'add_constraint', 
            ['comma', 'instruction_end']);
        
        const create_table_with_fks_def = step_helper.getTablesFkDef(lexer, 
            'create_table', 
            'instruction_end', 
            'keydef', 
            ['comma', 'rparen']);

        return step_helper.createReplacements(create_table_with_fks_def, alter_table_with_fks_def);
    }
}

module.exports = {
    name: "getReplacementPatterns",
    conf: {},
    run: {
        getPatterns(context, resolve, reject) {
            //console.log(context.sqlfile);
            
            //var lexer = moo.compile(mooGrammnar)
            var lexer = moo.states(mooGrammnarState)
            
            lexer = mooDecorator.decorate(lexer)

            lexer.reset(context.sqlfile)

            lexer.init(lexer);

            //lexer.log();

            var replacements = step_helper.getFkReplacements(lexer);

            //console.log(replacements);

            context.replacements = replacements;

            resolve();
        }
    }
}