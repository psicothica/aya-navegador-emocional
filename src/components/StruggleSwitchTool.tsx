import React, { useState } from 'react';
import { ToggleLeft, ToggleRight, Flame, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

export const StruggleSwitchTool: React.FC = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(true);

  return (
    <div className="glass-panel rounded-2xl p-6 border border-[#82e5ff]/20 shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#82e5ff]/15">
        <div>
          <div className="flex items-center gap-2 text-xs font-tech text-[#ce57df] mb-1">
            <span>METÁFORA CLÍNICA DE RUSS HARRIS // 4ª ONDA</span>
            <span aria-hidden="true" className="text-slate-600">/</span>
            <span>ACEITAÇÃO EXPERIENCIAL</span>
          </div>
          <h3 className="font-display text-lg font-bold text-white uppercase">
            O Simulador do Interruptor de Luta
          </h3>
        </div>

        {/* Visual Switch Button */}
        <button
          type="button"
          onClick={() => setIsSwitchOn(!isSwitchOn)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-tech font-bold transition-all whitespace-nowrap border ${
            isSwitchOn
              ? 'bg-[#422774]/70 text-[#ec9eff] border-[#ce57df] shadow-[0_0_15px_rgba(206,87,223,0.4)]'
              : 'bg-[#01366d]/70 text-[#82e5ff] border-[#02bbff] shadow-[0_0_15px_rgba(2,187,255,0.4)]'
          }`}
        >
          {isSwitchOn ? (
            <>
              <ToggleRight className="w-5 h-5 text-[#ce57df]" />
              <span>INTERRUPTOR: LIGADO (GUERRA)</span>
            </>
          ) : (
            <>
              <ToggleLeft className="w-5 h-5 text-[#02bbff]" />
              <span>INTERRUPTOR: DESLIGADO (ESPAÇO)</span>
            </>
          )}
        </button>
      </div>

      {/* Comparison Grid */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* State with Switch ON */}
        <div
          className={`p-4 rounded-xl border transition-all ${
            isSwitchOn
              ? 'bg-gradient-to-br from-[#422774]/40 to-[#0f142a] border-[#ce57df] shadow-[0_0_20px_rgba(206,87,223,0.25)]'
              : 'bg-[#0f142a]/40 border-[#82e5ff]/10 opacity-40'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="font-tech text-xs font-bold uppercase text-[#ce57df] flex items-center gap-1.5 glow-magenta">
              <Flame className="w-4 h-4 text-[#ce57df]" />
              Interruptor LIGADO: Fogo Amigo
            </span>
            {isSwitchOn && (
              <span className="font-tech text-[10px] bg-[#ce57df] text-white px-2 py-0.5 rounded">
                Ativo Agora
              </span>
            )}
          </div>

          <div className="space-y-2.5 text-xs text-[#e1eefc]/90">
            <div className="p-3 bg-[#0f142a]/80 rounded-lg border border-[#ce57df]/20">
              <strong className="text-[#ec9eff] font-tech text-[11px] block mb-0.5 uppercase">
                1. Dor Primária (Biológica):
              </strong>
              Tristeza pesada, frio no estômago ou taquicardia real.
            </div>
            <div className="p-3 bg-[#0f142a]/80 rounded-lg border border-[#ce57df]/20">
              <strong className="text-[#ce57df] font-tech text-[11px] block mb-0.5 uppercase">
                2. Pânico Secundário (A Luta):
              </strong>
              &ldquo;Eu não posso ficar assim! Tenho que dar um jeito nisso agora! Por que comigo?&rdquo;
            </div>
            <div className="p-3 bg-[#0f142a]/80 rounded-lg border border-[#ce57df]/20">
              <strong className="text-white font-tech text-[11px] block mb-0.5 uppercase">
                3. Resultado: Sofrimento Multiplicado por 10x:
              </strong>
              A amígdala dispara mais adrenalina, você queima toda a energia brigando contra si mesmo e colapsa na cama.
            </div>
          </div>
        </div>

        {/* State with Switch OFF */}
        <div
          className={`p-4 rounded-xl border transition-all ${
            !isSwitchOn
              ? 'bg-gradient-to-br from-[#01366d]/40 to-[#0f142a] border-[#02bbff] shadow-[0_0_20px_rgba(2,187,255,0.25)]'
              : 'bg-[#0f142a]/40 border-[#82e5ff]/10 opacity-40'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="font-tech text-xs font-bold uppercase text-[#02bbff] flex items-center gap-1.5 glow-cyan">
              <CheckCircle2 className="w-4 h-4 text-[#02bbff]" />
              Interruptor DESLIGADO: Disposição
            </span>
            {!isSwitchOn && (
              <span className="font-tech text-[10px] bg-[#02bbff] text-[#0f142a] font-bold px-2 py-0.5 rounded">
                Ativo Agora
              </span>
            )}
          </div>

          <div className="space-y-2.5 text-xs text-[#e1eefc]/90">
            <div className="p-3 bg-[#0f142a]/80 rounded-lg border border-[#02bbff]/20">
              <strong className="text-[#82e5ff] font-tech text-[11px] block mb-0.5 uppercase">
                1. Dor Primária (Acolhida):
              </strong>
              A mesma tristeza ou medo continua ali no corpo.
            </div>
            <div className="p-3 bg-[#0f142a]/80 rounded-lg border border-[#02bbff]/20">
              <strong className="text-[#02bbff] font-tech text-[11px] block mb-0.5 uppercase">
                2. Resposta de 4ª Onda:
              </strong>
              &ldquo;Abro espaço. O peito tá pesado, mas eu aguento sentir isso sem precisar fugir ou quebrar as paredes.&rdquo;
            </div>
            <div className="p-3 bg-[#0f142a]/80 rounded-lg border border-[#02bbff]/20">
              <strong className="text-white font-tech text-[11px] block mb-0.5 uppercase">
                3. Resultado: Energia Poupada para Viver:
              </strong>
              A onda atinge o pico e se dissipa naturalmente. Seu foco fica 100% livre para o micro-passo.
            </div>
          </div>
        </div>
      </div>

      {/* Signature note */}
      <div className="mt-4 pt-4 border-t border-[#82e5ff]/15 flex items-start gap-2.5 text-xs text-[#e1eefc]/70 font-signature text-base">
        <Sparkles className="w-4 h-4 text-[#ce57df] shrink-0 mt-1" />
        <p>
          &ldquo;Desligar o interruptor não é virar monge budista nem fingir que achou gostoso sofrer. É só a decisão madura de parar de jogar gasolina no próprio fogo.&rdquo; — Alanne (Psicothica)
        </p>
      </div>
    </div>
  );
};
