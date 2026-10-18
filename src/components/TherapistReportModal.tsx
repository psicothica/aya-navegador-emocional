import React, { useState } from 'react';
import { Copy, Check, Printer, FileText, X, Sparkles } from 'lucide-react';
import { PBATLogEntry, ChoicePointRecord } from '../types/therapy';

interface TherapistReportProps {
  isOpen: boolean;
  onClose: () => void;
  pbatLogs: PBATLogEntry[];
  choicePoints: ChoicePointRecord[];
  clientName?: string;
}

export const TherapistReportModal: React.FC<TherapistReportProps> = ({
  isOpen,
  onClose,
  pbatLogs,
  choicePoints,
  clientName = 'Cliente em Processo Psicoterápico'
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const totalLogs = pbatLogs.length;
  const avgFlexibility = totalLogs > 0
    ? Math.round(pbatLogs.reduce((acc, l) => acc + l.psychologicalFlexibilityScore, 0) / totalLogs)
    : 0;
  const avgAutonomy = totalLogs > 0
    ? Math.round(pbatLogs.reduce((acc, l) => acc + l.autonomyScore, 0) / totalLogs)
    : 0;
  const avgRetention = totalLogs > 0
    ? Math.round(pbatLogs.reduce((acc, l) => acc + l.retentionScore, 0) / totalLogs)
    : 0;
  const avgDefusion = totalLogs > 0
    ? Math.round(pbatLogs.reduce((acc, l) => acc + l.defusionScore, 0) / totalLogs)
    : 0;

  const towardCount = choicePoints.filter((c) => c.choiceType === 'toward').length;
  const awayCount = choicePoints.filter((c) => c.choiceType === 'away').length;

  const sharedChoicePoints = choicePoints.filter((c) => c.sharedWithTherapist);

  const generatePlainText = () => {
    return `=== RELATÓRIO CLÍNICO ENTRE SESSÕES // ECOSSISTEMA PSICOTHICA ===
Desenvolvido por Alanne Raquel Fragoso de Farias, psicóloga (CRP 13/9646)
AyA Clínica Integrada · Programa Ramificar
Data de Emissão: ${new Date().toLocaleDateString('pt-BR')}
Cliente: ${clientName}

1. MÉTRICAS LONGITUDINAIS DO DIÁRIO DE PROCESSOS:
- Total de avaliações diárias registradas: ${totalLogs}
- Média de Flexibilidade Global: ${avgFlexibility}%
- Índice de Autonomia vs Complacência (Item #9): ${avgAutonomy}%
- Retenção e Consistência de Hábitos: ${avgRetention}%
- Nível de Desarmamento de Pensamentos: ${avgDefusion}%

2. NAVEGAÇÃO NO PONTO DE ESCOLHA:
- Total de bifurcações mapeadas: ${choicePoints.length}
- Movimentos de Aproximação (Toward Moves): ${towardCount}
- Movimentos de Afastamento com Consciência (Away Moves): ${awayCount}

3. SITUAÇÕES E MICRO-PASSOS MARCADOS PARA A SESSÃO:
${sharedChoicePoints.map((cp, idx) => `
[Momento #${idx + 1} - ${cp.date} ${cp.time}]
- Situação: ${cp.situation}
- Ganchos: ${cp.hooks.thoughts.join(' / ') || 'Sensações corporais'}
- Escolha: ${cp.choiceType === 'toward' ? 'APROXIMAÇÃO (Toward)' : 'AFASTAMENTO (Away)'}
${cp.towardMovement ? `- Micro-ação: ${cp.towardMovement.action} (Valor: ${cp.towardMovement.value} | Helper: ${cp.towardMovement.helperStrategy})` : ''}
${cp.awayMovement ? `- Afastamento: ${cp.awayMovement.overt} (Custo: ${cp.awayMovement.cost})` : ''}
- Reflexão do Cliente: "${cp.reflection || 'Sem anotações adicionais'}"
`).join('\n')}

---
Aviso Ético: Este é um material informativo e de apoio. Ele não substitui avaliação, diagnóstico ou acompanhamento profissional, e não oferece promessa de cura ou de resultado. Seus dados ficam salvos exclusivamente no aparelho do usuário.
Em caso de risco ou crise: CVV 188 (24h) | SAMU 192.
`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatePlainText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0f142a]/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0f142a] border border-[#ce57df]/40 shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-6 sm:p-8 space-y-6 relative text-white">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-[#82e5ff] hover:text-white p-1.5 rounded-lg hover:bg-[#130169]/50 transition-colors font-tech text-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="pb-4 border-b border-[#82e5ff]/20">
          <div className="flex items-center gap-2 text-xs font-tech text-[#ce57df] mb-1">
            <FileText className="w-4 h-4 text-[#ce57df]" />
            <span>RELATÓRIO CLÍNICO DE ACOMPANHAMENTO // PSICOTHICA</span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white uppercase">
            Dados de Rede para a Sessão
          </h3>
          <p className="text-xs text-[#e1eefc]/70 mt-1">
            Métricas puras e episódios mapeados para discutir com seu psicoterapeuta sem rodeios.
          </p>
        </div>

        {/* Actions bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-[#130169]/50 rounded-xl border border-[#02bbff]/30">
          <span className="text-xs font-tech text-[#82e5ff]">
            Pronto para WhatsApp, e-mail ou impressão:
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="px-3.5 py-1.5 bg-[#0f142a] hover:bg-[#02295b] border border-[#02bbff]/40 text-[#82e5ff] text-xs font-tech font-bold rounded-lg transition-all flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#02bbff]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado!' : 'Copiar Texto'}</span>
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-gradient-to-r from-[#ce57df] to-[#b104dc] text-white text-xs font-tech font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(206,87,223,0.4)]"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / PDF</span>
            </button>
          </div>
        </div>

        {/* Printable Section */}
        <div className="space-y-5 text-xs text-[#e1eefc] print:text-black print:bg-white">
          {/* Metadata */}
          <div className="grid grid-cols-2 gap-2 p-3 bg-[#04223d]/60 rounded-xl border border-[#82e5ff]/20">
            <div>
              <span className="text-[#82e5ff] font-tech text-[10px] block uppercase">Data de Emissão:</span>
              <strong className="text-white font-mono text-sm">{new Date().toLocaleDateString('pt-BR')}</strong>
            </div>
            <div>
              <span className="text-[#ce57df] font-tech text-[10px] block uppercase">Registros Avaliados:</span>
              <strong className="text-white font-mono text-sm">{totalLogs} dias no radar</strong>
            </div>
          </div>

          {/* PBAT Longitudinal Metrics */}
          <div className="space-y-2">
            <h4 className="font-tech text-xs font-bold text-[#82e5ff] uppercase tracking-wider">
              1. Médias dos Processos de Mudança (PBAT)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="p-3 bg-[#0f142a] rounded-xl border border-[#82e5ff]/20 text-center">
                <span className="text-[10px] font-tech text-[#e1eefc]/60 block uppercase">Flexibilidade</span>
                <strong className="text-base font-bold text-[#02bbff] font-mono tabular-nums">{avgFlexibility}%</strong>
              </div>
              <div className="p-3 bg-[#0f142a] rounded-xl border border-[#ce57df]/25 text-center">
                <span className="text-[10px] font-tech text-[#e1eefc]/60 block uppercase">Autonomia (#9)</span>
                <strong className="text-base font-bold text-[#ce57df] font-mono tabular-nums">{avgAutonomy}%</strong>
              </div>
              <div className="p-3 bg-[#0f142a] rounded-xl border border-[#82e5ff]/20 text-center">
                <span className="text-[10px] font-tech text-[#e1eefc]/60 block uppercase">Retenção de Hábitos</span>
                <strong className="text-base font-bold text-[#82e5ff] font-mono tabular-nums">{avgRetention}%</strong>
              </div>
              <div className="p-3 bg-[#0f142a] rounded-xl border border-[#ce57df]/25 text-center">
                <span className="text-[10px] font-tech text-[#e1eefc]/60 block uppercase">Desfusão</span>
                <strong className="text-base font-bold text-[#ec9eff] font-mono tabular-nums">{avgDefusion}%</strong>
              </div>
            </div>
          </div>

          {/* Choice Point Summary */}
          <div className="space-y-2">
            <h4 className="font-tech text-xs font-bold text-[#ce57df] uppercase tracking-wider">
              2. Comportamento no Ponto de Escolha
            </h4>
            <p className="text-[#e1eefc]/80">
              Foram registradas <strong className="font-mono text-white">{choicePoints.length} encruzilhadas</strong>: {towardCount} ações de aproximação (Toward) e {awayCount} movimentos de afastamento (Away).
            </p>
          </div>

          {/* Highlighted Moments */}
          <div className="space-y-2.5">
            <h4 className="font-tech text-xs font-bold text-[#82e5ff] uppercase tracking-wider">
              3. Casos Mapeados para Explorar na Sessão ({sharedChoicePoints.length})
            </h4>

            {sharedChoicePoints.length === 0 ? (
              <div className="p-4 bg-[#0f142a] rounded-xl border border-[#82e5ff]/15 text-center text-xs text-[#e1eefc]/60 font-tech">
                Nenhuma encruzilhada marcada para a sessão ainda. No Ponto de Escolha, você pode marcar momentos reais para discutir com seu terapeuta.
              </div>
            ) : (
              sharedChoicePoints.map((cp, idx) => (
                <div key={cp.id} className="p-3.5 bg-[#0f142a] rounded-xl border border-[#82e5ff]/15 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-tech text-[#e1eefc]/60">
                    <span className="text-[#82e5ff]">{cp.date} · {cp.time}</span>
                    <span className={`font-bold ${cp.choiceType === 'toward' ? 'text-[#02bbff]' : 'text-[#ce57df]'}`}>
                      {cp.choiceType === 'toward' ? 'TOWARD (APROXIMAÇÃO)' : 'AWAY (AFASTAMENTO)'}
                    </span>
                  </div>
                  <div className="font-bold text-white">
                    Situação: {cp.situation}
                  </div>
                  {cp.towardMovement && (
                    <div className="text-[#82e5ff]">
                      <strong>Micro-ação:</strong> {cp.towardMovement.action} (Valor: {cp.towardMovement.value})
                    </div>
                  )}
                  {cp.awayMovement && (
                    <div className="text-[#ec9eff]">
                      <strong>Afastamento:</strong> {cp.awayMovement.overt}
                    </div>
                  )}
                  {cp.reflection && (
                    <div className="text-[#e1eefc]/70 font-signature text-sm pt-1 border-t border-slate-800">
                      &ldquo;{cp.reflection}&rdquo;
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#82e5ff]/15 flex items-center justify-between">
          <span className="text-[11px] font-tech text-[#82e5ff]/60">
            PSICOTHICA // AYÁ ECOSSISTEMA CLÍNICO
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-tech font-bold text-[#82e5ff] bg-[#130169]/60 hover:bg-[#130169] rounded-xl transition-colors border border-[#02bbff]/30"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
