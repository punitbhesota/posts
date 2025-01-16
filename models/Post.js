import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    image: { type: String, required: true }, // base64 format
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const Post = mongoose.model('Post', postSchema);
export default Post;