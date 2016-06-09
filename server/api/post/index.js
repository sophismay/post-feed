'use strict';

import express from 'express';
import { create, show } from './post.controller';
import auth from '../../auth/auth.service';

var router = express.Router();

router.post('/', auth.isAuthenticated(), create)
router.get('/', auth.isAuthenticated(), show)

module.exports = router;