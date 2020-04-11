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
class PipeManager {

    constructor() {
        this.context = {};
        this.steps = [];
    }

    context() {
        return this.context;
    }

    use(stepFunc) {

        this.steps.push(stepFunc)
    }

    runStages(cb) {

        this.steps[0].run(this.context, 
            () => {
                this.next(cb);        
            },
            (error) => {
                this.error(error);
            });
    }

    next(cb) {

        if (this.steps.length > 1) {
            this.steps = this.steps.slice(1);
            this.runStages(cb);
        } else {
            this.done(cb);
        }
    }

    error(err) {
        console.error(err);
        this.done();
    }

    done(cb) {
        console.log('Done!');
        cb();
    }
}

module.exports = PipeManager