const Router = require('koa-router');
const { Accusation, isEnableToAccuse} = require('../controllers/accusationController');
const { Game, Player, Weapon, Room, Character } = require('../models');

const router = new Router();

router.get('/isEnable/:playerID', async (ctx) => {
    try {
        // parámetros de la solicitud
        const { playerID} = ctx.params;


        // Realizar la acusación
        const result = await isEnableToAccuse(playerID);

        // Enviar la respuesta
        ctx.status = 200;
        ctx.body = result;

    } catch (error) {
        ctx.status = 500;
        ctx.body = { success: false, message: 'Error al procesar' };
        console.error('Error en comprobación acusación:', error);
    }
});

router.post('/accuse/:gameID', async (ctx) => {
    try {
        const { gameID } = ctx.params;
        const { playerID, character, weapon, room } = ctx.request.body;

        console.log('personaje:', character);
        console.log('arma:', weapon);
        console.log('lugar:', room);

        // Realizar la acusación
        const result = await Accusation(gameID, playerID, character, weapon, room);

        // Enviar la respuesta
        ctx.status = 200;
        ctx.body = result;

    } catch (error) {
        ctx.status = 500;
        ctx.body = { success: false, message: 'Error al procesar la acusación.' };
        console.error('Error en la ruta de acusación:', error);
    }
});

module.exports = router;
