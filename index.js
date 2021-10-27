'use strict';

const Hapi = require('@hapi/hapi');
//const 

const init = async () => {

    const server = Hapi.server ({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (req,h) => {
            return 'Response from server';
        }
    });

    await server.start();
    console.log('Server is runnig on %s', server.info.uri);

};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
