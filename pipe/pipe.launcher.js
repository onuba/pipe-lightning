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
const PipeManager = require('./pipe.manager'),
    stepMiddleware = require('./step.middleware')

function launch(pipe) {
    
    const pm = new PipeManager();

    pipe.conf = pipe.conf || {}

    let start = Date.now()
    console.log(`Launching ${pipe.conf.name || 'Not defined'} created by ${pipe.conf.author || 'Not specified'}`);

    if (!pipe.steps) throw new Error('No steps defined!');

    pipe.steps.forEach(step => {
        pm.use(stepMiddleware.step(step, pipe.conf));    
    });

    try {
        pm.runStages(() => {
            let end = Date.now()
            console.log(`End pipe ${pipe.conf.name || 'Not defined'} in ${end - start} mls`);
        });
    } catch (err) {
        console.error(`Error executing ${pipe.conf.name || 'Not defined'} pipe: ${err}`)
    }
    
    
  }

  module.exports = launch