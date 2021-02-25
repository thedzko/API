const { Schema, model } = require('mongoose')

const imageSchema = new Schema({
    filename: { type: String },
    path: { type: String },
    originalname: { type: String },
    mimetype: { type: String },
    size: { type: Number }
}
})

module.exports = model('Image', imageSchema);