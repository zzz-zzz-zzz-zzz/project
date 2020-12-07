const express = require('express')
const router = express.Router()
const Anime = require('../models/anime')
const anime = require('../models/anime')
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif']

// All Animes Route
router.get('/', async (req, res) => {
    let query = Anime.find()
    if (req.query.title != null && req.query.title != '') {
        query = query.regex('title', new RegExp(req.query.title, 'i'))
    }
    if (req.query.year != null && req.query.year != 0) {
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
router.post('/', async (req, res) => {
    const anime = new Anime({
        title: req.body.title,
        descr: req.body.descr,
        rDate: req.body.rDate.toString(),
        fDate: req.body.fDate.toString(),
        eCount: req.body.eCount,
    })
    saveThumb(anime, req.body.cover)
    try {
        const newAnime = await anime.save()
        // res.redirect('animes/${newAnime.id}')
        res.redirect('animes')
    } catch (err){
        console.log(err)
        renderNewPage(res, anime, true)
    }
})

function saveThumb(anime, thumbEncoded) {
    if (thumbEncoded == null) return
    const thumb = JSON.parse(thumbEncoded)
    if (thumb != null && imageMimeTypes.includes(thumb.type)) {
        anime.thumbImage = new Buffer.from(thumb.data, 'base64')
        anime.thumbImageType = thumb.type
    }
}

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


module.exports = router