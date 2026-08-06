const Batalha = {

    ativa: false,


    // =========================
    // RESETAR BATALHA
    // =========================

    resetar() {

        this.jogador.x = 675;
        this.jogador.y = 430;

        this.jogador.hp =
            this.jogador.hpMax;


        Mascara.hp =
            Mascara.hpMax;


        Mascara.fase = 1;


        Mascara.x = 675;
        Mascara.y = 100;


        Mascara.sprite =
            "assets/imagens/fase1.png";


        this.ativa = false;

    },


    // =========================
    // JOGADOR
    // =========================

    jogador: {

        x: 675,
        y: 430,

        velocidade: 5,

        hp: 20,
        hpMax: 20,

        dano: 15,

        direcao: "frente",

        sprite:
            "assets/imagens/ra_frente.png"

    },


    // =========================
    // INTRODUÇÃO
    // =========================

    iniciarIntroducao() {

        console.log(
            "INTRODUÇÃO DA MÁSCARA"
        );


        AudioManager.pararMusica();


        AudioManager.tocarMusica(
            "eramseismascaras"
        );


        const falas = [

            "Interessante.",

            "Você Sabia?",

            "Você Imaginava?",

            "Porque Veio Até Mim?",

            "Curiosidade?",

            "...",

            "Excelente.",

            "Máscara. Sua Identidade Perdida.",

            "O Ritual Está Prestes À Começar.",

            "Você Está Aqui. Você Sobreviveu.",

            "E É Hora De Pegar Sua Identidade De Volta.",

            "...",

            "Vamos Terminar O RITUAL."

        ];


        let atual = 0;


        const continuar = (evento) => {

            if (evento.key !== "Enter")
                return;


            if (atual >= falas.length) {

                document.removeEventListener(
                    "keydown",
                    continuar
                );


                AudioManager.tocarMusica(
                    "mascaras"
                );


                this.iniciar();


                return;

            }


            UI.texto(
                "???",
                falas[atual]
            );


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


    // =========================
    // INICIAR BATALHA
    // =========================

    iniciar() {

        console.log(
            "BATALHA DA MÁSCARA INICIADA"
        );


        this.ativa = true;


        // =========================
        // JOGADOR
        // =========================

        this.jogador.hp =
            this.jogador.hpMax;


        this.jogador.x = 675;
        this.jogador.y = 430;


        this.jogador.direcao =
            "frente";


        this.jogador.sprite =
            "assets/imagens/ra_frente.png";


        // =========================
        // MÁSCARA
        // =========================

        Mascara.hp =
            Mascara.hpMax;


        Mascara.fase = 1;


        Mascara.x = 675;
        Mascara.y = 100;


        Mascara.sprite =
            "assets/imagens/fase1.png";


        // =========================
        // MÚSICA
        // =========================

        AudioManager.pararMusica();


        AudioManager.tocarMusica(
            "mascaras"
        );


        // =========================
        // MOVIMENTO
        // =========================

        Movimento.iniciar();


        // =========================
        // RENDER
        // =========================

        BatalhaRender.iniciar();


        // =========================
        // CÂMERA
        // =========================

        const arena =
            document.getElementById("arena");


        if (arena) {

            arena.scrollLeft =
                this.jogador.x -
                window.innerWidth / 2;


            arena.scrollTop =
                this.jogador.y -
                window.innerHeight / 2;

        }


        // =========================
        // LOOP
        // =========================

        this.loop();


        // =========================
        // BOTÃO DE ATAQUE
        // =========================

        const ataque =
            document.getElementById("btnAtaque");


        if (ataque) {

            ataque.onclick = () => {

                this.atacar();

            };

        }


        if (
            typeof BatalhaMobile !==
            "undefined"
        ) {

            // Sistema mobile

        }

    },


    // =========================
    // LOOP
    // =========================

    loop() {

        if (!this.ativa)
            return;


        this.atualizar();


        requestAnimationFrame(
            () => this.loop()
        );

    },


    // =========================
    // ATUALIZAR
    // =========================

    atualizar() {

        Movimento.atualizar();


        this.atualizarFase();


        this.movimentoMascara();


        if (
            typeof BatalhaRender !==
            "undefined"
        ) {

            BatalhaRender.atualizar();

        }

    },


    // =========================
    // FASES
    // =========================

    atualizarFase() {

        // FASE 4

        if (Mascara.hp <= 120) {

            if (Mascara.fase !== 4) {

                Mascara.fase = 4;


                Mascara.sprite =
                    "assets/imagens/fase4.png";


                console.log(
                    "FASE 4 ATIVA"
                );

            }

        }


        // FASE 3

        else if (Mascara.hp <= 200) {

            if (Mascara.fase !== 3) {

                Mascara.fase = 3;


                Mascara.sprite =
                    "assets/imagens/fase3.png";


                console.log(
                    "FASE 3 ATIVA"
                );

            }

        }


        // FASE 2

        else if (Mascara.hp <= 300) {

            if (Mascara.fase !== 2) {

                Mascara.fase = 2;


                Mascara.sprite =
                    "assets/imagens/fase2.png";


                console.log(
                    "FASE 2 ATIVA"
                );

            }

        }

    },


    // =========================
    // MOVIMENTO DA MÁSCARA
    // =========================

    movimentoMascara() {

        if (!Mascara.flutuando)
            return;


        Mascara.x +=
            Mascara.direcaoX *
            Mascara.velocidade;


        Mascara.y +=
            Mascara.direcaoY *
            Mascara.velocidade;


        // =========================
        // LIMITES HORIZONTAIS
        // =========================

        if (
            Mascara.x <= 100 ||
            Mascara.x >=
            CenarioMascara.largura - 150
        ) {

            Mascara.direcaoX *= -1;

        }


        // =========================
        // LIMITES VERTICAIS
        // =========================

        if (
            Mascara.y <= 80 ||
            Mascara.y >= 300
        ) {

            Mascara.direcaoY *= -1;

        }


        // =========================
        // MOVIMENTO FANTASMA
        // =========================

        Mascara.y +=
            Math.sin(
                Date.now() / 300
            ) * 0.8;

    },


    // =========================
    // DANO NO JOGADOR
    // =========================

    danoJogador(valor) {

        this.jogador.hp -= valor;


        console.log(
            "DANO RECEBIDO:",
            valor
        );


        if (
            this.jogador.hp <= 0
        ) {

            this.jogador.hp = 0;


            this.derrota();

        }

    },


    // =========================
    // DANO NA MÁSCARA
    // =========================

    danoMascara(valor) {

        Mascara.hp -= valor;


        console.log(
            "DANO NA MÁSCARA:",
            valor
        );


        if (
            Mascara.hp <= 0
        ) {

            Mascara.hp = 0;


            this.vitoria();

        }

    },


    // =========================
    // DERROTA
    // =========================

    derrota() {

        console.log(
            "VOCÊ PERDEU"
        );


        this.ativa = false;


        GameOver.iniciar();

    },


    // =========================
    // VITÓRIA
    // =========================

    vitoria() {

        console.log(
            "VOCÊ VENCEU"
        );


        this.ativa = false;


        const arena =
            document.getElementById("arena");


        if (arena) {

            arena.innerHTML = `

                <h1>
                    A máscara caiu.
                </h1>

            `;

        }

    }

};