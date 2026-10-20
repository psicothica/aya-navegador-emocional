import { BackupPanel } from './BackupPanel';
import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Plus, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  Zap, 
  FileText,
  Trash2,
  HelpCircle,
  X
} from 'lucide-react';
import { PBATLogEntry, PBATItemResponse, EmotionId } from '../types/therapy';
import { PBAT_QUESTIONS, calculatePbatScores } from '../data/pbatItems';
import { ILLUSTRATIVE_PBAT_EXAMPLE } from '../data/initialData';

const EMOTION_OPTIONS: { id: EmotionId | 'tranquilo' | 'outra'; label: string; emoji: string }[] = [
  { id: 'tristeza_letargia', label: 'Tristeza, Peso e Letargia', emoji: '🌧️' },
  { id: 'ansiedade_medo', label: 'Ansiedade, Medo e Paralisia', emoji: '⚡' },
  { id: 'vergonha_culpa', label: 'Vergonha, Culpa e Autocrítica', emoji: '🩹' },
  { id: 'raiva_frustracao', label: 'Raiva, Frustração e Revolta', emoji: '🔥' },
  { id: 'sobrecarga_burnout', label: 'Sobrecarga, Exaustão e Burnout', emoji: '🛑' },
  { id: 'tranquilo', label: 'Tranquilo / Equilibrado', emoji: '🌿' },
  { id: 'outra', label: 'Outro estado emocional', emoji: '🌀' }
];

interface PBATTrackerProps {
  logs: PBATLogEntry[];
  onAddLog: (entry: PBATLogEntry) => void;
  onDeleteLog?: (id: string) => void;
  onOpenReportModal: () => void;
  onExportBackup: () => string;
  onImportBackup: (file: File) => Promise<string>;
}

