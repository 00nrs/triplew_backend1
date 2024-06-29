const { Card, Game, Character, Room, Weapon, Player } = require('../models');

async function SetPlayersHands(gameID){
    const game = await Game.findOne({
        where:{
            id: gameID,
        },
    });
    let available_cards = [];
    const cards = await Card.findAll();
    const players = await Player.findAll({
        where: {
            gameID : gameID,
        },
    });
    //Considera como disponibles sólo las cartas que no hayan sido elegidas como respuestas de la partida
    for (const card of cards) {
        await CheckIfCardIsAvailable(card, game, available_cards);
    }
    // Reparte las cartas a cada jugador
    await DealCards(players, available_cards);
    // Las cartas que sobran se dejan en el tablero
    if (available_cards.length >0){
        game.remainingRumorCards = available_cards;
        await game.save();
    }
}

async function CheckIfCardIsAvailable(card, game, available_cards){
    // Busca las respuestas correctas de la partida
    const characterID = game.correctKeys['character'];
    const weaponID = game.correctKeys['weapon'];
    const roomID = game.correctKeys['room'];
    const character = await Character.findOne({
        where: {
            id: characterID,
        },
    })
    const weapon = await Weapon.findOne({
        where: {
            id: weaponID,
        },
    })
    const room = await Room.findOne({
        where: {
            id: roomID,
        },
    })
    //Revisa si la carta forma parte de las respuestas correctas de la partida
    if (character.name == card.content | room.name == card.content | weapon.name == card.content){
        //console.log("Esta carta forma parte de las respuestas, no se puede repartir");
    }
    // Agrega la carta a disponible si no forma parte de las respuestas correctas de la partida
    else{
        available_cards.push(card.id);
    }
    return available_cards;
}

async function DealCards(players, cards){
    const numberOfPlayers = players.length;
    // Asigna el numero de cartas para cada jugador
    let num_cards_in_hand = Math.trunc(21/numberOfPlayers);
    let num_remaining_cards = 21%numberOfPlayers;
    for (const player of players) {
        await AssignCardsToPlayer(player, cards, num_cards_in_hand);
    }
}

// Permite seleccionar un elemento random del array. Referencia: https://stackoverflow.com/questions/5915096/get-a-random-item-from-a-javascript-array
Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}

async function AssignCardsToPlayer(player, cards, handSize){
    let hand = [];
    for (let i = 0; i < handSize; i++) {
        let random = cards.random();

        const index = cards.indexOf(random);

        cards.splice(index, 1);

        hand.push(random);
    }
    player.cards = hand;
    await player.save();
}

module.exports = {
    SetPlayersHands: SetPlayersHands,
  };