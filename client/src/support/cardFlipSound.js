export default function playCardFlipSound() {
  const audio = new Audio("/CardFlipSound.mp3");
  audio.volume = 0.1;
  audio.play();
}
