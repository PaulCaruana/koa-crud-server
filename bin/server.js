#!/usr/bin/env node
'use strict';

var config = require('../server/config');
var app = require('../server/app')(config).create();
app.start();


