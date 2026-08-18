const TecladoMobile = {

    input: null,

    iniciado: false,

    // Evita processar a mesma entrada duas vezes
    ultimoTexto: "",


    // =====================================================
    // INICIAR
    // =====================================================

    iniciar() {

        if (this.iniciado)
            return;

        this.iniciado = true;


        this.input =
            document.createElement(
                "input"
            );


        this.input.id =
            "tecladoMobile";


        this.input.type =
            "text";


        this.input.autocomplete =
            "off";


        this.input.autocorrect =
            "off";


        this.input.autocapitalize =
            "characters";


        this.input.spellcheck =
            false;


        /*
         * Invisível, mas focável.
         */

        this.input.style.position =
            "fixed";


        this.input.style.left =
            "-1000px";


        this.input.style.top =
            "0";


        this.input.style.width =
            "1px";


        this.input.style.height =
            "1px";


        this.input.style.opacity =
            "0";


        this.input.style.pointerEvents =
            "none";


        document.body.appendChild(
            this.input
        );


        // =================================================
        // INPUT
        // =================================================

        this.input.addEventListener(
            "input",
            e => {

                e.stopPropagation();


                const texto =
                    this.input.value;


                if (!texto)
                    return;


                /*
                 * Processa exatamente o
                 * conteúdo recebido.
                 */

                for (
                    const letra of texto
                ) {

                    if (
                        typeof Input !==
                        "undefined" &&
                        typeof Input.tecla ===
                        "function"
                    ) {

                        Input.tecla({
                            key: letra
                        });

                    }

                }


                this.input.value =
                    "";

            }
        );


        // =================================================
        // KEYDOWN DO INPUT
        // =================================================

        this.input.addEventListener(
            "keydown",
            e => {

                /*
                 * MUITO IMPORTANTE:
                 *
                 * O teclado oculto não pode
                 * deixar o keydown escapar
                 * para os listeners normais
                 * do jogo.
                 *
                 * Ele será processado pelo
                 * evento "input".
                 */

                e.stopPropagation();

            }
        );


        console.log(
            "TECLADO MOBILE PRONTO"
        );

    },


    // =====================================================
    // ABRIR
    // =====================================================

    abrir() {

        if (!this.input)
            return;


        this.input.value =
            "";


        this.input.focus();


        /*
         * Alguns navegadores mobile
         * respeitam melhor o focus
         * após um pequeno atraso.
         */

        setTimeout(
            () => {

                if (
                    this.input
                ) {

                    this.input.focus();

                }

            },
            50
        );

    },


    // =====================================================
    // FECHAR
    // =====================================================

    fechar() {

        if (
            this.input
        ) {

            this.input.blur();

        }

    }

};


window.addEventListener(
    "load",
    () => {

        TecladoMobile.iniciar();

    }
);