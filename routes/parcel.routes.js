const express = require('express');
const Parcel = require('../models/parcel.model');
const router = express.Router();

router.post('/parcels', async(req, res) => {
    const parcelPayload = req.body;
    const parcel = new Parcel(parcelPayload);
    await parcel.save();
    res.status(201).end();
})

router.get('/parcels', async (req, res) => {
    const parcel = await Parcel.find({});
    res.json(parcel);
})

router.get('/parcels/:id', async (req, res) => {
    // const {id} = req.body;
    const {id} = req.params;
    const parcel = await Parcel.findById(id);
    res.json(parcel);
})

router.put('/parcels/:id', async (req, res) => {
    const parcelPayload = req.body;
    const {id} = req.params;

    const parcel = await Parcel.findByIdAndUpdate(id, {
        $set: parcelPayload
    });
    res.json(parcel);
})

router.patch('/parcels/:id', async (req, res) => {
    const parcelPayload = req.body;
    const {id} = req.params;

    const parcel = await Parcel.findByIdAndUpdate(id, {
        $set: parcelPayload
    });
    res.json(parcel);
})

router.delete('/parcels/:id', async (req, res) => {
    const {id} = req.params;
    const idDelete = await Parcel.findByIdAndDelete(id);
    res.json(idDelete).status(204).end();
})

module.exports = router;