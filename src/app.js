const Koa = require('koa');
const KoaLogger = require('koa-logger');
const { koaBody } = require('koa-body');
const router = require('./routes.js');
const orm = require('./models');
const cors = require('@koa/cors')

const app = new Koa();

app.context.orm = orm;

app.use(cors())

app.use(KoaLogger());
app.use(koaBody());

app.use(router.routes());


router.get('/', async (ctx) => {
    ctx.body = 'Hola Mundo!! Bienvenido a el juego \"¿Quién mató a Don Francisco?\"';
    ctx.status = 200;
});

/*
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
*/

module.exports = app;
