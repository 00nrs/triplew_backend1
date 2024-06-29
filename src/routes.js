const Router = require('koa-router');
const characters = require('./routes/characters.js');
const users = require('./routes/users.js');
const rooms = require('./routes/rooms.js');
const weapons = require('./routes/weapons.js');
const game = require('./routes/game.js');
const rumor = require('./routes/rumors.js');
const dealCards = require('./routes/dealCards.js');
const accusations = require('./routes/accusation.js');
const players = require('./routes/players.js')
const authRoutes = require('./routes/authentication.js');
const dotenv = require('dotenv');
const jwtMiddleware = require('koa-jwt')
const protectedRoutes = require('./routes/protectedAccess.js');
const newGame = require('./routes/newGame.js');
const startGame = require('./routes/startGame.js');
const actionCards = require('./routes/actionCards.js')
const events = require('./routes/events.js');

dotenv.config();


const router = new Router();

router.use('/characters', characters.routes());
router.use('/rooms', rooms.routes());
router.use('/weapons', weapons.routes());
router.use('/game', game.routes());
router.use('/rumors', rumor.routes());
router.use('/dealCards', dealCards.routes());
router.use('/accusations', accusations.routes());
router.use('/players', players.routes())
router.use('/newGame', newGame.routes())
router.use(authRoutes.routes());
router.use('/startGame', startGame.routes())
router.use('/actionCards', actionCards.routes())
router.use('/events', events.routes());
router.use('/users', users.routes());

// Desde esta línea, todas las rutas requieriran un JWT. Esto no aplica para
// las líneas anteriores
router.use(jwtMiddleware( { secret: process.env.JWT_SECRET } )) 

router.use(protectedRoutes.routes()); 
             




module.exports = router;