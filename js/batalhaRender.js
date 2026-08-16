const BatalhaRender = {

    // =====================================================
    // ELEMENTOS
    // =====================================================

    arena: null,

    jogadorElemento: null,

    mascaraElemento: null,

    caixaEsquiva: null,

    menuAcoes: null,

    opcaoAtiva: 0,

    teclasIniciadas: false,


    // =====================================================
    // INICIAR
    // =====================================================

    iniciar() {

        console.log(
            "BATALHA RENDER INICIADO"
        );


        this.arena =
            document.getElementById(
                "arena"
            );


        if (!this.arena) {

            console.error(
                "Arena não encontrada."
            );

            return;

        }


        // =================================================
        // LIMPAR ARENA
        // =================================================

        this.arena.innerHTML = "";


        // =================================================
        // CRIAR JOGADOR
        // =================================================

        this.criarJogador();


        // =================================================
        // CRIAR MÁSCARA
        // =================================================

        this.criarMascara();


        // =================================================
        // CRIAR MENU
        // =================================================

        this.criarMenuAcoes();


        // =================================================
        // CRIAR CAIXA DE ESQUIVA
        // =================================================

        this.criarCaixaEsquiva();


        // =================================================
        // TECLADO
        // =================================================

        this.iniciarTeclado();


        // =================================================
        // MOSTRAR MENU
        // =================================================

        this.mostrarMenuAcoes();


        // =================================================
        // ATUALIZAR
        // =================================================

        this.atualizar();

    },


    // =====================================================
    // CRIAR JOGADOR
    // =====================================================

    criarJogador() {

        this.jogadorElemento =
            document.createElement(
                "img"
            );


        this.jogadorElemento.id =
            "jogador";


        this.jogadorElemento.src =
            Batalha.jogador.sprite;


        this.jogadorElemento.style.position =
            "absolute";


        this.jogadorElemento.style.width =
            (
                CenarioMascara.jogador.largura ||
                70
            ) + "px";


        this.jogadorElemento.style.height =
            (
                CenarioMascara.jogador.altura ||
                70
            ) + "px";


        this.jogadorElemento.style.imageRendering =
            "pixelated";


        this.jogadorElemento.style.zIndex =
            "15";


        // =================================================
        // RA NA ESQUERDA
        // =================================================

        Batalha.jogador.x =
            180;

        Batalha.jogador.y =
            350;


        this.arena.appendChild(
            this.jogadorElemento
        );

    },


    // =====================================================
    // CRIAR MÁSCARA
    // =====================================================

    criarMascara() {

        this.mascaraElemento =
            document.createElement(
                "img"
            );


        this.mascaraElemento.id =
            "mascara";


        this.mascaraElemento.src =
            Mascara.sprite;


        this.mascaraElemento.style.position =
            "absolute";


        this.mascaraElemento.style.width =
            (
                CenarioMascara.mascara.largura ||
                90
            ) + "px";


        this.mascaraElemento.style.height =
            (
                CenarioMascara.mascara.altura ||
                90
            ) + "px";


        this.mascaraElemento.style.imageRendering =
            "pixelated";


        this.mascaraElemento.style.zIndex =
            "10";


        // =================================================
        // MÁSCARA NA DIREITA
        // =================================================

        Mascara.x =
            1050;

        Mascara.y =
            120;


        this.arena.appendChild(
            this.mascaraElemento
        );

    },


    // =====================================================
    // CRIAR MENU
    // =====================================================

    criarMenuAcoes() {

        this.menuAcoes =
            document.createElement(
                "div"
            );


        this.menuAcoes.id =
            "menuAcoes";


        this.menuAcoes.innerHTML = `

            <button
                id="acaoAtacar"
                class="acaoBatalha"
            >
                ATACAR
            </button>

            <button
                id="acaoRitual"
                class="acaoBatalha"
            >
                RITUAL
            </button>

        `;


        // =================================================
        // POSIÇÃO
        // =================================================

        this.menuAcoes.style.position =
            "fixed";


        this.menuAcoes.style.left =
            "50%";


        this.menuAcoes.style.bottom =
            "35px";


        this.menuAcoes.style.transform =
            "translateX(-50%)";


        this.menuAcoes.style.display =
            "flex";


        this.menuAcoes.style.gap =
            "25px";


        this.menuAcoes.style.zIndex =
            "100";


        // =================================================
        // ESTILO DOS BOTÕES
        // =================================================

        const botoes =
            this.menuAcoes.querySelectorAll(
                ".acaoBatalha"
            );


        botoes.forEach(
            (botao) => {

                botao.style.width =
                    "180px";


                botao.style.height =
                    "55px";


                botao.style.background =
                    "#111";


                botao.style.border =
                    "3px solid white";


                botao.style.color =
                    "white";


                botao.style.fontSize =
                    "22px";


                botao.style.fontWeight =
                    "bold";


                botao.style.fontFamily =
                    "Arial";


                botao.style.cursor =
                    "pointer";


                botao.style.zIndex =
                    "101";

            }
        );


        // =================================================
        // ADICIONAR MENU
        // =================================================

        this.arena.appendChild(
            this.menuAcoes
        );


        // =================================================
        // BOTÃO ATACAR
        // =================================================

        const atacar =
            this.menuAcoes.querySelector(
                "#acaoAtacar"
            );


        if (atacar) {

            atacar.onclick = () => {

                this.opcaoAtiva =
                    0;

                this.confirmarAcao();

            };

        }


        // =================================================
        // BOTÃO RITUAL
        // =================================================

        const ritual =
            this.menuAcoes.querySelector(
                "#acaoRitual"
            );


        if (ritual) {

            ritual.onclick = () => {

                this.opcaoAtiva =
                    1;

                this.confirmarAcao();

            };

        }

    },


    // =====================================================
    // MOSTRAR MENU
    // =====================================================

    mostrarMenuAcoes() {

        if (!this.menuAcoes)
            return;


        this.menuAcoes.style.display =
            "flex";


        this.menuAcoes.style.visibility =
            "visible";


        this.menuAcoes.style.opacity =
            "1";


        this.opcaoAtiva =
            0;


        this.atualizarSelecao();


        console.log(
            "MENU DE AÇÕES MOSTRADO"
        );

    },


    // =====================================================
    // ESCONDER MENU
    // =====================================================

    esconderMenuAcoes() {

        if (!this.menuAcoes)
            return;


        this.menuAcoes.style.display =
            "none";


        console.log(
            "MENU DE AÇÕES ESCONDIDO"
        );

    },


    // =====================================================
    // SELEÇÃO
    // =====================================================

    atualizarSelecao() {

        if (!this.menuAcoes)
            return;


        const botoes =
            this.menuAcoes.querySelectorAll(
                ".acaoBatalha"
            );


        botoes.forEach(
            (botao, indice) => {

                if (
                    indice ===
                    this.opcaoAtiva
                ) {

                    botao.style.border =
                        "3px solid #b000ff";


                    botao.style.color =
                        "#b000ff";


                    botao.style.transform =
                        "scale(1.08)";

                }

                else {

                    botao.style.border =
                        "3px solid white";


                    botao.style.color =
                        "white";


                    botao.style.transform =
                        "scale(1)";

                }

            }
        );

    },


    // =====================================================
    // CONFIRMAR AÇÃO
    // =====================================================

    confirmarAcao() {

        if (!Batalha.ativa)
            return;


        if (
            Batalha.turno !==
            "jogador"
        )
            return;


        console.log(
            "AÇÃO CONFIRMADA:",
            this.opcaoAtiva
        );


        // =================================================
        // ESCONDER MENU
        // =================================================

        this.esconderMenuAcoes();


        // =================================================
        // ATACAR
        // =================================================

        if (
            this.opcaoAtiva ===
            0
        ) {

            Batalha.escolherAcao(
                "atacar"
            );

        }


        // =================================================
        // RITUAL
        // =================================================

        else {

            Batalha.escolherAcao(
                "ritual"
            );

        }

    },


    // =====================================================
    // CRIAR CAIXA DE ESQUIVA
    // =====================================================

    criarCaixaEsquiva() {

        this.caixaEsquiva =
            document.createElement(
                "div"
            );


        this.caixaEsquiva.id =
            "caixaEsquiva";


        // =================================================
        // POSIÇÃO
        // =================================================

        this.caixaEsquiva.style.position =
            "fixed";


        this.caixaEsquiva.style.left =
            "50%";


        this.caixaEsquiva.style.top =
            "50%";


        this.caixaEsquiva.style.transform =
            "translate(-50%, -50%)";


        // =================================================
        // TAMANHO
        // =================================================

        this.caixaEsquiva.style.width =
            "500px";


        this.caixaEsquiva.style.height =
            "280px";


        // =================================================
        // VISUAL
        // =================================================

        this.caixaEsquiva.style.border =
            "4px solid white";


        this.caixaEsquiva.style.background =
            "#000";


        this.caixaEsquiva.style.boxSizing =
            "border-box";


        this.caixaEsquiva.style.zIndex =
            "40";


        this.caixaEsquiva.style.display =
            "none";


        this.caixaEsquiva.style.overflow =
            "hidden";


        // =================================================
        // ADICIONAR
        // =================================================

        this.arena.appendChild(
            this.caixaEsquiva
        );

    },


    // =====================================================
    // MOSTRAR CAIXA
    // =====================================================

    mostrarCaixaEsquiva() {

        if (!this.caixaEsquiva)
            return;


        this.caixaEsquiva.style.display =
            "block";


        this.esconderMenuAcoes();


        if (
            typeof Coracao !==
            "undefined"
        ) {

            Coracao.iniciar();

        }


        console.log(
            "CAIXA DE ESQUIVA MOSTRADA"
        );

    },


    // =====================================================
    // ESCONDER CAIXA
    // =====================================================

    esconderCaixaEsquiva() {

        if (!this.caixaEsquiva)
            return;


        this.caixaEsquiva.style.display =
            "none";


        if (
            typeof Coracao !==
            "undefined"
        ) {

            Coracao.parar();

        }


        console.log(
            "CAIXA DE ESQUIVA ESCONDIDA"
        );

    },


    // =====================================================
    // TECLADO
    // =====================================================

    iniciarTeclado() {

        if (
            this.teclasIniciadas
        )
            return;


        this.teclasIniciadas =
            true;


        document.addEventListener(
            "keydown",
            (e) => {

                if (
                    !Batalha.ativa
                )
                    return;


                if (
                    Batalha.turno !==
                    "jogador"
                )
                    return;


                // =========================================
                // ESQUERDA
                // =========================================

                if (
                    e.key ===
                    "ArrowLeft"
                ) {

                    e.preventDefault();


                    this.opcaoAtiva =
                        0;


                    this.atualizarSelecao();

                }


                // =========================================
                // DIREITA
                // =========================================

                else if (
                    e.key ===
                    "ArrowRight"
                ) {

                    e.preventDefault();


                    this.opcaoAtiva =
                        1;


                    this.atualizarSelecao();

                }


                // =========================================
                // ENTER
                // =========================================

                else if (
                    e.key ===
                    "Enter"
                ) {

                    e.preventDefault();


                    this.confirmarAcao();

                }


                // =========================================
                // Z
                // =========================================

                else if (
                    e.key.toLowerCase() ===
                    "z"
                ) {

                    e.preventDefault();


                    this.confirmarAcao();

                }

            }
        );

    },


    // =====================================================
    // ATUALIZAR
    // =====================================================

    atualizar() {

        if (!this.arena)
            return;


        // =================================================
        // JOGADOR
        // =================================================

        if (
            this.jogadorElemento
        ) {

            this.jogadorElemento.src =
                Batalha.jogador.sprite;


            this.jogadorElemento.style.left =
                Batalha.jogador.x + "px";


            this.jogadorElemento.style.top =
                Batalha.jogador.y + "px";

        }


        // =================================================
        // MÁSCARA
        // =================================================

        if (
            this.mascaraElemento
        ) {

            this.mascaraElemento.src =
                Mascara.sprite;


            this.mascaraElemento.style.left =
                Mascara.x + "px";


            this.mascaraElemento.style.top =
                Mascara.y + "px";

        }

    }

};