'use strict';

process.env.DATABASE_NAME = process.env.DATABASE_NAME || 'server-dev';

module.exports = {
    db: {
        mongo: {
            uri: 'mongodb://localhost/' + process.env.DATABASE_NAME
        },
        seedDB: true
    }
};
