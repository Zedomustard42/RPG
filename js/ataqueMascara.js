const AtaqueMascara = {

    // =====================================================
    // ESTADO
    // =====================================================

    ativo: false,
    tipoAtual: null,
    finalizando: false,


    // =====================================================
    // RAIO
    // =====================================================

    raioAtivo: false,

    etapaRaio: 0,

    quantidadePartesRaio: 4,

    ordemRaios: [],

    parteRaioAtual: null,

    indicadorRaio: null,

    elementoRaio: null,

    raioAvisoTempo: 700,

    raioDuracao: 800,

    danoRaio: 100,

    intervaloRaios: 250,

    raioGif:
        "assets/imagens/raio.gif",

    somRaio:
        "assets/audio/raio.mp3",

    raioTimeout: null,

    raioProximoTimeout: null,


    // =====================================================
    // RITUAL
    // =====================================================

    bolaAtiva: false,

    bolaX: 0,
    bolaY: 0,

    velX: 0,
    velY: 0,

    velocidadeProjetil: 4,

    danoRitual: 80,

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

    danoBala: 75,

    atirando: false,


    // =====================================================
    // CORTES DIAGONAIS
    // =====================================================

    cortesAtivos: [],

    cortesAtacando: false,

    quantidadeCortes: 7,

    velocidadeCortes: 13,

    danoCortes: 60,

    cortesCriados: 0,

    tempoEntreCortes: 180,

    cortesTimeout: null,

    finalizandoCortes: false,


    // =====================================================
    // ATAQUE CORTES / X / *
    // =====================================================

    cortesAtivo: false,

    etapaCortes: 0,

    sequenciaCortes: [

        "/",
        "X",
        "*"

    ],

    tempoAvisoCortes: 500,

    velocidadeAtaqueCortes: 18,

    danoAtaqueCortes: 60,

    indicadoresCortes: [],

    ataquesCortes: [],

    cortesEtapaTimeout: null,

    cortesAtaqueTimeout: null,

    posicaoCorteAtual: null,


    // =====================================================
    // TIMEOUTS
    // =====================================================

    timeoutFinal: null,

    tempoPerseguicaoTimeout: null,


    // =====================================================
    // RESETAR
    // =====================================================

    resetar() {

        this.ativo = false;

        this.tipoAtual = null;

        this.finalizando = false;


        // =================================================
        // RAIO
        // =================================================

        this.raioAtivo = false;

        this.etapaRaio = 0;

        this.ordemRaios = [];

        this.parteRaioAtual = null;


        if (this.raioTimeout) {

            clearTimeout(
                this.raioTimeout
            );

        }

        this.raioTimeout = null;


        if (this.raioProximoTimeout) {

            clearTimeout(
                this.raioProximoTimeout
            );

        }

        this.raioProximoTimeout = null;


        if (this.indicadorRaio) {

            this.indicadorRaio.remove();

        }

        this.indicadorRaio = null;


        if (this.elementoRaio) {

            this.elementoRaio.remove();

        }

        this.elementoRaio = null;


        // =================================================
        // RITUAL
        // =================================================

        this.bolaAtiva = false;

        this.perseguindo = false;


        if (this.tempoPerseguicaoTimeout) {

            clearTimeout(
                this.tempoPerseguicaoTimeout
            );

        }

        this.tempoPerseguicaoTimeout = null;


        if (this.elementoBola) {

            this.elementoBola.remove();

        }

        this.elementoBola = null;


        // =================================================
        // ARMA
        // =================================================

        this.atirando = false;


        if (this.arma) {

            this.arma.remove();

        }

        this.arma = null;


        for (
            const bala of [...this.balas]
        ) {

            this.removerBala(
                bala
            );

        }

        this.balas = [];


        // =================================================
        // CORTES DIAGONAIS
        // =================================================

        this.cortesAtacando = false;

        this.finalizandoCortes = false;

        this.cortesCriados = 0;


        if (this.cortesTimeout) {

            clearTimeout(
                this.cortesTimeout
            );

        }

        this.cortesTimeout = null;


        for (
            const corte of
            [...this.cortesAtivos]
        ) {

            if (corte.elemento) {

                corte.elemento.remove();

            }

        }

        this.cortesAtivos = [];


        // =================================================
        // CORTES / X / *
        // =================================================

        this.cortesAtivo = false;

        this.etapaCortes = 0;

        this.posicaoCorteAtual = null;


        if (this.cortesEtapaTimeout) {

            clearTimeout(
                this.cortesEtapaTimeout
            );

        }

        this.cortesEtapaTimeout = null;


        if (this.cortesAtaqueTimeout) {

            clearTimeout(
                this.cortesAtaqueTimeout
            );

        }

        this.cortesAtaqueTimeout = null;


        for (
            const indicador of
            [...this.indicadoresCortes]
        ) {

            if (indicador) {

                indicador.remove();

            }

        }

        this.indicadoresCortes = [];


        for (
            const ataque of
            [...this.ataquesCortes]
        ) {

            if (
                ataque &&
                ataque.elemento
            ) {

                ataque.elemento.remove();

            }

        }

        this.ataquesCortes = [];


        // =================================================
        // TIMEOUT FINAL
        // =================================================

        if (this.timeoutFinal) {

            clearTimeout(
                this.timeoutFinal
            );

        }

        this.timeoutFinal = null;

    },


    // =====================================================
    // ESCOLHER ATAQUE
    // =====================================================

    escolherAtaque() {

        if (!Batalha.ativa)
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


        if (this.ativo)
            return;


        console.log(
            "MÁSCARA ESCOLHENDO ATAQUE"
        );


        // =================================================
        // LISTA DE ATAQUES
        // =================================================

        const ataques = [

            "RAIO",

            "RITUAL",

            "ARMA",

            "CORTES",

            "CORTES_DIAGONAIS"

        ];


        // =================================================
        // ESCOLHA ALEATÓRIA
        // =================================================

        const ataqueEscolhido =
            ataques[
                Math.floor(
                    Math.random() *
                    ataques.length
                )
            ];


        console.log(
            "⚔️ ATAQUE ESCOLHIDO:",
            ataqueEscolhido
        );


        // =================================================
        // EXECUTAR ATAQUE
        // =================================================

        switch (
            ataqueEscolhido
        ) {

            case "RAIO":

                this.executarRaio();

                break;


            case "RITUAL":

                this.executarRitual();

                break;


            case "ARMA":

                this.executarArma();

                break;


            case "CORTES":

                this.executarCortes();

                break;


            case "CORTES_DIAGONAIS":

                this.executarCortesDiagonais();

                break;

        }

    },


    // =====================================================
    // ATAQUE DE RAIO
    // =====================================================

    executarRaio() {

        if (this.ativo)
            return;

        if (!Batalha.ativa)
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


        const caixa =
            document.getElementById(
                "caixaEsquiva"
            );


        if (!caixa) {

            console.error(
                "caixaEsquiva não encontrada"
            );

            return;

        }


        this.ativo = true;

        this.tipoAtual = "RAIO";

        this.finalizando = false;

        this.raioAtivo = true;

        this.etapaRaio = 0;


        this.ordemRaios = [

            0,
            1,
            2,
            3

        ];


        this.ordemRaios.sort(
            () =>
                Math.random() - 0.5
        );


        console.log(
            "⚡ ORDEM DOS RAIOS:",
            this.ordemRaios
        );


        this.executarProximoRaio();

    },


    // =====================================================
    // PRÓXIMO RAIO
    // =====================================================

    executarProximoRaio() {

        if (!this.raioAtivo)
            return;


        if (
            !Batalha.ativa ||
            Batalha.turno !== "mascara" ||
            Batalha.estado !== "ESQUIVA"
        ) {

            this.finalizarRaio();

            return;

        }


        if (
            this.etapaRaio >=
            this.ordemRaios.length
        ) {

            this.finalizarRaio();

            return;

        }


        const parte =
            this.ordemRaios[
                this.etapaRaio
            ];


        this.parteRaioAtual =
            parte;


        console.log(
            "⚡ RAIO NA PARTE:",
            parte + 1
        );


        this.criarAvisoRaio(
            parte
        );


        this.raioTimeout =
            setTimeout(
                () => {

                    this.raioTimeout =
                        null;


                    if (
                        !this.raioAtivo
                    )
                        return;


                    this.removerAvisoRaio();


                    this.criarRaio(
                        parte
                    );

                },
                this.raioAvisoTempo
            );

    },


    // =====================================================
    // AVISO DO RAIO
    // =====================================================

    criarAvisoRaio(parte) {

        const caixa =
            document.getElementById(
                "caixaEsquiva"
            );


        if (!caixa)
            return;


        this.removerAvisoRaio();


        const larguraParte =
            caixa.clientWidth /
            this.quantidadePartesRaio;


        const centroX =
            (
                larguraParte *
                parte
            ) +
            (
                larguraParte /
                2
            );


        const aviso =
            document.createElement(
                "div"
            );


        aviso.textContent = "!";


        aviso.style.position =
            "absolute";


        aviso.style.left =
            (
                centroX -
                35
            ) + "px";


        aviso.style.top =
            (
                caixa.clientHeight /
                2 -
                55
            ) + "px";


        aviso.style.width = "70px";

        aviso.style.height = "90px";

        aviso.style.fontSize = "90px";

        aviso.style.lineHeight = "90px";

        aviso.style.textAlign = "center";

        aviso.style.fontWeight = "900";

        aviso.style.fontFamily =
            "Arial, sans-serif";

        aviso.style.color = "red";


        aviso.style.textShadow =
            "0 0 5px black," +
            "0 0 12px red," +
            "0 0 25px red";


        aviso.style.zIndex = "300";

        aviso.style.pointerEvents =
            "none";


        aviso.animate(
            [

                {
                    transform:
                        "scale(0.6)",

                    opacity:
                        "0"
                },

                {
                    transform:
                        "scale(1.25)",

                    opacity:
                        "1"
                },

                {
                    transform:
                        "scale(1)",

                    opacity:
                        "1"
                }

            ],
            {

                duration:
                    this.raioAvisoTempo,

                easing:
                    "ease-out"

            }
        );


        caixa.appendChild(
            aviso
        );


        this.indicadorRaio =
            aviso;

    },


    // =====================================================
    // REMOVER AVISO RAIO
    // =====================================================

    removerAvisoRaio() {

        if (this.indicadorRaio) {

            this.indicadorRaio.remove();

        }


        this.indicadorRaio = null;

    },


    // =====================================================
    // CRIAR RAIO
    // =====================================================

    criarRaio(parte) {

        const caixa =
            document.getElementById(
                "caixaEsquiva"
            );


        if (!caixa) {

            this.finalizarRaio();

            return;

        }


        const larguraParte =
            caixa.clientWidth /
            this.quantidadePartesRaio;


        const x =
            larguraParte *
            parte;


        const raio =
            document.createElement(
                "img"
            );


        raio.src =
            this.raioGif;


        raio.style.position =
            "absolute";


        raio.style.left =
            x + "px";


        raio.style.top =
            "0px";


        raio.style.width =
            larguraParte + "px";


        raio.style.height =
            caixa.clientHeight + "px";


        raio.style.objectFit =
            "fill";


        raio.style.zIndex =
            "280";


        raio.style.pointerEvents =
            "none";


        raio.style.userSelect =
            "none";


        raio.style.opacity = "0";


        raio.style.transform =
            "scale(0.8)";


        raio.style.transition =
            "opacity .08s ease," +
            "transform .08s ease";


        caixa.appendChild(
            raio
        );


        requestAnimationFrame(
            () => {

                raio.style.opacity =
                    "1";

                raio.style.transform =
                    "scale(1)";

            }
        );


        this.elementoRaio =
            raio;


        this.tocarSomRaio();


        this.verificarDanoRaio(
            parte
        );


        this.raioTimeout =
            setTimeout(
                () => {

                    this.removerRaio();


                    this.etapaRaio++;


                    this.raioProximoTimeout =
                        setTimeout(
                            () => {

                                this.raioProximoTimeout =
                                    null;

                                this.executarProximoRaio();

                            },
                            this.intervaloRaios
                        );

                },
                this.raioDuracao
            );

    },


    // =====================================================
    // SOM RAIO
    // =====================================================

    tocarSomRaio() {

        try {

            const som =
                new Audio(
                    this.somRaio
                );


            som.volume = 1;

            som.currentTime = 0;


            som.play().catch(
                erro => {

                    console.warn(
                        "Não foi possível tocar o som do raio:",
                        erro
                    );

                }
            );

        }
        catch (erro) {

            console.error(
                "Erro ao tocar som do raio:",
                erro
            );

        }

    },


    // =====================================================
    // DANO RAIO
    // =====================================================

    verificarDanoRaio(parte) {

        if (
            typeof Coracao ===
            "undefined"
        )
            return;


        const caixa =
            document.getElementById(
                "caixaEsquiva"
            );


        if (!caixa)
            return;


        const larguraParte =
            caixa.clientWidth /
            this.quantidadePartesRaio;


        const inicioX =
            larguraParte *
            parte;


        const fimX =
            inicioX +
            larguraParte;


        if (
            Coracao.x >= inicioX &&
            Coracao.x <= fimX
        ) {

            console.log(
                "⚡ CORAÇÃO ATINGIDO PELO RAIO!"
            );


            Coracao.receberDano(
                this.danoRaio
            );

        }

    },


    // =====================================================
    // REMOVER RAIO
    // =====================================================

    removerRaio() {

        if (this.elementoRaio) {

            this.elementoRaio.remove();

        }


        this.elementoRaio = null;

    },


    // =====================================================
    // FINALIZAR RAIO
    // =====================================================

    finalizarRaio() {

        if (this.finalizando)
            return;


        this.finalizando = true;


        this.raioAtivo = false;


        this.removerAvisoRaio();

        this.removerRaio();


        if (this.raioTimeout) {

            clearTimeout(
                this.raioTimeout
            );

        }

        this.raioTimeout = null;


        if (this.raioProximoTimeout) {

            clearTimeout(
                this.raioProximoTimeout
            );

        }

        this.raioProximoTimeout = null;


        this.etapaRaio = 0;

        this.ordemRaios = [];

        this.parteRaioAtual = null;


        this.ativo = false;

        this.tipoAtual = null;

        this.finalizando = false;


        console.log(
            "⚡ ATAQUE DE RAIOS TERMINOU"
        );


        this.finalizarTurno();

    },


    // =====================================================
    // RITUAL
    // =====================================================

    executarRitual() {

        if (this.ativo)
            return;

        if (!Batalha.ativa)
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


        this.ativo = true;

        this.tipoAtual = "RITUAL";

        this.finalizando = false;


        console.log(
            "MÁSCARA USOU RITUAL"
        );


        setTimeout(
            () => {

                if (
                    !Batalha.ativa ||
                    Batalha.turno !== "mascara" ||
                    Batalha.estado !== "ESQUIVA"
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


        if (!caixa) {

            this.finalizar();

            return;

        }


        this.bolaAtiva = true;


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
            caixa.clientWidth /
            2 -
            12;


        this.bolaY = 20;


        this.calcularDirecao();


        this.perseguindo = true;


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
    // DIREÇÃO DA BOLA
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


        if (distancia <= 0)
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

        if (!this.bolaAtiva)
            return;


        if (
            !Batalha.ativa ||
            Batalha.turno !== "mascara" ||
            Batalha.estado !== "ESQUIVA"
        ) {

            this.finalizar();

            return;

        }


        if (this.perseguindo) {

            this.calcularDirecao();

        }


        this.bolaX +=
            this.velX;


        this.bolaY +=
            this.velY;


        if (this.elementoBola) {

            this.elementoBola.style.left =
                this.bolaX + "px";


            this.elementoBola.style.top =
                this.bolaY + "px";

        }


        this.verificarColisaoBola();


        if (!this.bolaAtiva)
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

        if (!this.bolaAtiva)
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


        if (distancia < 22) {

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

        if (this.ativo)
            return;

        if (!Batalha.ativa)
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


        this.ativo = true;

        this.tipoAtual = "ARMA";

        this.atirando = true;

        this.finalizando = false;

        this.balas = [];


        const caixa =
            document.getElementById(
                "caixaEsquiva"
            );


        if (!caixa) {

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

                if (this.atirando) {

                    this.dispararBalaArma();

                }

            },
            this.intervaloTiro
        );


        setTimeout(
            () => {

                if (this.atirando) {

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


        if (!caixa)
            return;


        const armaX =
            caixa.clientWidth - 45;


        const armaY =
            caixa.clientHeight / 2;


        this.arma.style.left =
            armaX + "px";


        this.arma.style.top =
            armaY + "px";


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


        if (!caixa)
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
            caixa.clientWidth -
            55;


        const y =
            caixa.clientHeight / 2;


        bala.style.left =
            x + "px";


        bala.style.top =
            y + "px";


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
            alvoX - x;


        const dy =
            alvoY - y;


        const distancia =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        if (distancia <= 0) {

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
            Batalha.turno !== "mascara" ||
            Batalha.estado !== "ESQUIVA"
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
            bala.x + "px";


        bala.elemento.style.top =
            bala.y + "px";


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


            if (distancia < 20) {

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

        if (!bala)
            return;


        if (bala.elemento) {

            bala.elemento.remove();

            bala.elemento = null;

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


    // =====================================================
    // FINALIZAR ARMA
    // =====================================================

    finalizarArma() {

        if (this.finalizando)
            return;


        this.finalizando = true;

        this.atirando = false;


        if (this.timeoutFinal) {

            clearTimeout(
                this.timeoutFinal
            );

        }

        this.timeoutFinal = null;


        if (this.arma) {

            this.arma.remove();

        }

        this.arma = null;


        for (
            const bala of [...this.balas]
        ) {

            this.removerBala(
                bala
            );

        }


        this.balas = [];


        this.ativo = false;

        this.tipoAtual = null;

        this.finalizando = false;


        console.log(
            "ATAQUE DA ARMA TERMINOU"
        );


        this.finalizarTurno();

    },


    // =====================================================
    // CORTES / X / *
    // =====================================================

    executarCortes() {

        if (this.ativo)
            return;


        if (!Batalha.ativa)
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


        const caixa =
            document.getElementById(
                "caixaEsquiva"
            );


        if (!caixa) {

            console.error(
                "caixaEsquiva não encontrada"
            );

            return;

        }


        this.ativo = true;

        this.tipoAtual = "CORTES";

        this.cortesAtivo = true;

        this.etapaCortes = 0;

        this.finalizando = false;


        console.log(
            "⚔️ CORTES: / → X → *"
        );


        this.iniciarEtapaCortes();

    },


    // =====================================================
    // INICIAR ETAPA CORTES
    // =====================================================

    iniciarEtapaCortes() {

        if (!this.cortesAtivo)
            return;


        if (
            this.etapaCortes >=
            this.sequenciaCortes.length
        ) {

            this.finalizarCortesAtaque();

            return;

        }


        const tipo =
            this.sequenciaCortes[
                this.etapaCortes
            ];


        console.log(
            "⚔️ PREPARANDO:",
            tipo
        );


        this.criarIndicadoresCortes(
            tipo
        );


        this.cortesEtapaTimeout =
            setTimeout(
                () => {

                    this.cortesEtapaTimeout =
                        null;


                    if (
                        !this.cortesAtivo
                    )
                        return;


                    this.executarEtapaCortes(
                        tipo
                    );

                },
                this.tempoAvisoCortes
            );

    },


    // =====================================================
    // INDICADORES CORTES
    // =====================================================

    criarIndicadoresCortes(tipo) {

        const caixa =
            document.getElementById(
                "caixaEsquiva"
            );


        if (!caixa)
            return;


        this.removerIndicadoresCortes();


        let centroX =
            caixa.clientWidth / 2;


        let centroY =
            caixa.clientHeight / 2;


        if (
            typeof Coracao !==
            "undefined"
        ) {

            centroX =
                Coracao.x;

            centroY =
                Coracao.y;

        }


        this.posicaoCorteAtual = {

            x:
                centroX,

            y:
                centroY

        };


        if (tipo === "/") {

            this.criarIndicadorLinha(
                caixa,
                centroX,
                centroY,
                -45,
                720
            );

        }


        else if (tipo === "X") {

            this.criarIndicadorLinha(
                caixa,
                centroX,
                centroY,
                45,
                900
            );


            this.criarIndicadorLinha(
                caixa,
                centroX,
                centroY,
                -45,
                900
            );

        }


        else if (tipo === "*") {

            const direcoes = [

                0,
                45,
                90,
                135,
                180,
                225,
                270,
                315

            ];


            for (
                const angulo of
                direcoes
            ) {

                this.criarIndicadorLinha(
                    caixa,
                    centroX,
                    centroY,
                    angulo,
                    1000
                );

            }

        }

    },


    // =====================================================
    // CRIAR INDICADOR
    // =====================================================

    criarIndicadorLinha(
        caixa,
        centroX,
        centroY,
        angulo,
        tamanho
    ) {

        const linha =
            document.createElement(
                "div"
            );


        linha.className =
            "indicadorCorte";


        linha.style.position =
            "absolute";


        linha.style.width =
            tamanho + "px";


        linha.style.height =
            "5px";


        linha.style.background =
            "linear-gradient(" +
            "90deg," +
            "transparent," +
            "rgba(255,0,0,.35)," +
            "rgba(255,0,0,.8)," +
            "rgba(255,0,0,.35)," +
            "transparent" +
            ")";


        linha.style.boxShadow =
            "0 0 5px rgba(255,0,0,.5)," +
            "0 0 12px rgba(255,0,0,.35)";


        linha.style.borderRadius =
            "10px";


        linha.style.pointerEvents =
            "none";


        linha.style.zIndex =
            "180";


        linha.style.left =
            (
                centroX -
                tamanho / 2
            ) + "px";


        linha.style.top =
            (
                centroY -
                2.5
            ) + "px";


        linha.style.transform =
            `rotate(${angulo}deg)`;


        linha.style.transformOrigin =
            "center center";


        linha.style.opacity =
            "0.75";


        caixa.appendChild(
            linha
        );


        this.indicadoresCortes.push(
            linha
        );

    },


    // =====================================================
    // REMOVER INDICADORES
    // =====================================================

    removerIndicadoresCortes() {

        for (
            const indicador of
            [...this.indicadoresCortes]
        ) {

            if (indicador) {

                indicador.remove();

            }

        }


        this.indicadoresCortes = [];

    },


    // =====================================================
    // EXECUTAR ETAPA CORTES
    // =====================================================

    executarEtapaCortes(tipo) {

        if (!this.cortesAtivo)
            return;


        const posicao =
            this.posicaoCorteAtual;


        this.removerIndicadoresCortes();


        if (!posicao) {

            this.finalizarCortesAtaque();

            return;

        }


        if (tipo === "/") {

            this.criarAtaqueLinha(
                posicao.x,
                posicao.y,
                -45,
                330
            );

        }


        else if (tipo === "X") {

            this.criarAtaqueLinha(
                posicao.x,
                posicao.y,
                45,
                380
            );


            this.criarAtaqueLinha(
                posicao.x,
                posicao.y,
                -45,
                380
            );

        }


        else if (tipo === "*") {

            const direcoes = [

                0,
                45,
                90,
                135,
                180,
                225,
                270,
                315

            ];


            for (
                const angulo of
                direcoes
            ) {

                this.criarAtaqueLinha(
                    posicao.x,
                    posicao.y,
                    angulo,
                    400
                );

            }

        }


        this.cortesAtaqueTimeout =
            setTimeout(
                () => {

                    this.cortesAtaqueTimeout =
                        null;


                    this.removerAtaquesCortes();


                    this.etapaCortes++;


                    this.iniciarEtapaCortes();

                },
                750
            );

    },


    // =====================================================
    // CRIAR ATAQUE LINHA
    // =====================================================

    criarAtaqueLinha(
        centroX,
        centroY,
        angulo,
        tamanho
    ) {

        const caixa =
            document.getElementById(
                "caixaEsquiva"
            );


        if (!caixa)
            return;


        const ataque =
            document.createElement(
                "div"
            );


        ataque.className =
            "ataqueCorteVermelho";


        ataque.style.position =
            "absolute";


        ataque.style.width =
            tamanho + "px";


        ataque.style.height =
            "12px";


        ataque.style.background =
            "linear-gradient(" +
            "90deg," +
            "transparent 0%," +
            "red 15%," +
            "red 40%," +
            "white 50%," +
            "red 60%," +
            "red 85%," +
            "transparent 100%" +
            ")";


        ataque.style.boxShadow =
            "0 0 6px red," +
            "0 0 14px red," +
            "0 0 28px rgba(255,0,0,.9)";


        ataque.style.borderRadius =
            "10px";


        ataque.style.zIndex =
            "250";


        ataque.style.pointerEvents =
            "none";


        let x =
            centroX -
            tamanho / 2;


        let y =
            centroY -
            6;


        ataque.style.left =
            x + "px";


        ataque.style.top =
            y + "px";


        ataque.style.transform =
            `rotate(${angulo}deg)`;


        ataque.style.transformOrigin =
            "center center";


        caixa.appendChild(
            ataque
        );


        const dados = {

            elemento:
                ataque,

            x:
                x,

            y:
                y,

            centroX:
                centroX,

            centroY:
                centroY,

            angulo:
                angulo,

            tamanho:
                tamanho,

            atingiu:
                false

        };


        this.ataquesCortes.push(
            dados
        );


        ataque.style.opacity =
            "0";


        ataque.style.transform =
            `rotate(${angulo}deg) scaleX(0.15)`;


        let escala = 0.15;


        const aparecer = () => {

            if (
                !this.cortesAtivo ||
                !ataque.parentElement
            )
                return;


            escala += 0.2;


            if (escala >= 1) {

                escala = 1;


                ataque.style.opacity =
                    "1";


                ataque.style.transform =
                    `rotate(${angulo}deg) scaleX(1)`;


                this.moverAtaqueLinha(
                    dados
                );


                return;

            }


            ataque.style.opacity =
                String(
                    escala
                );


            ataque.style.transform =
                `rotate(${angulo}deg) scaleX(${escala})`;


            requestAnimationFrame(
                aparecer
            );

        };


        requestAnimationFrame(
            aparecer
        );

    },


    // =====================================================
    // MOVER ATAQUE LINHA
    // =====================================================

    moverAtaqueLinha(ataque) {

        if (
            !this.cortesAtivo ||
            !ataque ||
            !ataque.elemento
        )
            return;


        const rad =
            ataque.angulo *
            Math.PI /
            180;


        const velocidade =
            this.velocidadeAtaqueCortes;


        ataque.centroX +=
            Math.cos(rad) *
            velocidade;


        ataque.centroY +=
            Math.sin(rad) *
            velocidade;


        ataque.x =
            ataque.centroX -
            ataque.tamanho / 2;


        ataque.y =
            ataque.centroY -
            6;


        ataque.elemento.style.left =
            ataque.x + "px";


        ataque.elemento.style.top =
            ataque.y + "px";


        if (
            typeof Coracao !==
            "undefined" &&
            !ataque.atingiu
        ) {

            const dx =
                ataque.centroX -
                Coracao.x;


            const dy =
                ataque.centroY -
                Coracao.y;


            const distancia =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (
                distancia < 35
            ) {

                ataque.atingiu =
                    true;


                Coracao.receberDano(
                    this.danoAtaqueCortes
                );

            }

        }


        const caixa =
            document.getElementById(
                "caixaEsquiva"
            );


        if (
            caixa &&
            (
                ataque.centroX < -450 ||
                ataque.centroX >
                    caixa.clientWidth + 450 ||
                ataque.centroY < -450 ||
                ataque.centroY >
                    caixa.clientHeight + 450
            )
        ) {

            return;

        }


        requestAnimationFrame(
            () =>
                this.moverAtaqueLinha(
                    ataque
                )
        );

    },


    // =====================================================
    // REMOVER ATAQUES
    // =====================================================

    removerAtaquesCortes() {

        for (
            const ataque of
            [...this.ataquesCortes]
        ) {

            if (
                ataque &&
                ataque.elemento
            ) {

                ataque.elemento.remove();

            }

        }


        this.ataquesCortes = [];

    },


    // =====================================================
    // FINALIZAR CORTES
    // =====================================================

    finalizarCortesAtaque() {

        if (this.finalizando)
            return;


        this.finalizando = true;


        this.cortesAtivo = false;


        this.removerIndicadoresCortes();


        if (this.cortesEtapaTimeout) {

            clearTimeout(
                this.cortesEtapaTimeout
            );

        }

        this.cortesEtapaTimeout = null;


        if (this.cortesAtaqueTimeout) {

            clearTimeout(
                this.cortesAtaqueTimeout
            );

        }

        this.cortesAtaqueTimeout = null;


        this.removerAtaquesCortes();


        this.etapaCortes = 0;


        this.ativo = false;

        this.tipoAtual = null;

        this.finalizando = false;


        console.log(
            "⚔️ ATAQUE CORTES TERMINOU"
        );


        this.finalizarTurno();

    },


    // =====================================================
    // CORTES DIAGONAIS
    // =====================================================

    executarCortesDiagonais() {

        if (this.ativo)
            return;


        if (!Batalha.ativa)
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


        const caixa =
            document.getElementById(
                "caixaEsquiva"
            );


        if (!caixa) {

            console.error(
                "caixaEsquiva não encontrada"
            );

            return;

        }


        this.ativo = true;

        this.tipoAtual =
            "CORTES_DIAGONAIS";

        this.cortesAtacando = true;

        this.finalizando = false;

        this.finalizandoCortes = false;

        this.cortesAtivos = [];

        this.cortesCriados = 0;


        console.log(
            "⚔️ MÁSCARA: CORTES DIAGONAIS"
        );


        this.cortesTimeout =
            setTimeout(
                () => {

                    this.cortesTimeout =
                        null;


                    if (
                        !this.cortesAtacando
                    )
                        return;


                    this.criarSequenciaCortes();

                },
                500
            );

    },


    // =====================================================
    // SEQUÊNCIA DE CORTES DIAGONAIS
    // =====================================================

    criarSequenciaCortes() {

        const quantidade =
            this.quantidadeCortes;


        for (
            let i = 0;
            i < quantidade;
            i++
        ) {

            setTimeout(
                () => {

                    if (
                        !this.cortesAtacando
                    )
                        return;


                    this.criarCorteDiagonal();


                    this.cortesCriados++;


                    if (
                        this.cortesCriados ===
                        quantidade
                    ) {

                        setTimeout(
                            () => {

                                if (
                                    this.cortesAtacando
                                ) {

                                    this.finalizarCortes();

                                }

                            },
                            2200
                        );

                    }

                },
                i *
                this.tempoEntreCortes
            );

        }

    },


    // =====================================================
    // CRIAR CORTE DIAGONAL
    // =====================================================

    criarCorteDiagonal() {

        const caixa =
            document.getElementById(
                "caixaEsquiva"
            );


        if (!caixa)
            return;


        const largura =
            caixa.clientWidth;


        const altura =
            caixa.clientHeight;


        const corte =
            document.createElement(
                "div"
            );


        corte.className =
            "corteDiagonalMascara";


        corte.style.position =
            "absolute";


        corte.style.width =
            "330px";


        corte.style.height =
            "7px";


        corte.style.background =
            "linear-gradient(" +
            "90deg," +
            "transparent 0%," +
            "red 15%," +
            "white 45%," +
            "white 55%," +
            "red 85%," +
            "transparent 100%" +
            ")";


        corte.style.boxShadow =
            "0 0 5px red," +
            "0 0 12px red," +
            "0 0 25px rgba(255,0,0,.8)";


        corte.style.borderRadius =
            "10px";


        corte.style.zIndex =
            "200";


        corte.style.pointerEvents =
            "none";


        let x =
            largura + 350;


        let y =
            20 +
            Math.random() *
            (altura - 40);


        const angulo =
            -45 +
            Math.random() * 90;


        corte.style.left =
            x + "px";


        corte.style.top =
            y + "px";


        corte.style.transform =
            `rotate(${angulo}deg)`;


        caixa.appendChild(
            corte
        );


        const dados = {

            elemento:
                corte,

            x:
                x,

            y:
                y,

            angulo:
                angulo,

            largura:
                330,

            altura:
                7,

            atingiu:
                false

        };


        this.cortesAtivos.push(
            dados
        );


        this.moverCorteDiagonal(
            dados
        );

    },


    // =====================================================
    // MOVER CORTE DIAGONAL
    // =====================================================

    moverCorteDiagonal(corte) {

        if (
            !corte ||
            !corte.elemento ||
            !this.cortesAtacando
        )
            return;


        if (
            !Batalha.ativa ||
            Batalha.turno !== "mascara" ||
            Batalha.estado !== "ESQUIVA"
        ) {

            this.removerCorte(
                corte
            );

            return;

        }


        corte.x -=
            this.velocidadeCortes;


        corte.elemento.style.left =
            corte.x + "px";


        if (
            typeof Coracao !==
            "undefined"
        ) {

            const centroX =
                corte.x +
                corte.largura / 2;


            const centroY =
                corte.y;


            const dx =
                centroX -
                Coracao.x;


            const dy =
                centroY -
                Coracao.y;


            const distancia =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (
                distancia < 45 &&
                !corte.atingiu
            ) {

                corte.atingiu =
                    true;


                Coracao.receberDano(
                    this.danoCortes
                );

            }

        }


        const caixa =
            document.getElementById(
                "caixaEsquiva"
            );


        if (
            caixa &&
            corte.x <
            -450
        ) {

            this.removerCorte(
                corte
            );

            return;

        }


        requestAnimationFrame(
            () =>
                this.moverCorteDiagonal(
                    corte
                )
        );

    },


    // =====================================================
    // REMOVER CORTE DIAGONAL
    // =====================================================

    removerCorte(corte) {

        if (!corte)
            return;


        if (corte.elemento) {

            corte.elemento.remove();

            corte.elemento = null;

        }


        const index =
            this.cortesAtivos.indexOf(
                corte
            );


        if (index !== -1) {

            this.cortesAtivos.splice(
                index,
                1
            );

        }

    },


    // =====================================================
    // FINALIZAR CORTES DIAGONAIS
    // =====================================================

    finalizarCortes() {

        if (
            this.finalizandoCortes
        )
            return;


        this.finalizandoCortes =
            true;


        this.cortesAtacando =
            false;


        if (this.cortesTimeout) {

            clearTimeout(
                this.cortesTimeout
            );

        }

        this.cortesTimeout = null;


        for (
            const corte of
            [...this.cortesAtivos]
        ) {

            if (corte.elemento) {

                corte.elemento.remove();

            }

        }


        this.cortesAtivos = [];

        this.cortesCriados = 0;


        this.ativo = false;

        this.tipoAtual = null;

        this.finalizandoCortes = false;


        console.log(
            "⚔️ CORTES DIAGONAIS TERMINARAM"
        );


        this.finalizarTurno();

    },


    // =====================================================
    // FINALIZAR GERAL
    // =====================================================

    finalizar() {

        if (this.finalizando)
            return;


        this.finalizando = true;


        // =================================================
        // RAIO
        // =================================================

        this.raioAtivo = false;


        if (this.raioTimeout) {

            clearTimeout(
                this.raioTimeout
            );

        }

        this.raioTimeout = null;


        if (this.raioProximoTimeout) {

            clearTimeout(
                this.raioProximoTimeout
            );

        }

        this.raioProximoTimeout = null;


        this.removerAvisoRaio();

        this.removerRaio();


        this.etapaRaio = 0;

        this.ordemRaios = [];

        this.parteRaioAtual = null;


        // =================================================
        // RITUAL
        // =================================================

        this.bolaAtiva = false;

        this.perseguindo = false;


        if (
            this.tempoPerseguicaoTimeout
        ) {

            clearTimeout(
                this.tempoPerseguicaoTimeout
            );

        }

        this.tempoPerseguicaoTimeout = null;


        if (this.elementoBola) {

            this.elementoBola.remove();

        }

        this.elementoBola = null;


        // =================================================
        // ARMA
        // =================================================

        this.atirando = false;


        if (this.arma) {

            this.arma.remove();

        }

        this.arma = null;


        for (
            const bala of
            [...this.balas]
        ) {

            this.removerBala(
                bala
            );

        }

        this.balas = [];


        // =================================================
        // CORTES
        // =================================================

        this.cortesAtivo = false;


        if (this.cortesEtapaTimeout) {

            clearTimeout(
                this.cortesEtapaTimeout
            );

        }

        this.cortesEtapaTimeout = null;


        if (this.cortesAtaqueTimeout) {

            clearTimeout(
                this.cortesAtaqueTimeout
            );

        }

        this.cortesAtaqueTimeout = null;


        this.removerIndicadoresCortes();

        this.removerAtaquesCortes();


        this.etapaCortes = 0;


        // =================================================
        // CORTES DIAGONAIS
        // =================================================

        this.cortesAtacando = false;

        this.finalizandoCortes = false;


        if (this.cortesTimeout) {

            clearTimeout(
                this.cortesTimeout
            );

        }

        this.cortesTimeout = null;


        for (
            const corte of
            [...this.cortesAtivos]
        ) {

            if (corte.elemento) {

                corte.elemento.remove();

            }

        }


        this.cortesAtivos = [];


        // =================================================
        // ESTADO
        // =================================================

        this.ativo = false;

        this.tipoAtual = null;


        if (this.timeoutFinal) {

            clearTimeout(
                this.timeoutFinal
            );

        }

        this.timeoutFinal = null;


        this.finalizando = false;


        console.log(
            "ATAQUE DA MÁSCARA TERMINOU"
        );


        this.finalizarTurno();

    },


    // =====================================================
    // FINALIZAR TURNO
    // =====================================================

    finalizarTurno() {

        if (!Batalha.ativa)
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