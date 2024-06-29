const Router = require('koa-router');

const router = new Router();

router.get("player.cards", "/:id/cards", async (ctx) => {
    try{
        const player = await ctx.orm.Player.findByPk(ctx.params.id);
        const cards = [];
        for (const cardID in player.cards){
            const card = await ctx.orm.Card.findByPk(cardID);
            cards.push(card)
        }
        ctx.body = player;
        ctx.status = 201;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
});


module.exports = router;