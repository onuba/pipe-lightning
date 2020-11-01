const ejs = require('ejs'),
    fs = require('fs')
const { matches } = require('lodash')

const pipe_launcher = require('./pipe/pipe.launcher'),
    gulp_launcher = require('./gulp/gulp_launcher'),
    moo_decorator = require('./moo/moo.decorator'),
    parser_manager = require('./parser/parser.manager'),
    template_manager = require('./template/templater.manager'),
    matcher = require('./utils/matcher'),
    utils = require('./utils/utils'),
    stack = require('./utils/stack')

module.exports = {

    pipe_launcher: pipe_launcher,
    moo_decorator: moo_decorator,
    parser_manager: parser_manager,
    template_manager: template_manager,
    matcher: matcher,
    utils: utils,
    stack: stack
}