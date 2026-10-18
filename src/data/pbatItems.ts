import { PBATItemResponse } from '../types/therapy';

export interface PBATQuestionMeta {
  key: keyof PBATItemResponse;
  dimension: string;
  eemmDomain: 'Comportamento' | 'Cognição' | 'Atenção' | 'Afeto' | 'Motivação' | 'Sociocultural' | 'Biofisiológico';
  label: string;
  polarity: 'positive' | 'inverted';
  clinicalMeaning: string;
  lowPrompt: string; // 0%
  highPrompt: string; // 100%
  tipForPatient: string;
}

export const PBAT_QUESTIONS: PBATQuestionMeta[] = [
  {
    key: 'variacao',
    dimension: 'Variação Comportamental',
    eemmDomain: 'Comportamento',
    label: 'Eu consegui mudar meu comportamento quando a mudança ajudou minha vida.',
    polarity: 'positive',
    clinicalMeaning: 'Avalia a plasticidade para abandonar a rigidez e testar novas ações funcionais.',
    lowPrompt: 'Totalmente rígido / Repeti o mesmo padrão que não funciona',
    highPrompt: 'Flexível / Consegui agir de forma nova e construtiva',
    tipForPatient: 'Você testou algo diferente do piloto automático hoje?'
  },
  {
    key: 'retencao_dificuldade',
    dimension: 'Retenção & Consolidação de Hábitos',
    eemmDomain: 'Comportamento',
    label: 'Eu tive dificuldade de me manter fazendo coisas que eram boas para mim.',
    polarity: 'inverted',
    clinicalMeaning: 'Identifica falhas na retenção de hábitos funcionais ao longo do tempo.',
    lowPrompt: 'Mantive a consistência em tudo o que me faz bem',
    highPrompt: 'Tive extrema dificuldade de manter qualquer rotina benéfica',
    tipForPatient: 'Nota invertida: quanto menor esta nota de dificuldade, melhor foi sua persistência!'
  },
  {
    key: 'cognicao_atrapalhou',
    dimension: 'Cognição: Desfusão vs Fusão',
    eemmDomain: 'Cognição',
    label: 'Meu modo de pensar atrapalhou coisas que eram importantes para mim.',
    polarity: 'inverted',
    clinicalMeaning: 'Mede o grau de fusão cognitiva e razão causal inventada pela mente (reason-giving).',
    lowPrompt: 'Meus pensamentos não me paralisaram; usei a mente com utilidade',
    highPrompt: 'Fiquei preso em ruminações, cobranças e crenças paralisantes',
    tipForPatient: 'Nota invertida: indica se você comprou brigas com pensamentos ou se distanciou deles.'
  },
  {
    key: 'atencao_presente',
    dimension: 'Atenção: Orientação no Presente',
    eemmDomain: 'Atenção',
    label: 'Eu prestei atenção em coisas importantes no meu dia-a-dia.',
    polarity: 'positive',
    clinicalMeaning: 'Avalia a ancoragem no aqui-e-agora contra a viagem mental no tempo (ruminação/preocupação).',
    lowPrompt: 'Completamente distraído / No piloto automático / Ruminando',
    highPrompt: 'Presente, consciente e conectado com o momento real',
    tipForPatient: 'Você conseguiu notar o que acontecia ao seu redor e no seu corpo?'
  },
  {
    key: 'afeto_gama',
    dimension: 'Afeto: Abertura e Aceitação Emocional',
    eemmDomain: 'Afeto',
    label: 'Consegui vivenciar minhas emoções no momento apropriado sem lutar contra elas.',
    polarity: 'positive',
    clinicalMeaning: 'Mede a ausência de esquiva experiencial e o desligamento do interruptor de luta.',
    lowPrompt: 'Tentei sufocar, anestesiar ou fugir de qualquer desconforto',
    highPrompt: 'Abri espaço e acolhi minhas emoções com disposição e gentileza',
    tipForPatient: 'Desligar o interruptor de luta permite que a dor passe sem virar sofrimento crônico.'
  },
  {
    key: 'motivacao_cedeu',
    dimension: 'Motivação: Autonomia vs Complacência',
    eemmDomain: 'Motivação',
    label: 'Eu fiz coisas apenas porque cedi ao que os outros queriam que eu fizesse.',
    polarity: 'inverted',
    clinicalMeaning: 'Marcador essencial de risco de burnout e sentido por imposição (pliance).',
    lowPrompt: 'Agi por valores autênticos e escolhas livres próprias',
    highPrompt: 'Fiz tudo por submissão, obrigação ou medo de desapontar',
    tipForPatient: 'Nota invertida: fazer coisas por escolha livre protege sua energia vital.'
  },
  {
    key: 'conexao_sociocultural',
    dimension: 'Conexão Sociocultural & Vínculos',
    eemmDomain: 'Sociocultural',
    label: 'Ações que fortaleceram a intimidade e o vínculo com pessoas significativas.',
    polarity: 'positive',
    clinicalMeaning: 'Avalia repertórios interpessoais funcionais (coragem, intimidade, suporte).',
    lowPrompt: 'Fiquei isolado ou prejudiquei relações importantes',
    highPrompt: 'Nutri conexões genuínas, pedi ajuda ou fui honesto em vínculos',
    tipForPatient: 'Mesmo uma mensagem carinhosa ou conversa franca conta como conexão.'
  },
  {
    key: 'cuidado_biofisiologico',
    dimension: 'Nível Biofisiológico & Vitalidade',
    eemmDomain: 'Biofisiológico',
    label: 'Cuidei do meu organismo biológico (sono, descanso, hidratação, respiração ou movimento).',
    polarity: 'positive',
    clinicalMeaning: 'Regulação bottom-up que estabiliza o sistema nervoso central.',
    lowPrompt: 'Negligenciei sono, alimentação e limites do corpo',
    highPrompt: 'Honrei meu corpo com pausas, respiração, água e descanso',
    tipForPatient: 'O cérebro é um órgão biológico: cuidar da base física dá sustentação à mente.'
  }
];

export function calculatePbatScores(responses: PBATItemResponse) {
  // Positive items count directly
  const positiveSum = 
    responses.variacao + 
    responses.atencao_presente + 
    responses.afeto_gama + 
    responses.conexao_sociocultural + 
    responses.cuidado_biofisiologico;

  // Inverted items count as (100 - score)
  const invertedRetention = 100 - responses.retencao_dificuldade;
  const invertedDefusion = 100 - responses.cognicao_atrapalhou;
  const invertedAutonomy = 100 - responses.motivacao_cedeu;

  const totalEffective = positiveSum + invertedRetention + invertedDefusion + invertedAutonomy;
  const psychologicalFlexibilityScore = Math.round(totalEffective / 8);

  return {
    psychologicalFlexibilityScore,
    autonomyScore: invertedAutonomy,
    retentionScore: invertedRetention,
    defusionScore: invertedDefusion
  };
}
