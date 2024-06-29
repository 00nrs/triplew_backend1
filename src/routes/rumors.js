const Router = require('koa-router');
const rumor = require('../controllers/rumorController');

const router = new Router();

router.get('/checkPlayerRoom/:playerID', async (ctx) => {
    try {
        const { playerID } = ctx.params;
        console.log(`PlayerID in route: ${playerID}`); // Log para verificar el playerID recibido
        const result = await rumor.checkPlayerRoom(playerID);
        console.log(result)
        ctx.status = 200;
        ctx.body = result;
    } catch (error) {
        ctx.status = 400;
        ctx.body = { success: false, message: 'Error al verificar la habitación del jugador.' };
        console.error('Error en la ruta de verificar la habitación del jugador:', error);
    }
});

router.get("rumor.showAnswer", "/:gameID/correctKeys", async (ctx) => {
    try{
        const gameID = ctx.params.gameID;
        const game = await ctx.orm.Game.findOne({
            where: {
                id: gameID,
            },
        });

        // Llamar a ChooseCorrectKeys y esperar a que termine antes de continuar
        await rumor.ChooseCorrectKeys(game.id);

        // Obtener el juego actualizado después de llamar a ChooseCorrectKeys
        const updatedGame = await ctx.orm.Game.findByPk(gameID);

        ctx.body = updatedGame.correctKeys;
        ctx.status = 201;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
});

router.get("rumor.show", "/:playerID/rumor", async (ctx) => {
    try{
        const playerID = ctx.params.playerID;
        //Considerando que está haciendo el rumor con el personaje 2 y arma 8
        ctx.body = await rumor.StartRumor(playerID, 2, 8);
        ctx.status = 201;
    } catch(error){
        console.error('Error:', error); 
        ctx.body = error;
        ctx.status = 400;
    }
});

router.get("rumor.refute.show", "/:gameID/:playerID", async (ctx) => {
    try{
        const gameID = ctx.params.gameID;
        const playerID = ctx.params.playerID;
        /*El llamado de la función es para el juego 2, jugador 2, 
        personaje 2, habitación 1 y arma 8
        Debería refutarse el rumor con el personaje 2
        */
        ctx.body = await rumor.RefuteRumor(gameID, playerID, 2, 8, 1);
        ctx.status = 201;
    } catch(error){
        console.error('Error:', error); 
        ctx.body = error;
        ctx.status = 400;
    }
});

router.post("rumor.start", "/startRumor", async (ctx) => {
    try {
        const { playerID, characterID, weaponID } = ctx.request.body;
        const result = await rumorController.HandleRumor(playerID, characterID, weaponID);
        ctx.body = result;
        ctx.status = result.success ? 200 : 400;
    } catch (error) {
        console.error('Error:', error);
        ctx.body = { success: false, message: 'Error al iniciar el rumor' };
        ctx.status = 500;
    }
});

router.post("rumor.refute", "/refute", async (ctx) => {
    try {
        const { gameID, playerID, cardID } = ctx.request.body;
        ctx.body = { success: true, message: 'Refutación exitosa' };
    } catch (error) {
        console.error('Error al refutar el rumor:', error);
        ctx.status = 500;
        ctx.body = { success: false, message: 'Error al refutar el rumor' };
    }
});

module.exports = router;