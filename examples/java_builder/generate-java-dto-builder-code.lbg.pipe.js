const pipe_launcher = require('../../pipe/pipe.launcher'),
    read_model_step = require('./steps/read-model.step'),
    decorate_model_step = require('./steps/decorate-model.step'),
    generate_code_step = require('./steps/generate-code.step')

var pipe = {
    conf: {
        name: "generate_code",
        description: `This pipe will generate a DTO Java POJO and a Builder 
        for it as described in GOF pattern guide from a JSON model'`,
        author: "onuba",
        debug: true,
        parallel_steps: false,
        input_modelFile: './resources/src/model.json',
        basedir: __dirname
    },

    steps: [
        read_model_step,
        decorate_model_step,
        generate_code_step
    ]
}

pipe_launcher(pipe);