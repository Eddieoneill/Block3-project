export default function playButtonHoverSound() {
  const audio = new Audio("../public/ButtonHoverSound.mp3");
  audio.volume = 0.03;
  audio.play();
}
