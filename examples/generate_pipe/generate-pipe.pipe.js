const pipe_launcher = require('../../pipe/pipe.launcher'),
    read_pipe_model_step = require('./steps/read-pipe-model.step'),
    generate_pipe_step = require('./steps/generate-pipe.step')

var pipe = {
    conf: {
        name: "generate_pipe",
        description: `This pipe will generate a pipe-lightning
        pipe scaffolding`,
        author: "onuba",
        debug: true,
        parallel_steps: false,
        input_modelFile: './resources/src/model.json',
        basedir: __dirname
    },

    steps: [
        read_pipe_model_step,
        generate_pipe_step
    ]
}

pipe_launcher(pipe);