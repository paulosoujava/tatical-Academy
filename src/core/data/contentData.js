// Banco de Dados Estático de Conteúdo - Tactical Academy

export const MODULES = [
  {
    id: "shoot_fundamentals",
    title: "Fundamentos de Tiro",
    category: "Fundamentos",
    description: "Conceitos teóricos e mecânica física por trás do disparo de precisão e consistência.",
    topics: [
      {
        id: "posture",
        title: "Postura",
        content: "A postura constitui a base física para o controle de recuo e a estabilização da plataforma de tiro. Teoricamente, as principais posturas doutrinárias incluem a Isósceles (simétrica, aproveitando a blindagem corporal frontal), Weaver (assimétrica, oferecendo menor perfil lateral) e Isósceles Moderna (ou Ativa, onde o tronco se projeta ligeiramente à frente, os ombros ficam alinhados e os joelhos flexionados). O foco é a absorção de energia pelas articulações e grandes grupos musculares, em vez de depender puramente da força óssea."
      },
      {
        id: "grip",
        title: "Empunhadura",
        content: "A empunhadura estabelece a interface direta com o armamento. Deve ser o mais alta possível sob o 'beavertail' para reduzir o braço de alavanca criado pelo recuo. A força de empunhadura é distribuída de forma que a mão de suporte aplique pressão lateral (idealmente 60-70% da força total) enquanto a mão que dispara permanece relaxada o suficiente para isolar o movimento do dedo indicador no gatilho. As palmas devem preencher totalmente os vazios das placas do cabo."
      },
      {
        id: "alignment",
        title: "Alinhamento de Mira",
        content: "O alinhamento de mira (Sight Alignment) consiste no posicionamento geométrico correto entre o olho do atirador, a alça de mira (traseira) e a massa de mira (dianteira). O alinhamento perfeito exige que o topo da massa de mira esteja nivelado com o topo da alça, e que a folga de luz nas laterais da alça de mira seja idêntica em ambos os lados."
      },
      {
        id: "sight_picture",
        title: "Imagem de Mira",
        content: "A imagem de mira (Sight Picture) é a sobreposição das miras alinhadas sobre o alvo selecionado. Devido à limitação do olho humano de focar simultaneamente em três planos a distâncias distintas (massa de mira, alça de mira e alvo), a doutrina prescreve o foco focal nítido estritamente na massa de mira, deixando o alvo e a alça de mira ligeiramente borrados."
      },
      {
        id: "breathing",
        title: "Respiração",
        content: "O controle respiratório busca mitigar o movimento oscilatório natural do tronco durante o ciclo de disparo. O momento ótimo para o acionamento do gatilho é durante a 'pausa respiratória natural', que ocorre logo após a expiração e antes da próxima inspiração, proporcionando um intervalo estável de 2 a 4 segundos."
      },
      {
        id: "trigger_control",
        title: "Acionamento do Gatilho",
        content: "O controle do gatilho é o fator mecânico mais crítico para a precisão. O acionamento deve consistir em uma pressão contínua e retilínea diretamente para trás, isolando o movimento das demais articulações da mão. O objetivo é acionar o gatilho sem perturbar o alinhamento das miras. Após o disparo, o dedo deve liberar o gatilho apenas até o ponto de rearme (Reset) para os tiros subsequentes."
      },
      {
        id: "follow_through",
        title: "Follow Through",
        content: "O Follow Through é a continuidade dos fundamentos após o disparo. Consiste em manter a estabilidade da empunhadura, o foco na massa de mira e o dedo no gatilho até que o projétil tenha saído completamente do cano e as miras tenham retornado à imagem original. Isso previne o erro comum de antecipar o recuo ou baixar a arma precocemente."
      },
      {
        id: "recovery_transitions",
        title: "Recuperação e Transição",
        content: "A recuperação envolve o restabelecimento imediato do alinhamento visual e controle físico após o recuo. A transição entre alvos baseia-se no conceito de guiar primeiro com o olhar (foco visual migra para o novo alvo) e depois mover o armamento de forma fluida, travando o corpo na nova posição de disparo."
      },
      {
        id: "accuracy_speed",
        title: "Consistência: Precisão x Velocidade",
        content: "A proficiência tática equilibra precisão (capacidade de acertar a zona desejada) e velocidade (tempo de execução). Este equilíbrio é ditado pela distância do alvo e complexidade do cenário. Alvos distantes exigem imagens de mira perfeitas; alvos próximos permitem uma imagem de mira rápida ou mesmo tiro instintivo/indexado. A cadência correta baseia-se no tempo necessário para recuperar a imagem de mira aceitável antes de cada disparo."
      }
    ]
  },
  {
    id: "ooda_loop",
    title: "OODA Loop",
    category: "Decisão",
    description: "O modelo de tomada de decisão rápida desenvolvido pelo Coronel John Boyd.",
    topics: [
      {
        id: "origin",
        title: "Origem e História",
        content: "Desenvolvido pelo estrategista militar e Coronel da Força Aérea dos EUA John Boyd, o ciclo OODA foi inicialmente formulado para entender os combates aéreos durante a Guerra da Coreia. Boyd observou que os pilotos americanos de F-86 Sabre venciam combates contra os MiG-15 soviéticos em maior proporção, não porque o avião era mais rápido, mas porque o cockpit do F-86 oferecia melhor visibilidade e os controles hidráulicos permitiam reações mais ágeis, permitindo que os pilotos americanos decidissem e agissem mais rápido que seus oponentes."
      },
      {
        id: "observe",
        title: "1. Observar (Observe)",
        content: "A primeira fase consiste na coleta ativa de informações brutas do ambiente externo. Envolve o uso dos sentidos, tecnologia disponível e vigilância situacional. O objetivo é rastrear ameaças, mudanças no cenário e o comportamento de outros agentes. A observação de qualidade requer mente aberta para captar dados que contrariam nossas expectativas pessoais."
      },
      {
        id: "orient",
        title: "2. Orientar (Orient)",
        content: "A fase mais crítica do loop. Orientar-se é o processo de filtrar e interpretar a informação observada com base em nossos filtros mentais: herança genética, tradição cultural, experiências anteriores, análises lógicas e novos dados. Uma orientação incorreta leva a decisões erradas. Atualizar nossos modelos mentais continuamente é vital."
      },
      {
        id: "decide",
        title: "3. Decidir (Decide)",
        content: "Com base nas informações interpretadas, o tomador de decisão escolhe um curso de ação entre as alternativas disponíveis. Pode envolver a formulação de um novo plano ou a seleção de uma resposta pré-treinada na memória operacional. A decisão é um compromisso mental de agir."
      },
      {
        id: "act",
        title: "4. Agir (Act)",
        content: "A execução física da decisão escolhida. A ação interage com o ambiente, alterando-o. O resultado dessa ação gera novos dados que alimentam novamente a primeira fase (Observar), criando um loop contínuo. Quem executa esse ciclo mais rapidamente força o adversário a reagir a eventos passados, desestruturando sua capacidade de decisão."
      }
    ]
  },
  {
    id: "color_cycle",
    title: "Ciclo das Cores",
    category: "Consciência Situacional",
    description: "O código de cores de Jeff Cooper para a prontidão mental e percepção de ameaças.",
    topics: [
      {
        id: "cooper_model",
        title: "O Modelo de Jeff Cooper",
        content: "Criado pelo Coronel Jeff Cooper, o código de cores descreve estados psicológicos de prontidão cognitiva em relação a ameaças. Ele não mede o perigo externo, mas sim a disposição interna do operador para agir. O modelo é dividido em cinco cores: Branco, Amarelo, Laranja, Vermelho e Preto."
      },
      {
        id: "white",
        title: "Estado Branco (Desatento)",
        content: "Estado de relaxamento total e desatenção ao ambiente. O indivíduo assume que tudo está seguro e está focado em pensamentos internos (como o celular ou devaneios). Se atacado neste estado, a resposta fisiológica será de choque absoluto, pânico ou paralisia, necessitando de segundos vitais para recuperar a capacidade de reação."
      },
      {
        id: "yellow",
        title: "Estado Amarelo (Atenção Relaxada)",
        content: "Estado ideal para o dia a dia de qualquer operador ou cidadão consciente. Significa atenção relaxada e constante sobre o ambiente. Não há paranoia ou estresse ativo, apenas uma varredura visual e auditiva normal, observando saídas, pessoas e comportamentos atípicos. O pensamento lógico é: 'Hoje pode ser o dia em que terei que agir'."
      },
      {
        id: "orange",
        title: "Estado Laranja (Alerta Focado)",
        content: "Ocorre quando algo específico chama a atenção do operador (uma pessoa suspeita, um barulho incomum, uma porta arrombada). A atenção migra de geral para focada naquela ameaça potencial. O operador começa a traçar planos de contingência mentais: 'Se ele fizer X, eu farei Y'."
      },
      {
        id: "red",
        title: "Estado Vermelho (Ação/Combate)",
        content: "A ameaça em potencial confirmou-se real (um ataque direto ou iminente). O gatilho mental foi acionado. A mente foca na neutralização do perigo ou na evacuação do local. As decisões pré-formuladas no estado laranja são executadas fisicamente."
      },
      {
        id: "black",
        title: "Estado Preto (Paralisia por Estresse)",
        content: "Adicionado posteriormente à doutrina original. Ocorre quando a carga cognitiva excede a capacidade de processamento, ou o indivíduo é pego no Estado Branco por uma ameaça extrema. A frequência cardíaca ultrapassa os 175 BPM, resultando em colapso mental, pânico desorganizado, paralisia total (Freeze) ou comportamento de negação."
      }
    ]
  },
  {
    id: "situational_awareness",
    title: "Consciência Situacional",
    category: "Consciência Situacional",
    description: "Métodos de leitura de ambiente, detecção de anomalias e vieses de atenção.",
    topics: [
      {
        id: "env_reading",
        title: "Leitura de Ambiente",
        content: "A leitura do ambiente envolve identificar a 'linha de base' do local (comportamento normal, nível de ruído, movimentação típica) e procurar por 'anomalias' (comportamento que destoa da linha de base). Por exemplo, roupas incompatíveis com o clima, mãos ocultas, postura corporal de tensão extrema (hipervigilância, sudorese, olhar evasivo) ou movimentação em rotas de fuga."
      },
      {
        id: "cognitive_errors",
        title: "Erros Cognitivos e Fadiga",
        content: "A consciência situacional não é constante e sofre com a fadiga cognitiva. Erros cognitivos comuns incluem: Viés de Confirmação (interpretar eventos de forma que justifiquem nossa crença prévia de segurança) e Atenção Seletiva (focar tanto em uma tarefa, como ler o celular, que nos tornamos cegos para eventos graves ao nosso redor)."
      },
      {
        id: "visual_scanning",
        title: "Escaneamento Visual Ativo",
        content: "Técnicas estruturadas de escaneamento impedem a fixação ocular passiva. Recomenda-se dividir o espaço em setores (próximo, médio e distante) e realizar varreduras em formato de 'Z' ou em leque, dando atenção prioritária a 'pontos cegos', cantos, portas, janelas e silhuetas que possam ocultar perigos."
      }
    ]
  },
  {
    id: "stress_psychology",
    title: "Psicologia em Alto Estresse",
    category: "Psicologia",
    description: "A resposta fisiológica do corpo humano à ameaça letal e técnicas de controle emocional.",
    topics: [
      {
        id: "physiological_response",
        title: "Resposta Fisiológica ao Estresse",
        content: "Diante de uma ameaça severa, o sistema nervoso simpático ativa a resposta de 'luta ou fuga'. Isso desencadeia uma descarga massiva de adrenalina e cortisol. Os efeitos físicos imediatos incluem: aumento da frequência cardíaca, desvio do fluxo sanguíneo dos órgãos não vitais e extremidades para os grandes músculos, e dilatação das pupilas."
      },
      {
        id: "tunnel_vision",
        title: "Visão em Túnel e Exclusão Auditiva",
        content: "A dilatação pupilar extrema reduz a visão periférica, focando a atenção visual estritamente na ameaça percebida (Visão em Túnel). Simultaneamente, o cérebro filtra frequências sonoras consideradas secundárias para economizar processamento neural, resultando em perda de audição temporária ou distorção acústica (Exclusão Auditiva)."
      },
      {
        id: "tactical_breathing",
        title: "Respiração Tática",
        content: "A Respiração Tática (ou Box Breathing) é a principal ferramenta consciente para reverter a hiperativação simpática. O protocolo consiste em quatro etapas de duração igual (geralmente 4 segundos cada): 1. Inspirar pelo nariz profundamente; 2. Reter o ar nos pulmões; 3. Expirar pela boca completamente; 4. Reter os pulmões vazios. Esse ciclo ativa o sistema nervoso parassimpático, reduzindo os batimentos cardíacos e restaurando a capacidade cognitiva de tomada de decisão."
      }
    ]
  },
  {
    id: "human_factors",
    title: "Fatores Humanos",
    category: "Psicologia",
    description: "Erro humano, comunicação em equipe sob estresse e liderança doutrinária.",
    topics: [
      {
        id: "human_error",
        title: "Erro Humano e Carga Cognitiva",
        content: "O erro em situações de emergência raramente ocorre por incompetência pura; geralmente decorre da sobrecarga da memória operacional. O cérebro sob estresse extremo perde a capacidade de processar informações complexas ou realizar cálculos refinados. Simplificar protocolos de segurança e criar respostas motoras automáticas é a defesa primária contra o erro humano."
      },
      {
        id: "team_comm",
        title: "Comunicação e Consciência Compartilhada",
        content: "Em equipes táticas ou operacionais, a comunicação sob estresse deve ser concisa, diretiva e padronizada. A 'Consciência Compartilhada' (Shared Situational Awareness) ocorre quando todos os membros da equipe compreendem o estado atual do cenário, o objetivo imediato e a função de cada companheiro, reduzindo a necessidade de comandos longos."
      },
      {
        id: "debriefing",
        title: "Debriefing e Lições Aprendidas",
        content: "O debriefing é a análise estruturada realizada imediatamente após a conclusão de uma atividade ou simulação. O processo deve ser livre de hierarquia punitiva, focando nas perguntas: 'O que aconteceu?', 'Por que aconteceu?' e 'Como podemos melhorar?'. O registro honesto das falhas individuais e coletivas é o que constrói a doutrina sólida."
      }
    ]
  },
  {
    id: "cqb_doctrine",
    title: "Doutrina de CQB",
    category: "Histórico/Doutrinário",
    description: "História, conceitos gerais e princípios básicos do combate em ambientes fechados.",
    topics: [
      {
        id: "cqb_history",
        title: "Origem e Evolução do CQB",
        content: "O Close Quarters Battle (Combate em Ambientes Fechados) evoluiu a partir da necessidade de forças especiais militares e policiais responderem a situações de reféns, terrorismo urbano e varreduras prediais complexas no século XX. Unidades pioneiras, como o SAS britânico e o SWAT americano, desenvolveram os primeiros manuais formais, migrando de táticas brutais de força para abordagens dinâmicas ou metódicas baseadas em fluxo geométrico."
      },
      {
        id: "cqb_principles",
        title: "Princípios Doutrinários Gerais",
        content: "O CQB moderno fundamenta-se teórica e conceitualmente em três pilares principais: Surpresa (iniciar a entrada antes que a ameaça monte uma barreira ativa de defesa), Velocidade (a rapidez coordenada necessária para dominar os ângulos de perigo e pontos cegos) e Ação Concentrada (a aplicação de foco absoluto nos setores corretos de cobertura mútua)."
      },
      {
        id: "cqb_methods",
        title: "Métodos de Varredura Conceituais",
        content: "Existem duas escolas conceituais principais de varredura predial: A Entrada Dinâmica (prioriza velocidade e inundação do cômodo para sobrecarregar a tomada de decisão do oponente) e a Varredura Limitada ou Deliberada (conhecida como 'fatiamento' ou 'morder o canto', onde os operadores limpam o máximo possível do ambiente a partir do exterior antes de cruzar o portal de entrada, reduzindo a exposição física)."
      }
    ]
  },
  {
    id: "vehicular_cqb",
    title: "CQB Veicular",
    category: "Histórico/Doutrinário",
    description: "Desafios táticos, balística em vidros/lataria e dinâmica em ambiente urbano ao redor de veículos.",
    topics: [
      {
        id: "vehicle_challenges",
        title: "Desafios em Ambiente Veicular",
        content: "Operações ao redor de veículos impõem severas restrições de mobilidade e consciência espacial. Veículos são considerados 'armadilhas de metal' por concentrar fogo adverso e limitar rotas de fuga rápida. Doutrinariamente, diferencia-se a cobertura (estruturas do carro capazes de barrar projéteis, como o bloco do motor, colunas das portas e eixos de aço) de mero ocultamento (vidros, lataria fina das portas e painéis internos, que apenas ocultam a silhueta, mas não barram disparos)."
      },
      {
        id: "ballistics_glass",
        title: "Comportamento Balístico em Vidros",
        content: "A balística terminal ao interagir com o para-brisa ou vidros temperados sofre desvios previsíveis. Projéteis disparados de fora para dentro do para-brisa tendem a desviar para baixo devido ao ângulo de inclinação do vidro laminado. Disparos feitos de dentro para fora tendem a desviar para cima. Esses desvios conceituais exigem que o operador adapte sua compensação de visada."
      }
    ]
  },
  {
    id: "cognitive_warfare",
    title: "Guerra Cognitiva",
    category: "Estratégia",
    description: "Operações psicológicas, desinformação e engenharia social moderna.",
    topics: [
      {
        id: "cognitive_info",
        title: "Informação e Desinformação",
        content: "A Guerra Cognitiva foca no processamento mental do tomador de decisão. Enquanto a desinformação convencional espalha notícias falsas, a guerra cognitiva moderna busca alterar a forma como as pessoas pensam e interpretam os fatos, saturando canais com narrativas conflitantes para gerar apatia, desconfiança institucional e paralisia de decisão."
      },
      {
        id: "influence_psyops",
        title: "Operações Psicológicas (PSYOPS)",
        content: "As operações psicológicas usam meios de comunicação, propaganda e manipulação cultural para influenciar atitudes e comportamentos de populações e comandantes adversários. O objetivo conceitual é enfraquecer a vontade de combater do oponente e criar divisões internas antes mesmo do engajamento de força física."
      }
    ]
  },
  {
    id: "military_history",
    title: "História Militar",
    category: "Estratégia",
    description: "Lições doutrinárias extraídas de conflitos históricos e estratégias de liderança.",
    topics: [
      {
        id: "battle_lessons",
        title: "Lições de Grandes Conflitos",
        content: "A análise de batalhas históricas (como a Batalha de Cannae, a defesa de Termópilas ou as campanhas napoleônicas) foca nas constantes doutrinárias: a importância de linhas de suprimento seguras, a economia de forças, o fator de atrito psicológico e a descentralização do comando (Auftragstaktik ou Comando de Missão, onde subordinados têm autonomia para tomar decisões com base na intenção geral do comandante)."
      }
    ]
  }
];

