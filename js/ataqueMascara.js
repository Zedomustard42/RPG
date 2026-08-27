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

    danoRaio: 45,

    danoMinimo: 30,
    danoMaximo: 60,

    intervaloRaios: 250,

    raioGif:
        "assets/imagens/raio.gif",

    somRaio:
        "assets/audio/raio.mp3",

    raioTimeout: null,

    raioProximoTimeout: null,

        // =====================================================
        // VARIANTE DO RAIO
        // =====================================================

        varianteRaioAtiva: false,

        chanceVarianteRaio: 0.5,

        quantidadeRaiosVarianteMin: 2,

        quantidadeRaiosVarianteMax: 3,

        quantidadePartesVarianteRaio: 4,

        intervaloRaiosVariante: 120,

        duracaoRaiosVariante: 800,

        varianteRaiosAtual: [],

        varianteRaiosTimeout: null,


    // =====================================================
    // RITUAL
    // =====================================================

    bolaAtiva: false,

    bolaX: 0,
    bolaY: 0,

    velX: 0,
    velY: 0,

    velocidadeProjetil: 4,

    danoRitual: 45,

    perseguindo: false,

    tempoPerseguicao: 1500,

    elementoBola: null,

    tempoPerseguicaoTimeout: null,


    // =====================================================
    // EXECUTAR RITUAL
    // =====================================================

    executarRitual() {

        if (
            !Batalha.ativa ||
            Batalha.turno !== "mascara" ||
            Batalha.estado !== "ESQUIVA"
        ) {
            this.finalizar();
            return;
        }

        this.tipoAtual = "RITUAL";

        console.log("RITUAL DA MÁSCARA");

        setTimeout(() => {

            if (
                !Batalha.ativa ||
                Batalha.turno !== "mascara" ||
                Batalha.estado !== "ESQUIVA"
            ) {
                this.finalizar();
                return;
            }

            this.criarBola();

        }, 1000);

    },

    // =====================================================
    // ARMA
    // =====================================================

    arma: null,

    balas: [],

    quantidadeTiros: 3,

    intervaloTiro: 500,

    velocidadeBala: 7,

    danoBala: 45,

    atirando: false,


    // =====================================================
    // CORTES DIAGONAIS
    // =====================================================

    cortesAtivos: [],

    cortesAtacando: false,

    quantidadeCortes: 7,

    velocidadeCortes: 13,

    danoCortes: 45,

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
        "*",
        "X",
        "*"

    ],

    tempoAvisoCortes: 500,

    velocidadeAtaqueCortes: 18,

    danoAtaqueCortes: 45,

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

    rolarDanoMascara() {

        const minimo = Number(this.danoMinimo) || 30;
        const maximo = Number(this.danoMaximo) || 60;

        return Math.floor(
            Math.random() * (maximo - minimo + 1)
        ) + minimo;

    },


    resetar() {

        this.ativo = false;

        this.turnosMascaraConcluidos = 0;
        this.filaVariantes = [];
        this.ultimoFoiNormal = true;

        this.tipoAtual = null;

        this.finalizando = false;
        this.golpeFinalAtivo = false;


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
        this.trocaAtaqueAtivo = false;
        this.trocaAtaqueNumero = 0;
        if (this.trocaAtaqueTimeout) clearTimeout(this.trocaAtaqueTimeout);
        this.trocaAtaqueTimeout = null;
        if (this.trocaOverlay) this.trocaOverlay.remove();
        this.trocaOverlay = null;
        this.correntesAtivas = false;
        this.golpeFinalAtivo = false;

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

    if (
        !Batalha.ativa ||
        Batalha.turno !== "mascara" ||
        Batalha.estado !== "ESQUIVA" ||
        this.ativo ||
        this.golpeFinalAtivo
    )
        return;


    const normais = [
        "RAIO",
        "RITUAL",
        "ARMA",
        "CORTES",
        "CORTES_DIAGONAIS",
        "CORTES_FOGO"
    ];


    const variantes = [
        "PILARES_FOGO",
        "RAIOS_E_CORTE",
        "CORTE_CAIXA",
        "CORTES_VARIAVEIS",
        "CORRENTES_DESTINO",
        "ARCO_FOGO",
        "ESPADAS_SANGUE",
        "CONJUNTO_ESPADAS",
        "TRIDENTE_SANGUE",
        "RETROCESSO"
    ];


    // =====================================================
    // FILA DE VARIANTES
    // =====================================================

    // Depois de dois turnos, as variantes passam a aparecer
    // de forma garantida e embaralhada.

    if (
        this.turnosMascaraConcluidos >= 2 &&
        !this.filaVariantes.length
    ) {

        this.filaVariantes =
            [...variantes]
                .sort(
                    () =>
                        Math.random() - 0.5
                );

    }


    // =====================================================
    // TROCA
    // =====================================================

    // Abaixo de 1500 HP, a TROCA substitui
    // a seleção normal/variante.

    if (
        Batalha.mascara.hp > 0 &&
        Batalha.mascara.hp <= 1500 &&
        !this.trocaAtaqueAtivo
    ) {

        this.executarEstalosCaixa();

        return;

    }


    // =====================================================
    // ESCOLHER ATAQUE
    // =====================================================

    let escolhido;


    if (
        this.turnosMascaraConcluidos >= 2 &&
        this.filaVariantes.length
    ) {

        // Depois do 2º turno:
        // variante → ataque normal → variante → ataque normal...

        if (
            this.ultimoFoiNormal === false
        ) {

            escolhido =
                normais[
                    Math.floor(
                        Math.random() *
                        normais.length
                    )
                ];

            this.ultimoFoiNormal = true;

        }
        else {

            escolhido =
                this.filaVariantes.shift();

            this.ultimoFoiNormal = false;

        }

    }
    else {

        escolhido =
            normais[
                Math.floor(
                    Math.random() *
                    normais.length
                )
            ];

        this.ultimoFoiNormal = true;

    }


    console.log(
        "⚔️ ATAQUE ESCOLHIDO:",
        escolhido,
        "| turnos:",
        this.turnosMascaraConcluidos
    );


    // =====================================================
    // MAPA DOS ATAQUES
    // =====================================================

    const mapa = {

        // =================================================
        // RAIO
        // =================================================

        RAIO: () => {

            // 50% = raio normal
            // 50% = variante de 2 ou 3 raios

            if (
                Math.random() < 0.5
            ) {

                this.executarRaio();

            }
            else {

                this.executarRaiosVariante();

            }

        },


        // =================================================
        // ATAQUES NORMAIS
        // =================================================

        RITUAL: () =>
            this.executarRitual(),


        ARMA: () =>
            this.executarArma(),


        CORTES: () =>
            this.executarCortes(),


        CORTES_DIAGONAIS: () =>
            this.executarCortesDiagonais(),


        CORTES_FOGO: () =>
            this.executarCortesFogo(),


        // =================================================
        // VARIANTES
        // =================================================

        PILARES_FOGO: () =>
            this.executarPilaresFogo(),


        RAIOS_E_CORTE: () =>
            this.executarRaiosECorte(),


        CORTE_CAIXA: () =>
            this.executarCorteCaixa(),


        CORTES_VARIAVEIS: () =>
            this.executarCortesVariaveis(),


        CORRENTES_DESTINO: () =>
            this.executarCorrentesDestino(),


        ARCO_FOGO: () =>
            this.executarArcoFogo(),


        ESPADAS_SANGUE: () =>
            this.executarEspadasSangue(),


        CONJUNTO_ESPADAS: () =>
            this.executarConjuntoEspadas(),


        TRIDENTE_SANGUE: () =>
            this.executarTridenteSangue(),


        RETROCESSO: () =>
            this.executarRetrocesso()

    };


    // =====================================================
    // EXECUTAR ATAQUE ESCOLHIDO
    // =====================================================

    mapa[
        escolhido
    ]?.();

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

    // =================================================
    // 50% RAIO NORMAL / 50% VARIANTE
    // =================================================

    if (Math.random() < 0.5) {

        console.log(
            "⚡ RAIO NORMAL ESCOLHIDO"
        );

        this.executarRaioNormal();

    } else {

        console.log(
            "⚡ VARIANTE DO RAIO ESCOLHIDA"
        );

        this.executarVarianteRaios();

    }

},


