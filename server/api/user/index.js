'use strict';

import express from 'express';
import controller from './user.controller';
import auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', controller.index);

router.get('/me', auth.isAuthenticated(), controller.me);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);


module.exports = router;
