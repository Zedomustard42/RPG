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


    // =====================================================
    // CACHE DE ÁUDIOS
    // =====================================================

    audiosBatalha: {},


    // =====================================================
    // ESTADO
    // =====================================================

    ativa: false,

    turno: "jogador",

    estado: "JOGADOR",

    batalhaIniciada: false,

    personagemSelecionado: "ash",

    mudancaTurnoEmAndamento: false,


    personagensAgiram: {

        ash: false,
        spike: false,
        manel: false

    },


    acoes: {},


    ordemPersonagens: [

        "ash",
        "spike",
        "manel"

    ],


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


    mascara: {

        hp: 2367,

        hpMax: 2367

    },


    // =====================================================
    // RESET
    // =====================================================

    resetar() {

        this.ativa =
            false;

        this.turno =
            "jogador";

        this.estado =
            "JOGADOR";

        this.batalhaIniciada =
            false;

        this.personagemSelecionado =
            "ash";

        this.mudancaTurnoEmAndamento =
            false;


        this.pe =
            this.peMax;


        this.coracaoDeSangueRodadas =
            0;


        this.personagensAgiram = {

            ash: false,
            spike: false,
            manel: false

        };


        this.acoes =
            {};


        this.ash.hp =
            this.ash.hpMax;

        this.spike.hp =
            this.spike.hpMax;

        this.manel.hp =
            this.manel.hpMax;


        this.ash.defesa =
            false;

        this.spike.defesa =
            false;

        this.manel.defesa =
            false;


        this.mascara.hp =
            this.mascara.hpMax;


        if (
            typeof AtaqueMascara !==
            "undefined" &&
            typeof AtaqueMascara.resetar ===
            "function"
        ) {

            AtaqueMascara.resetar();

        }


        if (
            typeof Coracao !==
            "undefined" &&
            typeof Coracao.remover ===
            "function"
        ) {

            Coracao.remover();

        }


        if (
            typeof BatalhaRender !==
            "undefined" &&
            typeof BatalhaRender.limpar ===
            "function"
        ) {

            BatalhaRender.limpar();

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
                texto:
                    "Interessante.",
                audio:
                    "Bruno1"
            },

            {
                texto:
                    "Você Sabia?",
                audio:
                    "Bruno2"
            },

            {
                texto:
                    "Você Imaginava?",
                audio:
                    "Bruno3"
            },

            {
                texto:
                    "Porque Veio Até Mim?",
                audio:
                    "Bruno4"
            },

            {
                texto:
                    "Curiosidade?",
                audio:
                    "Bruno5"
            },

            {
                texto:
                    "..."
            },

            {
                texto:
                    "Excelente.",
                audio:
                    "Bruno6"
            },

            {
                texto:
                    "Máscara. Sua Identidade Perdida.",
                audio:
                    "Bruno7"
            },

            {
                texto:
                    "O Ritual Está Prestes À Começar.",
                audio:
                    "Bruno8"
            },

            {
                texto:
                    "Você Está Aqui. Você Sobreviveu.",
                audio:
                    "Bruno9"
            },

            {
                texto:
                    "E É Hora De Pegar Sua Identidade De Volta.",
                audio:
                    "Bruno10"
            },

            {
                texto:
                    "Vamos Começar o RITUAL.",
                audio:
                    "Bruno11"
            }

        ];


        let atual =
            0;


        const continuar =
            e => {

                if (
                    e.key !==
                    "Enter"
                )
                    return;


                if (
                    atual >=
                    falas.length
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
                    falas[atual++];


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

            };


        document.addEventListener(
            "keydown",
            continuar
        );


        continuar({
            key:
                "Enter"
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
            document.getElementById(
                "game"
            );


        const mobile =
            document.getElementById(
                "mobile"
            );


        const arena =
            document.getElementById(
                "arena"
            );


        if (
            game
        ) {

            game.style.display =
                "none";

        }


        if (
            mobile
        ) {

            mobile.style.display =
                "none";

        }


        if (
            arena
        ) {

            arena.style.display =
                "block";

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
            document.getElementById(
                "game"
            );


        const mobile =
            document.getElementById(
                "mobile"
            );


        const arena =
            document.getElementById(
                "arena"
            );


        if (
            game
        ) {

            game.style.display =
                "";

        }


        if (
            mobile
        ) {

            mobile.style.display =
                "";

        }


        if (
            arena
        ) {

            arena.style.display =
                "none";

            arena.classList.remove(
                "batalhaAtiva"
            );

        }

    },


    // =====================================================
    // PREPARAR ÁUDIOS
    // =====================================================

    prepararAudios() {

        Object.keys(
            this.sons
        ).forEach(
            nome => {

                if (
                    this.audiosBatalha[nome]
                )
                    return;


                const audio =
                    new Audio(
                        this.sons[nome]
                    );


                audio.preload =
                    "auto";


                audio.volume =
                    1;


                this.audiosBatalha[nome] =
                    audio;

            }
        );

    },


    // =====================================================
    // TOCAR SOM
    // =====================================================

    tocarSomBatalha(
        nome,
        callback = null
    ) {

        const caminho =
            this.sons[nome];


        if (
            !caminho
        ) {

            console.warn(
                "SOM NÃO ENCONTRADO:",
                nome
            );


            if (
                typeof callback ===
                "function"
            ) {

                callback();

            }


            return;

        }


        // =================================================
        // NOVA INSTÂNCIA DE ÁUDIO
        // =================================================

        const audio =
            new Audio(
                caminho
            );


        audio.preload =
            "auto";


        audio.volume =
            1;


        let executado =
            false;


        const executarCallback =
            () => {

                if (
                    executado
                )
                    return;


                executado =
                    true;


                if (
                    typeof callback ===
                    "function"
                ) {

                    callback();

                }

            };


        audio.onended =
            executarCallback;


        audio.onerror =
            executarCallback;


        // =================================================
        // TOCAR
        // =================================================

        let promessa;

        try {

            promessa =
                audio.play();

        }

        catch (
            erro
        ) {

            if (
                erro.name !==
                "AbortError"
            ) {

                console.warn(
                    "ERRO AO TOCAR:",
                    nome,
                    caminho,
                    erro
                );

            }


            executarCallback();

            return;

        }


        if (
            promessa &&
            typeof promessa.catch ===
            "function"
        ) {

            promessa.catch(
                erro => {

                    if (
                        erro.name !==
                        "AbortError"
                    ) {

                        console.warn(
                            "ERRO AO TOCAR:",
                            nome,
                            caminho,
                            erro
                        );

                    }


                    executarCallback();

                }
            );

        }

    },


    // =====================================================
    // SOM DE DANO NO INIMIGO
    // =====================================================

    tocarDanoInimigo(
        valor
    ) {

        const dano =
            Number(valor) || 0;


        const nome =
            dano >
            230
                ? "inimigoDanoForte"
                : "inimigoDano";


        console.log(
            "SOM DANO INIMIGO:",
            nome,
            "DANO:",
            dano
        );


        this.tocarSomBatalha(
            nome
        );

    },


    // =====================================================
    // INICIAR BATALHA
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


        this.ativa =
            true;


        this.batalhaIniciada =
            true;


        this.turno =
            "jogador";


        this.estado =
            "JOGADOR";


        this.personagemSelecionado =
            "ash";


        this.mudancaTurnoEmAndamento =
            false;


        this.pe =
            this.peMax;


        this.coracaoDeSangueRodadas =
            0;


        this.personagensAgiram = {

            ash: false,
            spike: false,
            manel: false

        };


        this.acoes =
            {};


        this.ash.hp =
            this.ash.hpMax;

        this.spike.hp =
            this.spike.hpMax;

        this.manel.hp =
            this.manel.hpMax;


        this.ash.defesa =
            false;

        this.spike.defesa =
            false;

        this.manel.defesa =
            false;


        this.mascara.hp =
            this.mascara.hpMax;


        this.mostrarArena();


        // =================================================
        // MÁSCARA
        // =================================================

        if (
            typeof Mascara !==
            "undefined"
        ) {

            Mascara.hp =
                this.mascara.hp;


            Mascara.hpMax =
                this.mascara.hpMax;


            Mascara.fase =
                1;


            Mascara.x =
                1050;


            Mascara.y =
                120;


            Mascara.sprite =
                "assets/imagens/batalha_imagens/bruno/mascara.png";

        }


        // =================================================
        // RESET DOS SISTEMAS
        // =================================================

        if (
            typeof AtaqueMascara !==
            "undefined" &&
            typeof AtaqueMascara.resetar ===
            "function"
        ) {

            AtaqueMascara.resetar();

        }


        if (
            typeof Coracao !==
            "undefined" &&
            typeof Coracao.parar ===
            "function"
        ) {

            Coracao.parar();

        }


        // =================================================
        // RENDER
        // =================================================

        if (
            typeof BatalhaRender !==
            "undefined" &&
            typeof BatalhaRender.iniciar ===
            "function"
        ) {

            BatalhaRender.iniciar();

        }


        // =================================================
        // ÁUDIOS
        // =================================================

        this.prepararAudios();


        AudioManager.pararMusica();


        AudioManager.tocarMusica(
            "mascaras"
        );


        // =================================================
        // LOOP
        // =================================================

        this.loop();


        // =================================================
        // PRIMEIRO PERSONAGEM
        // =================================================

        setTimeout(
            () => {

                if (
                    !this.ativa
                )
                    return;


                if (
                    typeof BatalhaRender !==
                    "undefined" &&
                    typeof BatalhaRender.mostrarMenuPersonagens ===
                    "function"
                ) {

                    BatalhaRender.mostrarMenuPersonagens();

                }

            },
            200
        );

    },


    // =====================================================
    // LOOP
    // =====================================================

    loop() {

        if (
            !this.ativa
        )
            return;


        this.atualizar();


        requestAnimationFrame(
            () =>
                this.loop()
        );

    },


    // =====================================================
    // ATUALIZAR
    // =====================================================

    atualizar() {

        if (
            !this.ativa
        )
            return;


        if (
            typeof BatalhaRender !==
            "undefined" &&
            typeof BatalhaRender.atualizar ===
            "function"
        ) {

            BatalhaRender.atualizar();

        }


        if (
            typeof Coracao !==
            "undefined" &&
            typeof Coracao.atualizar ===
            "function"
        ) {

            Coracao.atualizar();

        }

    },


    // =====================================================
    // REGISTRAR AÇÃO
    // =====================================================

    registrarAcao(
        personagem,
        acao
    ) {

        if (
            !this.ativa
        )
            return;


        if (
            this.personagensAgiram[
                personagem
            ]
        )
            return;


        this.acoes[
            personagem
        ] =
            acao;


        this.personagensAgiram[
            personagem
        ] =
            true;


        console.log(
            personagem,
            "escolheu",
            acao
        );


        this.verificarTodosAgiram();

    },


    // =====================================================
    // VERIFICAR AÇÕES
    // =====================================================

    verificarTodosAgiram() {

        const todos =
            this.personagensAgiram.ash &&
            this.personagensAgiram.spike &&
            this.personagensAgiram.manel;


        if (
            todos
        ) {

            console.log(
                "OS TRÊS PERSONAGENS AGIRAM."
            );


            this.executarAcoesDaRodada();


            return;

        }


        if (
            typeof BatalhaRender !==
            "undefined" &&
            typeof BatalhaRender.mostrarMenuPersonagens ===
            "function"
        ) {

            setTimeout(
                () => {

                    if (
                        this.ativa &&
                        this.turno ===
                        "jogador"
                    ) {

                        BatalhaRender.mostrarMenuPersonagens();

                    }

                },
                50
            );

        }

    },


    // =====================================================
    // EXECUTAR RODADA
    // =====================================================

    executarAcoesDaRodada() {

        if (
            !this.ativa ||
            this.mudancaTurnoEmAndamento
        )
            return;


        this.mudancaTurnoEmAndamento =
            true;


        console.log(
            "EXECUTANDO AÇÕES DA RODADA:",
            this.acoes
        );


        setTimeout(
            () => {

                if (
                    !this.ativa
                )
                    return;


                this.mudancaTurnoEmAndamento =
                    false;


                this.iniciarTurnoMascara();

            },
            350
        );

    },


    // =====================================================
    // DEFENDER
    // =====================================================

    defender(nome) {

        if (
            !this.ativa
        )
            return;


        if (
            this.personagensAgiram[nome]
        )
            return;


        const personagem =
            this[nome];


        if (
            !personagem ||
            personagem.hp <= 0
        )
            return;


        personagem.defesa =
            true;


        this.pe =
            Math.min(
                this.peMax,
                this.pe + 16
            );


        if (
            typeof BatalhaRender !==
            "undefined"
        ) {

            BatalhaRender.trocarSprite(
                nome,
                "defender"
            );

        }


        this.tocarSomBatalha(
            "selecionar"
        );


        this.registrarAcao(
            nome,
            "defender"
        );

    },


    // =====================================================
    // PREPARAR ATAQUE
    // =====================================================

    prepararAtaque(nome) {

        if (
            !this.ativa
        )
            return;


        if (
            this.turno !==
            "jogador"
        )
            return;


        if (
            this.personagensAgiram[nome]
        )
            return;


        const personagem =
            this[nome];


        if (
            !personagem ||
            personagem.hp <= 0
        )
            return;


        this.estado =
            "BARRA_ATAQUE";


        const minimo =
            nome ===
            "ash"
                ? 50
                : 67;


        const maximo =
            nome ===
            "ash"
                ? 127
                : 178;


        if (
            typeof BatalhaRender !==
            "undefined"
        ) {

            BatalhaRender.trocarSprite(
                nome,
                "atacar"
            );


            BatalhaRender.iniciarBarraAtaque(
                nome,
                minimo,
                maximo
            );

        }

    },


    // =====================================================
    // ATAQUE COM PRECISÃO
    // =====================================================

    executarAtaqueComPrecisao(
        nome,
        precisao,
        errou = false
    ) {

        if (
            !this.ativa
        )
            return;


        if (
            this.personagensAgiram[nome]
        )
            return;


        if (
            errou
        ) {

            console.log(
                nome,
                "ERROU O ATAQUE."
            );


            this.estado =
                "JOGADOR";


            this.registrarAcao(
                nome,
                "atacar"
            );


            return;

        }


        const minimo =
            nome ===
            "ash"
                ? 50
                : 67;


        const maximo =
            nome ===
            "ash"
                ? 127
                : 178;


        const precisaoSegura =
            Math.max(
                0,
                Math.min(
                    1,
                    Number(precisao) ||
                    0
                )
            );


        const dano =
            Math.round(
                minimo +
                (
                    maximo -
                    minimo
                ) *
                precisaoSegura
            );


        console.log(
            nome,
            "causou",
            dano,
            "de dano."
        );


        this.estado =
            "JOGADOR";


        this.tocarSomBatalha(
            "slash",
            () => {

                if (
                    !this.ativa
                )
                    return;


                this.danoMascara(
                    dano
                );

            }
        );


        this.registrarAcao(
            nome,
            "atacar"
        );

    },


    // =====================================================
    // RITUAIS ASH
    // =====================================================

    mostrarRituaisAsh() {

        if (
            !this.ativa ||
            this.personagensAgiram.ash
        )
            return;


        const lista = [

            {
                nome:
                    "ESPADA SANGRENTA (35 PE)",

                valor:
                    "espada"
            },

            {
                nome:
                    "CONSUMIR MANANCIAL (30 PE)",

                valor:
                    "manancial"
            },

            {
                nome:
                    "CORAÇÃO DE SANGUE (50 PE)",

                valor:
                    "coracao"
            },

            {
                nome:
                    "VOLTAR",

                valor:
                    "voltar"
            }

        ];


        BatalhaRender.mostrarEscolhaGenerica(
            "RITUAIS",
            lista,
            valor => {

                if (
                    valor ===
                    "voltar"
                ) {

                    BatalhaRender.abrirAcoes(
                        "ash"
                    );

                    return;

                }


                this.usarRitualAsh(
                    valor
                );

            }
        );

    },


    usarRitualAsh(tipo) {

        if (
            !this.ativa
        )
            return;


        if (
            this.personagensAgiram.ash
        )
            return;


        const custos = {

            espada:
                35,

            manancial:
                30,

            coracao:
                50

        };


        const custo =
            custos[tipo];


        if (
            custo ===
            undefined
        )
            return;


        if (
            !this.gastarPE(
                custo
            )
        ) {

            return;

        }


        BatalhaRender.trocarSprite(
            "ash",
            "ritual"
        );


        if (
            tipo ===
            "espada"
        ) {

            const dano =
                this.aleatorio(
                    200,
                    300
                );


            this.tocarSomBatalha(
                "sangue"
            );


            this.danoMascara(
                dano
            );

        }


        else if (
            tipo ===
            "manancial"
        ) {

            const antes =
                this.ash.hp;


            const cura =
                this.aleatorio(
                    20,
                    40
                );


            this.ash.hp =
                Math.min(
                    this.ash.hp +
                    cura,
                    this.ash.hpMax
                );


            const ganho =
                this.ash.hp -
                antes;


            this.tocarSomBatalha(
                "curar"
            );


            if (
                ganho > 0
            ) {

                BatalhaRender.mostrarCuraPersonagem(
                    "ash",
                    ganho
                );

            }

        }


        else if (
            tipo ===
            "coracao"
        ) {

            this.coracaoDeSangueRodadas =
                3;


            this.tocarSomBatalha(
                "oba"
            );

        }


        this.registrarAcao(
            "ash",
            "ritual"
        );

    },


    // =====================================================
    // RITUAIS SPIKE
    // =====================================================

    mostrarRituaisSpike() {

        if (
            !this.ativa ||
            this.personagensAgiram.spike
        )
            return;


        const lista = [

            {
                nome:
                    "APROPRIAÇÃO (15 PE)",

                valor:
                    "apropriacao"
            },

            {
                nome:
                    "CHAMAS DO CAOS (38 PE)",

                valor:
                    "chamas"
            },

            {
                nome:
                    "DESCARNAR (60 PE)",

                valor:
                    "descarnar"
            },

            {
                nome:
                    "CURAR CUMPADE (35 PE)",

                valor:
                    "curar"
            },

            {
                nome:
                    "VOLTAR",

                valor:
                    "voltar"
            }

        ];


        BatalhaRender.mostrarEscolhaGenerica(
            "RITUAIS",
            lista,
            valor => {

                if (
                    valor ===
                    "voltar"
                ) {

                    BatalhaRender.abrirAcoes(
                        "spike"
                    );

                    return;

                }


                if (
                    valor ===
                    "curar"
                ) {

                    this.mostrarEscolhaCuraSpike();

                    return;

                }


                this.usarRitualSpike(
                    valor
                );

            }
        );

    },


    usarRitualSpike(tipo) {

        if (
            !this.ativa
        )
            return;


        if (
            this.personagensAgiram.spike
        )
            return;


        const custos = {

            apropriacao:
                15,

            chamas:
                38,

            descarnar:
                60

        };


        const custo =
            custos[tipo];


        if (
            custo ===
            undefined
        )
            return;


        if (
            !this.gastarPE(
                custo
            )
        ) {

            return;

        }


        BatalhaRender.trocarSprite(
            "spike",
            "ritual"
        );


        if (
            tipo ===
            "apropriacao"
        ) {

            this.tocarSomBatalha(
                "eletricidade"
            );


            this.danoMascara(
                this.aleatorio(
                    20,
                    60
                )
            );

        }


        else if (
            tipo ===
            "chamas"
        ) {

            this.tocarSomBatalha(
                "fogo"
            );


            this.danoMascara(
                this.aleatorio(
                    6,
                    176
                )
            );

        }


        else if (
            tipo ===
            "descarnar"
        ) {

            this.danoMascara(
                this.aleatorio(
                    250,
                    365
                )
            );

        }


        this.registrarAcao(
            "spike",
            "ritual"
        );

    },


    // =====================================================
    // CURAR CUMPADE
    // =====================================================

    mostrarEscolhaCuraSpike() {

        const alvos = [

            "ash",
            "manel"

        ].filter(
            id =>
                this[id].hp > 0 &&
                this[id].hp <
                this[id].hpMax
        );


        if (
            !alvos.length
        ) {

            BatalhaRender.mostrarMensagem(
                "NINGUÉM PRECISA DE CURA.",
                () =>
                    this.mostrarRituaisSpike()
            );


            return;

        }


        const itens =
            alvos.map(
                id => ({

                    nome:
                        `${this[id].nome} - ${this[id].hp} HP`,

                    valor:
                        id

                })
            );


        itens.push({

            nome:
                "VOLTAR",

            valor:
                "voltar"

        });


        BatalhaRender.mostrarEscolhaGenerica(
            "ESCOLHA QUEM CURAR",
            itens,
            id => {

                if (
                    id ===
                    "voltar"
                ) {

                    this.mostrarRituaisSpike();

                    return;

                }


                if (
                    this.personagensAgiram.spike
                )
                    return;


                if (
                    !this.gastarPE(
                        35
                    )
                )
                    return;


                const alvo =
                    this[id];


                const antes =
                    alvo.hp;


                const cura =
                    this.aleatorio(
                        10,
                        100
                    );


                alvo.hp =
                    Math.min(
                        alvo.hp +
                        cura,
                        alvo.hpMax
                    );


                const ganho =
                    alvo.hp -
                    antes;


                this.tocarSomBatalha(
                    "curar"
                );


                BatalhaRender.trocarSprite(
                    "spike",
                    "ritual"
                );


                if (
                    ganho > 0
                ) {

                    BatalhaRender.mostrarCuraPersonagem(
                        id,
                        ganho
                    );

                }


                this.registrarAcao(
                    "spike",
                    "ritual"
                );

            }
        );

    },


    // =====================================================
    // AGIR ASH
    // =====================================================

    mostrarAgirAsh() {

        if (
            !this.ativa ||
            this.personagensAgiram.ash
        )
            return;


        BatalhaRender.trocarSprite(
            "ash",
            "agir"
        );


        BatalhaRender.mostrarMensagem(
            "Ash tentou falar com a Máscara.\n\n...\n\nNada adiantou.",

            () => {

                this.registrarAcao(
                    "ash",
                    "agir"
                );

            }

        );

    },


    // =====================================================
    // AGIR SPIKE
    // =====================================================

    mostrarAgirSpike() {

        if (
            !this.ativa ||
            this.personagensAgiram.spike
        )
            return;


        const itens = [

            {
                nome:
                    "AGORA NÃO!",

                valor:
                    "reviver"
            },

            {
                nome:
                    "CONVERSAR",

                valor:
                    "conversar"
            },

            {
                nome:
                    "VOLTAR",

                valor:
                    "voltar"
            }

        ];


        BatalhaRender.mostrarEscolhaGenerica(
            "AGIR",
            itens,
            valor => {

                if (
                    valor ===
                    "voltar"
                ) {

                    BatalhaRender.abrirAcoes(
                        "spike"
                    );

                    return;

                }


                if (
                    valor ===
                    "reviver"
                ) {

                    this.mostrarEscolhaReviver();

                    return;

                }


                BatalhaRender.trocarSprite(
                    "spike",
                    "agir"
                );


                BatalhaRender.mostrarMensagem(
                    "Spike tentou conversar com a Máscara.\n\n...\n\nDe nada adiantou.",

                    () => {

                        this.registrarAcao(
                            "spike",
                            "agir"
                        );

                    }

                );

            }
        );

    },


    // =====================================================
    // AGIR MANEL
    // =====================================================

    mostrarAgirManel() {

        if (
            !this.ativa ||
            this.personagensAgiram.manel
        )
            return;


        BatalhaRender.trocarSprite(
            "manel",
            "agir"
        );


        BatalhaRender.mostrarMensagem(
            "Manel NÃO conversou.\n\n...\n\nEle não consegue.\n\nXD",

            () => {

                this.registrarAcao(
                    "manel",
                    "agir"
                );

            }

        );

    },


    // =====================================================
    // REVIVER
    // =====================================================

    mostrarEscolhaReviver() {

        const mortos = [

            "ash",
            "manel"

        ].filter(
            id =>
                this[id].hp <= 0
        );


        if (
            !mortos.length
        ) {

            BatalhaRender.mostrarMensagem(
                "NINGUÉM PODE SER REVIVIDO.",
                () =>
                    this.mostrarAgirSpike()
            );


            return;

        }


        const itens =
            mortos.map(
                id => ({

                    nome:
                        `${this[id].nome} - REVIVER 50 HP`,

                    valor:
                        id

                })
            );


        itens.push({

            nome:
                "VOLTAR",

            valor:
                "voltar"

        });


        BatalhaRender.mostrarEscolhaGenerica(
            "ESCOLHA QUEM REVIVER",
            itens,
            id => {

                if (
                    id ===
                    "voltar"
                ) {

                    this.mostrarAgirSpike();

                    return;

                }


                if (
                    this.personagensAgiram.spike
                )
                    return;


                this[id].hp =
                    50;


                this.tocarSomBatalha(
                    "curar"
                );


                BatalhaRender.trocarSprite(
                    "spike",
                    "agir"
                );


                BatalhaRender.mostrarCuraPersonagem(
                    id,
                    50
                );


                this.registrarAcao(
                    "spike",
                    "agir"
                );

            }
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
            typeof AtaqueMascara !==
            "undefined"
        ) {

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
                        typeof AtaqueMascara.escolherAtaque ===
                        "function"
                    ) {

                        AtaqueMascara.escolherAtaque();

                    }

                },
                600
            );

        }

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
            typeof AtaqueMascara !==
            "undefined" &&
            typeof AtaqueMascara.resetar ===
            "function"
        ) {

            AtaqueMascara.resetar();

        }


        if (
            typeof Coracao !==
            "undefined" &&
            typeof Coracao.parar ===
            "function"
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


            if (
                typeof BatalhaRender.resetarSprites ===
                "function"
            ) {

                BatalhaRender.resetarSprites();

            }

        }


        if (
            this.coracaoDeSangueRodadas >
            0
        ) {

            this.coracaoDeSangueRodadas--;

        }


        this.ash.defesa =
            false;

        this.spike.defesa =
            false;

        this.manel.defesa =
            false;


        this.personagensAgiram = {

            ash: false,
            spike: false,
            manel: false

        };


        this.acoes =
            {};


        this.personagemSelecionado =
            "ash";


        this.turno =
            "jogador";


        this.estado =
            "JOGADOR";


        console.log(
            "NOVA RODADA"
        );


        setTimeout(
            () => {

                if (
                    !this.ativa
                )
                    return;


                if (
                    typeof BatalhaRender !==
                    "undefined" &&
                    typeof BatalhaRender.mostrarMenuPersonagens ===
                    "function"
                ) {

                    BatalhaRender.mostrarMenuPersonagens();

                }

            },
            200
        );

    },


    // =====================================================
    // DANO NA MÁSCARA
    // =====================================================

    danoMascara(
        valor
    ) {

        if (
            !this.ativa
        )
            return;


        let dano =
            Number(valor) ||
            0;


        dano =
            Math.max(
                0,
                Math.round(dano)
            );


        if (
            dano <=
            0
        )
            return;


        this.mascara.hp =
            Math.max(
                0,
                this.mascara.hp -
                dano
            );


        if (
            typeof Mascara !==
            "undefined"
        ) {

            Mascara.hp =
                this.mascara.hp;

        }


        if (
            typeof BatalhaRender !==
            "undefined"
        ) {

            BatalhaRender.mostrarDanoMascara(
                dano
            );

        }


        this.tocarDanoInimigo(
            dano
        );


        console.log(
            "DANO NA MÁSCARA:",
            dano
        );


        if (
            this.mascara.hp <=
            0
        ) {

            this.vitoria();

        }

    },


    // =====================================================
    // DANO ALEATÓRIO NO GRUPO
    // =====================================================

    danoJogador(
        valor
    ) {

        if (
            !this.ativa
        )
            return;


        const danoBase =
            Number(valor) ||
            0;


        const vivos =
            this.ordemPersonagens.filter(
                id =>
                    this[id].hp > 0
            );


        if (
            !vivos.length
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
            danoBase
        );

    },


    // =====================================================
    // DANO EM PERSONAGEM
    // =====================================================

    danoPersonagem(
        nome,
        valor
    ) {

        if (
            !this.ativa
        )
            return;


        const p =
            this[nome];


        if (
            !p ||
            p.hp <= 0
        )
            return;


        let dano =
            Number(valor) ||
            0;


        // =================================================
        // DEFESA
        // =================================================

        if (
            p.defesa
        ) {

            dano *=
                0.9;

        }


        // =================================================
        // CORAÇÃO DE SANGUE
        // =================================================

        if (
            this.coracaoDeSangueRodadas >
            0
        ) {

            dano *=
                0.8;

        }


        dano =
            Math.max(
                0,
                Math.round(dano)
            );


        if (
            dano <=
            0
        )
            return;


        p.hp =
            Math.max(
                0,
                p.hp -
                dano
            );


        if (
            typeof BatalhaRender !==
            "undefined"
        ) {

            BatalhaRender.mostrarDanoPersonagem(
                nome,
                dano
            );

        }


        this.tocarSomBatalha(
            "dano"
        );


        console.log(
            p.nome,
            "recebeu",
            dano,
            "de dano."
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
    // GASTAR PE
    // =====================================================

    gastarPE(
        valor
    ) {

        const custo =
            Number(valor) ||
            0;


        if (
            this.pe <
            custo
        ) {

            if (
                typeof BatalhaRender !==
                "undefined"
            ) {

                const id =
                    BatalhaRender.personagemSelecionado ||
                    this.personagemSelecionado;


                BatalhaRender.mostrarMensagem(
                    "PE INSUFICIENTE.",

                    () => {

                        if (
                            this.ativa &&
                            this.turno ===
                            "jogador"
                        ) {

                            BatalhaRender.abrirAcoes(
                                id
                            );

                        }

                    }
                );

            }


            return false;

        }


        this.pe -=
            custo;


        this.atualizarPE();


        return true;

    },


    // =====================================================
    // ATUALIZAR PE
    // =====================================================

    atualizarPE() {

        if (
            typeof BatalhaRender !==
            "undefined" &&
            typeof BatalhaRender.atualizarCabecas ===
            "function"
        ) {

            BatalhaRender.atualizarCabecas();

        }

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
        ) +
        minimo;

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


        this.ativa =
            false;


        this.estado =
            "FIM";


        if (
            typeof AtaqueMascara !==
            "undefined" &&
            typeof AtaqueMascara.resetar ===
            "function"
        ) {

            AtaqueMascara.resetar();

        }


        if (
            typeof Coracao !==
            "undefined" &&
            typeof Coracao.remover ===
            "function"
        ) {

            Coracao.remover();

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


        this.esconderArena();


        if (
            typeof GameOver !==
            "undefined" &&
            typeof GameOver.iniciar ===
            "function"
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


        this.ativa =
            false;


        this.estado =
            "FIM";


        if (
            typeof AtaqueMascara !==
            "undefined" &&
            typeof AtaqueMascara.resetar ===
            "function"
        ) {

            AtaqueMascara.resetar();

        }


        if (
            typeof Coracao !==
            "undefined" &&
            typeof Coracao.remover ===
            "function"
        ) {

            Coracao.remover();

        }


        const arena =
            document.getElementById(
                "arena"
            );


        if (
            arena
        ) {

            arena.innerHTML = `

                <div style="
                    position:absolute;
                    inset:0;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    color:white;
                    font-family:Determination, monospace;
                    font-size:42px;
                    text-align:center;
                ">

                    A máscara caiu.

                </div>

            `;

        }


        setTimeout(
            () =>
                this.esconderArena(),
            3000
        );

    }

};