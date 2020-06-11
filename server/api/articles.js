const router = require('express').Router();
const Author = require('../db/author');
const Article = require('../db/article');

router.get('/', async (req, res, next) => {
    try {
        const allArticles = await Article.findAll();
        res.json(allArticles);
    } catch (error) {
        next(error);
    }
})

module.exports = router;