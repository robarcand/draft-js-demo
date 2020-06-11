const Sequelize = require('sequelize');
const db = require('./database');

const Article = db.define('article', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    article_body: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    feature_img: {
        type: Sequelize.STRING,
    },
})

module.exports = Article;