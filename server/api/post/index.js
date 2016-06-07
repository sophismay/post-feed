'use strict';

import express from 'express';
import { create } from './post.controller';
import auth from '../../auth/auth.service';

var router = express.Router();

router.post('/', create)


module.exports = router;