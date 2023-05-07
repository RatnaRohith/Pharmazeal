const authUser = require('../middlewares/authUser');
const express = require('express');

const Medicine = require('../models/medicine.model');

const router = express.Router();

// API endpoints for Medicine model
router.post('/', async (req, res) => {
  console.log('req: ', req.body)
  try {
    const medicine = new Medicine(req.body.body);
    await medicine.save();
    res.send(medicine);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/:storeName', async (req, res) => {
  try {
    const medicine = await Medicine.find({store: req.params.storeName});
    res.send(medicine);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/get/get-total-medicines', async (req, res) => {
  try {
    const medicine = await Medicine.countDocuments();
    res.send({data: medicine});
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.send(medicines);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
