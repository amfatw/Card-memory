let game = {
  pairs: undefined,
  tries: undefined,
  firstSelectedCard: undefined,
  secondSelectedCard: undefined,
  block: document.querySelector('.game'),
  
  show: function() {
    this.block.classList.add('display');
  },
  
  hide: function() {
    this.block.classList.remove('display');
  },
  
  compare: function() {
    return this.firstSelectedCard.dataset.number == this.secondSelectedCard.dataset.number;
  },

  minusTry: function() {
    this.tries--;
  },

  minusPair: function() {
    this.pairs--;
  },

  checkTries: function() {
    return this.tries <= 0;
  },

  checkPairs: function() {  
    return this.pairs <= 0;
  },

  markFoundCards: function() {
    game.firstSelectedCard.classList.add('found');
    game.secondSelectedCard.classList.add('found');
  },

  flipSelected: function() {
    let firstCard = this.firstSelectedCard;
    let secondCard = this.secondSelectedCard;

    setTimeout(() => {
      firstCard.classList.remove('flip');
      firstCard.classList.add('flip-back');
      secondCard.classList.remove('flip');
      secondCard.classList.add('flip-back');
    }, 1500);
  },

  clearSelection: function() {
    this.firstSelectedCard.classList.remove('selected');
    this.secondSelectedCard.classList.remove('selected');
    this.firstSelectedCard = undefined;
    this.secondSelectedCard = undefined;
  },
};

for (let key in game) {
  if (typeof game[key] == 'function') {
    game[key] = game[key].bind(game);
  }
}

export {game};