const express = require('express')
const anime = require('../models/anime')
const router = express.Router()
const Anime = require('../models/anime')

router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const animes = await Anime.find(searchOptions)
        res.render('animes/index', {
            animes: animes,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
})

router.get('/new', (req, res) => {
    res.render('animes/new', { anime: new Anime() })
})

router.post('/', async (req,res) => {
    const anime = new Anime({
        name: req.body.name
    })
    try {
        const newAnime = await anime.save()
        // res.redirect('animes/${newAnime.id}')
        res.redirect('animes')
    } catch {
        res.render('animes/new', {
            anime: anime,
            errorMessage: 'Error posting an anime'
        })
    }
})

module.exports = router