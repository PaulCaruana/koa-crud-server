#!/usr/bin/env node
'use strict';

var config = require('../server/config');
var application = require('../server/application').create(config);
application.startServer();