export const CASES = [
  {
    id: "miami_1986",
    title: "Tiroteio do FBI em Miami (1986)",
    date: "11 de Abril de 1986",
    location: "Miami, Flórida, EUA",
    summary: "Ocorrência histórica envolvendo agentes do FBI e dois assaltantes violentos. Esta ação revolucionou a balística policial internacional.",
    context: "Oito agentes do FBI encurralaram dois criminosos fortemente armados em uma área residencial após perseguição automobilística. Apesar da superioridade numérica de 8 contra 2, os agentes enfrentaram severas dificuldades operacionais que resultaram na morte de dois agentes e ferimento de outros cinco.",
    human_factors: "Estresse agudo levou à perda de óculos de grau por agentes durante a colisão, perda de controle de armas secundárias, e dificuldades de recarga de revólveres sob fogo de fuzil. A exclusão auditiva dificultou a coordenação tática.",
    decision_making: "A abordagem tática baseou-se em colisão forçada sem cobertura inicial adequada. A falta de armamento de alta energia por parte da maioria dos agentes (revólveres calibre .38 e pistolas 9mm frente a um fuzil Mini-14 calibre 5.56mm) expôs a falha doutrinária de armamento da época.",
    lessons: "1. Substituição em massa de revólveres por pistolas semiautomáticas na polícia civil; 2. Desenvolvimento do calibre .40 S&W e testes mais rígidos de penetração balística do FBI; 3. Foco em táticas de isolamento e cobertura mútua."
  },
  {
    id: "mogadishu_1993",
    title: "Batalha de Mogadíscio (1993)",
    date: "3-4 de Outubro de 1993",
    location: "Mogadíscio, Somália",
    summary: "Operação militar de forças especiais americanas que resultou em combate urbano intenso após a queda de dois helicópteros Black Hawk.",
    context: "Uma missão que deveria durar cerca de uma hora para capturar tenentes de um senhor da guerra local transformou-se em um combate urbano de 15 horas em área altamente hostil e densamente povoada.",
    human_factors: "As equipes de resgate demonstraram resiliência extrema em condições adversas de deserto e calor urbano. A fadiga acumulada e a perda de consciência situacional sobre o tamanho da reação inimiga aumentaram o risco tático.",
    decision_making: "Decisão de manter o perímetro ao redor dos destroços do helicóptero para resgatar os tripulantes sobreviventes, priorizando a doutrina de 'não deixar ninguém para trás', mesmo sob desvantagem tática extrema.",
    lessons: "1. Necessidade de melhor coordenação entre unidades aéreas e forças terrestres; 2. Desenvolvimento de melhores veículos de proteção blindada urbana; 3. Adoção generalizada de kits de primeiros socorros de combate individuais (IFAK)."
  }
];

