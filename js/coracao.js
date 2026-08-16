const Coracao = {

    // =====================================================
    // ESTADO
    // =====================================================

    ativo: false,

    elemento: null,

    tecladoIniciado: false,


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


        // =================================================
        // POSIÇÃO INICIAL
        // =================================================

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


        // =================================================
        // CRIAR
        // =================================================

        this.criar();


        // =================================================
        // TECLADO
        // =================================================

        this.iniciarTeclado();


        // =================================================
        // VISUAL
        // =================================================

        this.atualizarVisual();

    },


    // =====================================================
    // CRIAR CORAÇÃO
    // =====================================================

    criar() {

        // =================================================
        // REMOVER ANTIGO
        // =================================================

        const antigo =
            document.getElementById(
                "coracaoBatalha"
            );


        if (antigo) {

            antigo.remove();

        }


        // =================================================
        // CRIAR
        // =================================================

        this.elemento =
            document.createElement(
                "div"
            );


        this.elemento.id =
            "coracaoBatalha";


        // =================================================
        // VISUAL
        // =================================================

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


        // =================================================
        // IMPORTANTE
        // =================================================
        // O coração está dentro da caixa.
        // Portanto suas coordenadas são relativas à caixa.

        this.elemento.style.transform =
            "translate(-50%, -50%)";


        // =================================================
        // ADICIONAR NA CAIXA
        // =================================================

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
    // TECLADO
    // =====================================================

    iniciarTeclado() {

        if (
            this.tecladoIniciado
        )
            return;


        this.tecladoIniciado =
            true;


        // =================================================
        // PRESSIONAR
        // =================================================

        document.addEventListener(
            "keydown",
            (e) => {

                const tecla =
                    e.key.toLowerCase();


                this.teclas[tecla] =
                    true;


                // Evita a página
                // de rolar com as setas

                if (
                    tecla === "arrowup" ||
                    tecla === "arrowdown" ||
                    tecla === "arrowleft" ||
                    tecla === "arrowright"
                ) {

                    e.preventDefault();

                }

            }
        );


        // =================================================
        // SOLTAR
        // =================================================

        document.addEventListener(
            "keyup",
            (e) => {

                const tecla =
                    e.key.toLowerCase();


                this.teclas[tecla] =
                    false;

            }
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


        // =================================================
        // MOVIMENTO
        // =================================================

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
        // MOVIMENTO DIAGONAL
        // =================================================

        if (
            dx !== 0 &&
            dy !== 0
        ) {

            const normalizacao =
                1 /
                Math.sqrt(2);


            dx *=
                normalizacao;


            dy *=
                normalizacao;

        }


        // =================================================
        // APLICAR
        // =================================================

        this.x +=
            dx;


        this.y +=
            dy;


        // =================================================
        // LIMITES
        // =================================================

        this.limitar();


        // =================================================
        // VISUAL
        // =================================================

        this.atualizarVisual();

    },


    // =====================================================
    // LIMITAR CORAÇÃO
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


        // =================================================
        // LIMITE ESQUERDO
        // =================================================

        const limiteEsquerdo =
            metade;


        // =================================================
        // LIMITE DIREITO
        // =================================================

        const limiteDireito =
            largura -
            metade;


        // =================================================
        // LIMITE SUPERIOR
        // =================================================

        const limiteSuperior =
            metade;


        // =================================================
        // LIMITE INFERIOR
        // =================================================

        const limiteInferior =
            altura -
            metade;


        // =================================================
        // APLICAR
        // =================================================

        if (
            this.x <
            limiteEsquerdo
        ) {

            this.x =
                limiteEsquerdo;

        }


        if (
            this.x >
            limiteDireito
        ) {

            this.x =
                limiteDireito;

        }


        if (
            this.y <
            limiteSuperior
        ) {

            this.y =
                limiteSuperior;

        }


        if (
            this.y >
            limiteInferior
        ) {

            this.y =
                limiteInferior;

        }

    },


    // =====================================================
    // ATUALIZAR VISUAL
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


        // =================================================
        // VISIBILIDADE
        // =================================================

        if (
            this.ativo
        ) {

            this.elemento.style.display =
                "block";

        }

        else {

            this.elemento.style.display =
                "none";

        }

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


        if (
            this.elemento
        ) {

            this.elemento.remove();


            this.elemento =
                null;

        }

    },


    // =====================================================
    // RECEBER DANO
    // =====================================================

    receberDano(valor) {

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