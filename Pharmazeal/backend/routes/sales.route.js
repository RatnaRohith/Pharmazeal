const authUser = require('../middlewares/authUser');
const express = require('express');

const Sale = require('../models/sale.model');

const router = express.Router();

// API endpoints for Sale model
router.post('/', async (req, res) => {
  try {
    const sale = new Sale(req.body);
    await sale.save();
    res.send(sale);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/get-total-sales', async (req, res) => {
  try {
    const sales = await Sale.countDocuments();
    res.status(200).send({data: sales});
  } catch (error) {
    res.status(500).send(error);
  }
});


router.get('/', async (req, res) => {
  try {
    const sales = await Sale.find().populate('customer').populate('medicine');
    res.send(sales);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