export const GLOSSARY = [
  { term: "OODA Loop", definition: "Ciclo de tomada de decisão desenvolvido por John Boyd: Observar, Orientar, Decidir e Agir." },
  { term: "CQB", definition: "Close Quarters Battle. Combate em ambientes fechados ou confinados, típico de varreduras prediais." },
  { term: "Sight Alignment", definition: "Alinhamento de Mira. Posicionamento retilíneo correto entre olho do atirador, alça de mira e massa de mira." },
  { term: "Sight Picture", definition: "Imagem de Mira. A imagem visual obtida ao projetar as miras alinhadas sobre o alvo." },
  { term: "Follow Through", definition: "Continuidade de fundamentos físicos logo após a liberação do percussor até a estabilização completa pós-recuo." },
  { term: "Box Breathing", definition: "Respiração Tática. Protocolo de controle respiratório em 4 fases de tempo igual (geralmente 4s cada)." },
  { term: "Cooper's Colors", definition: "Ciclo das Cores. Modelo de Jeff Cooper que mapeia estados de prontidão cognitiva (Branco, Amarelo, Laranja, Vermelho)." },
  { term: "Tunnel Vision", definition: "Visão em Túnel. Perda de percepção visual periférica causada por estresse psicológico extremo." },
  { term: "Auditory Exclusion", definition: "Exclusão Auditiva. Supressão auditiva temporária induzida por descarga adrenérgica aguda em situações críticas." },
  { term: "Auftragstaktik", definition: "Comando de Missão. Doutrina militar alemã baseada na concessão de autonomia tática a subordinados para atingir metas gerais." },
  { term: "Dry Fire", definition: "Treinamento Seco. Exercício de fundamentos de tiro com armamento descarregado." },
  { term: "Double Tap", definition: "Dois disparos rápidos consecutivos contra a mesma zona do alvo aproveitando o mesmo alinhamento de mira." },
  { term: "Line of Sight", definition: "Linha de Visada. A linha imaginária reta que une o olho do atirador ao alvo através do dispositivo de mira." },
  { term: "Low Ready", definition: "Pronto Baixo. Posição tática em que o armamento aponta para o solo em ângulo de 45º, mantendo o campo de visão livre." },
  { term: "High Ready", definition: "Pronto Alto. Posição em que o armamento é mantido próximo ao peito com o cano apontando ligeiramente para cima ou para o alvo." },
  { term: "Cover", definition: "Cobertura. Estrutura física capaz de deter a trajetória de projéteis hostis (ex: bloco de motor de ferro fundido)." },
  { term: "Concealment", definition: "Ocultamento. Estrutura ou objeto que esconde a silhueta do operador, mas não oferece barreira mecânica a projéteis." },
  { term: "Reset do Gatilho", definition: "Ponto mecânico em que o mecanismo do gatilho se rearma para um novo ciclo de disparo após ser parcialmente liberado." },
  { term: "Fatiamento", definition: "Método de varredura geométrica deliberada de cantos ('slicing the pie'), limpando setores passo a passo." },
  { term: "IFAK", definition: "Individual First Aid Kit. Kit de primeiros socorros de combate individual, focado no controle de hemorragias massivas." },
  { term: "Cognitive Load", definition: "Carga Cognitiva. Volume total de atividade mental imposta à memória de trabalho humana em um dado instante." },
  { term: "Confirmation Bias", definition: "Viés de Confirmação. Tendência cognitiva de buscar, interpretar e lembrar de dados que confirmem hipóteses prévias." },
  { term: "Debriefing", definition: "Reunião de avaliação pós-evento focada no aprendizado doutrinário sem caráter punitivo." },
  { term: "Weapon Retention", definition: "Retenção de Armamento. Conjunto de técnicas e design de coldres para evitar o desarmamento do operador." },
  { term: "Anomalia", definition: "Em consciência situacional, qualquer comportamento ou elemento físico que desvie da linha de base do ambiente." }
];

