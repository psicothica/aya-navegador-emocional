import React, { useState } from 'react';
import { Wind, Sparkles, Anchor, ShieldCheck } from 'lucide-react';
import { BreathingExercise } from './BreathingExercise';
import { WordRepetitionTool } from './WordRepetitionTool';
import { StruggleSwitchTool } from './StruggleSwitchTool';

export const QuickToolsSos: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'breathing' | 'wrt' | 'struggle' | 'anchor'>('breathing');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-tech text-[#02bbff] mb-1">
          <span>INTERVENÇÕES DE CHOQUE // 30 A 60 SEGUNDOS</span>
          <span aria-hidden="true" className="text-slate-600">/</span>
          <span>ESTABILIZAÇÃO AUTONÔMICA</span>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
          Caixa de Ferramentas <span className="text-[#ce57df] glow-magenta">Rápidas (SOS)</span>
        </h2>
        <p className="text-xs text-[#e1eefc]/70 mt-1 max-w-2xl">
          Quando a mente estiver em volume ensurdecedor e você precisar de aterramento biológico imediato. Sem rodeios: selecione a arma e execute.
        </p>
      </div>

      {/* Tool Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          type="button"
          onClick={() => setActiveTool('breathing')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            activeTool === 'breathing'
              ? 'bg-[#01366d]/50 border-[#02bbff] shadow-[0_0_15px_rgba(2,187,255,0.3)] ring-1 ring-[#02bbff]'
              : 'glass-panel border-[#82e5ff]/15 hover:border-[#82e5ff]/35'
          }`}
        >
          <Wind className="w-5 h-5 text-[#02bbff] mb-2" />
          <div className="font-tech text-xs font-bold text-white uppercase">
            Suspiro Fisiológico
          </div>
          <div className="text-[11px] text-[#82e5ff] mt-0.5 font-tech">
            Desarmar taquicardia
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActiveTool('anchor')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            activeTool === 'anchor'
              ? 'bg-[#01366d]/50 border-[#82e5ff] shadow-[0_0_15px_rgba(130,229,255,0.3)] ring-1 ring-[#82e5ff]'
              : 'glass-panel border-[#82e5ff]/15 hover:border-[#82e5ff]/35'
          }`}
        >
          <Anchor className="w-5 h-5 text-[#82e5ff] mb-2" />
          <div className="font-tech text-xs font-bold text-white uppercase">
            Lançar Âncora (ACE)
          </div>
          <div className="text-[11px] text-[#82e5ff] mt-0.5 font-tech">
            Corta a ruminação
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActiveTool('wrt')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            activeTool === 'wrt'
              ? 'bg-[#422774]/50 border-[#ce57df] shadow-[0_0_15px_rgba(206,87,223,0.3)] ring-1 ring-[#ce57df]'
              : 'glass-panel border-[#82e5ff]/15 hover:border-[#82e5ff]/35'
          }`}
        >
          <Sparkles className="w-5 h-5 text-[#ce57df] mb-2" />
          <div className="font-tech text-xs font-bold text-white uppercase">
            Desfusor WRT (35s)
          </div>
          <div className="text-[11px] text-[#ec9eff] mt-0.5 font-tech">
            Desarma autocrítica
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActiveTool('struggle')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            activeTool === 'struggle'
              ? 'bg-[#02295b]/50 border-[#02bbff] shadow-[0_0_15px_rgba(2,187,255,0.3)] ring-1 ring-[#02bbff]'
              : 'glass-panel border-[#82e5ff]/15 hover:border-[#82e5ff]/35'
          }`}
        >
          <ShieldCheck className="w-5 h-5 text-[#02bbff] mb-2" />
          <div className="font-tech text-xs font-bold text-white uppercase">
            Interruptor de Luta
          </div>
          <div className="text-[11px] text-[#82e5ff] mt-0.5 font-tech">
            Desliga o autoflagelo
          </div>
        </button>
      </div>

      {/* Render Active Tool */}
      <div>
        {activeTool === 'breathing' && <BreathingExercise />}
        {activeTool === 'wrt' && <WordRepetitionTool />}
        {activeTool === 'struggle' && <StruggleSwitchTool />}
        {activeTool === 'anchor' && (
          <div className="glass-panel rounded-2xl p-6 border border-[#82e5ff]/20 shadow-sm space-y-4">
            <div className="pb-3 border-b border-[#82e5ff]/15">
              <div className="flex items-center gap-2 text-xs font-tech text-[#82e5ff] font-semibold mb-1">
                <Anchor className="w-4 h-4 text-[#02bbff]" />
                <span>PROTOCOLO ACE // 60 SEGUNDOS</span>
              </div>
              <h3 className="font-display text-lg font-bold text-white uppercase">
                Lançar Âncora no Meio da Tempestade
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-[#130169]/40 rounded-xl border border-[#02bbff]/20 text-xs space-y-2">
                <div className="font-tech font-bold text-[#82e5ff] text-sm uppercase">
                  1. A // ACKNOWLEDGE
                </div>
                <p className="text-[#e1eefc]/90 leading-relaxed">
                  Note com honestidade crua o que tá acontecendo aí dentro: a tristeza, a ansiedade, a mente tagarelando que você vai falhar. Fale pra você mesmo: &ldquo;Noto que a dor tá aqui&rdquo;. Sem drama.
                </p>
              </div>

              <div className="p-4 bg-[#130169]/40 rounded-xl border border-[#02bbff]/20 text-xs space-y-2">
                <div className="font-tech font-bold text-[#82e5ff] text-sm uppercase">
                  2. C // COME BACK
                </div>
                <p className="text-[#e1eefc]/90 leading-relaxed">
                  Bate os calcanhares no chão. Endireita as costas. Sinta a gravidade te segurando no planeta. Abra e feche as mãos. O seu corpo físico é seu território soberano, mesmo em dia de tempestade.
                </p>
              </div>

              <div className="p-4 bg-[#130169]/40 rounded-xl border border-[#02bbff]/20 text-xs space-y-2">
                <div className="font-tech font-bold text-[#82e5ff] text-sm uppercase">
                  3. E // ENGAGE
                </div>
                <p className="text-[#e1eefc]/90 leading-relaxed">
                  Olhe 3 coisas ao redor. Ouça o barulho mais distante lá fora. Sinta o ar na pele. E volte pro que você tava fazendo por 5 minutos, levando a dor com você na garupa.
                </p>
              </div>
            </div>

            <div className="p-3 bg-[#0f142a]/80 rounded-xl text-xs text-[#ec9eff] font-signature text-base border border-[#ce57df]/20">
              * Nota: A âncora não serve pra mandar a tempestade embora. Serve pra não deixar o seu navio afundar enquanto o tempo fecha.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
