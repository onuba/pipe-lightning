const _ = require('lodash'),
    utils = require('../../../utils/utils')

const initialice_helper = {

    sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    },

    async helloWorld(worldNumber) {
        await initialice_helper.sleep(Math.floor(Math.random() * 100));
        console.log(`Hello world ${worldNumber}`);
    }
};

module.exports = {
    name: "initialize",
    conf: {},
    run: {
        async hello(context) {
            await initialice_helper.helloWorld(1);
            utils.addToObject(context, 'hello', [], 1);
        },
        async hello2(context) {
            await initialice_helper.helloWorld(2);
            utils.addToObject(context, 'hello', [], 2);
        },
        async hello3(context) {
            await initialice_helper.helloWorld(3);
            utils.addToObject(context, 'hello', [], 3);
        },
        async hello4(context) {
            await initialice_helper.helloWorld(4);
        },
        async hello5(context) {
            await initialice_helper.helloWorld(5);
        },
    }
}