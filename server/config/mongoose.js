/**
 * Connect to the database and add connection handlers
 * @module {MongooseConnection} config:mongoose
 * @requires {@link config}
 */
'use strict';
var mongoose = require('mongoose');

var db = function(mongo) {
    var connection
    return {
        connection : connection,
        start : start,
        shutdown : shutdown
    };

    //----------------------
    var connection;
    function start() {
        connection = mongoose.connect(mongo.uri, mongo.options);
        if (connection.state === 0 || connection.state === 3) {
            connection.open(function connectionReconnect(err) {
                if (err) {
                    error('Error while reinitializing the database connection: %s', err);
                    throw err; // throw error to stop application launch
                }
                console.log('Database Connection reopened');
            });
        };

        mongoose.connection.on('error', function connectionError(err) {
            console.error('Database Error: ', err);
        });
        mongoose.connection.once('open', function connectionOpen() {
            console.log('\nDatabase %s connection started on port %d\n',
                mongo.uri, mongoose.connection.port);
            // Populate DB with sample data
/*
            if (mongo.seedDB) {
                require('./seed');
            }
*/
        });
        mongoose.Promise = require('bluebird');
        return this;
    };

    function error(msg, err) {
        console.error(msg, err);
    };

    function shutdown(callback) {
        mongoose.connection.close(function() {
            console.log('Database connection disconnected through app termination');
            callback()
        });
    };


};

exports = module.exports = db;
