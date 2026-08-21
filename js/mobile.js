const Mobile = {

    iniciado: false,

    // =====================================================
    // INICIAR
    // =====================================================

    iniciar() {

        if (this.iniciado)
            return;

        this.iniciado = true;

        this.botao("btnUp", "ArrowUp");
        this.botao("btnDown", "ArrowDown");
        this.botao("btnLeft", "ArrowLeft");
        this.botao("btnRight", "ArrowRight");
        this.botao("btnOk", "Enter");

        this.configurarAtaque();

        console.log("MOBILE INICIADO");

    },


    // =====================================================
    // BOTÕES ANTIGOS / CONTROLE GERAL
    // =====================================================

    botao(id, tecla) {

        const botao =
            document.getElementById(id);

        if (!botao)
            return;


        let pressionado = false;


        const enviar = e => {

            if (pressionado)
                return;

            pressionado = true;

            e.preventDefault();
            e.stopPropagation();


            /*
             * Envia para o sistema principal
             */
            if (
                typeof Input !== "undefined" &&
                typeof Input.tecla === "function"
            ) {

                Input.tecla({
                    key: tecla
                });

            }


            /*
             * Movimento físico
             */
            if (
                typeof Movimento !== "undefined" &&
                Movimento.teclas
            ) {

                Movimento.teclas[tecla] = true;

            }

        };


        const soltar = e => {

            e.preventDefault();
            e.stopPropagation();

            pressionado = false;

            if (
                typeof Input !== "undefined" &&
                typeof Input.soltar === "function"
            ) {
                Input.soltar({ key: tecla });
            }

            if (
                typeof Movimento !== "undefined" &&
                Movimento.teclas
            ) {

                Movimento.teclas[tecla] = false;

            }

        };


        /*
         * Pointer events evitam:
         *
         * touchstart + mousedown
         * touchend + mouseup
         *
         * causando duplicação.
         */

        botao.addEventListener(
            "pointerdown",
            enviar
        );


        botao.addEventListener(
            "pointerup",
            soltar
        );


        botao.addEventListener(
            "pointercancel",
            soltar
        );


        botao.addEventListener(
            "pointerleave",
            soltar
        );

    },


    // =====================================================
    // ATAQUE
    // =====================================================

    configurarAtaque() {

        const ataque =
            document.getElementById(
                "btnAtaque"
            );

        if (!ataque)
            return;


        ataque.addEventListener(
            "pointerdown",
            e => {

                e.preventDefault();
                e.stopPropagation();


                if (
                    typeof Game !== "undefined" &&
                    !Game.emBatalha
                )
                    return;


                if (
                    typeof Batalha !== "undefined" &&
                    typeof Batalha.atacar === "function"
                ) {

                    Batalha.atacar();

                }

            }
        );

    }

};


// =====================================================
// INICIALIZAR
// =====================================================

window.addEventListener(
    "load",
    () => {

        Mobile.iniciar();

    }
);