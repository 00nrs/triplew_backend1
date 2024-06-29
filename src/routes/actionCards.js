const Router = require('koa-router');
const actionCardsController = require('../controllers/actionCardsController');

const router = new Router();

router.put("actionCards.action", "/:playerID", async (ctx) => {
    const player = await ctx.orm.Player.findByPk(ctx.params.playerID);
    const cards = await ctx.orm.ActionCard.findAll()
    const actionCard = actionCardsController.GetRandomCard(cards)
    const box = await ctx.orm.Box.findOne({
        where: {
            roomID: actionCard.roomID,
        }
    })
    player.update({ box: box.coordinate });

    ctx.body = actionCard;
})

module.exports = router;