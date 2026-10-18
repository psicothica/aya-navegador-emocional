export type EmotionId = 
  | 'tristeza_letargia'
  | 'ansiedade_medo'
  | 'vergonha_culpa'
  | 'raiva_frustracao'
  | 'sobrecarga_burnout';

export interface ValueAdvice {
  tip: string;
  behaviorPrompt: string;
}

export interface EmotionStrategy {
  regulacaoEmocional: {
    title: string;
    physiologyTip: string;
    actionOpposite: string;
    actionOppositeSteps: string[];
    neurobiologicalRationale: string;
  };
  orientacao: {
    title: string;
    attentionGuide: string;
    valuesDirection: string;
    suggestedValues: string[];
    valueRecommendations?: Record<string, ValueAdvice>;
  };
  aceitacaoRealidade: {
    title: string;
    radicalAcceptance: string;
    experientialAcceptance: string;
    struggleSwitchNote: string;
  };
  desfusaoCognitiva: {
    title: string;
    defusionMechanism: string;
    syntacticDistancingExample: string;
    reframeSentence: string;
    thoughtExamples: string[];
  };
  exposicaoAtivacao: {
    title: string;
    microStepAction: string;
    durationMinutes: number;
    behaviorIndependentOfMood: string;
    feasibilityRule: string;
    microStepExamples: string[];
  };
}

export interface EmotionProfile {
  id: EmotionId;
  name: string;
  emoji: string;
  tagline: string;
  networkState: string;
  somaticManifestations: string[];
  awayMoves: {
    covert: string[]; // encobertos: ruminação, preocupação
    overt: string[];  // manifestos: isolamento, cama, esquiva
  };
  strategies: EmotionStrategy;
  clinicalQuote: string;
  primaryValueDomain: string;
}

export interface PBATItemResponse {
  variacao: number; // 0-100 "Eu consegui mudar meu comportamento quando a mudança ajudou minha vida"
  retencao_dificuldade: number; // 0-100 (invertido) "Eu tive dificuldade de me manter fazendo coisas que eram boas para mim"
  cognicao_atrapalhou: number; // 0-100 (invertido) "Meu modo de pensar atrapalhou coisas que eram importantes para mim"
  atencao_presente: number; // 0-100 "Eu prestei atenção em coisas importantes no meu dia-a-dia"
  afeto_gama: number; // 0-100 "Capacidade de experienciar uma gama de emoções apropriadas ao momento"
  motivacao_cedeu: number; // 0-100 (invertido) "Eu fiz coisas apenas porque cedi ao que os outros queriam que eu fizesse"
  conexao_sociocultural: number; // 0-100 "Ações que fortaleceram a intimidade e o vínculo com pessoas significativas"
  cuidado_biofisiologico: number; // 0-100 "Cuidei do meu organismo (sono, respiração, movimento ou nutrição)"
}

export interface PBATLogEntry {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  responses: PBATItemResponse;
  dominantEmotion: EmotionId | 'outra' | 'tranquilo';
  predominantNeed: string;
  microActionDone?: string;
  notes?: string;
  psychologicalFlexibilityScore: number; // calculado (0-100)
  autonomyScore: number; // 100 - motivacao_cedeu
  retentionScore: number; // 100 - retencao_dificuldade
  defusionScore: number; // 100 - cognicao_atrapalhou
}

export interface ChoicePointRecord {
  id: string;
  timestamp: number;
  date: string; // YYYY-MM-DD
  time: string;
  situation: string; // Situação externa + gatilho
  hooks: {
    thoughts: string[];
    emotions: string[];
    sensations: string[];
  };
  choiceType: 'toward' | 'away';
  awayMovement?: {
    covert: string; // ex: ruminar no passado
    overt: string;  // ex: deitar na cama com celular
    cost: string;   // consequência a médio prazo
  };
  towardMovement?: {
    action: string; // micro-passo manifesto
    value: string;  // valor que guia a ação
    helperStrategy: string; // ex: 'Lançar Âncora (ACE)', 'Ação Oposta', etc.
    durationMinutes: number;
  };
  reflection: string;
  sharedWithTherapist: boolean;
}

export interface PsychoeducationArticle {
  id: string;
  title: string;
  category: 'Fundamentos Integrados' | 'Processos Centrais' | 'Ativação & Hábitos' | 'Ponto de Escolha';
  readTime: string;
  abstract: string;
  keyPoints: string[];
  sections: {
    heading: string;
    text: string;
    clinicalTakeaway?: string;
  }[];
}
