import React, { useState } from 'react';
import { 
  Split, 
  ArrowLeft, 
  ArrowRight, 
  Video, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  Trash2, 
  Share2, 
  Clock, 
  Tag
} from 'lucide-react';
import { ChoicePointRecord } from '../types/therapy';

interface ChoicePointProps {
  records: ChoicePointRecord[];
  onAddRecord: (record: ChoicePointRecord) => void;
  onDeleteRecord: (id: string) => void;
  onToggleShare: (id: string) => void;
  prefillData?: {
    situation: string;
    emotion: string;
    hookThought: string;
    action: string;
    value: string;
    helper: string;
  } | null;
  onClearPrefill?: () => void;
}

export const ChoicePointInteractive: React.FC<ChoicePointProps> = ({
  records,
  onAddRecord,
  onDeleteRecord,
  onToggleShare,
  prefillData,
  onClearPrefill
}) => {
  const [isFormOpen, setIsFormOpen] = useState(Boolean(prefillData));
  const [filterType, setFilterType] = useState<'all' | 'toward' | 'away'>('all');

  // Form State
  const [situation, setSituation] = useState(prefillData?.situation || '');
  const [erroForm, setErroForm] = useState<string | null>(null);
  const [hookThoughts, setHookThoughts] = useState(prefillData?.hookThought || '');
  const [hookEmotions, setHookEmotions] = useState(prefillData?.emotion || '');
  const [hookSensations, setHookSensations] = useState('');
  
  const [choiceType, setChoiceType] = useState<'toward' | 'away'>('toward');
  
  // Toward details
  const [towardAction, setTowardAction] = useState(prefillData?.action || '');
  const [towardValue, setTowardValue] = useState(prefillData?.value || '');
  const [helperStrategy, setHelperStrategy] = useState(prefillData?.helper || 'Lançar Âncora (ACE)');
  const [durationMinutes, setDurationMinutes] = useState(5);

  // Away details
  const [awayCovert, setAwayCovert] = useState('');
  const [awayOvert, setAwayOvert] = useState('');
  const [awayCost, setAwayCost] = useState('');

  const [reflection, setReflection] = useState('');
  const [videoCameraVerified, setVideoCameraVerified] = useState(false);

  React.useEffect(() => {
    if (prefillData) {
      setSituation(prefillData.situation);
      setHookThoughts(prefillData.hookThought);
      setHookEmotions(prefillData.emotion);
      setTowardAction(prefillData.action);
      setTowardValue(prefillData.value);
      setHelperStrategy(prefillData.helper);
      setIsFormOpen(true);
    }
  }, [prefillData]);

  const helperOptions = [
    'Lançar Âncora (ACE)',
    'Ação Oposta à Emoção',
    'Desarmar Pensamentos (Notar a História / WRT)',
    'Aceitação da Realidade (Radical & Experiencial)',
    'Soothing Autonômico / Suspiro Fisiológico',
    'Regra dos 5 Minutos (Viabilidade Mínima)'
  ];

  const valueSuggestions = [
    'Vitalidade e Autocuidado',
    'Coragem e Enfrentamento',
    'Autenticidade sem Máscaras',
    'Conexão com Quem Importa',
    'Competência e Responsabilidade',
    'Autonomia e Limites Saudáveis',
    'Serenidade e Fogo Controlado'
  ];

  const handleSubmit = () => {
    if (!situation.trim()) {
      setErroForm('Descreva a situação para salvar o registro.');
      return;
    }
    if (choiceType === 'toward' && !towardAction.trim()) {
      setErroForm('Escreva a ação simples que você escolheu executar.');
      return;
    }
    setErroForm(null);

    const newRecord: ChoicePointRecord = {
      id: `cp-${Date.now()}`,
      timestamp: Date.now(),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      situation: situation.trim(),
      hooks: {
        thoughts: hookThoughts ? hookThoughts.split(',').map((s) => s.trim()) : [],
        emotions: hookEmotions ? hookEmotions.split(',').map((s) => s.trim()) : [],
        sensations: hookSensations ? hookSensations.split(',').map((s) => s.trim()) : []
      },
      choiceType,
      towardMovement: choiceType === 'toward' ? {
        action: towardAction.trim() || 'Micro-ação mantida',
        value: towardValue.trim() || 'Autocuidado',
        helperStrategy,
        durationMinutes: Number(durationMinutes) || 5
      } : undefined,
      awayMovement: choiceType === 'away' ? {
        covert: awayCovert.trim() || 'Ruminação interna',
        overt: awayOvert.trim() || 'Esquiva / Isolamento',
        cost: awayCost.trim() || 'Aumento do sofrimento secundário'
      } : undefined,
      reflection: reflection.trim(),
      sharedWithTherapist: true
    };

    onAddRecord(newRecord);
    setIsFormOpen(false);
    if (onClearPrefill) onClearPrefill();

    // Reset
    setSituation('');
    setHookThoughts('');
    setHookEmotions('');
    setHookSensations('');
    setTowardAction('');
    setTowardValue('');
    setAwayCovert('');
    setAwayOvert('');
    setAwayCost('');
    setReflection('');
    setVideoCameraVerified(false);
  };

  const filteredRecords = records.filter((r) => {
    if (filterType === 'all') return true;
    return r.choiceType === filterType;
  });

  return (
    <div className="space-y-6">
      {/* Title & Action Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-tech text-[#ec9eff] mb-1">
            <span>MAPEAMENTO DO PONTO DE ESCOLHA</span>
            <span aria-hidden="true" className="text-slate-600">/</span>
            <span>A ENCRUZILHADA DO COMPORTAMENTO</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
            Mapeador do <span className="text-[#02bbff] glow-cyan">Ponto de Escolha</span>
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="px-5 py-2.5 bg-gradient-to-r from-[#02bbff] to-[#130169] hover:from-[#82e5ff] text-white rounded-xl text-xs font-tech font-bold transition-all shadow-[0_0_15px_rgba(2,187,255,0.3)] flex items-center gap-2 self-start sm:self-auto border border-[#02bbff]/50"
        >
          <Plus className="w-4 h-4" />
          <span>{isFormOpen ? 'Fechar Mapeamento' : 'Novo Ponto de Escolha'}</span>
        </button>
      </div>

      {/* Visual Canvas Diagram of the Choice Point */}
      <div className="glass-panel rounded-2xl p-6 border border-[#82e5ff]/20 shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
        <div className="pb-3 border-b border-[#82e5ff]/15 flex items-center justify-between">
          <span className="font-tech text-xs font-bold text-[#82e5ff] uppercase">
            A Anatomia da Decisão em Alta Frequência
          </span>
          <div className="washi-tape px-2 py-0.5 text-[10px] font-analog font-bold text-[#0f142a]">
            Você pilota ou é atropelado pelo impulso
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          {/* Left Wing: Away Moves */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#422774]/40 to-[#0f142a] border border-[#ce57df]/40 text-xs space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-[#ec9eff] font-display font-bold text-sm uppercase">
                <ArrowLeft className="w-4 h-4 text-[#ec9eff]" />
                <span>Movimentos de Afastamento (Away)</span>
              </div>
              <p className="text-[#b4c0d9] leading-relaxed mt-2">
                O piloto automático toma o controle. A mente inventa desculpas, você se esconde, cancela, enrola ou rumina. Alívio de 5 minutos, inferno de 5 semanas.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-tech text-[#ec9eff] space-y-1 border-t border-[#ce57df]/20">
              <div>• <strong>Encobertos:</strong> Ruminar, autoataque, &ldquo;amanhã eu faço&rdquo;</div>
              <div>• <strong>Manifestos:</strong> Ficar na cama, fugir de conversas, celular infinito</div>
            </div>
          </div>

          {/* Center: The Situation & Hooks */}
          <div className="p-5 rounded-xl bg-[#0f142a]/90 border border-[#82e5ff]/30 text-center space-y-3 flex flex-col items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#b104dc] to-[#02bbff] text-white flex items-center justify-center font-bold text-xs shadow-[0_0_15px_rgba(206,87,223,0.5)]">
              <Split className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-display font-bold text-sm text-white uppercase">
                A Situação & Os Ganchos
              </div>
              <p className="text-[11px] text-[#b4c0d9] mt-1">
                O gatilho dispara. Sensações físicas e pensamentos puxam você como um anzol afiado.
              </p>
            </div>
            <div className="p-2 bg-[#130169]/60 rounded-lg border border-[#02bbff]/40 text-[11px] font-tech text-[#82e5ff]">
              GANCHOS: &ldquo;Não dou conta&rdquo; · Taquicardia · Culpa
            </div>
          </div>

          {/* Right Wing: Toward Moves */}
          <div className="p-4 rounded-xl bg-gradient-to-bl from-[#01366d]/40 to-[#0f142a] border border-[#02bbff]/40 text-xs space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-end gap-1.5 text-[#02bbff] font-display font-bold text-sm uppercase">
                <span>Movimentos de Aproximação (Toward)</span>
                <ArrowRight className="w-4 h-4 text-[#02bbff]" />
              </div>
              <p className="text-[#b4c0d9] leading-relaxed mt-2 text-right">
                Ação comprometida de coragem. Você carrega o medo, o peso ou a vergonha na mochila e executa o micro-passo que honra os seus valores.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-tech text-[#82e5ff] space-y-1 text-right border-t border-[#02bbff]/20">
              <div>• <strong>Helpers:</strong> Âncora ACE, Ação Oposta, WRT 35s</div>
              <div>• <strong>Micro-passo:</strong> 5 a 10 min de movimento real</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recording Form in Cyber Glass */}
      {isFormOpen && (
        <div className="glass-panel-accent rounded-2xl p-6 border border-[#ce57df]/40 shadow-[0_15px_50px_rgba(0,0,0,0.5)] space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#ce57df]/20">
            <h3 className="font-display text-lg font-bold text-white uppercase">
              Registrar Encruzilhada Atual
            </h3>
            <span className="font-tech text-xs text-[#82e5ff] bg-[#130169]/80 px-2.5 py-1 rounded-md border border-[#02bbff]/40">
              4 MOVIMENTOS OPERACIONAIS
            </span>
          </div>

          {/* Movement 1 & 2: Spot and Name Hooks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-tech font-bold text-[#82e5ff] mb-1 uppercase">
                1. A Situação (Onde você estava? O que aconteceu?):
              </label>
              <textarea
                rows={2}
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                aria-required="true"
                placeholder="Ex: Recebi uma cobrança no trabalho e o coração disparou..."
                className="w-full text-xs p-3 bg-[#0f142a]/90 text-white border border-[#82e5ff]/20 rounded-xl focus:outline-none focus:border-[#02bbff] focus:ring-1 focus:ring-[#02bbff]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-tech font-bold text-[#ec9eff] uppercase">
                  2. Seus Pensamentos Reais (O que a sua mente disse?):
                </label>
              </div>
              <textarea
                rows={2}
                value={hookThoughts}
                onChange={(e) => setHookThoughts(e.target.value)}
                placeholder="Escreva com suas próprias palavras o pensamento que te pegou..."
                className="w-full text-xs p-3 bg-[#0f142a]/90 text-white border border-[#ce57df]/25 rounded-xl focus:outline-none focus:border-[#ce57df] focus:ring-1 focus:ring-[#ce57df]"
              />
              <span className="text-[10px] text-[#b4c0d9] font-tech">
                💡 O sistema nunca assume um pensamento como seu: registre suas palavras reais.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-tech text-[#b4c0d9] mb-1">
                Emoções em ebulição:
              </label>
              <input
                type="text"
                value={hookEmotions}
                onChange={(e) => setHookEmotions(e.target.value)}
                placeholder="Ex: Pânico, raiva explosiva, vergonha aguda..."
                className="w-full text-xs px-3 py-2 bg-[#0f142a]/90 text-white border border-[#82e5ff]/20 rounded-xl focus:border-[#02bbff]"
              />
            </div>

            <div>
              <label className="block text-xs font-tech text-[#b4c0d9] mb-1">
                Sensações corporais (biofísica):
              </label>
              <input
                type="text"
                value={hookSensations}
                onChange={(e) => setHookSensations(e.target.value)}
                placeholder="Ex: Taquicardia, mandíbula travada, queimação no peito..."
                className="w-full text-xs px-3 py-2 bg-[#0f142a]/90 text-white border border-[#82e5ff]/20 rounded-xl focus:border-[#02bbff]"
              />
            </div>
          </div>

          {/* Movement 3 & 4: Ask Question & Choose */}
          <div className="pt-2 border-t border-[#82e5ff]/15">
            <label className="block font-tech text-xs font-bold text-white mb-2 uppercase">
              3 & 4. Sua Decisão no Ponto de Escolha:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setChoiceType('toward')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  choiceType === 'toward'
                    ? 'bg-[#01366d]/50 border-[#02bbff] shadow-[0_0_15px_rgba(2,187,255,0.3)] ring-1 ring-[#02bbff]'
                    : 'bg-[#0f142a]/80 border-[#82e5ff]/15 hover:border-[#82e5ff]/30'
                }`}
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#82e5ff]">
                  <CheckCircle2 className="w-4 h-4 text-[#02bbff]" />
                  <span>Movimento de Aproximação (Toward)</span>
                </div>
                <p className="text-[11px] text-[#b4c0d9] mt-1">
                  Ação com disposição guiada por valores, carregando o desconforto.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setChoiceType('away')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  choiceType === 'away'
                    ? 'bg-[#422774]/50 border-[#ce57df] shadow-[0_0_15px_rgba(206,87,223,0.3)] ring-1 ring-[#ce57df]'
                    : 'bg-[#0f142a]/80 border-[#ce57df]/20 hover:border-[#ce57df]/40'
                }`}
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#ec9eff]">
                  <AlertTriangle className="w-4 h-4 text-[#ec9eff]" />
                  <span>Movimento de Afastamento (Away)</span>
                </div>
                <p className="text-[11px] text-[#b4c0d9] mt-1">
                  Cedi ao impulso de esquiva (registrado com consciência, sem autoflagelo).
                </p>
              </button>
            </div>
          </div>

          {/* Toward Details */}
          {choiceType === 'toward' ? (
            <div className="p-4 rounded-xl bg-[#01366d]/30 border border-[#02bbff]/30 space-y-4 text-xs">
              <div>
                <label className="block font-tech font-bold text-[#82e5ff] mb-1 uppercase">
                  Sua Micro-Ação Concreta (escrita por você, no mundo real):
                </label>
                <input
                  type="text"
                  value={towardAction}
                  onChange={(e) => setTowardAction(e.target.value)}
                  aria-required={choiceType === 'toward'}
                  placeholder="Escreva a ação simples que você escolheu executar (ex: 'Lavei 3 copos na pia', 'Enviei o e-mail curto')..."
                  className="w-full text-xs px-3.5 py-2.5 bg-[#0f142a] text-white border border-[#02bbff]/40 rounded-xl focus:outline-none focus:border-[#82e5ff]"
                />
                <span className="text-[10px] text-[#b4c0d9] font-tech">
                  💡 Defina sua própria ação viável; os exemplos servem apenas como referência didática.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-tech text-[#b4c0d9] mb-1">
                    Valor escolhido (bússola):
                  </label>
                  <input
                    type="text"
                    value={towardValue}
                    onChange={(e) => setTowardValue(e.target.value)}
                    placeholder="Ex: Coragem e Autonomia"
                    className="w-full text-xs px-3 py-2 bg-[#0f142a] text-white border border-[#82e5ff]/20 rounded-xl"
                  />
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {valueSuggestions.slice(0, 3).map((v) => (
                      <button
                        type="button"
                        key={v}
                        onClick={() => setTowardValue(v)}
                        className="text-[10px] text-[#82e5ff] bg-[#130169]/80 border border-[#02bbff]/30 px-1.5 py-0.5 rounded"
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-tech text-[#b4c0d9] mb-1">
                    Estratégia Auxiliar (Helper):
                  </label>
                  <select
                    value={helperStrategy}
                    onChange={(e) => setHelperStrategy(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-[#0f142a] text-white border border-[#82e5ff]/20 rounded-xl"
                  >
                    {helperOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#0f142a]">{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-tech text-[#b4c0d9] mb-1">
                    Duração da ação (min):
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={120}
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(Number(e.target.value))}
                    className="w-full text-xs px-3 py-2 bg-[#0f142a] text-white border border-[#82e5ff]/20 rounded-xl font-mono tabular-nums"
                  />
                </div>
              </div>

              {/* Video Camera Test */}
              <div className="p-3 bg-[#0f142a]/80 rounded-xl border border-[#02bbff]/30 flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="cameraCheckPsicothica"
                  checked={videoCameraVerified}
                  onChange={(e) => setVideoCameraVerified(e.target.checked)}
                  className="mt-0.5 text-[#02bbff] rounded focus:ring-[#02bbff]"
                />
                <label htmlFor="cameraCheckPsicothica" className="text-[11px] text-[#b4c0d9] cursor-pointer">
                  <strong className="text-[#82e5ff] flex items-center gap-1 font-tech uppercase">
                    <Video className="w-3.5 h-3.5 text-[#02bbff]" />
                    Teste da Câmera de Vídeo (Sem enganação):
                  </strong>
                  Confirmo que uma câmera gravando o cômodo veria meu corpo físico executando essa ação de verdade (não foi só pensar positivo sentado no sofá).
                </label>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-[#422774]/30 border border-[#ce57df]/30 space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-tech font-bold text-[#ec9eff] mb-1 uppercase">
                    O que rolou na mente? (Encoberto):
                  </label>
                  <input
                    type="text"
                    value={awayCovert}
                    onChange={(e) => setAwayCovert(e.target.value)}
                    placeholder="Ex: Fiquei ruminando que nunca dou certo..."
                    className="w-full text-xs px-3 py-2 bg-[#0f142a] text-white border border-[#ce57df]/30 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-tech font-bold text-[#ec9eff] mb-1 uppercase">
                    O que seu corpo fez? (Manifesto):
                  </label>
                  <input
                    type="text"
                    value={awayOvert}
                    onChange={(e) => setAwayOvert(e.target.value)}
                    placeholder="Ex: Fiquei 2h rolando feed do celular na cama..."
                    className="w-full text-xs px-3 py-2 bg-[#0f142a] text-white border border-[#ce57df]/30 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-tech text-[#b4c0d9] mb-1">
                  Qual foi o custo real dessa esquiva?
                </label>
                <input
                  type="text"
                  value={awayCost}
                  onChange={(e) => setAwayCost(e.target.value)}
                  placeholder="Ex: Culpa no fim da tarde e o trabalho acumulou em dobro..."
                  className="w-full text-xs px-3 py-2 bg-[#0f142a] text-white border border-[#ce57df]/30 rounded-xl"
                />
              </div>

              <div className="washi-tape-magenta px-2.5 py-1 text-[11px] font-tech text-white rounded-xs">
                Nota: Registrar o Away Move sem se chicotear é o que impede a espiral de culpa secundária.
              </div>
            </div>
          )}

          {/* Reflection */}
          <div>
            <label className="block text-xs font-tech text-[#b4c0d9] mb-1">
              Reflexão ou bilhete cru para levar à sessão:
            </label>
            <textarea
              rows={2}
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="O que você descobriu sobre como seu cérebro tenta te passar a perna?"
              className="w-full text-xs p-3 bg-[#0f142a]/90 text-white border border-[#82e5ff]/20 rounded-xl focus:border-[#02bbff]"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            {erroForm && (
              <p role="alert" className="mr-auto text-xs font-tech text-[#ffd6d6]">
                {erroForm}
              </p>
            )}
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
              className="px-5 py-2.5 bg-gradient-to-r from-[#b104dc] to-[#130169] hover:brightness-110 text-white text-xs font-tech font-bold rounded-xl border border-[#ce57df] shadow-[0_0_15px_rgba(206,87,223,0.3)] transition-all"
            >
              Salvar Registro
            </button>
          </div>
        </div>
      )}

      {/* History of Choice Points */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#82e5ff]/15">
          <div className="flex items-center gap-2">
            <h3 className="font-display text-sm font-bold text-white uppercase">
              Registros no Radar ({filteredRecords.length})
            </h3>
            <span className="font-tech text-xs text-[#82e5ff]">
              {records.filter(r => r.choiceType === 'toward').length} Toward / {records.filter(r => r.choiceType === 'away').length} Away
            </span>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-[#130169]/40 border border-[#82e5ff]/20 rounded-xl">
            <button
              type="button"
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 text-xs font-tech font-semibold rounded-lg transition-colors ${
                filterType === 'all' ? 'bg-[#02bbff] text-[#0f142a]' : 'text-[#82e5ff] hover:text-white'
              }`}
            >
              Todos
            </button>
            <button
              type="button"
              onClick={() => setFilterType('toward')}
              className={`px-3 py-1 text-xs font-tech font-semibold rounded-lg transition-colors ${
                filterType === 'toward' ? 'bg-[#02bbff] text-[#0f142a]' : 'text-[#82e5ff] hover:text-white'
              }`}
            >
              Aproximação
            </button>
            <button
              type="button"
              onClick={() => setFilterType('away')}
              className={`px-3 py-1 text-xs font-tech font-semibold rounded-lg transition-colors ${
                filterType === 'away' ? 'bg-[#b104dc] text-white' : 'text-[#ec9eff] hover:text-white'
              }`}
            >
              Afastamento
            </button>
          </div>
        </div>

        {filteredRecords.length === 0 ? (
          <div className="p-8 text-center glass-panel rounded-2xl border border-[#82e5ff]/20">
            <p className="text-xs text-[#b4c0d9] font-tech">Nenhuma bifurcação encontrada para este filtro.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredRecords.map((rec) => {
              const isToward = rec.choiceType === 'toward';
              return (
                <div
                  key={rec.id}
                  className="glass-panel rounded-xl p-4 border border-[#82e5ff]/15 hover:border-[#82e5ff]/35 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-tech text-[#b4c0d9]">
                        <span className="text-[#82e5ff]">{rec.date} · {rec.time}</span>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span className={`font-bold ${isToward ? 'text-[#02bbff] glow-cyan' : 'text-[#ce57df] glow-magenta'}`}>
                          {isToward ? 'TOWARD (APROXIMAÇÃO)' : 'AWAY (AFASTAMENTO)'}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white">
                        {rec.situation}
                      </h4>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => onToggleShare(rec.id)}
                        title={rec.sharedWithTherapist ? 'Marcado para a sessão' : 'Marcar para a sessão'}
                        className={`p-1.5 rounded-lg text-xs transition-colors ${
                          rec.sharedWithTherapist
                            ? 'text-[#82e5ff] bg-[#130169] border border-[#02bbff]/50'
                            : 'text-[#b4c0d9] hover:text-white hover:bg-[#130169]/30'
                        }`}
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteRecord(rec.id)}
                        className="p-1.5 text-[#b4c0d9] hover:text-[#ec9eff] hover:bg-[#422774]/30 rounded-lg transition-colors"
                        title="Excluir registro"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Hooks block */}
                  <div className="p-2.5 bg-[#0f142a]/80 rounded-lg text-xs space-y-1 border border-[#82e5ff]/10">
                    <span className="font-tech text-[#ec9eff] text-[10px] uppercase font-bold block">Ganchos Notados:</span>
                    {rec.hooks.thoughts.length > 0 && (
                      <div className="text-[#b4c0d9]">
                        <strong className="text-white">Pensamentos:</strong> {rec.hooks.thoughts.join(', ')}
                      </div>
                    )}
                    {rec.hooks.emotions.length > 0 && (
                      <div className="text-[#b4c0d9]">
                        <strong className="text-white">Emoções:</strong> {rec.hooks.emotions.join(', ')}
                      </div>
                    )}
                  </div>

                  {/* Choice Details */}
                  {isToward && rec.towardMovement ? (
                    <div className="p-2.5 bg-[#01366d]/40 rounded-lg border border-[#02bbff]/30 text-xs space-y-1.5">
                      <div className="text-white font-medium">
                        <strong className="text-[#82e5ff]">Micro-Ação:</strong> {rec.towardMovement.action}
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-[11px] font-tech text-[#82e5ff]">
                        <span>Valor: {rec.towardMovement.value}</span>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span>Helper: {rec.towardMovement.helperStrategy}</span>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span>{rec.towardMovement.durationMinutes} min</span>
                      </div>
                    </div>
                  ) : rec.awayMovement ? (
                    <div className="p-2.5 bg-[#422774]/40 rounded-lg border border-[#ce57df]/30 text-xs space-y-1">
                      <div className="text-white">
                        <strong className="text-[#ec9eff]">Afastamento:</strong> {rec.awayMovement.overt}
                      </div>
                      {rec.awayMovement.cost && (
                        <div className="text-[11px] font-tech text-[#ec9eff]">
                          Custo: {rec.awayMovement.cost}
                        </div>
                      )}
                    </div>
                  ) : null}

                  {rec.reflection && (
                    <div className="text-xs text-[#ec9eff] pt-1 border-t border-[#82e5ff]/10 font-signature text-sm">
                      &ldquo;{rec.reflection}&rdquo;
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