export const CHECKLISTS = [
  {
    id: "prep_mental",
    title: "Preparação Mental",
    items: [
      { text: "Praticar 5 minutos de respiração tática controlada.", checked: false },
      { text: "Visualização mental de cenários de emergência e planos de ação (E se...?).", checked: false },
      { text: "Rever os níveis de Cooper (Manter-se no Estado Amarelo).", checked: false },
      { text: "Identificar possíveis erros cognitivos pessoais (fadiga, distrações).", checked: false }
    ]
  },
  {
    id: "study_prep",
    title: "Cronograma de Estudos Teóricos",
    items: [
      { text: "Ler um tópico de Fundamentos de Tiro.", checked: false },
      { text: "Revisar 10 Flashcards diários (repetição inteligente).", checked: false },
      { text: "Realizar 1 simulado (Quiz) de nível básico/avançado.", checked: false },
      { text: "Anotar insights ou análises no Diário de Estudos.", checked: false }
    ]
  },
  {
    id: "gear_check",
    title: "Verificação de Equipamentos Individuais (Geral)",
    items: [
      { text: "Inspeção visual e limpeza do armamento de treino seco.", checked: false },
      { text: "Verificação da integridade do coldre e presilhas de retenção.", checked: false },
      { text: "Inspeção dos carregadores e mola de compressão.", checked: false },
      { text: "Checagem do kit de primeiros socorros (IFAK) e validade do torniquete.", checked: false },
      { text: "Verificação de pilhas/bateria do protetor auricular eletrônico e lanternas.", checked: false }
    ]
  }
];

