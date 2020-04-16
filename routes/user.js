const express = require('express');
const userController = require('../controllers/userController');
router = express.Router();

router.get('/', (req, res) => {
    return userController.get_all_users(req, res);
});

router.get('/:id', (req, res) => {
    return userController.user_get(req, res);
});

router.post('/', async (req, res) => {
    return await userController.user_create(req, res);
});

router.post('/login', async (req, res) => {
    return await userController.user_login(req, res);
});

module.exports = router;