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
  "Por que devemos proteger os manguezais?": ["Servem de berçário para diversas espécies marinhas.", "Filtram poluentes da água.", "Protegem contra erosão costeira.", "Absorvem carbono da atmosfera."]

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