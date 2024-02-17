import express from 'express';
import { test } from '../contorllers/user.controller.js';

const router = express.Router();

// for home page

router.get('/', test)

export default router;