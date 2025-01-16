import { Router } from 'express';
import { getPosts, post } from '../controllers/postsController.js';

const router = Router();

router.post('/',post);
router.get('/',getPosts);

export default router;