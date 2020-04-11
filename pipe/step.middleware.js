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
const step_helper = {

  toPromise(task, context) {

    return new Promise((resolve, reject) => {

      try {
        console.log(`Running step task ${task.name}`)
        resolve(task.method(context));

      } catch (err) {
        reject(err);
      }
    });
  }
};

const stepMiddleware = (step) => ({

    run: function (context, next, error) {
      let start = Date.now()
      console.log(`Running step ${step.name}`)

      tasks = []
      if (step.run) {
        Object.keys(step.run).forEach(k => tasks.push(step_helper.toPromise({ name: k, method: step.run[k] }, context)));
      }

      // TODO manage values
      // TODO when a promises crashes, stop pending tasks.
      Promise.all(tasks).then(values => {
          let end = Date.now();
          console.log(`Step ${step.name} completed in ${end - start} mls!`)
          next();
        }, err => {
          error(err);
        });
  }
});

module.exports.step = stepMiddleware;
