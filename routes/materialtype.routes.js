const express = require('express');
const MaterialType = require('../models/materialtype.model');
const router = express.Router();

router.post('/materialtypes', async(req, res) => {
    const materialTypePayload = req.body;
    const materialType = new MaterialType(materialTypePayload);
    await materialType.save();
    res.status(201).end();
})

router.get('/materialtypes', async (req, res) => {
    const materialType = await MaterialType.find({});
    res.json(materialType);
})

router.get('/materialtypes/:id', async (req, res) => {
    const {id} = req.body;
    const materialType = await MaterialType.findById(id);
    res.json(materialType);
})

router.put('/materialtypes/:id', async (req, res) => {
    const materialTypePayload = req.body;
    const {id} = req.params;

    const materialType = await MaterialType.findByIdAndUpdate(id, {
        $set: materialTypePayload
    });
    res.json(materialType);
})

router.patch('/materialtypes/:id', async (req, res) => {
    const materialTypePayload = req.body;
    const {id} = req.params;

    const materialType = await MaterialType.findByIdAndUpdate(id, {
        $set: materialTypePayload
    });
    res.json(materialType);
})

router.delete('/materialtypes/:id', async (req, res) => {
    const {id} = req.params;
    const idDelete = await MaterialType.findByIdAndDelete(id);
    res.json(idDelete).status(204).end();
})

module.exports = router;