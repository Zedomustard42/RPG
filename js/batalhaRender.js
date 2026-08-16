const BatalhaRender = {

    // =====================================================
    // ELEMENTOS
    // =====================================================

    arena: null,
    campo: null,
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
    // ATAQUE
    // =====================================================

    ataqueAtivo: false,

    ataquePersonagem: null,

    ataqueMin: 0,

    ataqueMax: 0,

    ataquePosicao: 0,

    ataqueDirecao: 1,

    ataqueVelocidade: 5,


    // =====================================================
    // TECLADO
    // =====================================================

    teclasIniciadas: false,


    // =====================================================
    // SELEÇÃO
    // =====================================================

    personagemSelecionado: "ash",

    comandoSelecionado: 0,


    // =====================================================
    // PERSONAGENS
    // =====================================================

    personagens: {

        ash: {

            nome: "ASH",

            hpMax: 140,

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

            spriteInicial:
                "assets/imagens/batalha_imagens/manel/manel_lado.png",

            cabeca:
                "assets/imagens/batalha_imagens/cabeças/manel_cabeça.png",

            sprites: {

                atacar:
                    "assets/imagens/batalha_imagens/manel/manel_batalha.png",

                defender:
                    "assets/imagens/batalha_imagens/manel/manel_defesa.png",

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
            typeof Batalha ===
            "undefined"
        ) {

            return null;

        }

        return Batalha[id] || null;

    },


    // =====================================================
    // INICIAR
    // =====================================================

    iniciar() {

        console.log(
            "BATALHA RENDER INICIADO"
        );


        this.arena =
            document.getElementById("arena");


        if (!this.arena) {

            console.error(
                "ARENA NÃO ENCONTRADA"
            );

            return;

        }


        // =================================================
        // LIMPAR ANIMAÇÃO ANTIGA
        // =================================================

        if (
            this.ataqueAnimacao
        ) {

            cancelAnimationFrame(
                this.ataqueAnimacao
            );

            this.ataqueAnimacao =
                null;

        }


        // =================================================
        // LIMPAR ARENA
        // =================================================

        this.arena.innerHTML = "";


        this.campo =
            null;

        this.interfaceBatalha =
            null;

        this.cabecas =
            null;

        this.comandos =
            null;

        this.tituloComando =
            null;

        this.caixaEsquiva =
            null;

        this.ataqueMinigame =
            null;

        this.ponteiroAtaque =
            null;

        this.zonaCentroAtaque =
            null;


        this.ataqueAtivo =
            false;

        this.ataquePersonagem =
            null;

        this.ataquePosicao =
            0;

        this.ataqueDirecao =
            1;


        this.personagemSelecionado =
            "ash";

        this.comandoSelecionado =
            0;


        // =================================================
        // CRIAÇÃO
        // =================================================

        this.criarCampo();

        this.criarPersonagem(
            "ash"
        );

        this.criarPersonagem(
            "spike"
        );

        this.criarPersonagem(
            "manel"
        );

        this.criarMascara();

        this.criarInterface();

        this.criarCaixaEsquiva();

        this.criarMinigameAtaque();


        // =================================================
        // TECLADO
        // =================================================

        this.iniciarTeclado();


        // =================================================
        // ESTADO INICIAL
        // =================================================

        this.resetarSprites();


        this.selecionarPersonagem(
            "ash"
        );


        this.atualizar();


        console.log(
            "BATALHA RENDER PRONTO"
        );

    },


    // =====================================================
    // CAMPO
    // =====================================================

    criarCampo() {

        this.campo =
            document.createElement("div");


        this.campo.id =
            "campoBatalha";


        this.arena.appendChild(
            this.campo
        );

    },


    // =====================================================
    // CRIAR PERSONAGEM
    // =====================================================

    criarPersonagem(id) {

        const dados =
            this.personagens[id];


        if (!dados)
            return;


        const elemento =
            document.createElement("div");


        elemento.id =
            "personagem_" +
            id;


        elemento.className =
            "personagemBatalha";


        const imagem =
            document.createElement("img");


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

                console.error(
                    "ERRO AO CARREGAR SPRITE:",
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
            document.createElement("img");


        imagem.id =
            "mascaraBatalha";


        imagem.className =
            "mascaraBatalha";


        if (
            typeof Mascara !==
            "undefined" &&
            Mascara.sprite
        ) {

            imagem.src =
                Mascara.sprite;

        }


        imagem.onerror =
            () => {

                console.error(
                    "ERRO AO CARREGAR SPRITE DA MÁSCARA:",
                    imagem.src
                );

            };


        this.campo.appendChild(
            imagem
        );

    },


    // =====================================================
    // INTERFACE
    // =====================================================

    criarInterface() {

        this.interfaceBatalha =
            document.createElement("div");


        this.interfaceBatalha.id =
            "interfaceBatalha";


        // =================================================
        // PE
        // =================================================

        const pe =
            document.createElement("div");


        pe.id =
            "peBatalha";


        this.interfaceBatalha.appendChild(
            pe
        );


        // =================================================
        // CABEÇAS
        // =================================================

        this.cabecas =
            document.createElement("div");


        this.cabecas.id =
            "cabecasBatalha";


        this.criarCabeca(
            "ash"
        );

        this.criarCabeca(
            "spike"
        );

        this.criarCabeca(
            "manel"
        );


        this.interfaceBatalha.appendChild(
            this.cabecas
        );


        // =================================================
        // COMANDOS
        // =================================================

        this.comandos =
            document.createElement("div");


        this.comandos.id =
            "comandosBatalha";


        this.tituloComando =
            document.createElement("div");


        this.tituloComando.id =
            "tituloComando";


        this.comandos.appendChild(
            this.tituloComando
        );


        const lista =
            document.createElement("div");


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

    },


    // =====================================================
    // CABEÇA
    // =====================================================

    criarCabeca(id) {

        const dados =
            this.personagens[id];


        if (!dados)
            return;


        const botao =
            document.createElement("button");


        botao.className =
            "cabecaPersonagem";


        botao.dataset.personagem =
            id;


        const imagem =
            document.createElement("img");


        imagem.src =
            dados.cabeca;


        imagem.alt =
            dados.nome;


        imagem.draggable =
            false;


        imagem.onerror =
            () => {

                console.error(
                    "ERRO AO CARREGAR CABEÇA:",
                    id,
                    imagem.src
                );

            };


        botao.appendChild(
            imagem
        );


        const hp =
            document.createElement("div");


        hp.className =
            "hpPersonagem";


        hp.id =
            "hp_" +
            id;


        botao.appendChild(
            hp
        );


        botao.onclick =
            () => {

                if (
                    typeof Batalha ===
                    "undefined"
                )
                    return;


                if (
                    Batalha.turno !==
                    "jogador"
                )
                    return;


                const personagem =
                    this.pegarPersonagem(id);


                if (!personagem)
                    return;


                if (
                    personagem.hp <= 0
                )
                    return;


                if (
                    Batalha.personagensAgiram &&
                    Batalha.personagensAgiram[id]
                )
                    return;


                if (
                    typeof Batalha.tocarSomBatalha ===
                    "function"
                ) {

                    Batalha.tocarSomBatalha(
                        "selecionar"
                    );

                }


                this.selecionarPersonagem(
                    id
                );

            };


        this.cabecas.appendChild(
            botao
        );

    },


    // =====================================================
    // SELECIONAR PERSONAGEM
    // =====================================================

    selecionarPersonagem(id) {

        if (
            typeof Batalha ===
            "undefined"
        )
            return;


        const personagem =
            this.pegarPersonagem(id);


        if (!personagem)
            return;


        if (
            personagem.hp <= 0
        )
            return;


        if (
            Batalha.turno !==
            "jogador"
        )
            return;


        if (
            Batalha.personagensAgiram &&
            Batalha.personagensAgiram[id]
        )
            return;


        this.personagemSelecionado =
            id;


        this.comandoSelecionado =
            0;


        this.atualizarCabecas();

        this.mostrarComandos();

    },


    // =====================================================
    // CABEÇAS / HP
    // =====================================================

    atualizarCabecas() {

        if (
            !this.cabecas
        )
            return;


        if (
            typeof Batalha ===
            "undefined"
        )
            return;


        const botoes =
            this.cabecas.querySelectorAll(
                ".cabecaPersonagem"
            );


        botoes.forEach(
            botao => {

                const id =
                    botao.dataset.personagem;


                const personagem =
                    this.pegarPersonagem(id);


                if (!personagem)
                    return;


                botao.classList.toggle(
                    "selecionado",
                    id ===
                    this.personagemSelecionado
                );


                botao.classList.toggle(
                    "morto",
                    personagem.hp <= 0
                );


                botao.classList.toggle(
                    "feito",
                    !!(
                        Batalha.personagensAgiram &&
                        Batalha.personagensAgiram[id]
                    )
                );


                const hp =
                    botao.querySelector(
                        ".hpPersonagem"
                    );


                if (hp) {

                    hp.textContent =
                        personagem.hp +
                        " / " +
                        (
                            personagem.hpMax ||
                            this.personagens[id].hpMax
                        );

                }

            }
        );


        const pe =
            document.getElementById(
                "peBatalha"
            );


        if (
            pe &&
            typeof Batalha.pe !==
            "undefined"
        ) {

            pe.textContent =
                "PE: " +
                Batalha.pe +
                " / " +
                Batalha.peMax;

        }

    },


    // =====================================================
    // MOSTRAR MENU
    // =====================================================

    mostrarMenuAcoes() {

        if (
            this.interfaceBatalha
        ) {

            this.interfaceBatalha.style.display =
                "flex";

        }


        this.mostrarComandos();

        this.atualizarCabecas();

    },


    // =====================================================
    // ESCONDER MENU
    // =====================================================

    esconderMenuAcoes() {

        if (
            this.interfaceBatalha
        ) {

            this.interfaceBatalha.style.display =
                "none";

        }

    },


    // =====================================================
    // COMANDOS
    // =====================================================

    mostrarComandos() {

        if (
            typeof Batalha ===
            "undefined"
        )
            return;


        if (
            Batalha.turno !==
            "jogador"
        )
            return;


        if (
            !this.comandos ||
            !this.tituloComando
        )
            return;


        const id =
            this.personagemSelecionado;


        const personagem =
            this.pegarPersonagem(id);


        if (!personagem)
            return;


        if (
            personagem.hp <= 0
        )
            return;


        if (
            Batalha.personagensAgiram &&
            Batalha.personagensAgiram[id]
        )
            return;


        this.tituloComando.textContent =
            personagem.nome;


        const lista =
            this.comandos.querySelector(
                "#listaComandos"
            );


        if (!lista)
            return;


        lista.innerHTML = "";


        let botoes = [];


        if (
            id ===
            "ash"
        ) {

            botoes = [

                [
                    "ATACAR",
                    "atacar"
                ],

                [
                    "RITUAL",
                    "ritual"
                ],

                [
                    "DEFENDER",
                    "defender"
                ],

                [
                    "AGIR",
                    "agir"
                ]

            ];

        }

        else if (
            id ===
            "spike"
        ) {

            botoes = [

                [
                    "RITUAL",
                    "ritual"
                ],

                [
                    "DEFENDER",
                    "defender"
                ],

                [
                    "AGIR",
                    "agir"
                ]

            ];

        }

        else if (
            id ===
            "manel"
        ) {

            botoes = [

                [
                    "ATACAR",
                    "atacar"
                ],

                [
                    "DEFENDER",
                    "defender"
                ],

                [
                    "AGIR",
                    "agir"
                ]

            ];

        }


        botoes.forEach(
            ([texto, acao], indice) => {

                const botao =
                    document.createElement(
                        "button"
                    );


                botao.className =
                    "botaoComando";


                botao.textContent =
                    texto;


                botao.dataset.indice =
                    indice;


                botao.onclick =
                    () => {

                        this.executarComando(
                            acao
                        );

                    };


                lista.appendChild(
                    botao
                );

            }
        );

    },


    // =====================================================
    // EXECUTAR COMANDO
    // =====================================================

    executarComando(acao) {

        if (
            typeof Batalha ===
            "undefined"
        )
            return;


        if (
            Batalha.turno !==
            "jogador"
        )
            return;


        const id =
            this.personagemSelecionado;


        if (
            Batalha.personagensAgiram &&
            Batalha.personagensAgiram[id]
        )
            return;


        if (
            acao ===
            "atacar"
        ) {

            if (
                typeof Batalha.prepararAtaque ===
                "function"
            ) {

                Batalha.prepararAtaque(
                    id
                );

            }

            return;

        }


        if (
            acao ===
            "ritual"
        ) {

            if (
                id === "ash" &&
                typeof Batalha.mostrarRituaisAsh ===
                "function"
            ) {

                Batalha.mostrarRituaisAsh();

            }

            else if (
                id === "spike" &&
                typeof Batalha.mostrarRituaisSpike ===
                "function"
            ) {

                Batalha.mostrarRituaisSpike();

            }

            return;

        }


        if (
            acao ===
            "defender"
        ) {

            if (
                typeof Batalha.defender ===
                "function"
            ) {

                Batalha.defender(
                    id
                );

            }

            return;

        }


        if (
            acao ===
            "agir"
        ) {

            if (
                id ===
                "ash" &&
                typeof Batalha.mostrarAgirAsh ===
                "function"
            ) {

                Batalha.mostrarAgirAsh();

            }

            else if (
                id ===
                "spike" &&
                typeof Batalha.mostrarAgirSpike ===
                "function"
            ) {

                Batalha.mostrarAgirSpike();

            }

            else if (
                id ===
                "manel" &&
                typeof Batalha.mostrarAgirManel ===
                "function"
            ) {

                Batalha.mostrarAgirManel();

            }

        }

    },


    // =====================================================
    // PRÓXIMO PERSONAGEM
    // =====================================================

    selecionarProximoPersonagem() {

        const ordem = [
            "ash",
            "spike",
            "manel"
        ];


        for (
            const id of ordem
        ) {

            const personagem =
                this.pegarPersonagem(id);


            if (!personagem)
                continue;


            const agiu =
                Batalha.personagensAgiram &&
                Batalha.personagensAgiram[id];


            if (
                personagem.hp > 0 &&
                !agiu
            ) {

                this.selecionarPersonagem(
                    id
                );

                return true;

            }

        }


        return false;

    },


    // =====================================================
    // INICIAR BARRA DE ATAQUE
    // =====================================================

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


        this.ataquePersonagem =
            id;


        this.ataqueMin =
            min;


        this.ataqueMax =
            max;


        this.ataquePosicao =
            0;


        this.ataqueDirecao =
            1;


        this.esconderMenuAcoes();


        this.ataqueMinigame.style.display =
            "flex";


        this.atualizarPonteiroAtaque();


        this.animarAtaque();

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
                PRESSIONE ENTER!
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


        this.ataqueMinigame.style.display =
            "none";

    },


    // =====================================================
    // ANIMAR BARRA
    // =====================================================

    animarAtaque() {

        if (
            !this.ataqueAtivo
        )
            return;


        const barra =
            document.getElementById(
                "barraAtaque"
            );


        if (!barra) {

            this.ataqueAtivo =
                false;

            return;

        }


        const largura =
            barra.clientWidth;


        const limite =
            Math.max(
                0,
                largura - 8
            );


        this.ataquePosicao +=
            this.ataqueVelocidade *
            this.ataqueDirecao;


        if (
            this.ataquePosicao >=
            limite
        ) {

            this.ataquePosicao =
                limite;

            this.ataqueDirecao =
                -1;

        }


        if (
            this.ataquePosicao <=
            0
        ) {

            this.ataquePosicao =
                0;

            this.ataqueDirecao =
                1;

        }


        this.atualizarPonteiroAtaque();


        this.ataqueAnimacao =
            requestAnimationFrame(
                () =>
                    this.animarAtaque()
            );

    },


    // =====================================================
    // PONTEIRO
    // =====================================================

    atualizarPonteiroAtaque() {

        if (
            this.ponteiroAtaque
        ) {

            this.ponteiroAtaque.style.left =
                this.ataquePosicao +
                "px";

        }

    },


    // =====================================================
    // FINALIZAR BARRA
    // =====================================================

    finalizarBarraAtaque() {

        if (
            !this.ataqueAtivo
        )
            return;


        this.ataqueAtivo =
            false;


        if (
            this.ataqueAnimacao
        ) {

            cancelAnimationFrame(
                this.ataqueAnimacao
            );

            this.ataqueAnimacao =
                null;

        }


        const barra =
            document.getElementById(
                "barraAtaque"
            );


        if (!barra)
            return;


        const largura =
            barra.clientWidth;


        const centro =
            largura / 2;


        const centroPonteiro =
            this.ataquePosicao + 4;


        const distancia =
            Math.abs(
                centroPonteiro -
                centro
            );


        const metade =
            largura / 2;


        let precisao =
            1 -
            (
                distancia /
                metade
            );


        precisao =
            Math.max(
                0,
                Math.min(
                    1,
                    precisao
                )
            );


        const id =
            this.ataquePersonagem;


        if (
            this.ataqueMinigame
        ) {

            this.ataqueMinigame.style.display =
                "none";

        }


        console.log(
            "ATAQUE:",
            id,
            "PRECISÃO:",
            precisao
        );


        if (
            typeof Batalha !==
            "undefined" &&
            typeof Batalha.executarAtaqueComPrecisao ===
            "function"
        ) {

            Batalha.executarAtaqueComPrecisao(
                id,
                precisao
            );

        }

    },


    // =====================================================
    // ESQUIVA
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


    // =====================================================
    // MOSTRAR ESQUIVA
    // =====================================================

    mostrarCaixaEsquiva() {

        console.log(
            "MOSTRANDO CAIXA DE ESQUIVA"
        );


        // =================================================
        // RESETAR PERSONAGENS
        // =================================================

        this.resetarSprites();


        // =================================================
        // ESCONDER MENU
        // =================================================

        this.esconderMenuAcoes();


        // =================================================
        // ESCONDER MINIGAME
        // =================================================

        if (
            this.ataqueMinigame
        ) {

            this.ataqueMinigame.style.display =
                "none";

        }


        // =================================================
        // MOSTRAR CAIXA
        // =================================================

        if (
            this.caixaEsquiva
        ) {

            this.caixaEsquiva.style.display =
                "block";

        }


        // =================================================
        // INICIAR CORAÇÃO
        // =================================================

        if (
            typeof Coracao !==
            "undefined"
        ) {

            Coracao.iniciar();

        }

    },


    // =====================================================
    // ESCONDER ESQUIVA
    // =====================================================

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


        // =================================================
        // CANCELAR MINIGAME
        // =================================================

        this.ataqueAtivo =
            false;


        if (
            this.ataqueAnimacao
        ) {

            cancelAnimationFrame(
                this.ataqueAnimacao
            );

            this.ataqueAnimacao =
                null;

        }


        if (
            this.ataqueMinigame
        ) {

            this.ataqueMinigame.style.display =
                "none";

        }

    },


    // =====================================================
    // TROCAR SPRITE
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


        if (!caminho) {

            console.warn(
                "SPRITE NÃO CONFIGURADO:",
                id,
                tipo
            );

            return;

        }


        const imagem =
            document.querySelector(
                "#personagem_" +
                id +
                " .spritePersonagem"
            );


        if (!imagem) {

            console.warn(
                "SPRITE NÃO ENCONTRADO:",
                id
            );

            return;

        }


        imagem.src =
            caminho;


        const personagem =
            this.pegarPersonagem(id);


        if (
            personagem
        ) {

            personagem.sprite =
                caminho;

        }


        console.log(
            "SPRITE ALTERADO:",
            id,
            tipo,
            caminho
        );

    },


    // =====================================================
    // VOLTAR SPRITE NORMAL
    // =====================================================

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


        if (
            imagem
        ) {

            imagem.src =
                dados.spriteInicial;

        }


        const personagem =
            this.pegarPersonagem(id);


        if (
            personagem
        ) {

            personagem.sprite =
                dados.spriteInicial;

        }


        console.log(
            "SPRITE VOLTOU:",
            id
        );

    },


    // =====================================================
    // RESETAR TODOS OS SPRITES
    // =====================================================

    resetarSprites() {

        this.voltarSprite(
            "ash"
        );

        this.voltarSprite(
            "spike"
        );

        this.voltarSprite(
            "manel"
        );

    },


    // =====================================================
    // SINCRONIZAR SPRITES DO BATALHA
    // =====================================================

    sincronizarSprites() {

        if (
            typeof Batalha ===
            "undefined"
        )
            return;


        const ids = [
            "ash",
            "spike",
            "manel"
        ];


        ids.forEach(
            id => {

                const personagem =
                    this.pegarPersonagem(id);


                if (
                    !personagem ||
                    !personagem.sprite
                )
                    return;


                const imagem =
                    document.querySelector(
                        "#personagem_" +
                        id +
                        " .spritePersonagem"
                    );


                if (
                    imagem &&
                    imagem.src !==
                    new URL(
                        personagem.sprite,
                        window.location.href
                    ).href
                ) {

                    imagem.src =
                        personagem.sprite;

                }

            }
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


        if (
            antiga
        )
            antiga.remove();


        const caixa =
            document.createElement(
                "div"
            );


        caixa.id =
            "mensagemBatalha";


        caixa.innerHTML =
            String(texto)
                .replace(
                    /\n/g,
                    "<br>"
                );


        this.arena.appendChild(
            caixa
        );


        const fechar =
            () => {

                if (
                    caixa.parentNode
                ) {

                    caixa.remove();

                }


                document.removeEventListener(
                    "keydown",
                    tecla
                );


                if (
                    callback
                ) {

                    callback();

                }

            };


        const tecla =
            e => {

                if (
                    e.key ===
                    "Enter"
                ) {

                    e.preventDefault();

                    fechar();

                }

            };


        document.addEventListener(
            "keydown",
            tecla
        );


        caixa.onclick =
            fechar;

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


        document.addEventListener(
            "keydown",
            e => {

                // =========================================
                // MINIGAME DE ATAQUE
                // =========================================

                if (
                    this.ataqueAtivo
                ) {

                    if (
                        e.key ===
                        "Enter"
                    ) {

                        e.preventDefault();

                        this.finalizarBarraAtaque();

                    }

                    return;

                }


                // =========================================
                // BATALHA
                // =========================================

                if (
                    typeof Batalha ===
                    "undefined"
                )
                    return;


                if (
                    !Batalha.ativa
                )
                    return;


                if (
                    Batalha.turno !==
                    "jogador"
                )
                    return;


                // =========================================
                // ENTER
                // =========================================

                if (
                    e.key ===
                    "Enter"
                ) {

                    e.preventDefault();


                    if (
                        !this.comandos
                    )
                        return;


                    const botoes =
                        this.comandos.querySelectorAll(
                            ".botaoComando:not(:disabled)"
                        );


                    if (
                        botoes[
                            this.comandoSelecionado
                        ]
                    ) {

                        botoes[
                            this.comandoSelecionado
                        ].click();

                    }

                }

            }
        );

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


        const ids = [
            "ash",
            "spike",
            "manel"
        ];


        ids.forEach(
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


        // =================================================
        // SINCRONIZAR SPRITES
        // =================================================

        this.sincronizarSprites();


        // =================================================
        // MÁSCARA
        // =================================================

        const mascara =
            document.getElementById(
                "mascaraBatalha"
            );


        if (
            mascara &&
            typeof Mascara !==
            "undefined" &&
            Mascara.sprite
        ) {

            if (
                mascara.src !==
                new URL(
                    Mascara.sprite,
                    window.location.href
                ).href
            ) {

                mascara.src =
                    Mascara.sprite;

            }

        }


        // =================================================
        // CABEÇAS / HP
        // =================================================

        this.atualizarCabecas();

    }

};