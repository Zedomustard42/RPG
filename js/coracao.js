const Coracao = {

    // =====================================================
    // ESTADO
    // =====================================================

    ativo: false,

    elemento: null,

    tecladoIniciado: false,

    _keydownCoracao: null,

    _keyupCoracao: null,

    _blurCoracao: null,


    // =====================================================
    // TAMANHO
    // =====================================================

    tamanho: 18,

    velocidade: 4,


    // =====================================================
    // POSIÇÃO
    // =====================================================

    x: 0,

    y: 0,


    // =====================================================
    // TECLAS
    // =====================================================

    teclas: {},


    // =====================================================
    // INICIAR
    // =====================================================

    iniciar() {

        console.log(
            "CORAÇÃO INICIADO"
        );


        this.ativo = true;


        // Limpa qualquer direção anterior
        this.limparTeclas();


        const caixa =
            document.getElementById(
                "caixaEsquiva"
            );


        if (caixa) {

            this.x =
                caixa.clientWidth / 2;

            this.y =
                caixa.clientHeight / 2;

        }

        else {

            this.x = 200;

            this.y = 120;

        }


        this.criar();


        this.iniciarTeclado();


        this.atualizarVisual();

    },


    // =====================================================
    // CRIAR
    // =====================================================

    criar() {

        const antigo =
            document.getElementById(
                "coracaoBatalha"
            );


        if (antigo) {

            antigo.remove();

        }


        this.elemento =
            document.createElement(
                "div"
            );


        this.elemento.id =
            "coracaoBatalha";


        this.elemento.innerText =
            "♥";


        this.elemento.style.position =
            "absolute";


        this.elemento.style.width =
            this.tamanho + "px";


        this.elemento.style.height =
            this.tamanho + "px";


        this.elemento.style.fontSize =
            this.tamanho + "px";


        this.elemento.style.lineHeight =
            this.tamanho + "px";


        this.elemento.style.textAlign =
            "center";


        this.elemento.style.color =
            "#b000ff";


        this.elemento.style.fontFamily =
            "Arial";


        this.elemento.style.fontWeight =
            "bold";


        this.elemento.style.pointerEvents =
            "none";


        this.elemento.style.userSelect =
            "none";


        this.elemento.style.zIndex =
            "100";


        this.elemento.style.transform =
            "translate(-50%, -50%)";


        const caixa =
            document.getElementById(
                "caixaEsquiva"
            );


        if (!caixa) {

            console.error(
                "Caixa de esquiva não encontrada."
            );

            return;

        }


        caixa.appendChild(
            this.elemento
        );

    },


    // =====================================================
    // LIMPAR TECLAS
    // =====================================================

    limparTeclas() {

        this.teclas = {

            w: false,

            a: false,

            s: false,

            d: false,

            arrowup: false,

            arrowdown: false,

            arrowleft: false,

            arrowright: false

        };

    },


    // =====================================================
    // DEFINIR DIREÇÃO PELO MOBILE
    // =====================================================

    definirDirecaoMobile(direcao) {

        if (!this.ativo)
            return;


        this.limparTeclas();


        // =================================================
        // DIREÇÃO ANALÓGICA
        // =================================================

        if (
            typeof direcao === "object"
        ) {

            if (
                direcao.x <
                -0.25
            ) {

                this.teclas.arrowleft =
                    true;

            }


            if (
                direcao.x >
                0.25
            ) {

                this.teclas.arrowright =
                    true;

            }


            if (
                direcao.y <
                -0.25
            ) {

                this.teclas.arrowup =
                    true;

            }


            if (
                direcao.y >
                0.25
            ) {

                this.teclas.arrowdown =
                    true;

            }


            return;

        }


        // =================================================
        // COMPATIBILIDADE COM SETAS / WASD
        // =================================================

        const tecla =
            String(
                direcao
            ).toLowerCase();


        if (
            tecla === "arrowup" ||
            tecla === "w"
        ) {

            this.teclas.arrowup =
                true;

            this.teclas.w =
                true;

        }

        else if (
            tecla === "arrowdown" ||
            tecla === "s"
        ) {

            this.teclas.arrowdown =
                true;

            this.teclas.s =
                true;

        }

        else if (
            tecla === "arrowleft" ||
            tecla === "a"
        ) {

            this.teclas.arrowleft =
                true;

            this.teclas.a =
                true;

        }

        else if (
            tecla === "arrowright" ||
            tecla === "d"
        ) {

            this.teclas.arrowright =
                true;

            this.teclas.d =
                true;

        }

    },


    // =====================================================
    // PARAR DIREÇÃO MOBILE
    // =====================================================

    pararDirecaoMobile() {

        this.limparTeclas();

    },


    // =====================================================
    // TECLADO
    // =====================================================

    iniciarTeclado() {

        // Evita criar vários listeners
        if (
            this.tecladoIniciado
        ) {

            return;

        }


        this.tecladoIniciado =
            true;


        // =================================================
        // TECLA PRESSIONADA
        // =================================================

        this._keydownCoracao =
            (evento) => {

                if (
                    !this.ativo
                )
                    return;


                const tecla =
                    String(
                        evento.key
                    ).toLowerCase();


                // =============================
                // CIMA
                // =============================

                if (
                    tecla === "w" ||
                    tecla === "arrowup"
                ) {

                    this.teclas.w =
                        true;

                    this.teclas.arrowup =
                        true;

                }


                // =============================
                // BAIXO
                // =============================

                else if (
                    tecla === "s" ||
                    tecla === "arrowdown"
                ) {

                    this.teclas.s =
                        true;

                    this.teclas.arrowdown =
                        true;

                }


                // =============================
                // ESQUERDA
                // =============================

                else if (
                    tecla === "a" ||
                    tecla === "arrowleft"
                ) {

                    this.teclas.a =
                        true;

                    this.teclas.arrowleft =
                        true;

                }


                // =============================
                // DIREITA
                // =============================

                else if (
                    tecla === "d" ||
                    tecla === "arrowright"
                ) {

                    this.teclas.d =
                        true;

                    this.teclas.arrowright =
                        true;

                }

            };


        // =================================================
        // TECLA SOLTA
        // =================================================

        this._keyupCoracao =
            (evento) => {

                const tecla =
                    String(
                        evento.key
                    ).toLowerCase();


                // =============================
                // CIMA
                // =============================

                if (
                    tecla === "w" ||
                    tecla === "arrowup"
                ) {

                    this.teclas.w =
                        false;

                    this.teclas.arrowup =
                        false;

                }


                // =============================
                // BAIXO
                // =============================

                else if (
                    tecla === "s" ||
                    tecla === "arrowdown"
                ) {

                    this.teclas.s =
                        false;

                    this.teclas.arrowdown =
                        false;

                }


                // =============================
                // ESQUERDA
                // =============================

                else if (
                    tecla === "a" ||
                    tecla === "arrowleft"
                ) {

                    this.teclas.a =
                        false;

                    this.teclas.arrowleft =
                        false;

                }


                // =============================
                // DIREITA
                // =============================

                else if (
                    tecla === "d" ||
                    tecla === "arrowright"
                ) {

                    this.teclas.d =
                        false;

                    this.teclas.arrowright =
                        false;

                }

            };


        // =================================================
        // PERDEU FOCO
        // =================================================

        this._blurCoracao =
            () => {

                this.limparTeclas();

            };


        // =================================================
        // REGISTRAR EVENTOS
        // =================================================

        window.addEventListener(
            "keydown",
            this._keydownCoracao
        );


        window.addEventListener(
            "keyup",
            this._keyupCoracao
        );


        window.addEventListener(
            "blur",
            this._blurCoracao
        );

    },


    // =====================================================
    // ATUALIZAR
    // =====================================================

    atualizar() {

        if (
            !this.ativo
        )
            return;


        if (
            !this.elemento
        )
            return;


        let dx = 0;

        let dy = 0;


        // =================================================
        // CIMA
        // =================================================

        if (
            this.teclas["w"] ||
            this.teclas["arrowup"]
        ) {

            dy -=
                this.velocidade;

        }


        // =================================================
        // BAIXO
        // =================================================

        if (
            this.teclas["s"] ||
            this.teclas["arrowdown"]
        ) {

            dy +=
                this.velocidade;

        }


        // =================================================
        // ESQUERDA
        // =================================================

        if (
            this.teclas["a"] ||
            this.teclas["arrowleft"]
        ) {

            dx -=
                this.velocidade;

        }


        // =================================================
        // DIREITA
        // =================================================

        if (
            this.teclas["d"] ||
            this.teclas["arrowright"]
        ) {

            dx +=
                this.velocidade;

        }


        // =================================================
        // DIAGONAL
        // =================================================

        if (
            dx !== 0 &&
            dy !== 0
        ) {

            const normalizacao =
                1 / Math.sqrt(2);


            dx *=
                normalizacao;


            dy *=
                normalizacao;

        }


        // =================================================
        // APLICAR MOVIMENTO
        // =================================================

        this.x +=
            dx;


        this.y +=
            dy;


        // =================================================
        // LIMITAR DENTRO DA CAIXA
        // =================================================

        this.limitar();


        // =================================================
        // ATUALIZAR VISUAL
        // =================================================

        this.atualizarVisual();

    },


    // =====================================================
    // LIMITAR
    // =====================================================

    limitar() {

        const caixa =
            document.getElementById(
                "caixaEsquiva"
            );


        if (!caixa)
            return;


        const largura =
            caixa.clientWidth;


        const altura =
            caixa.clientHeight;


        const metade =
            this.tamanho / 2;


        const limiteEsquerdo =
            metade;


        const limiteDireito =
            largura -
            metade;


        const limiteSuperior =
            metade;


        const limiteInferior =
            altura -
            metade;


        // =================================================
        // ESQUERDA
        // =================================================

        if (
            this.x <
            limiteEsquerdo
        ) {

            this.x =
                limiteEsquerdo;

        }


        // =================================================
        // DIREITA
        // =================================================

        if (
            this.x >
            limiteDireito
        ) {

            this.x =
                limiteDireito;

        }


        // =================================================
        // CIMA
        // =================================================

        if (
            this.y <
            limiteSuperior
        ) {

            this.y =
                limiteSuperior;

        }


        // =================================================
        // BAIXO
        // =================================================

        if (
            this.y >
            limiteInferior
        ) {

            this.y =
                limiteInferior;

        }

    },


    // =====================================================
    // VISUAL
    // =====================================================

    atualizarVisual() {

        if (
            !this.elemento
        )
            return;


        this.elemento.style.left =
            this.x + "px";


        this.elemento.style.top =
            this.y + "px";


        this.elemento.style.display =
            this.ativo
                ? "block"
                : "none";

    },


    // =====================================================
    // PARAR
    // =====================================================

    parar() {

        console.log(
            "CORAÇÃO PARADO"
        );


        this.ativo =
            false;


        this.limparTeclas();


        if (
            this.elemento
        ) {

            this.elemento.style.display =
                "none";

        }

    },


    // =====================================================
    // REMOVER
    // =====================================================

    remover() {

        this.ativo =
            false;


        this.limparTeclas();


        // =================================================
        // REMOVER EVENTOS DO TECLADO
        // =================================================

        if (
            this._keydownCoracao
        ) {

            window.removeEventListener(
                "keydown",
                this._keydownCoracao
            );

        }


        if (
            this._keyupCoracao
        ) {

            window.removeEventListener(
                "keyup",
                this._keyupCoracao
            );

        }


        if (
            this._blurCoracao
        ) {

            window.removeEventListener(
                "blur",
                this._blurCoracao
            );

        }


        this._keydownCoracao =
            null;


        this._keyupCoracao =
            null;


        this._blurCoracao =
            null;


        this.tecladoIniciado =
            false;


        // =================================================
        // REMOVER ELEMENTO
        // =================================================

        if (
            this.elemento
        ) {

            this.elemento.remove();


            this.elemento =
                null;

        }

    },


    // =====================================================
    // DANO
    // =====================================================

    receberDano(
        valor
    ) {

        if (
            !this.ativo
        )
            return;


        console.log(
            "CORAÇÃO RECEBEU DANO:",
            valor
        );


        if (
            typeof Batalha !==
            "undefined"
        ) {

            Batalha.danoJogador(
                valor
            );

        }

    },


    // =====================================================
    // COLISÃO
    // =====================================================

    colidirCom(
        x,
        y,
        largura,
        altura
    ) {

        if (
            !this.ativo
        )
            return false;


        const metade =
            this.tamanho / 2;


        const esquerda =
            this.x -
            metade;


        const direita =
            this.x +
            metade;


        const cima =
            this.y -
            metade;


        const baixo =
            this.y +
            metade;


        return (

            direita >
            x &&

            esquerda <
                x + largura &&

            baixo >
            y &&

            cima <
                y + altura

        );

    }

};