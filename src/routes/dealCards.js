const Router = require('koa-router');
const cardsController = require('../controllers/rumorCardsController');
const gameController = require('../controllers/gameController');

const router = new Router();

router.get("game.dealCards", "/:gameID", async (ctx) => {
    const gameID = ctx.params.gameID;
    await cardsController.SetPlayersHands(gameID);
    const players = await ctx.orm.Player.findAll({
        where: {
          gameID: gameID,
        },
      });
    const game = await ctx.orm.Game.findOne({
        where: {
          id: gameID,
        },
      });
    ctx.body = {'gameInfo': game, 'players': players};
})

module.exports = router;