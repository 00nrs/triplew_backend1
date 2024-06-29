const Router = require('koa-router');
const usersController = require('../controllers/usersController');
const router = new Router();


router.get("users.list", "/", async (ctx) => {
    try{
        const users = await ctx.orm.User.findAll();
        ctx.body = users;
        ctx.status = 201;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
});

router.get("users.show", "/:id", async (ctx) => {
    try{
        //forma 1: por primary key
        const user = await ctx.orm.User.findByPk(ctx.params.id); 
        //forma 2: condición id = id parámetro
        //const user = await ctx.orm.User.findOne({where: {id: ctx.params.id}});
        ctx.body = user;
        ctx.status = 201;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
});

router.get("users.username", "/username/:username", async (ctx) => {
    try{
        const user = await ctx.orm.User.findOne({
            where: {
                username: ctx.params.username
            }
        }); 
        ctx.body = user;
        ctx.status = 201;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
});

router.delete('/delete/:id', async (ctx) =>{
    try{
        console.log("userid es", ctx.params.id);
        const {id} = ctx.params;
        const response = await usersController.DeleteUser(id);
        ctx.status = 200;
        ctx.body = response;
    } catch(error){
        ctx.status = 500;
        ctx.body = false;
        console.error('Error al eliminar juego:', error);
    }
});


module.exports = router;