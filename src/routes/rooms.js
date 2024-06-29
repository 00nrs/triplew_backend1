const Router = require('koa-router');

const router = new Router();

router.get("rooms.list", "/", async (ctx) => {
    try{
        const rooms = await ctx.orm.Room.findAll();
        ctx.body = rooms;
        ctx.status = 201;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
});

module.exports = router;