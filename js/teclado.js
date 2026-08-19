const TecladoMobile = {

    input: null,

    iniciado: false,


    // =====================================================
    // ENVIAR TECLA PARA O INPUT.JS
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
         * O Input.js espera um evento que tenha:
         *
         * preventDefault()
         * stopPropagation()
         *
         * Por isso não podemos mandar apenas:
         *
         * { key: "Enter" }
         */

        Input.tecla({

            key: tecla,


            preventDefault() {

                // Simula preventDefault
                return;

            },


            stopPropagation() {

                // Simula stopPropagation
                return;

            }

        });

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
            "characters";


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
        // INPUT
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
                 * Envia cada caractere
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
                 *
                 * O texto verdadeiro fica
                 * armazenado em Input.texto.
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

                evento.stopPropagation();


                const tecla =
                    evento.key;


                // =========================================
                // BACKSPACE
                // =========================================

                if (
                    tecla ===
                    "Backspace"
                ) {

                    evento.preventDefault();


                    this.enviarTecla(
                        "Backspace"
                    );


                    return;

                }


                // =========================================
                // ENTER
                // =========================================

                if (
                    tecla ===
                    "Enter"
                ) {

                    evento.preventDefault();


                    this.enviarTecla(
                        "Enter"
                    );


                    return;

                }


                // =========================================
                // SETA PARA CIMA
                // =========================================

                if (
                    tecla ===
                    "ArrowUp"
                ) {

                    evento.preventDefault();


                    this.enviarTecla(
                        "ArrowUp"
                    );


                    return;

                }


                // =========================================
                // SETA PARA BAIXO
                // =========================================

                if (
                    tecla ===
                    "ArrowDown"
                ) {

                    evento.preventDefault();


                    this.enviarTecla(
                        "ArrowDown"
                    );


                    return;

                }


                // =========================================
                // SETA ESQUERDA
                // =========================================

                if (
                    tecla ===
                    "ArrowLeft"
                ) {

                    evento.preventDefault();


                    this.enviarTecla(
                        "ArrowLeft"
                    );


                    return;

                }


                // =========================================
                // SETA DIREITA
                // =========================================

                if (
                    tecla ===
                    "ArrowRight"
                ) {

                    evento.preventDefault();


                    this.enviarTecla(
                        "ArrowRight"
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

                evento.stopPropagation();

            }
        );


        console.log(
            "TECLADO MOBILE PRONTO"
        );

    },


    // =====================================================
    // ABRIR TECLADO
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
         * O input interno deve começar vazio.
         *
         * O texto verdadeiro está no Input.js.
         */

        this.input.value =
            "";


        // =================================================
        // FOCO
        // =================================================

        this.input.focus();


        /*
         * Alguns celulares precisam
         * de um segundo focus.
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