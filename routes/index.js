const express = require('express')
const router = express.Router()
const Anime = require('../models/anime')

router.get('/', async (req, res) => {
    let animes
    try {
        animes = await Anime.find().sort({ cDate: 'desc' }).limit(10).exec()
    } catch (err) {
        console.log(err)
        animes = []
    }
    res.render('index', { animes: animes })
})

module.exports = router