export const FLASHCARDS = [
  { id: 1, question: "Qual a diferença teórica entre Cobertura (Cover) e Ocultamento (Concealment)?", answer: "Cobertura esconde o operador E bloqueia projéteis balísticos (ex: pilar de concreto). Ocultamento apenas esconde a presença visual do operador, sem bloquear disparos (ex: porta de compensado)." },
  { id: 2, question: "No ciclo OODA de John Boyd, qual fase é considerada a mais importante e por quê?", answer: "A fase de Orientação (Orient). É nela que filtramos a realidade observada através de nossos modelos mentais, genética e cultura. Uma orientação falha estraga a decisão subsequente." },
  { id: 3, question: "O que é a 'Exclusão Auditiva' no alto estresse?", answer: "É uma reação adrenérgica onde o cérebro, sobrecarregado pela ameaça à vida, desliga ou silencia temporariamente o processamento auditivo para priorizar outros canais sensoriais." },
  { id: 4, question: "Como se caracteriza o 'Estado Amarelo' no ciclo das cores de Jeff Cooper?", answer: "Estado de Atenção Relaxada. O indivíduo está ciente de seu ambiente externo, monitora pessoas, saídas e anomalias sem estresse ou paranoia. É o estado ideal para o dia a dia." },
  { id: 5, question: "Qual o erro balístico comum ao disparar de dentro do veículo através do para-brisa?", answer: "Os projéteis sofrem desvio para cima ao perfurar o vidro laminado de dentro para fora, devido ao ângulo de inclinação do para-brisa." },
  { id: 6, question: "Qual o objetivo fisiológico do Box Breathing (Respiração Tática)?", answer: "Ativar o sistema nervoso parassimpático por meio da estimulação do nervo vago, reduzindo os batimentos cardíacos elevados e restaurando a capacidade de raciocínio racional." }
];

