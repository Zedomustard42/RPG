const Batalha = {

    // =====================================================
    // ESTADO
    // =====================================================

    ativa: false,

    turno: "jogador",

    estado: "JOGADOR",

    acaoEscolhida: null,

    batalhaIniciada: false,

    mudancaTurnoEmAndamento: false,


    // =====================================================
    // RESETAR BATALHA
    // =====================================================

    resetar() {

        this.ativa = false;

        this.turno = "jogador";

        this.estado = "JOGADOR";

        this.acaoEscolhida = null;

        this.batalhaIniciada = false;

        this.mudancaTurnoEmAndamento = false;


        // =================================================
        // JOGADOR
        // =================================================

        this.jogador.x = 150;

        this.jogador.y = 180;

        this.jogador.hp =
            this.jogador.hpMax;

        this.jogador.direcao =
            "frente";

        this.jogador.sprite =
            "assets/imagens/ra_frente.png";


        // =================================================
        // MÁSCARA
        // =================================================

        Mascara.hp =
            Mascara.hpMax;

        Mascara.fase = 1;

        Mascara.x = 1050;

        Mascara.y = 120;

        Mascara.sprite =
            "assets/imagens/fase1.png";


        // =================================================
        // ESCONDER ARENA
        // =================================================

        this.esconderArena();

    },


    // =====================================================
    // JOGADOR
    // =====================================================

    jogador: {

        x: 150,

        y: 180,

        velocidade: 5,

        hp: 20,

        hpMax: 20,

        dano: 15,

        direcao: "frente",

        sprite:
            "assets/imagens/ra_frente.png"

    },


    // =====================================================
    // INTRODUÇÃO
    // =====================================================

    iniciarIntroducao() {

        console.log(
            "INTRODUÇÃO DA MÁSCARA"
        );


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


            // =================================================
            // TERMINOU INTRODUÇÃO
            // =================================================

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
    // MOSTRAR ARENA
    // =====================================================

    mostrarArena() {

        document.body.classList.add(
            "batalhaAtiva"
        );


        const game =
            document.getElementById(
                "game"
            );


        if (game) {

            game.style.display =
                "none";

        }


        const mobile =
            document.getElementById(
                "mobile"
            );


        if (mobile) {

            mobile.style.display =
                "none";

        }


        const arena =
            document.getElementById(
                "arena"
            );


        if (arena) {

            arena.style.display =
                "block";

            arena.classList.add(
                "batalhaAtiva"
            );

        }


        console.log(
            "ARENA DA BATALHA MOSTRADA"
        );

    },


    // =====================================================
    // ESCONDER ARENA
    // =====================================================

    esconderArena() {

        document.body.classList.remove(
            "batalhaAtiva"
        );


        const game =
            document.getElementById(
                "game"
            );


        if (game) {

            game.style.display =
                "";

        }


        const mobile =
            document.getElementById(
                "mobile"
            );


        if (mobile) {

            mobile.style.display =
                "";

        }


        const arena =
            document.getElementById(
                "arena"
            );


        if (arena) {

            arena.style.display =
                "none";

            arena.classList.remove(
                "batalhaAtiva"
            );

        }

    },


    // =====================================================
    // INICIAR BATALHA
    // =====================================================

    iniciar() {

        console.log(
            "BATALHA DA MÁSCARA INICIADA"
        );


        this.ativa = true;

        this.batalhaIniciada = true;

        this.turno = "jogador";

        this.estado = "JOGADOR";

        this.acaoEscolhida = null;

        this.mudancaTurnoEmAndamento =
            false;


        // =================================================
        // MOSTRAR ARENA
        // =================================================

        this.mostrarArena();


        // =================================================
        // JOGADOR
        // =================================================

        this.jogador.hp =
            this.jogador.hpMax;


        // RA À ESQUERDA

        this.jogador.x =
            150;

        this.jogador.y =
            180;


        this.jogador.direcao =
            "frente";


        this.jogador.sprite =
            "assets/imagens/ra_frente.png";


        // =================================================
        // MÁSCARA
        // =================================================

        Mascara.hp =
            Mascara.hpMax;


        Mascara.fase =
            1;


        // MÁSCARA À DIREITA

        Mascara.x =
            1050;

        Mascara.y =
            120;


        Mascara.sprite =
            "assets/imagens/fase1.png";


        // =================================================
        // MÚSICA
        // =================================================

        AudioManager.pararMusica();


        AudioManager.tocarMusica(
            "mascaras"
        );


        // =================================================
        // PARAR CORAÇÃO
        // =================================================

        if (
            typeof Coracao !==
            "undefined"
        ) {

            Coracao.parar();

        }


        // =================================================
        // RESETAR ATAQUE DA MÁSCARA
        // =================================================

        if (
            typeof AtaqueMascara !==
            "undefined"
        ) {

            if (
                typeof AtaqueMascara.finalizar ===
                "function"
            ) {

                AtaqueMascara.finalizar();

            }

            AtaqueMascara.ativo =
                false;

            AtaqueMascara.atirando =
                false;

        }


        // =================================================
        // RENDER
        // =================================================

        if (
            typeof BatalhaRender !==
            "undefined"
        ) {

            BatalhaRender.iniciar();

        }


        // =================================================
        // LOOP
        // =================================================

        this.loop();


        // =================================================
        // MOSTRAR MENU
        // =================================================

        setTimeout(() => {

            if (
                !this.ativa
            )
                return;


            this.turno =
                "jogador";


            this.estado =
                "JOGADOR";


            if (
                typeof BatalhaRender !==
                "undefined"
            ) {

                if (
                    typeof BatalhaRender.mostrarMenuAcoes ===
                    "function"
                ) {

                    BatalhaRender.mostrarMenuAcoes();

                }

            }

        }, 100);


        console.log(
            "TURNO DO JOGADOR"
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


        // =================================================
        // TURNO DO JOGADOR
        // =================================================

        if (
            this.turno ===
            "jogador"
        ) {

            // O menu controla a ação.

        }


        // =================================================
        // TURNO DA MÁSCARA
        // =================================================

        else if (
            this.turno ===
            "mascara"
        ) {

            if (
                this.estado ===
                "ESQUIVA"
            ) {

                if (
                    typeof Coracao !==
                    "undefined"
                ) {

                    Coracao.atualizar();

                }

            }

        }


        // =================================================
        // FASE
        // =================================================

        this.atualizarFase();


        // =================================================
        // RENDER
        // =================================================

        if (
            typeof BatalhaRender !==
            "undefined"
        ) {

            BatalhaRender.atualizar();

        }

    },


    // =====================================================
    // ESCOLHER AÇÃO
    // =====================================================

    escolherAcao(acao) {

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
            this.estado !==
            "JOGADOR"
        )
            return;


        if (
            acao !== "atacar" &&
            acao !== "ritual"
        )
            return;


        this.acaoEscolhida =
            acao;


        console.log(
            "AÇÃO ESCOLHIDA:",
            acao
        );


        // =================================================
        // ESCONDER MENU
        // =================================================

        if (
            typeof BatalhaRender !==
            "undefined"
        ) {

            if (
                typeof BatalhaRender.esconderMenuAcoes ===
                "function"
            ) {

                BatalhaRender.esconderMenuAcoes();

            }

        }


        // =================================================
        // ATACAR
        // =================================================

        if (
            acao ===
            "atacar"
        ) {

            this.executarAtaque();

        }


        // =================================================
        // RITUAL
        // =================================================

        else if (
            acao ===
            "ritual"
        ) {

            this.executarRitual();

        }

    },


    // =====================================================
    // ATAQUE DO JOGADOR
    // =====================================================

    executarAtaque() {

        if (
            !this.ativa
        )
            return;


        console.log(
            "RA ATACOU A MÁSCARA"
        );


        this.danoMascara(
            this.jogador.dano
        );


        if (
            !this.ativa
        )
            return;


        this.iniciarTurnoMascara();

    },


    // =====================================================
    // RITUAL DO JOGADOR
    // =====================================================

    executarRitual() {

        if (
            !this.ativa
        )
            return;


        console.log(
            "RA USOU RITUAL"
        );


        this.danoMascara(
            10
        );


        if (
            !this.ativa
        )
            return;


        this.iniciarTurnoMascara();

    },


    // =====================================================
    // TURNO DA MÁSCARA
    // =====================================================

    iniciarTurnoMascara() {

        if (
            !this.ativa
        )
            return;


        if (
            this.mudancaTurnoEmAndamento
        )
            return;


        this.mudancaTurnoEmAndamento =
            true;


        this.turno =
            "mascara";


        this.estado =
            "ESQUIVA";


        console.log(
            "TURNO DA MÁSCARA"
        );


        // =================================================
        // ESCONDER MENU
        // =================================================

        if (
            typeof BatalhaRender !==
            "undefined"
        ) {

            if (
                typeof BatalhaRender.esconderMenuAcoes ===
                "function"
            ) {

                BatalhaRender.esconderMenuAcoes();

            }


            if (
                typeof BatalhaRender.mostrarCaixaEsquiva ===
                "function"
            ) {

                BatalhaRender.mostrarCaixaEsquiva();

            }

        }


        // =================================================
        // INICIAR CORAÇÃO
        // =================================================

        if (
            typeof Coracao !==
            "undefined"
        ) {

            Coracao.iniciar();

        }


        // =================================================
        // ATAQUE DA MÁSCARA
        // =================================================

        setTimeout(() => {

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
                typeof AtaqueMascara ===
                "undefined"
            ) {

                console.error(
                    "AtaqueMascara não encontrado."
                );

                this.terminarTurnoMascara();

                return;

            }


            console.log(
                "MÁSCARA VAI ESCOLHER UM ATAQUE"
            );


            // =================================================
            // IMPORTANTE:
            // O seu AtaqueMascara possui
            // escolherAtaque(), e não executar().
            // =================================================

            if (
                typeof AtaqueMascara.escolherAtaque ===
                "function"
            ) {

                AtaqueMascara.escolherAtaque();

            }

            else {

                // Compatibilidade caso queira
                // chamar diretamente.

                if (
                    Math.random() < 0.5
                ) {

                    AtaqueMascara.executarRitual();

                }

                else {

                    AtaqueMascara.executarArma();

                }

            }

        }, 700);

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
            this.mudancaTurnoEmAndamento ===
            false
        ) {

            // Pode continuar normalmente.

        }


        console.log(
            "TURNO DA MÁSCARA TERMINOU"
        );


        // =================================================
        // PARAR ATAQUES
        // =================================================

        if (
            typeof AtaqueMascara !==
            "undefined"
        ) {

            AtaqueMascara.ativo =
                false;

            AtaqueMascara.atirando =
                false;

        }


        // =================================================
        // PARAR CORAÇÃO
        // =================================================

        if (
            typeof Coracao !==
            "undefined"
        ) {

            Coracao.parar();

        }


        // =================================================
        // ESCONDER CAIXA
        // =================================================

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
        // VOLTAR PARA JOGADOR
        // =================================================

        this.turno =
            "jogador";


        this.estado =
            "JOGADOR";


        this.acaoEscolhida =
            null;


        this.mudancaTurnoEmAndamento =
            false;


        console.log(
            "NOVO ROUND - TURNO DO JOGADOR"
        );


        // =================================================
        // MOSTRAR MENU NOVAMENTE
        // =================================================

        setTimeout(() => {

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
                typeof BatalhaRender !==
                "undefined"
            ) {

                if (
                    typeof BatalhaRender.mostrarMenuAcoes ===
                    "function"
                ) {

                    BatalhaRender.mostrarMenuAcoes();

                }

            }

        }, 300);

    },


    // =====================================================
    // ALIAS
    // =====================================================

    terminarEsquiva() {

        this.terminarTurnoMascara();

    },


    // =====================================================
    // FASES DA MÁSCARA
    // =====================================================

    atualizarFase() {

        if (
            !this.ativa
        )
            return;


        // =================================================
        // FASE 4
        // =================================================

        if (
            Mascara.hp <= 120
        ) {

            if (
                Mascara.fase !== 4
            ) {

                Mascara.fase =
                    4;


                Mascara.sprite =
                    "assets/imagens/fase4.png";


                console.log(
                    "FASE 4 ATIVA"
                );

            }

        }


        // =================================================
        // FASE 3
        // =================================================

        else if (
            Mascara.hp <= 200
        ) {

            if (
                Mascara.fase !== 3
            ) {

                Mascara.fase =
                    3;


                Mascara.sprite =
                    "assets/imagens/fase3.png";


                console.log(
                    "FASE 3 ATIVA"
                );

            }

        }


        // =================================================
        // FASE 2
        // =================================================

        else if (
            Mascara.hp <= 300
        ) {

            if (
                Mascara.fase !== 2
            ) {

                Mascara.fase =
                    2;


                Mascara.sprite =
                    "assets/imagens/fase2.png";


                console.log(
                    "FASE 2 ATIVA"
                );

            }

        }

    },


    // =====================================================
    // MOVIMENTO ANTIGO DA MÁSCARA
    // =====================================================

    movimentoMascara() {

        if (
            !Mascara.flutuando
        )
            return;


        Mascara.x +=
            Mascara.direcaoX *
            Mascara.velocidade;


        Mascara.y +=
            Mascara.direcaoY *
            Mascara.velocidade;


        if (
            Mascara.x <= 100 ||
            Mascara.x >=
            CenarioMascara.largura - 150
        ) {

            Mascara.direcaoX *= -1;

        }


        if (
            Mascara.y <= 80 ||
            Mascara.y >= 300
        ) {

            Mascara.direcaoY *= -1;

        }


        Mascara.y +=
            Math.sin(
                Date.now() / 300
            ) * 0.8;

    },


    // =====================================================
    // DANO NO JOGADOR
    // =====================================================

    danoJogador(valor) {

        if (
            !this.ativa
        )
            return;


        this.jogador.hp -=
            valor;


        console.log(
            "DANO RECEBIDO:",
            valor
        );


        if (
            this.jogador.hp <= 0
        ) {

            this.jogador.hp =
                0;


            this.derrota();

        }

    },


    // =====================================================
    // DANO NA MÁSCARA
    // =====================================================

    danoMascara(valor) {

        if (
            !this.ativa
        )
            return;


        Mascara.hp -=
            valor;


        console.log(
            "DANO NA MÁSCARA:",
            valor
        );


        if (
            Mascara.hp <= 0
        ) {

            Mascara.hp =
                0;


            this.vitoria();

        }

    },


    // =====================================================
    // DERROTA
    // =====================================================

    derrota() {

        console.log(
            "VOCÊ PERDEU"
        );


        this.ativa =
            false;


        this.estado =
            "FIM";


        // =================================================
        // PARAR ATAQUE
        // =================================================

        if (
            typeof AtaqueMascara !==
            "undefined"
        ) {

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


        // =================================================
        // PARAR CORAÇÃO
        // =================================================

        if (
            typeof Coracao !==
            "undefined"
        ) {

            Coracao.remover();

        }


        // =================================================
        // ESCONDER ARENA
        // =================================================

        this.esconderArena();


        // =================================================
        // GAME OVER
        // =================================================

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

        console.log(
            "VOCÊ VENCEU"
        );


        this.ativa =
            false;


        this.estado =
            "FIM";


        // =================================================
        // PARAR ATAQUE
        // =================================================

        if (
            typeof AtaqueMascara !==
            "undefined"
        ) {

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


        // =================================================
        // PARAR CORAÇÃO
        // =================================================

        if (
            typeof Coracao !==
            "undefined"
        ) {

            Coracao.remover();

        }


        // =================================================
        // MENSAGEM
        // =================================================

        const arena =
            document.getElementById(
                "arena"
            );


        if (arena) {

            arena.innerHTML = `

                <div
                    style="
                        position:absolute;
                        left:50%;
                        top:50%;
                        transform:translate(-50%,-50%);
                        color:white;
                        font-size:32px;
                        font-weight:bold;
                        text-align:center;
                        text-shadow:2px 2px #000;
                    "
                >
                    A máscara caiu.
                </div>

            `;

        }


        // =================================================
        // ESPERAR
        // =================================================

        setTimeout(() => {

            this.esconderArena();

        }, 3000);

    }

};