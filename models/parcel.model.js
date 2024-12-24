const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parcelSchema = new Schema({
    arrivaldate: {type: Date, default: Date.now},
    numberorcode: String,
    parceltype: String,
    nameparcel: String,
    brandtypemodelsizedescrip: String,
    unitprice: Number,
    howtoget: String,
    documentnumberone: String,
    stationary: String,
    paymentproof: String,
    changelog: String,
    documentnumbertwo: String,
    parcelremark: String,
}, {
    timestamps: true,
    versionKey: false,
})

const ParcelModel = mongoose.model('Parcel', parcelSchema);
module.exports = ParcelModel;