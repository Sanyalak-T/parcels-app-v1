const express = require("express");
const ParcelType = require("../models/parceltype.model");
const router = express.Router();

router.post("/parceltypes", async (req, res) => {
  const parcelTypePayload = req.body;
  const parcelType = new ParcelType(
    parcelTypePayload
  );
  await parcelType.save();
  res.status(201).end();
});

router.get("/parceltypes", async (req, res) => {
  const parcelType = await ParcelType.find({});
  res.json(parcelType);
});

router.get(
  "/parceltypes/:id",
  async (req, res) => {
    const { id } = req.body;
    const parcelType = await ParcelType.findById(
      id
    );
    res.json(parcelType);
  }
);

router.put(
  "/parceltypes/:id",
  async (req, res) => {
    const parcelTypePayload = req.body;
    const { id } = req.params;

    const parcelType =
      await ParcelType.findByIdAndUpdate(id, {
        $set: parcelTypePayload,
      });
    res.json(parcelType);
  }
);

router.patch(
  "/parceltypes/:id",
  async (req, res) => {
    const parcelTypePayload = req.body;
    const { id } = req.params;

    const parcelType =
      await ParcelType.findByIdAndUpdate(id, {
        $set: parcelTypePayload,
      });
    res.json(parcelType);
  }
);

router.delete(
  "/parceltypes/:id",
  async (req, res) => {
    try {
      const { id } = req.params;
      const idDelete =
        await Organization.findByIdAndDelete(id);
      res.json(idDelete).end();
    } catch (error) {
      res.send(error);
    }
  }
);

module.exports = router;
