import {game} from "./game.js";



const triesCounter = {
  block: document.querySelector('.tries-counter'),

  update: function() {
    this.block.textContent = game.tries;
  }
}

for (let key in triesCounter) {
  if (typeof triesCounter[key] == 'function') {
    triesCounter[key] = triesCounter[key].bind(triesCounter);
  }
}

export {triesCounter};