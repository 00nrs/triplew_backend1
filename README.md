# tripleW_backend

Para correr la entrega 2, están son las instrucciones:
1. Crear las bases de datos: \
CREATE DATABASE triplew_development; \
CREATE DATABASE triplew_test; \
CREATE DATABASE triplew_production;

2. Hacer la migracion: \
yarn sequelize-cli db:migrate

3. Correr las seed: \
yarn sequelize-cli db:seed:all

(Si por alguna razón, deshace la seed, porfavor demigrar y volver a migrar para resetear los valores de id, antes de volver a correr la seed).

## Consideraciones para correr las rutas:
1. *game.js*: contiene el movimiento por el tablero y asignación de turnos. \
Al hacer get y post del url se debe tener en cuenta que exista el id de player (puede ser cualquier número de 1 a 4): Ejemplo: http://localhost:3000/game/4/throwDice \
Al hacer post del url se debe pasar como argumento un json del siguiente formato: \
{"dice": 4,
  "chosen_box": "Q4"
} \
La ruta `http://localhost:3000/game/assignTurns` se utiliza para asignar turnos a los jugadores en una partida. Esta función garantiza que los turnos se asignen correctamente y de manera equitativa entre los jugadores. La solicitud utiliza el método POST y requiere los siguientes parametros:
- `gameID`: El ID del juego al que se están asignando los turnos.
- `playerIDs`: Un array que contiene los IDs de los jugadores que participan en la partida. Ejemplo de solicitud:
```json
{
  "gameID": 1,
  "playerIDs": [1, 2, 3, 4]
}
```

2. *dealCards.js*: contiene la repartición de cartas al inicio de un juego. \
Al hacer get del url se debe tener en cuenta que exista el id de game (puede ser cualquier número de 1 a 2). Ejemplo: http://localhost:3000/dealCards/1 \
**IMPORTANTE:** En la lógica del juego este endpoint sólo se puede correr si se corrió la ruta en *rumors.js* antes para el mismo gameID, puesto que debe tener los valores de respuesta asignados para que funcione. De lo contrario, generará inconsitencias.

3. *users.js*: se pueden ser y crear usuarios. \
   * GET http://localhost:3000/users permite ver todos los usuarios existentes.
   * GET http://localhost:3000/users/:id muestra el usuario con el id que se está buscando. Debido a que hay nueve usuarios creados, probar con id's del 1 al 9.
   * POST http://localhost:3000/users permite crear un usuario. Recibe un JSON con el formato: \
     {
       "username":"nombre",
       "password": "contraseña1#",
       "email": "correo0@gmail.com"}
     \ La contraseña debe tener letra, número y caracter especial y el correo no puede repetirse.


  4. *characters.js*: se pueden ver todos los personajes del juego junto con su color y habilidad. La ruta es GET http://localhost:3000/characters
  5. *rooms.js*: se pueden ver todas las habitaciones del tablero. La ruta es GET http://localhost:3000/rooms
  6. *weapons.js*: se pueden ver todas las armas disponibles. La ruta es GET http://localhost:3000/weapons
  7. *rumors.js*: permite ver las respuestas correctas de cierta partida (lo cual será sacado para la siguiente entrega, ya que se hizo con el fin de comprobar la correcta asignación de llaves). Además contiene la lógica de realizar rumor y refutar rumor. \
     * GET http://localhost:3000/rumors/:gameID/correctKeys muestra la respuesta correcta de la partida con id :gameID. Sólo hay 2 juegos creados, por lo tanto, se puede probar con id 1 y 2 solamente. Es importante añadir que la función que crea las llaves correctas se llama dentro de la lógica de la ruta, por lo que si se realiza la búsqueda nuevamente para un mismo id, la respuesta cambiará.
     * GET http://localhost:3000/rumors/:playerID/rumor muestra un rumor hecho por el jugador con id :playerID. Debido a que solo hay 9 jugadores, se puede probar con id's del 1 al 9.
     * GET http://localhost:3000/rumors/:gameID/:playerID muestra la refutación de un rumor hecho por el jugador con id :playerID en la partida :gameID. **IMPORTANTE**: sólo el juego con id:2 está creado con seis jugadores participantes, por lo tanto, se debe probar con :gameID = 2. También los id de los jugadores que corresponden son del 1 al 6.
