const Router = require('koa-router');
const board = require('../controllers/boardController');
const gameController = require('../controllers/gameController');
const axios = require('axios');

const router = new Router();

router.get("game.show", "/:gameID", async (ctx) => {
  // Busca al jugador en la bdd de acuerdo a su ID
    const game = await ctx.orm.Game.findOne({
      where: {
        id: ctx.params.gameID,
      },
    });
    ctx.body = game;
})

router.get("game.show", "/code/:gameCode", async (ctx) => {
  // Busca al jugador en la bdd de acuerdo a su ID
    const game = await ctx.orm.Game.findOne({
      where: {
        code: ctx.params.gameCode,
      },
    });
    ctx.body = game;
})

router.get("game.players", "/:gameID/players", async (ctx) => {
  try{
    const game = await ctx.orm.Game.findByPk(ctx.params.gameID, {
      include: [{
        model: ctx.orm.Player
      }]
    });
    const players = game.Players;
      ctx.body = players;
      ctx.status = 201;
  } catch(error){
      ctx.body = error;
      ctx.status = 400;
  }
});

router.get("game.positions", "/:gameID/positions", async (ctx) => {
  try{
    const game = await ctx.orm.Game.findByPk(ctx.params.gameID, {
      include: [{
        model: ctx.orm.Player
      }]
    });
    const players = game.Players;
    const positions = {};
    await Promise.all(players.map(async (player) => {
      const character = await ctx.orm.Character.findByPk(player.characterID);
      // Asegúrate de manejar el caso cuando no se encuentre el character
      if (character) {
        positions[player.box] = character.color;
      }
    }));
    
    ctx.body = positions;
    ctx.status = 200;
  } catch(error){
      ctx.body = error;
      ctx.status = 400;
  }
});

router.get("game.throwDice", "/:playerID/throwDice", async (ctx) => {
  // Busca al jugador en la bdd de acuerdo a su ID
    const playerID = ctx.params.playerID;
    const player = await ctx.orm.Player.findOne({
      where: {
        id: playerID,
      },
    });
    // Busca la información de las casillas y tira el dado
    const boxes = await ctx.orm.Box.findAll();
    let dice = board.ThrowDice(1,12);
    
    // Consigue un array con las posiciones de los jugadores
    const gameID = player.gameID;
    let positionsResponse = await axios.get(`http://localhost:3000/game/${gameID}/positions`);
    const positions = Object.keys(positionsResponse.data);

    // Entrega el valor de la tirada y los posibles movimientos
    ctx.body = { "dice": dice,
      "possible_movements": board.possible_movements(player, dice, boxes, positions)};
})

router.post("game.throwDice", "/:playerID/throwDice", async (ctx) => {
  const playerID = ctx.params.playerID;
  const player = await ctx.orm.Player.findOne({
    where: {
      id: playerID,
    },
  });
  const boxes = await ctx.orm.Box.findAll();
  const box = await ctx.orm.Box.findOne({
    where: {
      coordinate: ctx.request.body["chosen_box"],
    },
  });

  // Consigue un array con las posiciones de los jugadores
  const gameID = player.gameID;
  let positionsResponse = await axios.get(`http://localhost:3000/game/${gameID}/positions`);
  const positions = Object.keys(positionsResponse.data);

  // Revisa si el movimiento elegido es valido y lo realiza si lo es
  let is_movement_valid = board.check_movement(player, ctx.request.body["dice"], ctx.request.body["chosen_box"], boxes, positions)
  if(is_movement_valid){
    ctx.body = box.type;
    player.box = ctx.request.body["chosen_box"];
    if (box.roomID){
      player.lastRoom = box.roomID;
    }
    await player.save();

  console.log(`player id: ${player.id} box: ${player.box}`)
  }
  else{
    ctx.body = "Por favor elige una casilla válida."
  }
})

router.post("game.assignTurns", "/assignTurns", async (ctx) => {
  try {
    const { gameID, playerIDs } = ctx.request.body;
    const totalPlayers = await gameController.assignTurns(gameID, playerIDs);
    // Enviar respuesta con el número total de jugadores a los que se les asignaron turnos
    ctx.body = { exito: true, totalPlayers };
  } catch (error) {
    console.error('Error al asignar turnos:', error);
    ctx.status = 500;
    ctx.body = { exito: false, error: 'No se pudieron asignar los turnos' };
  }
});

router.get('/winner/:gameID', async (ctx) => {
  try {
      // parámetros de la solicitud
      const {gameID} = ctx.params;


      // Realizar la acusación
      const result = await gameController.getWinner(gameID);

      // Enviar la respuesta
      ctx.status = 200;
      ctx.body = {winnerName: result};

  } catch (error) {
      ctx.status = 200;
      ctx.body = { success: false, winnerName: null };
  }
});

router.get('/keys/:gameID', async (ctx) => {
  try {
      const {gameID} = ctx.params;
      const result = await gameController.GetCorrectKeys(gameID);

      console.log(result);
      ctx.status = 200;
      ctx.body = result;

  } catch (error) {
      ctx.status = 500;
      ctx.body = { success: false, message: 'Error al procesar respuestas correctas' };
      console.error('Error en conseguir respuestas correctas:', error);
  }
});

router.post("game.nextTurn", "/:gameID/nextTurn", async (ctx) => {
  try {
      const nextTurn = await gameController.nextTurn(ctx.params.gameID);
      ctx.body = { exito: true, nextTurn };
  } catch (error) {
      console.error('Error al avanzar al siguiente turno:', error);
      ctx.status = 500;
      ctx.body = { exito: false, error: 'No se pudo avanzar al siguiente turno' };
  }
});

router.delete('/delete/:gameID', async (ctx) => {
  try {
      const {gameID} = ctx.params;
      const response = await gameController.DeleteGame(gameID);
      ctx.status = 200;
      ctx.body = response;
  } catch (error) {
      ctx.status = 500;
      ctx.body = { success: false, message: 'Error al eliminar juego' };
      console.error('Error al eliminar juego:', error);
  }
});

module.exports = router;