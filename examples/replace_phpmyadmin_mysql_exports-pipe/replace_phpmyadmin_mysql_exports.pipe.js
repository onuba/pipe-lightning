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
const pipe_launcher = require('../../pipe/pipe.launcher'),
    initialice_step = require('./steps/init.step'),
    getReplacementPatterns_step = require('./steps/get.replacement.patterns.step'),
    fkReplace_step = require('./steps/fk.replace.setp'),
    writeFile_step = require('./steps/write_new_file.step')

// Example pipe
var pipe = {
    conf: {
        name: "replace_pipe",
        description: `This pipe will perform some replaces in mysql files.

        The phpmyadmin exports Foreigng Keys as ALTER TABLES at the end of the file, 
        
        The sql-ddl-to-json-schema library needs the foreign key definition to be in create table sentence.`,
        author: "onuba",
        debug: true,
        parallel_steps: false,
        input_file: '../resources/src/lopd_20200827_estructura.sql',
        output_file: '../resources/dest/lopd_20200827_estructura_m.sql'
    },

    steps: [
        initialice_step,
        getReplacementPatterns_step,
        fkReplace_step,
        writeFile_step
    ]
}

pipe_launcher(pipe);