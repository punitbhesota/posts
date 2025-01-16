import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
    tag: { type: String, required: true }
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const Tag = mongoose.model('Tag', tagSchema);
export default Tag;