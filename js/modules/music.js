let music = {
  songs: ['Chirrrex-China.mp3', 'ColorfulCat-Rurikon.mp3', 'ColorfulCat-Love.mp3'],
  path: '../music/',
  songIndex: 0,
  audio: document.querySelector('audio'),
  button: document.querySelector('.music-switcher'),

  loadSong: function(index = this.songIndex) {
    let song = this.songs[index]
    this.audio.src = `${this.path + song}`
  },

  play: function() {
    this.audio.play();
  },

  pause: function() {
    this.audio.pause();
  },

  nextSong: function() {
    this.songIndex++;
    if (this.songIndex >= this.songs.length) {
      this.songIndex = 0;
    }
  },
}



for (let key in music) {
  if (typeof music[key] == 'function') {
    music[key] = music[key].bind(music);
  }
};

export {music};