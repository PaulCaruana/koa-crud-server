#!/usr/bin/env node
'use strict';

var config = require('../server/config');
var Application = require('../server/application')(config);
Application.create().startServer();


