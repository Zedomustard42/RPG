const BatalhaRender = {

    // =====================================================
    // ORDEM FIXA
    // =====================================================

    ordemPersonagens: [
        "ash",
        "spike",
        "manel"
    ],


    // =====================================================
    // ELEMENTOS
    // =====================================================

    arena: null,
    campo: null,
    camadaRastrosMascara: null,

    interfaceBatalha: null,
    cabecas: null,
    comandos: null,
    tituloComando: null,

    caixaEsquiva: null,

    ataqueMinigame: null,
    ponteiroAtaque: null,
    zonaCentroAtaque: null,
    ataqueAnimacao: null,

    // =====================================================
    // MENU
    // =====================================================

    menuModo: "acao",
    menuIndice: 0,
    menuDados: [],
    menuCallback: null,
    menuVoltar: true,

    personagemSelecionado: "ash",

    mensagemAtiva: false,

    // =====================================================
    // ATAQUE
    // =====================================================

    ataqueAtivo: false,
    ataqueResolvido: false,

    ataquePersonagem: null,

    ataqueMin: 0,
    ataqueMax: 0,

    ataquePosicao: 0,
    ataqueVelocidade: 8,

    // =====================================================
    // MÁSCARA
    // =====================================================

    animacaoMascaraAtiva: false,
    animacaoMascaraFrame: null,
    tempoMascara: 0,

    // Durante o trovão, a Máscara é movida para cima da caixa.
    teleporteTrovaoAtivo: false,
    teleporteTrovaoOriginal: null,

    // Durante os cortes, a posição da Máscara é controlada pelo ataque.
    teleporteCortesAtivo: false,
    teleporteCortesOriginal: null,
    posicaoMascaraCorte: null,

    tamanhoMascara: 280,

    // =====================================================
    // TECLADO
    // =====================================================

    teclasIniciadas: false,

    // =====================================================
    // PERSONAGENS
    // =====================================================

    personagens: {

        ash: {

            nome: "ASH",

            hpMax: 140,

            corHP: "#d80000",

            spriteInicial:
                "assets/imagens/batalha_imagens/ash/ash_lado.png",

            cabeca:
                "assets/imagens/batalha_imagens/cabeças/ash_cabeça.png",

            sprites: {

                atacar:
                    "assets/imagens/batalha_imagens/ash/ash_ataca.png",

                defender:
                    "assets/imagens/batalha_imagens/ash/ash_defesa.png",

                ritual:
                    "assets/imagens/batalha_imagens/ash/ash_livro.png",

                agir:
                    "assets/imagens/batalha_imagens/ash/ash_livro.png"

            }

        },


        spike: {

            nome: "SPIKE",

            hpMax: 100,

            corHP: "#ffd400",

            spriteInicial:
                "assets/imagens/batalha_imagens/spike/spike_lado.png",

            cabeca:
                "assets/imagens/batalha_imagens/cabeças/ovo_cabeça.png",

            sprites: {

                ritual:
                    "assets/imagens/batalha_imagens/spike/spike_livro.png",

                defender:
                    "assets/imagens/batalha_imagens/spike/spike_defesa.png",

                agir:
                    "assets/imagens/batalha_imagens/spike/spike_livro.png"

            }

        },


        manel: {

            nome: "MANEL",

            hpMax: 190,

            corHP: "#ffffff",

            spriteInicial:
                "assets/imagens/batalha_imagens/manel/manel_lado.png",

            cabeca:
                "assets/imagens/batalha_imagens/cabeças/manel_cabeça.png",

            sprites: {

                atacar:
                    "assets/imagens/batalha_imagens/manel/manel_batalha.png",

                defender:
                    "assets/imagens/batalha_imagens/manel/manel_defesa.png",

                ritual:
                    "assets/imagens/batalha_imagens/manel/manel_ritual.png",

                agir:
                    "assets/imagens/batalha_imagens/manel/manel_ritual.png"

            }

        }

    },


    // =====================================================
    // PEGAR PERSONAGEM
    // =====================================================

    pegarPersonagem(id) {

        if (
            typeof Batalha === "undefined"
        )
            return null;

        return Batalha[id] || null;

    },


    // =====================================================
    // LIMPAR
    // =====================================================

    limpar() {

        if (this.ataqueAnimacao) {

            cancelAnimationFrame(
                this.ataqueAnimacao
            );

        }

        this.ataqueAnimacao = null;

        if (this.animacaoMascaraFrame) {

            cancelAnimationFrame(
                this.animacaoMascaraFrame
            );

        }

        this.animacaoMascaraFrame = null;

        this.animacaoMascaraAtiva = false;

        this.ataqueAtivo = false;
        this.ataqueResolvido = false;

        this.mensagemAtiva = false;

        this.tempoMascara = 0;

        if (this.arena) {

            this.arena.innerHTML = "";

        }

    },


    // =====================================================
    // INICIAR
    // =====================================================

    iniciar() {

        console.log(
            "BATALHA RENDER INICIADO"
        );

        this.arena =
            document.getElementById(
                "arena"
            );

        if (!this.arena) {

            console.error(
                "ARENA NÃO ENCONTRADA"
            );

            return;

        }

        this.limpar();

        this.personagemSelecionado =
            "ash";

        this.menuModo =
            "acao";

        this.menuIndice =
            0;

        this.menuDados =
            [];

        this.menuCallback =
            null;

        this.menuVoltar =
            true;

        this.injetarEstilo();

        this.criarCampo();

        this.criarPersonagem("ash");
        this.criarPersonagem("spike");
        this.criarPersonagem("manel");

        this.criarMascara();

        this.criarCaixaEsquiva();

        this.criarInterface();

        this.criarMinigameAtaque();

        this.iniciarTeclado();

        this.resetarSprites();

        this.atualizarCabecas();

        console.log(
            "BATALHA RENDER PRONTO"
        );

    },


    // =====================================================
    // ESTILO
    // =====================================================

    injetarEstilo() {

        const antigo =
            document.getElementById(
                "batalhaRenderStyle"
            );

        if (antigo)
            antigo.remove();


        const style =
            document.createElement(
                "style"
            );

        style.id =
            "batalhaRenderStyle";


        style.textContent = `

            @font-face {

                font-family:
                    "Determination";

                src:
                    url("../assets/fonts/determination.ttf");

            }


            #arena {

                position:
                    relative !important;

                width:
                    100vw !important;

                height:
                    100vh !important;

                min-width:
                    100vw !important;

                min-height:
                    100vh !important;

                max-width:
                    none !important;

                max-height:
                    none !important;

                margin:
                    0 !important;

                padding:
                    0 !important;

                overflow:
                    hidden;

                background:
                    #000;

                color:
                    #fff;

                box-sizing:
                    border-box;

                font-family:
                    "Determination",
                    monospace;

            }


            #arena,
            #arena * {

                font-family:
                    "Determination",
                    monospace;

            }


            /* ==========================================
               CAMPO
            ========================================== */

            #campoBatalha {

                position:
                    absolute;

                inset:
                    0;

                width:
                    100%;

                height:
                    100%;

                overflow:
                    hidden;

                z-index:
                    1;

            }


            /* ==========================================
               CAMADA DOS RASTROS
               SEMPRE ATRÁS DA MÁSCARA
            ========================================== */

            #camadaRastrosMascara {

                position:
                    absolute;

                inset:
                    0;

                width:
                    100%;

                height:
                    100%;

                pointer-events:
                    none;

                overflow:
                    hidden;

                z-index:
                    5;

            }


            .rastroMascara {

                position:
                    absolute !important;

                width:
                    280px !important;

                height:
                    280px !important;

                object-fit:
                    contain;

                image-rendering:
                    pixelated;

                pointer-events:
                    none;

                user-select:
                    none;

                -webkit-user-drag:
                    none;

                opacity:
                    0.20;

                z-index:
                    5 !important;

            }


            /* ==========================================
               PERSONAGENS
            ========================================== */

            .personagemBatalha {

                position:
                    absolute;

                width:
                    190px;

                height:
                    190px;

                display:
                    flex;

                align-items:
                    flex-end;

                justify-content:
                    center;

                pointer-events:
                    none;

                z-index:
                    10;

            }


            #personagem_ash {

                left:
                    100px;

                top:
                    70px;

            }


            #personagem_spike {

                left:
                    100px;

                top:
                    265px;

            }


            #personagem_manel {

                left:
                    100px;

                top:
                    460px;

            }


            .spritePersonagem {

                width:
                    190px;

                height:
                    190px;

                object-fit:
                    contain;

                display:
                    block;

                image-rendering:
                    pixelated;

                user-select:
                    none;

                -webkit-user-drag:
                    none;

            }


            /* ==========================================
               MÁSCARA PRINCIPAL
               MESMO TAMANHO DO RASTRO
            ========================================== */

            #mascaraBatalha {

                position:
                    absolute !important;

                right:
                    90px !important;

                top:
                    120px !important;

                width:
                    280px !important;

                height:
                    280px !important;

                object-fit:
                    contain;

                image-rendering:
                    pixelated;

                user-select:
                    none;

                pointer-events:
                    none;

                z-index:
                    50 !important;

                will-change:
                    transform;

            }


            /* ==========================================
               STATUS
            ========================================== */

            #statusBatalha {

                position:
                    absolute;

                left:
                    30px;

                right:
                    30px;

                bottom:
                    185px;

                height:
                    130px;

                z-index:
                    200;

                pointer-events:
                    none;

            }


            #cabecasBatalha {

                position:
                    absolute;

                left:
                    0;

                right:
                    0;

                top:
                    0;

                height:
                    94px;

                display:
                    flex;

                gap:
                    12px;

                z-index:
                    2;

            }


            .cabecaPersonagem {

                flex:
                    1;

                height:
                    94px;

                display:
                    flex;

                align-items:
                    center;

                gap:
                    10px;

                padding:
                    8px;

                background:
                    #050505;

                color:
                    #fff;

                border:
                    3px solid #fff;

                box-sizing:
                    border-box;

            }


            .cabecaPersonagem.feito {

                opacity:
                    .45;

            }


            .cabecaPersonagem.morto {

                opacity:
                    .25;

            }


            .cabecaPersonagem img {

                width:
                    62px;

                height:
                    62px;

                object-fit:
                    contain;

                image-rendering:
                    pixelated;

                flex:
                    0 0 62px;

            }


            .status-info {

                flex:
                    1;

                min-width:
                    0;

            }


            .status-nome {

                font-size:
                    22px;

                margin-bottom:
                    5px;

            }


            .hp-linha {

                display:
                    flex;

                align-items:
                    center;

                gap:
                    7px;

            }


            .hp-label {

                font-size:
                    18px;

            }


            .hp-trilho {

                flex:
                    1;

                height:
                    18px;

                background:
                    #000;

                border:
                    2px solid #fff;

                overflow:
                    hidden;

            }


            .hp-fill {

                height:
                    100%;

                width:
                    100%;

                transition:
                    width .2s linear;

            }


            .hp-valor {

                width:
                    44px;

                font-size:
                    18px;

                text-align:
                    right;

            }


            /* ==========================================
               PE
            ========================================== */

            #statusBatalha .pe-trilho {

                position:
                    absolute;

                left:
                    0;

                right:
                    0;

                bottom:
                    0;

                height:
                    24px;

                background:
                    #000;

                border:
                    3px solid #fff;

                overflow:
                    hidden;

                z-index:
                    0;

            }


            #statusBatalha .pe-fill {

                width:
                    100%;

                height:
                    100%;

                background:
                    #087cff;

                transition:
                    width .2s linear;

            }


            #statusBatalha .pe-text {

                position:
                    absolute;

                left:
                    50%;

                bottom:
                    0;

                transform:
                    translateX(-50%);

                font-size:
                    17px;

                z-index:
                    5;

                color:
                    #fff;

                text-shadow:
                    2px 2px #000;

            }


            /* ==========================================
               MENU
            ========================================== */

            #interfaceBatalha {

                position:
                    absolute;

                left:
                    30px;

                right:
                    30px;

                bottom:
                    20px;

                height:
                    155px;

                z-index:
                    500;

            }


            #comandosBatalha {

                width:
                    100%;

                height:
                    100%;

                background:
                    #050505;

                border:
                    4px solid #fff;

                padding:
                    10px;

                box-sizing:
                    border-box;

            }


            #tituloComando {

                font-size:
                    25px;

                height:
                    32px;

                margin-bottom:
                    8px;

            }


            #listaComandos {

                display:
                    grid;

                grid-template-columns:
                    repeat(2, 1fr);

                gap:
                    8px;

                height:
                    100px;

            }


            .botaoComando {

                background:
                    #111;

                color:
                    #fff;

                border:
                    3px solid #fff;

                font-size:
                    21px;

                box-sizing:
                    border-box;

            }


            .botaoComando.selecionado {

                background:
                    #fff;

                color:
                    #000;

            }


            /* ==========================================
               CAIXA DO CORAÇÃO
            ========================================== */

            #caixaEsquiva {

                position:
                    absolute;

                left:
                    50%;

                top:
                    50%;

                transform:
                    translate(-50%, -50%);

                width:
                    620px;

                height:
                    360px;

                background:
                    #050505;

                border:
                    5px solid #fff;

                z-index:
                    300;

                display:
                    none;

                overflow:
                    hidden;

            }


            /* ==========================================
               MINIGAME
            ========================================== */

            #minigameAtaque {

                position:
                    absolute;

                left:
                    50%;

                top:
                    50%;

                transform:
                    translate(-50%, -50%);

                width:
                    760px;

                height:
                    220px;

                background:
                    #050505;

                border:
                    5px solid #fff;

                z-index:
                    900;

                display:
                    none;

                flex-direction:
                    column;

                align-items:
                    center;

                padding-top:
                    22px;

                box-sizing:
                    border-box;

            }


            #textoMinigame {

                font-size:
                    30px;

                margin-bottom:
                    25px;

            }


            #barraAtaque {

                width:
                    650px;

                height:
                    32px;

                position:
                    relative;

                background:
                    #222;

                border:
                    3px solid #fff;

                box-sizing:
                    border-box;

            }


            #zonaCentroAtaque {

                position:
                    absolute;

                left:
                    50%;

                top:
                    0;

                transform:
                    translateX(-50%);

                width:
                    110px;

                height:
                    100%;

                border-left:
                    3px solid #fff;

                border-right:
                    3px solid #fff;

                box-sizing:
                    border-box;

            }


            #ponteiroAtaque {

                position:
                    absolute;

                left:
                    0;

                top:
                    -10px;

                width:
                    8px;

                height:
                    52px;

                background:
                    #fff;

            }


            /* ==========================================
               MENSAGEM
            ========================================== */

            #mensagemBatalha {

                position:
                    absolute;

                left:
                    50%;

                bottom:
                    30px;

                transform:
                    translateX(-50%);

                width:
                    90%;

                min-height:
                    120px;

                padding:
                    18px;

                background:
                    #050505;

                border:
                    4px solid #fff;

                z-index:
                    1000;

                font-size:
                    25px;

                white-space:
                    pre-line;

                box-sizing:
                    border-box;

            }


            /* ==========================================
               DANO
            ========================================== */

            .danoFlutuante {

                position:
                    absolute;

                z-index:
                    1100;

                pointer-events:
                    none;

                color:
                    #fff;

                font-size:
                    34px;

                font-weight:
                    bold;

                text-shadow:
                    3px 3px #000;

                animation:
                    danoSubir .9s ease-out forwards;

            }


            .danoFlutuante.cura {

                color:
                    #4dff65;

            }


            @keyframes danoSubir {

                from {

                    opacity:
                        1;

                    transform:
                        translate(-50%, 0)
                        scale(1);

                }

                to {

                    opacity:
                        0;

                    transform:
                        translate(-50%, -70px)
                        scale(1.15);

                }

            }

        `;


        document.head.appendChild(
            style
        );

    },


    // =====================================================
    // CAMPO
    // =====================================================

    criarCampo() {

        this.campo =
            document.createElement(
                "div"
            );

        this.campo.id =
            "campoBatalha";

        this.arena.appendChild(
            this.campo
        );


        // Camada EXCLUSIVA dos rastros.
        // Fica atrás de tudo.

        this.camadaRastrosMascara =
            document.createElement(
                "div"
            );

        this.camadaRastrosMascara.id =
            "camadaRastrosMascara";

        this.campo.appendChild(
            this.camadaRastrosMascara
        );

    },


    // =====================================================
    // PERSONAGEM
    // =====================================================

    criarPersonagem(id) {

        const dados =
            this.personagens[id];

        if (!dados)
            return;


        const elemento =
            document.createElement(
                "div"
            );

        elemento.id =
            "personagem_" +
            id;

        elemento.className =
            "personagemBatalha";


        const imagem =
            document.createElement(
                "img"
            );

        imagem.className =
            "spritePersonagem";

        imagem.src =
            dados.spriteInicial;

        imagem.alt =
            dados.nome;

        imagem.draggable =
            false;


        imagem.onerror =
            () => {

                console.warn(
                    "SPRITE FALHOU:",
                    id,
                    imagem.src
                );

            };


        elemento.appendChild(
            imagem
        );

        this.campo.appendChild(
            elemento
        );

    },


    // =====================================================
    // MÁSCARA
    // =====================================================

    criarMascara() {

        const imagem =
            document.createElement(
                "img"
            );

        imagem.id =
            "mascaraBatalha";

        imagem.className =
            "mascaraBatalha";


        imagem.src =
            "assets/imagens/batalha_imagens/bruno/mascara.png";


        imagem.alt =
            "Máscara";

        imagem.draggable =
            false;


        imagem.onerror =
            () => {

                console.error(
                    "ERRO AO CARREGAR MÁSCARA:",
                    imagem.src
                );

            };


        this.campo.appendChild(
            imagem
        );


        this.iniciarMovimentoMascara();

    },


    // =====================================================
    // MOVIMENTO DA MÁSCARA
    // =====================================================

    iniciarMovimentoMascara() {

        if (
            this.animacaoMascaraAtiva
        )
            return;


        this.animacaoMascaraAtiva =
            true;

        this.tempoMascara =
            0;


        const mover =
            () => {

                const mascara =
                    document.getElementById(
                        "mascaraBatalha"
                    );


                if (
                    !mascara
                ) {

                    this.animacaoMascaraAtiva =
                        false;

                    this.animacaoMascaraFrame =
                        null;

                    return;

                }


                this.tempoMascara +=
                    0.025;


                const movimento =
                    Math.sin(
                        this.tempoMascara
                    ) *
                    18;


                // Durante o trovão, o teleporte controla
                // posição e transformação da Máscara.
                if (
                    !this.teleporteTrovaoAtivo &&
                    !this.teleporteCortesAtivo
                ) {

                    // A máscara principal SEMPRE fica
                    // na frente.

                    mascara.style.transform =
                        `translateY(${movimento}px)`;

                    mascara.style.zIndex =
                        "50";


                    // Pequena chance de criar
                    // um novo rastro.

                    if (
                        Math.random() <
                        0.16
                    ) {

                        this.criarRastroMascara(
                            movimento
                        );

                    }

                }


                this.animacaoMascaraFrame =
                    requestAnimationFrame(
                        mover
                    );

            };


        mover();

    },


    // =====================================================
    // TELEPORTE DO TROVÃO
    // =====================================================

    iniciarTeleporteTrovao() {

        const mascara =
            document.getElementById(
                "mascaraBatalha"
            );

        const caixa =
            document.getElementById(
                "caixaEsquiva"
            );

        const campo =
            this.campo ||
            document.getElementById(
                "campoBatalha"
            );

        if (
            !mascara ||
            !caixa ||
            !campo
        )
            return;


        // Evita iniciar o teleporte duas vezes.
        if (
            this.teleporteTrovaoAtivo
        )
            return;


        this.teleporteTrovaoAtivo =
            true;


        // Guarda exatamente a aparência/posição
        // original para restaurar ao terminar o ataque.
        this.teleporteTrovaoOriginal = {

            src:
                mascara.src,

            right:
                mascara.style.right,

            left:
                mascara.style.left,

            top:
                mascara.style.top,

            width:
                mascara.style.width,

            height:
                mascara.style.height,

            maxWidth:
                mascara.style.maxWidth,

            maxHeight:
                mascara.style.maxHeight,

            transform:
                mascara.style.transform,

            transition:
                mascara.style.transition,

            opacity:
                mascara.style.opacity,

            zIndex:
                mascara.style.zIndex

        };


        // A pose usada durante o ataque de trovão.
        mascara.src =
            "assets/imagens/batalha_imagens/bruno/bruno-trovao.png";


        // Mede a caixa e posiciona Bruno no centro,
        // imediatamente acima da borda superior.
        const caixaRect =
            caixa.getBoundingClientRect();

        const campoRect =
            campo.getBoundingClientRect();

        const largura =
            Math.min(
                250,
                campoRect.width * 0.22
            );

        const proporcao =
            1351 / 1164;

        const altura =
            largura * proporcao;


        const esquerda =
            (
                caixaRect.left -
                campoRect.left +
                caixaRect.width / 2 -
                largura / 2
            );


        const topo =
            (
                caixaRect.top -
                campoRect.top -
                altura -
                12
            );


        // Começa invisível: o som marca o teleporte.
        mascara.style.transition =
            "opacity .10s ease-out, transform .10s ease-out";

        mascara.style.opacity =
            "0";

        mascara.style.right =
            "auto";

        mascara.style.left =
            esquerda + "px";

        mascara.style.top =
            topo + "px";

        mascara.style.width =
            largura + "px";

        mascara.style.height =
            altura + "px";

        mascara.style.maxWidth =
            "none";

        mascara.style.maxHeight =
            "none";

        mascara.style.transform =
            "scale(0.35)";

        mascara.style.zIndex =
            "10020";


        // Som do teleporte.
        try {

            const som =
                new Audio(
                    "assets/audio/audio_batalha/bruno/teleporte.mp3"
                );

            som.volume = 1;
            som.currentTime = 0;

            som.play().catch(
                erro =>
                    console.warn(
                        "Não foi possível tocar o som do teleporte:",
                        erro
                    )
            );

        }
        catch (erro) {

            console.error(
                "Erro ao tocar o som do teleporte:",
                erro
            );

        }


        // Teleporta e reaparece rapidamente.
        requestAnimationFrame(
            () => {

                requestAnimationFrame(
                    () => {

                        mascara.style.opacity =
                            "1";

                        mascara.style.transform =
                            "scale(1)";

                    }
                );

            }
        );

    },


    finalizarTeleporteTrovao() {

        const mascara =
            document.getElementById(
                "mascaraBatalha"
            );

        const original =
            this.teleporteTrovaoOriginal;


        if (
            !mascara ||
            !original
        ) {

            this.teleporteTrovaoAtivo =
                false;

            this.teleporteTrovaoOriginal =
                null;

            return;

        }


        // Pequeno desaparecimento antes de voltar
        // à posição normal.
        mascara.style.transition =
            "opacity .10s ease-out, transform .10s ease-out";

        mascara.style.opacity =
            "0";

        mascara.style.transform =
            "scale(0.35)";


        setTimeout(
            () => {

                if (
                    !mascara
                )
                    return;


                mascara.src =
                    original.src;

                mascara.style.right =
                    original.right;

                mascara.style.left =
                    original.left;

                mascara.style.top =
                    original.top;

                mascara.style.width =
                    original.width;

                mascara.style.height =
                    original.height;

                mascara.style.maxWidth =
                    original.maxWidth;

                mascara.style.maxHeight =
                    original.maxHeight;

                mascara.style.transform =
                    original.transform;

                mascara.style.transition =
                    original.transition;

                mascara.style.opacity =
                    original.opacity;

                mascara.style.zIndex =
                    original.zIndex;


                this.teleporteTrovaoAtivo =
                    false;

                this.teleporteTrovaoOriginal =
                    null;

            },
            120
        );

    },


    // =====================================================
    // SPRITES / GIRO DOS CORTES
    // =====================================================

    trocarSpriteMascara(caminho) {

        const mascara =
            document.getElementById(
                "mascaraBatalha"
            );

        if (!mascara)
            return;

        mascara.src = caminho;

    },


    iniciarGiroCorte() {

        if (!document.getElementById("keyframesGiroAtaqueCorte")) {

            const estilo = document.createElement("style");
            estilo.id = "keyframesGiroAtaqueCorte";
            estilo.textContent = `
                @keyframes giroAtaqueCorte {
                    from { transform: rotate(var(--angulo-corte)); }
                    to { transform: rotate(calc(var(--angulo-corte) + 360deg)); }
                }
            `;
            document.head.appendChild(estilo);

        }

        const indicadores =
            document.querySelectorAll(".indicadorCorte");

        indicadores.forEach((linha) => {

            const transform = linha.style.transform || "rotate(0deg)";
            const match = transform.match(/rotate\((-?[0-9.]+)deg\)/);
            const angulo = match ? match[1] : "0";

            linha.style.setProperty(
                "--angulo-corte",
                `${angulo}deg`
            );

            linha.style.animation =
                "giroAtaqueCorte 2.2s linear infinite";

        });

    },


    pararGiroCorte() {

        const indicadores =
            document.querySelectorAll(".indicadorCorte");

        indicadores.forEach((linha) => {

            linha.style.animation = "";

        });

    },


    // =====================================================
    // TELEPORTE / MOVIMENTO DA MÁSCARA DURANTE CORTES
    // =====================================================

    iniciarTeleporteCortes() {

        const mascara = document.getElementById("mascaraBatalha");
        const caixa = document.getElementById("caixaEsquiva");
        const campo = this.campo || document.getElementById("campoBatalha");

        if (!mascara || !caixa || !campo || this.teleporteCortesAtivo)
            return;

        const mascaraRect = mascara.getBoundingClientRect();
        const caixaRect = caixa.getBoundingClientRect();
        const campoRect = campo.getBoundingClientRect();

        this.teleporteCortesAtivo = true;

        this.teleporteCortesOriginal = {
            src: mascara.src,
            left: mascara.style.left,
            right: mascara.style.right,
            top: mascara.style.top,
            width: mascara.style.width,
            height: mascara.style.height,
            maxWidth: mascara.style.maxWidth,
            maxHeight: mascara.style.maxHeight,
            transform: mascara.style.transform,
            transition: mascara.style.transition,
            opacity: mascara.style.opacity,
            zIndex: mascara.style.zIndex
        };

        const mascaraCentro = mascaraRect.left + mascaraRect.width / 2;
        const caixaCentro = caixaRect.left + caixaRect.width / 2;
        const estaNaDireita = mascaraCentro > caixaCentro;

        const largura = mascaraRect.width || 280;
        const altura = mascaraRect.height || 280;

        let x;
        if (estaNaDireita) {
            x = caixaRect.left - campoRect.left - largura - 25;
        } else {
            x = caixaRect.right - campoRect.left + 25;
        }

        const y =
            caixaRect.top - campoRect.top +
            caixaRect.height / 2 -
            altura / 2;

        this.posicaoMascaraCorte = { x, y, lado: 1 };

        mascara.style.left = `${x}px`;
        mascara.style.right = "auto";
        mascara.style.top = `${y}px`;
        mascara.style.zIndex = "10000";
        mascara.style.transition = "opacity .12s ease, transform .12s ease";
        mascara.style.opacity = "0";
        mascara.style.transform = "scale(.25)";

        const som = new Audio(
            "assets/audio/audio_batalha/bruno/teleporte.mp3"
        );
        som.volume = 1;
        som.currentTime = 0;
        som.play().catch(() => {});

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                mascara.style.opacity = "1";
                mascara.style.transform = "scale(1)";
            });
        });

    },


    moverMascaraCorte() {

        const mascara = document.getElementById("mascaraBatalha");

        if (!mascara || !this.posicaoMascaraCorte)
            return;

        const deslocamento = 42;
        this.posicaoMascaraCorte.lado *= -1;
        this.posicaoMascaraCorte.x +=
            deslocamento * this.posicaoMascaraCorte.lado;

        mascara.style.transition = "left .16s ease, transform .12s ease";
        mascara.style.left = `${this.posicaoMascaraCorte.x}px`;
        mascara.style.transform = "scale(1.04)";

        setTimeout(() => {
            if (mascara && this.teleporteCortesAtivo)
                mascara.style.transform = "scale(1)";
        }, 120);

    },


    finalizarTeleporteCortes() {

        const mascara = document.getElementById("mascaraBatalha");
        const original = this.teleporteCortesOriginal;

        if (!mascara || !original) {
            this.teleporteCortesAtivo = false;
            this.teleporteCortesOriginal = null;
            this.posicaoMascaraCorte = null;
            return;
        }

        mascara.style.transition = "opacity .12s ease, transform .12s ease";
        mascara.style.opacity = "0";
        mascara.style.transform = "scale(.25)";

        const som = new Audio(
            "assets/audio/audio_batalha/bruno/teleporte.mp3"
        );
        som.volume = 1;
        som.currentTime = 0;
        som.play().catch(() => {});

        setTimeout(() => {

            mascara.src = original.src;
            mascara.style.right = original.right;
            mascara.style.left = original.left;
            mascara.style.top = original.top;
            mascara.style.width = original.width;
            mascara.style.height = original.height;
            mascara.style.maxWidth = original.maxWidth;
            mascara.style.maxHeight = original.maxHeight;
            mascara.style.transform = original.transform;
            mascara.style.transition = original.transition;
            mascara.style.opacity = original.opacity;
            mascara.style.zIndex = original.zIndex;

            this.teleporteCortesAtivo = false;
            this.teleporteCortesOriginal = null;
            this.posicaoMascaraCorte = null;

        }, 130);

    },


    // =====================================================
    // RASTRO
    // =====================================================

    criarRastroMascara(
        movimento
    ) {

        if (
            !this.camadaRastrosMascara
        )
            return;


        const rastro =
            document.createElement(
                "img"
            );


        rastro.className =
            "rastroMascara";


        rastro.src =
            "assets/imagens/batalha_imagens/bruno/mascara.png";


        rastro.alt =
            "";

        rastro.draggable =
            false;


        // MESMA posição da máscara.

        rastro.style.right =
            "90px";

        rastro.style.top =
            "120px";


        // MESMO TAMANHO da máscara.

        rastro.style.width =
            this.tamanhoMascara +
            "px";

        rastro.style.height =
            this.tamanhoMascara +
            "px";


        rastro.style.transform =
            `translateY(${movimento}px)`;


        // IMPORTANTE:
        // fica dentro da camada de rastros,
        // que está atrás da máscara.

        rastro.style.zIndex =
            "5";


        rastro.style.opacity =
            "0.20";


        rastro.style.transition =
            "opacity .65s ease-out, transform .65s ease-out";


        this.camadaRastrosMascara.appendChild(
            rastro
        );


        requestAnimationFrame(
            () => {

                rastro.style.opacity =
                    "0";


                rastro.style.transform =
                    `translateY(${movimento + 28}px) scale(1.02)`;

            }
        );


        setTimeout(
            () => {

                if (
                    rastro.parentNode
                ) {

                    rastro.remove();

                }

            },
            700
        );

    },


    // =====================================================
    // INTERFACE
    // =====================================================

    criarInterface() {

        this.interfaceBatalha =
            document.createElement(
                "div"
            );

        this.interfaceBatalha.id =
            "interfaceBatalha";


        this.comandos =
            document.createElement(
                "div"
            );

        this.comandos.id =
            "comandosBatalha";


        this.tituloComando =
            document.createElement(
                "div"
            );

        this.tituloComando.id =
            "tituloComando";


        this.comandos.appendChild(
            this.tituloComando
        );


        const lista =
            document.createElement(
                "div"
            );

        lista.id =
            "listaComandos";


        this.comandos.appendChild(
            lista
        );


        this.interfaceBatalha.appendChild(
            this.comandos
        );


        this.arena.appendChild(
            this.interfaceBatalha
        );


        // =================================================
        // STATUS
        // =================================================

        const status =
            document.createElement(
                "div"
            );

        status.id =
            "statusBatalha";


        const peBar =
            document.createElement(
                "div"
            );

        peBar.className =
            "pe-trilho";


        const peFill =
            document.createElement(
                "div"
            );

        peFill.id =
            "peFillBatalha";

        peFill.className =
            "pe-fill";


        peBar.appendChild(
            peFill
        );

        status.appendChild(
            peBar
        );


        const peText =
            document.createElement(
                "div"
            );

        peText.id =
            "peTextoBatalha";

        peText.className =
            "pe-text";


        status.appendChild(
            peText
        );


        this.cabecas =
            document.createElement(
                "div"
            );

        this.cabecas.id =
            "cabecasBatalha";


        this.criarCabeca("ash");
        this.criarCabeca("spike");
        this.criarCabeca("manel");


        status.appendChild(
            this.cabecas
        );


        this.arena.appendChild(
            status
        );

    },


    // =====================================================
    // CABEÇA / STATUS
    // =====================================================

    criarCabeca(id) {

        const dados =
            this.personagens[id];

        if (!dados)
            return;


        const botao =
            document.createElement(
                "button"
            );

        botao.className =
            "cabecaPersonagem";

        botao.dataset.personagem =
            id;

        botao.type =
            "button";


        const imagem =
            document.createElement(
                "img"
            );

        imagem.src =
            dados.cabeca;

        imagem.alt =
            dados.nome;

        imagem.draggable =
            false;


        const info =
            document.createElement(
                "div"
            );

        info.className =
            "status-info";


        const nome =
            document.createElement(
                "div"
            );

        nome.className =
            "status-nome";

        nome.textContent =
            dados.nome;


        info.appendChild(
            nome
        );


        const linha =
            document.createElement(
                "div"
            );

        linha.className =
            "hp-linha";


        const label =
            document.createElement(
                "span"
            );

        label.className =
            "hp-label";

        label.textContent =
            "HP:";


        linha.appendChild(
            label
        );


        const trilho =
            document.createElement(
                "div"
            );

        trilho.className =
            "hp-trilho";


        const fill =
            document.createElement(
                "div"
            );

        fill.id =
            "hpBar_" +
            id;

        fill.className =
            "hp-fill";

        fill.style.background =
            dados.corHP;


        trilho.appendChild(
            fill
        );

        linha.appendChild(
            trilho
        );


        const valor =
            document.createElement(
                "span"
            );

        valor.id =
            "hpValor_" +
            id;

        valor.className =
            "hp-valor";


        linha.appendChild(
            valor
        );


        info.appendChild(
            linha
        );


        botao.appendChild(
            imagem
        );

        botao.appendChild(
            info
        );


        this.cabecas.appendChild(
            botao
        );

    },


    // =====================================================
    // AÇÕES
    // =====================================================

    obterAcoes(id) {

        if (id === "ash") {

            return [

                {
                    nome:
                        "ATACAR",

                    acao:
                        "atacar"
                },

                {
                    nome:
                        "RITUAL",

                    acao:
                        "ritual"
                },

                {
                    nome:
                        "DEFENDER",

                    acao:
                        "defender"
                },

                {
                    nome:
                        "AGIR",

                    acao:
                        "agir"
                }

            ];

        }


        if (id === "spike") {

            return [

                {
                    nome:
                        "RITUAL",

                    acao:
                        "ritual"
                },

                {
                    nome:
                        "DEFENDER",

                    acao:
                        "defender"
                },

                {
                    nome:
                        "AGIR",

                    acao:
                        "agir"
                }

            ];

        }


        return [

            {
                nome:
                    "ATACAR",

                acao:
                    "atacar"
            },

            {
                nome:
                    "DEFENDER",

                acao:
                    "defender"
            },

            {
                nome:
                    "AGIR",

                acao:
                    "agir"
            }

        ];

    },


    // =====================================================
    // PERSONAGEM ATUAL
    // =====================================================

    obterPersonagemAtual() {

        for (
            const id of
            this.ordemPersonagens
        ) {

            const p =
                this.pegarPersonagem(id);


            if (
                p &&
                p.hp > 0 &&
                !Batalha.personagensAgiram[id]
            ) {

                return id;

            }

        }


        return null;

    },


    // =====================================================
    // MENU PERSONAGEM
    // =====================================================

    mostrarMenuPersonagens() {

        if (
            typeof Batalha ===
                "undefined" ||
            !Batalha.ativa
        )
            return;


        const id =
            this.obterPersonagemAtual();


        if (!id)
            return;


        this.abrirAcoes(
            id
        );

    },


    // =====================================================
    // ABRIR AÇÕES
    // =====================================================

    abrirAcoes(id) {

        if (
            typeof Batalha ===
                "undefined" ||
            !Batalha.ativa
        )
            return;


        const p =
            this.pegarPersonagem(
                id
            );


        if (
            !p ||
            p.hp <= 0
        )
            return;


        if (
            Batalha.personagensAgiram[id]
        )
            return;


        this.personagemSelecionado =
            id;


        this.menuModo =
            "acao";


        this.menuDados =
            this.obterAcoes(
                id
            );


        this.menuIndice =
            0;


        this.mensagemAtiva =
            false;


        this.mostrarMenuAcoes();

    },


    // =====================================================
    // MENU ATUAL
    // =====================================================

    mostrarMenuAtual() {

        if (!this.comandos)
            return;


        const lista =
            this.comandos.querySelector(
                "#listaComandos"
            );


        if (!lista)
            return;


        lista.innerHTML =
            "";


        if (
            this.menuModo ===
            "acao"
        ) {

            const dados =
                this.personagens[
                    this.personagemSelecionado
                ];


            if (!dados)
                return;


            this.tituloComando.textContent =
                dados.nome;


            this.menuDados.forEach(
                (
                    item,
                    index
                ) => {

                    const botao =
                        document.createElement(
                            "button"
                        );

                    botao.className =
                        "botaoComando";


                    if (
                        index ===
                        this.menuIndice
                    ) {

                        botao.classList.add(
                            "selecionado"
                        );

                    }


                    botao.textContent =
                        item.nome;


                    lista.appendChild(
                        botao
                    );

                }
            );


            this.atualizarCabecas();

            return;

        }


        if (
            this.menuModo ===
            "submenu"
        ) {

            this.atualizarSubmenu();

        }

    },


    // =====================================================
    // SUBMENU
    // =====================================================

    mostrarEscolhaGenerica(
        titulo,
        itens,
        callback,
        voltar = true
    ) {

        if (!this.comandos)
            return;


        this.menuModo =
            "submenu";


        this.menuIndice =
            0;


        this.menuDados =
            Array.isArray(itens)
                ? itens
                : [];


        this.menuCallback =
            callback;


        this.menuVoltar =
            voltar;


        this.tituloComando.textContent =
            titulo;


        this.atualizarSubmenu();

    },


    atualizarSubmenu() {

        if (!this.comandos)
            return;


        const lista =
            this.comandos.querySelector(
                "#listaComandos"
            );


        if (!lista)
            return;


        lista.innerHTML =
            "";


        this.menuDados.forEach(
            (
                item,
                index
            ) => {

                const botao =
                    document.createElement(
                        "button"
                    );

                botao.className =
                    "botaoComando";


                if (
                    index ===
                    this.menuIndice
                ) {

                    botao.classList.add(
                        "selecionado"
                    );

                }


                botao.textContent =
                    item.nome;


                lista.appendChild(
                    botao
                );

            }
        );


        if (
            this.menuVoltar
        ) {

            const botao =
                document.createElement(
                    "button"
                );

            botao.className =
                "botaoComando";


            if (
                this.menuIndice ===
                this.menuDados.length
            ) {

                botao.classList.add(
                    "selecionado"
                );

            }


            botao.textContent =
                "VOLTAR";


            lista.appendChild(
                botao
            );

        }

    },


    executarSubmenu() {

        if (
            this.menuIndice >=
            this.menuDados.length
        ) {

            this.abrirAcoes(
                this.personagemSelecionado
            );

            return;

        }


        const item =
            this.menuDados[
                this.menuIndice
            ];


        if (
            item &&
            typeof this.menuCallback ===
                "function"
        ) {

            this.menuCallback(
                item.valor
            );

        }

    },


    // =====================================================
    // EXECUTAR COMANDO
    // =====================================================

    executarComando(acao) {

        if (
            typeof Batalha ===
                "undefined" ||
            !Batalha.ativa
        )
            return;


        const id =
            this.personagemSelecionado;


        if (
            Batalha.personagensAgiram[id]
        )
            return;


        if (
            acao ===
            "atacar"
        ) {

            Batalha.prepararAtaque(
                id
            );

            return;

        }


        if (
            acao ===
            "ritual"
        ) {

            if (id === "ash") {

                Batalha.mostrarRituaisAsh();

            }

            else {

                Batalha.mostrarRituaisSpike();

            }

            return;

        }


        if (
            acao ===
            "defender"
        ) {

            Batalha.defender(
                id
            );

            return;

        }


        if (
            acao ===
            "agir"
        ) {

            if (id === "ash") {

                Batalha.mostrarAgirAsh();

            }

            else if (id === "spike") {

                Batalha.mostrarAgirSpike();

            }

            else {

                Batalha.mostrarAgirManel();

            }

        }

    },


    // =====================================================
    // MOSTRAR / ESCONDER MENU
    // =====================================================

    mostrarMenuAcoes() {

        if (
            this.interfaceBatalha
        ) {

            this.interfaceBatalha.style.display =
                "block";

        }


        this.mostrarMenuAtual();

    },


    esconderMenuAcoes() {

        if (
            this.interfaceBatalha
        ) {

            this.interfaceBatalha.style.display =
                "none";

        }

    },


    // =====================================================
    // MINIGAME
    // =====================================================

    criarMinigameAtaque() {

        this.ataqueMinigame =
            document.createElement(
                "div"
            );


        this.ataqueMinigame.id =
            "minigameAtaque";


        this.ataqueMinigame.innerHTML = `

            <div id="textoMinigame">
                APERTE ENTER NO MEIO!
            </div>

            <div id="barraAtaque">

                <div id="zonaCentroAtaque"></div>

                <div id="ponteiroAtaque"></div>

            </div>

        `;


        this.arena.appendChild(
            this.ataqueMinigame
        );


        this.ponteiroAtaque =
            this.ataqueMinigame.querySelector(
                "#ponteiroAtaque"
            );


        this.zonaCentroAtaque =
            this.ataqueMinigame.querySelector(
                "#zonaCentroAtaque"
            );

    },


    iniciarBarraAtaque(
        id,
        min,
        max
    ) {

        if (
            this.ataqueAtivo
        )
            return;


        if (
            !this.ataqueMinigame
        )
            return;


        this.ataqueAtivo =
            true;

        this.ataqueResolvido =
            false;

        this.ataquePersonagem =
            id;

        this.ataqueMin =
            min;

        this.ataqueMax =
            max;

        this.ataquePosicao =
            0;


        this.esconderMenuAcoes();


        this.ataqueMinigame.style.display =
            "flex";


        this.atualizarPonteiroAtaque();


        this.animarAtaque();

    },


    animarAtaque() {

        if (
            !this.ataqueAtivo ||
            this.ataqueResolvido
        )
            return;


        const barra =
            document.getElementById(
                "barraAtaque"
            );


        if (!barra)
            return;


        const limite =
            Math.max(
                0,
                barra.clientWidth - 8
            );


        this.ataquePosicao +=
            this.ataqueVelocidade;


        if (
            this.ataquePosicao >=
            limite
        ) {

            this.ataquePosicao =
                limite;


            this.atualizarPonteiroAtaque();


            this.finalizarBarraAtaque(
                true
            );

            return;

        }


        this.atualizarPonteiroAtaque();


        this.ataqueAnimacao =
            requestAnimationFrame(
                () =>
                    this.animarAtaque()
            );

    },


    atualizarPonteiroAtaque() {

        if (
            this.ponteiroAtaque
        ) {

            this.ponteiroAtaque.style.left =
                this.ataquePosicao +
                "px";

        }

    },


    finalizarBarraAtaque(
        errou = false
    ) {

        if (
            !this.ataqueAtivo ||
            this.ataqueResolvido
        )
            return;


        this.ataqueResolvido =
            true;

        this.ataqueAtivo =
            false;


        if (
            this.ataqueAnimacao
        ) {

            cancelAnimationFrame(
                this.ataqueAnimacao
            );

        }


        this.ataqueAnimacao =
            null;


        const id =
            this.ataquePersonagem;


        let precisao =
            0;


        if (!errou) {

            const barra =
                document.getElementById(
                    "barraAtaque"
                );


            if (barra) {

                const centro =
                    barra.clientWidth / 2;


                const ponteiro =
                    this.ataquePosicao +
                    4;


                precisao =
                    1 -
                    (
                        Math.abs(
                            ponteiro -
                            centro
                        ) /
                        (
                            barra.clientWidth / 2
                        )
                    );


                precisao =
                    Math.max(
                        0,
                        Math.min(
                            1,
                            precisao
                        )
                    );

            }

        }


        if (
            this.ataqueMinigame
        ) {

            this.ataqueMinigame.style.display =
                "none";

        }


        if (errou) {

            this.mostrarDanoTexto(
                "ERROU!",
                "#fff",
                "#personagem_" + id
            );

        }


        if (
            typeof Batalha !==
                "undefined" &&
            typeof Batalha.executarAtaqueComPrecisao ===
                "function"
        ) {

            Batalha.executarAtaqueComPrecisao(
                id,
                precisao,
                errou
            );

        }

    },


    // =====================================================
    // CAIXA DE ESQUIVA
    // =====================================================

    criarCaixaEsquiva() {

        this.caixaEsquiva =
            document.createElement(
                "div"
            );


        this.caixaEsquiva.id =
            "caixaEsquiva";


        this.caixaEsquiva.style.display =
            "none";


        this.arena.appendChild(
            this.caixaEsquiva
        );

    },


    mostrarCaixaEsquiva() {

        console.log(
            "MOSTRANDO CAIXA DE ESQUIVA"
        );


        this.esconderMenuAcoes();


        this.resetarSprites();


        if (
            this.ataqueMinigame
        ) {

            this.ataqueMinigame.style.display =
                "none";

        }


        if (
            this.caixaEsquiva
        ) {

            this.caixaEsquiva.style.display =
                "block";

        }


        if (
            typeof Coracao !==
            "undefined"
        ) {

            Coracao.iniciar();

        }

    },


    esconderCaixaEsquiva() {

        console.log(
            "ESCONDENDO CAIXA DE ESQUIVA"
        );


        if (
            this.caixaEsquiva
        ) {

            this.caixaEsquiva.style.display =
                "none";

        }


        if (
            typeof Coracao !==
            "undefined"
        ) {

            Coracao.parar();

        }


        if (
            this.ataqueMinigame
        ) {

            this.ataqueMinigame.style.display =
                "none";

        }

    },


    // =====================================================
    // SPRITES
    // =====================================================

    trocarSprite(
        id,
        tipo
    ) {

        const dados =
            this.personagens[id];

        if (!dados)
            return;


        const caminho =
            dados.sprites[tipo];

        if (!caminho)
            return;


        const imagem =
            document.querySelector(
                "#personagem_" +
                id +
                " .spritePersonagem"
            );


        if (!imagem)
            return;


        imagem.onerror =
            () => {

                console.warn(
                    "SPRITE NÃO CARREGOU:",
                    caminho
                );

                imagem.onerror =
                    null;

                imagem.src =
                    dados.spriteInicial;

            };


        imagem.src =
            caminho;


        const personagem =
            this.pegarPersonagem(
                id
            );


        if (personagem) {

            personagem.sprite =
                caminho;

        }


        console.log(
            "SPRITE ALTERADO:",
            id,
            tipo
        );

    },


    voltarSprite(id) {

        const dados =
            this.personagens[id];

        if (!dados)
            return;


        const imagem =
            document.querySelector(
                "#personagem_" +
                id +
                " .spritePersonagem"
            );


        if (imagem) {

            imagem.onerror =
                null;

            imagem.src =
                dados.spriteInicial;

        }


        const personagem =
            this.pegarPersonagem(
                id
            );


        if (personagem) {

            personagem.sprite =
                dados.spriteInicial;

        }

    },


    resetarSprites() {

        this.voltarSprite("ash");
        this.voltarSprite("spike");
        this.voltarSprite("manel");

    },


    // =====================================================
    // DANO
    // =====================================================

    mostrarDanoPersonagem(
        id,
        valor
    ) {

        this.mostrarDanoTexto(
            "-" +
            Math.round(valor),
            "#fff",
            "#personagem_" + id
        );

    },


    mostrarDanoMascara(
        valor
    ) {

        this.mostrarDanoTexto(
            "-" +
            Math.round(valor),
            "#ff5555",
            "#mascaraBatalha"
        );

    },


    mostrarCuraPersonagem(
        id,
        valor
    ) {

        this.mostrarDanoTexto(
            "+" +
            Math.round(valor),
            "#4dff65",
            "#personagem_" + id
        );

    },


    mostrarDanoTexto(
        texto,
        cor,
        seletor
    ) {

        if (!this.arena)
            return;


        let alvo =
            document.querySelector(
                seletor
            );


        if (!alvo)
            alvo =
                this.campo;


        if (!alvo)
            return;


        const box =
            document.createElement(
                "div"
            );


        box.className =
            "danoFlutuante";


        box.textContent =
            texto;


        box.style.color =
            cor;


        const rect =
            alvo.getBoundingClientRect();


        const arenaRect =
            this.arena.getBoundingClientRect();


        box.style.left =
            (
                rect.left -
                arenaRect.left +
                rect.width / 2
            ) +
            "px";


        box.style.top =
            (
                rect.top -
                arenaRect.top +
                20
            ) +
            "px";


        this.arena.appendChild(
            box
        );


        setTimeout(
            () => {

                if (
                    box.parentNode
                ) {

                    box.remove();

                }

            },
            900
        );

    },


    // =====================================================
    // MENSAGEM
    // =====================================================

    mostrarMensagem(
        texto,
        callback
    ) {

        const antiga =
            document.getElementById(
                "mensagemBatalha"
            );


        if (antiga)
            antiga.remove();


        this.mensagemAtiva =
            true;


        this.esconderMenuAcoes();


        const caixa =
            document.createElement(
                "div"
            );


        caixa.id =
            "mensagemBatalha";


        caixa.textContent =
            texto;


        this.arena.appendChild(
            caixa
        );


        let fechando =
            false;


        const fechar =
            () => {

                if (fechando)
                    return;


                fechando =
                    true;


                if (
                    caixa.parentNode
                )
                    caixa.remove();


                if (typeof Input !== "undefined") {
                    Input.removerContexto("batalha-mensagem");
                }


                this.mensagemAtiva =
                    false;


                if (
                    typeof callback ===
                    "function"
                ) {

                    callback();

                }

            };


        const tecla =
            e => {

                if (e.repeat)
                    return;


                if (
                    e.key ===
                    "Enter"
                ) {

                    e.preventDefault();
                    e.stopPropagation();

                    fechar();

                }

            };


        if (typeof Input !== "undefined") {
            Input.registrarContexto(
                "batalha-mensagem",
                tecla
            );
        }

    },


    // =====================================================
    // HP / PE
    // =====================================================

    atualizarCabecas() {

        if (
            !this.cabecas ||
            typeof Batalha ===
                "undefined"
        )
            return;


        this.ordemPersonagens.forEach(
            id => {

                const botao =
                    this.cabecas.querySelector(
                        `[data-personagem="${id}"]`
                    );


                const p =
                    this.pegarPersonagem(
                        id
                    );


                if (
                    !botao ||
                    !p
                )
                    return;


                botao.classList.toggle(
                    "feito",
                    !!Batalha.personagensAgiram[id]
                );


                botao.classList.toggle(
                    "morto",
                    p.hp <= 0
                );


                const max =
                    p.hpMax ||
                    this.personagens[id].hpMax;


                const porcentagem =
                    max > 0
                        ? (
                            p.hp /
                            max
                        ) *
                        100
                        : 0;


                const fill =
                    document.getElementById(
                        "hpBar_" +
                        id
                    );


                if (fill) {

                    fill.style.width =
                        Math.max(
                            0,
                            Math.min(
                                100,
                                porcentagem
                            )
                        ) +
                        "%";

                }


                const valor =
                    document.getElementById(
                        "hpValor_" +
                        id
                    );


                if (valor) {

                    valor.textContent =
                        Math.max(
                            0,
                            Math.round(
                                p.hp
                            )
                        );

                }

            }
        );


        const pe =
            Math.max(
                0,
                Number(
                    Batalha.pe
                ) ||
                0
            );


        const peMax =
            Number(
                Batalha.peMax
            ) ||
            100;


        const porcentagemPE =
            (
                pe /
                peMax
            ) *
            100;


        const peFill =
            document.getElementById(
                "peFillBatalha"
            );


        if (peFill) {

            peFill.style.width =
                Math.max(
                    0,
                    Math.min(
                        100,
                        porcentagemPE
                    )
                ) +
                "%";

        }


        const peTexto =
            document.getElementById(
                "peTextoBatalha"
            );


        if (peTexto) {

            peTexto.textContent =
                `PE: ${Math.round(pe)}/${peMax}`;

        }

    },


    // =====================================================
    // TECLADO
    // =====================================================

    iniciarTeclado() {

        if (
            this.teclasIniciadas
        )
            return;


        this.teclasIniciadas =
            true;


        this._inputTecla = e => {

                // -----------------------------------------
                // NÃO REPETIR
                // -----------------------------------------

                if (e.repeat)
                    return;


                // -----------------------------------------
                // MENSAGEM
                // -----------------------------------------

                if (
                    this.mensagemAtiva
                )
                    return;


                // -----------------------------------------
                // MINIGAME
                // -----------------------------------------

                if (
                    this.ataqueAtivo
                ) {

                    if (
                        e.key ===
                        "Enter"
                    ) {

                        e.preventDefault();
                        e.stopPropagation();

                        this.finalizarBarraAtaque(
                            false
                        );

                    }

                    return;

                }


                // -----------------------------------------
                // BATALHA
                // -----------------------------------------

                if (
                    typeof Batalha ===
                        "undefined" ||
                    !Batalha.ativa
                )
                    return;


                if (
                    Batalha.turno !==
                    "jogador"
                )
                    return;


                const tecla =
                    e.key;


                if (
                    ![
                        "ArrowUp",
                        "ArrowDown",
                        "ArrowLeft",
                        "ArrowRight",
                        "Enter",
                        "Escape"
                    ].includes(
                        tecla
                    )
                )
                    return;


                e.preventDefault();


                // -----------------------------------------
                // MENU DE AÇÃO
                // -----------------------------------------

                if (
                    this.menuModo ===
                    "acao"
                ) {

                    const total =
                        this.menuDados.length;


                    if (!total)
                        return;


                    if (
                        tecla === "ArrowUp" ||
                        tecla === "ArrowLeft"
                    ) {

                        this.menuIndice =
                            (
                                this.menuIndice -
                                1 +
                                total
                            ) %
                            total;


                        this.tocarSomMenu(
                            "mover"
                        );


                        this.mostrarMenuAtual();

                        return;

                    }


                    if (
                        tecla === "ArrowDown" ||
                        tecla === "ArrowRight"
                    ) {

                        this.menuIndice =
                            (
                                this.menuIndice +
                                1
                            ) %
                            total;


                        this.tocarSomMenu(
                            "mover"
                        );


                        this.mostrarMenuAtual();

                        return;

                    }


                    if (
                        tecla === "Enter"
                    ) {

                        const item =
                            this.menuDados[
                                this.menuIndice
                            ];


                        if (item) {

                            this.tocarSomMenu(
                                "selecionar"
                            );


                            this.executarComando(
                                item.acao
                            );

                        }

                        return;

                    }


                    return;

                }


                // -----------------------------------------
                // SUBMENU
                // -----------------------------------------

                if (
                    this.menuModo ===
                    "submenu"
                ) {

                    const total =
                        this.menuDados.length +
                        (
                            this.menuVoltar
                                ? 1
                                : 0
                        );


                    if (!total)
                        return;


                    if (
                        tecla === "ArrowUp" ||
                        tecla === "ArrowLeft"
                    ) {

                        this.menuIndice =
                            (
                                this.menuIndice -
                                1 +
                                total
                            ) %
                            total;


                        this.tocarSomMenu(
                            "mover"
                        );


                        this.atualizarSubmenu();

                        return;

                    }


                    if (
                        tecla === "ArrowDown" ||
                        tecla === "ArrowRight"
                    ) {

                        this.menuIndice =
                            (
                                this.menuIndice +
                                1
                            ) %
                            total;


                        this.tocarSomMenu(
                            "mover"
                        );


                        this.atualizarSubmenu();

                        return;

                    }


                    if (
                        tecla === "Enter"
                    ) {

                        this.tocarSomMenu(
                            "selecionar"
                        );


                        this.executarSubmenu();

                        return;

                    }


                    if (
                        tecla === "Escape"
                    ) {

                        this.abrirAcoes(
                            this.personagemSelecionado
                        );

                    }

                }

            return true;
        };

        if (typeof Input !== "undefined") {
            Input.registrarContexto(
                "batalha-render",
                evento => {
                    if (
                        typeof Batalha === "undefined" ||
                        (!Batalha.ativa && !this.mensagemAtiva && !this.ataqueAtivo)
                    ) {
                        return false;
                    }

                    this._inputTecla(evento);
                    return true;
                }
            );
        }

    },


    // =====================================================
    // SOM DO MENU
    // =====================================================

    tocarSomMenu(nome) {

        if (
            typeof Batalha ===
                "undefined"
        )
            return;


        if (
            typeof Batalha.tocarSomBatalha ===
            "function"
        ) {

            Batalha.tocarSomBatalha(
                nome
            );

        }

    },


    // =====================================================
    // ATUALIZAR
    // =====================================================

    atualizar() {

        if (
            typeof Batalha ===
            "undefined"
        )
            return;


        this.atualizarCabecas();


        this.ordemPersonagens.forEach(
            id => {

                const imagem =
                    document.querySelector(
                        "#personagem_" +
                        id +
                        " .spritePersonagem"
                    );


                const personagem =
                    this.pegarPersonagem(
                        id
                    );


                if (
                    imagem &&
                    personagem
                ) {

                    imagem.style.opacity =
                        personagem.hp <= 0
                            ? "0.25"
                            : "1";

                }

            }
        );


        const mascara =
            document.getElementById(
                "mascaraBatalha"
            );


        if (mascara) {

            mascara.src =
                "assets/imagens/batalha_imagens/bruno/mascara.png";

        }

    }

};