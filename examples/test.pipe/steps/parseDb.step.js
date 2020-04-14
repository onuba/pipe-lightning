module.exports = { 

    name: "parseDb",
    conf: {},
    run: {
        didHello(context, resolve, reject) {
            
            console.log(context.hello);
            if (context.hello === 1) {
                console.log('I did a hello before!');
            } else {
                console.log('I forgot to do a hello!');
            }

            resolve();
        }
    }
}