import Post from '../models/Post.js';
import Tag from '../models/Tag.js';
import PostTag from '../models/PostHashtags.js';

export const addPost = async (req, res) => {
    try {
        const { title, description, hashtags, image } = req.body;
        const newPost = await Post.create({ title, description, image });

        if (hashtags && hashtags.length > 0) {
            for (const tag of hashtags) {
                let hashtag = await Tag.findOne({ tag: tag });
                if (!hashtag) {
                    hashtag = await Tag.create({ tag });
                }
                await PostTag.create({ postId: newPost.id, tagId: hashtag.id });
            }
        }

        res.json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error: error.message });
    }
};

export const getPosts = async (req, res) => {
    try {
        const { sort, page = 1, limit = 10, keyword, tag } = req.query;

        const offset = (page - 1) * limit;
        let conditions = [];

        // Filter by keyword
        if (keyword) {
            conditions.push({
                $or: [
                    { title: { $regex: keyword, $options: 'i' } },
                    { description: { $regex: keyword, $options: 'i' } }
                ]
            });
        }

        // Filter by tag
        if (tag) {
            const hashtag = await Tag.findOne({ tag: tag });
            if (!hashtag) {
                return res.status(404).json({ message: 'Tag not found' });
            }
            const postHashtags = await PostTag.find({ tagId: hashtag.id });
            const postIds = postHashtags.map(ph => ph.postId);
            conditions.push({ _id: { $in: postIds } });
        }

        const query = conditions.length > 0 ? { $or: conditions } : {};

        const posts = await Post.find(query)
            .sort(sort ? { [sort]: 1 } : {})
            .skip(offset)
            .limit(parseInt(limit));

        const total = await Post.countDocuments(query);

        res.json({ 
            message: 'Posts retrieved successfully', 
            posts,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving posts', error: error.message });
    }
};