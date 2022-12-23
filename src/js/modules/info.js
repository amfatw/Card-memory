const info = {
  link: document.querySelector('.info-link'),
  block: document.querySelector('.info'),

  toggleBlockDisplay: function() {
    this.block.classList.toggle('display');
  }
}

for (let key in info) {
  if (typeof info[key] == 'function') {
    info[key] = info[key].bind(info);
  }
}

export {info};