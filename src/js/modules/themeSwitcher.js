const themeSwitcher = {
  block: document.querySelector('.theme-switcher'),

  switch: function() {
    document.body.classList.toggle('dark-theme')
  }
}

export {themeSwitcher};