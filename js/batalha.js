const Batalha = {

    // =====================================================
    // ÁUDIOS
    // =====================================================

    sons: {

        selecionar:
            "assets/audio/audio_batalha/selecionar.mp3",

        dano:
            "assets/audio/audio_batalha/dano.mp3",

        mover:
            "assets/audio/audio_batalha/mover.mp3",

        slash:
            "assets/audio/audio_batalha/slash.mp3",

        inimigoDano:
            "assets/audio/audio_batalha/inimigo_dano.mp3",

        inimigoDanoForte:
            "assets/audio/audio_batalha/inimigo_danoforte.mp3",

        curar:
            "assets/audio/audio_batalha/curar.mp3",

        fogo:
            "assets/audio/audio_batalha/fogo.mp3",

        eletricidade:
            "assets/audio/audio_batalha/eletricidade.mp3",

        sangue:
            "assets/audio/audio_batalha/sangue.mp3",

        oba:
            "assets/audio/audio_batalha/oba.mp3"

    },


    tocarSomBatalha(nome) {

        const caminho =
            this.sons[nome];

        if (!caminho)
            return;

        const audio =
            new Audio(caminho);

        audio.volume = 1;

        audio.play().catch(() => {});

    },


    tocarDanoInimigo(valor) {

        this.tocarSomBatalha(
            valor > 300
                ? "inimigoDanoForte"
                : "inimigoDano"
        );

    },


    // =====================================================
    // ESTADO
    // =====================================================

    ativa: false,

    turno: "jogador",

    estado: "JOGADOR",

    batalhaIniciada: false,

    personagemSelecionado: null,

    acaoEscolhida: null,

    mudancaTurnoEmAndamento: false,

    executandoAcao: false,


    personagensAgiram: {

        ash: false,
        spike: false,
        manel: false

    },


    acoes: {},


    // =====================================================
    // PE
    // =====================================================

    pe: 100,

    peMax: 100,


    // =====================================================
    // EFEITOS
    // =====================================================

    coracaoDeSangueRodadas: 0,


    // =====================================================
    // PERSONAGENS
    // =====================================================

    ash: {

        nome: "ASH",

        hp: 140,
        hpMax: 140,

        defesa: false,

        sprite:
            "assets/imagens/batalha_imagens/ash/ash_lado.png"

    },


    spike: {

        nome: "SPIKE",

        hp: 100,
        hpMax: 100,

        defesa: false,

        sprite:
            "assets/imagens/batalha_imagens/spike/spike_lado.png"

    },


    manel: {

        nome: "MANEL",

        hp: 190,
        hpMax: 190,

        defesa: false,

        sprite:
            "assets/imagens/batalha_imagens/manel/manel_lado.png"

    },


    // =====================================================
    // MÁSCARA
    // =====================================================

    mascara: {

        hp: 2367,
        hpMax: 2367

    },


    // =====================================================
    // RESET
    // =====================================================

    resetar() {

        this.ativa = false;

        this.turno = "jogador";

        this.estado = "JOGADOR";

        this.batalhaIniciada = false;

        this.personagemSelecionado = null;

        this.acaoEscolhida = null;

        this.mudancaTurnoEmAndamento = false;

        this.executandoAcao = false;

        this.pe = this.peMax;

        this.coracaoDeSangueRodadas = 0;


        this.personagensAgiram = {

            ash: false,
            spike: false,
            manel: false

        };


        this.acoes = {};


        this.ash.hp =
            this.ash.hpMax;

        this.spike.hp =
            this.spike.hpMax;

        this.manel.hp =
            this.manel.hpMax;


        this.ash.defesa = false;

        this.spike.defesa = false;

        this.manel.defesa = false;


        this.resetarSpritesParaLado();


        this.mascara.hp =
            this.mascara.hpMax;


        this.removerMenu();


        if (
            typeof Coracao !== "undefined"
        ) {

            Coracao.remover();

        }


        if (
            typeof AtaqueMascara !== "undefined"
        ) {

            try {

                AtaqueMascara.finalizar();

            }
            catch {}

        }


        this.esconderArena();

    },


    // =====================================================
    // INTRODUÇÃO
    // =====================================================

    iniciarIntroducao() {

        AudioManager.pararMusica();

        AudioManager.tocarMusica(
            "eramseismascaras"
        );


        const falas = [

            {
                texto: "Interessante.",
                audio: "Bruno1"
            },

            {
                texto: "Você Sabia?",
                audio: "Bruno2"
            },

            {
                texto: "Você Imaginava?",
                audio: "Bruno3"
            },

            {
                texto: "Porque Veio Até Mim?",
                audio: "Bruno4"
            },

            {
                texto: "Curiosidade?",
                audio: "Bruno5"
            },

            {
                texto: "..."
            },

            {
                texto: "Excelente.",
                audio: "Bruno6"
            },

            {
                texto:
                    "Máscara. Sua Identidade Perdida.",
                audio: "Bruno7"
            },

            {
                texto:
                    "O Ritual Está Prestes À Começar.",
                audio: "Bruno8"
            },

            {
                texto:
                    "Você Está Aqui. Você Sobreviveu.",
                audio: "Bruno9"
            },

            {
                texto:
                    "E É Hora De Pegar Sua Identidade De Volta.",
                audio: "Bruno10"
            },

            {
                texto:
                    "Vamos Começar o RITUAL.",
                audio: "Bruno11"
            }

        ];


        let atual = 0;


        const continuar = (e) => {

            if (
                e.key !== "Enter"
            )
                return;


            if (
                atual >= falas.length
            ) {

                document.removeEventListener(
                    "keydown",
                    continuar
                );


                AudioManager.pararSom();

                AudioManager.pararMusica();


                this.iniciar();

                return;

            }


            const fala =
                falas[atual];


            UI.texto(
                "???",
                fala.texto
            );


            if (
                fala.audio
            ) {

                AudioManager.tocarFala(
                    fala.audio
                );

            }


            atual++;

        };


        document.addEventListener(
            "keydown",
            continuar
        );


        continuar({
            key: "Enter"
        });

    },


    // =====================================================
    // ARENA
    // =====================================================

    mostrarArena() {

        document.body.classList.add(
            "batalhaAtiva"
        );


        const game =
            document.getElementById("game");

        if (game)
            game.style.display = "none";


        const mobile =
            document.getElementById("mobile");

        if (mobile)
            mobile.style.display = "none";


        const arena =
            document.getElementById("arena");


        if (arena) {

            arena.style.display = "block";

            arena.classList.add(
                "batalhaAtiva"
            );

            arena.style.position =
                "relative";

        }

    },


    esconderArena() {

        document.body.classList.remove(
            "batalhaAtiva"
        );


        const game =
            document.getElementById("game");

        if (game)
            game.style.display = "";


        const mobile =
            document.getElementById("mobile");

        if (mobile)
            mobile.style.display = "";


        const arena =
            document.getElementById("arena");

        if (arena) {

            arena.style.display = "none";

            arena.classList.remove(
                "batalhaAtiva"
            );

        }


        this.removerMenu();

    },


    // =====================================================
    // INICIAR
    // =====================================================

    iniciar() {

        console.log(
            "================================"
        );

        console.log(
            "BATALHA INICIADA"
        );

        console.log(
            "================================"
        );


        this.ativa = true;

        this.batalhaIniciada = true;

        this.turno = "jogador";

        this.estado = "JOGADOR";

        this.personagemSelecionado = null;

        this.acaoEscolhida = null;

        this.mudancaTurnoEmAndamento = false;

        this.executandoAcao = false;


        this.pe = this.peMax;

        this.coracaoDeSangueRodadas = 0;


        this.personagensAgiram = {

            ash: false,
            spike: false,
            manel: false

        };


        this.acoes = {};


        this.ash.hp =
            this.ash.hpMax;

        this.spike.hp =
            this.spike.hpMax;

        this.manel.hp =
            this.manel.hpMax;


        this.ash.defesa = false;

        this.spike.defesa = false;

        this.manel.defesa = false;


        this.mascara.hp =
            this.mascara.hpMax;


        this.resetarSpritesParaLado();


        this.mostrarArena();


        // =================================================
        // MÁSCARA
        // =================================================

        if (
            typeof Mascara !== "undefined"
        ) {

            Mascara.hp =
                this.mascara.hp;

            Mascara.hpMax =
                this.mascara.hpMax;

            Mascara.fase = 1;

            Mascara.x = 1050;

            Mascara.y = 120;

            Mascara.sprite =
                "assets/imagens/fase1.png";

        }


        // =================================================
        // CORAÇÃO
        // =================================================

        if (
            typeof Coracao !== "undefined"
        ) {

            Coracao.parar();

        }


        // =================================================
        // ATAQUE DA MÁSCARA
        // =================================================

        if (
            typeof AtaqueMascara !== "undefined"
        ) {

            try {

                AtaqueMascara.ativo = false;

                AtaqueMascara.atirando = false;

                AtaqueMascara.finalizando = false;

            }
            catch {}

        }


        // =================================================
        // RENDER
        // =================================================

        if (
            typeof BatalhaRender !== "undefined"
        ) {

            if (
                typeof BatalhaRender.iniciar ===
                "function"
            ) {

                BatalhaRender.iniciar();

            }


            if (
                typeof BatalhaRender.esconderMenuAcoes ===
                "function"
            ) {

                BatalhaRender.esconderMenuAcoes();

            }

        }


        // =================================================
        // MÚSICA
        // =================================================

        AudioManager.pararMusica();

        AudioManager.tocarMusica(
            "mascaras"
        );


        // =================================================
        // LOOP
        // =================================================

        this.loop();


        // =================================================
        // PRIMEIRO MENU
        // =================================================

        setTimeout(
            () => {

                if (!this.ativa)
                    return;

                this.mostrarMenuPersonagens();

            },
            200
        );

    },


    // =====================================================
    // LOOP
    // =====================================================

    loop() {

        if (!this.ativa)
            return;


        this.atualizar();


        requestAnimationFrame(
            () => this.loop()
        );

    },


    // =====================================================
    // ATUALIZAR
    // =====================================================

    atualizar() {

        if (!this.ativa)
            return;


        if (
            typeof BatalhaRender !== "undefined"
        ) {

            if (
                typeof BatalhaRender.atualizar ===
                "function"
            ) {

                BatalhaRender.atualizar();

            }

        }


        // =================================================
        // CORAÇÃO
        // =================================================

        if (
            typeof Coracao !== "undefined"
        ) {

            Coracao.atualizar();

        }

    },


    // =====================================================
    // MENU BASE
    // =====================================================

    criarMenuBase() {

        this.removerMenu();


        const arena =
            document.getElementById("arena");

        if (!arena)
            return null;


        const menu =
            document.createElement("div");


        menu.id =
            "batalhaMenu";


        menu.style.position =
            "absolute";

        menu.style.left =
            "20px";

        menu.style.right =
            "20px";

        menu.style.bottom =
            "15px";

        menu.style.height =
            "175px";

        menu.style.background =
            "#050505";

        menu.style.border =
            "4px solid white";

        menu.style.boxSizing =
            "border-box";

        menu.style.zIndex =
            "9999";

        menu.style.fontFamily =
            "Determination, monospace";

        menu.style.color =
            "white";


        arena.appendChild(
            menu
        );


        return menu;

    },


    removerMenu() {

        const menu =
            document.getElementById(
                "batalhaMenu"
            );


        if (menu)
            menu.remove();

    },


    // =====================================================
    // MENU PERSONAGENS
    // =====================================================

    mostrarMenuPersonagens() {

        if (!this.ativa)
            return;


        if (
            this.turno !== "jogador"
        )
            return;


        this.estado =
            "ESCOLHER_PERSONAGEM";


        this.personagemSelecionado =
            null;


        const menu =
            this.criarMenuBase();

        if (!menu)
            return;


        const topo =
            document.createElement("div");


        topo.style.height = "48px";

        topo.style.display = "flex";

        topo.style.alignItems = "center";

        topo.style.justifyContent =
            "space-between";

        topo.style.padding =
            "0 15px";

        topo.style.boxSizing =
            "border-box";


        menu.appendChild(
            topo
        );


        const titulo =
            document.createElement("div");


        titulo.textContent =
            "ESCOLHA UM PERSONAGEM";


        titulo.style.fontSize =
            "25px";


        topo.appendChild(
            titulo
        );


        const pe =
            document.createElement("div");


        pe.id =
            "batalhaPE";


        pe.textContent =
            `PE: ${this.pe}/${this.peMax}`;


        pe.style.fontSize =
            "23px";


        topo.appendChild(
            pe
        );


        const personagens =
            document.createElement("div");


        personagens.style.display =
            "flex";

        personagens.style.gap =
            "12px";

        personagens.style.height =
            "110px";

        personagens.style.padding =
            "5px 10px";

        personagens.style.boxSizing =
            "border-box";


        menu.appendChild(
            personagens
        );


        this.criarBotaoPersonagem(
            personagens,
            "ash"
        );


        this.criarBotaoPersonagem(
            personagens,
            "spike"
        );


        this.criarBotaoPersonagem(
            personagens,
            "manel"
        );

    },


    criarBotaoPersonagem(
        container,
        nome
    ) {

        const personagem =
            this[nome];


        if (!personagem)
            return;


        const botao =
            document.createElement("button");


        botao.style.flex = "1";

        botao.style.background = "#111";

        botao.style.border =
            "3px solid white";

        botao.style.color = "white";

        botao.style.cursor = "pointer";

        botao.style.fontFamily =
            "Determination, monospace";

        botao.style.position =
            "relative";

        botao.style.display =
            "flex";

        botao.style.alignItems =
            "center";

        botao.style.justifyContent =
            "center";

        botao.style.gap =
            "10px";


        if (
            this.personagensAgiram[nome] ||
            personagem.hp <= 0
        ) {

            botao.style.opacity =
                "0.35";

            botao.disabled =
                true;

        }


        const imagem =
            document.createElement("img");


        const cabecas = {

            ash:
                "assets/imagens/batalha_imagens/cabeças/ash_cabeça.png",

            spike:
                "assets/imagens/batalha_imagens/cabeças/ovo_cabeça.png",

            manel:
                "assets/imagens/batalha_imagens/cabeças/manel_cabeça.png"

        };


        imagem.src =
            cabecas[nome];


        imagem.style.width =
            "55px";

        imagem.style.height =
            "55px";

        imagem.style.objectFit =
            "contain";


        imagem.onerror = () => {

            console.warn(
                "ERRO AO CARREGAR CABEÇA:",
                imagem.src
            );

        };


        botao.appendChild(
            imagem
        );


        const info =
            document.createElement("div");


        info.style.textAlign =
            "left";


        info.innerHTML = `

            <div style="
                font-size:22px;
                margin-bottom:5px;
            ">
                ${personagem.nome}
            </div>

            <div style="
                font-size:18px;
            ">
                HP: ${personagem.hp}/${personagem.hpMax}
            </div>

        `;


        botao.appendChild(
            info
        );


        botao.onclick = () => {

            if (!this.ativa)
                return;


            if (
                this.personagensAgiram[nome]
            )
                return;


            if (
                personagem.hp <= 0
            )
                return;


            this.tocarSomBatalha(
                "selecionar"
            );


            this.abrirAcoes(
                nome
            );

        };


        container.appendChild(
            botao
        );

    },


    // =====================================================
    // ABRIR AÇÕES
    // =====================================================

    abrirAcoes(nome) {

        if (!this.ativa)
            return;


        if (
            this.turno !== "jogador"
        )
            return;


        if (
            this.personagensAgiram[nome]
        )
            return;


        if (
            this[nome].hp <= 0
        )
            return;


        this.personagemSelecionado =
            nome;


        this.estado =
            "ESCOLHER_ACAO";


        const menu =
            this.criarMenuBase();

        if (!menu)
            return;


        const personagem =
            this[nome];


        const cabecalho =
            document.createElement("div");


        cabecalho.style.height = "45px";

        cabecalho.style.display =
            "flex";

        cabecalho.style.alignItems =
            "center";

        cabecalho.style.justifyContent =
            "space-between";

        cabecalho.style.padding =
            "0 12px";


        menu.appendChild(
            cabecalho
        );


        const nomeTexto =
            document.createElement("div");


        nomeTexto.textContent =
            personagem.nome;


        nomeTexto.style.fontSize =
            "25px";


        cabecalho.appendChild(
            nomeTexto
        );


        const pe =
            document.createElement("div");


        pe.textContent =
            `PE: ${this.pe}/${this.peMax}`;


        pe.style.fontSize =
            "22px";


        cabecalho.appendChild(
            pe
        );


        const botoes =
            document.createElement("div");


        botoes.style.display =
            "grid";

        botoes.style.gridTemplateColumns =
            "repeat(4, 1fr)";

        botoes.style.gap =
            "8px";

        botoes.style.padding =
            "5px 10px";


        menu.appendChild(
            botoes
        );


        if (nome === "ash") {

            this.criarBotaoAcao(
                botoes,
                "atacar",
                "ATACAR",
                () => this.prepararAtaque("ash")
            );


            this.criarBotaoAcao(
                botoes,
                "ritual",
                "RITUAL",
                () => this.mostrarRituaisAsh()
            );


            this.criarBotaoAcao(
                botoes,
                "defender",
                "DEFENDER",
                () => this.defender("ash")
            );


            this.criarBotaoAcao(
                botoes,
                "agir",
                "AGIR",
                () => this.mostrarAgirAsh()
            );

        }


        if (nome === "spike") {

            this.criarBotaoAcao(
                botoes,
                "ritual",
                "RITUAL",
                () => this.mostrarRituaisSpike()
            );


            this.criarBotaoAcao(
                botoes,
                "defender",
                "DEFENDER",
                () => this.defender("spike")
            );


            this.criarBotaoAcao(
                botoes,
                "agir",
                "AGIR",
                () => this.mostrarAgirSpike()
            );

        }


        if (nome === "manel") {

            this.criarBotaoAcao(
                botoes,
                "atacar",
                "ATACAR",
                () => this.prepararAtaque("manel")
            );


            this.criarBotaoAcao(
                botoes,
                "defender",
                "DEFENDER",
                () => this.defender("manel")
            );


            this.criarBotaoAcao(
                botoes,
                "agir",
                "AGIR",
                () => this.mostrarAgirManel()
            );

        }

    },


    criarBotaoAcao(
        container,
        id,
        texto,
        funcao
    ) {

        const botao =
            document.createElement("button");


        botao.textContent =
            texto;


        botao.style.height =
            "65px";

        botao.style.background =
            "#111";

        botao.style.color =
            "white";

        botao.style.border =
            "3px solid white";

        botao.style.fontFamily =
            "Determination, monospace";

        botao.style.fontSize =
            "22px";

        botao.style.cursor =
            "pointer";


        botao.onclick = () => {

            if (
                this.estado !==
                "ESCOLHER_ACAO"
            )
                return;


            this.tocarSomBatalha(
                "selecionar"
            );


            funcao();

        };


        container.appendChild(
            botao
        );

    },


    // =====================================================
    // VOLTAR
    // =====================================================

    voltarPersonagens() {

        if (!this.ativa)
            return;


        this.mostrarMenuPersonagens();

    },


    // =====================================================
    // REGISTRAR AÇÃO
    // =====================================================

    registrarAcao(
        personagem,
        acao
    ) {

        if (!this.ativa)
            return;


        if (
            this.personagensAgiram[personagem]
        )
            return;


        this.acoes[personagem] =
            acao;


        this.personagensAgiram[personagem] =
            true;


        console.log(
            personagem,
            "escolheu",
            acao
        );


        this.verificarTodosAgiram();

    },


    // =====================================================
    // VERIFICAR TODOS
    // =====================================================

    verificarTodosAgiram() {

        const todos =
            this.personagensAgiram.ash &&
            this.personagensAgiram.spike &&
            this.personagensAgiram.manel;


        if (!todos) {

            setTimeout(
                () => {

                    if (!this.ativa)
                        return;

                    if (
                        this.turno !== "jogador"
                    )
                        return;

                    this.mostrarMenuPersonagens();

                },
                50
            );

            return;

        }


        console.log(
            "OS TRÊS PERSONAGENS AGIRAM."
        );


        this.executarAcoesDaRodada();

    },


    // =====================================================
    // DEFENDER
    // =====================================================

    defender(nome) {

        if (
            this.personagensAgiram[nome]
        )
            return;


        this[nome].defesa =
            true;


        this.pe += 16;


        if (
            this.pe >
            this.peMax
        )
            this.pe =
                this.peMax;


        this.registrarSpriteAcao(
            nome,
            "defender"
        );


        this.registrarAcao(
            nome,
            "defender"
        );

    },


    // =====================================================
    // ATAQUE
    // =====================================================

    prepararAtaque(nome) {

        if (
            this.personagensAgiram[nome]
        )
            return;


        this.estado =
            "BARRA_ATAQUE";


        this.removerMenu();


        this.criarBarraAtaque(
            nome
        );

    },


    criarBarraAtaque(nome) {

        const arena =
            document.getElementById("arena");


        if (!arena)
            return;


        const antiga =
            document.getElementById(
                "batalhaBarraAtaque"
            );


        if (antiga)
            antiga.remove();


        const caixa =
            document.createElement("div");


        caixa.id =
            "batalhaBarraAtaque";


        caixa.style.position =
            "absolute";

        caixa.style.left =
            "50%";

        caixa.style.top =
            "48%";

        caixa.style.transform =
            "translate(-50%, -50%)";

        caixa.style.width =
            "650px";

        caixa.style.height =
            "180px";

        caixa.style.background =
            "#050505";

        caixa.style.border =
            "4px solid white";

        caixa.style.zIndex =
            "10000";

        caixa.style.fontFamily =
            "Determination, monospace";

        caixa.style.color =
            "white";


        arena.appendChild(
            caixa
        );


        const texto =
            document.createElement("div");


        texto.textContent =
            nome === "ash"
                ? "ASH"
                : "MANEL";


        texto.style.textAlign =
            "center";

        texto.style.fontSize =
            "30px";

        texto.style.marginTop =
            "15px";


        caixa.appendChild(
            texto
        );


        const instru =
            document.createElement("div");


        instru.textContent =
            "APERTE ENTER QUANDO ESTIVER NO MEIO!";


        instru.style.textAlign =
            "center";

        instru.style.fontSize =
            "18px";

        instru.style.marginTop =
            "5px";


        caixa.appendChild(
            instru
        );


        const barra =
            document.createElement("div");


        barra.style.position =
            "absolute";

        barra.style.left =
            "45px";

        barra.style.right =
            "45px";

        barra.style.top =
            "105px";

        barra.style.height =
            "35px";

        barra.style.border =
            "3px solid white";

        barra.style.background =
            "#222";


        caixa.appendChild(
            barra
        );


        const centro =
            document.createElement("div");


        centro.style.position =
            "absolute";

        centro.style.left =
            "50%";

        centro.style.top =
            "0";

        centro.style.transform =
            "translateX(-50%)";

        centro.style.width =
            "90px";

        centro.style.height =
            "100%";

        centro.style.borderLeft =
            "3px solid white";

        centro.style.borderRight =
            "3px solid white";

        centro.style.boxSizing =
            "border-box";


        barra.appendChild(
            centro
        );


        const marcador =
            document.createElement("div");


        marcador.style.position =
            "absolute";

        marcador.style.top =
            "-8px";

        marcador.style.width =
            "7px";

        marcador.style.height =
            "50px";

        marcador.style.background =
            "white";

        marcador.style.left =
            "0px";


        barra.appendChild(
            marcador
        );


        let pos = 0;

        let direcao = 1;

        const velocidade = 7;

        let finalizado = false;


        const mover = () => {

            if (
                finalizado
            )
                return;


            if (
                !document.body.contains(
                    caixa
                )
            )
                return;


            const limite =
                barra.clientWidth -
                marcador.offsetWidth;


            pos +=
                velocidade *
                direcao;


            if (
                pos <= 0
            ) {

                pos = 0;

                direcao = 1;

            }


            if (
                pos >= limite
            ) {

                pos = limite;

                direcao = -1;

            }


            marcador.style.left =
                pos + "px";


            requestAnimationFrame(
                mover
            );

        };


        mover();


        const apertarEnter =
            (e) => {

                if (
                    e.key !==
                    "Enter"
                )
                    return;


                if (
                    finalizado
                )
                    return;


                finalizado = true;


                e.preventDefault();


                document.removeEventListener(
                    "keydown",
                    apertarEnter
                );


                const centroBarra =
                    barra.clientWidth /
                    2;


                const centroMarcador =
                    pos +
                    marcador.offsetWidth /
                    2;


                const distancia =
                    Math.abs(
                        centroMarcador -
                        centroBarra
                    );


                const precisao =
                    Math.max(
                        0,
                        1 -
                        (
                            distancia /
                            centroBarra
                        )
                    );


                this.executarAtaqueComPrecisao(
                    nome,
                    precisao
                );

            };


        document.addEventListener(
            "keydown",
            apertarEnter
        );

    },


    // =====================================================
    // EXECUTAR ATAQUE
    // =====================================================

    executarAtaqueComPrecisao(
        nome,
        precisao
    ) {

        const caixa =
            document.getElementById(
                "batalhaBarraAtaque"
            );


        if (caixa)
            caixa.remove();


        if (
            this.personagensAgiram[nome]
        )
            return;


        let minimo;

        let maximo;


        if (
            nome === "ash"
        ) {

            minimo = 50;

            maximo = 127;

        }

        else {

            minimo = 67;

            maximo = 178;

        }


        const dano =
            Math.round(
                minimo +
                (
                    maximo -
                    minimo
                ) *
                precisao
            );


        console.log(
            nome,
            "causou",
            dano,
            "de dano."
        );


        this.registrarSpriteAcao(
            nome,
            "atacar"
        );


        this.registrarAcao(
            nome,
            "atacar"
        );


        // =================================================
        // SLASH
        // =================================================

        const slash =
            new Audio(
                this.sons.slash
            );


        slash.volume = 1;


        let danoAplicado =
            false;


        const aplicarDano =
            () => {

                if (
                    danoAplicado
                )
                    return;


                danoAplicado = true;


                if (
                    !this.ativa
                )
                    return;


                this.danoMascara(
                    dano
                );


                this.tocarDanoInimigo(
                    dano
                );

            };


        slash.onended =
            aplicarDano;


        slash.onerror =
            aplicarDano;


        slash.play().catch(
            aplicarDano
        );

    },


    // =====================================================
    // RITUAIS ASH
    // =====================================================

    mostrarRituaisAsh() {

        this.mostrarListaRituais(
            "ash",
            [

                {

                    nome:
                        "ESPADA SANGRENTA",

                    custo: 35,

                    executar: () => {

                        if (
                            !this.gastarPE(35)
                        )
                            return;


                        const dano =
                            this.aleatorio(
                                200,
                                300
                            );


                        this.tocarSomBatalha(
                            "sangue"
                        );


                        this.registrarSpriteAcao(
                            "ash",
                            "ritual"
                        );


                        this.danoMascara(
                            dano
                        );


                        this.registrarAcao(
                            "ash",
                            "ritual"
                        );

                    }

                },

                {

                    nome:
                        "CONSUMIR MANANCIAL",

                    custo: 30,

                    executar: () => {

                        if (
                            !this.gastarPE(30)
                        )
                            return;


                        const cura =
                            this.aleatorio(
                                20,
                                40
                            );


                        this.tocarSomBatalha(
                            "curar"
                        );


                        this.registrarSpriteAcao(
                            "ash",
                            "ritual"
                        );


                        this.ash.hp =
                            Math.min(
                                this.ash.hp +
                                cura,
                                this.ash.hpMax
                            );


                        this.registrarAcao(
                            "ash",
                            "ritual"
                        );

                    }

                },

                {

                    nome:
                        "CORAÇÃO DE SANGUE",

                    custo: 50,

                    executar: () => {

                        if (
                            !this.gastarPE(50)
                        )
                            return;


                        this.tocarSomBatalha(
                            "oba"
                        );


                        this.coracaoDeSangueRodadas =
                            3;


                        this.registrarSpriteAcao(
                            "ash",
                            "ritual"
                        );


                        this.registrarAcao(
                            "ash",
                            "ritual"
                        );

                    }

                }

            ]
        );

    },


    // =====================================================
    // RITUAIS SPIKE
    // =====================================================

    mostrarRituaisSpike() {

        this.mostrarListaRituais(
            "spike",
            [

                {

                    nome:
                        "APROPRIAÇÃO",

                    custo: 15,

                    executar: () => {

                        if (
                            !this.gastarPE(15)
                        )
                            return;


                        this.tocarSomBatalha(
                            "eletricidade"
                        );


                        this.registrarSpriteAcao(
                            "spike",
                            "ritual"
                        );


                        this.danoMascara(
                            this.aleatorio(
                                20,
                                60
                            )
                        );


                        this.registrarAcao(
                            "spike",
                            "ritual"
                        );

                    }

                },

                {

                    nome:
                        "CHAMAS DO CAOS",

                    custo: 38,

                    executar: () => {

                        if (
                            !this.gastarPE(38)
                        )
                            return;


                        this.tocarSomBatalha(
                            "fogo"
                        );


                        this.registrarSpriteAcao(
                            "spike",
                            "ritual"
                        );


                        this.danoMascara(
                            this.aleatorio(
                                6,
                                176
                            )
                        );


                        this.registrarAcao(
                            "spike",
                            "ritual"
                        );

                    }

                },

                {

                    nome:
                        "DESCARNAR",

                    custo: 60,

                    executar: () => {

                        if (
                            !this.gastarPE(60)
                        )
                            return;


                        this.registrarSpriteAcao(
                            "spike",
                            "ritual"
                        );


                        this.danoMascara(
                            this.aleatorio(
                                250,
                                365
                            )
                        );


                        this.registrarAcao(
                            "spike",
                            "ritual"
                        );

                    }

                },

                {

                    nome:
                        "CURAR CUMPADE",

                    custo: 35,

                    executar: () => {

                        this.mostrarEscolhaCuraSpike();

                    }

                }

            ]
        );

    },


    // =====================================================
    // LISTA RITUAIS
    // =====================================================

    mostrarListaRituais(
        personagem,
        lista
    ) {

        const menu =
            this.criarMenuBase();


        if (!menu)
            return;


        const titulo =
            document.createElement("div");


        titulo.textContent =
            "RITUAIS";


        titulo.style.fontSize =
            "25px";

        titulo.style.padding =
            "10px";


        menu.appendChild(
            titulo
        );


        const area =
            document.createElement("div");


        area.style.display =
            "grid";

        area.style.gridTemplateColumns =
            "repeat(2, 1fr)";

        area.style.gap =
            "7px";

        area.style.padding =
            "0 10px";


        menu.appendChild(
            area
        );


        lista.forEach(
            ritual => {

                const botao =
                    document.createElement(
                        "button"
                    );


                botao.textContent =
                    `${ritual.nome} (${ritual.custo} PE)`;


                botao.style.height =
                    "48px";

                botao.style.background =
                    "#111";

                botao.style.color =
                    "white";

                botao.style.border =
                    "2px solid white";

                botao.style.fontFamily =
                    "Determination, monospace";

                botao.style.fontSize =
                    "18px";


                if (
                    this.pe <
                    ritual.custo
                ) {

                    botao.disabled =
                        true;

                    botao.style.opacity =
                        "0.35";

                }


                botao.onclick = () => {

                    if (
                        this.personagensAgiram[
                            personagem
                        ]
                    )
                        return;


                    this.tocarSomBatalha(
                        "selecionar"
                    );


                    ritual.executar();

                };


                area.appendChild(
                    botao
                );

            }
        );


        const voltar =
            document.createElement(
                "button"
            );


        voltar.textContent =
            "VOLTAR";


        voltar.style.margin =
            "7px 10px";

        voltar.style.height =
            "32px";

        voltar.style.background =
            "#111";

        voltar.style.color =
            "white";

        voltar.style.border =
            "2px solid white";

        voltar.style.fontFamily =
            "Determination, monospace";


        voltar.onclick =
            () => this.abrirAcoes(
                personagem
            );


        menu.appendChild(
            voltar
        );

    },


    // =====================================================
    // CURA SPIKE
    // =====================================================

    mostrarEscolhaCuraSpike() {

        const menu =
            this.criarMenuBase();


        if (!menu)
            return;


        const titulo =
            document.createElement(
                "div"
            );


        titulo.textContent =
            "ESCOLHA QUEM CURAR";


        titulo.style.fontSize =
            "25px";

        titulo.style.padding =
            "10px";


        menu.appendChild(
            titulo
        );


        ["ash", "manel"].forEach(
            nome => {

                const alvo =
                    this[nome];


                const botao =
                    document.createElement(
                        "button"
                    );


                botao.textContent =
                    `${alvo.nome} - ${alvo.hp}/${alvo.hpMax} HP`;


                botao.style.width =
                    "45%";

                botao.style.margin =
                    "5px";

                botao.style.height =
                    "45px";

                botao.style.background =
                    "#111";

                botao.style.color =
                    "white";

                botao.style.border =
                    "2px solid white";

                botao.style.fontFamily =
                    "Determination, monospace";


                botao.onclick = () => {

                    if (
                        !this.gastarPE(35)
                    )
                        return;


                    const cura =
                        this.aleatorio(
                            10,
                            100
                        );


                    this.tocarSomBatalha(
                        "curar"
                    );


                    alvo.hp =
                        Math.min(
                            alvo.hp +
                            cura,
                            alvo.hpMax
                        );


                    this.registrarSpriteAcao(
                        "spike",
                        "ritual"
                    );


                    this.registrarAcao(
                        "spike",
                        "ritual"
                    );

                };


                menu.appendChild(
                    botao
                );

            }
        );

    },


    // =====================================================
    // AGIR ASH
    // =====================================================

    mostrarAgirAsh() {

        this.mostrarListaAgir(
            "ash",
            [

                {

                    nome:
                        "CONVERSAR",

                    executar: () => {

                        this.mostrarMensagem(
                            `Ash tentou falar com a Máscara

...

Nada adiantou.`,
                            () => {

                                this.registrarSpriteAcao(
                                    "ash",
                                    "agir"
                                );

                                this.registrarAcao(
                                    "ash",
                                    "agir"
                                );

                            }
                        );

                    }

                }

            ]
        );

    },


    // =====================================================
    // AGIR SPIKE
    // =====================================================

    mostrarAgirSpike() {

        this.mostrarListaAgir(
            "spike",
            [

                {

                    nome:
                        "AGORA NÃO!",

                    executar: () => {

                        this.mostrarEscolhaReviver();

                    }

                },

                {

                    nome:
                        "CONVERSAR",

                    executar: () => {

                        this.mostrarMensagem(
                            `Spike tentou conversar com a Máscara.

...

De nada adiantou.`,
                            () => {

                                this.registrarSpriteAcao(
                                    "spike",
                                    "agir"
                                );

                                this.registrarAcao(
                                    "spike",
                                    "agir"
                                );

                            }
                        );

                    }

                }

            ]
        );

    },


    // =====================================================
    // AGIR MANEL
    // =====================================================

    mostrarAgirManel() {

        this.mostrarMensagem(
            `Manel NÃO conversou.

...

Ele não consegue.

XD`,
            () => {

                this.registrarSpriteAcao(
                    "manel",
                    "agir"
                );

                this.registrarAcao(
                    "manel",
                    "agir"
                );

            }
        );

    },


    // =====================================================
    // LISTA AGIR
    // =====================================================

    mostrarListaAgir(
        personagem,
        lista
    ) {

        const menu =
            this.criarMenuBase();


        if (!menu)
            return;


        const titulo =
            document.createElement(
                "div"
            );


        titulo.textContent =
            "AGIR";


        titulo.style.fontSize =
            "25px";

        titulo.style.padding =
            "10px";


        menu.appendChild(
            titulo
        );


        lista.forEach(
            item => {

                const botao =
                    document.createElement(
                        "button"
                    );


                botao.textContent =
                    item.nome;


                botao.style.width =
                    "45%";

                botao.style.height =
                    "45px";

                botao.style.margin =
                    "5px";

                botao.style.background =
                    "#111";

                botao.style.color =
                    "white";

                botao.style.border =
                    "2px solid white";

                botao.style.fontFamily =
                    "Determination, monospace";


                botao.onclick = () => {

                    if (
                        this.personagensAgiram[
                            personagem
                        ]
                    )
                        return;


                    this.tocarSomBatalha(
                        "selecionar"
                    );


                    item.executar();

                };


                menu.appendChild(
                    botao
                );

            }
        );


        const voltar =
            document.createElement(
                "button"
            );


        voltar.textContent =
            "VOLTAR";


        voltar.style.margin =
            "5px";


        voltar.style.background =
            "#111";

        voltar.style.color =
            "white";

        voltar.style.border =
            "2px solid white";


        voltar.onclick =
            () => this.abrirAcoes(
                personagem
            );


        menu.appendChild(
            voltar
        );

    },


    // =====================================================
    // REVIVER
    // =====================================================

    mostrarEscolhaReviver() {

        const mortos = [];


        if (
            this.ash.hp <= 0
        )
            mortos.push("ash");


        if (
            this.manel.hp <= 0
        )
            mortos.push("manel");


        if (
            mortos.length === 0
        ) {

            this.mostrarMensagem(
                "Ninguém pode ser revivido."
            );

            return;

        }


        const menu =
            this.criarMenuBase();


        if (!menu)
            return;


        const titulo =
            document.createElement(
                "div"
            );


        titulo.textContent =
            "ESCOLHA QUEM REVIVER";


        titulo.style.fontSize =
            "25px";

        titulo.style.padding =
            "10px";


        menu.appendChild(
            titulo
        );


        mortos.forEach(
            nome => {

                const botao =
                    document.createElement(
                        "button"
                    );


                botao.textContent =
                    this[nome].nome;


                botao.style.width =
                    "40%";

                botao.style.height =
                    "45px";

                botao.style.margin =
                    "5px";

                botao.style.background =
                    "#111";

                botao.style.color =
                    "white";

                botao.style.border =
                    "2px solid white";

                botao.style.fontFamily =
                    "Determination, monospace";


                botao.onclick = () => {

                    this[nome].hp =
                        50;


                    this.tocarSomBatalha(
                        "curar"
                    );


                    this.registrarSpriteAcao(
                        "spike",
                        "agir"
                    );


                    this.registrarAcao(
                        "spike",
                        "agir"
                    );

                };


                menu.appendChild(
                    botao
                );

            }
        );

    },


    // =====================================================
    // MENSAGEM
    // =====================================================

    mostrarMensagem(
        texto,
        callback
    ) {

        const menu =
            this.criarMenuBase();


        if (!menu)
            return;


        const textoElemento =
            document.createElement(
                "div"
            );


        textoElemento.textContent =
            texto;


        textoElemento.style.whiteSpace =
            "pre-line";

        textoElemento.style.fontSize =
            "23px";

        textoElemento.style.padding =
            "15px";

        textoElemento.style.color =
            "white";


        menu.appendChild(
            textoElemento
        );


        const continuar =
            document.createElement(
                "button"
            );


        continuar.textContent =
            "CONTINUAR";


        continuar.style.margin =
            "5px 15px";

        continuar.style.height =
            "35px";

        continuar.style.background =
            "#111";

        continuar.style.color =
            "white";

        continuar.style.border =
            "2px solid white";

        continuar.style.fontFamily =
            "Determination, monospace";


        menu.appendChild(
            continuar
        );


        let fechado = false;


        const fechar =
            () => {

                if (
                    fechado
                )
                    return;


                fechado = true;


                document.removeEventListener(
                    "keydown",
                    tecla
                );


                this.removerMenu();


                if (callback) {

                    callback();

                }
                else {

                    this.mostrarMenuPersonagens();

                }

            };


        const tecla =
            (e) => {

                if (
                    e.key !==
                    "Enter"
                )
                    return;


                e.preventDefault();


                fechar();

            };


        document.addEventListener(
            "keydown",
            tecla
        );


        continuar.onclick =
            fechar;

    },


    // =====================================================
    // EXECUTAR RODADA
    // =====================================================

    executarAcoesDaRodada() {

        if (
            this.mudancaTurnoEmAndamento
        )
            return;


        this.mudancaTurnoEmAndamento =
            true;


        this.estado =
            "EXECUTANDO_ACOES";


        this.removerMenu();


        console.log(
            "EXECUTANDO AÇÕES DA RODADA:"
        );


        console.log(
            this.acoes
        );


        // Todos voltam ao sprite normal
        // no início do turno inimigo.

        this.resetarSpritesParaLado();


        setTimeout(
            () => {

                if (
                    !this.ativa
                )
                    return;


                this.iniciarTurnoMascara();

            },
            400
        );

    },


    // =====================================================
    // TURNO DA MÁSCARA
    // =====================================================

    iniciarTurnoMascara() {

        if (
            !this.ativa
        )
            return;


        this.turno =
            "mascara";


        this.estado =
            "ESQUIVA";


        this.mudancaTurnoEmAndamento =
            false;


        console.log(
            "================================"
        );

        console.log(
            "TURNO DA MÁSCARA"
        );

        console.log(
            "================================"
        );


        if (
            typeof BatalhaRender !==
            "undefined"
        ) {

            if (
                typeof BatalhaRender.mostrarCaixaEsquiva ===
                "function"
            ) {

                BatalhaRender.mostrarCaixaEsquiva();

            }

        }


        if (
            typeof Coracao !==
            "undefined"
        ) {

            Coracao.iniciar();

        }


        setTimeout(
            () => {

                if (
                    !this.ativa
                )
                    return;


                if (
                    this.turno !==
                    "mascara"
                )
                    return;


                if (
                    this.estado !==
                    "ESQUIVA"
                )
                    return;


                if (
                    typeof AtaqueMascara !==
                    "undefined"
                ) {

                    if (
                        typeof AtaqueMascara.escolherAtaque ===
                        "function"
                    ) {

                        AtaqueMascara.escolherAtaque();

                    }

                }

            },
            700
        );

    },


    // =====================================================
    // TERMINAR TURNO DA MÁSCARA
    // =====================================================

    terminarTurnoMascara() {

        if (
            !this.ativa
        )
            return;


        if (
            this.turno !==
            "mascara"
        )
            return;


        if (
            typeof Coracao !==
            "undefined"
        ) {

            Coracao.parar();

        }


        if (
            typeof BatalhaRender !==
            "undefined"
        ) {

            if (
                typeof BatalhaRender.esconderCaixaEsquiva ===
                "function"
            ) {

                BatalhaRender.esconderCaixaEsquiva();

            }

        }


        // =================================================
        // EFEITO
        // =================================================

        if (
            this.coracaoDeSangueRodadas > 0
        ) {

            this.coracaoDeSangueRodadas--;

        }


        // =================================================
        // DEFESA
        // =================================================

        this.ash.defesa = false;

        this.spike.defesa = false;

        this.manel.defesa = false;


        // =================================================
        // NOVA RODADA
        // =================================================

        this.personagensAgiram = {

            ash: false,
            spike: false,
            manel: false

        };


        this.acoes = {};


        this.personagemSelecionado =
            null;


        this.acaoEscolhida =
            null;


        this.turno =
            "jogador";


        this.estado =
            "JOGADOR";


        this.mudancaTurnoEmAndamento =
            false;


        this.executandoAcao =
            false;


        console.log(
            "NOVA RODADA"
        );


        setTimeout(
            () => {

                if (
                    !this.ativa
                )
                    return;


                this.mostrarMenuPersonagens();

            },
            300
        );

    },


    // =====================================================
    // DANO NA MÁSCARA
    // =====================================================

    danoMascara(valor) {

        if (
            !this.ativa
        )
            return;


        valor =
            Math.max(
                0,
                Math.round(valor)
            );


        this.mascara.hp -=
            valor;


        if (
            this.mascara.hp < 0
        )
            this.mascara.hp = 0;


        if (
            typeof Mascara !==
            "undefined"
        ) {

            Mascara.hp =
                this.mascara.hp;

        }


        console.log(
            "DANO NA MÁSCARA:",
            valor
        );


        if (
            this.mascara.hp <= 0
        ) {

            this.vitoria();

        }

    },


    // =====================================================
    // DANO NO JOGADOR
    // =====================================================

    danoJogador(valor) {

        if (
            !this.ativa
        )
            return;


        valor =
            Math.max(
                0,
                Number(valor) || 0
            );


        if (
            this.coracaoDeSangueRodadas > 0
        ) {

            valor *= 0.8;

        }


        const vivos = [];


        if (
            this.ash.hp > 0
        )
            vivos.push("ash");


        if (
            this.spike.hp > 0
        )
            vivos.push("spike");


        if (
            this.manel.hp > 0
        )
            vivos.push("manel");


        if (
            vivos.length === 0
        ) {

            this.derrota();

            return;

        }


        const alvo =
            vivos[
                Math.floor(
                    Math.random() *
                    vivos.length
                )
            ];


        console.log(
            "DANO FOI PARA:",
            this[alvo].nome
        );


        this.danoPersonagem(
            alvo,
            valor
        );

    },


    // =====================================================
    // DANO EM PERSONAGEM ESPECÍFICO
    // =====================================================

    danoPersonagem(
        nome,
        valor
    ) {

        if (
            !this.ativa
        )
            return;


        const personagem =
            this[nome];


        if (
            !personagem
        )
            return;


        let dano =
            Number(valor) || 0;


        if (
            personagem.defesa
        ) {

            dano *= 0.9;

        }


        dano =
            Math.round(dano);


        personagem.hp -=
            dano;


        if (
            personagem.hp < 0
        )
            personagem.hp = 0;


        console.log(
            personagem.nome,
            "recebeu",
            dano,
            "de dano."
        );


        this.tocarSomBatalha(
            "dano"
        );


        if (
            this.ash.hp <= 0 &&
            this.spike.hp <= 0 &&
            this.manel.hp <= 0
        ) {

            this.derrota();

        }

    },


    // =====================================================
    // PE
    // =====================================================

    gastarPE(valor) {

        valor =
            Number(valor) || 0;


        if (
            this.pe < valor
        ) {

            console.log(
                "PE INSUFICIENTE"
            );

            return false;

        }


        this.pe -=
            valor;


        this.atualizarPE();


        return true;

    },


    atualizarPE() {

        const elemento =
            document.getElementById(
                "batalhaPE"
            );


        if (
            elemento
        ) {

            elemento.textContent =
                `PE: ${this.pe}/${this.peMax}`;

        }

    },


    // =====================================================
    // SPRITES
    // =====================================================

    registrarSpriteAcao(
        nome,
        tipo
    ) {

        if (
            typeof BatalhaRender ===
            "undefined"
        )
            return;


        if (
            typeof BatalhaRender.trocarSprite ===
            "function"
        ) {

            BatalhaRender.trocarSprite(
                nome,
                tipo
            );

        }

    },


    resetarSpritesParaLado() {

        const nomes = [
            "ash",
            "spike",
            "manel"
        ];


        nomes.forEach(
            nome => {

                this[nome].sprite =
                    {
                        ash:
                            "assets/imagens/batalha_imagens/ash/ash_lado.png",

                        spike:
                            "assets/imagens/batalha_imagens/spike/spike_lado.png",

                        manel:
                            "assets/imagens/batalha_imagens/manel/manel_lado.png"

                    }[nome];


                if (
                    typeof BatalhaRender !==
                    "undefined"
                ) {

                    if (
                        typeof BatalhaRender.voltarSprite ===
                        "function"
                    ) {

                        BatalhaRender.voltarSprite(
                            nome
                        );

                    }

                }

            }
        );

    },


    // =====================================================
    // ALEATÓRIO
    // =====================================================

    aleatorio(
        minimo,
        maximo
    ) {

        return Math.floor(
            Math.random() *
            (
                maximo -
                minimo +
                1
            )
        ) + minimo;

    },


    // =====================================================
    // DERROTA
    // =====================================================

    derrota() {

        if (
            !this.ativa
        )
            return;


        console.log(
            "VOCÊ PERDEU"
        );


        this.ativa = false;

        this.estado =
            "FIM";


        if (
            typeof AtaqueMascara !==
            "undefined"
        ) {

            try {

                if (
                    typeof AtaqueMascara.finalizarArma ===
                    "function"
                ) {

                    AtaqueMascara.finalizarArma();

                }
                else if (
                    typeof AtaqueMascara.finalizar ===
                    "function"
                ) {

                    AtaqueMascara.finalizar();

                }

            }
            catch {}

        }


        if (
            typeof Coracao !==
            "undefined"
        ) {

            Coracao.remover();

        }


        this.removerMenu();

        this.esconderArena();


        if (
            typeof GameOver !==
            "undefined"
        ) {

            GameOver.iniciar();

        }

    },


    // =====================================================
    // VITÓRIA
    // =====================================================

    vitoria() {

        if (
            !this.ativa
        )
            return;


        console.log(
            "VOCÊ VENCEU"
        );


        this.ativa = false;

        this.estado =
            "FIM";


        if (
            typeof AtaqueMascara !==
            "undefined"
        ) {

            try {

                if (
                    typeof AtaqueMascara.finalizarArma ===
                    "function"
                ) {

                    AtaqueMascara.finalizarArma();

                }
                else if (
                    typeof AtaqueMascara.finalizar ===
                    "function"
                ) {

                    AtaqueMascara.finalizar();

                }

            }
            catch {}

        }


        if (
            typeof Coracao !==
            "undefined"
        ) {

            Coracao.remover();

        }


        this.removerMenu();


        const arena =
            document.getElementById(
                "arena"
            );


        if (arena) {

            arena.innerHTML = `

                <div style="
                    position:absolute;
                    left:50%;
                    top:50%;
                    transform:translate(-50%,-50%);
                    color:white;
                    font-size:32px;
                    font-family:Determination, monospace;
                    text-align:center;
                ">

                    A máscara caiu.

                </div>

            `;

        }


        setTimeout(
            () => {

                this.esconderArena();

            },
            3000
        );

    }

};