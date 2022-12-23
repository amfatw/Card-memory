import {game} from "./game.js";



const modeSelect = {
  block: document.querySelector('.mode-select'),

  show: function() {
    this.block.classList.add('display');
  },
  hide: function() {
    this.block.classList.remove('display');
  },
  set: function(number) {
    switch(number) {
      case '1':
        game.pairs = 3;
        game.tries = 2;
        break;
      case '2':
        game.pairs = 5;
        game.tries = 5;
        break;
      case '3':
        game.pairs = 8;
        game.tries = 8;
        break;
    }
  }
}

for (let key in modeSelect) {
  if (typeof modeSelect[key] == 'function') {
    modeSelect[key] = modeSelect[key].bind(modeSelect);
  }
}

export {modeSelect};