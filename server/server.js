'use strict';

require('babel-core/register');

import mongoose from 'mongoose'
import express from 'express'
import config from './config/environment'
import path from 'path'
var wpConfig = require('../client/webpack.config.js');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

// MongoDB connection
mongoose.connect(config.mongo.uri, {});
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

// Server setup
var app = express();

//TODO: change this
app.set('env', 'development');


var compiler = webpack(wpConfig);

app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: wpConfig.output.publicPath}));
app.use(webpackHotMiddleware(compiler));

require('./config/express').default(app);
require('./routes').default(app);

var port = 3001;

app.listen(port, function(error) {
  if (error) throw error;
  console.log("Express server listening on port", port);
});
