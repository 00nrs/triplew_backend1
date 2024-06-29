async function generateGameCode(gameCodes){

    let randomCode = (Math.random() + 1).toString(36).substring(7);
    while (gameCodes.includes(randomCode)){
        randomCode = (Math.random() + 1).toString(36).substring(7);
    }

    return randomCode;
  }

  async function AddPlayerToGame(playerID, game){
    let players = [];
    if (game.players){
        for (let player of game.players){
            players.push(player);
        }
    }
    players.push(playerID);
    game.players = players;
    await game.save();
    return game;
}

function CheckMinNumberOfPlayers(game){
    if (game.players.length >= 2){
        return true;
    }
    return false
}

function CheckMaxNumberOfPlayers(game){
    if (game.players.length < 6){
        return true;
    }
    return false
}

function CheckThatEveryPlayerHasCharacter(players){
    for (let player of players){
        if (player.characterID == null){
            return false
        }
    }
    return true
}

module.exports = {
    generateGameCode, AddPlayerToGame, CheckMinNumberOfPlayers,
    CheckMaxNumberOfPlayers, CheckThatEveryPlayerHasCharacter,
};