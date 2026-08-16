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


        this.ativo =
            true;


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

            this.x =
                200;

            this.y =
                120;

        }


        this.teclas =
            {};


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
    // TECLADO
    // =====================================================

    iniciarTeclado() {

        if (
            this.tecladoIniciado
        )
            return;


        this.tecladoIniciado =
            true;


        document.addEventListener(
            "keydown",
            (e) => {

                if (
                    !this.ativo
                )
                    return;


                const tecla =
                    e.key.toLowerCase();


                this.teclas[tecla] =
                    true;


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


        let dx = 0;

        let dy = 0;


        if (
            this.teclas["w"] ||
            this.teclas["arrowup"]
        ) {

            dy -=
                this.velocidade;

        }


        if (
            this.teclas["s"] ||
            this.teclas["arrowdown"]
        ) {

            dy +=
                this.velocidade;

        }


        if (
            this.teclas["a"] ||
            this.teclas["arrowleft"]
        ) {

            dx -=
                this.velocidade;

        }


        if (
            this.teclas["d"] ||
            this.teclas["arrowright"]
        ) {

            dx +=
                this.velocidade;

        }


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


        this.x +=
            dx;


        this.y +=
            dy;


        this.limitar();

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


        this.teclas =
            {};


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


        this.teclas =
            {};


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