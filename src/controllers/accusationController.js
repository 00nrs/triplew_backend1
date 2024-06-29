const { Game, Player, Box, Character, Weapon, Room } = require('../models');

async function isEnableToAccuse(playerID) {
    try{
        const player = await Player.findOne({ where: { id: playerID} });
        const box = await Box.findOne({ where: { coordinate: player.box } });

        //|console.log(`Player id: ${playerID} Posicion ${player.box} tipo ${box.type}`)

        if(box.type === 'center'){
            return { success: true, message: 'Puedes realizar acusación' };
        }
        return { success: false, message: 'Lo siento, no puedes realizar acusación' };
    }
    catch(error){
        console.error('Error al verificar si el jugador puede acusar:', error);
    }
}

async function Accusation(gameID, playerID, character, weapon, room) {
    try {

        const sospechoso =  await Character.findOne({ where: { name: character } });
        const arma = await Weapon.findOne({ where: { name: weapon } });
        const lugar = await Room.findOne({ where: { name: room } });

        if (!sospechoso || !arma || !lugar) {
            ctx.status = 400;
            ctx.body = { success: false, message: 'Datos inválidos para la acusación.' };
            return;
        }

        const characterID = sospechoso.id;
        const weaponID = arma.id;
        const roomID = lugar.id;


        // Revisa si las respuestas correctas están disponibles en el juego
        const game = await Game.findOne({ where: { id: gameID } });
        if (!game || !game.correctKeys) {
            throw new Error('No se han establecido las respuestas correctas para este juego.');
        }

        // verificar si el jugador tiene el derecho de hacer una acusación
        const player = await Player.findOne({ where: { id: playerID, gameID: gameID } });
        if (!player) {
            throw new Error('El jugador no está en la partida.');
        }

        // compara la acusación del jugador con las respuestas correctas
        const correctKeys = game.correctKeys;

        console.log(`Personaje: ${characterID} Arma: ${weaponID} Lugar: ${roomID}`)
        console.log(`Personaje Coorecto: ${correctKeys.character} Arma correcta: ${correctKeys.weapon} Lugar correcto: ${correctKeys.room}`)

        if (correctKeys.character === characterID && correctKeys.weapon === weaponID && correctKeys.room === roomID) {
            // La acusación es correcta, el jugador gana el juego
            
            await Game.update({ winner: playerID }, { where: { id: gameID } });
            return { success: true, message: 'La acusación es correcta' };
        } else {
            // La acusación es incorrecta, el jugador queda eliminado del juego
            // Queda por revisar implementacion de un booleano eliminated en player
            //await Player.update({ eliminated: true }, { where: { id: playerID } });
            return { success: false, message: `La acusación de ${player.name} es incorrecta. Queda eliminad@ del juego.` };
        }
    } catch (error) {
        console.error('Error al procesar la acusación:', error);
        throw error;
    }
}

module.exports = {
    Accusation,
    isEnableToAccuse
};