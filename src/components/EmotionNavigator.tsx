import React, { useState } from 'react';
import { 
  Activity, 
  Anchor, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Check, 
  Clock, 
  ChevronRight, 
  Heart, 
  Zap, 
  AlertCircle,
  Wind,
  X,
  HelpCircle,
  Edit3,
  Compass
} from 'lucide-react';
import { EMOTIONS_MATRIX } from '../data/emotionsMatrix';
import { EmotionId, EmotionProfile } from '../types/therapy';
import { BreathingExercise } from './BreathingExercise';
import { WordRepetitionTool } from './WordRepetitionTool';
import { StruggleSwitchTool } from './StruggleSwitchTool';

interface EmotionNavigatorProps {
  onSendToChoicePoint?: (prefill: {
    situation: string;
    emotion: string;
    hookThought: string;
    action: string;
    value: string;
    helper: string;
  }) => void;
}

export const EmotionNavigator: React.FC<EmotionNavigatorProps> = ({ onSendToChoicePoint }) => {
  const [selectedEmotionId, setSelectedEmotionId] = useState<EmotionId>('tristeza_letargia');
  const [activePillarTab, setActivePillarTab] = useState<number>(0);
  const [aceStep, setAceStep] = useState<number>(0);
  const [activeModalTool, setActiveModalTool] = useState<'none' | 'breathing' | 'wrt' | 'struggle'>('none');
  
  // Patient's own values selection (multi-select) - starts as user's own choice
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [customValueInput, setCustomValueInput] = useState('');

  // Patient's own typed thought - starts clean
  const [patientThought, setPatientThought] = useState('');
  const [showThoughtExamples, setShowThoughtExamples] = useState(false);

  // Patient's own typed micro-action - starts clean
  const [patientMicroAction, setPatientMicroAction] = useState('');
  const [showMicroStepExamples, setShowMicroStepExamples] = useState(false);
  const [microStepMinutes, setMicroStepMinutes] = useState(5);

  // Micro step timer
  const [microTimerActive, setMicroTimerActive] = useState(false);
  const [microTimerSeconds, setMicroTimerSeconds] = useState(300);
  const [microStepCompleted, setMicroStepCompleted] = useState(false);

  // Close modals on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalTool('none');
      }
    };
    if (activeModalTool !== 'none') {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalTool]);

  const selectedProfile: EmotionProfile = 
    EMOTIONS_MATRIX.find((e) => e.id === selectedEmotionId) || EMOTIONS_MATRIX[0];

  // Update defaults when emotion changes - without assuming client values, thoughts or actions
  const handleSelectEmotion = (id: EmotionId) => {
    setSelectedEmotionId(id);
    setActivePillarTab(0);
    setMicroTimerActive(false);
    setMicroStepCompleted(false);
    setSelectedValues([]);
    setPatientThought('');
    setPatientMicroAction('');
  };

  // Toggle value selection
  const handleToggleValue = (val: string) => {
    setSelectedValues((prev) => {
      if (prev.includes(val)) {
        return prev.filter((v) => v !== val);
      }
      return [...prev, val];
    });
  };

  const handleAddCustomValue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customValueInput.trim()) return;
    const trimmed = customValueInput.trim();
    if (!selectedValues.includes(trimmed)) {
      setSelectedValues((prev) => [...prev, trimmed]);
    }
    setCustomValueInput('');
  };

  // Timer logic
  React.useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (microTimerActive && microTimerSeconds > 0) {
      interval = setInterval(() => {
        setMicroTimerSeconds((prev) => {
          if (prev <= 1) {
            setMicroTimerActive(false);
            setMicroStepCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [microTimerActive, microTimerSeconds]);

  const handleStartMicroStep = () => {
    setMicroTimerSeconds(microStepMinutes * 60);
    setMicroTimerActive(true);
    setMicroStepCompleted(false);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendToChoicePoint = () => {
    if (onSendToChoicePoint) {
      onSendToChoicePoint({
        situation: `Momento de ${selectedProfile.emoji} ${selectedProfile.name}`,
        emotion: `${selectedProfile.emoji} ${selectedProfile.name}`,
        hookThought: patientThought.trim() || 'Pensamento notado pelo paciente',
        action: patientMicroAction.trim() || 'Micro-ação definida pelo paciente',
        value: selectedValues.join(', ') || selectedProfile.primaryValueDomain,
        helper: selectedProfile.strategies.regulacaoEmocional.title
      });
    }
  };

  const pillars = [
    {
      id: 0,
      title: '1. Fisiologia & Ação Oposta',
      subtitle: 'O corpo comanda primeiro',
      icon: Activity
    },
    {
      id: 1,
      title: '2. Lançar Âncora & Valores',
      subtitle: 'Aterramento no presente',
      icon: Anchor
    },
    {
      id: 2,
      title: '3. Aceitação da Realidade',
      subtitle: 'Desliga a briga inútil',
      icon: ShieldCheck
    },
    {
      id: 3,
      title: '4. Desarmar Pensamentos',
      subtitle: 'Seus pensamentos em foco',
      icon: Sparkles
    },
    {
      id: 4,
      title: '5. Minha Micro-Ação Prática',
      subtitle: 'Ação no mundo real',
      icon: Zap
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header section with washi-tape banner */}
      <div className="relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-tech text-[#02bbff] mb-1">
              <span>ESTADO ATUAL DO CIRCUITO</span>
              <span aria-hidden="true" className="text-slate-600">/</span>
              <span>PRÁTICA CLÍNICA INTEGRADA</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
              Bússola de <span className="text-[#ce57df] glow-magenta">Navegação Emocional</span>
            </h2>
          </div>

          {/* Washi Tape Banner */}
          <div className="washi-tape px-4 py-1.5 text-xs self-start sm:self-auto rotate-[-1deg] border border-[#0f142a]/30 shadow-md">
            <span className="font-analog font-bold text-base sm:text-lg tracking-wider text-[#0f142a]">
              sinta a dor e aja mesmo assim, apesar dela
            </span>
          </div>
        </div>
        <p className="text-xs text-[#e1eefc]/70 mt-1 max-w-2xl">
          Selecione o estado biológico e emocional que tomou conta de você agora. Escolha seus próprios valores, escreva seus pensamentos reais e defina sua própria micro-ação.
        </p>

        {/* Emotion Switcher Tabs with Emojis */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-4">
          {EMOTIONS_MATRIX.map((emotion) => {
            const isSelected = emotion.id === selectedEmotionId;
            return (
              <button
                key={emotion.id}
                type="button"
                onClick={() => handleSelectEmotion(emotion.id)}
                className={`p-3.5 rounded-xl border text-left transition-all relative ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#130169] to-[#0f142a] border-[#02bbff] shadow-[0_0_15px_rgba(2,187,255,0.3)] ring-1 ring-[#02bbff]'
                    : 'bg-[#0f142a]/80 border-[#82e5ff]/15 hover:bg-[#130169]/30 hover:border-[#82e5ff]/35'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-lg">{emotion.emoji}</span>
                  <span className={`text-xs font-bold line-clamp-1 ${isSelected ? 'text-[#82e5ff]' : 'text-white'}`}>
                    {emotion.name.split(',')[0]}
                  </span>
                </div>
                <div className="text-[11px] font-tech text-[#ec9eff] line-clamp-1 mt-1 opacity-80 pl-6">
                  {emotion.primaryValueDomain}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Emotion Overview Banner with Emoji */}
      <div className="glass-panel rounded-2xl p-6 border border-[#82e5ff]/20 shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#82e5ff]/15">
          <div className="flex items-start gap-3">
            <span className="text-3xl sm:text-4xl p-2 bg-[#130169]/60 rounded-2xl border border-[#02bbff]/30 shadow-sm shrink-0">
              {selectedProfile.emoji}
            </span>
            <div>
              <div className="flex items-center gap-2 text-xs font-tech text-[#ce57df] mb-1">
                <span>{selectedProfile.tagline}</span>
                <span aria-hidden="true" className="text-[#82e5ff]/40">·</span>
                <span className="text-[#82e5ff]">FOCO: {selectedProfile.primaryValueDomain.toUpperCase()}</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                {selectedProfile.name}
              </h3>
            </div>
          </div>

          {/* Quick SOS Tool Buttons in Header with Soft Slow Neurobiological Regulation */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveModalTool('breathing')}
              className="px-4 py-2 text-xs font-tech font-bold text-[#82e5ff] bg-gradient-to-r from-[#01366d] via-[#130169] to-[#01366d] hover:from-[#02295b] hover:to-[#422774] border border-[#02bbff]/50 rounded-xl transition-all duration-1000 ease-in-out flex items-center gap-2 whitespace-nowrap shadow-[0_0_20px_rgba(2,187,255,0.25)] animate-pulse-slow cursor-pointer"
              title="Iniciar regulação neurobiológica guiada em ritmo suave e lento"
            >
              <Wind className="w-4 h-4 text-[#02bbff]" />
              <span>Regulação Neurobiológica (Respiração)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveModalTool('wrt')}
              className="px-3.5 py-1.5 text-xs font-tech font-semibold text-[#ec9eff] bg-[#422774]/50 hover:bg-[#422774] border border-[#ce57df]/40 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ce57df]" />
              <span>Desarmar Palavra (35s)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveModalTool('struggle')}
              className="px-3.5 py-1.5 text-xs font-tech font-semibold text-[#82e5ff] bg-[#02295b]/60 hover:bg-[#02295b] border border-[#02bbff]/40 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#02bbff]" />
              <span>Interruptor de Luta</span>
            </button>
          </div>
        </div>

        {/* Network & Away Moves Breakdown */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Somatic */}
          <div className="p-4 rounded-xl bg-[#04223d]/70 border border-[#82e5ff]/20">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-tech font-bold text-[#82e5ff] uppercase tracking-wider">
                O que acontece no seu corpo:
              </span>
              <span className="font-tech text-xs text-[#ce57df]">fisiologia</span>
            </div>
            <p className="text-[#e1eefc]/80 leading-relaxed mb-3">
              {selectedProfile.networkState}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {selectedProfile.somaticManifestations.map((som, idx) => (
                <span
                  key={idx}
                  className="inline-block px-2 py-0.5 bg-[#0f142a] border border-[#82e5ff]/25 rounded text-[11px] text-[#e1eefc]/90 font-mono"
                >
                  {som}
                </span>
              ))}
            </div>
          </div>

          {/* Away Moves Warning */}
          <div className="p-4 rounded-xl bg-[#422774]/30 border border-[#ce57df]/35">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-tech font-bold text-[#ce57df] uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-[#ce57df]" />
                Armadilhas: Onde o impulso quer te jogar (Afastamento)
              </span>
            </div>
            <div className="space-y-2 text-[#e1eefc]/90 mt-2">
              <div>
                <strong className="text-[#ec9eff] font-tech text-[11px]">NA CABEÇA:</strong>{' '}
                <span className="text-[#e1eefc]/80">{selectedProfile.awayMoves.covert.join(' · ')}</span>
              </div>
              <div>
                <strong className="text-[#ec9eff] font-tech text-[11px]">NO CORPO (O IMPULSO DE FUGA):</strong>{' '}
                <span className="text-[#e1eefc]/80">{selectedProfile.awayMoves.overt.join(' · ')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Pillar Sequential Roadmap */}
      <div className="glass-panel rounded-2xl p-6 border border-[#82e5ff]/20 shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
        <div className="pb-3 border-b border-[#82e5ff]/15 flex items-center justify-between">
          <div>
            <span className="text-xs font-tech text-[#ce57df] font-semibold uppercase">
              Roteiro de Práticas Integradas
            </span>
            <h4 className="font-display text-base font-bold text-white mt-0.5">
              5 Etapas para Virar a Frequência sem Mentir pra Si Mesmo
            </h4>
          </div>
          <span className="text-xs font-tech text-[#82e5ff] font-bold">
            Passo {activePillarTab + 1}/5
          </span>
        </div>

        {/* Step Tabs Horizontal */}
        <div className="flex items-center gap-2 py-3 overflow-x-auto no-scrollbar border-b border-[#82e5ff]/10">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            const isActive = activePillarTab === pillar.id;
            return (
              <button
                key={pillar.id}
                type="button"
                onClick={() => setActivePillarTab(pillar.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#b104dc] to-[#130169] text-white border border-[#ce57df] shadow-[0_0_12px_rgba(206,87,223,0.4)]'
                    : 'text-[#e1eefc]/70 hover:text-white bg-[#0f142a]/80 border border-[#82e5ff]/15 hover:border-[#82e5ff]/40'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#82e5ff]' : 'text-[#ce57df]'}`} />
                <span>{pillar.title}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Tab Body */}
        <div className="pt-5">
          {/* Pillar 1: Regulação Fisiológica */}
          {activePillarTab === 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-tech text-[#82e5ff]">
                <span>ETAPA 01 // REGULAÇÃO FISIOLÓGICA</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>O corpo envia sinais ao cérebro antes da razão</span>
              </div>

              <div className="p-5 rounded-xl bg-gradient-to-br from-[#130169]/50 to-[#04223d]/60 border border-[#02bbff]/30 space-y-3">
                <div className="flex items-start justify-between">
                  <h5 className="font-display text-base font-bold text-white">
                    {selectedProfile.strategies.regulacaoEmocional.title}
                  </h5>
                  <span className="washi-tape-magenta px-2 py-0.5 text-[10px] font-tech font-bold uppercase rounded-xs">
                    Ação Oposta
                  </span>
                </div>

                <p className="text-xs text-[#e1eefc] leading-relaxed">
                  {selectedProfile.strategies.regulacaoEmocional.physiologyTip}
                </p>

                <div className="p-3.5 bg-[#0f142a]/80 rounded-lg border border-[#82e5ff]/20">
                  <span className="text-xs font-tech font-bold text-[#82e5ff] block mb-1.5 uppercase">
                    Comportamento Motor Recomendado:
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#e1eefc]/90 list-disc list-inside">
                    {selectedProfile.strategies.regulacaoEmocional.actionOppositeSteps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-[#422774]/40 rounded-lg border border-[#ce57df]/30 text-xs text-[#ec9eff] flex items-start gap-2.5">
                  <Heart className="w-4 h-4 text-[#ce57df] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white font-tech">Por que funciona:</strong>{' '}
                    {selectedProfile.strategies.regulacaoEmocional.neurobiologicalRationale}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-between items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveModalTool('breathing')}
                  className="px-5 py-2.5 text-xs font-tech font-bold text-[#82e5ff] bg-gradient-to-r from-[#01366d] via-[#130169] to-[#01366d] hover:from-[#02295b] hover:to-[#422774] border border-[#02bbff]/50 rounded-xl transition-all duration-1000 ease-in-out flex items-center gap-2.5 shadow-[0_0_20px_rgba(2,187,255,0.3)] animate-pulse-slow cursor-pointer"
                >
                  <Wind className="w-4 h-4 text-[#02bbff]" />
                  <span>Regulação Neurobiológica: Iniciar Respiração Guiada</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActivePillarTab(1)}
                  className="px-4 py-2 text-xs font-tech font-bold text-white bg-gradient-to-r from-[#b104dc] to-[#130169] border border-[#ce57df]/50 rounded-lg transition-all flex items-center gap-1.5 hover:shadow-[0_0_12px_rgba(206,87,223,0.4)]"
                >
                  <span>Avançar: Presença & Valores</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Pillar 2: Orientação Atencional & Bússola de Valores com Múltipla Escolha e Recomendações Dinâmicas */}
          {activePillarTab === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-tech text-[#82e5ff]">
                <span>ETAPA 02 // ATERRAMENTO ATENCIONAL & VALORES PESSOAIS</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>Escolha suas próprias direções de vida</span>
              </div>

              <div className="p-5 rounded-xl bg-gradient-to-br from-[#04223d]/60 to-[#130169]/50 border border-[#02bbff]/30 space-y-5">
                <div>
                  <h5 className="font-display text-base font-bold text-white mb-1">
                    {selectedProfile.strategies.orientacao.title}
                  </h5>
                  <p className="text-xs text-[#e1eefc]/90 leading-relaxed">
                    {selectedProfile.strategies.orientacao.attentionGuide}
                  </p>
                </div>

                {/* Dropping Anchor Interactive Exercise */}
                <div className="p-4 bg-[#0f142a]/90 rounded-xl border border-[#82e5ff]/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-tech text-xs font-bold text-[#82e5ff] uppercase flex items-center gap-1.5">
                      <Anchor className="w-4 h-4 text-[#02bbff]" />
                      Exercício de Presença: Lançar Âncora (ACE)
                    </span>
                    <span className="font-tech text-xs text-[#ce57df]">
                      Passo {aceStep + 1}/3
                    </span>
                  </div>

                  {aceStep === 0 && (
                    <div className="p-3.5 bg-[#130169]/40 rounded-lg border border-[#82e5ff]/20 text-xs space-y-2">
                      <strong className="text-[#82e5ff] font-tech text-xs block">
                        A // RECONHEÇA (Acknowledge):
                      </strong>
                      <p className="text-[#e1eefc]/90 leading-relaxed">
                        Feche os olhos por 10 segundos. Admita a verdade: &ldquo;Estou sentindo {selectedProfile.name.toLowerCase()} e o corpo está reagindo&rdquo;. Não tente forçar positividade. Apenas reconheça a sensação presente.
                      </p>
                      <button
                        type="button"
                        onClick={() => setAceStep(1)}
                        className="mt-2 px-3.5 py-1.5 bg-[#02bbff] hover:bg-[#82e5ff] text-[#0f142a] rounded-lg text-xs font-tech font-bold transition-all"
                      >
                        Reconhecido. Próximo: Reconectar ao Corpo
                      </button>
                    </div>
                  )}

                  {aceStep === 1 && (
                    <div className="p-3.5 bg-[#130169]/40 rounded-lg border border-[#82e5ff]/20 text-xs space-y-2">
                      <strong className="text-[#82e5ff] font-tech text-xs block">
                        C // CONECTE AO CORPO (Come back):
                      </strong>
                      <p className="text-[#e1eefc]/90 leading-relaxed">
                        Pressione a sola dos pés contra o chão. Sinta o corpo firme. Endireite as costas, mova os dedos das mãos, respire fundo. Mesmo com o desconforto, você tem um corpo sob seu comando voluntário.
                      </p>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setAceStep(2)}
                          className="px-3.5 py-1.5 bg-[#02bbff] hover:bg-[#82e5ff] text-[#0f142a] rounded-lg text-xs font-tech font-bold transition-all"
                        >
                          Conectado. Próximo: Envolver no Presente
                        </button>
                        <button
                          type="button"
                          onClick={() => setAceStep(0)}
                          className="px-3 py-1.5 text-xs text-[#82e5ff] hover:bg-[#02bbff]/10 rounded-lg"
                        >
                          Voltar
                        </button>
                      </div>
                    </div>
                  )}

                  {aceStep === 2 && (
                    <div className="p-3.5 bg-[#130169]/40 rounded-lg border border-[#82e5ff]/20 text-xs space-y-2">
                      <strong className="text-[#82e5ff] font-tech text-xs block">
                        E // ENGAJE NO AMBIENTE (Engage):
                      </strong>
                      <p className="text-[#e1eefc]/90 leading-relaxed">
                        Olhe ao redor na sala. Identifique 3 objetos com clareza. Ouça os sons imediatos. Sinta a temperatura do ar. A tempestade mental não é o mundo real: você está aqui, presente e capaz de agir.
                      </p>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setAceStep(0)}
                          className="px-3.5 py-1.5 bg-[#ce57df] hover:bg-[#ec9eff] text-white rounded-lg text-xs font-tech font-bold transition-all flex items-center gap-1 shadow-[0_0_12px_rgba(206,87,223,0.4)]"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Âncora Lançada com Sucesso</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Values Compass with Interactive Multi-Choice Selection */}
                <div className="p-4 bg-[#0f142a]/95 rounded-xl border border-[#ce57df]/35 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-tech text-xs font-bold text-[#ce57df] uppercase flex items-center gap-1.5">
                        <Compass className="w-4 h-4 text-[#ce57df]" />
                        Sua Bússola de Valores: Escolha o que você quer honrar hoje
                      </span>
                      <p className="text-[11px] text-[#e1eefc]/70 mt-0.5">
                        Marque uma ou mais direções que fazem sentido para você, ou digite seu valor próprio:
                      </p>
                    </div>
                  </div>

                  {/* Multi-choice options */}
                  <div className="flex flex-wrap gap-2">
                    {selectedProfile.strategies.orientacao.suggestedValues.map((val) => {
                      const isSelected = selectedValues.includes(val);
                      return (
                        <button
                          key={val}
                          type="button"
                          onClick={() => handleToggleValue(val)}
                          className={`px-3 py-1.5 text-xs rounded-xl font-medium transition-all flex items-center gap-1.5 border ${
                            isSelected
                              ? 'bg-gradient-to-r from-[#ce57df] to-[#130169] text-white border-[#ce57df] shadow-[0_0_10px_rgba(206,87,223,0.4)] font-bold'
                              : 'bg-[#130169]/40 text-[#82e5ff] border-[#02bbff]/30 hover:border-[#82e5ff]'
                          }`}
                        >
                          <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border text-[9px] ${
                            isSelected ? 'bg-white text-[#0f142a] border-white' : 'border-[#02bbff]/50'
                          }`}>
                            {isSelected && '✓'}
                          </div>
                          <span>{val}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom value input */}
                  <form onSubmit={handleAddCustomValue} className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      value={customValueInput}
                      onChange={(e) => setCustomValueInput(e.target.value)}
                      placeholder="Adicionar outro valor pessoal (ex: Honestidade, Família...)"
                      className="flex-1 text-xs px-3 py-1.5 bg-[#0f142a] text-white border border-[#82e5ff]/25 rounded-lg focus:outline-none focus:border-[#02bbff]"
                    />
                    <button
                      type="submit"
                      disabled={!customValueInput.trim()}
                      className="px-3 py-1.5 bg-[#02bbff] hover:bg-[#82e5ff] disabled:opacity-40 text-[#0f142a] rounded-lg text-xs font-tech font-bold transition-all"
                    >
                      + Inserir
                    </button>
                  </form>

                  {/* If no value selected yet */}
                  {selectedValues.length === 0 && (
                    <div className="p-3.5 bg-[#130169]/30 rounded-xl border border-[#02bbff]/25 text-xs text-[#82e5ff] flex items-center gap-2.5">
                      <Compass className="w-4 h-4 text-[#02bbff] shrink-0" />
                      <span>
                        Selecione acima as alternativas de valores que você deseja honrar hoje (ou insira seu próprio valor pessoal) para visualizar recomendações específicas, dicas e observações clínicas.
                      </span>
                    </div>
                  )}

                  {/* Dynamic Recommendations Based on Selected Values */}
                  {selectedValues.length > 0 && (
                    <div className="space-y-2.5 pt-2 border-t border-[#82e5ff]/15">
                      <span className="font-tech text-xs font-bold text-[#82e5ff] uppercase block">
                        Recomendações Específicas para os Valores que Você Selecionou:
                      </span>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {selectedValues.map((val) => {
                          const advice = selectedProfile.strategies.orientacao.valueRecommendations?.[val];
                          return (
                            <div key={val} className="p-3 bg-[#130169]/40 rounded-xl border border-[#02bbff]/20 text-xs space-y-1">
                              <div className="flex items-center gap-1.5 font-tech font-bold text-[#ce57df]">
                                <span>⭐</span>
                                <span>{val}</span>
                              </div>
                              <p className="text-[#e1eefc]/90 text-[11px] leading-relaxed">
                                {advice ? advice.tip : 'Honrar este valor significa agir com compromisso consigo mesmo mesmo quando o desconforto aparece.'}
                              </p>
                              <div className="text-[11px] text-[#82e5ff] bg-[#0f142a]/80 p-2 rounded-lg border border-[#82e5ff]/20 mt-1">
                                <strong>Sugestão prática:</strong> {advice ? advice.behaviorPrompt : 'Escolha uma micro-ação alinhada a esse valor.'}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setActivePillarTab(0)}
                  className="px-4 py-2 text-xs font-tech text-[#82e5ff] hover:bg-[#130169]/40 rounded-lg"
                >
                  Anterior
                </button>
                <button
                  type="button"
                  onClick={() => setActivePillarTab(2)}
                  className="px-4 py-2 text-xs font-tech font-bold text-white bg-gradient-to-r from-[#b104dc] to-[#130169] border border-[#ce57df]/50 rounded-lg transition-all flex items-center gap-1.5"
                >
                  <span>Avançar: Aceitação da Realidade</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Pillar 3: Aceitação da Realidade */}
          {activePillarTab === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-tech text-[#82e5ff]">
                <span>ETAPA 03 // O INTERRUPTOR DE LUTA</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>Aceitação da Realidade Externa e Sensações Internas</span>
              </div>

              <div className="p-5 rounded-xl bg-gradient-to-br from-[#130169]/50 to-[#422774]/40 border border-[#ce57df]/30 space-y-4">
                <div className="flex items-start justify-between">
                  <h5 className="font-display text-base font-bold text-white">
                    {selectedProfile.strategies.aceitacaoRealidade.title}
                  </h5>
                  <span className="font-tech text-xs text-[#82e5ff]">
                    abertura e espaço interno
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
                  <div className="p-3.5 bg-[#0f142a]/90 rounded-xl border border-[#82e5ff]/20 space-y-1.5">
                    <strong className="text-[#82e5ff] font-tech text-xs block uppercase">
                      Aceitação dos Fatos Já Ocorridos:
                    </strong>
                    <p className="text-[#e1eefc]/85 leading-relaxed">
                      {selectedProfile.strategies.aceitacaoRealidade.radicalAcceptance}
                    </p>
                  </div>
                  <div className="p-3.5 bg-[#0f142a]/90 rounded-xl border border-[#ce57df]/25 space-y-1.5">
                    <strong className="text-[#ce57df] font-tech text-xs block uppercase">
                      Acolhimento das Emoções Presentes:
                    </strong>
                    <p className="text-[#e1eefc]/85 leading-relaxed">
                      {selectedProfile.strategies.aceitacaoRealidade.experientialAcceptance}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-[#02295b]/60 rounded-lg border border-[#02bbff]/30 text-xs text-[#82e5ff] flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#02bbff] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white font-tech">Regra essencial:</strong>{' '}
                    {selectedProfile.strategies.aceitacaoRealidade.struggleSwitchNote}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setActiveModalTool('struggle')}
                  className="px-4 py-2 text-xs font-tech font-bold text-[#82e5ff] bg-[#01366d] hover:bg-[#02295b] border border-[#02bbff]/40 rounded-lg transition-all flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Simulador do Interruptor</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActivePillarTab(3)}
                  className="px-4 py-2 text-xs font-tech font-bold text-white bg-gradient-to-r from-[#b104dc] to-[#130169] border border-[#ce57df]/50 rounded-lg transition-all flex items-center gap-1.5"
                >
                  <span>Avançar: Meus Pensamentos</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Pillar 4: Desarmar Pensamentos com Campo para o Próprio Pensamento do Paciente */}
          {activePillarTab === 3 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-tech text-[#82e5ff]">
                <span>ETAPA 04 // DESARMAR OS PENSAMENTOS DA SUA MENTE</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>O sistema não adivinha seus pensamentos: você escreve o seu</span>
              </div>

              <div className="p-5 rounded-xl bg-gradient-to-br from-[#422774]/40 to-[#04223d]/60 border border-[#ce57df]/30 space-y-4">
                <div>
                  <h5 className="font-display text-base font-bold text-white">
                    {selectedProfile.strategies.desfusaoCognitiva.title}
                  </h5>
                  <p className="text-xs text-[#e1eefc]/90 leading-relaxed mt-0.5">
                    {selectedProfile.strategies.desfusaoCognitiva.defusionMechanism}
                  </p>
                </div>

                {/* Patient's Own Thought Input */}
                <div className="p-4 bg-[#0f142a]/95 rounded-xl border border-[#ce57df]/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-tech text-xs font-bold text-[#ce57df] uppercase flex items-center gap-1.5">
                      <Edit3 className="w-4 h-4 text-[#ce57df]" />
                      Qual é o pensamento exato que sua mente está te dizendo agora?
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowThoughtExamples(!showThoughtExamples)}
                      className="text-[11px] font-tech text-[#82e5ff] hover:underline flex items-center gap-1"
                    >
                      <HelpCircle className="w-3 h-3" />
                      <span>{showThoughtExamples ? 'Ocultar exemplos' : 'Ver exemplos de inspiração'}</span>
                    </button>
                  </div>

                  <textarea
                    rows={2}
                    value={patientThought}
                    onChange={(e) => setPatientThought(e.target.value)}
                    placeholder="Digite com suas próprias palavras (ex: 'Não vou dar conta de entregar isso a tempo', 'Sou um fracasso', 'Ele fez de propósito')..."
                    className="w-full text-xs p-3 bg-[#0f142a] text-white border border-[#82e5ff]/30 rounded-xl focus:outline-none focus:border-[#02bbff] focus:ring-1 focus:ring-[#02bbff]"
                  />

                  {/* Illustrative Examples Collapsible Drawer */}
                  {showThoughtExamples && (
                    <div className="p-3 bg-[#130169]/50 rounded-xl border border-[#02bbff]/20 text-xs space-y-2">
                      <span className="font-tech text-[11px] font-bold text-[#82e5ff] uppercase block">
                        Exemplos ilustrativos comuns (apenas para inspiração, não são seus):
                      </span>
                      <div className="space-y-1.5">
                        {selectedProfile.strategies.desfusaoCognitiva.thoughtExamples.map((ex, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between p-2 bg-[#0f142a]/80 rounded-lg text-[11px] text-[#e1eefc]/80 border border-[#82e5ff]/10"
                          >
                            <span>{ex}</span>
                            <button
                              type="button"
                              onClick={() => setPatientThought(ex.replace(/"/g, ''))}
                              className="text-[10px] font-tech text-[#02bbff] hover:underline shrink-0 ml-2"
                            >
                              Usar como base
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Dynamic 3-Level Distancing with the Patient's Own Thought */}
                  {patientThought.trim() && (
                    <div className="p-3.5 bg-[#130169]/30 rounded-xl border border-[#82e5ff]/20 space-y-2 text-xs pt-3">
                      <span className="font-tech text-[11px] font-bold text-[#82e5ff] block uppercase">
                        Como Desarmar Esse Pensamento Específico em 3 Passos:
                      </span>
                      <div className="p-2 bg-[#422774]/30 rounded-lg text-[#ec9eff] border border-[#ce57df]/20 font-mono text-[11px]">
                        <span className="text-[#ce57df] font-bold">1. Acreditando cego:</span> &ldquo;{patientThought}&rdquo;
                      </div>
                      <div className="p-2 bg-[#01366d]/30 rounded-lg text-[#82e5ff] border border-[#02bbff]/20 font-mono text-[11px]">
                        <span className="text-[#02bbff] font-bold">2. Notando a mente:</span> &ldquo;Estou tendo o pensamento de que {patientThought.toLowerCase()}&rdquo;
                      </div>
                      <div className="p-2 bg-[#130169]/60 rounded-lg text-white border border-[#02bbff]/40 font-mono text-[11px]">
                        <span className="text-[#82e5ff] font-bold">3. Distanciamento livre:</span> &ldquo;Percebo que minha mente está me oferecendo a história de que {patientThought.toLowerCase()}, mas eu ainda decido o que fazer com meu corpo.&rdquo;
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setActiveModalTool('wrt')}
                  className="px-4 py-2 text-xs font-tech font-bold text-[#ec9eff] bg-[#422774]/60 hover:bg-[#422774] border border-[#ce57df]/40 rounded-lg transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Desarmar Palavra no WRT (35s)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActivePillarTab(4)}
                  className="px-4 py-2 text-xs font-tech font-bold text-white bg-gradient-to-r from-[#b104dc] to-[#130169] border border-[#ce57df]/50 rounded-lg transition-all flex items-center gap-1.5"
                >
                  <span>Avançar: Minha Micro-Ação</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Pillar 5: Minha Micro-Ação Prática com Campo Escrito pelo Paciente */}
          {activePillarTab === 4 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-tech text-[#82e5ff]">
                <span>ETAPA 05 // MINHA MICRO-AÇÃO CONCRETA</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>Você define a ação; o sistema traz apenas exemplos para inspirar</span>
              </div>

              <div className="p-5 rounded-xl bg-gradient-to-br from-[#130169]/70 to-[#04223d]/80 border border-[#02bbff]/40 space-y-4">
                <div>
                  <h5 className="font-display text-base font-bold text-white mb-1">
                    {selectedProfile.strategies.exposicaoAtivacao.title}
                  </h5>
                  <p className="text-xs text-[#e1eefc]/90 leading-relaxed">
                    {selectedProfile.strategies.exposicaoAtivacao.behaviorIndependentOfMood}
                  </p>
                </div>

                {/* Patient's Own Written Micro-Action */}
                <div className="p-4 bg-[#0f142a]/95 rounded-xl border border-[#ce57df]/40 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="font-tech text-xs font-bold text-[#ce57df] uppercase flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-[#ce57df]" />
                      Qual micro-passo concreto você escolhe fazer agora?
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowMicroStepExamples(!showMicroStepExamples)}
                      className="text-[11px] font-tech text-[#82e5ff] hover:underline flex items-center gap-1"
                    >
                      <HelpCircle className="w-3 h-3" />
                      <span>{showMicroStepExamples ? 'Ocultar exemplos' : 'Ver exemplos de micro-ações'}</span>
                    </button>
                  </div>

                  <input
                    type="text"
                    value={patientMicroAction}
                    onChange={(e) => setPatientMicroAction(e.target.value)}
                    placeholder="Escreva sua micro-ação de 3 a 10 min (ex: 'Lavar os 3 copos na pia', 'Escrever 2 linhas da resposta')..."
                    className="w-full text-xs px-3.5 py-2.5 bg-[#0f142a] text-white border border-[#02bbff]/40 rounded-xl focus:outline-none focus:border-[#82e5ff]"
                  />

                  {/* Illustrative Micro-Step Examples Drawer */}
                  {showMicroStepExamples && (
                    <div className="p-3 bg-[#130169]/50 rounded-xl border border-[#02bbff]/20 text-xs space-y-2">
                      <span className="font-tech text-[11px] font-bold text-[#82e5ff] uppercase block">
                        Exemplos de como fatiar em ações viáveis (apenas para inspiração):
                      </span>
                      <div className="space-y-1.5">
                        {selectedProfile.strategies.exposicaoAtivacao.microStepExamples.map((ex, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between p-2 bg-[#0f142a]/80 rounded-lg text-[11px] text-[#e1eefc]/80 border border-[#82e5ff]/10"
                          >
                            <span>• {ex}</span>
                            <button
                              type="button"
                              onClick={() => setPatientMicroAction(ex)}
                              className="text-[10px] font-tech text-[#02bbff] hover:underline shrink-0 ml-2"
                            >
                              Copiar para meu campo
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                    <span className="text-[#e1eefc]/70 font-tech">Duração estimada:</span>
                    <div className="flex items-center gap-1.5">
                      {[3, 5, 10, 15].map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => {
                            setMicroStepMinutes(m);
                            setMicroTimerSeconds(m * 60);
                          }}
                          className={`px-2.5 py-1 text-xs font-tech rounded-lg border transition-all ${
                            microStepMinutes === m
                              ? 'bg-[#02bbff] text-[#0f142a] font-bold border-[#02bbff]'
                              : 'bg-[#130169]/50 text-[#82e5ff] border-[#82e5ff]/20'
                          }`}
                        >
                          {m} min
                        </button>
                      ))}
                    </div>
                  </div>

                  <p className="text-[11px] text-[#e1eefc]/70 font-tech pt-1">
                    Regra da viabilidade mínima: dimensione para algo tão pequeno que seja impossível falhar, mesmo sob desânimo ou medo máximo.
                  </p>

                  {/* Interactive Timer Controls */}
                  <div className="pt-3 border-t border-[#82e5ff]/15 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleStartMicroStep}
                        disabled={!patientMicroAction.trim() && !microTimerActive}
                        className={`px-4 py-2 rounded-lg text-xs font-tech font-bold transition-all flex items-center gap-1.5 whitespace-nowrap disabled:opacity-50 ${
                          microTimerActive
                            ? 'bg-[#b104dc] text-white hover:bg-[#ce57df] shadow-[0_0_15px_rgba(206,87,223,0.4)]'
                            : 'bg-[#02bbff] text-[#0f142a] hover:bg-[#82e5ff] shadow-[0_0_15px_rgba(2,187,255,0.4)]'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>{microTimerActive ? 'Reiniciar Cronômetro' : 'Iniciar Meu Micro-Passo'}</span>
                      </button>

                      {microTimerActive && (
                        <span className="text-lg font-mono font-bold text-white tabular-nums glow-cyan">
                          {formatTimer(microTimerSeconds)}
                        </span>
                      )}

                      {microStepCompleted && (
                        <span className="text-xs font-tech font-bold text-[#82e5ff] flex items-center gap-1">
                          <Check className="w-4 h-4 text-[#02bbff]" />
                          MICRO-PASSO CUMPRIDO! PARABÉNS PELA CORAGEM.
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={handleSendToChoicePoint}
                      className="px-4 py-2 text-xs font-tech font-bold text-white bg-gradient-to-r from-[#b104dc] to-[#130169] border border-[#ce57df]/50 rounded-lg hover:from-[#ce57df] transition-all flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-[#82e5ff]" />
                      <span>Registrar no Ponto de Escolha</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Personal quote in signature font */}
              <div className="pt-3 flex justify-between items-center text-xs">
                <button
                  type="button"
                  onClick={() => setActivePillarTab(3)}
                  className="text-[#82e5ff] hover:underline font-tech"
                >
                  Etapa anterior
                </button>
                <div className="font-signature text-base text-[#ec9eff] tracking-wide">
                  &ldquo;{selectedProfile.clinicalQuote}&rdquo;
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Auxiliary Modals for SOS tools with Fixed, High-Z Close Button */}
      {activeModalTool !== 'none' && (
        <div 
          onClick={(e) => { if (e.target === e.currentTarget) setActiveModalTool('none'); }}
          className="fixed inset-0 z-50 bg-[#0f142a]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          {/* Floating close button on backdrop top right */}
          <button
            type="button"
            onClick={() => setActiveModalTool('none')}
            aria-label="Fechar pop-up"
            className="fixed top-4 right-4 z-50 flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#130169] text-[#82e5ff] hover:text-white hover:bg-[#ce57df] border border-[#02bbff]/60 shadow-[0_0_15px_rgba(2,187,255,0.4)] transition-all cursor-pointer font-tech text-xs font-bold"
          >
            <X className="w-4 h-4 text-[#ce57df]" />
            <span>Fechar (ESC)</span>
          </button>

          <div className="w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0f142a] border border-[#ce57df]/50 shadow-[0_25px_70px_rgba(0,0,0,0.9)] p-5 sm:p-7 relative">
            {/* Modal top header with prominent close button */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#82e5ff]/20">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#02bbff] animate-ping" />
                <span className="text-xs font-tech font-bold text-[#82e5ff] uppercase tracking-wide">
                  {activeModalTool === 'breathing' && 'Regulação Neurobiológica // Respiração Guiada'}
                  {activeModalTool === 'wrt' && 'Desfusão de Palavra // 35 Segundos'}
                  {activeModalTool === 'struggle' && 'Simulador do Interruptor de Luta'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalTool('none')}
                aria-label="Fechar janela"
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#130169] text-[#82e5ff] hover:text-white hover:bg-[#ce57df] border border-[#02bbff]/40 shadow-md text-xs font-tech font-bold transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
                <span>Fechar</span>
              </button>
            </div>

            {activeModalTool === 'breathing' && (
              <BreathingExercise 
                onComplete={() => setActiveModalTool('none')} 
                onClose={() => setActiveModalTool('none')}
              />
            )}

            {activeModalTool === 'wrt' && (
              <WordRepetitionTool
                initialWord={
                  selectedEmotionId === 'tristeza_letargia'
                    ? 'Incapaz'
                    : selectedEmotionId === 'vergonha_culpa'
                    ? 'Fracasso'
                    : selectedEmotionId === 'ansiedade_medo'
                    ? 'Catástrofe'
                    : 'Injustiça'
                }
              />
            )}

            {activeModalTool === 'struggle' && (
              <StruggleSwitchTool />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
