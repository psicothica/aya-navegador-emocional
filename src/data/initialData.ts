import { PBATLogEntry, ChoicePointRecord } from '../types/therapy';

// Clean initial states: The application never presumes or invents patient data.
// The patient registers their own real experiences and metrics.
export const INITIAL_PBAT_LOGS: PBATLogEntry[] = [];
export const INITIAL_CHOICE_POINTS: ChoicePointRecord[] = [];

// Illustrative reference examples (only for patient orientation/help guides, never inserted into user history)
export const ILLUSTRATIVE_PBAT_EXAMPLE: PBATLogEntry = {
  id: 'ref-pbat-example',
  date: '2026-10-15',
  time: '21:30',
  responses: {
    variacao: 60,
    retencao_dificuldade: 40,
    cognicao_atrapalhou: 45,
    atencao_presente: 65,
    afeto_gama: 60,
    motivacao_cedeu: 35,
    conexao_sociocultural: 70,
    cuidado_biofisiologico: 60
  },
  dominantEmotion: 'tranquilo',
  predominantNeed: 'Exemplo: Imposição de limites saudáveis e descanso sem culpa',
  microActionDone: 'Exemplo: Disse não com firmeza e gentileza para uma demanda extra',
  notes: 'Exemplo de anotação: O desconforto da culpa apareceu, mas sustentei a escolha.',
  psychologicalFlexibilityScore: 68,
  autonomyScore: 65,
  retentionScore: 60,
  defusionScore: 55
};

