import React, { useState, useEffect } from 'react';
import { Sparkles, Play, RotateCcw, Volume2, Info } from 'lucide-react';

interface WRTProps {
  initialWord?: string;
}

export const WordRepetitionTool: React.FC<WRTProps> = ({ initialWord = 'Fracasso' }) => {
  const [word, setWord] = useState(initialWord);
  const [secondsLeft, setSecondsLeft] = useState(35);
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [repetitionsCount, setRepetitionsCount] = useState(0);
  const [pulseScale, setPulseScale] = useState(false);

  const predefinedWords = [
    'Fracasso',
    'Inútil',
    'Burro',
    'Incapaz',
    'Defeituoso',
    'Fardo',
    'Rejeitado',
    'Atrasado'
  ];

  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(420, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } catch {
      // Audio fallback
    }
  };

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    let beatTimer: ReturnType<typeof setInterval>;

    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            setIsRunning(false);
            return 0;
          }
          return s - 1;
        });
      }, 1000);

      beatTimer = setInterval(() => {
        setPulseScale((p) => !p);
        setRepetitionsCount((c) => c + 1);
        playClickSound();
      }, 650);
    }

    return () => {
      clearInterval(timer);
      clearInterval(beatTimer);
    };
  }, [isRunning, secondsLeft, soundEnabled]);

  const handleStart = () => {
    if (!word.trim()) return;
    setSecondsLeft(35);
    setRepetitionsCount(0);
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(35);
    setRepetitionsCount(0);
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-[#ce57df]/30 shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
      <div className="pb-4 border-b border-[#ce57df]/20 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-tech text-[#ec9eff] mb-1">
            <span>TÉCNICA WRT (WORD REPETITION) // 4ª ONDA</span>
            <span aria-hidden="true" className="text-slate-600">/</span>
            <span>DESFUSÃO EM ALTA VELOCIDADE</span>
          </div>
          <h3 className="font-display text-lg font-bold text-white uppercase">
            Desliteralizador de Palavras Autocríticas
          </h3>
        </div>

        <button
          type="button"
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`p-2 rounded-xl text-xs font-tech transition-all flex items-center gap-1.5 border border-[#82e5ff]/20 ${
            soundEnabled ? 'text-[#02bbff] bg-[#130169]/80 border-[#02bbff]/40' : 'text-[#b4c0d9] hover:text-white'
          }`}
          title="Metrônomo sonoro"
        >
          <Volume2 className="w-4 h-4" />
          <span className="hidden sm:inline">{soundEnabled ? 'Metrônomo ON' : 'Mudo'}</span>
        </button>
      </div>

      {/* Explanatory callout */}
      <div className="my-4 p-3.5 bg-[#130169]/40 rounded-xl border border-[#02bbff]/20 text-xs text-[#b4c0d9] flex items-start gap-2.5">
        <Info className="w-4 h-4 text-[#02bbff] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-white font-tech uppercase">Como essa porcaria funciona:</strong> Quando você repete um insulto doloroso bem rápido em voz alta por 35 segundos, o cérebro satura a rede semântica. A palavra perde o verniz do drama e volta a ser o que de fato sempre foi: um barulho estranho na sua laringe.
        </p>
      </div>

      {/* Input */}
      <div className="space-y-3">
        <label className="block text-xs font-tech text-[#82e5ff] uppercase font-bold">
          Palavra ou rótulo que sua mente está usando pra te diminuir:
        </label>
        
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            disabled={isRunning}
            placeholder="Ex: Fracasso, Inútil, Burro..."
            className="flex-1 px-4 py-2.5 text-sm bg-[#0f142a] text-white border border-[#82e5ff]/30 rounded-xl focus:outline-none focus:border-[#02bbff]"
          />
          {isRunning ? (
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2.5 bg-[#422774] hover:bg-[#6b05b2] text-white text-xs font-tech font-bold rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap border border-[#ce57df]/40"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Parar</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleStart}
              disabled={!word.trim()}
              className="px-5 py-2.5 bg-gradient-to-r from-[#b104dc] to-[#b104dc] hover:brightness-110 text-white text-xs font-tech font-bold rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap border border-[#ce57df] shadow-[0_0_15px_rgba(206,87,223,0.3)]"
            >
              <Play className="w-4 h-4" />
              <span>Iniciar 35s</span>
            </button>
          )}
        </div>

        {/* Suggestion tags */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs font-tech text-[#b4c0d9] mr-1">Gatilhos comuns:</span>
          {predefinedWords.map((item) => (
            <button
              key={item}
              type="button"
              disabled={isRunning}
              onClick={() => setWord(item)}
              className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-all ${
                word.toLowerCase() === item.toLowerCase()
                  ? 'bg-[#130169] border-[#02bbff] text-[#82e5ff] font-bold shadow-[0_0_8px_rgba(2,187,255,0.3)]'
                  : 'bg-[#0f142a] border-[#82e5ff]/20 text-[#b4c0d9] hover:bg-[#130169]/40'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Main active pulsing card */}
      <div className="mt-6 p-6 rounded-2xl bg-[#0f142a]/90 border border-[#ce57df]/30 flex flex-col items-center justify-center text-center min-h-[190px]">
        {isRunning ? (
          <div className="flex flex-col items-center">
            <span className="font-tech text-xs uppercase tracking-wider text-[#ec9eff] font-bold mb-2">
              Fale em voz alta e rápida sem parar:
            </span>
            <div
              className={`font-display text-4xl sm:text-5xl font-extrabold uppercase transition-all duration-150 transform ${
                pulseScale ? 'scale-110 text-[#02bbff] glow-cyan' : 'scale-100 text-white'
              }`}
            >
              &ldquo;{word}&rdquo;
            </div>
            <div className="mt-4 flex items-center gap-4 text-xs font-tech text-[#b4c0d9]">
              <div>
                <span>Cronômetro: </span>
                <strong className="text-white text-base font-bold tabular-nums glow-magenta">
                  {secondsLeft}s
                </strong>
              </div>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <div>
                <span>Repetições: </span>
                <strong className="text-[#82e5ff] text-base font-bold tabular-nums">
                  ~{repetitionsCount}
                </strong>
              </div>
            </div>
            <p className="text-xs text-[#b4c0d9] mt-2 max-w-sm font-signature text-sm">
              Note como a palavra começa a parecer um trava-língua alienígena e perde o sentido trágico.
            </p>
          </div>
        ) : secondsLeft === 0 ? (
          <div className="flex flex-col items-center space-y-2">
            <Sparkles className="w-8 h-8 text-[#02bbff] mb-1 animate-pulse" />
            <h4 className="font-display text-base font-bold text-white uppercase">
              Ciclo Completo!
            </h4>
            <p className="text-xs text-[#b4c0d9] max-w-md leading-relaxed">
              O que sobrou da palavra &ldquo;{word}&rdquo;? Ela ainda é uma sentença de prisão eterna ou virou só um som engraçado que a sua boca consegue emitir?
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-2 px-4 py-2 text-xs font-tech font-bold text-[#82e5ff] bg-[#130169] border border-[#02bbff]/40 rounded-xl hover:bg-[#02295b] transition-all"
            >
              Testar outra palavra
            </button>
          </div>
        ) : (
          <div className="text-[#b4c0d9] text-xs font-tech max-w-sm">
            Clique em <strong>Iniciar 35s</strong> para desarmar o veneno literal da palavra.
          </div>
        )}
      </div>
    </div>
  );
};
