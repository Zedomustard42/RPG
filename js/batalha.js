const Batalha = {

    ativa: false,

    personagemSelecionado: "manel",

    executandoAcao: false,

    personagens: {

        ash: {

            nome: "ASH",

            hp: 140,

            hpMax: 140,

            spriteBase:
                "assets/imagens/batalha_imagens/ash/ash_lado.png",

            spriteAtual:
                "assets/imagens/batalha_imagens/ash/ash_lado.png",

            cabeca:
                "assets/imagens/batalha_imagens/cabeças/ash_cabeça.png",

            acoes: [
                "Lutar",
                "Ritual",
                "Defender",
                "Agir"
            ]

        },


        spike: {

            nome: "SPIKE",

            hp: 100,

            hpMax: 100,

            spriteBase:
                "assets/imagens/batalha_imagens/spike/spike_lado.png",

            spriteAtual:
                "assets/imagens/batalha_imagens/spike/spike_lado.png",

            cabeca:
                "assets/imagens/batalha_imagens/cabeças/ovo_cabeça.png",

            acoes: [
                "Ritual",
                "Defender",
                "Agir"
            ]

        },


        manel: {

            nome: "MANEL",

            hp: 190,

            hpMax: 190,

            spriteBase:
                "assets/imagens/batalha_imagens/manel/manel_lado.png",

            spriteAtual:
                "assets/imagens/batalha_imagens/manel/manel_lado.png",

            cabeca:
                "assets/imagens/batalha_imagens/cabeças/manel_cabeça.png",

            acoes: [
                "Atacar",
                "Defender",
                "Agir"
            ]

        }

    },


    // =====================================================
    // RESET
    // =====================================================

    resetar() {

        this.ativa = false;

        this.executandoAcao = false;

        this.personagemSelecionado =
            "manel";


        this.personagens.ash.hp =
            this.personagens.ash.hpMax;

        this.personagens.spike.hp =
            this.personagens.spike.hpMax;

        this.personagens.manel.hp =
            this.personagens.manel.hpMax;


        this.restaurarSprites();


        const arena =
            document.getElementById("arena");


        if(arena){

            arena.innerHTML = "";

            arena.style.display =
                "none";

        }

    },


    // =====================================================
    // RESTAURAR SPRITES
    // =====================================================

    restaurarSprites() {

        this.personagens.ash.spriteAtual =
            this.personagens.ash.spriteBase;

        this.personagens.spike.spriteAtual =
            this.personagens.spike.spriteBase;

        this.personagens.manel.spriteAtual =
            this.personagens.manel.spriteBase;

    },


    // =====================================================
    // INTRODUÇÃO
    // =====================================================

    iniciarIntroducao() {

        console.log(
            "INTRODUÇÃO DA BATALHA"
        );


        if(
            typeof AudioManager !== "undefined"
        ){

            AudioManager.pararMusica();

            AudioManager.tocarMusica(
                "eramseismascaras"
            );

        }


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
                texto: "...",
                audio: null
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


        const continuar = (evento) => {

            if(
                evento.key !== "Enter"
            ){

                return;

            }


            if(
                atual >= falas.length
            ){

                document.removeEventListener(
                    "keydown",
                    continuar
                );


                if(
                    typeof AudioManager !== "undefined"
                ){

                    AudioManager.pararSom();

                    AudioManager.tocarMusica(
                        "mascaras"
                    );

                }


                this.iniciar();

                return;

            }


            const fala =
                falas[atual];


            if(
                typeof UI !== "undefined"
            ){

                UI.texto(
                    "???",
                    fala.texto
                );

            }


            if(
                fala.audio &&
                typeof AudioManager !== "undefined"
            ){

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
    // INICIAR BATALHA
    // =====================================================

    iniciar() {

        console.log(
            "================================="
        );

        console.log(
            "BATALHA INICIADA"
        );

        console.log(
            "================================="
        );


        this.ativa = true;

        this.executandoAcao = false;

        this.personagemSelecionado =
            "manel";


        this.personagens.ash.hp =
            this.personagens.ash.hpMax;

        this.personagens.spike.hp =
            this.personagens.spike.hpMax;

        this.personagens.manel.hp =
            this.personagens.manel.hpMax;


        this.restaurarSprites();


        if(
            typeof AudioManager !== "undefined"
        ){

            AudioManager.pararMusica();

            AudioManager.tocarMusica(
                "mascaras"
            );

        }


        BatalhaRender.iniciar();


        this.atualizar();

    },


    // =====================================================
    // LOOP
    // =====================================================

    loop() {

        if(!this.ativa)
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

        if(
            typeof BatalhaRender !==
            "undefined"
        ){

            BatalhaRender.atualizar();

        }

    },


    // =====================================================
    // SELECIONAR PERSONAGEM
    // =====================================================

    selecionarPersonagem(nome) {

        if(!this.ativa)
            return;


        if(this.executandoAcao)
            return;


        if(
            !this.personagens[nome]
        ){

            return;

        }


        this.personagemSelecionado =
            nome;


        BatalhaRender.atualizarMenu();

    },


    // =====================================================
    // EXECUTAR AÇÃO
    // =====================================================

    executarAcao(acao) {

        if(!this.ativa)
            return;


        if(this.executandoAcao)
            return;


        const personagem =
            this.personagens[
                this.personagemSelecionado
            ];


        if(!personagem)
            return;


        if(
            !personagem.acoes.includes(
                acao
            )
        ){

            return;

        }


        console.log(
            personagem.nome +
            " -> " +
            acao
        );


        this.executandoAcao =
            true;


        this.animarAcao(
            this.personagemSelecionado,
            acao
        );

    },


    // =====================================================
    // ANIMAÇÃO DAS AÇÕES
    // =====================================================

    animarAcao(personagem, acao) {

        let spriteInicio = null;

        let spriteAcao = null;


        // =================================================
        // ASH
        // =================================================

        if(
            personagem === "ash"
        ){

            if(
                acao === "Lutar"
            ){

                spriteAcao =
                    "assets/imagens/batalha_imagens/ash/ash_ataca.png";

            }


            else if(
                acao === "Defender"
            ){

                spriteAcao =
                    "assets/imagens/batalha_imagens/ash/ash_defesa.png";

            }


            else if(
                acao === "Agir" ||
                acao === "Ritual"
            ){

                spriteAcao =
                    "assets/imagens/batalha_imagens/ash/ash_livro.png";

            }

        }


        // =================================================
        // SPIKE
        // =================================================

        if(
            personagem === "spike"
        ){

            if(
                acao === "Defender"
            ){

                spriteAcao =
                    "assets/imagens/batalha_imagens/spike/spike_defesa.png";

            }


            else if(
                acao === "Ritual" ||
                acao === "Agir"
            ){

                spriteAcao =
                    "assets/imagens/batalha_imagens/spike/spike_livro.png";

            }

        }


        // =================================================
        // MANEL
        // =================================================

        if(
            personagem === "manel"
        ){

            if(
                acao === "Atacar"
            ){

                spriteInicio =
                    "assets/imagens/batalha_imagens/manel/manel_batalha.png";

                spriteAcao =
                    "assets/imagens/batalha_imagens/manel/manel_disparo.png";

            }


            else if(
                acao === "Defender"
            ){

                spriteAcao =
                    "assets/imagens/batalha_imagens/manel/manel_defesa.png";

            }


            else if(
                acao === "Agir"
            ){

                spriteAcao =
                    "assets/imagens/batalha_imagens/manel/manel_ritual.png";

            }

        }


        if(!spriteAcao){

            this.finalizarAcao();

            return;

        }


        const alvo =
            this.personagens[
                personagem
            ];


        if(spriteInicio){

            alvo.spriteAtual =
                spriteInicio;

            BatalhaRender.atualizar();

            setTimeout(
                () => {

                    if(!this.ativa)
                        return;


                    alvo.spriteAtual =
                        spriteAcao;


                    BatalhaRender.atualizar();

                    this.finalizarAcao();

                },
                350
            );

            return;

        }


        alvo.spriteAtual =
            spriteAcao;


        BatalhaRender.atualizar();


        setTimeout(
            () => {

                this.finalizarAcao();

            },
            500
        );

    },


    // =====================================================
    // FINALIZAR AÇÃO
    // =====================================================

    finalizarAcao() {

        if(!this.ativa)
            return;


        this.restaurarSprites();


        this.executandoAcao =
            false;


        BatalhaRender.atualizar();

    },


    // =====================================================
    // DANO
    // =====================================================

    danoJogador(valor) {

        if(
            this.personagens.ash.hp <= 0 &&
            this.personagens.spike.hp <= 0 &&
            this.personagens.manel.hp <= 0
        ){

            return;

        }


        // Compatibilidade com sistemas antigos.
        // O dano antigo vai primeiro para Manel.

        this.personagens.manel.hp -=
            valor;


        if(
            this.personagens.manel.hp < 0
        ){

            this.personagens.manel.hp = 0;

        }


        BatalhaRender.atualizar();


        if(
            this.personagens.manel.hp <= 0
        ){

            console.log(
                "MANEL FOI DERROTADO"
            );

        }

    },


    // =====================================================
    // MÉTODOS ANTIGOS
    // =====================================================

    danoMascara(valor) {

        console.log(
            "DANO RECEBIDO PELO INIMIGO:",
            valor
        );

    },


    atualizarFase() {},


    movimentoMascara() {},


    // =====================================================
    // ATAQUE ANTIGO
    // =====================================================

    atacar() {

        this.selecionarPersonagem(
            "manel"
        );

        this.executarAcao(
            "Atacar"
        );

    },


    // =====================================================
    // DERROTA
    // =====================================================

    derrota() {

        this.ativa = false;

        console.log(
            "BATALHA PERDIDA"
        );


        if(
            typeof GameOver !==
            "undefined"
        ){

            GameOver.iniciar();

        }

    },


    // =====================================================
    // VITÓRIA
    // =====================================================

    vitoria() {

        this.ativa = false;

        console.log(
            "BATALHA VENCIDA"
        );


        const arena =
            document.getElementById(
                "arena"
            );


        if(arena){

            arena.innerHTML = `

                <div class="batalhaResultado">

                    VITÓRIA

                </div>

            `;

        }

    }

};