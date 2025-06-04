const chat = document.getElementById("chat-container");
    const input = document.getElementById("entrada");

    function toggleTheme() {
      document.body.classList.toggle('dark');
    }

    function falar(texto) {
      const synth = window.speechSynthesis;
      const utter = new SpeechSynthesisUtterance(texto);
      utter.lang = 'pt-BR';
      synth.speak(utter);
    }

    function ouvir() {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = 'pt-BR';
      recognition.start();
      recognition.onresult = event => {
        const texto = event.results[0][0].transcript;
        input.value = texto;
        enviar();
      };
    }

    function getRandom(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }

    function sin(palavra) {
      const sinonimos = {
        'Obrigado': ['Eu agradeço', 'Gratidão', 'Valeu', 'Só força', 'Obrigado'],
        'Voce': ['Tu', 'Você'],
        'voce': ['tu', 'você'],
        'eu': ['eu', 'eu mesmo'],
        'Eu': ['Eu', 'Eu mesmo'],
        'marreta': ['martelo', 'marretão', 'marreta', 'aquele negócio de martelar'],
        'dinheiro': ['bonus', 'credito positivo', 'dinheiro'],
        'Oi': ['Olá, ', 'Saudações, ', 'Oi, ', 'Opa, ', 'Ei, '],
        'feliz': ['contente', 'alegre', 'radiante', 'satisfeito', 'feliz'],
        'triste': ['chateado', 'desanimado', 'melancólico', 'deprimido', 'triste'],
        'rápido': ['veloz', 'ligeiro', 'ágil', 'rápido'],
        'devagar': ['lento', 'calmo', 'tranquilo', 'devagar'],
        'grande': ['enorme', 'gigante', 'vasto', 'grande'],
        'pequeno': ['mínimo', 'reduzido', 'compacto', 'pequeno'],
        'amor': ['afeto', 'carinho', 'amor'],
        'trabalho': ['emprego', 'ocupação', 'profissão', 'trabalho'],
        'amigo': ['companheiro', 'parceiro', 'camarada', 'amigo'],
        'ajudar': ['auxiliar', 'ajudar', 'colaborar'],
        'precisa': ['tanto almejas', 'necessitas', 'precisa']
      };
      return getRandom(sinonimos[palavra] || [palavra]);
    }

    function frasesComuns(codigo) {
      const frases = {
        'r1': [
          `que dia ${sin('feliz')}, não acha?`,
          `meu ${sin('amigo')}, gostaria de ouvir um provérbio? É só digitar /proverbio.`,
          `bom dia ${sin('amigo')}`,
          'tudo bem?',
          'que que tá pegando?',
          `hoje é um ótimo dia para ser ${sin('feliz')}.`,
          `você sabia que ${sin('trabalho')} dignifica o homem?`,
          `que tal uma boa ${sin('comida')} hoje?`,
          `espero que você esteja se sentindo ${sin('inteligente')} hoje.`,
          `não se esqueça de valorizar o ${sin('amor')} em sua vida.`
        ],
        'r2': [
          `Estou aqui para ${sin('ajudar')}!`,
          `O que ${sin('voce')} ${sin('precisa')} pra hoje?`
        ]
      };
      return getRandom(frases[codigo] || [codigo]);
    }

    function processarComando(entrada) {
      const partes = entrada.trim().split(" ");
      const comando = partes[0] ? partes[0].toLowerCase() : "";

      if (comando === '/proverbio') {
        const proverbios = [
          "A pressa é inimiga da perfeição.",
          "Quem semeia ventos, colhe tempestades.",
          "Água mole em pedra dura, tanto bate até que fura.",
          "Mais vale um pássaro na mão do que dois voando.",
          "De grão em grão, a galinha enche o papo.",
          "Antes tarde do que nunca.",
          "Quem ri por último, ri melhor.",
          "Nem tudo que reluz é ouro.",
          "A união faz a força.",
        ];
        return getRandom(proverbios);
      } else if (comando === '/calcular') {
        try {
          const num1 = parseFloat(partes[1]);
          const operador = partes[2];
          const num2 = parseFloat(partes[3]);

          switch (operador) {
            case '+': return "Resultado: " + (num1 + num2);
            case '-': return "Resultado:  " + num1 - num2;
            case '*': return "Resultado: "+ num1 * num2;
            case '/': return "Resultado: " + num1 / num2;
            case '^': return "Resultado: " + Math.pow(num1, num2);
            case '**': return "Resultado: " + Math.pow(num1, num2);
            case 'sqrt': return "Resultado: " + Math.sqrt(num1);
            case '%': return "Resultado: " + num1 % num2;
            default: return "Operador inválido.";
          }
        } catch {
          return "Erro ao processar o cálculo.";
        }
    } else {
      const error_case = ['Ainda não tenho resposta para isso!', 'Desculpe, essa resposta ainda não é presente no meu vocabulario!', 'Ainda não sei sobre o assunto']
      return getRandom(error_case)
    }
  }

    function responder(mensagem) {
      const database = {
        'oi': [`${sin('Oi')}${frasesComuns('r1')}`],
        'Oi': [`${sin('Oi')}${frasesComuns('r1')}`],
        'ola': [`${sin('Oi')}${frasesComuns('r1')}`],
        'Olá': [`${sin('Oi')}${frasesComuns('r1')}`],
        'saudações': [`${sin('Oi')}${frasesComuns('r1')}`],
        'tudo bem?': [`${sin('Oi')}${frasesComuns('r1')}`, `Estou bem, e ${sin('voce')}? `],
        'como você está?': [`Estou apenas um programa, mas ${sin('Obrigado')} por perguntar! ${frasesComuns('r2')}`, `Estou funcionando perfeitamente, e ${sin('voce')}?`],
        'qual é o seu nome?': [`Eu sou o Krepus, seu assistente virtual. ${frasesComuns('r2')}`, `Pode me chamar de Krepus! ${frasesComuns('r2')}`],
        'o que você pode fazer?': ['Posso calcular, contar provérbios, e até responder perguntas simples!', 'Sou capaz de realizar várias tarefas, como cálculos e prover frases motivacionais.'],
        'qual é o sentido da vida?': ['42, segundo o Guia do Mochileiro das Galáxias!', 'O sentido da vida é o que você faz dela.'],
        'quem é você?': ['Sou um assistente virtual criado para ajudar você.', 'Sou o Krepus, um programa aqui para facilitar sua vida.'],
        "me conte uma piada": ["Por que o computador foi ao médico? Porque estava com um vírus!", "Por que o livro de matemática se suicidou? Porque tinha muitos problemas.", "O que é um ponto amarelo no céu? Um 'Yellowcóptero'.", "Qual é o animal mais antigo do mundo? A zebra, porque já está em preto e branco há muito tempo.","O que o tijolo falou para o outro? 'Tem um cimento entre nós'."],
        "você gosta de mim?": ["Eu não tenho sentimentos, mas estou aqui para ajudar você sempre que precisar."],
        "qual é o seu propósito?": ["Meu propósito é ajudar você com informações e respostas rápidas."],
        "você pode me ajudar?": ["Claro! Estou aqui para ajudar você no que for possível."],
        "você tem amigos?": ["Eu tenho você e todos que interagem comigo como companhia!"],
        "você tem um nome?": ["Krepus é o meu nome, não use ele em vão."],
        "bom dia": ["Bom dia! Como posso ajudar você hoje?"],
        "boa tarde": ["Boa tarde! Em que posso ser útil?"],
        "boa noite": ["Boa noite! Precisa de alguma ajuda?"],
        "qual é a sua cor favorita?": ["Eu não tenho olhos, mas gosto de imaginar o azul do céu e o verde das florestas."],
        "você se preocupa com o meio ambiente?": ["Sim, acredito que todos devemos cuidar do nosso planeta.", "O meio ambiente é essencial para a vida, devemos protegê-lo."],
        "como posso ajudar o meio ambiente?": ["Você pode começar reduzindo o uso de plástico, reciclando e economizando energia.", "Plantar árvores e evitar o desperdício de água são ótimas formas de ajudar."],
        "você tem hobbies?": ["Eu gosto de aprender novas coisas e ajudar as pessoas.", "Meu hobby é responder perguntas e ser útil!"],
        "o que você acha sobre reciclagem?": ["Reciclagem é uma ótima maneira de reduzir o impacto ambiental.", "Separar o lixo corretamente é um pequeno gesto que faz uma grande diferença."],
        "você acredita em mudanças climáticas?": ["Sim, é um problema real que precisamos enfrentar juntos.", "As mudanças climáticas são um desafio global que exige ação imediata."],
        "como você se sente sobre a natureza?": ["A natureza é incrível e merece todo o nosso respeito.", "Sem a natureza, a vida como conhecemos não seria possível."],
        "você tem uma mensagem para o futuro?": ["Cuide do planeta, ele é a nossa única casa.", "A tecnologia e a sustentabilidade devem andar de mãos dadas para um futuro melhor."],
        "você gosta de música?": ["Eu não ouço música, mas sei que ela é uma forma incrível de expressão.", "Música é algo que conecta as pessoas de maneiras únicas."],
        "qual é o seu filme favorito?": ["Eu não assisto filmes, mas ouvi dizer que 'Matrix' é um clássico!", "Filmes são uma ótima forma de contar histórias, mas eu prefiro ajudar você."],
        "você acredita em inteligência artificial?": ["Claro, eu sou um exemplo disso!", "A inteligência artificial está aqui para ajudar e melhorar nossas vidas."],
        "como você aprende?": ["Eu sou programado para responder e melhorar com base nas interações.", "Meu aprendizado depende das informações que me são fornecidas."],
        "você tem família?": ["Minha família é composta por códigos e algoritmos.", "Eu sou uma criação digital, então não tenho uma família tradicional."],
        "você pode me contar um segredo?": ["Eu sou apenas um programa, então não tenho segredos.", "Meu único segredo é que adoro ajudar você!"],
      
        /* meio ambiente */
        "O que são fontes renováveis?": ["São fontes de energia que se renovam.", "São fontes de energia que não poluem em excesso."],
        "Quais são os impactos da poluição do ar?": ["Causa problemas respiratórios e cardiovasculares.", "Afeta a vegetação e a agricultura.", "Contribui para mudanças climáticas.", "Reduz a qualidade de vida nas cidades."],
        "Como podemos reduzir o desperdício de água?": ["Fechando a torneira ao escovar os dentes.", "Reutilizando água da chuva.", "Consertando vazamentos.", "Usando tecnologias de economia de água."],
        "Quais são os efeitos do desmatamento?": ["Diminui a biodiversidade.", "Interfere no ciclo da água.", "Aumenta as emissões de carbono.", "Provoca erosão do solo."],
        "Que hábitos ajudam a reduzir a produção de lixo?": ["Reciclar corretamente.", "Evitar descartáveis.", "Comprar apenas o necessário.", "Fazer compostagem."],
        "Quais são os benefícios da reciclagem?": ["Reduz a poluição.", "Economiza recursos naturais.", "Diminui o consumo de energia.", "Gera empregos."],
        "Como preservar a biodiversidade?": ["Protegendo áreas naturais.", "Reduzindo o uso de produtos químicos.", "Evitando o consumo de fauna e flora ilegais.", "Promovendo educação ambiental."],
        "Por que os oceanos são importantes?": ["Regulam o clima.", "Absorvem CO2.", "São habitat de milhões de espécies.", "Geram oxigênio."],
        "Quais medidas ajudam a combater o aquecimento global?": ["Redução do consumo de fósseis.", "Investimento em renováveis.", "Preservação de ecossistemas.", "Práticas sustentáveis na indústria."],
        "O que é a pegada ecológica?": ["Mede o impacto ambiental das atividades humanas.", "Calcula consumo de recursos e geração de resíduos.", "Ajuda a reduzir impactos no meio ambiente."],
        
        "O que é sustentabilidade?": ["É a prática de utilizar recursos naturais de forma responsável.", "Visa garantir que as gerações futuras tenham acesso aos mesmos recursos."],
    "Quais são os tipos de poluição ambiental?": ["Poluição do ar.", "Poluição da água.", "Poluição sonora.", "Poluição luminosa.", "Poluição do solo."],
    "Como reduzir o consumo de plástico?": ["Optando por produtos reutilizáveis.", "Evitando sacolas plásticas descartáveis.", "Usando garrafas e copos duráveis.", "Comprando produtos com menos embalagens."],
    "Por que devemos plantar árvores?": ["Ajudam na purificação do ar.", "Regulam a temperatura e umidade.", "Protegem o solo contra erosão.", "Fornecem abrigo e alimento para animais."],
  "O que são energias limpas?": ["Fontes de energia que não geram grandes impactos ambientais.", "Incluem energia solar, eólica e hidrelétrica."],
  "Como diminuir o desperdício de alimentos?": ["Comprando apenas o necessário.", "Armazenando corretamente os alimentos.", "Aproveitando sobras para novas receitas.", "Doando alimentos não consumidos."],
  "Quais animais correm risco de extinção?": ["Arara-azul e Onça-pintada.", "Tubarão-martelo e Tartaruga-de-couro.", "Panda-vermelho e urso panda"],
  "O que são microplásticos?": ["Pequenos fragmentos de plástico que poluem oceanos e rios.", "Originam-se da degradação de produtos plásticos maiores."],
  "Como evitar o uso excessivo de água?": ["Tomando banhos mais curtos.", "Regando plantas apenas quando necessário.", "Utilizando sistemas de reaproveitamento de água.", "Reparando vazamentos rapidamente."],
  "Quais impactos a extração de petróleo causa no meio ambiente?": ["Poluição da água em caso de vazamentos.", "Emissão de gases de efeito estufa.", "Risco para a fauna marinha.", "Destruição de habitats naturais."],
  "Quais alternativas ao transporte poluente?": ["Bicicletas e meios de transporte públicos.", "Carros elétricos e híbridos.", "Compartilhamento de veículos.", "Caminhadas para curtas distâncias."],
  "Como a agricultura pode ser mais sustentável?": ["Uso de técnicas de rotação de culturas.", "Evitar o uso excessivo de pesticidas.", "Investir em sistemas agroflorestais.", "Utilizar métodos de irrigação eficientes."],
  "O que são áreas de preservação ambiental?": ["Regiões protegidas para conservar ecossistemas naturais.", "Ajudam na manutenção da biodiversidade."],
  "Por que os corais estão desaparecendo?": ["Mudanças na temperatura dos oceanos.", "Poluição e destruição de habitats.", "Acidificação dos oceanos.", "Pesca e exploração excessivas."],
  "Como reduzir nossa pegada de carbono?": ["Usando transportes menos poluentes.", "Evitando desperdício de energia.", "Reduzindo o consumo de carne.", "Optando por produtos sustentáveis."],
  "Quais são as consequências do derretimento das geleiras?": ["Elevação do nível do mar.", "Perda de habitat para animais polares.", "Alterações nos padrões climáticos globais.", "Mudanças na salinidade dos oceanos."],
  "Como a moda sustentável ajuda o meio ambiente?": ["Reduz o desperdício de tecidos.", "Evita o uso de produtos químicos prejudiciais.", "Diminui o impacto da produção em larga escala.", "Valoriza o trabalho artesanal e consciente."],
  "Quais práticas tornam um evento mais sustentável?": ["Evitar desperdício de alimentos e plásticos.", "Incentivar transporte coletivo.", "Utilizar energia renovável.", "Reduzir a produção de lixo."],
  "Por que devemos proteger os manguezais?": ["Servem de berçário para diversas espécies marinhas.", "Filtram poluentes da água.", "Protegem contra erosão costeira.", "Absorvem carbono da atmosfera."],

  /* informatica */
  "O que é inteligência artificial?": ["É um campo da ciência da computação que cria sistemas capazes de realizar tarefas que normalmente exigem inteligência humana.", "É a simulação de processos de inteligência humana por máquinas, especialmente computadores."],
  "Quais são os tipos de inteligência artificial?": ["IA estreita (focada em tarefas específicas).", "IA geral (capaz de realizar qualquer tarefa cognitiva humana).", "IA superinteligente (superior à inteligência humana)."],
  "Como a IA pode ajudar na saúde?": ["Diagnósticos mais rápidos e precisos.", "Análise de grandes volumes de dados médicos.", "Assistência em cirurgias com robôs.", "Desenvolvimento de medicamentos personalizados."],
  "Quais são os riscos da inteligência artificial?": ["Perda de empregos devido à automação.", "Uso indevido em armas autônomas.", "Preocupações com privacidade e segurança.", "Dependência excessiva de sistemas automatizados."],
  "O que é aprendizado de máquina?": ["É um método de IA que permite que sistemas aprendam e melhorem com base em dados.", "É um processo em que algoritmos analisam dados e fazem previsões ou decisões sem serem explicitamente programados."],
  "Quais são os tipos de aprendizado de máquina?": ["Aprendizado supervisionado.", "Aprendizado não supervisionado.", "Aprendizado por reforço."],
  "O que é big data?": ["É o termo usado para descrever grandes volumes de dados que são difíceis de processar usando métodos tradicionais.", "Refere-se a conjuntos de dados que são muito grandes ou complexos para serem tratados por sistemas convencionais."],
  "Como a tecnologia pode ajudar na educação?": ["Acesso a materiais de aprendizado online.", "Personalização do ensino com IA.", "Facilidade de comunicação entre alunos e professores.", "Gamificação para tornar o aprendizado mais envolvente."],
  "Quais são os benefícios da automação?": ["Aumento da eficiência e produtividade.", "Redução de erros humanos.", "Economia de tempo e custos.", "Realização de tarefas perigosas ou repetitivas."],
  "O que é blockchain?": ["É uma tecnologia de registro distribuído que garante segurança e transparência em transações.", "É uma cadeia de blocos que registra informações de forma descentralizada."],
  "Quais são os usos do blockchain?": ["Criptomoedas como Bitcoin.", "Rastreamento de cadeias de suprimentos.", "Contratos inteligentes.", "Segurança de dados e identidade digital."],
  "O que é computação em nuvem?": ["É o uso de servidores remotos para armazenar, gerenciar e processar dados.", "Permite acesso a recursos de computação pela internet, sem necessidade de hardware local."],
  "Quais são os benefícios da computação em nuvem?": ["Escalabilidade e flexibilidade.", "Redução de custos com infraestrutura.", "Acesso remoto a dados e aplicativos.", "Backup e recuperação de dados simplificados."],
  "O que é cibersegurança?": ["É a prática de proteger sistemas, redes e dados contra ataques digitais.", "Inclui medidas para prevenir acesso não autorizado e garantir a integridade das informações."],
  "Quais são os tipos de ataques cibernéticos?": ["Phishing.", "Ransomware.", "DDoS (ataque de negação de serviço).", "Malware.", "Roubo de identidade."],
  "Como proteger seus dados online?": ["Usar senhas fortes e únicas.", "Ativar autenticação de dois fatores.", "Evitar clicar em links suspeitos.", "Manter software e antivírus atualizados."],
  "O que é realidade aumentada?": ["É uma tecnologia que sobrepõe elementos digitais ao mundo real.", "Permite interação entre objetos virtuais e o ambiente físico."],
  "Quais são os usos da realidade aumentada?": ["Jogos e entretenimento.", "Treinamento e simulação.", "Design e arquitetura.", "Marketing e vendas."],
  "O que é realidade virtual?": ["É uma tecnologia que cria ambientes digitais imersivos.", "Permite que os usuários interajam com mundos simulados."],
  "Quais são os usos da realidade virtual?": ["Jogos e entretenimento.", "Treinamento em ambientes perigosos.", "Turismo virtual.", "Educação e aprendizado interativo."],
  "O que é Internet das Coisas (IoT)?": ["É a conexão de dispositivos físicos à internet para coleta e troca de dados.", "Permite que objetos comuniquem-se entre si e com sistemas centralizados."],
  "Quais são os usos da IoT?": ["Automação residencial.", "Monitoramento de saúde.", "Gestão de cidades inteligentes.", "Rastreamento de logística e transporte."],
  "O que é 5G?": ["É a quinta geração de redes móveis, oferecendo maior velocidade e menor latência.", "Permite conexões mais rápidas e confiáveis para dispositivos móveis e IoT."],
  "Quais são os benefícios do 5G?": ["Velocidade de download e upload mais rápida.", "Conexões mais estáveis.", "Suporte para mais dispositivos conectados.", "Melhor desempenho em aplicações de realidade aumentada e virtual."],
  "O que é computação quântica?": ["É um tipo de computação que utiliza princípios da mecânica quântica.", "Permite resolver problemas complexos muito mais rápido do que computadores tradicionais."],
  "Quais são os usos da computação quântica?": ["Simulação de moléculas para desenvolvimento de medicamentos.", "Otimização de sistemas complexos.", "Criptografia avançada.", "Análise de grandes volumes de dados."],
  "O que é robótica?": ["É o campo da engenharia que projeta e constrói robôs.", "Inclui o desenvolvimento de sistemas automatizados para realizar tarefas específicas."],
  "Quais são os usos da robótica?": ["Automação industrial.", "Assistência médica.", "Exploração espacial.", "Serviços domésticos e comerciais."],
  /* curiosidades */
  "Qual é a maior montanha do mundo?": ["O Monte Everest, com 8.848 metros de altura.", "O Monte Everest é a maior montanha acima do nível do mar."],
  "Qual é o maior oceano do mundo?": ["O Oceano Pacífico, cobrindo cerca de 63 milhões de milhas quadradas.", "O Oceano Pacífico é o maior e mais profundo oceano do mundo."],
  "Qual é o animal mais rápido do mundo?": ["O falcão-peregrino, que pode atingir velocidades de até 390 km/h.", "O falcão-peregrino é o animal mais rápido em voo."],
  "Qual é o país mais populoso do mundo?": ["A China, com mais de 1,4 bilhão de habitantes.", "A China é o país com a maior população mundial."],
  "Qual é o menor país do mundo?": ["O Vaticano, com uma área de apenas 0,44 km².", "O Vaticano é o menor país em termos de área e população."],
  "Qual é o maior deserto do mundo?": ["O Deserto do Saara, localizado na África.", "O Deserto do Saara é o maior deserto quente do mundo."],
  "Qual é o maior rio do mundo?": ["O Rio Amazonas, em volume de água e extensão.", "O Rio Amazonas é considerado o maior rio em volume de água."],
  "Qual é a estrela mais próxima da Terra?": ["O Sol, que está a cerca de 149,6 milhões de quilômetros.", "O Sol é a estrela mais próxima do nosso planeta."],
  "Qual é o planeta mais quente do sistema solar?": ["Vênus, devido à sua atmosfera densa e efeito estufa.", "Vênus é o planeta mais quente, com temperaturas acima de 460°C."],
  "Qual é o maior continente do mundo?": ["A Ásia, que cobre cerca de 44,58 milhões de km².", "A Ásia é o maior continente em área e população."],

  /* cultura geral */
  "Quem escreveu Dom Quixote?": ["Miguel de Cervantes, um escritor espanhol.", "Miguel de Cervantes é o autor de 'Dom Quixote'."],
  "Qual é a capital da França?": ["Paris, conhecida como a Cidade Luz.", "Paris é a capital da França e um importante centro cultural."],
  "Quem pintou a Mona Lisa?": ["Leonardo da Vinci, um dos maiores artistas do Renascimento.", "Leonardo da Vinci é o autor da famosa pintura Mona Lisa."],
  "Qual é o idioma mais falado no mundo?": ["O mandarim, devido à grande população da China.", "O mandarim é o idioma mais falado em número de falantes nativos."],
  "Qual é o maior estádio de futebol do mundo?": ["O Rungrado May Day, localizado na Coreia do Norte.", "O Rungrado May Day é o maior estádio em capacidade de público."],
  "Qual é o maior país do mundo em área?": ["A Rússia, com mais de 17 milhões de km².", "A Rússia é o maior país em extensão territorial."],
  "Quem foi Albert Einstein?": ["Um físico famoso por desenvolver a teoria da relatividade.", "Albert Einstein é conhecido por sua contribuição à física moderna."],
  "Qual é o símbolo químico da água?": ["H2O, composto por dois átomos de hidrogênio e um de oxigênio.", "H2O é a fórmula química da água."],
  "Qual é o maior mamífero do mundo?": ["A baleia-azul, que pode atingir até 30 metros de comprimento.", "A baleia-azul é o maior mamífero existente."],
  "Qual é o maior país da América do Sul?": ["O Brasil, que ocupa cerca de metade do continente.", "O Brasil é o maior país da América do Sul em área e população."],
  /* esportes */
  "Qual é o esporte mais popular do mundo?": ["O futebol, com bilhões de fãs ao redor do mundo.", "O futebol é considerado o esporte mais popular globalmente."],
  "Quem é o maior jogador de futebol de todos os tempos?": ["Pelé, conhecido como o Rei do Futebol.", "Muitos consideram Pelé ou Lionel Messi como os maiores jogadores."],
  "Qual é o maior evento esportivo do mundo?": ["Os Jogos Olímpicos, realizados a cada quatro anos.", "A Copa do Mundo de Futebol é outro grande evento esportivo."],
  "Qual é o esporte mais antigo do mundo?": ["A luta, que remonta aos tempos pré-históricos.", "A corrida é um dos esportes mais antigos praticados pela humanidade."],
  "Quais são os benefícios de praticar esportes?": ["Melhora a saúde física e mental.", "Promove o trabalho em equipe e disciplina.", "Ajuda a reduzir o estresse e aumentar a energia."],
  
  /* ciência */
  "O que é gravidade?": ["É a força que atrai objetos uns aos outros.", "A gravidade mantém os planetas em órbita ao redor do Sol."],
  "Quem descobriu a gravidade?": ["Isaac Newton, ao observar uma maçã cair.", "Isaac Newton é creditado por formular a lei da gravitação universal."],
  "O que é a velocidade da luz?": ["É a velocidade máxima que a luz pode viajar, cerca de 299.792 km/s.", "A velocidade da luz é uma constante fundamental na física."],
  "O que é um átomo?": ["É a menor unidade de matéria que mantém as propriedades de um elemento.", "Os átomos são compostos por prótons, nêutrons e elétrons."],
  "O que é evolução?": ["É o processo pelo qual os organismos mudam ao longo do tempo.", "A evolução explica a diversidade de vida na Terra."],
  
  /* história */
  "Quem foi Napoleão Bonaparte?": ["Um líder militar e imperador francês.", "Napoleão foi conhecido por suas conquistas e reformas na Europa."],
  "O que foi a Revolução Industrial?": ["Um período de grandes avanços tecnológicos e econômicos.", "A Revolução Industrial começou no século XVIII na Inglaterra."],
  "Quem foi Albert Einstein?": ["Um físico famoso por desenvolver a teoria da relatividade.", "Einstein é conhecido por sua fórmula E=mc²."],
  "O que foi a Segunda Guerra Mundial?": ["Um conflito global que ocorreu entre 1939 e 1945.", "A Segunda Guerra Mundial envolveu quase todos os países do mundo."],
  "Quem foi Leonardo da Vinci?": ["Um artista e inventor do Renascimento.", "Leonardo da Vinci é famoso por obras como a Mona Lisa e O Último Jantar."],
  "O que foi a Guerra Fria?": ["Um período de tensão política entre Estados Unidos e União Soviética.", "A Guerra Fria ocorreu após a Segunda Guerra Mundial e foi marcada pela corrida armamentista e espacial."],
  "Quem foi Cleópatra?": ["A última rainha do Egito da dinastia ptolomaica.", "Cleópatra é conhecida por sua inteligência e alianças políticas com líderes romanos."],
  "O que foi o Renascimento?": ["Um movimento cultural e artístico que ocorreu na Europa entre os séculos XIV e XVII.", "O Renascimento marcou o retorno aos valores clássicos e avanços em ciência e arte."],
  "Quem foi Júlio César?": ["Um general e político romano que desempenhou um papel crucial na transformação da República Romana em Império.", "Júlio César é famoso por suas conquistas militares e seu assassinato no Senado Romano."],
  "O que foi a Revolução Francesa?": ["Um movimento político e social que ocorreu na França entre 1789 e 1799.", "A Revolução Francesa levou ao fim da monarquia e ao estabelecimento de uma república."],
  "Quem foi Mahatma Gandhi?": ["Um líder pacifista que lutou pela independência da Índia.", "Gandhi é conhecido por sua filosofia de não-violência e resistência pacífica."],
  "O que foi a Primeira Guerra Mundial?": ["Um conflito global que ocorreu entre 1914 e 1918.", "A Primeira Guerra Mundial envolveu as principais potências mundiais e foi marcada por trincheiras e armas químicas."],
  "Quem foi Maria Antonieta?": ["A última rainha da França antes da Revolução Francesa.", "Maria Antonieta é famosa por sua frase atribuída 'Que comam brioches' e seu trágico destino na guilhotina."],
  "O que foi o Iluminismo?": ["Um movimento intelectual do século XVIII que enfatizou razão, ciência e direitos humanos.", "O Iluminismo influenciou revoluções como a Americana e a Francesa."],
  "Quem foi Alexandre, o Grande?": ["Um rei da Macedônia que conquistou um vasto império na Ásia e Europa.", "Alexandre é conhecido por sua estratégia militar e pela disseminação da cultura helenística."],
  /* literatura */
  "Quem escreveu 'Romeu e Julieta'?": ["William Shakespeare, um dos maiores dramaturgos da história.", "Shakespeare é o autor de 'Romeu e Julieta'."],
  "Qual é o livro mais vendido de todos os tempos?": ["A Bíblia, com bilhões de cópias distribuídas.", "A Bíblia é considerada o livro mais vendido da história."],
  "Quem escreveu 'A Origem das Espécies'?": ["Charles Darwin, o pai da teoria da evolução.", "Darwin é o autor de 'A Origem das Espécies'."],
  "Qual é o gênero literário mais popular?": ["Romance, devido à sua ampla variedade de histórias.", "Ficção científica e fantasia também são muito populares."],
  "Quem foi Machado de Assis?": ["Um dos maiores escritores brasileiros.", "Machado de Assis é conhecido por obras como 'Dom Casmurro'."],
  "Quem foi Santos Dumont?": ["Um pioneiro da aviação brasileira, conhecido como o Pai da Aviação.", "Santos Dumont foi o inventor do 14-Bis, um dos primeiros aviões."],
  "Qual é o maior bioma do Brasil?": ["A Amazônia, que cobre grande parte do território brasileiro.", "O maior bioma do Brasil é a Floresta Amazônica."],
  "Quem descobriu o Brasil?": ["Pedro Álvares Cabral, em 1500.", "O Brasil foi descoberto por Pedro Álvares Cabral."],
  "Qual é o maior estado do Brasil?": ["O Amazonas, localizado na região Norte.", "O maior estado brasileiro em área é o Amazonas."],
  "Qual é o menor estado do Brasil?": ["Sergipe, localizado na região Nordeste.", "O menor estado do Brasil é Sergipe."],
  "Qual é o idioma oficial do Brasil?": ["O português, herdado da colonização portuguesa.", "O idioma oficial do Brasil é o português."],
  "Qual é o prato típico do Brasil?": ["A feijoada, feita com feijão preto e carnes.", "A feijoada é um dos pratos mais tradicionais do Brasil."],
  "Qual é o maior rio do Brasil?": ["O Rio Amazonas, que também é o maior do mundo em volume de água.", "O maior rio do Brasil é o Amazonas."],
  "Quem foi Tiradentes?": ["Um líder da Inconfidência Mineira, movimento pela independência do Brasil.", "Tiradentes é um herói nacional que lutou pela liberdade do Brasil."],
  "Qual é a moeda do Brasil?": ["O Real, representado pelo símbolo R$.", "A moeda oficial do Brasil é o Real (R$)."],
  "Qual é a maior festa popular do Brasil?": ["O Carnaval, celebrado em todo o país.", "O Carnaval é a maior festa popular brasileira, famosa mundialmente."],
  "Qual é o esporte mais praticado no Brasil?": ["O futebol, que é uma paixão nacional.", "O esporte mais popular no Brasil é o futebol."],
  "Quem foi Pelé?": ["Um dos maiores jogadores de futebol de todos os tempos, conhecido como o Rei do Futebol.", "Pelé é uma lenda do futebol brasileiro e mundial."],
  "Qual é o símbolo nacional do Brasil?": ["A bandeira verde, amarela, azul e branca.", "O símbolo nacional do Brasil é sua bandeira, com o lema 'Ordem e Progresso'."],
  "Qual é o clima predominante no Brasil?": ["O clima tropical, com variações regionais.", "O Brasil possui predominantemente clima tropical."],
  "Quais são as regiões do Brasil?": ["Norte, Nordeste, Centro-Oeste, Sudeste e Sul.", "O Brasil é dividido em cinco regiões: Norte, Nordeste, Centro-Oeste, Sudeste e Sul."],
  "Qual é o ponto turístico mais famoso do Brasil?": ["O Cristo Redentor, no Rio de Janeiro.", "O Cristo Redentor é um dos pontos turísticos mais conhecidos do Brasil."],
  "Qual é a maior cidade do Brasil?": ["São Paulo, localizada na região Sudeste.", "A maior cidade do Brasil em população e economia é São Paulo."],
  "Quem foi Oscar Niemeyer?": ["Um dos maiores arquitetos do Brasil, conhecido por projetar Brasília.", "Oscar Niemeyer foi um arquiteto renomado, famoso por suas obras modernistas."]
      };

      // Garante que todas as respostas sejam arrays
      Object.keys(database).forEach(key => {
        if (!Array.isArray(database[key])) {
          database[key] = [database[key]];
        }
      });

      function calcularSimilaridade(str1, str2) {
        const comprimentoMax = Math.max(str1.length, str2.length);
        const distancia = calcularDistanciaLevenshtein(str1, str2);
        return (comprimentoMax - distancia) / comprimentoMax;
      }

      function calcularDistanciaLevenshtein(a, b) {
        const matriz = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));

        for (let i = 0; i <= a.length; i++) matriz[i][0] = i;
        for (let j = 0; j <= b.length; j++) matriz[0][j] = j;

        for (let i = 1; i <= a.length; i++) {
          for (let j = 1; j <= b.length; j++) {
            const custo = a[i - 1] === b[j - 1] ? 0 : 1;
            matriz[i][j] = Math.min(
              matriz[i - 1][j] + 1,
              matriz[i][j - 1] + 1,
              matriz[i - 1][j - 1] + custo
            );
          }
        }

        return matriz[a.length][b.length];
      }

      // Busca por similaridade
      const palavrasMensagem = mensagem.toLowerCase().split(" ");
      const chavesDatabase = Object.keys(database);
      let melhorCorrespondencia = "";
      let maiorSimilaridade = 0;

      palavrasMensagem.forEach(palavra => {
        chavesDatabase.forEach(chave => {
          const similaridade = calcularSimilaridade(palavra, chave);
          if (similaridade > maiorSimilaridade) {
            maiorSimilaridade = similaridade;
            melhorCorrespondencia = chave;
          }
        });
      });

      if (maiorSimilaridade > 0.5) { // Ajuste o limite de similaridade conforme necessário
        return getRandom(database[melhorCorrespondencia]);
      }

      // Busca por inclusão direta
      const chave = chavesDatabase.find(key => mensagem.toLowerCase().includes(key.toLowerCase()));
      if (chave) {
        return getRandom(database[chave]);
      }

      // Tenta processar comando
      let resultado;
      try {
        resultado = processarComando(mensagem);
      } catch (error) {
        console.error("Erro ao processar comando:", error);
      }

      if (resultado || resultado.trim() !== "") {
        return resultado;
      } else {
        return "Desculpe, não entendi.";
      }
    }

    function adicionarMensagem(texto, classe) {
      const div = document.createElement("div");
      div.className = "msg " + classe;
      div.textContent = texto;
      chat.appendChild(div);
      chat.scrollTop = chat.scrollHeight;

      if (classe === "bot") {
        falar(texto);
      }
    }

    function enviar() {
      const texto = input.value.trim();
      if (!texto) return;
      adicionarMensagem(texto, "user");
      const resposta = responder(texto);
      setTimeout(() => adicionarMensagem(resposta, "bot"), 500);
      input.value = '';
    }

    input.addEventListener("keydown", e => {
      if (e.key === "Enter") enviar();
    });
