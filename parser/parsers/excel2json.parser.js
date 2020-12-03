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
const XlsxStreamReader = require("xlsx-stream-reader"),
    fs = require('fs');

excel2json = {

    doAction(options, resolve, reject) {

        try {
            
            var wbReader = new XlsxStreamReader();

            var parsedData = {
                headers: [],
                data: []
            }
            
            wbReader.on('error', function (error) {
                throw(error);
            });

            wbReader.on('sharedStrings', function () {
                // do not need to do anything with these, 
                // cached and used when processing worksheets
            });
            
            wbReader.on('styles', function () {
                // do not need to do anything with these
                // but not currently handled in any other way                
            });
            
            wbReader.on('worksheet', function (workSheetReader) {
                if (workSheetReader.id > 1){
                    // we only want first sheet
                    workSheetReader.skip();
                    return; 
                }
                // print worksheet name
                //console.log(`worksheet Name: ${workSheetReader.name}`);
            
                // if we do not listen for rows we will only get end event
                // and have infor about the sheet like row count
                workSheetReader.on('row', function (row) {
                    if (row.attributes.r == 1){
                        // do something with row 1 like save as column names
                        row.values.forEach(function(rowVal, colNum){
                            
                            var rowValIntern = rowVal.replace(/ +/g, '_').toLowerCase();
                            parsedData.headers.push(rowValIntern);
                        });
                        
                    } else {
                        
                        var item = {};
                        // second param to forEach colNum is very important as
                        // null columns are not defined in the array, ie sparse array
                        row.values.forEach(function(rowVal, colNum){
                            item[parsedData.headers[colNum-1]] = rowVal; 
                        });
                        parsedData.data.push(item);
                    }
                });
                workSheetReader.on('end', function () {
                    console.log(`row count: ${workSheetReader.rowCount}`);
                });
            
                // call process after registering handlers
                workSheetReader.process();
            });

            wbReader.on('end', function () {
                // end of workbook reached
                // Notificamos el final de lectura
                resolve(parsedData);
            });
            
            fs.createReadStream(options.filePath).pipe(wbReader);

        } catch (err) {
            reject(err)
        }
    }
}

module.exports = excel2json