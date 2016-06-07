'use strict';

import path from  'path'

export default function(app){
	// users
	app.use('/api/users', require('./api/user'));

	// posts
  	app.use('/api/posts', require('./api/post'));

    // upload test for tk3 gadgeteer
    app.use('/api/uploads', require('./api/upload'));

  	// auth
  	app.use('/auth', require('./auth'));

  	app.use('/', (req, res) => {
    	res.sendFile(path.resolve('client/index.html'));
	});
}
