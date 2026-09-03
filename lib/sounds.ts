/** Lagani veseli "pop" ton preko Web Audio API-ja — bez eksternih fajlova. */
export function playPop() {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = "sine";
    osc.frequency.setValueAtTime(720, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(380, ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.22, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);

    // Zatvori kontekst kad ton završi (sprečava curenje)
    osc.onended = () => {
      void ctx.close();
    };
  } catch {
    // Tiho ignoriši — pregledač možda još nije dozvolio audio
  }
}
