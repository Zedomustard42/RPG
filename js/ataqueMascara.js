const AtaqueMascara = {

    ativo: false,

    projetil: null,

    tempoRitual: 1500,

    velocidadeProjetil: 4,

    dano: 4,


    // =========================
    // BOLA
    // =========================

    tempoPerseguicao: 3000,

    perseguindo: false,

    bolaAtiva: false,

    bolaX: 0,

    bolaY: 0,

    velX: 0,

    velY: 0,


    // =========================
    // ARMA
    // =========================

    arma: null,

    balas: [],

    atirando: false,

    quantidadeTiros: 3,

    intervaloTiro: 500,

    velocidadeBala: 7,

    danoBala: 4,


    // =========================
    // INICIAR
    // =========================

    iniciar() {

        setInterval(() => {

            if (
                Batalha.ativa &&
                !this.ativo
            ) {

                if (Math.random() < 0.5) {

                    this.executar();

                }

                else {

                    this.executarArma();

                }

            }

        }, 10000);

    },


    // =========================================================
    // ATAQUE DO RITUAL
    // =========================================================

    executar() {

        if (this.ativo)
            return;


        this.ativo = true;


        console.log(
            "ATAQUE DO RITUAL INICIADO"
        );


        setTimeout(() => {

            if (this.ativo) {

                this.disparar();

            }

        }, this.tempoRitual);

    },


    // =========================
    // DISPARAR BOLA
    // =========================

    disparar() {

        this.bolaAtiva = true;


        this.bolaX =
            Mascara.x +
            CenarioMascara.mascara.largura / 2 -
            12;


        this.bolaY =
            Mascara.y +
            CenarioMascara.mascara.altura / 2 -
            12;


        this.calcularDirecao();


        this.perseguindo = true;


        setTimeout(() => {

            this.perseguindo = false;


            console.log(
                "A BOLA PAROU DE PERSEGUIR"
            );

        }, this.tempoPerseguicao);


        this.moverProjetil();

    },


    // =========================
    // CALCULAR DIREÇÃO
    // =========================

    calcularDirecao() {

        const jogadorX =
            Batalha.jogador.x +
            (
                CenarioMascara.jogador.largura / 2
            );


        const jogadorY =
            Batalha.jogador.y +
            (
                CenarioMascara.jogador.altura / 2
            );


        const dx =
            jogadorX -
            this.bolaX;


        const dy =
            jogadorY -
            this.bolaY;


        const distancia =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        if (distancia === 0)
            return;


        this.velX =
            (
                dx / distancia
            ) *
            this.velocidadeProjetil;


        this.velY =
            (
                dy / distancia
            ) *
            this.velocidadeProjetil;

    },


    // =========================
    // MOVER BOLA
    // =========================

    moverProjetil() {

        if (!this.bolaAtiva)
            return;


        if (this.perseguindo) {

            this.calcularDirecao();

        }


        this.bolaX +=
            this.velX;


        this.bolaY +=
            this.velY;


        this.verificarColisao();


        if (!this.bolaAtiva)
            return;


        if (

            this.bolaX < -100 ||

            this.bolaX >
            CenarioMascara.largura + 100 ||

            this.bolaY < -100 ||

            this.bolaY >
            CenarioMascara.altura + 100

        ) {

            this.finalizar();

            return;

        }


        requestAnimationFrame(
            () =>
                this.moverProjetil()
        );

    },


    // =========================
    // COLISÃO DA BOLA
    // =========================

    verificarColisao() {

        if (!this.bolaAtiva)
            return;


        const jogadorX =
            Batalha.jogador.x;


        const jogadorY =
            Batalha.jogador.y;


        const jogadorLargura =
            CenarioMascara.jogador.largura;


        const jogadorAltura =
            CenarioMascara.jogador.altura;


        const centroJogadorX =
            jogadorX +
            jogadorLargura / 2;


        const centroJogadorY =
            jogadorY +
            jogadorAltura / 2;


        const centroBolaX =
            this.bolaX +
            12;


        const centroBolaY =
            this.bolaY +
            12;


        const distancia =
            Math.sqrt(

                Math.pow(
                    centroBolaX -
                    centroJogadorX,
                    2
                )

                +

                Math.pow(
                    centroBolaY -
                    centroJogadorY,
                    2
                )

            );


        if (distancia < 35) {

            console.log(
                "JOGADOR ATINGIDO!"
            );


            Batalha.danoJogador(
                this.dano
            );


            this.finalizar();

        }

    },


    // =========================================================
    // ATAQUE DA ARMA
    // =========================================================

    executarArma() {

        if (this.ativo)
            return;


        this.ativo = true;

        this.atirando = true;

        this.balas = [];


        console.log(
            "MÁSCARA PUXOU A ARMA!"
        );


        // =========================
        // CRIAR ARMA
        // =========================

        this.arma =
            document.createElement("img");


        this.arma.src =
            "assets/imagens/armaMascara.png";


        this.arma.id =
            "armaMascara";


        this.arma.style.position =
            "absolute";


        this.arma.style.width =
            "70px";


        this.arma.style.height =
            "auto";


        this.arma.style.imageRendering =
            "pixelated";


        this.arma.style.pointerEvents =
            "none";


        this.arma.style.zIndex =
            "9";


        arena.appendChild(
            this.arma
        );


        // =========================
        // COMEÇA A MIRAR
        // =========================

        this.atualizarArma();


        // =========================
        // TIRO 1
        // =========================

        this.dispararBalaArma();


        // =========================
        // TIRO 2
        // =========================

        setTimeout(() => {

            if (this.atirando) {

                this.dispararBalaArma();

            }

        }, this.intervaloTiro);


        // =========================
        // TIRO 3
        // =========================

        setTimeout(() => {

            if (this.atirando) {

                this.dispararBalaArma();

            }

        }, this.intervaloTiro * 2);


        // =========================
        // FINALIZA
        // =========================

        setTimeout(() => {

            this.finalizarArma();

        }, 3000);

    },


    // =========================================================
    // POSIÇÃO DA ARMA
    // =========================================================

    atualizarArma() {

        if (
            !this.arma ||
            !this.atirando
        )
            return;


        // =========================
        // ARMA AO LADO DA MÁSCARA
        // =========================

        const armaX =
            Mascara.x +
            CenarioMascara.mascara.largura -
            10;


        const armaY =
            Mascara.y +
            (
                CenarioMascara.mascara.altura / 2
            );


        this.arma.style.left =
            armaX + "px";


        this.arma.style.top =
            armaY + "px";


        // =========================
        // CENTRO DO JOGADOR
        // =========================

        const jogadorX =
            Batalha.jogador.x +
            (
                CenarioMascara.jogador.largura / 2
            );


        const jogadorY =
            Batalha.jogador.y +
            (
                CenarioMascara.jogador.altura / 2
            );


        // =========================
        // CALCULAR ÂNGULO
        // =========================

        const dx =
            jogadorX -
            armaX;


        const dy =
            jogadorY -
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


        requestAnimationFrame(
            () =>
                this.atualizarArma()
        );

    },


    // =========================================================
    // DISPARAR BALA
    // =========================================================

    dispararBalaArma() {

        if (
            !this.arma ||
            !this.atirando
        )
            return;


        const bala =
            document.createElement("img");


        bala.src =
            "assets/imagens/balaMascara.png";


        bala.style.position =
            "absolute";


        bala.style.width =
            "18px";


        bala.style.height =
            "18px";


        bala.style.imageRendering =
            "pixelated";


        bala.style.pointerEvents =
            "none";


        bala.style.zIndex =
            "20";


        // =========================
        // POSIÇÃO INICIAL DA BALA
        // =========================

        const balaX =
            Mascara.x +
            CenarioMascara.mascara.largura -
            10;


        const balaY =
            Mascara.y +
            (
                CenarioMascara.mascara.altura / 2
            );


        bala.style.left =
            balaX + "px";


        bala.style.top =
            balaY + "px";


        arena.appendChild(
            bala
        );


        // =========================
        // ALVO
        // =========================

        const alvoX =
            Batalha.jogador.x +
            (
                CenarioMascara.jogador.largura / 2
            );


        const alvoY =
            Batalha.jogador.y +
            (
                CenarioMascara.jogador.altura / 2
            );


        const dx =
            alvoX -
            balaX;


        const dy =
            alvoY -
            balaY;


        const distancia =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        if (distancia === 0) {

            bala.remove();

            return;

        }


        const velocidadeX =
            (
                dx / distancia
            ) *
            this.velocidadeBala;


        const velocidadeY =
            (
                dy / distancia
            ) *
            this.velocidadeBala;


        const dadosBala = {

            elemento: bala,

            x: balaX,

            y: balaY,

            velX: velocidadeX,

            velY: velocidadeY

        };


        this.balas.push(
            dadosBala
        );


        this.moverBala(
            dadosBala
        );

    },


    // =========================================================
    // MOVER BALA
    // =========================================================

    moverBala(bala) {

        if (
            !bala ||
            !bala.elemento
        )
            return;


        bala.x +=
            bala.velX;


        bala.y +=
            bala.velY;


        bala.elemento.style.left =
            bala.x + "px";


        bala.elemento.style.top =
            bala.y + "px";


        // =========================
        // COLISÃO
        // =========================

        const jogadorX =
            Batalha.jogador.x +
            (
                CenarioMascara.jogador.largura / 2
            );


        const jogadorY =
            Batalha.jogador.y +
            (
                CenarioMascara.jogador.altura / 2
            );


        const centroBalaX =
            bala.x +
            9;


        const centroBalaY =
            bala.y +
            9;


        const distancia =
            Math.sqrt(

                Math.pow(
                    centroBalaX -
                    jogadorX,
                    2
                )

                +

                Math.pow(
                    centroBalaY -
                    jogadorY,
                    2
                )

            );


        if (distancia < 30) {

            console.log(
                "JOGADOR ATINGIDO PELA BALA!"
            );


            Batalha.danoJogador(
                this.danoBala
            );


            this.removerBala(
                bala
            );


            return;

        }


        // =========================
        // LIMITE DA ARENA
        // =========================

        if (

            bala.x < -100 ||

            bala.x >
            CenarioMascara.largura + 100 ||

            bala.y < -100 ||

            bala.y >
            CenarioMascara.altura + 100

        ) {

            this.removerBala(
                bala
            );

            return;

        }


        requestAnimationFrame(
            () =>
                this.moverBala(bala)
        );

    },


    // =========================================================
    // REMOVER BALA
    // =========================================================

    removerBala(bala) {

        if (!bala)
            return;


        if (bala.elemento) {

            bala.elemento.remove();

        }


        const index =
            this.balas.indexOf(
                bala
            );


        if (index !== -1) {

            this.balas.splice(
                index,
                1
            );

        }

    },


    // =========================================================
    // FINALIZAR ARMA
    // =========================================================

    finalizarArma() {

        this.atirando =
            false;


        if (this.arma) {

            this.arma.remove();

            this.arma =
                null;

        }


        for (
            let i = this.balas.length - 1;
            i >= 0;
            i--
        ) {

            this.removerBala(
                this.balas[i]
            );

        }


        this.balas = [];


        this.ativo =
            false;


        console.log(
            "ATAQUE DA ARMA FINALIZADO"
        );

    },


    // =========================================================
    // FINALIZAR RITUAL
    // =========================================================

    finalizar() {

        this.bolaAtiva =
            false;


        this.projetil =
            null;


        this.perseguindo =
            false;


        this.ativo =
            false;


        console.log(
            "ATAQUE DO RITUAL FINALIZADO"
        );

    }

};