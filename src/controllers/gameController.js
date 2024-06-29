const { Game, Player, Character, Weapon, Room, sequelize } = require('../models');

async function startNewGame(hostID) {
    try {
        const game = await Game.create({
            hostID: hostID,
            currentTurn: 1
        });
        return game;
    } catch (error) {
        console.error('Error al iniciar un nuevo juego:', error);
        throw new Error('No se pudo iniciar un nuevo juego');
    }
}


async function assignTurns(gameID, playerIDs) {
    try {
        const totalPlayers = playerIDs.length;
        const shuffledPlayerIDs = playerIDs.sort(() => 0.5 - Math.random());

        let currentPlayerIndex = 0;

        for (const playerID of shuffledPlayerIDs) {
            const turnNumber = (currentPlayerIndex % totalPlayers) + 1;
            await Player.update({ turnNumber }, {
                where: { id: playerID, gameID: gameID }
            });
            currentPlayerIndex++;
        }

        await Game.update({ currentTurn: 1 }, {
            where: { id: gameID }
        });

        return totalPlayers;
    } catch (error) {
        console.error('Error al asignar turnos:', error);
        throw new Error('No se pudieron asignar los turnos');
    }
}

async function getWinner(gameID) {
    try {
        const game = await Game.findOne({ where: { id: gameID } });
        if (!game) {
            throw new Error('Juego no encontrado');
        }

        const winnerID = game.winner;
        if (!winnerID) {
            throw new Error('No hay ganador');
        }

        const winner = await Player.findOne({ where: { id: winnerID } });
        if (!winner) {
            throw new Error('Jugador ganador no encontrado');
        }

        return winner.name;
    } catch (error) {
        throw new Error('No se pudo obtener el ganador');
    }

}

async function GetCorrectKeys(gameID){
    try {
        const game = await Game.findOne({ where: { id: gameID } });
        if (!game) {
            throw new Error('Juego no encontrado');
        }

        const correctKeys = game.correctKeys;
        const character = await Character.findOne({ where: { id: correctKeys.character } });
        const weapon = await Weapon.findOne({ where: { id: correctKeys.weapon } });
        const room = await Room.findOne({ where: { id: correctKeys.room } });


        return {character: character, weapon: weapon, room: room};
    } catch (error) {
        console.error('Error al obtener las respuestas correctas:', error);
        throw new Error('No se pudo obtener las respuestas correctas');
    }
}

async function nextTurn(gameID) {
    try {
        const game = await Game.findByPk(gameID);
        const players = await Player.findAll({ where: { gameID: gameID } });
        const totalPlayers = players.length;

        let nextTurn = (game.currentTurn % totalPlayers) + 1;

        await Game.update({ currentTurn: nextTurn }, { where: { id: gameID } });
        return nextTurn;
    } catch (error) {
        console.error('Error al avanzar al siguiente turno:', error);
        throw new Error('No se pudo avanzar al siguiente turno');
    }
}


async function DeleteGame(gameID) {
    const transaction = await sequelize.transaction();
    try {
      // Find the game with associated players and event (if it exists)
      const game = await Game.findByPk(gameID, {
        include: [{ model: Player }, { model: Event, required: false }],
        transaction,
      });
  
      if (!game) {
        throw new Error('Juego no encontrado');
      }
  
      // Delete associated players
      for (const player of game.Players) {
        await player.destroy({ transaction });
      }
  
      // Delete the associated event (if it exists)
      if (game.Event) {
        await game.Event.destroy({ transaction });
      }
  
      // Delete the game
      await game.destroy({ transaction });
  
      await transaction.commit();
      return { success: true, message: 'Juego eliminado' };
    } catch (error) {
      await transaction.rollback();
      console.error('Error al eliminar el juego:', error);
      throw new Error('No se pudo eliminar el juego');
    }
  }

module.exports = {
    startNewGame,
    assignTurns, 
    getWinner,
    GetCorrectKeys,
    assignTurns,
    nextTurn,
    DeleteGame,
};
