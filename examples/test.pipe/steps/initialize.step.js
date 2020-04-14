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
        async hello(context, resolve, reject) {
            await initialice_helper.helloWorld(1);
            utils.addToObject(context, 'hello', [], 1);
            resolve();
        },
        async hello2(context, resolve, reject) {
            await initialice_helper.helloWorld(2);
            utils.addToObject(context, 'hello', [], 2);
            resolve();
        },
        async hello3(context, resolve, reject) {
            await initialice_helper.helloWorld(3);
            utils.addToObject(context, 'hello', [], 3);
            resolve();
        },
        async hello4(context, resolve, reject) {
            await initialice_helper.helloWorld(4);
            resolve();
        },
        async hello5(context, resolve, reject) {
            await initialice_helper.helloWorld(5);
            resolve();
        },
    }
}