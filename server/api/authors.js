const router = require('express').Router();
const Author = require('../db/author');
const Article = require('../db/article');

router.get('/', async (req, res, next) => {
    try {
        const allAuthors = await Author.findAll();
        res.json(allAuthors);
    } catch (error) {
        next(error);
    }
})

module.exports = router;