const authUser = require('../middlewares/authUser');
const express = require('express');

const router = express.Router();

const { getUser, createNewUser, updateUser, deleteUser, getAllUsers } = require('../controllers/user.controller');

router.get('/:id', authUser, getUser);
router.get('/', getAllUsers);

router.post('/create-user', createNewUser);
// router.post('/create-user', passwordGenerator, createNewUser);

router.put('/:id', authUser, updateUser);

router.delete('/:id', authUser, deleteUser);

module.exports = router;
