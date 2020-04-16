const express = require('express');
const controller = require('../controllers/userController');
const auth = require('../middleware/auth');
router = express.Router();

router.get('/', (req, res) => {
    return controller.get_all_users(req, res);
});

router.get('/id/:id', (req, res) => {
    return controller.user_get(req, res);
});

router.get('/me', auth, (req, res) => {
    return controller.user_get_self(req, res);
});

router.post('/', async (req, res) => {
    return await controller.user_create(req, res);
});

router.post('/login', async (req, res) => {
    return await controller.user_login(req, res);
});

router.get('/logout', auth, async (req, res) => {
    return await controller.user_logout(req, res);
});

router.get('/logout-all', auth, async (req, res) => {
    return await controller.user_logout_all(req, res);
});

router.get('/delete', auth,  async (req, res) => {
    return await controller.user_delete(req, res);
});

module.exports = router;