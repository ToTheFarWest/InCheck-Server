const express = require('express');
const controller = require('../controllers/teamsController');
const auth = require('../middleware/auth');

router = express.Router();

router.get('/', auth, async (req, res) => {
    return await controller.user_teams_list(req, res);
});

router.post('/', auth, async (req, res) => {
    return await controller.team_create(req, res);
});

router.get('/:team', auth, async (req, res) => {
    return await controller.team_get(req, res);
});

router.get('/:team/messages', auth, async (req, res) => {
    return await controller.team_get_all_messages(req, res);
});

router.post('/:team/messages', auth, async (req, res) => {
    return await controller.team_message_create(req, res);
});

router.get('/:team/delete', auth, async (req, res) => {
    return await controller.team_delete(req, res);
});

module.exports = router;