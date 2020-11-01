const pipe_launcher = require('../../pipe/pipe.launcher'),
    read_ddl_and_dml_file_step = require('./steps/read_ddl_and_dml_file.step'),
    migrate_ddl_model_step = require('./steps/migrate_ddl_model.step'),
    migrate_dml_model_step = require('./steps/migrate_dml_model.step'),
    generate_files_step = require('./steps/generate_files.step')

    
var pipe = {
    conf: {
        name: "migrate_sqlmodel_from_v2_to_v3",
        description: `Migrate Sql DDL and DML file from version 2 to version 3`,
        author: "onuba",
        debug: true,
        parallel_steps: false,
        input_modelFile: './resources/src/model.json',
        basedir: __dirname
    },

    steps: [
        read_ddl_and_dml_file_step,
        migrate_ddl_model_step,
        migrate_dml_model_step,
        generate_files_step
    ]
}

pipe_launcher(pipe);