const Router = require('koa-router');
const eventController = require('../controllers/eventsController');
const axios = require('axios');

const router = new Router();

router.get('/get-message/:gameID', async (ctx) => {
    const { gameID } = ctx.params;
    const message = await eventController.getMessage(gameID);
    ctx.status = 200;
    ctx.body = { message };
});

router.post('/set-message/:gameID', async (ctx) => {
    const { gameID } = ctx.params;
    const { message } = ctx.request.body;
    try {
        const updatedMessage = await eventController.setMessage(gameID, message);
        ctx.status = 200;
        ctx.body = { updatedMessage };
    } catch (error) {
        console.error('Error al actualizar el mensaje compartido:', error);
        ctx.status = 400;
        ctx.body = { message: 'No se pudo actualizar el mensaje compartido' };
    }
});

router.post('/new-event/:gameID', async (ctx) => {

});

module.exports = router;