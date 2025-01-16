import mongoose from 'mongoose';
import Post from './Post.js';
import Tag from './Tag.js';

const postTagSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: Post},
    tagId: { type: mongoose.Schema.Types.ObjectId, ref: Tag}
})

const PostTag = mongoose.model('PostTag', postTagSchema);
export default PostTag