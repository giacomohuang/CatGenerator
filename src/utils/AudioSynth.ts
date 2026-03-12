export type VoiceType = 'classic' | 'kitten' | 'trill' | 'yowl' | 'chirp';

export function playRandomMeow(muted: boolean, voice: VoiceType = 'classic') {
  if (muted) return;

  const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContext) return;

  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  let baseFreq = 400;
  let duration = 0.5;

  osc.type = Math.random() > 0.5 ? 'square' : 'sawtooth';

  if (voice === 'kitten') {
    baseFreq = 700 + Math.random() * 300;
    duration = 0.3 + Math.random() * 0.2;
    osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, ctx.currentTime + duration * 0.2);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.8, ctx.currentTime + duration);
  } else if (voice === 'chirp') {
    baseFreq = 800 + Math.random() * 200;
    duration = 0.15 + Math.random() * 0.1;
    osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(baseFreq * 1.2, ctx.currentTime + duration);
  } else if (voice === 'yowl') {
    baseFreq = 300 + Math.random() * 200;
    duration = 1.0 + Math.random() * 0.8;
    osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, ctx.currentTime + duration * 0.3);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.9, ctx.currentTime + duration * 0.7);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.5, ctx.currentTime + duration);
  } else if (voice === 'trill') {
    baseFreq = 500 + Math.random() * 200;
    duration = 0.6 + Math.random() * 0.3;
    osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    
    // Create LFO for trill effect
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.value = 25 + Math.random() * 10;
    lfoGain.gain.value = 50;
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    lfo.start();
    lfo.stop(ctx.currentTime + duration);
    
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.2, ctx.currentTime + duration * 0.5);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.8, ctx.currentTime + duration);
  } else {
    // classic
    baseFreq = 400 + Math.random() * 200;
    duration = 0.4 + Math.random() * 0.3;
    osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, ctx.currentTime + duration * 0.2);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.8, ctx.currentTime + duration);
  }

  filter.type = 'bandpass';
  filter.frequency.value = baseFreq * 1.5;
  filter.Q.value = 1.5;

  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + duration * 0.1);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + duration);

  // Clean up context after playing
  setTimeout(() => {
    if (ctx.state !== 'closed') {
      ctx.close();
    }
  }, duration * 1000 + 100);
}
