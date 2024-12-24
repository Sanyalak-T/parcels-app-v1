const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const equipmentTypeSchema = new Schema({
    equipmenttypename: String,
    equipmenttyperemark: String,
}, {
    timestamps: true,
    versionKey: false,
})

const EquipmentTypeModel = mongoose.model('EquipmentType', equipmentTypeSchema);
module.exports = EquipmentTypeModel;