export const QUIZZES = [
  {
    id: 1,
    question: "Durante o alinhamento de miras (Sight Alignment), qual elemento deve receber o foco visual nítido do olho?",
    options: [
      "A massa de mira (dianteira).",
      "A alça de mira (traseira).",
      "O alvo.",
      "A zona de impacto preferencial."
    ],
    answer: 0,
    explanation: "O olho humano não consegue focar simultaneamente em três distâncias diferentes. Por isso, a doutrina prescreve focar nitidamente na massa de mira, deixando o alvo e a alça traseira ligeiramente borrados para garantir o alinhamento geométrico perfeito do cano."
  },
  {
    id: 2,
    question: "O Estado Preto no Ciclo de Jeff Cooper é caracterizado por qual comportamento fisiológico?",
    options: [
      "Foco extremo e disparo de precisão sob 120 BPM.",
      "Atenção relaxada e varredura do ambiente em busca de saídas.",
      "Pânico agudo, paralisia mental (Freeze) ou colapso cognitivo devido ao excesso de estresse.",
      "Preparação focada contra uma ameaça identificada."
    ],
    answer: 2,
    explanation: "O Estado Preto ocorre quando a frequência cardíaca ultrapassa os 175 BPM sob estresse letal severo, resultando no colapso cognitivo, perda da coordenação motora fina e incapacidade de tomar decisões racionais."
  },
  {
    id: 3,
    question: "Na dinâmica do OODA Loop, o que significa 'entrar no ciclo de decisão' do adversário?",
    options: [
      "Decidir de forma idêntica ao adversário para antecipar seus passos.",
      "Agir de forma mais rápida e imprevisível que o adversário, forçando-o a reagir a eventos passados e desorientando-o.",
      "Focar apenas na fase de Observação e esperar a ação dele.",
      "Ignorar o adversário e seguir o plano original rigorosamente."
    ],
    answer: 1,
    explanation: "Entrar no ciclo do oponente significa processar o OODA de forma mais rápida, forçando o adversário a reiniciar constantemente sua fase de 'Observação' e 'Orientação' perante suas novas ações, gerando caos mental e paralisia operacional no oponente."
  },
  {
    id: 4,
    question: "Qual das opções abaixo descreve um desvio de atenção conhecido como 'Viés de Confirmação'?",
    options: [
      "Olhar para os lados constantemente de forma desordenada.",
      "A capacidade de filtrar frequências de som graves.",
      "A tendência de focar apenas em pistas visuais que corroboram nossa crença prévia de que o ambiente está seguro.",
      "Realizar a respiração tática de forma apressada."
    ],
    answer: 2,
    explanation: "O Viés de Confirmação é um erro cognitivo onde filtramos as evidências do ambiente para apoiar nossa hipótese prévia (como acreditar que o suspeito está pegando uma carteira e não uma arma, simplesmente porque não queremos aceitar a gravidade do cenário)."
  },
  {
    id: 5,
    question: "Qual o benefício tático da postura Isósceles Ativa (Moderna) em relação à Weaver tradicional?",
    options: [
      "Ela oferece menor perfil do corpo para o alvo.",
      "Ela direciona a placa de blindagem frontal do colete balístico diretamente para a ameaça e melhora a absorção do recuo com o tronco projetado à frente.",
      "Ela cansa menos os braços em posições estáticas prolongadas.",
      "Ela permite disparar sem alinhar as miras do armamento."
    ],
    answer: 1,
    explanation: "A postura Isósceles Moderna projeta o tronco à frente de forma simétrica, alinhando a blindagem do colete balístico frontal (que protege os órgãos vitais) em direção à ameaça, além de permitir melhor mobilidade em 360 graus."
  }
];

export const BIBLIOGRAPHY = [
  {
    type: "Livro Recomendado",
    title: "On Combat: The Psychology and Physiology of Deadly Conflict in War and in Peace",
    author: "Dave Grossman",
    description: "Estudo definitivo sobre as respostas psicológicas e físicas do corpo humano submetido ao combate real e estresse de sobrevivência."
  },
  {
    type: "Doutrina Pública",
    title: "TC 3-22.9 / FM 3-22.9: Rifle and Carbine Marksmanship",
    author: "US Army",
    description: "Manual de campo de tiro do exército americano detalhando fundamentos de empunhadura, balística, e controle de recuo aplicáveis teoricamente."
  },
  {
    type: "Manual Técnico",
    title: "The Book of Two Guns",
    author: "Ken Hackathorn",
    description: "Análise clássica de conceitos de tiro tático de pistola e carabina, focando em posicionamento relativo e mecânica operacional clássica."
  },
  {
    type: "Podcast/Conteúdo Público",
    title: "Primary & Secondary Podcast",
    author: "Rede de Instrutores e Operadores",
    description: "Discussões profundas e painéis com especialistas em fatores humanos, balística terminal, psicologia do estresse e evolução da doutrina de CQB."
  }
];
