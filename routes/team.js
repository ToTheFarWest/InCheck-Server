const express = require('express');
const controller = require('../controllers/teamsController');
const auth = require('../middleware/auth');

router = express.Router();

router.get('/', auth, async (req, res) => {
    return await controller.user_teams_list(req, res);
});

router.post('/', auth, (req, res) => {
    return controller.team_create(req, res);
});

router.get('/:team/messages', auth, async (req, res) => {
    return controller.team_get_all_messages(req, res);
});

module.exports = router;