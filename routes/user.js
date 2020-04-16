const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
router = express.Router();

router.get('/', (req, res) => {
    return userController.get_all_users(req, res);
});

router.get('/id/:id', (req, res) => {
    return userController.user_get(req, res);
});

router.get('/me', auth, (req, res) => {
    return userController.user_get_self(req, res);
});

router.post('/', async (req, res) => {
    return await userController.user_create(req, res);
});

router.post('/login', async (req, res) => {
    return await userController.user_login(req, res);
});

router.get('/delete', auth,  async (req, res) => {
    return await userController.user_delete(req, res);
});

module.exports = router;