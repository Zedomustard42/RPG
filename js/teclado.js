const TecladoMobile = {

    input: null,

    iniciado: false,


    // =====================================================
    // ENVIAR TECLA
    // =====================================================

    enviarTecla(tecla) {

        // Nunca enviar tecla vazia
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


        // =================================================
        // EVENTO REAL
        // =================================================

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
                                : tecla.length === 1
                                    ? "Key" +
                                      tecla.toUpperCase()
                                    : tecla,

                    bubbles: true,

                    cancelable: true
                }
            );


        Input.tecla(evento);

    },


    // =====================================================
    // INICIAR
    // =====================================================

    iniciar() {

        if (this.iniciado)
            return;


        this.iniciado = true;


        // =================================================
        // CRIAR INPUT
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

        this.input.style.pointerEvents =
            "none";

        this.input.style.zIndex =
            "-1";


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


                // Ignora vazio
                if (
                    !valor ||
                    valor.length === 0
                ) {

                    return;

                }


                // Envia cada caractere
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


                // Limpa o input interno
                this.input.value = "";

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


                if (
                    !tecla ||
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

        if (!this.input) {

            this.iniciar();

        }


        if (!this.input)
            return;


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
// INICIALIZAÇÃO
// =========================================================

window.addEventListener(
    "load",
    () => {

        TecladoMobile.iniciar();

    }
);