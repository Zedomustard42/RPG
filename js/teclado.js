const TecladoMobile = {

    input: null,

    iniciado: false,


    // =====================================================
    // ENVIAR TECLA PARA INPUT.JS
    // =====================================================

    enviarTecla(tecla) {

        if (
            typeof Input === "undefined" ||
            typeof Input.tecla !== "function"
        ) {

            console.warn(
                "Input.tecla não está disponível."
            );

            return;
        }


        /*
         * Cria um KeyboardEvent REAL.
         *
         * O Input.js usa:
         *
         * evento.key
         * evento.preventDefault()
         * evento.stopPropagation()
         */

        const evento =
            new KeyboardEvent(
                "keydown",
                {
                    key: tecla,

                    code:
                        tecla === "Enter"
                            ? "Enter"
                            : tecla === "Backspace"
                                ? "Backspace"
                                : tecla,

                    bubbles: true,

                    cancelable: true
                }
            );


        Input.tecla(
            evento
        );

    },


    // =====================================================
    // INICIAR
    // =====================================================

    iniciar() {

        if (
            this.iniciado
        )
            return;


        this.iniciado =
            true;


        // =================================================
        // CRIAR INPUT INVISÍVEL
        // =================================================

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
            "none";


        this.input.spellcheck =
            false;


        // =================================================
        // ESTILO
        // =================================================

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

        this.input.style.zIndex =
            "-1";


        document.body.appendChild(
            this.input
        );


        // =================================================
        // INPUT — DIGITAÇÃO
        // =================================================

        this.input.addEventListener(
            "input",
            evento => {

                evento.stopPropagation();


                const valor =
                    this.input.value;


                if (
                    valor.length === 0
                ) {

                    return;

                }


                /*
                 * Cada caractere é enviado
                 * para o Input.js.
                 */

                for (
                    const letra of valor
                ) {

                    this.enviarTecla(
                        letra
                    );

                }


                /*
                 * Limpa o input interno.
                 */

                this.input.value =
                    "";

            }
        );


        // =================================================
        // KEYDOWN
        // =================================================

        this.input.addEventListener(
            "keydown",
            evento => {

                evento.preventDefault();

                evento.stopPropagation();


                const tecla =
                    evento.key;


                // =========================================
                // ENTER
                // =========================================

                if (
                    tecla === "Enter"
                ) {

                    this.enviarTecla(
                        "Enter"
                    );

                    return;

                }


                // =========================================
                // BACKSPACE
                // =========================================

                if (
                    tecla === "Backspace"
                ) {

                    this.enviarTecla(
                        "Backspace"
                    );

                    return;

                }


                // =========================================
                // SETAS
                // =========================================

                if (
                    tecla === "ArrowUp" ||
                    tecla === "ArrowDown" ||
                    tecla === "ArrowLeft" ||
                    tecla === "ArrowRight"
                ) {

                    this.enviarTecla(
                        tecla
                    );

                    return;

                }

            }
        );


        // =================================================
        // KEYUP
        // =================================================

        this.input.addEventListener(
            "keyup",
            evento => {

                evento.preventDefault();

                evento.stopPropagation();

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

        if (
            !this.input
        ) {

            this.iniciar();

        }


        if (
            !this.input
        )
            return;


        /*
         * O input físico começa vazio.
         *
         * O nome verdadeiro fica
         * armazenado em Input.texto.
         */

        this.input.value =
            "";


        this.input.focus();


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
            !this.input
        )
            return;


        this.input.blur();


        this.input.value =
            "";

    }

};


// =========================================================
// INICIALIZAR
// =========================================================

window.addEventListener(
    "load",
    () => {

        TecladoMobile.iniciar();

    }
);