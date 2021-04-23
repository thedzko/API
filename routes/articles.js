const express = require('express')
const Article = require('./../models/article')
const router = express.Router()

const path = require('path');
const { unlink } = require('fs-extra');

router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() })
})

router.get('/edit/:id', async(req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', { article: article })
})

router.get('/:slug', async(req, res) => {
    const article = await Article.findOne({ slug: req.params.slug })
    if (article == null) res.redirect('/')
    res.render('articles/show', { article: article })
})

router.post('/', async(req, res, next) => {
    req.article = new Article()
    next()
}, saveArticleAndRedirect('new'))

router.put('/:id', async(req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect('edit'))

router.delete('/:id', async(req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    const imageDeleted = await Article.findByIdAndDelete(id);
    await unlink(path.resolve('/public' + imageDeleted.path));
    res.redirect('/');
});

function saveArticleAndRedirect(path) {
    return async(req, res) => {
        let article = req.article
        article.title = req.body.title
        article.description = req.body.description
        article.author = req.body.author
        article.markdown = req.body.markdown
        article.filename = req.file.filename;
        article.path = '/img/uploads/' + req.file.filename;
        article.originalname = req.file.originalname;
        article.mimetype = req.file.mimetype;
        article.size = req.file.size;
        try {
            article = await article.save()
            res.redirect(`/articles/${article.slug}`)
        } catch (e) {
            res.render(`articles/${path}`, { article: article })
        }
    }
}

module.exports = router