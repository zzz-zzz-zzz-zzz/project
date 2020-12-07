const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const Anime = require('../models/anime')
const uploadPath = path.join('public', Anime.imgPath)
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif']
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype))
    }
})

// All Animes Route
router.get('/', async (req, res) => {
    let query = Anime.find()
    if (req.query.title != null && req.query.title != '') {
        query = query.regex('title', new RegExp(req.query.title, 'i'))
    }
    if (req.query.year != null && req.query.year != '') {
        query = query.where('rYear').equals(req.query.year)
    }
    try {
        const animes = await query.exec()
        res.render('animes/index', {
            animes: animes,
            searchOptions: req.query
        })
    } catch (error) {
        res.redirect('/')
    }
})

// New Anime Route
router.get('/new', async (req, res) => {
    renderNewPage(res, new Anime())
})

// Post Anime Route
router.post('/', upload.single('cover'), async (req, res) => {
    const fileName = req.file != null ? req.file.filename : null
    const anime = new Anime({
        title: req.body.title,
        descr: req.body.descr,
        rDate: new Date(req.body.rDate),
        fDate: new Date(req.body.fDate),
        eCount: req.body.eCount,
        imgName: fileName
    })
    try {
        const newAnime = await anime.save()
        // res.redirect('animes/${newAnime.id}')
        res.redirect('animes')
    } catch {
        if (anime.imgName != null) {
            removeThumbnail(anime.imgName)
        }
        renderNewPage(res, anime, true)
    }
})

async function renderNewPage(res, anime, hasError = false) {
    try {
        const anime = new Anime()
        const params = {
            anime: anime
        }
        if (hasError) params.errorMessage = 'Error posting an anime'
        res.render('animes/new', params)
    } catch {
        res.redirect('/animes')
    }
}

function removeThumbnail(fileName) {
    fs.unlink(path.join(uploadPath, fileName), err => {
        if (err) console.log(err)
    })
}

module.exports = router