export const PbatDailyTracker: React.FC<PBATTrackerProps> = ({
  logs,
  onAddLog,
  onDeleteLog,
  onOpenReportModal,
  onExportBackup,
  onImportBackup
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showExampleGuide, setShowExampleGuide] = useState(false);

  // Form State - Starts clean
  const [responses, setResponses] = useState<PBATItemResponse>({
    variacao: 50,
    retencao_dificuldade: 50,
    cognicao_atrapalhou: 50,
    atencao_presente: 50,
    afeto_gama: 50,
    motivacao_cedeu: 50,
    conexao_sociocultural: 50,
    cuidado_biofisiologico: 50
  });

  const [dominantEmotion, setDominantEmotion] = useState<EmotionId | 'tranquilo' | 'outra'>('tranquilo');
  const [predominantNeed, setPredominantNeed] = useState('');
  const [microActionDone, setMicroActionDone] = useState('');
  const [notes, setNotes] = useState('');

  const liveCalculated = calculatePbatScores(responses);

  const handleSliderChange = (key: keyof PBATItemResponse, value: number) => {
    setResponses((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = () => {

    const todayDate = new Date().toISOString().split('T')[0];
    const nowTime = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const newEntry: PBATLogEntry = {
      id: `pbat-${Date.now()}`,
      date: todayDate,
      time: nowTime,
      responses,
      dominantEmotion,
      predominantNeed: predominantNeed.trim(),
      microActionDone: microActionDone.trim(),
      notes: notes.trim(),
      ...liveCalculated
    };

    onAddLog(newEntry);
    setIsFormOpen(false);
    setPredominantNeed('');
    setMicroActionDone('');
    setNotes('');
  };

  const latestEntry = logs[logs.length - 1];
  const averageFlexibility = logs.length > 0
    ? Math.round(logs.reduce((acc, curr) => acc + curr.psychologicalFlexibilityScore, 0) / logs.length)
    : 0;


  return (
    <div className="space-y-6">
      {/* Title & Action Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-tech text-[#02bbff] mb-1">
            <span>DIÁRIO DE PROCESSOS</span>
            <span aria-hidden="true" className="text-slate-600">/</span>
            <span>AVALIAÇÃO DIÁRIA DE PROGRESSO</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
            Diário Baseado em <span className="text-[#ce57df] glow-magenta">Processos (PBAT)</span>
          </h2>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={onOpenReportModal}
            className="px-3.5 py-2 text-xs font-tech font-bold text-[#82e5ff] bg-[#130169]/60 hover:bg-[#130169] border border-[#02bbff]/40 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap"
          >
            <FileText className="w-4 h-4 text-[#02bbff]" />
            <span>Relatório para Sessão</span>
          </button>

          <button
            type="button"
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="px-4 py-2 bg-gradient-to-r from-[#b104dc] to-[#130169] hover:brightness-110 text-white rounded-xl text-xs font-tech font-bold border border-[#ce57df] shadow-[0_0_15px_rgba(206,87,223,0.3)] transition-all flex items-center gap-1.5 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>{isFormOpen ? 'Fechar Check-in' : 'Novo Check-in PBAT'}</span>
          </button>
        </div>
      </div>

      {/* KPI Overview Cards with Cyber Glow */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="glass-panel rounded-2xl p-4 border border-[#82e5ff]/20 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-tech text-[#82e5ff] mb-1">
            <span>Flexibilidade Global</span>
            <Sparkles className="w-4 h-4 text-[#02bbff]" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono tabular-nums glow-cyan">
            {latestEntry ? `${latestEntry.psychologicalFlexibilityScore}%` : '--'}
          </div>
          <p className="text-[11px] font-tech text-[#b4c0d9] mt-1">
            Média histórica: <strong className="text-[#82e5ff]">{averageFlexibility}%</strong>
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-[#ce57df]/25 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-tech text-[#ec9eff] mb-1">
            <span>Autonomia vs Complacência</span>
            <Zap className="w-4 h-4 text-[#ec9eff]" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono tabular-nums glow-magenta">
            {latestEntry ? `${latestEntry.autonomyScore}%` : '--'}
          </div>
          <p className="text-[11px] font-tech text-[#ec9eff] mt-1">
            Item #9: Ação por escolha própria
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-[#82e5ff]/20 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-tech text-[#82e5ff] mb-1">
            <span>Retenção de Hábitos</span>
            <ShieldCheck className="w-4 h-4 text-[#02bbff]" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono tabular-nums glow-cyan">
            {latestEntry ? `${latestEntry.retentionScore}%` : '--'}
          </div>
          <p className="text-[11px] font-tech text-[#b4c0d9] mt-1">
            Consistência no que te faz bem
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-[#ce57df]/25 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-tech text-[#ec9eff] mb-1">
            <span>Desfusão Cognitiva</span>
            <TrendingUp className="w-4 h-4 text-[#ec9eff]" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono tabular-nums glow-magenta">
            {latestEntry ? `${latestEntry.defusionScore}%` : '--'}
          </div>
          <p className="text-[11px] font-tech text-[#ec9eff] mt-1">
            Espaço entre pensamento e ação
          </p>
        </div>
      </div>

      {/* Daily PBAT Logging Form */}
      {isFormOpen && (
        <div className="glass-panel-accent rounded-2xl p-6 border border-[#ce57df]/40 shadow-[0_15px_50px_rgba(0,0,0,0.5)] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#ce57df]/20">
            <div>
              <h3 className="font-display text-lg font-bold text-white uppercase">
                Check-in de Processos (Últimas 24 Horas)
              </h3>
              <p className="text-xs text-[#b4c0d9] mt-0.5">
                Avalie de 0 (discordo totalmente) a 100 (concordo totalmente). Sem julgar o que você sentiu.
              </p>
            </div>

            <div className="flex items-center gap-2 p-2 bg-[#130169]/80 border border-[#02bbff]/40 rounded-xl text-xs font-tech">
              <span className="text-[#82e5ff]">Score Previsto:</span>
              <strong className="text-white text-sm font-bold tabular-nums glow-cyan">
                {liveCalculated.psychologicalFlexibilityScore}%
              </strong>
            </div>
          </div>

          {/* Context selections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-tech text-[#82e5ff] mb-1 uppercase font-bold">
                Emoção predominante no radar hoje:
              </label>
              <select
                value={dominantEmotion}
                onChange={(e) => setDominantEmotion(e.target.value as any)}
                className="w-full text-xs px-3 py-2 bg-[#0f142a] text-white border border-[#82e5ff]/30 rounded-xl focus:border-[#02bbff]"
              >
                {EMOTION_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.emoji} {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-tech text-[#ec9eff] mb-1 uppercase font-bold">
                Necessidade prioritária (opcional, suas palavras):
              </label>
              <input
                type="text"
                value={predominantNeed}
                onChange={(e) => setPredominantNeed(e.target.value)}
                placeholder="Ex: Descanso real sem culpa, coragem para falar não..."
                className="w-full text-xs px-3 py-2 bg-[#0f142a] text-white border border-[#ce57df]/30 rounded-xl focus:border-[#ce57df]"
              />
            </div>
          </div>

          {/* 8 PBAT Items Sliders */}
          <div className="space-y-4 pt-2 border-t border-[#82e5ff]/15">
            {PBAT_QUESTIONS.map((q) => {
              const currentValue = responses[q.key];
              const isInverted = q.polarity === 'inverted';

              return (
                <div key={q.key} className="p-4 bg-[#0f142a]/90 rounded-xl border border-[#82e5ff]/15 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-tech font-bold text-white uppercase">{q.dimension}</span>
                        <span aria-hidden="true" className="text-slate-600">/</span>
                        <span className="text-[11px] font-tech text-[#02bbff]">{q.eemmDomain}</span>
                        {isInverted && (
                          <span className="text-[10px] font-tech bg-[#422774] text-[#ec9eff] px-2 py-0.5 rounded border border-[#ce57df]/30">
                            Nota Invertida
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#e1eefc] font-medium">
                        &ldquo;{q.label}&rdquo;
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-mono text-lg font-bold text-[#82e5ff] tabular-nums glow-cyan">
                        {currentValue}%
                      </span>
                    </div>
                  </div>

                  {/* Slider */}
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={currentValue}
                    onChange={(e) => handleSliderChange(q.key, Number(e.target.value))}
                    className="w-full h-1.5 bg-[#130169] rounded-lg appearance-none cursor-pointer accent-[#ce57df]"
                  />

                  <div className="flex justify-between text-[10px] font-tech text-[#b4c0d9]">
                    <span className="max-w-[45%]">{q.lowPrompt}</span>
                    <span className="max-w-[45%] text-right">{q.highPrompt}</span>
                  </div>

                  <p className="text-[11px] font-signature text-[#ec9eff] pt-0.5">
                    💡 {q.tipForPatient}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Micro-actions and Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#82e5ff]/15">
            <div>
              <label className="block text-xs font-tech text-[#82e5ff] mb-1 uppercase font-bold">
                Micro-passo de ativação que você cumpriu hoje (suas palavras):
              </label>
              <input
                type="text"
                value={microActionDone}
                onChange={(e) => setMicroActionDone(e.target.value)}
                placeholder="Ex: Levantei e dei uma volta no quarteirão com a letargia junto..."
                className="w-full text-xs px-3 py-2 bg-[#0f142a] text-white border border-[#82e5ff]/30 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-tech text-[#ec9eff] mb-1 uppercase font-bold">
                Notas cruas para a sessão (suas palavras):
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex: O medo de desapontar quase me fez aceitar hora extra..."
                className="w-full text-xs px-3 py-2 bg-[#0f142a] text-white border border-[#ce57df]/30 rounded-xl"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-4 py-2 text-xs font-tech text-[#82e5ff] hover:bg-[#130169]/40 rounded-xl"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-5 py-2.5 bg-gradient-to-r from-[#b104dc] to-[#130169] text-white text-xs font-tech font-bold rounded-xl border border-[#ce57df] shadow-[0_0_15px_rgba(206,87,223,0.3)] transition-all cursor-pointer"
            >
              Salvar Meu Registro PBAT
            </button>
          </div>
        </div>
      )}

      {/* Backup em arquivo (exportar / importar JSON) */}
      <BackupPanel onExport={onExportBackup} onImport={onImportBackup} />

      {/* When no logs exist: Clean, authentic empty state */}
      {logs.length === 0 ? (
        <div className="glass-panel rounded-2xl p-6 sm:p-10 border border-[#82e5ff]/20 text-center space-y-5">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-[#130169] to-[#ce57df]/30 border border-[#82e5ff]/40 flex items-center justify-center shadow-[0_0_25px_rgba(206,87,223,0.3)]">
            <BarChart3 className="w-7 h-7 text-[#02bbff]" />
          </div>

          <div className="max-w-xl mx-auto space-y-2">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white uppercase tracking-tight">
              Diário de Processos <span className="text-[#ce57df] glow-magenta">100% Pessoal</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#b4c0d9] leading-relaxed">
              Aqui não há dados simulados nem respostas pré-fabricadas. O diário PBAT avalia as 6 dimensões da sua experiência real ao longo dos dias, gerando um mapa idionômico de progresso para a sua psicoterapia.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsFormOpen(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-[#b104dc] to-[#130169] hover:brightness-110 text-white text-xs font-tech font-bold rounded-xl border border-[#ce57df] shadow-[0_0_18px_rgba(206,87,223,0.4)] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Fazer Primeiro Check-in PBAT</span>
            </button>

            <button
              type="button"
              onClick={() => setShowExampleGuide(!showExampleGuide)}
              className="px-4 py-2.5 bg-[#130169]/50 hover:bg-[#130169] text-[#82e5ff] text-xs font-tech font-bold rounded-xl border border-[#02bbff]/30 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#02bbff]" />
              <span>{showExampleGuide ? 'Fechar Guia' : 'Como Funciona a Avaliação?'}</span>
            </button>
          </div>

          {/* Collapsible illustrative guide */}
          {showExampleGuide && (
            <div className="text-left mt-6 p-5 sm:p-6 bg-[#0f142a]/95 rounded-2xl border border-[#ce57df]/35 space-y-4 max-w-2xl mx-auto">
              <div className="flex items-center justify-between pb-2 border-b border-[#82e5ff]/20">
                <span className="font-tech text-xs font-bold text-[#82e5ff] uppercase flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#02bbff]" />
                  Exemplo Ilustrativo de Interpretação
                </span>
                <span className="text-[10px] font-tech text-[#ec9eff] bg-[#130169] px-2 py-0.5 rounded border border-[#ce57df]/30">
                  Apenas para consulta
                </span>
              </div>
              <p className="text-xs text-[#b4c0d9]">
                O PBAT mede como você se relaciona com suas emoções e pensamentos através de 8 perguntas calibradas. Quando você registrar seus dias, os gráficos calcularão:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[#130169]/30 rounded-xl border border-[#82e5ff]/15">
                  <strong className="text-[#82e5ff] font-tech uppercase block text-[11px]">Flexibilidade Global:</strong>
                  Capacidade de sentir o desconforto e continuar agindo em direção ao que importa.
                </div>
                <div className="p-3 bg-[#130169]/30 rounded-xl border border-[#ce57df]/20">
                  <strong className="text-[#ec9eff] font-tech uppercase block text-[11px]">Item #9 (Autonomia):</strong>
                  Se você agiu por escolha própria ou se cedeu apenas para agradar/evitar atritos.
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Historical Logs & Sparkline Trends */
        <div className="glass-panel rounded-2xl p-6 border border-[#82e5ff]/20 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#82e5ff]/15">
            <h3 className="font-display text-base font-bold text-white uppercase">
              Evolução Longitudinal dos Processos ({logs.length} {logs.length === 1 ? 'dia' : 'dias'} no radar)
            </h3>
            <span className="font-tech text-xs text-[#82e5ff]">
              Acompanhamento idionômico de rede
            </span>
          </div>

          {/* Visual Trend Bars in Neon Dark Mode */}
          <div className="space-y-2">
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
              {logs.slice(-6).map((log) => {
                const emotionObj = EMOTION_OPTIONS.find(e => e.id === log.dominantEmotion);
                return (
                  <div key={log.id} className="p-3 bg-[#0f142a]/90 rounded-xl border border-[#82e5ff]/20 text-center space-y-1.5">
                    <span className="text-[10px] text-[#82e5ff] font-tech block">
                      {log.date.slice(5)}
                    </span>
                    <div className="text-base font-bold font-mono text-white tabular-nums glow-cyan">
                      {log.psychologicalFlexibilityScore}%
                    </div>
                    <div className="w-full bg-[#130169] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#02bbff] to-[#ce57df] h-full rounded-full"
                        style={{ width: `${log.psychologicalFlexibilityScore}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-[#ec9eff] font-tech block truncate">
                      {emotionObj?.emoji || '🌿'} {emotionObj?.label.split(',')[0] || log.dominantEmotion}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Entries List */}
          <div className="space-y-2.5 pt-2">
            {logs.slice().reverse().map((entry) => {
              const emotionObj = EMOTION_OPTIONS.find(e => e.id === entry.dominantEmotion);
              return (
                <div
                  key={entry.id}
                  className="p-4 bg-[#0f142a]/70 border border-[#82e5ff]/15 rounded-xl text-xs space-y-2 hover:border-[#82e5ff]/35 transition-all relative group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-tech">
                      <span className="text-base">{emotionObj?.emoji || '🌿'}</span>
                      <span className="text-[#82e5ff] font-bold">{entry.date} · {entry.time}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="text-white capitalize font-medium">
                        {emotionObj?.label || entry.dominantEmotion}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 font-tech text-[11px]">
                      <span className="text-[#b4c0d9]">
                        Flexibilidade: <strong className="text-[#82e5ff]">{entry.psychologicalFlexibilityScore}%</strong>
                      </span>
                      <span className="text-[#b4c0d9]">
                        Autonomia: <strong className="text-[#ec9eff]">{entry.autonomyScore}%</strong>
                      </span>
                      {onDeleteLog && (
                        <button
                          type="button"
                          onClick={() => onDeleteLog(entry.id)}
                          title="Excluir este registro"
                          className="text-[#b4c0d9] hover:text-red-400 p-1 rounded-lg hover:bg-[#130169] transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {entry.predominantNeed && (
                    <div className="text-[11px] text-[#82e5ff] font-tech">
                      <strong className="text-[#02bbff]">Necessidade prioritária:</strong> {entry.predominantNeed}
                    </div>
                  )}

                  {entry.microActionDone && (
                    <div className="text-[#e1eefc] bg-[#130169]/40 p-2.5 rounded-lg border border-[#02bbff]/20">
                      <strong className="text-[#82e5ff] font-tech uppercase text-[10px] block mb-0.5">Ação Realizada:</strong> {entry.microActionDone}
                    </div>
                  )}

                  {entry.notes && (
                    <div className="text-[#ec9eff] font-signature text-sm">
                      &ldquo;{entry.notes}&rdquo;
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

