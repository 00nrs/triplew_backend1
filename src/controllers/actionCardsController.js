function GetRandomCard(cards) {
    const card = cards[Math.floor(Math.random()*cards.length)];
    return card;
  }

  module.exports = {
    GetRandomCard,
  };