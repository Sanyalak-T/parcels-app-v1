const express = require("express");
const Organization = require("../models/organization.model");
const router = express.Router();

router.post(
  "/organizations",
  async (req, res) => {
    const organizationPayload = req.body;
    const organization = new Organization(
      organizationPayload
    );
    await organization.save();
    res.status(201).end();
  }
);

router.get("/organizations", async (req, res) => {
  const organization = await Organization.find(
    {}
  );
  res.json(organization);
});

router.get(
  "/organizations/:id",
  async (req, res) => {
    const { id } = req.params;
    const organization =
      await Organization.findById(id);
    res.json(organization);
  }
);

router.put(
  "/organizations/:id",
  async (req, res) => {
    const organizationPayload = req.body;
    const { id } = req.params;

    const organization =
      await Organization.findByIdAndUpdate(id, {
        $set: organizationPayload,
      });
    res.json(organization);
  }
);

router.patch(
  "/organizations/:id",
  async (req, res) => {
    const organizationPayload = req.body;
    const { id } = req.params;

    const organization =
      await Organization.findByIdAndUpdate(id, {
        $set: organizationPayload,
      });
    res.json(organization);
  }
);

router.delete(
  "/organizations/:id",
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
