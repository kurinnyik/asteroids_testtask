const audioContext = new (window.AudioContext || window.webkitAudioContext);
let masterGainNode = audioContext.createGain();
masterGainNode.connect(audioContext.destination);
masterGainNode.gain.value = 0.001;

function playSound(freq1, freq2, duration = 100) { // two notes frequencies and optional duration of them

  const osc1 = audioContext.createOscillator();
  const osc2 = audioContext.createOscillator();

  osc1.type = 'square';
  osc2.type = 'sawtooth';
  osc1.frequency.value = freq1;
  osc2.frequency.value = freq2;
  osc1.connect(masterGainNode);
  osc2.connect(masterGainNode);
  osc1.start(0);
  osc2.start(0);

  setTimeout(() => {
    osc1.stop();
    osc2.stop();
  }, duration)
}

export default playSound;