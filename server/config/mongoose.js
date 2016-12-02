/**
 * Connect to the database and add connection handlers
 * @module {MongooseConnection} config:mongoose
 * @requires {@link config}
 */
'use strict';
var mongoose = require('mongoose');

var db = function(config) {
    var connection
    return {
        connection : connection,
        start : start,
        shutdown : shutdown
    };

    //----------------------
    var connection;
    function start() {
        connection = mongoose.connect(config.mongo.uri, config.mongo.options);
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
            console.log('Database connection started');
        });
    };

    function error(msg, err) {
        console.error(msg, err);
    };

    function shutdown(callback) {
        console.log("--")
        console.log(mongoose.connection)
        mongoose.connection.close(function() {
            console.log('Database connection disconnected through app termination');
            callback()
        });
    };


};

exports = module.exports = db;
