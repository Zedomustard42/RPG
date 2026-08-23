const TecladoMobile = {

    input: null,

    iniciado: false,


    // =====================================================
    // ENVIAR TECLA PARA O INPUT.JS
    // =====================================================

    enviarTecla(tecla) {

        if (
            typeof tecla !== "string" ||
            tecla.length === 0
        ) {
            return;
        }


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
         * NÃO criamos KeyboardEvent aqui.
         *
         * O Input precisa apenas de um objeto
         * com key + preventDefault + stopPropagation.
         */

        Input.tecla({

            key: tecla,

            preventDefault() {},

            stopPropagation() {}

        });

    },


    // =====================================================
    // INICIAR
    // =====================================================

    iniciar() {

        if (this.iniciado)
            return;


        this.iniciado = true;


        // =================================================
        // CRIAR INPUT INVISÍVEL
        // =================================================

        this.input =
            document.createElement("input");


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

        /*
         * IMPORTANTE:
         *
         * Não usamos pointer-events:none.
         *
         * Alguns navegadores mobile podem perder
         * o foco do input.
         */

        // O input fica visualmente invisível, mas continua recebendo foco
        // de navegadores móveis. Pointer-events:none fazia alguns celulares
        // perderem o teclado virtual depois da primeira entrada.
        this.input.style.pointerEvents =
            "auto";

        this.input.style.zIndex =
            "2147483000";


        document.body.appendChild(
            this.input
        );


        // =================================================
        // DIGITAÇÃO
        // =================================================

        this.input.addEventListener(
            "input",
            evento => {

                evento.stopPropagation();


                const valor =
                    this.input.value;


                /*
                 * Se estiver vazio, não faz nada.
                 */

                if (
                    typeof valor !== "string" ||
                    valor.length === 0
                ) {

                    return;

                }


                /*
                 * Envia cada caractere.
                 */

                for (
                    const letra of valor
                ) {

                    if (
                        typeof letra !== "string" ||
                        letra.length === 0
                    ) {

                        continue;

                    }


                    this.enviarTecla(
                        letra
                    );

                }


                /*
                 * LIMPA somente depois
                 * de processar tudo.
                 */

                this.input.value = "";

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


                /*
                 * PROTEÇÃO PRINCIPAL
                 *
                 * Isso impede o erro:
                 *
                 * The key "" is not recognized and ignored.
                 */

                if (
                    typeof tecla !== "string" ||
                    tecla.length === 0
                ) {

                    return;

                }


                // =========================================
                // ENTER
                // =========================================

                if (
                    tecla === "Enter"
                ) {

                    evento.preventDefault();

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

                    evento.preventDefault();

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

                    evento.preventDefault();

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

                if (
                    typeof Input !== "undefined" &&
                    typeof Input.soltar === "function"
                ) {
                    Input.soltar({ key: evento.key });
                }

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

        if (!this.input) {

            this.iniciar();

        }


        if (!this.input)
            return;

        // Garante que uma segunda entrada de texto nunca herde o estado
        // anterior do campo.
        this.input.blur();
        this.input.value = "";

        /*
         * Começa vazio.
         */

        this.input.value = "";


        /*
         * Foca o input.
         */

        this.input.focus();


        /*
         * Segundo foco para celulares.
         */

        setTimeout(
            () => {

                if (
                    this.input
                ) {

                    this.input.focus();

                }

            },
            100
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


        this.input.value = "";

    }

};


// =========================================================
// INICIALIZAÇÃO
// =========================================================

window.addEventListener(
    "load",
    () => {

        TecladoMobile.iniciar();

    }
);