'use strict';

const Hapi = require('@hapi/hapi');
const config = require('./config/config');
const { logger } = require('./config/logger');
const Routes = require('./routes/index'); 

const init = async () => {

    const server = Hapi.server ({
        port: 3000,
        host: 'localhost'
    });
    console.log ( "config %O ", config.mongo.url);

    await server.register({
        plugin: require('hapi-mongodb'),
        options: {
            uri: config.mongo.url,
            settings: {
                useUnifiedTopology: true
            },
            decorate: true
        }
    });

    server.route(Routes);

    await server.start();
    console.log('Server is runnig on %s', server.info.uri);

};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
