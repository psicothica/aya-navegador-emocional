import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, ShieldCheck, Heart, X } from 'lucide-react';

interface BreathingProps {
  onComplete?: () => void;
  onClose?: () => void;
  defaultMode?: 'sigh' | 'box';
}

export const BreathingExercise: React.FC<BreathingProps> = ({ defaultMode = 'sigh', onComplete, onClose }) => {
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'sigh' | 'box'>(defaultMode);
  const [phase, setPhase] = useState<'inhale1' | 'inhale2' | 'exhale' | 'hold' | 'ready'>('ready');
  const [timerSec, setTimerSec] = useState(0);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const playTone = (frequency: number, durationMs: number) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + durationMs / 1000);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + durationMs / 1000);
    } catch {
      // Audio context restricted
    }
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isActive) {
      if (mode === 'sigh') {
        // Suspiro Fisiológico calmo:
        // 0-3s: Inalação lenta pelo nariz
        // 3-4s: Inalação curta adicional
        // 4-9s: Expiração longa e serena pela boca
        interval = setInterval(() => {
          setTimerSec((prev) => {
            const next = (prev + 1) % 9;
            if (next === 0) {
              setPhase('inhale1');
              playTone(240, 600);
            } else if (next === 3) {
              setPhase('inhale2');
              playTone(280, 400);
            } else if (next === 4) {
              setPhase('exhale');
              playTone(180, 800);
              setCyclesCompleted((c) => c + 1);
            }
            return next;
          });
        }, 1000);
      } else {
        // 4 Tempos calmo
        interval = setInterval(() => {
          setTimerSec((prev) => {
            const next = (prev + 1) % 16;
            if (next === 0) {
              setPhase('inhale1');
              playTone(260, 500);
            } else if (next === 4) {
              setPhase('hold');
            } else if (next === 8) {
              setPhase('exhale');
              playTone(190, 700);
              setCyclesCompleted((c) => c + 1);
            } else if (next === 12) {
              setPhase('hold');
            }
            return next;
          });
        }, 1000);
      }
    } else {
      setPhase('ready');
      setTimerSec(0);
    }

    return () => clearInterval(interval);
  }, [isActive, mode, soundEnabled]);

  const handleToggle = () => {
    if (!isActive) {
      setIsActive(true);
      setPhase('inhale1');
      playTone(240, 600);
    } else {
      setIsActive(false);
      setPhase('ready');
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase('ready');
    setTimerSec(0);
    setCyclesCompleted(0);
  };

  const getPhaseInfo = () => {
    if (!isActive) {
      return {
        instruction: 'Pronto para desacelerar o ritmo',
        detail: 'Clique com calma no botão abaixo para iniciar a regulação lenta e suave.',
        scale: 'scale-95',
        bgColor: 'bg-[#130169]/40 text-[#82e5ff] border-[#02bbff]/20'
      };
    }
    if (mode === 'sigh') {
      if (phase === 'inhale1') {
        return {
          instruction: 'Inspire devagar pelo nariz...',
          detail: 'Puxe o ar suavemente, sem pressa, enchendo o peito.',
          scale: 'scale-110',
          bgColor: 'bg-[#02bbff]/15 text-[#82e5ff] border-[#02bbff]/50 shadow-[0_0_30px_rgba(2,187,255,0.25)]'
        };
      }
      if (phase === 'inhale2') {
        return {
          instruction: 'Mais uma puxadinha suave de ar...',
          detail: 'Completando com calma o topo dos pulmões.',
          scale: 'scale-118',
          bgColor: 'bg-[#ce57df]/20 text-white border-[#ce57df]/60 shadow-[0_0_35px_rgba(206,87,223,0.3)]'
        };
      }
      if (phase === 'exhale') {
        return {
          instruction: 'Solte o ar bem devagar pela boca...',
          detail: 'Soprando suavemente, soltando todo o peso dos ombros.',
          scale: 'scale-90',
          bgColor: 'bg-[#130169]/60 text-[#82e5ff] border-[#82e5ff]/30 shadow-[0_0_20px_rgba(130,229,255,0.15)]'
        };
      }
    } else {
      if (phase === 'inhale1') {
        return {
          instruction: 'Inspire pelo nariz com calma...',
          detail: 'Expandindo suavemente.',
          scale: 'scale-112',
          bgColor: 'bg-[#02bbff]/15 text-[#82e5ff] border-[#02bbff]/40'
        };
      }
      if (phase === 'hold') {
        return {
          instruction: 'Mantenha o ar sem esforço...',
          detail: 'Soltando a tensão da boca e testa.',
          scale: 'scale-112',
          bgColor: 'bg-[#b104dc]/20 text-white border-[#ce57df]/40'
        };
      }
      if (phase === 'exhale') {
        return {
          instruction: 'Solte devagar e suave...',
          detail: 'Esvaziando todo o fôlego.',
          scale: 'scale-90',
          bgColor: 'bg-[#130169]/60 text-[#82e5ff] border-[#02bbff]/30'
        };
      }
    }
    return {
      instruction: 'Respire naturalmente',
      detail: 'Mantenha o foco calmo no fluxo do ar.',
      scale: 'scale-100',
      bgColor: 'bg-[#130169]/40 text-[#82e5ff] border-[#02bbff]/20'
    };
  };

  const currentInfo = getPhaseInfo();

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-[#82e5ff]/20 shadow-[0_16px_50px_rgba(0,0,0,0.5)] relative">
      {/* Dedicated close button top-right */}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar respiração guiada"
          className="absolute top-4 right-4 z-50 flex items-center justify-center w-8 h-8 rounded-full bg-[#130169] text-[#82e5ff] hover:text-white hover:bg-[#ce57df] border border-[#02bbff]/40 shadow-lg transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {/* Explicit header with title & mode tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#82e5ff]/15 pr-12">
        <div>
          <div className="flex items-center gap-2 text-xs font-tech text-[#02bbff] mb-1">
            <span>REGULAÇÃO NEUROBIOLÓGICA</span>
            <span aria-hidden="true" className="text-slate-600">/</span>
            <span>RITMO SUAVE & TRANQUILIZADOR</span>
          </div>
          <h3 className="font-display text-lg sm:text-xl font-bold text-white">
            {mode === 'sigh' ? 'Suspiro Fisiológico' : 'Respiração em Quatro Tempos'}
          </h3>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-1 p-1 bg-[#0f142a] border border-[#82e5ff]/20 rounded-xl self-start sm:self-auto">
          <button
            type="button"
            onClick={() => { setMode('sigh'); handleReset(); }}
            className={`px-3 py-1.5 text-xs font-tech font-bold rounded-lg transition-all whitespace-nowrap ${
              mode === 'sigh' ? 'bg-[#02bbff] text-[#0f142a]' : 'text-[#82e5ff] hover:text-white'
            }`}
          >
            Suspiro Fisiológico
          </button>
          <button
            type="button"
            onClick={() => { setMode('box'); handleReset(); }}
            className={`px-3 py-1.5 text-xs font-tech font-bold rounded-lg transition-all whitespace-nowrap ${
              mode === 'box' ? 'bg-[#ce57df] text-white' : 'text-[#ec9eff] hover:text-white'
            }`}
          >
            4 Tempos
          </button>
        </div>
      </div>

      {/* Visual Animation Circle Area with Ultra-Gentle Ease */}
      <div className="flex flex-col items-center justify-center py-10 sm:py-12">
        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* Outer glowing ring with slow breathing transition */}
          <div
            className={`absolute inset-0 rounded-full border border-[#02bbff]/30 transition-all duration-[3000ms] ease-in-out ${
              isActive ? 'opacity-90 scale-110 shadow-[0_0_35px_rgba(2,187,255,0.25)]' : 'opacity-20 scale-95'
            }`}
          />
          {/* Inner breathing orb with slow smooth transition */}
          <div
            className={`w-48 h-48 rounded-full flex flex-col items-center justify-center text-center p-5 transition-all duration-[3000ms] ease-in-out border ${
              currentInfo.bgColor
            } ${currentInfo.scale}`}
          >
            <Heart className={`w-8 h-8 mb-2 text-[#ce57df] transition-all duration-1000 ${isActive ? 'opacity-100 scale-105' : 'opacity-60'}`} />
            <span className="font-display text-xs sm:text-sm font-bold tracking-wide">
              {currentInfo.instruction}
            </span>
            {isActive && (
              <span className="text-xs font-tech mt-1 text-[#82e5ff] tabular-nums">
                Ciclo #{cyclesCompleted + 1}
              </span>
            )}
          </div>
        </div>

        <p className="text-xs text-[#e1eefc]/70 text-center max-w-md mt-4 leading-relaxed">
          {currentInfo.detail}
        </p>
      </div>

      {/* Gentle, Slow, Soothing Control Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#82e5ff]/15">
        <div className="flex items-center gap-2.5">
          {/* Slow, gentle pulsing primary button */}
          <button
            type="button"
            onClick={handleToggle}
            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-xs font-tech font-bold transition-all duration-1000 ease-in-out whitespace-nowrap shadow-md cursor-pointer ${
              isActive 
                ? 'bg-[#422774] text-[#ec9eff] hover:bg-[#6b05b2] border border-[#ce57df]/50 shadow-[0_0_20px_rgba(206,87,223,0.3)] animate-pulse-slow'
                : 'bg-gradient-to-r from-[#01366d] via-[#130169] to-[#01366d] text-[#82e5ff] hover:from-[#02295b] hover:to-[#422774] border border-[#02bbff]/40 shadow-[0_0_20px_rgba(2,187,255,0.25)] animate-pulse-slow'
            }`}
          >
            {isActive ? (
              <>
                <Pause className="w-4 h-4 text-[#ce57df]" />
                <span>Pausar Ritmo Serena</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 text-[#02bbff]" />
                <span>Iniciar Respiração Guiada</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleReset}
            title="Reiniciar contagem"
            className="p-2.5 text-[#82e5ff]/80 hover:text-white hover:bg-[#130169]/50 rounded-xl transition-all border border-[#82e5ff]/15"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? 'Desativar som discreto' : 'Ativar som discreto'}
            className={`p-2.5 rounded-xl transition-all border border-[#82e5ff]/15 ${
              soundEnabled ? 'text-[#ce57df] bg-[#ce57df]/20 border-[#ce57df]/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-4 text-xs font-tech text-[#e1eefc]/70">
          <div>
            <span>Ciclos: </span>
            <strong className="text-white font-mono tabular-nums">{cyclesCompleted}</strong>
          </div>
          <div className="flex items-center gap-1.5 text-[#02bbff]">
            <ShieldCheck className="w-4 h-4" />
            <span>Acalma a taquicardia em 2 minutos</span>
          </div>
        </div>
      </div>

      {/* Close button at the bottom if requested */}
      {onClose && (
        <div className="mt-4 pt-3 border-t border-[#82e5ff]/10 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-tech text-[#82e5ff] hover:text-white bg-[#0f142a] hover:bg-[#130169] border border-[#82e5ff]/25 rounded-xl transition-all"
          >
            Fechar Exercício
          </button>
        </div>
      )}
    </div>
  );
};
