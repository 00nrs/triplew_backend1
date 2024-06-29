const { Game, Player, Character, Weapon, Room, sequelize, Event } = require('../models');

async function getMessage(gameID){
    try {
        const game = await Game.findOne({
            where: {
                id: gameID
            }
        });
        const event = await Event.findOne({
            where: {
                id: game.eventID
            }
        });
        return event.message;
    } catch (error) {
        console.error('Error al obtener el mensaje compartido:', error);
        throw new Error('No se pudo obtener el mensaje compartido');
    }
};

async function setMessage(gameID, message){
    try {
        const game = await Game.findByPk(gameID);
        await Event.update({ message: message }, { where: { id: game.eventID } });
        return message;
    } catch (error) {
        console.error('Error al actualizar el mensaje compartido:', error);
        throw new Error('No se pudo actualizar el mensaje compartido');
    }
};


module.exports = {
    getMessage,
    setMessage
};