const Router = require('koa-router');
const newGameController = require('../controllers/newGameController');
const axios = require('axios');
const { Game } = require('../models');


const router = new Router();

router.post("newGame.create", "/:userID", async (ctx) => {
    // Crea un nuevo código para una partida
    let response = await axios.get(`http://localhost:3000/newGame/codes`);
    let gameCodes = response.data;
    let code = await newGameController.generateGameCode(gameCodes);


    let game = await ctx.orm.Game.create({
        hostID: ctx.params.userID,
        code: code,
        players: [],
        started: false
    });

    let event = await ctx.orm.Event.create({gameID: game.id});

    await Game.update({ eventID: event.id }, { where: { id: game.id } });

    await axios.get(`http://localhost:3000/rumors/${game.id}/correctKeys`);

    game = await ctx.orm.Game.findByPk(game.id);

    ctx.body = game;
})

router.get("newGame.codes", "/codes", async (ctx) => {
    // Array con todos los códigos en uso
    const games = await ctx.orm.Game.findAll({
        attributes: ['code'] // Solo queremos obtener el atributo 'code'
      });
  
    // Filtrar y obtener solo los valores de 'code' que no son nulos
    const nonNullCodes = games
        .filter(game => game.code !== null)
        .map(game => game.code);

    ctx.body = nonNullCodes;
})

router.put("newGame.addPlayer", "/:gameID/addPlayer", async (ctx) => {
    // Conseguimos game de la base de datos
    try{
        let game = await ctx.orm.Game.findByPk(ctx.params.gameID);
        const id = parseInt(ctx.request.body["playerID"]);
        game = await newGameController.AddPlayerToGame(id, game);

        const player = await ctx.orm.Player.findOne({
            where: {
                id: ctx.request.body["playerID"],
            },
        });

        player.gameID = game.id;

        await player.save()
    
        ctx.body = game;
    } catch (error){
        ctx.body = error;
    }
    
})

router.get("newGame.characters", "/characters/:gameID", async (ctx) => {
    try {
        let response = await axios.get(`http://localhost:3000/players/game/${ctx.params.gameID}`);
        let players = response.data;

        const notAvailableCharacters = []

        for (const player of players){
            console.log(player.characterID);
            notAvailableCharacters.push(player.characterID)
        }

        ctx.body = notAvailableCharacters;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
    
})

router.get("newGame.characters", "/charactersTitus/titus/:gameID", async (ctx) => {
    try {
        const game = await ctx.orm.Game.findByPk(ctx.params.gameID);
        let players = await game.getPlayers();

        console.log(players);

        
        ctx.body = players;
    } catch(error){
        console.log(error)
        ctx.error = error;
        ctx.status = 400;
    }
    
})

module.exports = router;