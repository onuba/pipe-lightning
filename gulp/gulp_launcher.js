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
const gulp = require('gulp')

// https://medium.com/@venomnert/pipe-function-in-javascript-8a22097a538e
// dynamic pipe
const _pipe = (a, b) => (arg) => b(a(arg));
const pipe = (...ops) => ops.reduce(_pipe)

/**
 * 
 * @param {function} done end callback
 */
function gulpStart(fileMaskIn, fileMaskOut, context, plugins, done) {

    try {
        dynamicPipe = pipe(...plugins)

        gulp.src(fileMaskIn)
            .pipe(dynamicPipe(context))
            .pipe(gulp.dest(fileMaskOut))
            .on('end', () => {
                if (done) {
                    done();
                }
            })
    } catch (e) {
        console.error(e);
    }
};

module.exports = gulpStart