import { EmotionProfile } from '../types/therapy';

export const EMOTIONS_MATRIX: EmotionProfile[] = [
  {
    id: 'tristeza_letargia',
    name: 'Tristeza, Peso e Letargia',
    emoji: '🌧️',
    tagline: 'Hipotonia corporal, inércia de rede e conservação de energia',
    networkState: 'A inércia mantém a desesperança e o cansaço alimentando o isolamento. A energia e o ânimo não chegam antes: eles surgem depois de romper o ponto inicial através da ação física.',
    somaticManifestations: [
      'Sensação de chumbo nos membros e peso no peito',
      'Olhar voltado para baixo e ombros caídos',
      'Respiração superficial e baixa tonicidade motora',
      'Desejo fisiológico intenso de deitar e recolher-se'
    ],
    awayMoves: {
      covert: [
        'Ruminação prolongada sobre perdas passadas ou erros',
        'Pensamentos do tipo "Qual o sentido?", "Não vai adiantar nada"',
        'Esperar ter ânimo ou vontade como pré-requisito para agir'
      ],
      overt: [
        'Permanecer na cama ou no sofá por horas a fio',
        'Isolamento social e cancelamento de compromissos',
        'Doom scrolling em redes sociais sem engajamento ativo',
        'Deixar tarefas básicas acumularem-se no ambiente'
      ]
    },
    strategies: {
      regulacaoEmocional: {
        title: 'Ação Oposta à Tristeza & Fisiologia',
        physiologyTip: 'Lave o rosto com água fria, beba um copo de água e abra as janelas para a luz natural.',
        actionOpposite: 'Adotar uma postura corporal ativa e aberta antes que qualquer vontade apareça.',
        actionOppositeSteps: [
          'Erga a coluna e abra os ombros deliberadamente',
          'Eleve suavemente o queixo e mantenha os olhos na linha do horizonte',
          'Inicie movimento motor simples nos primeiros 60 segundos'
        ],
        neurobiologicalRationale: 'O cérebro lê a postura física por propriocepção. Não espere sentir ânimo para se mexer: mexa-se para que o circuito dopaminérgico receba o sinal de início.'
      },
      orientacao: {
        title: 'Atenção Presente & Bússola de Valores',
        attentionGuide: 'Redirecione a atenção do passado ruminativo para o ambiente imediato através de 3 estímulos visuais e 2 auditivos presentes na sala.',
        valuesDirection: 'Selecione abaixo os valores que você escolhe honrar neste momento de desânimo:',
        suggestedValues: [
          'Vitalidade e Autocuidado',
          'Dignidade Pessoal',
          'Conexão com Quem Importa',
          'Responsabilidade Serena',
          'Coragem Pequena'
        ],
        valueRecommendations: {
          'Vitalidade e Autocuidado': {
            tip: 'Cuidar do seu organismo é um ato de respeito biológico, não um prêmio por estar feliz.',
            behaviorPrompt: 'Tome um banho morno consciente, beba água fresca ou coma algo nutritivo agora.'
          },
          'Dignidade Pessoal': {
            tip: 'Manter a cabeça erguida mesmo quando o corpo quer se arrastar sinaliza valor próprio.',
            behaviorPrompt: 'Troque o pijama por uma roupa limpa e arrume a cama, mesmo que continue cansado.'
          },
          'Conexão com Quem Importa': {
            tip: 'O isolamento parece seguro, mas aprofunda a dor. Você não precisa performar alegria para estar perto.',
            behaviorPrompt: 'Envie uma mensagem curta e sincera para alguém de confiança: "Estou em um dia difícil, mas pensando em você".'
          },
          'Responsabilidade Serena': {
            tip: 'Cumprir uma única obrigação mínima reduz a montanha de culpa que a depressão constrói.',
            behaviorPrompt: 'Escolha uma tarefa de 5 minutos (ex: responder um e-mail urgente ou tirar o lixo) e faça devagar.'
          },
          'Coragem Pequena': {
            tip: 'Coragem na tristeza não é fazer grandes feitos; é dar um único passo com o peso no peito.',
            behaviorPrompt: 'Coloque os tênis e dê uma volta rápida de 5 minutos até a esquina.'
          }
        }
      },
      aceitacaoRealidade: {
        title: 'Aceitação da Realidade (Fatos & Sensações)',
        radicalAcceptance: 'Reconheça a perda ou o cansaço atual como um fato do momento: o que já ocorreu não pode ser desfeito agora.',
        experientialAcceptance: 'Desligue o Interruptor de Luta contra a tristeza. Permita que a sensação de peso habite o corpo sem adicionar pânico secundário ("não deveria estar assim").',
        struggleSwitchNote: 'A tristeza é dor natural; lutar desesperadamente para não senti-la multiplica o sofrimento.'
      },
      desfusaoCognitiva: {
        title: 'Desarmar os Pensamentos da Inércia',
        defusionMechanism: 'Desmantele a regra automática: "Porque estou sem ânimo, não consigo fazer nada".',
        syntacticDistancingExample: 'Troque "Não consigo fazer nada" por "Noto que minha mente está me oferecendo a história da incapacidade para poupar energia".',
        reframeSentence: 'Agradeça à mente pelo aviso de cansaço, pegue essa história pela mão e dê o primeiro passo mesmo assim.',
        thoughtExamples: [
          '"Não adianta tentar, nada vai dar certo"',
          '"Estou sem energia nenhuma, amanhã eu faço"',
          '"Sou um fardo para todo mundo ao meu redor"',
          '"Para que levantar? Não tem sentido nenhum"',
          '"Todo mundo consegue ter uma vida normal, menos eu"'
        ]
      },
      exposicaoAtivacao: {
        title: 'Ação Independente do Humor',
        microStepAction: 'Defina e execute uma micro-ação de 5 minutos levando o peso junto com você.',
        durationMinutes: 5,
        behaviorIndependentOfMood: 'Não esperamos o desânimo sumir para caminhar; caminhamos com o desânimo na garupa.',
        feasibilityRule: 'Regra da viabilidade mínima: dimensione a ação tão pequena que seja impossível falhar, mesmo sob desânimo máximo.',
        microStepExamples: [
          'Calçar os tênis e caminhar até o portão de casa ou dar a volta no quarteirão',
          'Lavar 3 pratos que estão na pia da cozinha',
          'Abrir as cortinas do quarto para entrar luz solar e trocar de camiseta',
          'Beber um copo grande de água e regar uma planta',
          'Escrever 3 frases sobre como estou me sentindo agora'
        ]
      }
    },
    clinicalQuote: 'A ativação não é sobre sentir alegria imediata; é sobre não abandonar a sua própria vida no quarto escuro.',
    primaryValueDomain: 'Vitalidade e Autocuidado'
  },
  {
    id: 'ansiedade_medo',
    name: 'Ansiedade, Medo e Paralisia',
    emoji: '⚡',
    tagline: 'Hiperativação simpática, sensibilidade à ameaça e antecipação catastrófica',
    networkState: 'O alarme biológico de sobrevivência disparou em falso. Fugir ou adiar acalma na hora, mas ensina ao cérebro que a situação era mortal, aumentando o medo no próximo ciclo.',
    somaticManifestations: [
      'Taquicardia, respiração curta ou aperto torácico',
      'Frio na barriga, náusea ou inquietação motora',
      'Tensão nos maxilares, ombros encolhidos e mãos inquietas',
      'Visão de túnel e hipervigilância a sinais de perigo'
    ],
    awayMoves: {
      covert: [
        'Preocupação obsessiva com cenários futuros desastrosos',
        'Repassar mentalmente "E se der errado?", "E se eu travar?"',
        'Monitorar obsessivamente os batimentos cardíacos ou a respiração'
      ],
      overt: [
        'Procrastinar tarefas importantes ou conversas difíceis',
        'Pedir garantias e reasseguramento constante a outras pessoas',
        'Comportamentos de segurança (checar compulsivamente e-mails/mensagens)',
        'Fuga física de situações sociais ou de desempenho'
      ]
    },
    strategies: {
      regulacaoEmocional: {
        title: 'Regulação Autonômica & Ação Oposta',
        physiologyTip: 'Pratique o Suspiro Fisiológico (duas inalações curtas pelo nariz seguidas de expiração lenta pela boca).',
        actionOpposite: 'Aproximar-se fisicamente daquilo que o alarme manda fugir, com passos lentos e deliberados.',
        actionOppositeSteps: [
          'Prolongue a expiração para ativar o nervo vago e descer os batimentos',
          'Solte a musculatura das mãos e descole a língua do céu da boca',
          'Mantenha-se presente sem se esquivar da situação temida'
        ],
        neurobiologicalRationale: 'A expiração longa envia feedback ao tronco encefálico de que o organismo não está em perigo físico mortal imediato.'
      },
      orientacao: {
        title: 'Presença (ACE) & Bússola de Valores',
        attentionGuide: 'Execute os 3 passos: Reconheça a ansiedade, volte ao corpo físico e envolva-se no ambiente externo imediato.',
        valuesDirection: 'Selecione abaixo os valores que você escolhe honrar em vez de obedecer ao medo:',
        suggestedValues: [
          'Coragem e Enfrentamento',
          'Competência e Foco',
          'Compromisso com o Futuro',
          'Autenticidade',
          'Crescimento Pessoal'
        ],
        valueRecommendations: {
          'Coragem e Enfrentamento': {
            tip: 'Coragem não é a ausência de medo, mas decidir que algo importa mais do que o alívio passageiro da fuga.',
            behaviorPrompt: 'Dê o primeiro passo em direção ao que está temendo, com o coração acelerado mesmo.'
          },
          'Competência e Foco': {
            tip: 'A sua competência não depende de você se sentir 100% calmo para agir com qualidade.',
            behaviorPrompt: 'Abra o documento ou a tarefa e trabalhe nele por exatamente 10 minutos sem checar mais nada.'
          },
          'Compromisso com o Futuro': {
            tip: 'Procrastinar agora é pedir um empréstimo com juros abusivos para o seu eu de amanhã.',
            behaviorPrompt: 'Resolva a menor pendência da lista para tirar o peso da antecipação.'
          },
          'Autenticidade': {
            tip: 'Você não precisa parecer invulnerável para ter valor perante as outras pessoas.',
            behaviorPrompt: 'Seja honesto na conversa: "Estou ansioso com isso, mas quero resolver junto com você".'
          },
          'Crescimento Pessoal': {
            tip: 'A sua zona de crescimento fica exatamente do lado de fora da sua zona de conforto imediato.',
            behaviorPrompt: 'Encare o desconforto como sinal de que você está expandindo sua capacidade.'
          }
        }
      },
      aceitacaoRealidade: {
        title: 'Aceitação da Incerteza & Abertura Somática',
        radicalAcceptance: 'Aceite o fato inegociável de que o controle absoluto sobre o futuro não existe.',
        experientialAcceptance: 'Abra espaço interno para a adrenalina e o frio na barriga: "Sou capaz de ter taquicardia e continuar decidindo o que fazer".',
        struggleSwitchNote: 'O medo é apenas química preparando músculos; você pode acolher essa energia sem precisar fugir.'
      },
      desfusaoCognitiva: {
        title: 'Desarmar Profecias Catastróficas',
        defusionMechanism: 'Trate os pensamentos alarmistas como transmissões de rádio de notícias sensacionalistas, não como ordens.',
        syntacticDistancingExample: 'Em vez de "Vou passar vergonha", diga: "Estou tendo o pensamento de que vou passar vergonha".',
        reframeSentence: 'Reconheça: "Aqui está meu cérebro tentando me proteger do pior cenário. Obrigado, mente, mas eu decido a direção".',
        thoughtExamples: [
          '"E se eu travar na hora de falar e todo mundo rir?"',
          '"Vai dar tudo errado e minha vida vai desmoronar"',
          '"Não vou aguentar essa pressão, vou surtar"',
          '"Preciso ter certeza absoluta antes de tomar qualquer decisão"',
          '"Algo terrível está prestes a acontecer comigo"'
        ]
      },
      exposicaoAtivacao: {
        title: 'Exposição com Ação Focada',
        microStepAction: 'Inicie os primeiros 10 minutos da tarefa temida sem fazer verificações compulsivas de garantia.',
        durationMinutes: 10,
        behaviorIndependentOfMood: 'Agir com medo é a única forma de ensinar ao cérebro que você sobrevive à situação.',
        feasibilityRule: 'Não espere sentir segurança antes de começar: a segurança é consequência da ação mantida, nunca o pré-requisito.',
        microStepExamples: [
          'Escrever o primeiro parágrafo do relatório ou e-mail temido',
          'Ligar ou enviar a mensagem que você vem adiando há 3 dias',
          'Entrar na sala de reunião ou ligar a câmera sem pedir desculpas preventivas',
          'Permanecer na situação desconfortável por 5 minutos sem mexer no celular para se distrair',
          'Fazer a pergunta ou expor sua dúvida em público'
        ]
      }
    },
    clinicalQuote: 'A coragem não é o silêncio do medo; é o som dos seus passos avançando enquanto o medo grita.',
    primaryValueDomain: 'Coragem e Autonomia'
  },
  {
    id: 'vergonha_culpa',
    name: 'Vergonha, Culpa e Autocrítica',
    emoji: '🪞',
    tagline: 'Ameaça ao Self, retração interpessoal e autoflagelo verbal',
    networkState: 'A mente se funde a rótulos rígidos de insuficiência ("sou defeituoso", "sou um erro"). Isso paralisa a reparação honesta e afasta você de conexões reais.',
    somaticManifestations: [
      'Calor súbito no rosto, pescoço e peito',
      'Olhar esquivo, dificuldade de sustentar contato visual',
      'Encolhimento postural (ombros para dentro, cabeça baixa)',
      'Sensação de vácuo no estômago ou sufocamento sutil'
    ],
    awayMoves: {
      covert: [
        'Ataque verbal interno contínuo ("como fui burro", "nunca aprendo")',
        'Reviver cenas passadas com vergonha em loop (ruminação retrospectiva)',
        'Comparação desfavorável sistemática com o desempenho alheio'
      ],
      overt: [
        'Esconder-se de amigos, colegas ou do terapeuta',
        'Abandonar cursos, projetos ou conversas após um erro pontual',
        'Desculpar-se excessivamente de forma servil ou complacente',
        'Autopunição ou isolamento defensivo'
      ]
    },
    strategies: {
      regulacaoEmocional: {
        title: 'Ação Oposta à Vergonha & Autocompaixão',
        physiologyTip: 'Coloque uma das mãos espalmada sobre o centro do peito com calor gentil para acalmar o sistema de ameaça.',
        actionOpposite: 'Se a culpa for injustificada ou a vergonha for tóxica: cabeça erguida, olhar nos olhos e postura digna.',
        actionOppositeSteps: [
          'Se houve dano real concreto: peça desculpas de forma clara e repare',
          'Se a culpa for infundada: mantenha o queixo alinhado e o tom de voz audível',
          'Não se esconda nem curve o corpo'
        ],
        neurobiologicalRationale: 'O toque compassivo no peito ativa o sistema de apego e liberação de ocitocina, desligando o circuito defensivo de submissão.'
      },
      orientacao: {
        title: 'Presença & Bússola de Valores',
        attentionGuide: 'Traga a atenção de volta para o presente físico imediato. A cena do erro não está acontecendo agora na sala.',
        valuesDirection: 'Selecione abaixo os valores que você escolhe honrar em vez de se punir:',
        suggestedValues: [
          'Autenticidade e Honestidade',
          'Autocompaixão Serena',
          'Aprendizado Contínuo',
          'Reparação e Justiça',
          'Humildade sem Submissão'
        ],
        valueRecommendations: {
          'Autenticidade e Honestidade': {
            tip: 'Ser autêntico significa admitir que você é um ser humano falível em construção permanente.',
            behaviorPrompt: 'Fale a verdade com calma, sem inventar desculpas elaboradas para disfarçar o erro.'
          },
          'Autocompaixão Serena': {
            tip: 'Autocompaixão não é pena de si mesmo; é se tratar com a mesma decência que você trataria um amigo querido.',
            behaviorPrompt: 'Respire fundo, coloque a mão no peito e fale consigo com firmeza gentil.'
          },
          'Aprendizado Contínuo': {
            tip: 'Erros são os dados empíricos mais valiosos que a vida nos fornece para calibrar a rota.',
            behaviorPrompt: 'Identifique uma lição prática do ocorrido e aplique na próxima decisão.'
          },
          'Reparação e Justiça': {
            tip: 'A culpa saudável não serve para você se chicotear, serve para reparar o dano causado com ações concretas.',
            behaviorPrompt: 'Diga: "Errei nisso, peço desculpas e vou consertar desta maneira".'
          },
          'Humildade sem Submissão': {
            tip: 'Reconhecer um limite não diminui sua dignidade como pessoa.',
            behaviorPrompt: 'Mantenha o contato visual e sustente sua presença na conversa.'
          }
        }
      },
      aceitacaoRealidade: {
        title: 'Aceitação da Imperfeição Humana',
        radicalAcceptance: 'Aceite que o passado aconteceu com o nível de consciência e recursos disponíveis naquele instante.',
        experientialAcceptance: 'Acolha o calor da vergonha sem fugir: "É desconfortável, mas é só meu cérebro sinalizando que me importo".',
        struggleSwitchNote: 'Culpa saudável orienta a reparação; autoflagelo apenas reforça a paralisia.'
      },
      desfusaoCognitiva: {
        title: 'Desarmar os Rótulos Autocríticos',
        defusionMechanism: 'Isole a palavra autocrítica mais forte e desmantele o peso literal do insulto.',
        syntacticDistancingExample: 'Troque "Eu sou um fracasso" por "Minha mente está contando a história do fracasso novamente".',
        reframeSentence: 'Você é o céu onde as nuvens de vergonha passam; você não é as nuvens.',
        thoughtExamples: [
          '"Eu sou um idiota completo, nunca vou aprender"',
          '"Todo mundo deve estar me julgando e rindo de mim"',
          '"Estraguei tudo, não mereço estar aqui"',
          '"Sou um fardo para as pessoas que gosto"',
          '"Se eles soubessem quem eu sou de verdade, me rejeitariam"'
        ]
      },
      exposicaoAtivacao: {
        title: 'Exposição com Reconexão',
        microStepAction: 'Compartilhe sua vulnerabilidade ou retome a atividade exatamente do ponto onde falhou, sem tentar se esconder.',
        durationMinutes: 5,
        behaviorIndependentOfMood: 'Manter a cabeça erguida com gentileza interna e sem desculpas infinitas.',
        feasibilityRule: 'A vulnerabilidade honesta é a ponte mais rápida para desarmar a vergonha destrutiva.',
        microStepExamples: [
          'Enviar uma mensagem sincera reconhecendo o engano sem autoflagelo',
          'Voltar ao ambiente ou grupo de trabalho mantendo contato visual e postura firme',
          'Fazer um intervalo de 5 minutos com a mão no peito respirando com gentileza consigo',
          'Retomar a tarefa interrompida exatamente do ponto onde você errou',
          'Contar para uma pessoa de confiança o que aconteceu sem tentar dourar a pílula'
        ]
      }
    },
    clinicalQuote: 'Você não precisa provar perfeição para ter o direito inegociável de existir.',
    primaryValueDomain: 'Autocompaixão e Conexão'
  },
  {
    id: 'raiva_frustracao',
    name: 'Raiva, Frustração e Revolta',
    emoji: '🔥',
    tagline: 'Bloqueio de metas, percepção de injustiça e impulsividade de ataque',
    networkState: 'O foco atencional fica preso a regras rígidas de como os outros ou o mundo "DEVERIAM" ser. A explosão impulsiva ou o silêncio rancoroso destroem relações e multiplicam o estresse.',
    somaticManifestations: [
      'Mandíbula travada e dentes cerrados',
      'Tensão aguda nos punhos fechados e ombros',
      'Calor intenso subindo pelo tronco até a cabeça',
      'Impulso motor de desferir palavras duras, bater portas ou atacar'
    ],
    awayMoves: {
      covert: [
        'Fantasiar brigas imaginárias ou vingança',
        'Repassar em loop como a outra pessoa agiu errado',
        'Rigidez em regras de como as coisas "deveriam" ser'
      ],
      overt: [
        'Agressividade verbal, ironias ou rompimento impulsivo',
        'Tratamento de silêncio punitivo (fechamento hostil)',
        'Bater portas ou destruir objetos no calor do momento',
        'Desistir de acordos construtivos por pura teimosia'
      ]
    },
    strategies: {
      regulacaoEmocional: {
        title: 'Ação Oposta à Raiva & Pausa Fisiológica',
        physiologyTip: 'Faça um afastamento temporário acordado (Time-out de 10 minutos) e resfrie a temperatura corporal.',
        actionOpposite: 'Suavizar voluntariamente as mãos e a mandíbula, e modular o tom de voz para uma cadência tranquila.',
        actionOppositeSteps: [
          'Abra as palmas das mãos voltadas para cima',
          'Descerre os dentes e relaxe a musculatura da boca',
          'Fale em volume ligeiramente mais baixo e pausado'
        ],
        neurobiologicalRationale: 'A musculatura facial e das mãos retroalimenta a amígdala. Suavizar os punhos sinaliza ao cérebro que o combate físico cessou.'
      },
      orientacao: {
        title: 'Presença & Bússola de Valores',
        attentionGuide: 'Foque 100% da atenção na sensação física da raiva (o calor e a pressão) como um cientista curioso, sem explodir.',
        valuesDirection: 'Selecione abaixo os valores que você escolhe honrar em vez de destruir relacionamentos no calor da raiva:',
        suggestedValues: [
          'Clareza e Comunicação Assertiva',
          'Paz de Espírito',
          'Respeito Mútuo',
          'Eficácia nas Resoluções',
          'Auto-respeito Firme'
        ],
        valueRecommendations: {
          'Clareza e Comunicação Assertiva': {
            tip: 'A raiva quer gritar; a assertividade fala com calma e estabelece o limite com precisão cirúrgica.',
            behaviorPrompt: 'Descreva os fatos objetivos sem adjetivos hostis: "Quando isso acontece, não posso concordar".'
          },
          'Paz de Espírito': {
            tip: 'Guardar rancor esperando que o outro sofra é tomar veneno esperando que a outra pessoa morra.',
            behaviorPrompt: 'Dê uma pausa de 10 minutos para respirar antes de responder à mensagem provocativa.'
          },
          'Respeito Mútuo': {
            tip: 'Você pode discordar veementemente da conduta de alguém sem rebaixar sua própria dignidade.',
            behaviorPrompt: 'Converse olhando nos olhos com voz calma, firme e inabalável.'
          },
          'Eficácia nas Resoluções': {
            tip: 'A vitória da raiva é oca: vencer uma discussão humilhando o outro destrói o objetivo final.',
            behaviorPrompt: 'Foque na solução prática: "Qual é o acordo claro que precisamos firmar aqui?".'
          },
          'Auto-respeito Firme': {
            tip: 'Quem perde o controle entrega o poder para a pessoa que o provocou.',
            behaviorPrompt: 'Mantenha a compostura para permanecer no controle da situação.'
          }
        }
      },
      aceitacaoRealidade: {
        title: 'Aceitação Radical do Fato Consumado',
        radicalAcceptance: 'Aceite que o que aconteceu já se manifestou neste exato segundo. Brigar mentalmente contra o fato não faz o tempo voltar.',
        experientialAcceptance: 'Tolere o desconforto de não conseguir controlar as atitudes alheias.',
        struggleSwitchNote: 'Aceitar não é concordar; é parar de sangrar energia contra a realidade que já aconteceu.'
      },
      desfusaoCognitiva: {
        title: 'Desarmar as Regras de "Deveria"',
        defusionMechanism: 'Separe o fato concreto observável (o que uma câmera filmaria) da narrativa de injustiça da mente.',
        syntacticDistancingExample: 'Troque "Ele fez isso para me ferrar" por "O fato é que ele se atrasou. Minha mente está contando a história da traição deliberada".',
        reframeSentence: 'Notar a mente presa ao loop da indignação sem ser obrigado a morder a isca do conflito destrutivo.',
        thoughtExamples: [
          '"Eles não tinham o direito de fazer isso comigo"',
          '"Vou mostrar para eles com quem estão lidando"',
          '"Isso é uma injustiça inaceitável, não posso deixar passar"',
          '"Todo mundo pisa em mim se eu não for agressivo"',
          '"Eles fizeram isso de propósito só para me desrespeitar"'
        ]
      },
      exposicaoAtivacao: {
        title: 'Assertividade e Limites Claros',
        microStepAction: 'Comunique sua necessidade ou limite de forma puramente descritiva, tolerando o desconforto da divergência.',
        durationMinutes: 5,
        behaviorIndependentOfMood: 'Defender o que importa com a serenidade de quem não precisa gritar para ter valor.',
        feasibilityRule: 'Exponha-se ao desconforto de negociar acordos em vez de buscar a satisfação passageira do ataque.',
        microStepExamples: [
          'Fazer um time-out de 10 minutos para beber água e caminhar antes de responder',
          'Escrever o limite em uma folha de papel antes de falar em voz alta',
          'Dizer com voz serena: "Preciso de um momento para pensar e conversamos com calma daqui a 20 minutos"',
          'Pedir esclarecimento sobre o ocorrido sem acusar de imediato',
          'Focar em propor uma regra ou ajuste prático para que o problema não se repita'
        ]
      }
    },
    clinicalQuote: 'Quem domina a própria compostura em meio à tempestade controla o destino da conversa.',
    primaryValueDomain: 'Eficácia e Respeito Mútuo'
  },
  {
    id: 'sobrecarga_burnout',
    name: 'Sobrecarga, Exaustão e Burnout',
    emoji: '🪫',
    tagline: 'Esgotamento biológico, complacência social e alienação das próprias necessidades',
    networkState: 'Agir apenas por complacência ("ceder ao que os outros querem") esgota a energia vital. A verdadeira ativação aqui é aprender a pausar e impor limites com firmeza.',
    somaticManifestations: [
      'Fadiga profunda ao acordar e sensação de bateria zerada',
      'Dificuldade de concentração e névoa mental',
      'Entorpecimento afetivo (sensação de piloto automático anestesiado)',
      'Hipersensibilidade a barulhos e demandas banais'
    ],
    awayMoves: {
      covert: [
        'Pensamentos de desespero: "Tenho que dar conta de tudo", "Se eu parar, tudo desaba"',
        'Culpa imediata ao sentar para descansar',
        'Incapacidade de dizer não por medo de desagradar'
      ],
      overt: [
        'Hipertrabalho mecânico com produtividade cada vez menor',
        'Ignorar sinais biológicos de fome, sede e sono',
        'Colapso total súbito (paralisia completa por exaustão)',
        'Isolamento por falta absoluta de energia vital'
      ]
    },
    strategies: {
      regulacaoEmocional: {
        title: 'Restauração Biológica Primária',
        physiologyTip: 'Deite-se por 15 minutos em silêncio absoluto com os olhos fechados, sem telas, podcasts ou notificações.',
        actionOpposite: 'Ação Oposta ao Hipertrabalho: Pausa restauradora deliberada mesmo com a lista de afazeres cheia.',
        actionOppositeSteps: [
          'Beba um copo cheio de água com calma',
          'Faça uma refeição sentado longe de telas',
          'Diminua a iluminação e reduza os estímulos sonoros ao redor'
        ],
        neurobiologicalRationale: 'O cérebro precisa de pausas reais para restabelecer a capacidade executiva de tomada de decisão.'
      },
      orientacao: {
        title: 'Presença & Bússola de Valores',
        attentionGuide: 'Faça exatamente UMA coisa de cada vez, do início ao fim, sem alternância frenética de abas ou multitarefa.',
        valuesDirection: 'Selecione abaixo os valores que você escolhe honrar em vez de se esgotar para agradar a todos:',
        suggestedValues: [
          'Autonomia e Escolha Livre',
          'Saúde Biológica Inegociável',
          'Presença Verdadeira',
          'Sustentabilidade da Vida',
          'Paz e Integridade'
        ],
        valueRecommendations: {
          'Autonomia e Escolha Livre': {
            tip: 'Dizer não para os pedidos alheios é a única forma de dizer sim para a sua própria vida.',
            behaviorPrompt: 'Recuse educadamente uma solicitação que não seja estritamente sua responsabilidade.'
          },
          'Saúde Biológica Inegociável': {
            tip: 'O seu corpo é um organismo vivo com limites reais, não uma máquina industrial.',
            behaviorPrompt: 'Pare tudo agora, tome água e feche os olhos por 10 minutos.'
          },
          'Presença Verdadeira': {
            tip: 'Fazer dez coisas ao mesmo tempo com pressa é estar ausente em todas elas.',
            behaviorPrompt: 'Escolha uma única tarefa e faça com atenção total, sem olhar o celular.'
          },
          'Sustentabilidade da Vida': {
            tip: 'Não adianta ser o mais produtivo do cemitério: ritmo sustentável vence a correria cega.',
            behaviorPrompt: 'Defina um horário inegociável para encerrar as atividades de hoje.'
          },
          'Paz e Integridade': {
            tip: 'A sua paz vale mais do que a aprovação momentânea de quem te sobrecarrega.',
            behaviorPrompt: 'Tolere a culpa de desapontar expectativas externas abusivas.'
          }
        }
      },
      aceitacaoRealidade: {
        title: 'Aceitação dos Limites Biológicos',
        radicalAcceptance: 'Você é um ser humano com energia finita. Aceite que o dia tem 24 horas e que seu corpo precisa de repouso.',
        experientialAcceptance: 'Abra espaço para a culpa desconfortável que surge no instante em que você decide parar e descansar.',
        struggleSwitchNote: 'Descanso não é recompensa por trabalho cumprido: é pré-requisito biológico para estar vivo.'
      },
      desfusaoCognitiva: {
        title: 'Desarmar Regras de Complacência',
        defusionMechanism: 'Identifique a regra mental: "Preciso agradar e resolver tudo para ter valor".',
        syntacticDistancingExample: 'Substitua "Não posso desapontar ninguém" por "Minha mente está operando sob a regra condicionada do medo da rejeição".',
        reframeSentence: 'Proteger o seu corpo e o seu tempo é a sua primeira obrigação moral.',
        thoughtExamples: [
          '"Se eu disser não, vão achar que sou incompetente ou egoísta"',
          '"Eu tenho que dar conta de tudo sozinho, ninguém faz direito"',
          '"Não posso descansar enquanto tiver coisas pendentes"',
          '"Estou decepcionando todo mundo ao meu redor"',
          '"Se eu parar agora, tudo vai desmoronar"'
        ]
      },
      exposicaoAtivacao: {
        title: 'Ação com Limites Saudáveis',
        microStepAction: 'Diga um "não" educado a uma demanda periférica ou reserve 20 minutos inegociáveis para si mesmo.',
        durationMinutes: 20,
        behaviorIndependentOfMood: 'Sustentar o desconforto de desapontar expectativas alheias para preservar sua vida.',
        feasibilityRule: 'A verdadeira ação na exaustão muitas vezes é o ato corajoso de desligar os motores e se proteger.',
        microStepExamples: [
          'Dizer com clareza: "Infelizmente não consigo assumir essa demanda no momento"',
          'Desligar as notificações do celular e fechar o computador por 20 minutos',
          'Fazer uma caminhada sem fones de ouvido apenas respirando e olhando o céu',
          'Delegar uma tarefa simples que outra pessoa pode executar',
          'Dormir 30 minutos mais cedo hoje sem telas no quarto'
        ]
      }
    },
    clinicalQuote: 'Não existe heroísmo em se destruir para cumprir prazos que nem sequer foram definidos pelos seus próprios valores.',
    primaryValueDomain: 'Autonomia e Preservação'
  }
];
