import { Router } from 'express';
import { addPost, getPosts } from '../controllers/postsController.js';
import { addPostValidator } from '../validators/postValidator.js';

const router = Router();

router.post('/',addPostValidator,addPost);
router.get('/',getPosts);

export default router;