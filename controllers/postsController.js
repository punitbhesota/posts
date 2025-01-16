import Post from '../models/Post.js';
import Tag from '../models/Tag.js';
import PostTag from '../models/PostHashtags.js';

export const post = async (req, res) => {
    try {
        const { title, description, hashtags, image } = req.body;

        // Store image as base64
        const imageBase64 = Buffer.from(image, 'binary').toString('base64');

        // Create new post
        const newPost = await Post.create({ title, description, image: imageBase64 });

        // Create or find hashtags and associate with post
        if (hashtags && hashtags.length > 0) {
            for (const tag of hashtags) {
                let [hashtag] = await Tag.findOrCreate({ where: { name: tag } });
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
        const { sort, page = 1, limit = 10, keyword, tag, ...extraParams } = req.query;

        if (Object.keys(extraParams).length > 0) {
            return res.status(400).json({ message: 'BAD_REQUEST: Invalid parameters' });
        }

        const offset = (page - 1) * limit;
        const whereClause = {};

        // Filter by keyword
        if (keyword) {
            whereClause[Op.or] = [
                { title: { [Op.like]: `%${keyword}%` } },
                { description: { [Op.like]: `%${keyword}%` } }
            ];
        }

        // Filter by tag
        if (tag) {
            const hashtag = await Tag.findOne({ where: { name: tag } });
            if (!hashtag) {
                return res.status(404).json({ message: 'Tag not found' });
            }
            const postHashtags = await PostTag.findAll({ where: { tagId: hashtag.id } });
            const postIds = postHashtags.map(ph => ph.postId);
            whereClause.id = { [Op.in]: postIds };
        }

        const posts = await Post.findAll({
            where: whereClause,
            order: sort ? [[sort, 'ASC']] : [],
            limit,
            offset
        });

        res.json({ message: 'Posts retrieved successfully', posts });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving posts', error: error.message });
    }
};