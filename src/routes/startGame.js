const Router = require('koa-router');
const newGameController = require('../controllers/newGameController');
const gameController = require('../controllers/gameController');
const axios = require('axios');


const router = new Router();

router.get("startGame.check", "/checkStart/:gameID", async (ctx) => {
    // Revisa que se cumpla el mínimo de jugadores y todos tengan personaje
    let game = await ctx.orm.Game.findByPk(ctx.params.gameID);
    let playersResponse = await axios.get(`http://localhost:3000/game/${ctx.params.gameID}/players`);
    const players = playersResponse.data
    const minPlayers = newGameController.CheckMinNumberOfPlayers(game);
    const playersHaveCharacters = newGameController.CheckThatEveryPlayerHasCharacter(players);
    const canStart = minPlayers && playersHaveCharacters;
    console.log(playersHaveCharacters)
    console.log(minPlayers)

    ctx.body = {"canStart": canStart};
})

router.put("startGame.start", "/:gameID", async (ctx) => {
    try {
        await axios.get(`http://localhost:3000/dealCards/${ctx.params.gameID}`);
        await axios.put(`http://localhost:3000/startGame/setPositions/${ctx.params.gameID}`);

        let game = await ctx.orm.Game.findByPk(ctx.params.gameID);
        await game.update({ started: true, code: null });

        const players = await ctx.orm.Player.findAll({
            where: { gameID: game.id },
            attributes: ['id']
        });

        const playerIDs = players.map(player => player.id);
        await gameController.assignTurns(game.id, playerIDs); // Asigna turnos al inicio del juego

        ctx.body = game;
    } catch (error) {
        ctx.body = error;
        ctx.status = 500;
    }
});

router.put("startGame.positions", "/setPositions/:gameID", async (ctx) => {
    try {
        const game = await ctx.orm.Game.findByPk(ctx.params.gameID);
        let players = await game.getPlayers();

        for (let player of players){
            const character = await ctx.orm.Character.findByPk(player.characterID);
            player.update({ box: character.initialBox })
        }

        
        ctx.body = players;
    } catch(error){
        console.log(error)
        ctx.error = error;
        ctx.status = 400;
    }
    
})

module.exports = router;