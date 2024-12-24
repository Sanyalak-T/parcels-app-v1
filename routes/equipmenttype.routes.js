const express = require('express');
const EquipmentType = require('../models/equipmenttype.model');
const router = express.Router();

router.post('/equipmenttypes', async(req, res) => {
    const equipmentTypePayload = req.body;
    const equipmentType = new EquipmentType(equipmentTypePayload);
    await equipmentType.save();
    res.status(201).end();
})

router.get('/equipmenttypes', async (req, res) => {
    const equipmentType = await EquipmentType.find({});
    res.json(equipmentType);
})

router.get('/equipmenttypes/:id', async (req, res) => {
    const {id} = req.body;
    const equipmentType = await EquipmentType.findById(id);
    res.json(equipmentType);
})

router.put('/equipmenttypes/:id', async (req, res) => {
    const equipmentTypePayload = req.body;
    const {id} = req.params;

    const equipmentType = await EquipmentType.findByIdAndUpdate(id, {
        $set: equipmentTypePayload
    });
    res.json(equipmentType);
})

router.patch('/equipmenttypes/:id', async (req, res) => {
    const equipmentTypePayload = req.body;
    const {id} = req.params;

    const equipmentType = await EquipmentType.findByIdAndUpdate(id, {
        $set: equipmentTypePayload
    });
    res.json(equipmentType);
})

router.delete('/equipmenttypes/:id', async (req, res) => {
    const {id} = req.params;
    const idDelete = await EquipmentType.findByIdAndDelete(id);
    res.json(idDelete).end();
})

module.exports = router;