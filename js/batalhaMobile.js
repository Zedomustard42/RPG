const BatalhaMobile = {

    iniciado: false,

    analogo: null,
    base: null,
    cursor: null,

    pressionado: false,

    direcaoAtual: null,

    intervaloMovimento: null,

    timeoutAceleracao: null,

    tempoAceleracao: 1500,

    intervaloRapidoMs: 55,

    modoMobilePC: false,


    // =====================================================
    // INICIAR
    // =====================================================

    iniciar() {

        if (this.iniciado)
            return;

        this.iniciado = true;

        this.criarInterface();

        this.configurarAnalogo();

        this.configurarEnter();

        this.configurarAreaTeclado();

        this.configurarModoMobilePC();

        console.log(
            "BATALHA MOBILE INICIADA"
        );

    },


    // =====================================================
    // INTERFACE
    // =====================================================

    criarInterface() {

        let mobile =
            document.getElementById("mobile");


        if (!mobile) {

            mobile =
                document.createElement("div");

            mobile.id = "mobile";

            document.body.appendChild(mobile);

        }


        mobile.innerHTML = `

            <div id="mobileArena">

                <div id="mobileAnalogo">

                    <div id="mobileAnalogoBase">

                        <div id="mobileAnalogoCursor"></div>

                    </div>

                </div>


                <button
                    id="mobileEnter"
                    type="button"
                >
                    ENTER
                </button>


                <div id="mobileTecladoArea">

                    TOQUE AQUI PARA DIGITAR

                </div>

            </div>

        `;


        this.analogo =
            document.getElementById(
                "mobileAnalogo"
            );


        this.base =
            document.getElementById(
                "mobileAnalogoBase"
            );


        this.cursor =
            document.getElementById(
                "mobileAnalogoCursor"
            );

    },


    // =====================================================
    // ANALÓGICO
    // =====================================================

    configurarAnalogo() {

        if (!this.base)
            return;


        this.base.addEventListener(
            "pointerdown",
            e => {

                e.preventDefault();
                e.stopPropagation();

                this.pressionado = true;

                try {

                    this.base.setPointerCapture(
                        e.pointerId
                    );

                } catch (erro) {}


                this.calcularDirecao(e);

            }
        );


        this.base.addEventListener(
            "pointermove",
            e => {

                if (!this.pressionado)
                    return;

                e.preventDefault();
                e.stopPropagation();

                this.calcularDirecao(e);

            }
        );


        const terminar = e => {

            e.preventDefault();
            e.stopPropagation();

            this.pressionado = false;

            this.direcaoAtual = null;

            this.pararMovimento();

            this.resetarCursor();


            if (
                typeof Coracao !== "undefined" &&
                Coracao.ativo &&
                typeof Coracao.pararDirecaoMobile ===
                "function"
            ) {

                Coracao.pararDirecaoMobile();

            }

        };


        this.base.addEventListener(
            "pointerup",
            terminar
        );


        this.base.addEventListener(
            "pointercancel",
            terminar
        );


        this.base.addEventListener(
            "lostpointercapture",
            terminar
        );

    },


    // =====================================================
    // CALCULAR DIREÇÃO
    // =====================================================

    calcularDirecao(evento) {

        if (!this.base)
            return;


        const rect =
            this.base.getBoundingClientRect();


        const centroX =
            rect.left +
            rect.width / 2;


        const centroY =
            rect.top +
            rect.height / 2;


        const dx =
            evento.clientX -
            centroX;


        const dy =
            evento.clientY -
            centroY;


        const distancia =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        const raio =
            rect.width / 2;


        const distanciaLimitada =
            Math.min(
                distancia,
                raio
            );


        let x = 0;

        let y = 0;


        if (distancia > 0) {

            x =
                dx / distancia;

            y =
                dy / distancia;

        }


        // =================================================
        // CURSOR
        // =================================================

        if (this.cursor) {

            this.cursor.style.transform =
                `translate(
                    ${x * distanciaLimitada}px,
                    ${y * distanciaLimitada}px
                )`;

        }


        // =================================================
        // ZONA MORTA
        // =================================================

        const limite =
            raio * 0.25;


        if (
            distancia <
            limite
        ) {

            this.direcaoAtual = null;

            this.pararMovimento();

            return;

        }


        const direcao = {

            x: x,

            y: y

        };


        this.atualizarDirecao(
            direcao
        );

    },


    // =====================================================
    // ATUALIZAR DIREÇÃO
    // =====================================================

    atualizarDirecao(direcao) {

        if (!direcao)
            return;


        if (
            this.direcaoAtual &&

            Math.abs(
                this.direcaoAtual.x -
                direcao.x
            ) < 0.05 &&

            Math.abs(
                this.direcaoAtual.y -
                direcao.y
            ) < 0.05
        ) {

            return;

        }


        this.direcaoAtual = {

            x: direcao.x,

            y: direcao.y

        };


        this.pararMovimento();


        this.executarDirecao(
            this.direcaoAtual
        );


        this.timeoutAceleracao =
            setTimeout(
                () => {

                    if (
                        !this.pressionado ||
                        !this.direcaoAtual
                    )
                        return;


                    this.iniciarMovimentoRapido();

                },
                this.tempoAceleracao
            );

    },


    // =====================================================
    // MOVIMENTO RÁPIDO
    // =====================================================

    iniciarMovimentoRapido() {

        if (
            this.intervaloMovimento
        )
            return;


        this.intervaloMovimento =
            setInterval(
                () => {

                    if (
                        !this.pressionado ||
                        !this.direcaoAtual
                    )
                        return;


                    this.executarDirecao(
                        this.direcaoAtual
                    );

                },
                this.intervaloRapidoMs
            );

    },


    // =====================================================
    // EXECUTAR DIREÇÃO
    // =====================================================

    executarDirecao(direcao) {

        if (!direcao)
            return;


        // =================================================
        // GAME OVER
        // =================================================

        if (
            typeof GameOver !== "undefined" &&
            GameOver.ativo &&
            typeof GameOver.receberTeclaMobile ===
            "function"
        ) {

            const principal =

                Math.abs(direcao.x) >
                Math.abs(direcao.y)

                    ?

                (
                    direcao.x > 0
                        ? "ArrowRight"
                        : "ArrowLeft"
                )

                    :

                (
                    direcao.y > 0
                        ? "ArrowDown"
                        : "ArrowUp"
                );


            GameOver.receberTeclaMobile(
                principal
            );

            return;

        }


        // =================================================
        // CORAÇÃO
        // =================================================

        if (
            typeof Batalha !== "undefined" &&
            Batalha.ativa &&
            Batalha.turno === "mascara" &&
            typeof Coracao !== "undefined" &&
            Coracao.ativo
        ) {

            if (
                typeof Coracao.definirDirecaoMobile ===
                "function"
            ) {

                Coracao.definirDirecaoMobile(
                    direcao
                );

            }

            return;

        }


        // =================================================
        // TECLAS
        // =================================================

        const teclas = [];


        if (
            direcao.x < -0.35
        ) {

            teclas.push(
                "ArrowLeft"
            );

        }


        if (
            direcao.x > 0.35
        ) {

            teclas.push(
                "ArrowRight"
            );

        }


        if (
            direcao.y < -0.35
        ) {

            teclas.push(
                "ArrowUp"
            );

        }


        if (
            direcao.y > 0.35
        ) {

            teclas.push(
                "ArrowDown"
            );

        }


        if (!teclas.length)
            return;


        // =================================================
        // ENVIAR TECLAS
        // =================================================

        teclas.forEach(
            tecla => {

                /*
                 * SEGURANÇA:
                 * nunca cria KeyboardEvent
                 * com key vazia.
                 */

                if (
                    typeof tecla !== "string" ||
                    tecla.length === 0
                ) {

                    return;

                }


                document.dispatchEvent(
                    new KeyboardEvent(
                        "keydown",
                        {
                            key: tecla,
                            code: tecla,
                            bubbles: true
                        }
                    )
                );

            }
        );

    },


    // =====================================================
    // PARAR MOVIMENTO
    // =====================================================

    pararMovimento() {

        if (
            this.timeoutAceleracao
        ) {

            clearTimeout(
                this.timeoutAceleracao
            );

            this.timeoutAceleracao =
                null;

        }


        if (
            this.intervaloMovimento
        ) {

            clearInterval(
                this.intervaloMovimento
            );

            this.intervaloMovimento =
                null;

        }

    },


    // =====================================================
    // RESETAR CURSOR
    // =====================================================

    resetarCursor() {

        if (!this.cursor)
            return;


        this.cursor.style.transform =
            "translate(0,0)";

    },


    // =====================================================
    // ENTER
    // =====================================================

    configurarEnter() {

        const botao =
            document.getElementById(
                "mobileEnter"
            );


        if (!botao)
            return;


        botao.addEventListener(
            "pointerdown",
            e => {

                e.preventDefault();

                e.stopPropagation();

                this.enviarEnter();

            }
        );

    },


    enviarEnter() {

        /*
         * Nunca usar key: "".
         */

        document.dispatchEvent(
            new KeyboardEvent(
                "keydown",
                {
                    key: "Enter",
                    code: "Enter",
                    bubbles: true,
                    cancelable: true
                }
            )
        );

    },


    // =====================================================
    // ÁREA DE TECLADO
    // =====================================================

    configurarAreaTeclado() {

        const area =
            document.getElementById(
                "mobileTecladoArea"
            );


        if (!area)
            return;


        area.addEventListener(
            "pointerdown",
            e => {

                e.preventDefault();

                e.stopPropagation();


                if (
                    typeof TecladoMobile !==
                    "undefined" &&
                    typeof TecladoMobile.abrir ===
                    "function"
                ) {

                    TecladoMobile.abrir();

                }

            }
        );

    },


    // =====================================================
    // MODO MOBILE PC
    // =====================================================

    configurarModoMobilePC() {

        document.addEventListener(
            "keydown",
            e => {

                if (
                    typeof e.key !== "string" ||
                    e.key.length === 0
                ) {

                    return;

                }


                const ctrlM =
                    e.ctrlKey &&
                    e.key.toLowerCase() === "m";


                const f8 =
                    e.key === "F8";


                if (
                    !ctrlM &&
                    !f8
                )
                    return;


                e.preventDefault();

                e.stopPropagation();


                this.alternarModoMobilePC();

            },
            true
        );


        console.log(
            "MODO MOBILE PC PRONTO — CTRL+M / F8"
        );

    },


    // =====================================================
    // ALTERNAR MOBILE PC
    // =====================================================

    alternarModoMobilePC() {

        this.modoMobilePC =
            !this.modoMobilePC;


        document.body.classList.toggle(
            "modoMobilePC",
            this.modoMobilePC
        );


        document.documentElement.classList.toggle(
            "modoMobilePC",
            this.modoMobilePC
        );


        const mobile =
            document.getElementById(
                "mobile"
            );


        if (mobile) {

            mobile.classList.toggle(
                "mobilePCAtivo",
                this.modoMobilePC
            );

        }


        console.log(

            this.modoMobilePC

                ? "📱 MOBILE PC ATIVADO"

                : "🖥️ MOBILE PC DESATIVADO"

        );

    }

};


// =========================================================
// INICIALIZAÇÃO
// =========================================================

window.addEventListener(
    "load",
    () => {

        BatalhaMobile.iniciar();

    }
);
