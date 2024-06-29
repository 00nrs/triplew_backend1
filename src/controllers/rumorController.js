const { Game, Character, Room, Weapon, Player, Box, ClueSheet } = require('../models');
const { Sequelize } = require('sequelize');

async function ChooseCorrectKeys(gameID) {
    try {
        const character = await Character.findOne({ order: [Sequelize.fn('RANDOM')] });
        const room = await Room.findOne({ order: [Sequelize.fn('RANDOM')] });
        const weapon = await Weapon.findOne({ order: [Sequelize.fn('RANDOM')] });

        const json = {
            character: character.id,
            weapon: weapon.id,
            room: room.id,
        };

        await Game.update({ correctKeys: json }, { where: { id: gameID } });

        console.log('Se eligieron las respuestas correctas con éxito.', json);
    } catch (error) {
        console.error('Error al seleccionar IDs aleatorios:', error);
        throw error;
    }
}

async function StartRumor(playerID, CharacterID, WeaponID) {
    const player = await Player.findOne({ where: { id: playerID } });
    const box = await Box.findOne({ where: { coordinate: player.box } });

    if (!box || !box.roomID) {
        console.log('El jugador no está en ninguna habitación y no puede realizar un rumor');
        return { error: 'El jugador no está en ninguna habitación y no puede realizar un rumor' };
    }

    const roomID = box.roomID;
    const json = {
        action: 'rumor',
        character: CharacterID,
        weapon: WeaponID,
        room: roomID,
    };

    await gameController.nextTurn(player.gameID);

    const refuteInfo = await RefuteRumor(player.gameID, playerID, CharacterID, WeaponID, roomID);

    return { rumor: json, refuteInfo: refuteInfo };
}

async function RefuteRumor(gameID, playerID, CharacterID, WeaponID, RoomID) {
    const game = await Game.findOne({ where: { id: gameID } });
    const players = await Player.findAll({ where: { gameID: gameID } });

    const currentTurn = game.currentTurn;
    let refuteTurn = (currentTurn % players.length) + 1;

    let refutingPlayer = await Player.findOne({ where: { gameID: gameID, turnNumber: refuteTurn } });
    console.log("Jugador a la izquierda es:", refutingPlayer.name);
    console.log("ID de la hoja de pistas del jugador a la izquierda:", refutingPlayer.clueSheetID);

    const refutingPlayerCards = await ClueSheet.findAll({ where: { id: refutingPlayer.clueSheetID } });
    const validCards = refutingPlayerCards.filter(card => {
        return card.content === CharacterID || card.content === RoomID || card.content === WeaponID;
    });

    let json = {};

    if (validCards.length > 0) {
        console.log('El jugador a la izquierda puede refutar el rumor.');
        validCards.forEach(card => {
            if (card.content === CharacterID) {
                console.log('El personaje fue refutado.');
                json = {
                    estado: 'refutado',
                    personaje: CharacterID,
                };
            } else if (card.content === RoomID) {
                console.log('La habitación fue refutada.');
                json = {
                    estado: 'refutado',
                    habitación: RoomID,
                };
            } else if (card.content === WeaponID) {
                console.log('El arma fue refutada.');
                json = {
                    estado: 'refutado',
                    arma: WeaponID,
                };
            }
        });
        return {
            estado: 'puede refutar',
            refutingPlayer: refutingPlayer.id,
            validCards: validCards
        };
    } else {
        console.log('El jugador a la izquierda no puede refutar el rumor.');
        const nextTurn = await gameController.nextTurn(gameID);
        return {
            estado: 'no puede refutar',
            nextTurn: nextTurn
        };
    }
}

async function HandleRumor(playerID, characterID, weaponID) {
    const rumorResult = await StartRumor(playerID, characterID, weaponID);
    if (rumorResult) {
        console.log('Rumor realizado con éxito:', rumorResult);
        return { success: true, message: 'Rumor realizado con éxito', rumor: rumorResult };
    } else {
        return { success: false, message: 'No se pudo realizar el rumor' };
    }
}

async function checkPlayerRoom(playerID) {
    try {
        const player = await Player.findOne({ where: { id: playerID } });
        if (!player) {
            throw new Error(`No se encontró el jugador con id: ${playerID}`);
        }

        const box = await Box.findOne({ where: { coordinate: player.box } });
        if (!box) {
            throw new Error(`No se encontró la casilla con coordenada: ${player.box}`);
        }

        console.log(`Box type for player ${playerID}: ${box.type}`); // Log para verificar el tipo de casilla
        if (box.type === 'room') {
            return { success: true, message: 'El jugador está en una habitación.' };
        }

        return { success: false, message: 'El jugador no está en una habitación.' };
    } catch (error) {
        console.error('Error al verificar la habitación del jugador:', error);
        throw error;
    }
}

module.exports = {
    ChooseCorrectKeys: ChooseCorrectKeys,
    StartRumor: StartRumor,
    RefuteRumor: RefuteRumor,
    HandleRumor: HandleRumor,
    checkPlayerRoom: checkPlayerRoom
};
