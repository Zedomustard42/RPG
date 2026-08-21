const UI = {
    gameOverAtivo: false,

    cassianTeclado: null,
    cassianAudio: null,
    trollAudio: null,
    brunoAudio: null,

    transformarMensagemHTML(html) {
        const div = document.createElement("div");
        div.innerHTML = html;
        return div.innerHTML;
    },

    transformarMensagem(texto) {
        if (texto === null || texto === undefined) {
            texto = "";
        }

        texto = String(texto);

        texto = texto.replace(
            /<vermelho>(.*?)<\/vermelho>/gi,
            '<span class="texto-vermelho">$1</span>'
        );

        return this.transformarMensagemHTML(texto);
    },

    pararAudio(audio) {
        if (!audio) return;

        try {
            audio.pause();
            audio.currentTime = 0;
            audio.muted = true;
        } catch (erro) {}
    },

    pararTodosOsAudios() {
        document.querySelectorAll("audio, video").forEach(audio => {
            this.pararAudio(audio);
        });
    },

    pararBruno() {
        this.pararAudio(this.brunoAudio);
        this.brunoAudio = null;

        this.pararAudio(window.brunoAudio);
        window.brunoAudio = null;

        document.querySelectorAll("audio, video").forEach(audio => {
            const src = (
                audio.currentSrc ||
                audio.src ||
                audio.getAttribute("src") ||
                ""
            ).toLowerCase();

            if (
                src.includes("bruno.mp3") ||
                src.includes("bruno")
            ) {
                this.pararAudio(audio);

                try {
                    audio.remove();
                } catch (erro) {}
            }
        });
    },

    pararCassianAudio() {
        this.pararAudio(this.cassianAudio);
        this.cassianAudio = null;

        this.pararAudio(window.cassianAudio);
        window.cassianAudio = null;
    },

    pararTrollAudio() {
        this.pararAudio(this.trollAudio);
        this.trollAudio = null;

        this.pararAudio(window.trollAudio);
        window.trollAudio = null;
    },

    limpar() {
        const game = document.getElementById("game");

        if (
            game &&
            !window.__CASSIAN_MEME_ATIVO
        ) {
            game.innerHTML = "";
        }
    },

    texto(titulo, mensagem, aviso = false) {

        /*
         * SE O CHOKITO ESTIVER ATIVO,
         * NADA MAIS PODE SUBSTITUIR A TELA.
         */
        if (window.__CASSIAN_MEME_ATIVO) {
            return;
        }

        const mensagemNormalizada =
            String(mensagem ?? "").trim();

        /*
         * SEGREDO DO CASSIAN
         */
        if (
            mensagemNormalizada ===
            "__CASSIAN_MEME__"
        ) {
            const game =
                document.getElementById("game");

            if (game) {
                this.abrirClube(game);
            }

            return;
        }

        this.limpar();

        const game =
            document.getElementById("game");

        if (!game) return;

        const caixa =
            document.createElement("div");

        caixa.className =
            "caixa-texto";

        if (aviso) {
            caixa.classList.add("aviso");
        }

        caixa.innerHTML = `
            <div class="titulo">
                ${this.transformarMensagem(titulo)}
            </div>

            <div class="mensagem">
                ${this.transformarMensagem(mensagem)}
            </div>
        `;

        game.appendChild(caixa);

        const tituloElemento =
            caixa.querySelector(".titulo");

        const mensagemElemento =
            caixa.querySelector(".mensagem");

        if (tituloElemento) {
            tituloElemento.style.fontSize =
                "clamp(32px, 4vw, 60px)";

            tituloElemento.style.lineHeight =
                "1.25";

            tituloElemento.style.letterSpacing =
                "normal";

            tituloElemento.style.wordSpacing =
                "normal";

            tituloElemento.style.whiteSpace =
                "normal";
        }

        if (mensagemElemento) {
            mensagemElemento.style.fontSize =
                "clamp(28px, 3.2vw, 52px)";

            mensagemElemento.style.lineHeight =
                "1.35";

            mensagemElemento.style.letterSpacing =
                "normal";

            mensagemElemento.style.wordSpacing =
                "normal";

            mensagemElemento.style.whiteSpace =
                "normal";
        }
    },

    abrirClube(game) {

        if (this.cassianTeclado) {
            if (typeof Input !== "undefined") {
                Input.removerContexto("ui-cassian");
            }

            this.cassianTeclado = null;
        }

        /*
         * PARA BRUNO PRIMEIRO
         */
        this.pararBruno();

        this.pararCassianAudio();
        this.pararTrollAudio();
        this.pararTodosOsAudios();

        document.body.style.margin = "0";
        document.body.style.padding = "0";
        document.body.style.background = "#000";
        document.body.style.overflow = "hidden";

        game.style.position = "fixed";
        game.style.inset = "0";
        game.style.width = "100vw";
        game.style.height = "100vh";
        game.style.margin = "0";
        game.style.padding = "0";
        game.style.overflow = "hidden";
        game.style.background = "#000";

        /*
         * MÚSICA DO CLUBE
         */
        this.cassianAudio =
            new Audio(
                "assets/audio/clube.mp3"
            );

        this.cassianAudio.loop = true;
        this.cassianAudio.volume = 1;

        window.cassianAudio =
            this.cassianAudio;

        this.cassianAudio
            .play()
            .catch(() => {});

        /*
         * CONTAINER
         */
        const caixa =
            document.createElement("div");

        caixa.id =
            "cassian-menu";

        Object.assign(
            caixa.style,
            {
                position: "fixed",
                inset: "0",
                width: "100vw",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "center",
                boxSizing: "border-box",
                padding: "0 20px 55px 20px",
                backgroundImage:
                    "url('assets/imagens/clube.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                zIndex: "999999"
            }
        );

        /*
         * MENU
         */
        const menu =
            document.createElement("div");

        Object.assign(
            menu.style,
            {
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "20px",
                boxSizing: "border-box"
            }
        );

        /*
         * TÍTULO
         */
        const tituloMenu =
            document.createElement("div");

        tituloMenu.textContent =
            "RPG: UM CLUBE MUITO MASSA";

        Object.assign(
            tituloMenu.style,
            {
                fontFamily:
                    "Arial, sans-serif",

                fontSize:
                    "clamp(42px, 5vw, 72px)",

                fontWeight:
                    "900",

                lineHeight:
                    "1.1",

                color:
                    "#ff69b4",

                marginBottom:
                    "25px",

                letterSpacing:
                    "normal",

                textShadow:
                    "4px 4px 0 #fff, 7px 7px 10px #000"
            }
        );

        /*
         * OPÇÕES
         */
        const opcoesContainer =
            document.createElement("div");

        Object.assign(
            opcoesContainer.style,
            {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                fontFamily:
                    "Arial, sans-serif",
                fontSize:
                    "clamp(40px, 4vw, 60px)",
                fontWeight:
                    "900",
                lineHeight:
                    "1.2",
                userSelect:
                    "none"
            }
        );

        const jogar =
            document.createElement("div");

        jogar.style.minWidth = "300px";
        jogar.style.padding = "8px 30px";
        jogar.style.boxSizing = "border-box";

        const desistir =
            document.createElement("div");

        desistir.style.minWidth = "300px";
        desistir.style.padding = "8px 30px";
        desistir.style.boxSizing = "border-box";

        opcoesContainer.appendChild(jogar);
        opcoesContainer.appendChild(desistir);

        menu.appendChild(tituloMenu);
        menu.appendChild(opcoesContainer);

        caixa.appendChild(menu);

        game.appendChild(caixa);

        /*
         * SELEÇÃO
         */
        let selecionado = 0;

        const opcoes = [
            jogar,
            desistir
        ];

        const atualizarSelecao = () => {

            opcoes.forEach(
                (opcao, index) => {

                    const nome =
                        index === 0
                            ? "Jogar"
                            : "Desistir";

                    if (
                        index === selecionado
                    ) {

                        opcao.textContent =
                            "♥ " + nome;

                        opcao.style.color =
                            "#ff69b4";

                        opcao.style.transform =
                            "scale(1.08)";

                        opcao.style.textShadow =
                            "4px 4px 0 #fff, 6px 6px 10px #000";

                    } else {

                        opcao.textContent =
                            nome;

                        opcao.style.color =
                            "#fff";

                        opcao.style.transform =
                            "scale(1)";

                        opcao.style.textShadow =
                            "4px 4px 8px #000";
                    }
                }
            );
        };

        atualizarSelecao();

        /*
         * =================================================
         * CHOKITO
         * =================================================
         */
        const mostrarChokito = () => {

            /*
             * ISSO IMPEDE O ENGINE DE CONTINUAR
             * A HISTÓRIA POR BAIXO DO GIF.
             */
            window.__CASSIAN_MEME_ATIVO = true;

            /*
             * PARA ABSOLUTAMENTE TUDO
             */
            this.pararBruno();
            this.pararCassianAudio();
            this.pararTrollAudio();
            this.pararTodosOsAudios();

            /*
             * REMOVE TECLADO
             */
            if (this.cassianTeclado) {

                if (typeof Input !== "undefined") {
                    Input.removerContexto("ui-cassian");
                }

                this.cassianTeclado = null;
            }

            /*
             * TROLL
             */
            this.trollAudio =
                new Audio(
                    "assets/audio/troll.mp3"
                );

                this.trollAudio.loop = true;

            this.trollAudio.volume = 1;

            window.trollAudio =
                this.trollAudio;

            this.trollAudio
                .play()
                .catch(() => {});

            /*
             * REMOVE O MENU
             */
            try {
                caixa.remove();
            } catch (erro) {}

            /*
             * REMOVE GIF ANTIGO
             */
            const antigo =
                document.getElementById(
                    "chokito-overlay"
                );

            if (antigo) {
                antigo.remove();
            }

            /*
             * OVERLAY DO GIF
             *
             * DIRETAMENTE NO BODY.
             *
             * NÃO FICA DENTRO DO #GAME.
             */
            const overlay =
                document.createElement("div");

            overlay.id =
                "chokito-overlay";

            Object.assign(
                overlay.style,
                {
                    position: "fixed",
                    top: "0",
                    left: "0",
                    width: "100vw",
                    height: "100vh",
                    margin: "0",
                    padding: "0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#000",
                    overflow: "hidden",
                    visibility: "visible",
                    opacity: "1",
                    zIndex: "2147483647"
                }
            );

            /*
             * GIF
             *
             * CAMINHO EXATO:
             *
             * assets/imagens/chokito.gif
             */
            const gif =
                document.createElement("img");

            gif.id =
                "chokito-gif";

            gif.alt =
                "Chokito";

            gif.src =
                "assets/imagens/chokito.gif";

            Object.assign(
                gif.style,
                {
                    position: "absolute",
                    top: "0",
                    left: "0",

                    display: "block",

                    width: "100vw",
                    height: "100vh",

                    minWidth: "100vw",
                    minHeight: "100vh",

                    maxWidth: "none",
                    maxHeight: "none",

                    margin: "0",
                    padding: "0",

                    border: "0",

                    objectFit: "contain",
                    objectPosition: "center",

                    visibility: "visible",
                    opacity: "1",

                    zIndex: "2147483647"
                }
            );

            /*
             * QUANDO O GIF CARREGAR
             */
            gif.onload = () => {

                console.log(
                    "CHOKITO.GIF CARREGADO E VISÍVEL!"
                );

                gif.style.display =
                    "block";

                gif.style.visibility =
                    "visible";

                gif.style.opacity =
                    "1";
            };

            /*
             * ERRO REAL
             */
            gif.onerror = () => {

                console.error(
                    "ERRO AO CARREGAR:"
                );

                console.error(
                    "assets/imagens/chokito.gif"
                );
            };

            /*
             * COLOCA GIF NO OVERLAY
             */
            overlay.appendChild(gif);

            /*
             * COLOCA OVERLAY DIRETO NO BODY
             */
            document.body.appendChild(
                overlay
            );

            /*
             * FORÇA A RENDERIZAÇÃO
             */
            requestAnimationFrame(() => {

                overlay.style.display =
                    "flex";

                overlay.style.visibility =
                    "visible";

                gif.style.display =
                    "block";

                gif.style.visibility =
                    "visible";
            });
        };

        /*
         * =================================================
         * TECLADO
         * =================================================
         */
        this.cassianTeclado =
            (evento) => {

                if (
                    window.__CASSIAN_MEME_ATIVO
                ) {
                    return;
                }

                /*
                 * CIMA
                 */
                if (
                    evento.key ===
                    "ArrowUp"
                ) {

                    evento.preventDefault();

                    selecionado--;

                    if (
                        selecionado < 0
                    ) {
                        selecionado =
                            opcoes.length - 1;
                    }

                    atualizarSelecao();

                    return;
                }

                /*
                 * BAIXO
                 */
                if (
                    evento.key ===
                    "ArrowDown"
                ) {

                    evento.preventDefault();

                    selecionado++;

                    if (
                        selecionado >=
                        opcoes.length
                    ) {
                        selecionado = 0;
                    }

                    atualizarSelecao();

                    return;
                }

                /*
                 * ENTER
                 */
                if (
                    evento.key ===
                    "Enter"
                ) {

                    evento.preventDefault();

                    /*
                     * JOGAR
                     */
                    if (
                        selecionado === 0
                    ) {

                        mostrarChokito();

                        return;
                    }

                    /*
                     * DESISTIR
                     */
                    if (
                        selecionado === 1
                    ) {

                        if (typeof Input !== "undefined") {
                            Input.removerContexto("ui-cassian");
                        }

                        this.cassianTeclado =
                            null;

                        this.pararBruno();
                        this.pararCassianAudio();
                        this.pararTrollAudio();

                        try {
                            caixa.remove();
                        } catch (erro) {}

                        game.style.position = "";
                        game.style.inset = "";
                        game.style.width = "";
                        game.style.height = "";
                        game.style.margin = "";
                        game.style.padding = "";
                        game.style.overflow = "";
                        game.style.background = "";

                        document.body.style.overflow = "";
                        document.body.style.background = "";

                        return;
                    }
                }
            };

        if (typeof Input !== "undefined") {
            Input.registrarContexto(
                "ui-cassian",
                evento => {
                    this.cassianTeclado(evento);
                    return true;
                }
            );
        }
    },

    /*
     * =====================================================
     * MENU NORMAL
     * =====================================================
     */
    criarMenu(
        titulo,
        mensagem,
        opcoes,
        selecionado = 0
    ) {

        if (window.__CASSIAN_MEME_ATIVO) {
            return;
        }

        this.limpar();

        const game =
            document.getElementById("game");

        if (!game) return;

        const caixa =
            document.createElement("div");

        caixa.className =
            "caixa-texto";

        caixa.innerHTML = `
            <div class="titulo">
                ${this.transformarMensagem(titulo)}
            </div>

            <div class="mensagem">
                ${this.transformarMensagem(mensagem)}
            </div>

            <div class="opcoes"></div>
        `;

        const lista =
            caixa.querySelector(
                ".opcoes"
            );

        opcoes.forEach(
            (texto, index) => {

                const item =
                    document.createElement("div");

                item.className =
                    "opcao";

                item.textContent =
                    index === selecionado
                        ? "♥ " + texto
                        : texto;

                item.style.fontSize =
                    "clamp(28px, 3vw, 48px)";

                item.style.letterSpacing =
                    "normal";

                item.style.wordSpacing =
                    "normal";

                lista.appendChild(
                    item
                );
            }
        );

        game.appendChild(
            caixa
        );
    },

    atualizarMenu(selecionado) {

        document
            .querySelectorAll(".opcao")
            .forEach(
                (item, index) => {

                    const texto =
                        item.innerText
                            .replace(
                                /^♥\s*/,
                                ""
                            );

                    item.textContent =
                        index === selecionado
                            ? "♥ " + texto
                            : texto;
                }
            );
    },

    /*
     * =====================================================
     * ENTRADA
     * =====================================================
     */
    entrada(
        titulo,
        mensagem
    ) {

        if (
            window.__CASSIAN_MEME_ATIVO
        ) {
            return;
        }

        this.limpar();

        const game =
            document.getElementById("game");

        if (!game) return;

        const caixa =
            document.createElement("div");

        caixa.className =
            "caixa-texto";

        caixa.innerHTML = `
            <div class="titulo">
                ${this.transformarMensagem(titulo)}
            </div>

            <div class="mensagem">
                ${this.transformarMensagem(mensagem)}
            </div>

            <div class="entrada">
                > <span id="textoDigitado"></span><span id="cursor">_</span>
            </div>
        `;

        game.appendChild(
            caixa
        );

        const tituloElemento =
            caixa.querySelector(
                ".titulo"
            );

        const mensagemElemento =
            caixa.querySelector(
                ".mensagem"
            );

        const entradaElemento =
            caixa.querySelector(
                ".entrada"
            );

        if (tituloElemento) {
            tituloElemento.style.fontSize =
                "clamp(32px, 4vw, 60px)";
        }

        if (mensagemElemento) {
            mensagemElemento.style.fontSize =
                "clamp(28px, 3.2vw, 52px)";
        }

        if (entradaElemento) {
            entradaElemento.style.fontSize =
                "clamp(28px, 3vw, 48px)";
        }
    },

    atualizarEntrada(texto) {

        if (
            window.__CASSIAN_MEME_ATIVO
        ) {
            return;
        }

        const span =
            document.getElementById(
                "textoDigitado"
            );

        if (span) {
            span.textContent =
                texto;
        }
    },

    /*
     * =====================================================
     * FINAL
     * =====================================================
     */
    final() {

        if (
            window.__CASSIAN_MEME_ATIVO
        ) {
            return;
        }

        this.limpar();

        const game =
            document.getElementById("game");

        if (!game) return;

        game.innerHTML = `
            <div id="final">

                <img
                    id="imagemTenebris"
                    src="assets/imagens/TENEBRIS.jpg"
                >

                <div id="finalTexto"></div>

            </div>
        `;
    },

    finalTexto(texto) {

        if (
            window.__CASSIAN_MEME_ATIVO
        ) {
            return;
        }

        const elemento =
            document.getElementById(
                "finalTexto"
            );

        if (!elemento) return;

        elemento.innerHTML =
            this.transformarMensagem(
                texto
            );
    },

    /*
     * =====================================================
     * GAME OVER
     * =====================================================
     */
    gameOver() {

        if (
            window.__CASSIAN_MEME_ATIVO
        ) {
            return;
        }

        this.gameOverAtivo =
            true;

        this.limpar();

        const game =
            document.getElementById(
                "game"
            );

        if (!game) return;

        game.innerHTML = `
            <div id="fadePreto"></div>

            <div id="sangueTopo"></div>

            <div id="sangueBaixo"></div>

            <div id="gameOver">

                <div id="fraseGameOver">

                    <p>
                        Não acabou ainda, Acabou?
                    </p>

                    <p>
                        Você não era fraco assim.
                    </p>

                    <p class="levante">
                        Levante.
                    </p>

                </div>

            </div>
        `;
    },

    atualizarGameOver() {

        const opcoes =
            document.querySelectorAll(
                ".opcaoGameOver"
            );

        opcoes.forEach(
            (opcao, index) => {

                if (
                    index ===
                    Game.gameOverSelecionado
                ) {

                    opcao.classList.add(
                        "selecionado"
                    );

                } else {

                    opcao.classList.remove(
                        "selecionado"
                    );
                }
            }
        );
    }
};