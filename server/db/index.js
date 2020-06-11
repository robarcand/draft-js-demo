const db = require('./database');
const Article = require('./article');
const Author = require('./author');

Article.belongsTo(Author);
Author.hasMany(Article);

module.exports = {
    db,
    Article,
    Author
}