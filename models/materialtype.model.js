const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const materialTypeSchema = new Schema({
    materialtypename: String,
    materialtyperemark: String,
}, {
    timestamps: true,
    versionKey: false,
})

const MaterialTypeModel = mongoose.model('MaterialType', materialTypeSchema);
module.exports = MaterialTypeModel;