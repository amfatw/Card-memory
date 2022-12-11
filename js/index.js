'use strict';

import {game} from "./modules/game.js";
import {cards} from "./modules/cards.js";
import {result} from "./modules/result.js";
import {music} from "./modules/music.js";
import {preloader} from "./modules/preloader.js";
import {modeSelect} from "./modules/modeSelect.js";
import {themeSwitcher} from "./modules/themeSwitcher.js";
import {triesCounter} from "./modules/triesCounter.js";
import {info} from "./modules/info.js";


preloader.show();
cards.addImagesLoadListener();

document.addEventListener('imagesLoaded', function(){
  preloader.hide();
  modeSelect.show();
});

cards.getImages()
.then(cards.prepareImages)
.then(cards.placeImages);

modeSelect.block.addEventListener('pointerdown', function(evt) {
  let target = evt.target;
  let mode = target.closest('.mode-select__option')
  if (!mode) return;

  let modeNumber = mode.dataset.mode;

  modeSelect.set(modeNumber);
  triesCounter.update();
  cards.updateAmmount();
  cards.shuffleCards();
  modeSelect.hide();
  game.show();
  cards.fixFirstViewLag(0.1);
  cards.showAll(0.5, game.pairs)
})

cards.cardsList.addEventListener('pointerdown', function(evt) {
  let target = evt.target;
  let card = target.closest('.card');

  if (!card || card.classList.contains('selected') || card.classList.contains('found')) return;
  
  card.classList.remove('flip-back');
  card.classList.add('flip');
  card.classList.add('selected');

  if (!game.firstSelectedCard) {
    game.firstSelectedCard = card;
    return;
  }
  
  game.secondSelectedCard = card;

  if (game.compare()) {
    game.markFoundCards();
    game.minusPair();
    game.clearSelection();
    
    if (game.checkPairs()) result.show('win');
    
    return;
  };
  
  if (!game.compare()) {
    game.flipSelected();
    game.clearSelection();
    game.minusTry();
    triesCounter.update();
    
    if (game.checkTries()) {
      result.show('lose');
    }
    
    return;
  };
});

document.querySelector('.new-cards-button').addEventListener('pointerdown', function() {
  preloader.show();
  cards.sortToStart();
  cards.getImages()
  .then(cards.prepareImages)
  .then(cards.placeImages);
  game.hide();
  result.hide();
});

document.querySelector('.new-game-button').addEventListener('pointerdown', function() {
  game.hide();
  result.hide();
  cards.sortToStart();
  cards.shuffleImages()
  .then(cards.prepareImages)
  .then(cards.placeImages);
  modeSelect.show();
})

info.link.addEventListener('pointerdown', function(evt) {
  evt.preventDefault();
  info.toggleBlockDisplay();
})

info.block.addEventListener('pointerdown', function(evt) {
  let target = evt.target;

  if (target.classList.contains('info') || target.classList.contains('info__close-button')) {
    info.toggleBlockDisplay();
  }
});

music.loadSong();

music.audio.addEventListener('ended', function() {
  music.nextSong();
  music.loadSong();
  music.play();
});

music.button.addEventListener('pointerdown', function() {
  let button = music.button;

  if (button.classList.contains('music-switcher--pause')) {
    button.classList.remove('music-switcher--pause');
    button.classList.add('music-switcher--play');
    music.play();
    return;
  }

  if (button.classList.contains('music-switcher--play')) {
    button.classList.remove('music-switcher--play');
    button.classList.add('music-switcher--pause');
    music.pause();
    return
  }
});

themeSwitcher.block.addEventListener('pointerdown', function() {
  themeSwitcher.switch()
})