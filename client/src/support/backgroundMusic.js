const audio = new Audio("/BackgroundMusic.mp3");
audio.volume = 0.002;
audio.loop = true;

function playBackgroundMusic() {
  audio.play();
}

function stopBackgroundMusic() {
  audio.pause();
}

export { playBackgroundMusic, stopBackgroundMusic, audio };
