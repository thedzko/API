const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const Paper = require('./models/paper')
const articleRouter = require('./routes/articles')
const paperRouter = require('./routes/papers')
const methodOverride = require('method-override')
const app = express()

// IMAGES
const morgan = require('morgan');
const multer = require('multer');
const uuid = require('uuid/v4');

const path = require('path');


// DATABASE
mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/font', express.static(__dirname + 'public/font'))

// IMAGES
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) => {
        console.log(file);
        cb(null, uuid() + path.extname(file.originalname));
    }
})
app.use(multer({ storage }).single('image'));


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

// ARTICLE
app.get('/', async(req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('articles/index', { articles: articles })
})

// PAPER
app.get('/papers', async(req, res) => {
    const papers = await Paper.find().sort({ createdAt: 'desc' })
    res.render('articles/papers/papers', { papers: papers })
});

// USE (BELOW)

//ARTICLES
app.use('/articles', articleRouter);

// PAPER
app.use('/papers', paperRouter);

app.listen(5000)