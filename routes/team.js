const express = require('express');
const controller = require('../controllers/teamsController');
const auth = require('../middleware/auth');

router = express.Router();

router.get('/', (req, res) => {
    res.send('Teams GET route!');
});

router.post('/', (req, res) => {
    return controller.team_create_post(req, res);
});

router.get('/:team/messages', auth, async (req, res) => {
    return controller.team_get_all_messages(req, res);
});

module.exports = router;