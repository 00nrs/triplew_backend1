

function ThrowDice(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
  }

function possible_movements(jugador, dice, boxes, positions){
  let possible_movements = [jugador.box];
  let enabled_boxes = [];
  boxes.forEach((box) => {
    if (box["roomID"] == null || box["roomID"] != jugador.lastRoom) {
      enabled_boxes.push(box["coordinate"]);
    }
  });
  let i = 1;
  while (i <= dice){
    possible_movements.forEach((box)=> consecutive_boxes(box, possible_movements, enabled_boxes))
    i++
  }
  positions.forEach((position) => {
    possible_movements = possible_movements.filter(box => box !== position);
  });
  possible_movements = possible_movements.filter(box => box !== jugador.box);
  return possible_movements;
}

function consecutive_boxes(box, possible_movements, enabled_boxes){
    //Agrega las cassillas consecutivas disponibles a los posibles movimientos
  let consecutive_boxes = [];
  let coordinate_x = box[0];
  let coordinate_y = parseInt(box.substr(1,box.length));
  let move_up = coordinate_x + (coordinate_y-1).toString();
  let move_down = coordinate_x + (coordinate_y+1).toString();
  let move_right = String.fromCharCode(coordinate_x.charCodeAt(0) + 1) + coordinate_y;
  let move_left = String.fromCharCode(coordinate_x.charCodeAt(0) - 1) + coordinate_y;
  if (enabled_boxes.includes(move_up) & !possible_movements.includes(move_up)){
    possible_movements.push(move_up);
  }
  if (enabled_boxes.includes(move_down) & !possible_movements.includes(move_down)){
    possible_movements.push(move_down);
  }
  if (enabled_boxes.includes(move_left) & !possible_movements.includes(move_left)){
    possible_movements.push(move_left);
  }
  if (enabled_boxes.includes(move_right) & !possible_movements.includes(move_right)){
    possible_movements.push(move_right);
  }

  return consecutive_boxes;
}

function check_movement(jugador, dice, chosen_move, boxes, positions){
    let movements = possible_movements(jugador, dice, boxes, positions);
    if (movements.includes(chosen_move)){
        return true;
    }
    else{
        return false;
    }
}

module.exports = {
    ThrowDice: ThrowDice,
    possible_movements: possible_movements,
    check_movement: check_movement
  };