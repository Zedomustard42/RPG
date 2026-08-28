const AtaqueMascaraDois = {

    // =====================================================
    // SEGUNDA FORMA
    // =====================================================

    vidaInicio: 1500,

    segundaFormaAtiva: false,
    segundaFormaNumero: 0,
    segundaFormaMaximo: 0,
    segundaFormaTimeout: null,
    segundaFormaOverlay: null,


    iniciar() {

        if (!Batalha.ativa)
            return;

        if (
            Batalha.mascara.hp <= 0 ||
            Batalha.mascara.hp > this.vidaInicio
        )
            return;

        if (this.segundaFormaAtiva)
            return;

        this.executarEstalosCaixa();

    },


    resetar() {

        this.segundaFormaAtiva = false;
        this.segundaFormaNumero = 0;
        this.segundaFormaMaximo = 0;

        if (this.segundaFormaTimeout) {

            clearTimeout(
                this.segundaFormaTimeout
            );

        }

        this.segundaFormaTimeout = null;

        if (this.segundaFormaOverlay) {

            this.segundaFormaOverlay.remove();

        }

        this.segundaFormaOverlay = null;

    },


    executarEstalosCaixa() {
        if (this.ativo || this.segundaFormaAtiva) return;

        const caixa = document.getElementById("caixaEsquiva");
        if (!caixa) return;

        this.ativo = true;
        this.segundaFormaAtiva = true;
        this.segundaFormaNumero = 0;
        this.segundaFormaMaximo = 1 + Math.floor(Math.random() * 3); // 1 a 3 estalos
        this.tipoAtual = "ESTALOS";

        const original = {
            left: caixa.style.left,
            top: caixa.style.top,
            transform: caixa.style.transform
        };

        const normais = [
            "RAIO",
            "RITUAL",
            "ARMA",
            "CORTES",
            "CORTES_DIAGONAIS"
        ];

        const ataques = {
            RAIO: () => AtaqueMascara.executarRaio(),
            RITUAL: () => AtaqueMascara.executarRitual(),
            ARMA: () => AtaqueMascara.executarArma(),
            CORTES: () => AtaqueMascara.executarCortes(),
            CORTES_DIAGONAIS: () => AtaqueMascara.executarCortesDiagonais()
        };

        const telaPreta = () => {
            let overlay = document.getElementById("mascaraTrocaOverlay");
            if (!overlay) {
                overlay = document.createElement("div");
                overlay.id = "mascaraTrocaOverlay";
                Object.assign(overlay.style, {
                    position: "fixed",
                    inset: "0",
                    background: "#000",
                    zIndex: "999999",
                    pointerEvents: "none",
                    opacity: "0"
                });
                document.body.appendChild(overlay);
            }
            overlay.style.opacity = "1";
            this.segundaFormaOverlay = overlay;
        };

        const voltarTela = () => {
            const overlay = this.segundaFormaOverlay;
            if (!overlay) return;
            overlay.style.opacity = "0";
            setTimeout(() => overlay.remove(), 180);
            this.segundaFormaOverlay = null;
        };

        const proximaTroca = () => {
            if (!Batalha.ativa) {
                this.segundaFormaAtiva = false;
                return;
            }

            if (this.segundaFormaNumero >= this.segundaFormaMaximo) {
                caixa.style.left = original.left;
                caixa.style.top = original.top;
                caixa.style.transform = original.transform;
                this.segundaFormaAtiva = false;
                this.ativo = false;
                voltarTela();
                AtaqueMascara.finalizarTurno();
                return;
            }

            this.segundaFormaNumero++;
            telaPreta();

            AtaqueMascara.tocarAudio(
                "assets/audio/audio_batalha/bruno/mudanca.mp3",
                0.85
            );

            caixa.style.transform =
                `translate(${(Math.random() - 0.5) * Math.min(220, innerWidth * 0.28)}px, ` +
                `${(Math.random() - 0.5) * Math.min(150, innerHeight * 0.20)}px)`;

            const escolhido =
                normais[Math.floor(Math.random() * normais.length)];

            setTimeout(() => {
                if (!this.segundaFormaAtiva) return;

                voltarTela();
                this.ativo = false;
                ataques[escolhido]?.();

                // O ataque fica efetivamente naquela posição por 3,5 segundos.
                this.segundaFormaTimeout = setTimeout(() => {
                    this.segundaFormaTimeout = null;
                    AtaqueMascara.removerAtaquesCortes();
                    proximaTroca();
                }, 3500);
            }, 450);
        };

        proximaTroca();
    },

};
