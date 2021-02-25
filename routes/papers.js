const express = require('express')
const Paper = require('./../models/paper')
const router = express.Router()

// NEW
router.get('/new', (req, res) => {
    res.render('articles/papers/new', { paper: new Paper() })
})

// EDIT
router.get('/edit/:id', async(req, res) => {
    const paper = await Paper.findById(req.params.id)
    res.render('articles/papers/edit', { paper: paper })
})

//SHOW
router.get('/:slug', async(req, res) => {
    const paper = await Paper.findOne({ slug: req.params.slug })
    if (paper == null) res.redirect('/papers')
    res.render('articles/papers/show', { paper: paper })
})

// POST
router.post('/', async(req, res, next) => {
    req.paper = new Paper()
    next()
}, saveArticleAndRedirect('new'))

//CHANGING
router.put('/:id', async(req, res, next) => {
    req.paper = await Paper.findById(req.params.id)
    next()
}, saveArticleAndRedirect('new'))

//DELETING
router.delete('/:id', async(req, res) => {
    await Paper.findByIdAndDelete(req.params.id)
    res.redirect('/papers')
})

function saveArticleAndRedirect(path) {
    return async(req, res) => {
        let paper = req.paper
        paper.title = req.body.title
        paper.description = req.body.description
        paper.markdown = req.body.markdown
        paper.filename = req.file.filename;
        paper.path = '/img/uploads/' + req.file.filename;
        paper.originalname = req.file.originalname;
        paper.mimetype = req.file.mimetype;
        paper.size = req.file.size;
        try {
            paper = await paper.save()
            res.redirect(`/papers/${paper.slug}`)
        } catch (e) {
            res.render(`articles/papers/${path}`, { paper: paper })
        }

    }
}

module.exports = router