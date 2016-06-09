'use strict';

import express from 'express';
import { create, show, reply } from './post.controller';
import auth from '../../auth/auth.service';

var router = express.Router();

router.post('/', auth.isAuthenticated(), create)
router.get('/', auth.isAuthenticated(), show)
router.post('/:postId/reply', auth.isAuthenticated(), reply)

module.exports = router;