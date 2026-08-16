const AtaqueMascara = {

    // =====================================================
    // ESTADO
    // =====================================================

    ativo: false,

    tipoAtual: null,

    finalizando: false,


    // =====================================================
    // RITUAL
    // =====================================================

    bolaAtiva: false,

    bolaX: 0,

    bolaY: 0,

    velX: 0,

    velY: 0,

    velocidadeProjetil: 4,

    danoRitual: 4,

    perseguindo: false,

    tempoPerseguicao: 1500,

    elementoBola: null,


    // =====================================================
    // ARMA
    // =====================================================

    arma: null,

    balas: [],

    quantidadeTiros: 3,

    intervaloTiro: 500,

    velocidadeBala: 7,

    danoBala: 4,

    atirando: false,


    timeoutFinal: null,

    tempoPerseguicaoTimeout: null,


    // =====================================================
    // RESETAR
    // =====================================================

    resetar() {

        this.ativo =
            false;

        this.tipoAtual =
            null;

        this.finalizando =
            false;


        this.bolaAtiva =
            false;

        this.perseguindo =
            false;


        this.atirando =
            false;


        if (
            this.timeoutFinal
        ) {

            clearTimeout(
                this.timeoutFinal
            );

        }


        if (
            this.tempoPerseguicaoTimeout
        ) {

            clearTimeout(
                this.tempoPerseguicaoTimeout
            );

        }


        this.timeoutFinal =
            null;

        this.tempoPerseguicaoTimeout =
            null;


        if (
            this.elementoBola
        ) {

            this.elementoBola.remove();

        }


        this.elementoBola =
            null;


        if (
            this.arma
        ) {

            this.arma.remove();

        }


        this.arma =
            null;


        for (
            const bala of [...this.balas]
        ) {

            this.removerBala(
                bala
            );

        }


        this.balas = [];

    },


    // =====================================================
    // ESCOLHER ATAQUE
    // =====================================================

    escolherAtaque() {

        if (
            !Batalha.ativa
        )
            return;


        if (
            Batalha.turno !==
            "mascara"
        )
            return;


        if (
            Batalha.estado !==
            "ESQUIVA"
        )
            return;


        if (
            this.ativo
        )
            return;


        this.finalizando =
            false;


        console.log(
            "MÁSCARA ESCOLHENDO ATAQUE"
        );


        if (
            Math.random() < 0.5
        ) {

            this.executarRitual();

        }

        else {

            this.executarArma();

        }

    },


    // =====================================================
    // RITUAL
    // =====================================================

    executarRitual() {

        if (
            this.ativo
        )
            return;


        if (
            !Batalha.ativa
        )
            return;


        if (
            Batalha.turno !==
            "mascara"
        )
            return;


        if (
            Batalha.estado !==
            "ESQUIVA"
        )
            return;


        this.ativo =
            true;


        this.tipoAtual =
            "RITUAL";


        this.finalizando =
            false;


        console.log(
            "MÁSCARA USOU RITUAL"
        );


        setTimeout(
            () => {

                if (
                    !Batalha.ativa ||
                    Batalha.turno !==
                    "mascara" ||
                    Batalha.estado !==
                    "ESQUIVA"
                ) {

                    this.finalizar();

                    return;

                }


                this.criarBola();

            },
            500
        );

    },


    // =====================================================
    // CRIAR BOLA
    // =====================================================

    criarBola() {

        const caixa =
            document.getElementById(
                "caixaEsquiva"
            );


        if (
            !caixa
        ) {

            this.finalizar();

            return;

        }


        this.bolaAtiva =
            true;


        this.elementoBola =
            document.createElement(
                "div"
            );


        this.elementoBola.id =
            "bolaRitual";


        this.elementoBola.textContent =
            "●";


        this.elementoBola.style.position =
            "absolute";


        this.elementoBola.style.width =
            "24px";


        this.elementoBola.style.height =
            "24px";


        this.elementoBola.style.fontSize =
            "24px";


        this.elementoBola.style.lineHeight =
            "24px";


        this.elementoBola.style.textAlign =
            "center";


        this.elementoBola.style.color =
            "white";


        this.elementoBola.style.zIndex =
            "80";


        this.elementoBola.style.pointerEvents =
            "none";


        caixa.appendChild(
            this.elementoBola
        );


        this.bolaX =
            caixa.clientWidth / 2 - 12;


        this.bolaY =
            20;


        this.calcularDirecao();


        this.perseguindo =
            true;


        this.tempoPerseguicaoTimeout =
            setTimeout(
                () => {

                    this.perseguindo =
                        false;

                },
                this.tempoPerseguicao
            );


        this.moverBola();

    },


    // =====================================================
    // DIREÇÃO
    // =====================================================

    calcularDirecao() {

        if (
            typeof Coracao ===
            "undefined"
        )
            return;


        const dx =
            Coracao.x -
            this.bolaX -
            12;


        const dy =
            Coracao.y -
            this.bolaY -
            12;


        const distancia =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        if (
            distancia <= 0
        )
            return;


        this.velX =
            (
                dx /
                distancia
            ) *
            this.velocidadeProjetil;


        this.velY =
            (
                dy /
                distancia
            ) *
            this.velocidadeProjetil;

    },


    // =====================================================
    // MOVER BOLA
    // =====================================================

    moverBola() {

        if (
            !this.bolaAtiva
        )
            return;


        if (
            !Batalha.ativa ||
            Batalha.turno !==
            "mascara" ||
            Batalha.estado !==
            "ESQUIVA"
        ) {

            this.finalizar();

            return;

        }


        if (
            this.perseguindo
        ) {

            this.calcularDirecao();

        }


        this.bolaX +=
            this.velX;


        this.bolaY +=
            this.velY;


        if (
            this.elementoBola
        ) {

            this.elementoBola.style.left =
                this.bolaX +
                "px";


            this.elementoBola.style.top =
                this.bolaY +
                "px";

        }


        this.verificarColisaoBola();


        if (
            !this.bolaAtiva
        )
            return;


        const caixa =
            document.getElementById(
                "caixaEsquiva"
            );


        if (
            caixa &&
            (
                this.bolaX < -50 ||
                this.bolaX >
                    caixa.clientWidth + 50 ||
                this.bolaY < -50 ||
                this.bolaY >
                    caixa.clientHeight + 50
            )
        ) {

            this.finalizar();

            return;

        }


        requestAnimationFrame(
            () =>
                this.moverBola()
        );

    },


    // =====================================================
    // COLISÃO BOLA
    // =====================================================

    verificarColisaoBola() {

        if (
            !this.bolaAtiva
        )
            return;


        if (
            typeof Coracao ===
            "undefined"
        )
            return;


        const dx =
            this.bolaX +
            12 -
            Coracao.x;


        const dy =
            this.bolaY +
            12 -
            Coracao.y;


        const distancia =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        if (
            distancia < 22
        ) {

            console.log(
                "CORAÇÃO ATINGIDO PELO RITUAL"
            );


            Coracao.receberDano(
                this.danoRitual
            );


            this.finalizar();

        }

    },


    // =====================================================
    // ARMA
    // =====================================================

    executarArma() {

        if (
            this.ativo
        )
            return;


        if (
            !Batalha.ativa
        )
            return;


        if (
            Batalha.turno !==
            "mascara"
        )
            return;


        if (
            Batalha.estado !==
            "ESQUIVA"
        )
            return;


        this.ativo =
            true;


        this.tipoAtual =
            "ARMA";


        this.atirando =
            true;


        this.finalizando =
            false;


        this.balas = [];


        console.log(
            "MÁSCARA USOU A ARMA"
        );


        const caixa =
            document.getElementById(
                "caixaEsquiva"
            );


        if (
            !caixa
        ) {

            this.finalizar();

            return;

        }


        this.arma =
            document.createElement(
                "div"
            );


        this.arma.id =
            "armaMascara";


        this.arma.textContent =
            "▰";


        this.arma.style.position =
            "absolute";


        this.arma.style.fontSize =
            "28px";


        this.arma.style.color =
            "white";


        this.arma.style.zIndex =
            "80";


        this.arma.style.pointerEvents =
            "none";


        caixa.appendChild(
            this.arma
        );


        this.atualizarArma();


        this.dispararBalaArma();


        setTimeout(
            () => {

                if (
                    this.atirando
                ) {

                    this.dispararBalaArma();

                }

            },
            this.intervaloTiro
        );


        setTimeout(
            () => {

                if (
                    this.atirando
                ) {

                    this.dispararBalaArma();

                }

            },
            this.intervaloTiro * 2
        );


        this.timeoutFinal =
            setTimeout(
                () => {

                    this.finalizarArma();

                },
                3500
            );

    },


    // =====================================================
    // ATUALIZAR ARMA
    // =====================================================

    atualizarArma() {

        if (
            !this.arma ||
            !this.atirando
        )
            return;


        const caixa =
            document.getElementById(
                "caixaEsquiva"
            );


        if (
            !caixa
        )
            return;


        const armaX =
            caixa.clientWidth - 45;


        const armaY =
            caixa.clientHeight / 2;


        this.arma.style.left =
            armaX +
            "px";


        this.arma.style.top =
            armaY +
            "px";


        if (
            typeof Coracao !==
            "undefined"
        ) {

            const dx =
                Coracao.x -
                armaX;


            const dy =
                Coracao.y -
                armaY;


            const angulo =
                Math.atan2(
                    dy,
                    dx
                ) *
                180 /
                Math.PI;


            this.arma.style.transform =
                `rotate(${angulo}deg)`;

        }


        requestAnimationFrame(
            () =>
                this.atualizarArma()
        );

    },


    // =====================================================
    // DISPARAR BALA
    // =====================================================

    dispararBalaArma() {

        if (
            !this.arma ||
            !this.atirando
        )
            return;


        const caixa =
            document.getElementById(
                "caixaEsquiva"
            );


        if (
            !caixa
        )
            return;


        const bala =
            document.createElement(
                "div"
            );


        bala.textContent =
            "●";


        bala.style.position =
            "absolute";


        bala.style.width =
            "14px";


        bala.style.height =
            "14px";


        bala.style.fontSize =
            "14px";


        bala.style.lineHeight =
            "14px";


        bala.style.color =
            "white";


        bala.style.zIndex =
            "90";


        bala.style.pointerEvents =
            "none";


        const x =
            caixa.clientWidth - 55;


        const y =
            caixa.clientHeight / 2;


        bala.style.left =
            x +
            "px";


        bala.style.top =
            y +
            "px";


        caixa.appendChild(
            bala
        );


        let alvoX =
            caixa.clientWidth / 2;


        let alvoY =
            caixa.clientHeight / 2;


        if (
            typeof Coracao !==
            "undefined"
        ) {

            alvoX =
                Coracao.x;


            alvoY =
                Coracao.y;

        }


        const dx =
            alvoX -
            x;


        const dy =
            alvoY -
            y;


        const distancia =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        if (
            distancia <= 0
        ) {

            bala.remove();

            return;

        }


        const dados = {

            elemento:
                bala,

            x:
                x,

            y:
                y,

            velX:
                (
                    dx /
                    distancia
                ) *
                this.velocidadeBala,

            velY:
                (
                    dy /
                    distancia
                ) *
                this.velocidadeBala

        };


        this.balas.push(
            dados
        );


        this.moverBala(
            dados
        );

    },


    // =====================================================
    // MOVER BALA
    // =====================================================

    moverBala(bala) {

        if (
            !bala ||
            !bala.elemento ||
            !this.atirando
        )
            return;


        if (
            !Batalha.ativa ||
            Batalha.turno !==
            "mascara" ||
            Batalha.estado !==
            "ESQUIVA"
        ) {

            this.removerBala(
                bala
            );

            return;

        }


        bala.x +=
            bala.velX;


        bala.y +=
            bala.velY;


        bala.elemento.style.left =
            bala.x +
            "px";


        bala.elemento.style.top =
            bala.y +
            "px";


        if (
            typeof Coracao !==
            "undefined"
        ) {

            const dx =
                bala.x +
                7 -
                Coracao.x;


            const dy =
                bala.y +
                7 -
                Coracao.y;


            const distancia =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (
                distancia < 20
            ) {

                console.log(
                    "CORAÇÃO ATINGIDO PELA BALA"
                );


                Coracao.receberDano(
                    this.danoBala
                );


                this.removerBala(
                    bala
                );


                return;

            }

        }


        const caixa =
            document.getElementById(
                "caixaEsquiva"
            );


        if (
            caixa &&
            (
                bala.x < -50 ||
                bala.x >
                    caixa.clientWidth + 50 ||
                bala.y < -50 ||
                bala.y >
                    caixa.clientHeight + 50
            )
        ) {

            this.removerBala(
                bala
            );

            return;

        }


        requestAnimationFrame(
            () =>
                this.moverBala(
                    bala
                )
        );

    },


    // =====================================================
    // REMOVER BALA
    // =====================================================

    removerBala(bala) {

        if (
            !bala
        )
            return;


        if (
            bala.elemento
        ) {

            bala.elemento.remove();

            bala.elemento =
                null;

        }


        const index =
            this.balas.indexOf(
                bala
            );


        if (
            index !== -1
        ) {

            this.balas.splice(
                index,
                1
            );

        }

    },


    // =====================================================
    // FINALIZAR ARMA
    // =====================================================

    finalizarArma() {

        if (
            this.finalizando
        )
            return;


        this.finalizando =
            true;


        this.atirando =
            false;


        if (
            this.timeoutFinal
        ) {

            clearTimeout(
                this.timeoutFinal
            );

        }


        this.timeoutFinal =
            null;


        if (
            this.arma
        ) {

            this.arma.remove();

        }


        this.arma =
            null;


        for (
            const bala of [...this.balas]
        ) {

            this.removerBala(
                bala
            );

        }


        this.balas = [];


        this.ativo =
            false;


        this.tipoAtual =
            null;


        this.finalizando =
            false;


        console.log(
            "ATAQUE DA ARMA TERMINOU"
        );


        this.finalizarTurno();

    },


    // =====================================================
    // FINALIZAR GERAL
    // =====================================================

    finalizar() {

        if (
            this.finalizando
        )
            return;


        this.finalizando =
            true;


        this.bolaAtiva =
            false;


        this.perseguindo =
            false;


        if (
            this.tempoPerseguicaoTimeout
        ) {

            clearTimeout(
                this.tempoPerseguicaoTimeout
            );

        }


        this.tempoPerseguicaoTimeout =
            null;


        if (
            this.elementoBola
        ) {

            this.elementoBola.remove();

        }


        this.elementoBola =
            null;


        if (
            this.arma
        ) {

            this.arma.remove();

        }


        this.arma =
            null;


        for (
            const bala of [...this.balas]
        ) {

            this.removerBala(
                bala
            );

        }


        this.balas = [];


        this.atirando =
            false;


        this.ativo =
            false;


        this.tipoAtual =
            null;


        if (
            this.timeoutFinal
        ) {

            clearTimeout(
                this.timeoutFinal
            );

        }


        this.timeoutFinal =
            null;


        this.finalizando =
            false;


        console.log(
            "ATAQUE DA MÁSCARA TERMINOU"
        );


        this.finalizarTurno();

    },


    // =====================================================
    // FINALIZAR TURNO
    // =====================================================

    finalizarTurno() {

        if (
            !Batalha.ativa
        )
            return;


        if (
            Batalha.turno !==
            "mascara"
        )
            return;


        if (
            Batalha.estado !==
            "ESQUIVA"
        )
            return;


        setTimeout(
            () => {

                if (
                    !Batalha.ativa
                )
                    return;


                if (
                    Batalha.turno !==
                    "mascara"
                )
                    return;


                if (
                    Batalha.estado !==
                    "ESQUIVA"
                )
                    return;


                console.log(
                    "MÁSCARA TERMINOU O ROUND"
                );


                Batalha.terminarTurnoMascara();

            },
            450
        );

    }

};