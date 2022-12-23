const preloader = {
  preloaderBlock: document.querySelector('.preloader'),

  show: function() {
    this.preloaderBlock.classList.add('display');
  },
  hide: function() {
    this.preloaderBlock.classList.remove('display');
  }
}

for (let key in preloader) {
  if (typeof preloader[key] == 'function') {
    preloader[key] = preloader[key].bind(preloader);
  }
}

export {preloader};