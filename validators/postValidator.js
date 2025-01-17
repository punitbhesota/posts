import Joi from 'joi';

export const addPostValidator = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().allow('', null).optional(),
        hashtags: Joi.array().items(Joi.string()).optional(),
        image: Joi.string()
            .required()
            .custom((value, helpers) => {
                if (!value.includes('data:image')) {
                    return helpers.error('Invalid image format. Must be base64 with data URI scheme');
                }
                const base64Size = Buffer.from(value.split(',')[1], 'base64').length;
                if (base64Size > 5 * 1024 * 1024) {
                    return helpers.error('Image size too large. Maximum size is 5MB');
                }
                return value;
            }),
    }).unknown(false);

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ 
            message: `BAD_REQUEST: ${error.details[0].message}` 
        });
    }
    
    next();
};