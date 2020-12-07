const mongoose = require('mongoose')
const path = require('path')

const imgPath = 'uploads/tImages'

const animeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    descr: {
        type: String,
    },
    eCount: {
        type: Number,
        required: true
    },
    rDate: {
        type: Date,
        required: true
    },
    fDate: {
        type: Date
    },
    cDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    imgName: {
        type: String,
        required: true
    },
    rYear: {
        type: Number,
        default: function() {
            return this.rDate.getFullYear()
        }
    },
    tags: [String]
})

animeSchema.virtual('imgVPath').get(function() {
    if (this.imgName != null) {
        return path.join('/', imgPath, this.imgName)
    }
})

module.exports = mongoose.model('Anime', animeSchema)
module.exports.imgPath = imgPath