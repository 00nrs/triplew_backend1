const Router = require('koa-router');

const router = new Router();

router.get("weapons.list", "/", async (ctx) => {
    try{
        const weapons = await ctx.orm.Weapon.findAll();
        ctx.body = weapons;
        ctx.status = 201;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
});

module.exports = router;