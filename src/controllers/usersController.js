const { User, Player, sequelize } = require('../models');

async function DeleteUser(userID) {
    const transaction = await sequelize.transaction();

    try {
        const user = await User.findByPk(userID, {
            include: { model: Player, required: false },
            transaction,
        });

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // Eliminar los registros relacionados en Player
        if (user.Players && user.Players.length > 0) {
            await Player.destroy({ where: { userID: user.id }, transaction });
        }

        // Eliminar el usuario
        await user.destroy({ transaction });

        // Commit de la transacción si todo ha ido bien
        await transaction.commit();

        return { message: 'Usuario eliminado exitosamente' }; // Indicar que la eliminación fue exitosa
    } catch (error) {
        // Rollback de la transacción en caso de error
        await transaction.rollback();

        console.error('Error al eliminar usuario:', error);
        throw new Error('No se pudo eliminar el usuario');
    }
}

module.exports = { DeleteUser };

