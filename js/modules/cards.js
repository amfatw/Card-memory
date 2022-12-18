import {game} from './game.js';

const cards = {
  images: [],
  preparedImages: [],
  cards: Array.from(document.querySelectorAll('.card')),
  cardsList: document.querySelector('.cards-list'),
  imagesBlocks: document.querySelectorAll('.card__front'),

  getImages: async function(imagesNeeded = 8) {
    let response = await fetch('https://api.waifu.im/search/?many=true&gif=false&orientation=PORTRAIT', {
      headers: {
        'Accept-Version': 'v4'
      }
    });
    
    if (!response.ok) {
      alert("Ошибка HTTP: " + response.status);
    }

    let json = await response.json();
    let images = json.images;
    let filteredImages = images.filter(image => image.extension === ".jpeg" || image.extension === ".jpg");
    let sortedImages = filteredImages.sort((a, b) => a.height - b.height);
    let slicedArr = sortedImages.slice(0, imagesNeeded);
    
    this.images = slicedArr.length >= imagesNeeded ? slicedArr : this.getImages();
  },
  prepareImages: async function() {
    let newArr = [];
    
    for (let image of this.images) {
      newArr.push(image);
      newArr.push(image);
    }
    
    this.preparedImages = newArr;
  },
  placeImages: async function() {
    let i = 0;
    for (let card of this.cards) {
      let cardImg = card.querySelector('.card__front');
      cardImg.src = this.preparedImages[i].url;
      i++;
    }
  },
  shuffleImages: async function() {
    let arr = Array.from(this.images)
    
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    
    this.images = arr;
  },
  shuffleCards: function() {
    let cards = Array.from(this.cards);
    let filtredCards = cards.filter(card => card.dataset.number <= game.pairs)

    for (let i = filtredCards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));

      [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    this.cardsList.append(...cards);
  },
  sortToStart: function() {
    let cards = this.cards;
    
    for (let card of cards) {
      card.classList.remove('flip');
      card.classList.remove('flip-back');
    };
    
    let sortedCards = cards.sort((a, b) => a.dataset.number > b.dataset.number ? 1 : -1);

    this.cardsList.append(...sortedCards);
  },
  showAll: function(delay = 0.5, pairs = 5) {
    for (let card of this.cards) {
      card.classList.add('found');
    }
  
    setTimeout(() => {
      for (let card of this.cards) {
        card.classList.add('flip');
      }
      
      setTimeout(() => {
        for (let card of this.cards) {
          card.classList.remove('flip');
          card.classList.add('flip-back');
          card.classList.remove('found');
          
          setTimeout(() => {
            card.classList.remove('flip-back');
          }, 1000)
        }
      }, Math.ceil(pairs / 2) * 1000);
    }, delay * 1000);
  },
  updateAmmount: function() {
    game.block.classList.remove('cards-6', 'cards-10', 'cards-16');
    game.block.classList.add(`cards-${game.pairs * 2}`)
  },
  addImagesLoadListener: function() {
    let images = this.imagesBlocks;
    let counter = 0;
    
    for (let image of images) {
      image.onload = function() {
        counter++;
        
        if (counter == images.length) {
          let event = new Event('imagesLoaded', {bubbles: true});
          
          cards.cardsList.dispatchEvent(event);
  
          counter = 0;
        }
      }
    }
  },
  fixFirstViewLag: function(delay = 0.5) {
    let images = this.imagesBlocks;
    for (let image of images) {
      image.style.transform = 'rotateY(0deg)'
      setTimeout(() => {
        image.style.transform = 'rotateY(180deg)'
      }, delay * 1000);
    };
  },
};

for (let key in cards) {
  if (typeof cards[key] == 'function') {
    cards[key] = cards[key].bind(cards);
  }
};

export {cards};