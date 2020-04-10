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
class Stack {

    constructor() {
        this.stack = []
    }

    push(element) {
        this.stack.push(element)
    }

    pop(element) {
        this.stack.pop(element)
    }

    peek() {
        if (this.stack.length === 0) {
            throw new Error('Stack out of bounds!!');
        }

        return this.stack[this.stack.length - 1];
    }

    hasElements() {
        return this.stack.length > 0
    }
}

module.exports = Stack;