const Router = require('koa-router');

const router = new Router();

const axios = require('axios');

router.get("players.show", "/:id", async (ctx) => {
    try {
        const player = await ctx.orm.Player.findByPk(ctx.params.id);
        ctx.body = player;
        ctx.status = 200;
    } catch (error) {
        ctx.body = error;
        ctx.status = 400;
    }
});

router.get("player.cards", "/:id/cards", async (ctx) => {
    try {
        const player = await ctx.orm.Player.findByPk(ctx.params.id);
        const cards = [];
        console.log(player.cards);
        for (const cardID of player.cards) {
            console.log(cardID);
            const card = await ctx.orm.Card.findByPk(cardID);
            cards.push(card);
        }
        ctx.body = cards;
        ctx.status = 201;
    } catch (error) {
        ctx.body = error;
        ctx.status = 400;
    }
});

router.post("players.create", "/newPlayer", async (ctx) => {
    const player = await ctx.orm.Player.create({
        userID: ctx.request.body["userID"],
        name: ctx.request.body["name"],
        characterID: null,
    });

    ctx.body = player;
});

router.put("players.chooseCharacter", "/chooseCharacter", async (ctx) => {
    const player = await ctx.orm.Player.findByPk(ctx.request.body["playerID"]);
    console.log(ctx.request.body["playerID"]);
    player.update({ characterID: ctx.request.body["chosen_character"] });

    ctx.body = player;
});

router.get("players.game", "/game/:gameID", async (ctx) => {
    try {
        const gameID = ctx.params.gameID;
        let response = await axios.get(`http://localhost:3000/game/${gameID}`);
        let game = response.data;

        console.log(game);

        const players = [];
        console.log(ctx.params.gameID);

        for (const playerID of game.players) {
            console.log(playerID);
            const player = await ctx.orm.Player.findByPk(playerID);
            players.push(player);
        }
        ctx.body = players;
        ctx.status = 201;
    } catch (error) {
        ctx.body = error;
        ctx.status = 400;
    }
});

router.get("player.game", "/playerInGame/:userID/:gameID", async (ctx) => {
    try {
        const gameID = ctx.params.gameID;
        const userID = ctx.params.userID;
        const player = await ctx.orm.Player.findOne({
            where: {
                userID: userID,
                gameID: gameID,
            },
            attributes: ['id', 'userID', 'gameID', 'characterID', 'clueSheetID', 'cards', 'box', 'lastRoom', 'turnNumber']
        });

        ctx.body = player;
        ctx.status = 201;
    } catch (error) {
        ctx.body = error;
        ctx.status = 400;
    }
});

router.get("players.show", "/turnUsername/:gameID", async (ctx) => {
    try {
        const gameID = ctx.params.gameID;
        const game = await ctx.orm.Game.findByPk(gameID);
        const player = await ctx.orm.Player.findOne({
            where: {
                gameID: gameID,
                turnNumber: game.currentTurn,
            },
        });
        ctx.body = player.name;
        ctx.status = 201;
    } catch (error) {
        ctx.body = error;
        ctx.status = 400;
    }
});

module.exports = router;