// =====================================================
// RAIO NORMAL
// =====================================================

executarRaioNormal() {

    if (!Batalha.ativa)
        return;

    const caixa =
        document.getElementById(
            "caixaEsquiva"
        );

    if (!caixa)
        return;

    this.ativo = true;

    this.tipoAtual = "RAIO";

    this.finalizando = false;

    this.raioAtivo = true;

    this.etapaRaio = 0;


    // Bruno teleporta para cima da caixa
    if (
        typeof BatalhaRender !==
        "undefined" &&
        typeof BatalhaRender.iniciarTeleporteTrovao ===
        "function"
    ) {

        BatalhaRender.iniciarTeleporteTrovao();

    }


    // =================================================
    // ORDEM NORMAL DOS 4 RAIOS
    // =================================================

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
// VARIANTE DOS RAIOS
// 2 OU 3 RAIOS AO MESMO TEMPO
// SEMPRE DEIXANDO PELO MENOS 1 ESPAÇO LIVRE
// =====================================================

executarVarianteRaios() {

    if (!Batalha.ativa)
        return;

    const caixa =
        document.getElementById(
            "caixaEsquiva"
        );

    if (!caixa)
        return;


    this.ativo = true;

    this.tipoAtual =
        "VARIANTE_RAIOS";

    this.finalizando = false;


    // Bruno teleporta para cima da caixa
    if (
        typeof BatalhaRender !==
        "undefined" &&
        typeof BatalhaRender.iniciarTeleporteTrovao ===
        "function"
    ) {

        BatalhaRender.iniciarTeleporteTrovao();

    }


    // =================================================
    // ESCOLHE ALEATORIAMENTE 2 OU 3 RAIOS
    // =================================================

    const quantidade =
        Math.random() < 0.5
            ? 2
            : 3;


    // =================================================
    // CRIA AS 4 POSIÇÕES
    // =================================================

    const partes = [
        0,
        1,
        2,
        3
    ];


    // Embaralha
    partes.sort(
        () =>
            Math.random() - 0.5
    );


    // Pega somente 2 ou 3 posições
    const partesEscolhidas =
        partes.slice(
            0,
            quantidade
        );


    partesEscolhidas.sort(
        (a, b) => a - b
    );


    console.log(
        "⚡ VARIANTE:",
        quantidade,
        "RAIOS",
        "POSIÇÕES:",
        partesEscolhidas
    );


    // =================================================
    // MOSTRA OS AVISOS AO MESMO TEMPO
    // =================================================

    this.removerAvisoRaio();


    const larguraParte =
        caixa.clientWidth /
        this.quantidadePartesRaio;


    partesEscolhidas.forEach(
        parte => {

            const centroX =
                (larguraParte * parte) +
                (larguraParte / 2);


            const aviso =
                document.createElement(
                    "div"
                );


            aviso.textContent = "!";


            Object.assign(
                aviso.style,
                {

                    position:
                        "absolute",

                    left:
                        `${centroX - 35}px`,

                    top:
                        `${caixa.clientHeight / 2 - 55}px`,

                    width:
                        "70px",

                    height:
                        "90px",

                    fontSize:
                        "90px",

                    lineHeight:
                        "90px",

                    textAlign:
                        "center",

                    fontWeight:
                        "900",

                    fontFamily:
                        "Arial, sans-serif",

                    color:
                        "red",

                    textShadow:
                        "0 0 5px black," +
                        "0 0 12px red," +
                        "0 0 25px red",

                    zIndex:
                        "300",

                    pointerEvents:
                        "none"

                }
            );


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


            // Guarda os avisos para remover depois
            if (
                !this.indicadoresRaiosVariante
            ) {

                this.indicadoresRaiosVariante =
                    [];

            }


            this.indicadoresRaiosVariante.push(
                aviso
            );

        }
    );


    // =================================================
    // ESPERA O AVISO
    // =================================================

    this.raioVarianteTimeout =
        setTimeout(
            () => {

                this.raioVarianteTimeout =
                    null;


                if (
                    !this.ativo ||
                    !Batalha.ativa
                )
                    return;


                // Remove os avisos
                this.removerAvisosRaiosVariante();


                // Cria TODOS os raios ao mesmo tempo
                this.criarRaiosSimultaneos(
                    partesEscolhidas
                );


            },
            this.raioAvisoTempo
        );

},


// =====================================================
// CRIAR RAIOS SIMULTÂNEOS
// =====================================================

criarRaiosSimultaneos(
    partes
) {

    if (
        !Batalha.ativa ||
        !this.ativo
    )
        return;


    const caixa =
        document.getElementById(
            "caixaEsquiva"
        );


    if (!caixa) {

        this.finalizarVarianteRaios();

        return;

    }


    const larguraParte =
        caixa.clientWidth /
        this.quantidadePartesRaio;


    const raiosCriados = [];


    // =================================================
    // CRIA TODOS OS RAIOS
    // =================================================

    partes.forEach(
        parte => {

            const raio =
                document.createElement(
                    "img"
                );


            raio.src =
                this.raioGif;


            Object.assign(
                raio.style,
                {

                    position:
                        "absolute",

                    left:
                        `${larguraParte * parte}px`,

                    top:
                        "0px",

                    width:
                        `${larguraParte}px`,

                    height:
                        `${caixa.clientHeight}px`,

                    objectFit:
                        "fill",

                    zIndex:
                        "280",

                    pointerEvents:
                        "none",

                    userSelect:
                        "none",

                    opacity:
                        "0",

                    transform:
                        "scale(0.8)",

                    transition:
                        "opacity .08s ease," +
                        "transform .08s ease"

                }
            );


            caixa.appendChild(
                raio
            );


            raiosCriados.push(
                {
                    elemento: raio,
                    parte: parte
                }
            );

        }
    );


    // =================================================
    // APARECEM JUNTOS
    // =================================================

    requestAnimationFrame(
        () => {

            raiosCriados.forEach(
                item => {

                    item.elemento.style.opacity =
                        "1";

                    item.elemento.style.transform =
                        "scale(1)";

                }
            );

        }
    );


    // =================================================
    // SOM
    // =================================================

    this.tocarSomRaio();


    // =================================================
    // DANO DE CADA RAIO
    // =================================================

    raiosCriados.forEach(
        item => {

            this.verificarDanoRaio(
                item.parte
            );

        }
    );


    // =================================================
    // GUARDA OS RAIOS
    // =================================================

    this.raiosVariante =
        raiosCriados;


    // =================================================
    // DURAÇÃO DOS RAIOS
    // =================================================

    this.raioVarianteDuracaoTimeout =
        setTimeout(
            () => {

                this.raioVarianteDuracaoTimeout =
                    null;


                raiosCriados.forEach(
                    item => {

                        if (
                            item.elemento
                        ) {

                            item.elemento.remove();

                        }

                    }
                );


                this.raiosVariante =
                    [];


                this.finalizarVarianteRaios();


            },
            this.raioDuracao
        );

},


// =====================================================
// REMOVER AVISOS DA VARIANTE
// =====================================================

removerAvisosRaiosVariante() {

    if (
        this.indicadoresRaiosVariante
    ) {

        this.indicadoresRaiosVariante.forEach(
            aviso => {

                if (aviso)
                    aviso.remove();

            }
        );

    }


    this.indicadoresRaiosVariante =
        [];

},


// =====================================================
// FINALIZAR VARIANTE
// =====================================================

finalizarVarianteRaios() {

    if (
        this.raioVarianteTimeout
    ) {

        clearTimeout(
            this.raioVarianteTimeout
        );

        this.raioVarianteTimeout =
            null;

    }


    if (
        this.raioVarianteDuracaoTimeout
    ) {

        clearTimeout(
            this.raioVarianteDuracaoTimeout
        );

        this.raioVarianteDuracaoTimeout =
            null;

    }


    this.removerAvisosRaiosVariante();


    if (
        this.raiosVariante
    ) {

        this.raiosVariante.forEach(
            item => {

                if (
                    item &&
                    item.elemento
                ) {

                    item.elemento.remove();

                }

            }
        );

    }


    this.raiosVariante =
        [];


    this.ativo =
        false;

    this.tipoAtual =
        null;

    this.finalizando =
        false;


    // Bruno volta
    if (
        typeof BatalhaRender !==
        "undefined" &&
        typeof BatalhaRender.finalizarTeleporteTrovao ===
        "function"
    ) {

        BatalhaRender.finalizarTeleporteTrovao();

    }


    console.log(
        "⚡ VARIANTE DE RAIOS TERMINOU"
    );


    this.finalizarTurno();

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
                this.rolarDanoMascara()
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
                    this.rolarDanoMascara()
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
            "⚔️ CORTES: / → X → * → X → *"
        );


        // Teleporta a Máscara para o lado oposto antes do primeiro aviso.
        if (
            typeof BatalhaRender !== "undefined" &&
            typeof BatalhaRender.iniciarTeleporteCortes === "function"
        ) {

            BatalhaRender.iniciarTeleporteCortes();

        }


        setTimeout(() => {

            if (this.cortesAtivo)
                this.iniciarEtapaCortes();

        }, 140);

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


        // Durante o aviso, Bruno fica na pose de preparação
        // e gira continuamente para dificultar a leitura do ataque.
        if (
            typeof BatalhaRender !== "undefined" &&
            typeof BatalhaRender.trocarSpriteMascara === "function"
        ) {

            BatalhaRender.trocarSpriteMascara(
                "assets/imagens/batalha_imagens/bruno/PREPARANDO-CORTE.png"
            );

        }

        this.criarIndicadoresCortes(
            tipo
        );


        // Gira o AVISO/ATAQUE, não a Máscara.
        if (
            typeof BatalhaRender !== "undefined" &&
            typeof BatalhaRender.iniciarGiroCorte === "function"
        ) {

            BatalhaRender.iniciarGiroCorte();

        }


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


        if (
            typeof BatalhaRender !== "undefined" &&
            typeof BatalhaRender.pararGiroCorte === "function"
        ) {

            BatalhaRender.pararGiroCorte();

        }

        // Sprite usado exatamente no momento do golpe.
        if (
            typeof BatalhaRender !== "undefined" &&
            typeof BatalhaRender.trocarSpriteMascara === "function"
        ) {

            BatalhaRender.trocarSpriteMascara(
                "assets/imagens/batalha_imagens/corte.png"
            );

        }

        this.tocarSomCorte();


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


                    // A cada novo golpe, a Máscara muda um pouco de posição.
                    if (
                        this.cortesAtivo &&
                        typeof BatalhaRender !== "undefined" &&
                        typeof BatalhaRender.moverMascaraCorte === "function"
                    ) {

                        BatalhaRender.moverMascaraCorte();

                    }


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

            const rad = ataque.angulo * Math.PI / 180;

            // Colisão com o SEGMENTO inteiro do corte, em vez de
            // verificar somente o centro. Isso deixa a hitbox muito
            // mais justa: se a linha passar pelo coração, acerta.
            const metade = ataque.tamanho / 2;
            const ax = ataque.centroX - Math.cos(rad) * metade;
            const ay = ataque.centroY - Math.sin(rad) * metade;
            const bx = ataque.centroX + Math.cos(rad) * metade;
            const by = ataque.centroY + Math.sin(rad) * metade;

            const abx = bx - ax;
            const aby = by - ay;
            const ab2 = abx * abx + aby * aby;

            let t = 0;
            if (ab2 > 0) {
                t = ((Coracao.x - ax) * abx + (Coracao.y - ay) * aby) / ab2;
                t = Math.max(0, Math.min(1, t));
            }

            const px = ax + t * abx;
            const py = ay + t * aby;
            const dx = Coracao.x - px;
            const dy = Coracao.y - py;
            const distancia = Math.hypot(dx, dy);

            // 18px para a espessura visual + 16px de margem do coração.
            if (distancia <= 34) {

                ataque.atingiu = true;

                Coracao.receberDano(
                    this.rolarDanoMascara()
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


    tocarSomCorte() {

        try {

            const som =
                new Audio(
                    "assets/audio/audio_batalha/bruno/bruno-corte.mp3"
                );

            som.volume = 1;
            som.currentTime = 0;

            som.play().catch(
                erro =>
                    console.warn(
                        "Não foi possível tocar o som do corte:",
                        erro
                    )
            );

        }
        catch (erro) {

            console.error(
                "Erro ao tocar o som do corte:",
                erro
            );

        }

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


        if (
            typeof BatalhaRender !== "undefined" &&
            typeof BatalhaRender.pararGiroCorte === "function"
        ) {

            BatalhaRender.pararGiroCorte();

        }

        if (
            typeof BatalhaRender !== "undefined" &&
            typeof BatalhaRender.finalizarTeleporteCortes === "function"
        ) {

            BatalhaRender.finalizarTeleporteCortes();

        }


        setTimeout(() => {

            if (
                typeof BatalhaRender !== "undefined" &&
                typeof BatalhaRender.trocarSpriteMascara === "function"
            ) {

                BatalhaRender.trocarSpriteMascara(
                    "assets/imagens/batalha_imagens/bruno/mascara.png"
                );

            }

        }, 130);


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
                    this.rolarDanoMascara()
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


        if (
            typeof BatalhaRender !==
            "undefined" &&
            typeof BatalhaRender.finalizarTeleporteTrovao ===
            "function"
        ) {

            BatalhaRender.finalizarTeleporteTrovao();

        }


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
    // UTILITÁRIOS E NOVOS ATAQUES
    // =====================================================

    danoMascaraSeguro() {
        if (typeof Coracao !== "undefined" && typeof Coracao.receberDano === "function") {
            Coracao.receberDano(this.rolarDanoMascara());
        }
    },

    tocarAudio(src, volume = 1) {
        const a = new Audio(src); a.volume = volume; a.currentTime = 0; a.play().catch(() => {}); return a;
    },

    posicaoCoracao() {
        const caixa = document.getElementById("caixaEsquiva");
        return { x: Number(Coracao?.x ?? caixa?.clientWidth / 2 ?? 150), y: Number(Coracao?.y ?? caixa?.clientHeight / 2 ?? 100) };
    },

    criarHitboxRetangulo(el, dano = true) {
        if (!el) return;
        const loop = () => {
            if (!el.parentElement) return;
            const c = Coracao?.elemento?.getBoundingClientRect();
            const r = el.getBoundingClientRect();
            if (c && r.left < c.right && r.right > c.left && r.top < c.bottom && r.bottom > c.top && !el.dataset.hit) {
                el.dataset.hit = "1"; if (dano) this.danoMascaraSeguro();
            }
            requestAnimationFrame(loop);
        }; requestAnimationFrame(loop);
    },

    limparElementoDepois(el, ms) { setTimeout(() => el?.parentElement?.removeChild(el), ms); },

    iniciarTeleporteParaAtaque() {
        if (typeof BatalhaRender !== "undefined" && typeof BatalhaRender.iniciarTeleporteCortes === "function") BatalhaRender.iniciarTeleporteCortes();
    },

    finalizarAtaqueNovo(delay = 400) {
        setTimeout(() => {
            if (!Batalha.ativa) return;
            if (BatalhaRender?.teleporteCortesAtivo && typeof BatalhaRender.finalizarTeleporteCortes === "function") BatalhaRender.finalizarTeleporteCortes();
            this.finalizarTurno();
        }, delay);
    },

    criarIndicador(caixa, x, y) {
        const e = document.createElement("div"); e.textContent = "!";
        Object.assign(e.style,{position:"absolute",left:`${x}px`,top:`${y}px`,fontSize:"72px",fontFamily:"Determination, monospace",color:"red",fontWeight:"bold",zIndex:"900",pointerEvents:"none",textShadow:"0 0 8px #f00"});
        caixa.appendChild(e); return e;
    },

    pontoSegmentoDist(px,py,ax,ay,bx,by) {
        const dx=bx-ax,dy=by-ay, len2=dx*dx+dy*dy; let t=len2 ? ((px-ax)*dx+(py-ay)*dy)/len2 : 0; t=Math.max(0,Math.min(1,t));
        const x=ax+t*dx,y=ay+t*dy; return Math.hypot(px-x,py-y);
    },

    criarCorteHitbox(caixa, angulo, largura = 14, duracao = 260, dano = true) {
        const cx = caixa.clientWidth/2, cy = caixa.clientHeight/2;
        const len = Math.hypot(caixa.clientWidth, caixa.clientHeight)*1.35;
        const rad = angulo*Math.PI/180, ax=cx-Math.cos(rad)*len/2, ay=cy-Math.sin(rad)*len/2, bx=cx+Math.cos(rad)*len/2, by=cy+Math.sin(rad)*len/2;
        const hit = () => {
            if (!Coracao?.elemento || !caixa.isConnected) return;
            const c=Coracao.elemento.getBoundingClientRect(), px=c.left+c.width/2, py=c.top+c.height/2;
            const cr=caixa.getBoundingClientRect(), lx=px-cr.left, ly=py-cr.top;
            if (this.pontoSegmentoDist(lx,ly,ax,ay,bx,by) <= Math.max(largura, c.width/2)) this.danoMascaraSeguro();
        };
        if (dano) hit();
        const id=setInterval(hit,45); setTimeout(()=>clearInterval(id),duracao);
    },

    criarCorteVisual(caixa, angulo, duracao=420, espessura=12) {
        const e=document.createElement("div"); const len=Math.hypot(caixa.clientWidth,caixa.clientHeight)*1.5;
        Object.assign(e.style,{position:"absolute",left:"50%",top:"50%",width:`${len}px`,height:`${espessura}px`,marginLeft:`${-len/2}px`,marginTop:`${-espessura/2}px`,background:"linear-gradient(90deg,transparent,#fff,#ff2020,#fff,transparent)",boxShadow:"0 0 12px #f00,0 0 28px #f00",transform:`rotate(${angulo}deg)`,zIndex:"850",pointerEvents:"none",transformOrigin:"50% 50%"}); caixa.appendChild(e); this.criarCorteHitbox(caixa,angulo,espessura,duracao,true); this.limparElementoDepois(e,duracao); return e;
    },

    executarPilaresFogo() {
        if (this.ativo) return;
        const caixa = document.getElementById("caixaEsquiva");
        if (!caixa) return;

        this.ativo = true;
        this.tipoAtual = "PILARES_FOGO";

        const W = caixa.clientWidth;
        const H = caixa.clientHeight;
        const blocos = [];
        const fireSrc = "assets/imagens/fogo.png";

        const adicionarBloco = (x, y, w, h) => {
            if (w <= 0 || h <= 0) return;
            const el = document.createElement("img");
            el.src = fireSrc;
            Object.assign(el.style, {
                position: "absolute",
                left: `${x}px`, top: `${y}px`, width: `${w}px`, height: `${h}px`,
                objectFit: "cover", backgroundRepeat: "repeat",
                zIndex: "850", pointerEvents: "none",
                filter: "drop-shadow(0 0 8px rgba(255,90,0,.85))"
            });
            caixa.appendChild(el);
            blocos.push({ el, x, y, w, h });
        };

        // Padrão inicial: duas paredes de fogo deixando um corredor pequeno no meio.
        const corredor = Math.max(44, Math.min(64, W * 0.22));
        const margem = Math.max(26, Math.min(42, H * 0.18));
        const centroX = W / 2;
        const centroY = H / 2;

        adicionarBloco(0, 0, centroX - corredor / 2, H);
        adicionarBloco(centroX + corredor / 2, 0, W - (centroX + corredor / 2), H);

        // Abertura real no corredor: o coração precisa ficar dentro desta região.
        const dano = () => {
            const c = Coracao?.elemento?.getBoundingClientRect();
            const r = caixa.getBoundingClientRect();
            if (!c) return;
            const cx = c.left + c.width / 2 - r.left;
            const cy = c.top + c.height / 2 - r.top;
            for (const p of blocos) {
                if (cx > p.x - c.width * 0.32 && cx < p.x + p.w + c.width * 0.32 &&
                    cy > p.y - c.height * 0.32 && cy < p.y + p.h + c.height * 0.32) {
                    this.danoMascaraSeguro();
                    break;
                }
            }
        };

        const vigiar = setInterval(() => {
            if (!this.ativo || !Batalha.ativa || !caixa.isConnected) {
                clearInterval(vigiar);
                return;
            }
            dano();
        }, 45);

        // Variante: um pilar horizontal aparece ao mesmo tempo, apertando o espaço.
        setTimeout(() => {
            if (!this.ativo || !Batalha.ativa) return;

            const variante = Math.random() < 0.65;
            if (variante) {
                const aberturaY = centroY;
                const faixa = Math.max(36, Math.min(52, H * 0.18));
                adicionarBloco(0, 0, W, aberturaY - faixa / 2);
                adicionarBloco(0, aberturaY + faixa / 2, W, H - (aberturaY + faixa / 2));
            } else {
                // Outra variação: pilar vertical cruzando a lateral oposta, sem áudio.
                const faixa = Math.max(34, Math.min(48, W * 0.15));
                const x = Math.random() < 0.5 ? W * 0.67 : W * 0.18;
                adicionarBloco(x, 0, faixa, H);
                // Abre um pequeno vão no meio da faixa para manter uma rota possível.
                const gap = Math.max(44, Math.min(58, H * 0.22));
                const cortes = blocos.splice(-1, 1)[0];
                cortes.el.remove();
                adicionarBloco(x, 0, faixa, centroY - gap / 2);
                adicionarBloco(x, centroY + gap / 2, faixa, H - (centroY + gap / 2));
            }
            dano();
        }, 750);

        setTimeout(() => {
            clearInterval(vigiar);
            blocos.forEach(p => p.el?.remove());
            this.ativo = false;
            this.tipoAtual = null;
            this.finalizarTurno();
        }, 2400);
    },

    // =====================================================
    // CORTES DE FOGO
    // Dois cortes apenas: um / e um \, depois ~10 fogos
    // surgem nos pontos onde os golpes passaram.
    // =====================================================

    executarCortesFogo() {
        if (this.ativo) return;
        const caixa = document.getElementById("caixaEsquiva");
        if (!caixa) return;

        this.ativo = true;
        this.tipoAtual = "CORTES_FOGO";

        // Entre 5 e 8 cortes, todos individuais.
        const quantidadeCortes = 5 + Math.floor(Math.random() * 4);
        const angulos = [];
        const cortes = [];
        let indice = 0;

        const fazerCorte = () => {
            if (!this.ativo || !Batalha.ativa) return;

            if (indice >= quantidadeCortes) {
                // Depois do último corte, surgem os fogos nos pontos
                // das linhas que foram utilizadas.
                setTimeout(() => {
                    if (!this.ativo || !Batalha.ativa) return;
                    this.explosaoFogoNosCortes(caixa, angulos);
                }, 220);
                return;
            }

            // Alterna entre as duas diagonais para que cada golpe seja
            // visualmente uma única linha, nunca multiplicada.
            const angulo = indice % 2 === 0 ? -45 : 45;
            angulos.push(angulo);

            // Usa a MESMA animação visual dos cortes normais.
            const gif = document.createElement("img");
            gif.src = "assets/imagens/batalha_imagens/bruno/cortar.gif";
            Object.assign(gif.style, {
                position: "absolute",
                left: "50%",
                top: "50%",
                width: `${Math.hypot(caixa.clientWidth, caixa.clientHeight) * 1.5}px`,
                height: `${Math.max(caixa.clientHeight, caixa.clientWidth) * 1.2}px`,
                objectFit: "contain",
                transform: `translate(-50%, -50%) rotate(${angulo}deg)`,
                transformOrigin: "50% 50%",
                zIndex: "960",
                pointerEvents: "none"
            });
            caixa.appendChild(gif);
            cortes.push(gif);

            // Mesma hitbox matemática dos cortes normais.
            this.criarCorteHitbox(caixa, angulo, 24, 520, true);

            // Mesmo som dos cortes normais.
            this.tocarAudio(
                "assets/audio/audio_batalha/bruno/bruno-corte.mp3",
                0.9
            );

            // Cada corte termina antes do próximo começar.
            setTimeout(() => {
                gif.remove();
                if (this.ativo && Batalha.ativa) fazerCorte();
            }, 520);

            indice++;
        };

        fazerCorte();
    },

    explosaoFogoNosCortes(caixa, angulos) {
        const quantidade = 10;
        const cx = caixa.clientWidth / 2;
        const cy = caixa.clientHeight / 2;
        const len = Math.hypot(caixa.clientWidth, caixa.clientHeight) * 0.68;
        const particulas = [];

        // As partículas nascem espalhadas ao longo das duas linhas de corte.
        for (let i = 0; i < quantidade; i++) {
            const angulo = angulos[i % angulos.length] * Math.PI / 180;
            const t = -0.48 + Math.random() * 0.96;
            const px = cx + Math.cos(angulo) * len * t;
            const py = cy + Math.sin(angulo) * len * t;
            const p = document.createElement("img");
            p.src = "assets/imagens/fogo.png";

            const a = Math.random() * Math.PI * 2;
            const velocidade = 2.2 + Math.random() * 3.4;
            const tamanho = 18 + Math.random() * 18;

            Object.assign(p.style, {
                position: "absolute",
                left: `${px}px`, top: `${py}px`,
                width: `${tamanho}px`, height: `${tamanho}px`,
                objectFit: "contain",
                zIndex: "910",
                pointerEvents: "none",
                filter: "drop-shadow(0 0 7px rgba(255,100,0,.9))"
            });

            caixa.appendChild(p);
            particulas.push({ el: p, x: px, y: py, a, v: velocidade, vida: 0 });
        }

        // Durante a explosão, os próprios pontos de origem também têm hitbox leve.
        const hit = () => {
            const heart = Coracao?.elemento?.getBoundingClientRect();
            const cr = caixa.getBoundingClientRect();
            if (!heart) return;
            const hx = heart.left + heart.width / 2 - cr.left;
            const hy = heart.top + heart.height / 2 - cr.top;
            for (const p of particulas) {
                if (Math.hypot(hx - p.x, hy - p.y) <= Math.max(18, heart.width * 0.62)) {
                    if (!p.hit) {
                        p.hit = true;
                        this.danoMascaraSeguro();
                    }
                    break;
                }
            }
        };

        const animar = () => {
            if (!this.ativo) {
                particulas.forEach(p => p.el.remove());
                return;
            }

            let vivas = false;
            for (const p of particulas) {
                p.vida++;
                if (p.vida < 42) vivas = true;
                p.x += Math.cos(p.a) * p.v;
                p.y += Math.sin(p.a) * p.v;
                p.el.style.left = `${p.x}px`;
                p.el.style.top = `${p.y}px`;
                p.el.style.opacity = String(Math.max(0, 1 - p.vida / 42));
                p.el.style.transform = `scale(${Math.max(0.18, 1 - p.vida / 55)}) rotate(${p.vida * 8}deg)`;
            }
            hit();

            if (vivas) requestAnimationFrame(animar);
            else {
                particulas.forEach(p => p.el.remove());
                if (this.ativo) {
                    this.ativo = false;
                    this.tipoAtual = null;
                    this.finalizarTurno();
                }
            }
        };

        requestAnimationFrame(animar);
    },

    executarRaiosECorte() {
        if (this.ativo) return;
        const caixa = document.getElementById("caixaEsquiva");
        if (!caixa) return;

        this.ativo = true;
        this.tipoAtual = "RAIOS_E_CORTE";

        const raios = [];
        const W = caixa.clientWidth;
        const H = caixa.clientHeight;

        // Três posições realmente diferentes.
        const posicoes = [
            [0.12, 0.50], [0.50, 0.50], [0.84, 0.50]
        ].sort(() => Math.random() - 0.5);

        posicoes.forEach(([px, py], index) => {
            setTimeout(() => {
                if (!this.ativo || !Batalha.ativa) return;
                const e = document.createElement("img");
                e.src = this.raioGif;
                Object.assign(e.style, {
                    position: "absolute",
                    left: `${px * W - 30}px`,
                    top: `${py * H - 10}px`,
                    width: "60px",
                    height: `${H + 20}px`,
                    objectFit: "cover",
                    zIndex: "900",
                    pointerEvents: "none",
                    opacity: "0.95"
                });
                caixa.appendChild(e);
                raios.push(e);
                this.criarHitboxRetangulo(e, true);
                setTimeout(() => e.remove(), 650);
            }, index * 180);
        });

        let cortes = 0;
        const fazerCorte = () => {
            if (!this.ativo || !Batalha.ativa) return;
            if (cortes++ >= 6) {
                raios.forEach(e => e.remove());
                this.finalizarTurno();
                return;
            }

            const angulo = -45;
            this.criarCorteVisual(caixa, angulo, 300, 13);
            this.tocarAudio(
                "assets/audio/audio_batalha/bruno/bruno-corte.mp3",
                0.85
            );
            setTimeout(fazerCorte, 380);
        };

        setTimeout(fazerCorte, 260);
    },


    executarCorteCaixa() {
        if (this.ativo) return;

        const caixa = document.getElementById("caixaEsquiva");
        if (!caixa) return;

        this.ativo = true;
        this.tipoAtual = "CORTE_CAIXA";
        this.iniciarTeleporteParaAtaque();

        const golpes = 4;
        let numero = 0;

        const preparar = () => {
            if (!this.ativo || !Batalha.ativa) return;

            if (numero >= golpes) {
                this.finalizarAtaqueNovo(350);
                return;
            }

            // A caixa sempre retorna antes do próximo golpe.
            caixa.style.transition = "transform 180ms ease";
            caixa.style.transform =
                `translate(${(Math.random() - 0.5) * 55}px, ${(Math.random() - 0.5) * 38}px) ` +
                `rotate(${Math.random() < 0.5 ? -2 : 2}deg)`;

            const angulo = [0, 0, 45, -45, 90][Math.floor(Math.random() * 5)];
            const cx = caixa.clientWidth / 2;
            const cy = caixa.clientHeight / 2;
            const len = Math.hypot(caixa.clientWidth, caixa.clientHeight) * 1.25;

            const marcador = this.criarIndicador(
                caixa,
                cx - 28,
                cy - 52
            );

            BatalhaRender?.trocarSpriteMascara?.(
                "assets/imagens/batalha_imagens/bruno/PREPARANDO-CORTE.png"
            );

            const aviso = 600;

            setTimeout(() => {
                if (!this.ativo || !Batalha.ativa) return;

                marcador?.remove();

                BatalhaRender?.trocarSpriteMascara?.(
                    "assets/imagens/batalha_imagens/bruno/corte.png"
                );

                this.tocarAudio(
                    "assets/audio/audio_batalha/bruno/quebrar-caixa.mp3",
                    0.55
                );
                this.tocarAudio(
                    "assets/audio/audio_batalha/bruno/bruno-corte.mp3",
                    0.9
                );

                // GIF real fornecido pelo usuário.
                const gif = document.createElement("img");
                gif.src = "assets/imagens/batalha_imagens/bruno/cortar.gif";
                Object.assign(gif.style, {
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: `${len}px`,
                    height: `${Math.max(caixa.clientHeight, caixa.clientWidth) * 1.2}px`,
                    objectFit: "contain",
                    transform: `translate(-50%, -50%) rotate(${angulo}deg)`,
                    transformOrigin: "50% 50%",
                    zIndex: "960",
                    pointerEvents: "none"
                });
                caixa.appendChild(gif);

                // Hitbox matemática do segmento, muito mais confiável que o GIF.
                this.criarCorteHitbox(
                    caixa,
                    angulo,
                    24,
                    520,
                    true
                );

                // 4–6 partículas de fogo, com direção imprevisível.
                const particulas = [];
                const quantidade = 4 + Math.floor(Math.random() * 3);
                for (let i = 0; i < quantidade; i++) {
                    const p = document.createElement("img");
                    p.src = "assets/imagens/fogo.png";
                    const x = cx + (Math.random() - 0.5) * 80;
                    const y = cy + (Math.random() - 0.5) * 60;
                    const a = Math.random() * Math.PI * 2;
                    const velocidade = 2.5 + Math.random() * 3.5;

                    Object.assign(p.style, {
                        position: "absolute",
                        left: `${x}px`,
                        top: `${y}px`,
                        width: `${18 + Math.random() * 16}px`,
                        height: `${18 + Math.random() * 16}px`,
                        objectFit: "contain",
                        zIndex: "970",
                        pointerEvents: "none"
                    });
                    caixa.appendChild(p);
                    particulas.push({ el: p, x, y, a, velocidade, vida: 0 });
                }

                const moverParticulas = () => {
                    if (!particulas.length) return;
                    for (const p of particulas) {
                        p.vida++;
                        p.x += Math.cos(p.a) * p.velocidade;
                        p.y += Math.sin(p.a) * p.velocidade;
                        p.el.style.left = `${p.x}px`;
                        p.el.style.top = `${p.y}px`;
                        p.el.style.opacity = String(Math.max(0, 1 - p.vida / 32));
                        p.el.style.transform =
                            `scale(${Math.max(0.15, 1 - p.vida / 38)})`;
                    }
                    if (particulas.some(p => p.vida < 32)) {
                        requestAnimationFrame(moverParticulas);
                    } else {
                        particulas.forEach(p => p.el.remove());
                    }
                };
                requestAnimationFrame(moverParticulas);

                setTimeout(() => {
                    gif.remove();
                    caixa.style.transform = "";
                    caixa.style.transition = "transform 180ms ease";
                    numero++;

                    BatalhaRender?.trocarSpriteMascara?.(
                        "assets/imagens/batalha_imagens/bruno/PREPARANDO-CORTE.png"
                    );

                    setTimeout(preparar, 260);
                }, 700);
            }, aviso);
        };

        preparar();
    },


    executarCortesVariaveis() {
        if (this.ativo) return;

        const caixa = document.getElementById("caixaEsquiva");
        if (!caixa) return;

        this.ativo = true;
        this.tipoAtual = "CORTES_VARIAVEIS";

        // A cadência é deliberadamente irregular:
        // desacelera → acelera → acelera → desacelera.
        const duracoes = [720, 330, 180, 650, 260, 760, 190];
        let i = 0;

        const proximo = () => {
            if (!this.ativo || !Batalha.ativa) return;

            if (i >= duracoes.length) {
                this.finalizarTurno();
                return;
            }

            const duracao = duracoes[i++];
            const indicador = this.criarIndicador(
                caixa,
                Math.random() * Math.max(1, caixa.clientWidth - 45),
                Math.random() * Math.max(1, caixa.clientHeight - 65)
            );

            setTimeout(() => {
                indicador.remove();
                if (!this.ativo || !Batalha.ativa) return;

                this.criarCorteVisual(
                    caixa,
                    -45,
                    240,
                    13
                );
                this.tocarAudio(
                    "assets/audio/audio_batalha/bruno/bruno-corte.mp3",
                    0.9
                );

                setTimeout(proximo, Math.max(120, duracao * 0.42));
            }, duracao);
        };

        proximo();
    },


    executarEstalosCaixa() {
        if (this.ativo || this.trocaAtaqueAtivo) return;

        const caixa = document.getElementById("caixaEsquiva");
        if (!caixa) return;

        this.ativo = true;
        this.trocaAtaqueAtivo = true;
        this.trocaAtaqueNumero = 0;
        this.trocaAtaqueMaximo = 1 + Math.floor(Math.random() * 3); // 1 a 3 estalos
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
            RAIO: () => this.executarRaio(),
            RITUAL: () => this.executarRitual(),
            ARMA: () => this.executarArma(),
            CORTES: () => this.executarCortes(),
            CORTES_DIAGONAIS: () => this.executarCortesDiagonais()
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
            this.trocaOverlay = overlay;
        };

        const voltarTela = () => {
            const overlay = this.trocaOverlay;
            if (!overlay) return;
            overlay.style.opacity = "0";
            setTimeout(() => overlay.remove(), 180);
            this.trocaOverlay = null;
        };

        const proximaTroca = () => {
            if (!Batalha.ativa) {
                this.trocaAtaqueAtivo = false;
                return;
            }

            if (this.trocaAtaqueNumero >= this.trocaAtaqueMaximo) {
                caixa.style.left = original.left;
                caixa.style.top = original.top;
                caixa.style.transform = original.transform;
                this.trocaAtaqueAtivo = false;
                this.ativo = false;
                voltarTela();
                this.finalizarTurno();
                return;
            }

            this.trocaAtaqueNumero++;
            telaPreta();

            this.tocarAudio(
                "assets/audio/audio_batalha/bruno/mudanca.mp3",
                0.85
            );

            caixa.style.transform =
                `translate(${(Math.random() - 0.5) * Math.min(220, innerWidth * 0.28)}px, ` +
                `${(Math.random() - 0.5) * Math.min(150, innerHeight * 0.20)}px)`;

            const escolhido =
                normais[Math.floor(Math.random() * normais.length)];

            setTimeout(() => {
                if (!this.trocaAtaqueAtivo) return;

                voltarTela();
                this.ativo = false;
                ataques[escolhido]?.();

                // O ataque fica efetivamente naquela posição por 3,5 segundos.
                this.trocaAtaqueTimeout = setTimeout(() => {
                    this.trocaAtaqueTimeout = null;
                    this.removerAtaquesCortes();
                    proximaTroca();
                }, 3500);
            }, 450);
        };

        proximaTroca();
    },


    executarCorrentesDestino() {
        if (this.ativo) return;

        const caixa = document.getElementById("caixaEsquiva");
        if (!caixa) return;

        this.ativo = true;
        this.tipoAtual = "CORRENTES_DESTINO";
        this.correntesAtivas = true;

        const base = caixa.style.transform;
        const corrente = document.createElement("img");
        corrente.src = "assets/imagens/corrente.png";

        Object.assign(corrente.style, {
            position: "absolute",
            inset: "-18px",
            width: "calc(100% + 36px)",
            height: "calc(100% + 36px)",
            objectFit: "fill",
            zIndex: "950",
            opacity: "0.82",
            pointerEvents: "none"
        });
        caixa.appendChild(corrente);

        // Um ataque normal acontece enquanto as correntes movem a caixa.
        this.trocaAtaqueAtivo = true;
        this.ativo = false;

        const normais = [
            () => this.executarRaio(),
            () => this.executarCortes(),
            () => this.executarArma()
        ];

        const escolhido =
            normais[Math.floor(Math.random() * normais.length)];

        escolhido();

        let frame = 0;
        const mover = () => {
            if (!this.correntesAtivas || !caixa.isConnected) return;

            frame++;
            caixa.style.transform =
                `${base} translate(${Math.sin(frame / 7) * 30}px, ` +
                `${Math.cos(frame / 10) * 20}px) rotate(${Math.sin(frame / 16) * 3}deg)`;

            requestAnimationFrame(mover);
        };
        requestAnimationFrame(mover);

        setTimeout(() => {
            this.correntesAtivas = false;
            this.trocaAtaqueAtivo = false;
            caixa.style.transform = base;
            corrente.remove();
            this.ativo = false;
            this.finalizarTurno();
        }, 3600);
    },


    executarArcoFogo() {
        if (this.ativo) return;

        const caixa = document.getElementById("caixaEsquiva");
        if (!caixa) return;

        this.ativo = true;
        this.tipoAtual = "ARCO_FOGO";

        const W = caixa.clientWidth;
        const H = caixa.clientHeight;
        const e = document.createElement("img");

        e.src = "assets/imagens/fogo.png";
        Object.assign(e.style, {
            position: "absolute",
            left: `${-W * 1.35}px`,
            top: `${-H * 0.35}px`,
            width: `${W * 1.25}px`,
            height: `${H * 1.7}px`,
            objectFit: "fill",
            zIndex: "800",
            pointerEvents: "none",
            filter: "drop-shadow(0 0 18px #ff4500)"
        });
        caixa.appendChild(e);

        let x = -W * 1.35;
        const mover = () => {
            if (!this.ativo || !Batalha.ativa) {
                e.remove();
                return;
            }

            x += Math.max(12, W / 18);
            e.style.left = `${x}px`;
            this.criarHitboxRetangulo(e, true);

            if (x < W * 1.15) {
                requestAnimationFrame(mover);
            } else {
                e.remove();
                this.finalizarTurno();
            }
        };

        requestAnimationFrame(mover);
    },


    executarEspadasSangue() {
        if (this.ativo) return;

        const caixa = document.getElementById("caixaEsquiva");
        if (!caixa) return;

        this.ativo = true;
        this.tipoAtual = "ESPADAS_SANGUE";

        const total = 7;
        for (let i = 0; i < total; i++) {
            setTimeout(() => {
                if (!this.ativo || !Batalha.ativa) return;

                const espada = document.createElement("img");
                espada.src = "assets/imagens/batalha_imagens/bruno/espada.png";

                const angulo = Math.random() * Math.PI * 2;
                const raio = Math.max(caixa.clientWidth, caixa.clientHeight) * 0.72;
                let x = caixa.clientWidth / 2 + Math.cos(angulo) * raio;
                let y = caixa.clientHeight / 2 + Math.sin(angulo) * raio;

                Object.assign(espada.style, {
                    position: "absolute",
                    width: "52px",
                    height: "130px",
                    left: `${x - 26}px`,
                    top: `${y - 65}px`,
                    transform: `rotate(${angulo * 180 / Math.PI + 90}deg)`,
                    zIndex: "850",
                    pointerEvents: "none"
                });
                caixa.appendChild(espada);

                let t = 0;
                const mover = () => {
                    if (!espada.isConnected || !this.ativo) return;

                    t += 0.055;
                    x += (caixa.clientWidth / 2 - x) * 0.075;
                    y += (caixa.clientHeight / 2 - y) * 0.075;

                    espada.style.left = `${x - 26}px`;
                    espada.style.top = `${y - 65}px`;

                    const c = Coracao?.elemento?.getBoundingClientRect();
                    const r = espada.getBoundingClientRect();

                    if (
                        c &&
                        r.left < c.right && r.right > c.left &&
                        r.top < c.bottom && r.bottom > c.top &&
                        !espada.dataset.hit
                    ) {
                        espada.dataset.hit = "1";
                        this.danoMascaraSeguro();
                        this.tocarAudio(
                            "assets/audio/audio_batalha/bruno/bruno-corte.mp3",
                            0.9
                        );
                    }

                    if (t < 1) requestAnimationFrame(mover);
                    else espada.remove();
                };

                requestAnimationFrame(mover);
            }, i * 280);
        }

        setTimeout(() => this.finalizarTurno(), 2700);
    },


    executarConjuntoEspadas() {
        if (this.ativo) return;

        const caixa = document.getElementById("caixaEsquiva");
        if (!caixa) return;

        this.ativo = true;
        this.tipoAtual = "CONJUNTO_ESPADAS";

        const total = 12;
        const cx = caixa.clientWidth / 2;
        const cy = caixa.clientHeight / 2;
        const raio = Math.min(cx, cy) * 0.88;

        for (let i = 0; i < total; i++) {
            const a = 2 * Math.PI * i / total;
            const espada = document.createElement("img");
            espada.src = "assets/imagens/batalha_imagens/bruno/espada.png";

            Object.assign(espada.style, {
                position: "absolute",
                width: "48px",
                height: "120px",
                left: `${cx + Math.cos(a) * raio - 24}px`,
                top: `${cy + Math.sin(a) * raio - 60}px`,
                transform: `rotate(${a * 180 / Math.PI + 90}deg)`,
                zIndex: "800",
                pointerEvents: "none"
            });
            caixa.appendChild(espada);

            // O espaço entre espadas é preservado.
            setTimeout(() => {
                let t = 0;
                const mover = () => {
                    if (!espada.isConnected || !this.ativo) return;

                    t += 0.035;
                    const r = raio * (1 - Math.min(1, t * 0.92));
                    espada.style.left =
                        `${cx + Math.cos(a) * r - 24}px`;
                    espada.style.top =
                        `${cy + Math.sin(a) * r - 60}px`;

                    const c = Coracao?.elemento?.getBoundingClientRect();
                    const sr = espada.getBoundingClientRect();
                    if (
                        c &&
                        sr.left < c.right && sr.right > c.left &&
                        sr.top < c.bottom && sr.bottom > c.top &&
                        !espada.dataset.hit
                    ) {
                        espada.dataset.hit = "1";
                        this.danoMascaraSeguro();
                    }

                    if (t < 1) requestAnimationFrame(mover);
                    else espada.remove();
                };
                requestAnimationFrame(mover);
            }, i * 80);
        }

        setTimeout(() => this.finalizarTurno(), 2100);
    },


    executarTridenteSangue() {
        if (this.ativo) return;

        const caixa = document.getElementById("caixaEsquiva");
        if (!caixa) return;

        this.ativo = true;
        this.tipoAtual = "TRIDENTE_SANGUE";

        // Tridente é desenhado em CSS para não depender de um asset inexistente.
        const tridente = document.createElement("div");
        tridente.textContent = "🔱";
        Object.assign(tridente.style, {
            position: "absolute",
            left: `${caixa.clientWidth / 2 - 55}px`,
            top: "-145px",
            fontSize: "110px",
            lineHeight: "1",
            zIndex: "900",
            pointerEvents: "none",
            filter: "hue-rotate(285deg) saturate(6) drop-shadow(0 0 12px red)"
        });
        caixa.appendChild(tridente);

        let y = -145;
        let movimento = 0;

        const mover = () => {
            if (!this.ativo || !Batalha.ativa) {
                tridente.remove();
                return;
            }

            y += 9;
            movimento += 0.08;

            // Espaço entre as pontas: o corpo do tridente fica acima,
            // enquanto a área perigosa é definida pelas três linhas.
            tridente.style.top = `${y}px`;
            tridente.style.transform =
                `translateX(${Math.sin(movimento) * 55}px) rotate(${Math.sin(movimento / 2) * 4}deg)`;

            const c = Coracao?.elemento?.getBoundingClientRect();
            const r = tridente.getBoundingClientRect();

            if (
                c &&
                r.left < c.right && r.right > c.left &&
                r.top < c.bottom && r.bottom > c.top &&
                !tridente.dataset.hit
            ) {
                tridente.dataset.hit = "1";
                this.danoMascaraSeguro();
            }

            if (y < caixa.clientHeight + 80) {
                requestAnimationFrame(mover);
            } else {
                tridente.remove();
                this.finalizarTurno();
            }
        };

        requestAnimationFrame(mover);
    },


    executarRetrocesso() {
        if (this.ativo) return;

        const caixa = document.getElementById("caixaEsquiva");
        if (!caixa) return;

        this.ativo = true;
        this.tipoAtual = "RETROCESSO";
        this.trocaAtaqueAtivo = true;

        const normais = [
            () => this.executarRaio(),
            () => this.executarRitual(),
            () => this.executarArma(),
            () => this.executarCortes()
        ];

        const antes = new Set(caixa.children);
        const ataque = normais[Math.floor(Math.random() * normais.length)];

        this.ativo = false;
        ataque();

        // O ataque já acontece normalmente. Depois o estalo faz todos os
        // elementos criados desde "antes" voltarem visualmente.
        setTimeout(() => {
            if (!Batalha.ativa) return;

            this.tocarAudio(
                "assets/audio/audio_batalha/bruno/mudanca.mp3",
                0.8
            );

            caixa.animate(
                [
                    { filter: "brightness(1)" },
                    { filter: "brightness(2.5)" },
                    { filter: "brightness(1)" }
                ],
                { duration: 450 }
            );

            [...caixa.children].forEach(el => {
                if (antes.has(el) || el === Coracao?.elemento) return;

                const transform = el.style.transform || "";
                el.animate(
                    [
                        { opacity: 1, transform },
                        {
                            opacity: 0.35,
                            transform: `${transform} scale(.55) translate(-35px,-35px)`
                        },
                        { opacity: 0, transform }
                    ],
                    { duration: 650, fill: "forwards" }
                );
            });

            setTimeout(() => {
                this.removerAtaquesCortes();
                this.trocaAtaqueAtivo = false;
                this.ativo = false;
                this.finalizarTurno();
            }, 720);
        }, 1500);
    },


    iniciarGolpeFinal() {
        if (this.golpeFinalAtivo || !Batalha.ativa) return;

        this.golpeFinalAtivo = true;
        this.ativo = true;
        this.tipoAtual = "GOLPE_FINAL";

        const caixa = document.getElementById("caixaEsquiva");
        if (!caixa) {
            this.terminarGolpeFinal();
            return;
        }

        // =================================================
        // ETAPA 1: MUITOS RAIOS + CORTE DA CAIXA ACELERADO
        // =================================================
        const etapa1 = () => {
            let raios = 0;

            const raio = () => {
                if (!this.golpeFinalAtivo || !Batalha.ativa) return;

                if (raios++ >= 34) {
                    setTimeout(() => {
                        if (this.golpeFinalAtivo) this.executarCorteFinalRapido(etapa2);
                    }, 100);
                    return;
                }

                const e = document.createElement("img");
                e.src = this.raioGif;
                Object.assign(e.style, {
                    position: "absolute",
                    left: `${Math.random() * Math.max(1, caixa.clientWidth - 50)}px`,
                    top: "-25px",
                    width: "50px",
                    height: `${caixa.clientHeight + 50}px`,
                    objectFit: "cover",
                    zIndex: "980",
                    pointerEvents: "none"
                });
                caixa.appendChild(e);
                this.criarHitboxRetangulo(e, true);
                setTimeout(() => e.remove(), 360);
                setTimeout(raio, 55);
            };

            raio();
        };

        // =================================================
        // ETAPA 2: 3 ESPADAS CONTÍNUAS + CORTES /
        // =================================================
        const etapa2 = () => {
            let n = 0;
            const swords = [];

            for (let i = 0; i < 3; i++) {
                const espada = document.createElement("img");
                espada.src = "assets/imagens/batalha_imagens/bruno/espada.png";
                Object.assign(espada.style, {
                    position: "absolute",
                    width: "58px",
                    height: "140px",
                    left: `${20 + i * (caixa.clientWidth / 2 - 30)}px`,
                    top: `${caixa.clientHeight / 2 - 70}px`,
                    zIndex: "950",
                    pointerEvents: "none"
                });
                caixa.appendChild(espada);
                swords.push(espada);
            }

            const loop = () => {
                if (!this.golpeFinalAtivo || !Batalha.ativa) return;

                if (n++ >= 30) {
                    swords.forEach(e => e.remove());
                    this.removerAtaquesCortes();
                    setTimeout(etapa3, 180);
                    return;
                }

                this.criarCorteVisual(
                    caixa,
                    -45,
                    190,
                    12
                );
                this.tocarAudio(
                    "assets/audio/audio_batalha/bruno/bruno-corte.mp3",
                    0.6
                );

                swords.forEach((e, i) => {
                    e.style.left =
                        `${(n * 20 + i * caixa.clientWidth / 3) % caixa.clientWidth - 29}px`;
                });

                setTimeout(loop, 155);
            };

            loop();
        };

        // =================================================
        // ETAPA 3: X GIGANTE DE FOGO GIRANDO + CORTES
        // =================================================
        const etapa3 = () => {
            const cx = caixa.clientWidth / 2;
            const cy = caixa.clientHeight / 2;
            const W = Math.hypot(caixa.clientWidth, caixa.clientHeight) * 1.35;
            const fogo = [];

            for (const angulo of [45, -45]) {
                const e = document.createElement("img");
                e.src = "assets/imagens/fogo.png";
                Object.assign(e.style, {
                    position: "absolute",
                    left: `${cx - W / 2}px`,
                    top: `${cy - 20}px`,
                    width: `${W}px`,
                    height: "40px",
                    objectFit: "cover",
                    zIndex: "970",
                    pointerEvents: "none",
                    transform: `rotate(${angulo}deg)`,
                    transformOrigin: "50% 50%",
                    filter: "drop-shadow(0 0 15px #ff4500)"
                });
                caixa.appendChild(e);
                fogo.push(e);
            }

            let angulo = 0;
            const loop = () => {
                if (!this.golpeFinalAtivo || !Batalha.ativa) return;

                angulo += 0.34;

                fogo[0].style.transform = `rotate(${45 + angulo}deg)`;
                fogo[1].style.transform = `rotate(${-45 + angulo}deg)`;

                this.criarCorteVisual(
                    caixa,
                    angulo,
                    145,
                    11
                );

                if (Math.random() < 0.8) {
                    const p = this.posicaoCoracao();
                    const part = document.createElement("img");
                    part.src = "assets/imagens/fogo.png";
                    Object.assign(part.style, {
                        position: "absolute",
                        left: `${p.x}px`,
                        top: `${p.y}px`,
                        width: "20px",
                        height: "20px",
                        zIndex: "990",
                        pointerEvents: "none"
                    });
                    caixa.appendChild(part);

                    const a = Math.random() * Math.PI * 2;
                    let vida = 0;
                    const mover = () => {
                        vida++;
                        part.style.transform =
                            `translate(${Math.cos(a) * vida * 4}px, ${Math.sin(a) * vida * 4}px) ` +
                            `scale(${Math.max(.05, 1 - vida / 26)})`;
                        part.style.opacity =
                            String(Math.max(0, 1 - vida / 26));

                        if (vida < 26) requestAnimationFrame(mover);
                        else part.remove();
                    };
                    requestAnimationFrame(mover);
                }

                if (angulo < Math.PI * 10) {
                    requestAnimationFrame(loop);
                } else {
                    fogo.forEach(e => e.remove());
                    this.removerAtaquesCortes();
                    this.terminarGolpeFinal();
                }
            };

            requestAnimationFrame(loop);
        };

        etapa1();
    },


    executarCorteFinalRapido(callback) {
        const caixa = document.getElementById("caixaEsquiva");
        if (!caixa) {
            callback();
            return;
        }

        let i = 0;

        const loop = () => {
            if (!this.golpeFinalAtivo || !Batalha.ativa) return;

            if (i++ >= 8) {
                callback();
                return;
            }

            const angulo = [0, 45, -45, 90][Math.floor(Math.random() * 4)];
            const gif = document.createElement("img");
            gif.src = "assets/imagens/batalha_imagens/bruno/cortar.gif";

            Object.assign(gif.style, {
                position: "absolute",
                left: "50%",
                top: "50%",
                width: `${Math.hypot(caixa.clientWidth, caixa.clientHeight) * 1.15}px`,
                height: `${Math.max(caixa.clientWidth, caixa.clientHeight)}px`,
                objectFit: "contain",
                transform: `translate(-50%,-50%) rotate(${angulo}deg)`,
                zIndex: "960",
                pointerEvents: "none"
            });
            caixa.appendChild(gif);

            this.criarCorteHitbox(caixa, angulo, 25, 220, true);
            this.tocarAudio(
                "assets/audio/audio_batalha/bruno/bruno-corte.mp3",
                0.8
            );

            setTimeout(() => gif.remove(), 230);
            setTimeout(loop, 180);
        };

        loop();
    },


    terminarGolpeFinal() {
        if (!this.golpeFinalAtivo) return;

        this.golpeFinalAtivo = false;
        this.ativo = false;

        // A Máscara só morre depois de todas as etapas.
        if (typeof Batalha !== "undefined") {
            Batalha.mascara.hp = 0;
            if (typeof Mascara !== "undefined") Mascara.hp = 0;

            // Morte da Máscara: tela preta + CHAMADO, só depois do golpe final.
            const overlay = document.createElement("div");
            overlay.id = "telaMorteMascara";
            Object.assign(overlay.style, {
                position: "fixed",
                inset: "0",
                background: "#000",
                zIndex: "999999",
                opacity: "0",
                transition: "opacity 180ms ease"
            });
            document.body.appendChild(overlay);
            requestAnimationFrame(() => overlay.style.opacity = "1");

            const audio = new Audio("assets/audio/CHAMADO.mp3");
            audio.volume = 0.85;
            audio.play().catch(() => {});

            setTimeout(() => {
                if (overlay.parentNode) overlay.remove();
                Batalha.vitoria();
            }, 1000);
        }
    },


    // =====================================================
    // FINALIZAR TURNO
    // =====================================================

    finalizarTurno() {

        // Durante a sequência TROCA, o ataque normal pode terminar visualmente,
        // mas o turno continua até os 6 segundos daquela troca.
        if (this.trocaAtaqueAtivo)
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

                this.turnosMascaraConcluidos = (this.turnosMascaraConcluidos || 0) + 1;

                Batalha.terminarTurnoMascara();

            },
            450
        );

    }

};