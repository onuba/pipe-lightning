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
module.exports = {
    name: "fkReplacements",
    conf: {},
    run: {
        replaceFks(context, resolve, reject) {
            
            context.replacements.forEach(r => {

                console.log(`replacing in table ${r.table}`)
                r.replaces.forEach(rep => {
                    console.log(`   replacing ${rep.text} with ${rep.replace}`)    
                    // FOREIGN KEY `FK_UP_PAIS` (`ID_PAIS`) REFERENCES `p` (`CODIGO`) ON UPDATE CASCADE,
                    // FOREIGN KEY `FK_UP_UP` FOREIGN KEY (`NIF_RESP`) REFERENCES `up` (`NIF`) ON UPDATE CASCADE,
                    let replaceStr = rep.replace.replace(/\s+FOREIGN\s+KEY/, '')
                    replaceStr = replaceStr.replace('ADD CONSTRAINT', 'FOREIGN KEY')
                    
                    context.sqlfile = context.sqlfile.replace(rep.text, replaceStr);
                })
                console.log(`table ${r.table} replaced`)
            })
            
            //console.log(context.sqlfile);
            
            resolve();
        }
    }
}