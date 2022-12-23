import { cards } from './cards.js';

const result = {
  block: document.querySelector('.game-result'),

  show: function(string) {
    for (let card of cards.cards) {
      card.classList.add('found');
    }

    setTimeout(() => {
      this.block.classList.add(`${string}`);
      this.block.classList.add('display');

      for (let card of cards.cards) {
        card.classList.remove('found');
      }
    }, 2000);
  },

  hide: function() {
    this.block.classList.remove('display', 'win', 'lose');
  },
}

for (let key in result) {
  if (typeof result[key] == 'function') {
    result[key] = result[key].bind(result);
  }
}

export {result};