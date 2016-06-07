'use strict';

import express from 'express'
import compression from 'compression';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import mongoose from 'mongoose';
var mongoStore = connectMongo(session);

export default function(app){
	
	app.use(compression());
  	app.use(bodyParser.urlencoded({ extended: false }));
  	app.use(bodyParser.json());
	// for tk3	
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.raw({ type: 'image/bmp', limit: '50mb' }))
	//app.use(bodyParser({limit: '50mb'}));
	// end for tk3
  	app.use(methodOverride());
 	app.use(cookieParser());

 	 // Persist sessions with mongoStore / sequelizeStore
  // We need to enable sessions for passport-twitter because it's an
  // oauth 1.0 strategy, and Lusca depends on sessions
  app.use(session({
  	secret: 'secret-here',
  	saveUninitialized: true,
  	resave: false,
  	store: new mongoStore({
  		mongooseConnection: mongoose.connection,
  		db: 'react-components'
  	})
  }));

	app.use(express.static('./client/dist'));
}
