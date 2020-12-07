const mongoose = require('mongoose')


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
        type: String,
    },
    fDate: {
        type: String,
    },
    cDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    thumbImage: {
        type: Buffer,
        required: true
    },
    thumbImageType: {
        type: String,
        required: true
    },
    rYear: {
        type: Number,
        default: function() {
            if (this.rDate != '') return new Date(this.rDate).getFullYear()
            else return 0
        }
    },
    tags: [String]
})

animeSchema.virtual('imgVPath').get(function() {
    if (this.thumbImage != null && this.thumbImageType != null) {
        return `data:${this.thumbImageType};charset=utf-8;base64,${this.thumbImage.toString('base64')}`
    }
})

module.exports = mongoose.model('Anime', animeSchema)
