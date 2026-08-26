const Input = {

    iniciado: false,

    pressionado: false,

    texto: "",

    entradaAtiva: false,
    tipoEntrada: "",

    // Todas as entradas físicas passam por este objeto.
    teclas: {},
    contextos: new Map(),
    hooks: new Map(),


    // =====================================================
    // INICIAR
    // =====================================================

    iniciar() {

        if (this.iniciado)
            return;

        this.iniciado = true;

        this._keydown = evento => this.tecla(evento);
        this._keyup = evento => this.soltar(evento);
        this._blur = () => this.limparTeclas();

        document.addEventListener("keydown", this._keydown);
        document.addEventListener("keyup", this._keyup);
        window.addEventListener("blur", this._blur);

        console.log(
            "INPUT INICIADO"
        );

    },


    // =====================================================
    // TECLA
    // =====================================================

    tecla(evento) {

        // =================================================
        // PROTEÇÃO CONTRA EVENTO INVÁLIDO
        // =================================================

        if (!evento)
            return;

        const tecla = evento.key;

        if (
            typeof tecla !== "string" ||
            tecla.length === 0
        ) {
            return;
        }


        // =================================================
        // ESTADO FÍSICO DA TECLA
        // =================================================

        this.teclas[tecla] = true;

        if (typeof Movimento !== "undefined" && Movimento.teclas) {
            Movimento.teclas[tecla] = true;
        }

        if (typeof Coracao !== "undefined" && Coracao.teclas) {
            Coracao.teclas[String(tecla).toLowerCase()] = true;
        }

        if (typeof Perdido !== "undefined" && Perdido.teclasPressionadas) {
            Perdido.teclasPressionadas[tecla] = true;
        }

        // =================================================
        // ENTRADA DE TEXTO — PRIORIDADE ABSOLUTA
        // =================================================
        // Não dependemos de Introducao[Game.cenaAtual] aqui.
        // Durante transições/diálogos o índice pode continuar apontando
        // para a cena anterior por alguns instantes. Game.tipoEntrada é
        // definido pelo Engine no momento em que a caixa é criada.
        const entradaAtiva =
            this.entradaAtiva === true &&
            (this.tipoEntrada === "pessoa" || this.tipoEntrada === "criacao");

        if (entradaAtiva) {

            if (tecla === "Backspace") {
                this.texto = this.texto.slice(0, -1);
                if (typeof UI !== "undefined" && typeof UI.atualizarEntrada === "function") {
                    UI.atualizarEntrada(this.texto);
                }
                evento.preventDefault?.();
                return;
            }

            if (tecla === "Enter") {
                if (!this.texto.trim()) {
                    evento.preventDefault?.();
                    return;
                }

                const valor = this.texto.trim();
                const tipo = this.tipoEntrada || Game.tipoEntrada;

                Game.nome = valor;
                console.log("ENTRADA:", tipo, valor);

                if (typeof TecladoMobile !== "undefined" && typeof TecladoMobile.fechar === "function") {
                    TecladoMobile.fechar();
                }
                this.texto = "";
                this.entradaAtiva = false;
                this.tipoEntrada = "";

                // Limpa o tipo ANTES de chamar o Engine, para impedir
                // que a próxima cena herde a entrada antiga.
                Game.tipoEntrada = "";

                if (tipo === "pessoa" && typeof Engine !== "undefined" && typeof Engine.receberNome === "function") {
                    Engine.receberNome(valor);
                } else if (tipo === "criacao" && typeof Engine !== "undefined" && typeof Engine.receberCriacao === "function") {
                    Engine.receberCriacao(valor);
                }

                evento.preventDefault?.();
                return;
            }

            // Caracteres imprimíveis. Ignora atalhos Ctrl/Alt/Meta para
            // não transformar Ctrl+alguma-coisa em texto.
            if (tecla.length === 1 && !evento.ctrlKey && !evento.altKey && !evento.metaKey) {
                if (this.texto.length < (Game.limiteNome || 14)) {
                    this.texto += tecla;

                    // =================================================
                    // EASTER EGG OCULTO — BAPTISTA
                    // =================================================
                    // Ao completar exatamente "Baptista", o jogo toca
                    // Novamente.mp3 e encerra a sessão sem aviso.
                    if (this.texto === "Baptista") {
                        this.ativarEasterEggBaptista();
                        evento.preventDefault?.();
                        return;
                    }

                    // =================================================
                    // EASTER EGG OCULTO — SPIKE
                    // =================================================
                    // Só existe na entrada "Qual o nome da sua criação?".
                    // Ao completar "Spike", exibe a mensagem secreta e
                    // toca Novamente.mp3. A mensagem some após 10 segundos.
                    if (
                        this.tipoEntrada === "criacao" &&
                        this.texto.toLowerCase() === "spike" &&
                        !this._spikeAtivado
                    ) {

                        this.ativarEasterEggSpike();

                    }

                    if (typeof UI !== "undefined" && typeof UI.atualizarEntrada === "function") {
                        UI.atualizarEntrada(this.texto);
                    }
                }
                evento.preventDefault?.();
                return;
            }

            evento.preventDefault?.();
            return;
        }

        // =================================================
        // REPETIÇÃO DE AÇÕES DISCRETAS
        // =================================================

        if (evento.repeat && ["Enter", "Escape", "Space", " "].includes(tecla)) {
            return;
        }

        // =================================================
        // ENTRADA DE TEXTO TEM PRIORIDADE
        // =================================================
        // Alguns contextos globais (especialmente os da batalha/mobile)
        // podem continuar registrados durante a troca de cena. Se eles
        // consumirem a tecla antes daqui, a segunda caixa de nome fica
        // "morta" até um Ctrl+F5. Quando a cena é uma entrada, deixamos
        // as teclas chegarem ao bloco de texto abaixo.
        const cenaAtualInput =
            (typeof Introducao !== "undefined" && typeof Game !== "undefined")
                ? Introducao[Game.cenaAtual]
                : null;

        const entradaDeTextoAtiva = this.entradaAtiva === true;

        // =================================================
        // HOOKS GLOBAIS
        // =================================================

        if (!entradaDeTextoAtiva) {
        for (const handler of this.hooks.values()) {
            try {
                if (handler({
                    key: tecla,
                    repeat: !!evento.repeat,
                    originalEvent: evento,
                    preventDefault: () => {
                        if (typeof evento.preventDefault === "function") evento.preventDefault();
                    },
                    stopPropagation: () => {
                        if (typeof evento.stopPropagation === "function") evento.stopPropagation();
                    }
                }) === true) {
                    if (typeof evento.preventDefault === "function") evento.preventDefault();
                    return;
                }
            } catch (erro) {
                console.error("Erro no hook de teclado:", erro);
            }
        }

        }

        // =================================================
        // ATAQUE GLOBAL
        // =================================================

        if (
            !entradaDeTextoAtiva &&
            (
                tecla === " " ||
                tecla === "Space" ||
                tecla.toLowerCase() === "j"
            )
        ) {

            if (
                typeof Batalha !== "undefined" &&
                Batalha.ativa
            ) {

                if (typeof Movimento !== "undefined" && typeof Movimento.atacar === "function") {
                    Movimento.atacar();
                }

                return;
            }
        }

        // =================================================
        // CONTEXTOS ATIVOS
        // =================================================

        if (!entradaDeTextoAtiva) {
        const contextos = Array.from(this.contextos.values()).reverse();

        for (const handler of contextos) {
            try {
                if (handler({
                    key: tecla,
                    repeat: !!evento.repeat,
                    originalEvent: evento,
                    preventDefault: () => {
                        if (typeof evento.preventDefault === "function") evento.preventDefault();
                    },
                    stopPropagation: () => {
                        if (typeof evento.stopPropagation === "function") evento.stopPropagation();
                    }
                }) === true) {
                    if (typeof evento.preventDefault === "function") evento.preventDefault();
                    return;
                }
            } catch (erro) {
                console.error("Erro no contexto de teclado:", erro);
            }
        }

        // =================================================
        // PREVENT DEFAULT SE EXISTIR
        // =================================================

        if (
            typeof evento.preventDefault === "function"
        ) {

            evento.preventDefault();

        }


        // =================================================
        // DIÁLOGO DO BONECO
        // =================================================

        if (
            typeof Boneco !== "undefined" &&
            Boneco.dialogoAtivo
        ) {
            Boneco.tecla(tecla);
            return;
        }

        // =================================================
        // CENA SECRETA - PERDIDO
        // =================================================

        if (
            typeof Perdido !== "undefined" &&
            Perdido.ativo
        ) {

            Perdido.tecla(tecla);

            return;

        }


        // =================================================
        // PERGUNTAS - INTRODUÇÃO
        // =================================================

        if (
            typeof Game !== "undefined" &&
            Game.perguntasInicio
        ) {

            if (
                tecla === "Enter"
            ) {

                if (
                    typeof Engine !== "undefined" &&
                    typeof Engine.avancarInicioPerguntas === "function"
                ) {

                    Engine.avancarInicioPerguntas();

                }

            }

            return;

        }


        // =================================================
        // VOCÊ ACEITA?
        // =================================================

        if (
            typeof Game !== "undefined" &&
            Game.perguntasAceite
        ) {

            if (
                tecla === "ArrowDown"
            ) {

                Game.perguntaSelecionada++;

                if (
                    Game.perguntaSelecionada >= 2
                ) {

                    Game.perguntaSelecionada = 0;

                }

                if (
                    typeof UI !== "undefined" &&
                    typeof UI.atualizarMenu === "function"
                ) {

                    UI.atualizarMenu(
                        Game.perguntaSelecionada
                    );

                }

                return;

            }


            if (
                tecla === "ArrowUp"
            ) {

                Game.perguntaSelecionada--;

                if (
                    Game.perguntaSelecionada < 0
                ) {

                    Game.perguntaSelecionada = 1;

                }

                if (
                    typeof UI !== "undefined" &&
                    typeof UI.atualizarMenu === "function"
                ) {

                    UI.atualizarMenu(
                        Game.perguntaSelecionada
                    );

                }

                return;

            }


            if (
                tecla === "Enter"
            ) {

                if (
                    this.pressionado
                )
                    return;

                this.bloquearEnter();

                if (
                    typeof Engine !== "undefined" &&
                    typeof Engine.escolherAceitePerguntas === "function"
                ) {

                    Engine.escolherAceitePerguntas();

                }

                return;

            }

            return;

        }


        // =================================================
        // RESPOSTA DA PERGUNTA
        // =================================================

        if (
            typeof Game !== "undefined" &&
            Game.perguntaRespostaAtiva
        ) {

            if (
                tecla === "Enter"
            ) {

                if (
                    this.pressionado
                )
                    return;

                this.bloquearEnter();

                if (
                    typeof Engine !== "undefined" &&
                    typeof Engine.avancarRespostaPergunta === "function"
                ) {

                    Engine.avancarRespostaPergunta();

                }

            }

            return;

        }


        // =================================================
        // PERGUNTA PRINCIPAL
        // =================================================

        if (
            typeof Game !== "undefined" &&
            Game.perguntaAtual !== null
        ) {

            const pergunta =
                typeof Perguntas !== "undefined"
                    ? Perguntas[
                        Game.perguntaAtual
                    ]
                    : null;

            if (!pergunta)
                return;


            // ---------------------------------------------
            // BAIXO
            // ---------------------------------------------

            if (
                tecla === "ArrowDown"
            ) {

                Game.perguntaSelecionada++;

                if (
                    Game.perguntaSelecionada >=
                    pergunta.pergunta.opcoes.length
                ) {

                    Game.perguntaSelecionada = 0;

                }

                if (
                    typeof UI !== "undefined" &&
                    typeof UI.atualizarMenu === "function"
                ) {

                    UI.atualizarMenu(
                        Game.perguntaSelecionada
                    );

                }

                return;

            }


            // ---------------------------------------------
            // CIMA
            // ---------------------------------------------

            if (
                tecla === "ArrowUp"
            ) {

                Game.perguntaSelecionada--;

                if (
                    Game.perguntaSelecionada < 0
                ) {

                    Game.perguntaSelecionada =
                        pergunta.pergunta.opcoes.length - 1;

                }

                if (
                    typeof UI !== "undefined" &&
                    typeof UI.atualizarMenu === "function"
                ) {

                    UI.atualizarMenu(
                        Game.perguntaSelecionada
                    );

                }

                return;

            }


            // ---------------------------------------------
            // ENTER
            // ---------------------------------------------

            if (
                tecla === "Enter"
            ) {

                if (
                    this.pressionado
                )
                    return;

                this.bloquearEnter();

                if (
                    typeof Engine !== "undefined" &&
                    typeof Engine.escolherPergunta === "function"
                ) {

                    Engine.escolherPergunta();

                }

                return;

            }

            return;

        }


        // =================================================
        // GAME OVER
        // =================================================

        if (
            typeof UI !== "undefined" &&
            UI.gameOverAtivo &&
            typeof GameOver !== "undefined" &&
            !GameOver.escrevendo
        ) {

            if (
                tecla === "ArrowDown"
            ) {

                Game.gameOverSelecionado++;

                if (
                    Game.gameOverSelecionado > 1
                ) {

                    Game.gameOverSelecionado = 0;

                }

                if (
                    typeof GameOver.atualizarMenu === "function"
                ) {

                    GameOver.atualizarMenu();

                }

                return;

            }


            if (
                tecla === "ArrowUp"
            ) {

                Game.gameOverSelecionado--;

                if (
                    Game.gameOverSelecionado < 0
                ) {

                    Game.gameOverSelecionado = 1;

                }

                if (
                    typeof GameOver.atualizarMenu === "function"
                ) {

                    GameOver.atualizarMenu();

                }

                return;

            }


            if (
                tecla === "Enter"
            ) {

                if (
                    this.pressionado
                )
                    return;

                this.bloquearEnter();

                if (
                    typeof GameOver.escolher === "function"
                ) {

                    GameOver.escolher();

                }

                return;

            }

        }


        // =================================================
        // PESSOA FALANDO
        // =================================================

        if (
            typeof Engine !== "undefined" &&
            Engine.pessoaAtual
        ) {

            if (
                tecla === "Enter"
            ) {

                if (
                    this.pressionado
                )
                    return;

                this.bloquearEnter();

                if (
                    typeof Engine.mostrarFalaPessoa === "function"
                ) {

                    Engine.mostrarFalaPessoa();

                }

            }

            return;

        }


        }

        // =================================================
        // CENA ATUAL
        // =================================================

        if (
            typeof Introducao === "undefined" ||
            typeof Game === "undefined"
        ) {

            return;

        }


        const cena =
            Introducao[
                Game.cenaAtual
            ];


        if (!cena)
            return;


        // =================================================
        // ENTRADA DE TEXTO
        // =================================================

        if (
            cena.tipo === "entrada"
        ) {

            // ---------------------------------------------
            // BACKSPACE
            // ---------------------------------------------

            if (
                tecla === "Backspace"
            ) {

                this.texto =
                    this.texto.slice(
                        0,
                        -1
                    );

                if (
                    typeof UI !== "undefined" &&
                    typeof UI.atualizarEntrada === "function"
                ) {

                    UI.atualizarEntrada(
                        this.texto
                    );

                }

                return;

            }


            // ---------------------------------------------
            // ENTER
            // ---------------------------------------------

            if (
                tecla === "Enter"
            ) {

                if (
                    this.texto.trim() === ""
                ) {

                    return;

                }


                Game.nome =
                    this.texto.trim();


                console.log(
                    "ENTRADA:",
                    Game.tipoEntrada,
                    Game.nome
                );


                if (
                    typeof TecladoMobile !==
                    "undefined" &&
                    typeof TecladoMobile.fechar ===
                    "function"
                ) {

                    TecladoMobile.fechar();

                }


                // =========================================
                // PESSOA
                // =========================================

                if (
                    Game.tipoEntrada === "pessoa"
                ) {

                    // -------------------------------------
                    // MEME DAS MONTANHAS
                    // -------------------------------------

                    if (
                        Game.nome.toLowerCase() ===
                        "montanhas"
                    ) {

                        const mensagemOriginal =
                            document.getElementById(
                                "game"
                            );


                        if (
                            mensagemOriginal
                        ) {

                            mensagemOriginal.innerHTML =
                                "";


                            const caixa =
                                document.createElement(
                                    "div"
                                );


                            caixa.className =
                                "caixa-texto";


                            caixa.innerHTML = `

                                <div class="titulo">
                                    ...
                                </div>

                                <div class="mensagem">
                                    O Segredo nas Montanhas são os amigos que fazemos pelo caminho.
                                </div>

                            `;


                            mensagemOriginal.appendChild(
                                caixa
                            );


                            setTimeout(
                                () => {

                                    if (
                                        typeof Engine !== "undefined" &&
                                        typeof Engine.receberNome === "function"
                                    ) {

                                        Engine.receberNome(
                                            Game.nome
                                        );

                                    }

                                },
                                3000
                            );

                        }


                        this.texto = "";

                        return;

                    }


                    // -------------------------------------
                    // NOME NORMAL
                    // -------------------------------------

                    if (
                        typeof Engine !== "undefined" &&
                        typeof Engine.receberNome === "function"
                    ) {

                        Engine.receberNome(
                            Game.nome
                        );

                    }

                }


                // =========================================
                // CRIAÇÃO
                // =========================================

                else if (
                    Game.tipoEntrada === "criacao"
                ) {

                    if (
                        typeof Engine !== "undefined" &&
                        typeof Engine.receberCriacao === "function"
                    ) {

                        Engine.receberCriacao(
                            Game.nome
                        );

                    }

                }


                this.texto = "";

                return;

            }


            // ---------------------------------------------
            // DIGITAÇÃO
            // ---------------------------------------------

            if (
                tecla.length === 1
            ) {

                if (
                    this.texto.length <
                    Game.limiteNome
                ) {

                    this.texto +=
                        tecla;


                    if (
                        typeof UI !== "undefined" &&
                        typeof UI.atualizarEntrada === "function"
                    ) {

                        UI.atualizarEntrada(
                            this.texto
                        );

                    }

                }

            }


            return;

        }


        // =================================================
        // ENTER NORMAL
        // =================================================

        if (
            tecla === "Enter"
        ) {

            if (
                this.pressionado
            )
                return;


            this.bloquearEnter();


            if (
                typeof Engine !== "undefined" &&
                typeof Engine.cancelarEspera === "function"
            ) {

                Engine.cancelarEspera();

            }


            if (
                cena.tipo === "menu"
            ) {

                if (
                    typeof Engine.escolher === "function"
                ) {

                    Engine.escolher(
                        Game.selecionado
                    );

                }

            }


            else if (
                cena.tipo === "texto"
            ) {

                if (
                    Game.cenaAtual <
                    Introducao.length - 1
                ) {

                    if (
                        typeof Engine.proximaCena === "function"
                    ) {

                        Engine.proximaCena();

                    }

                }

            }


            return;

        }


        // =================================================
        // MENU NORMAL
        // =================================================

        if (
            cena.tipo !== "menu"
        )
            return;


        // =================================================
        // BAIXO
        // =================================================

        if (
            tecla === "ArrowDown"
        ) {

            Game.selecionado++;


            if (
                Game.selecionado >=
                cena.opcoes.length
            ) {

                Game.selecionado = 0;

            }


            if (
                typeof Engine.atualizar === "function"
            ) {

                Engine.atualizar();

            }


            return;

        }


        // =================================================
        // CIMA
        // =================================================

        if (
            tecla === "ArrowUp"
        ) {

            Game.selecionado--;


            if (
                Game.selecionado < 0
            ) {

                Game.selecionado =
                    cena.opcoes.length - 1;

            }


            if (
                typeof Engine.atualizar === "function"
            ) {

                Engine.atualizar();

            }


            return;

        }

    },


    // =====================================================
    // SOLTAR TECLA
    // =====================================================

    soltar(evento) {

        if (!evento || typeof evento.key !== "string" || !evento.key) return;

        const tecla = evento.key;

        this.teclas[tecla] = false;

        if (typeof Movimento !== "undefined" && Movimento.teclas) {
            Movimento.teclas[tecla] = false;
        }

        if (typeof Coracao !== "undefined" && Coracao.teclas) {
            Coracao.teclas[String(tecla).toLowerCase()] = false;
        }

        if (typeof Perdido !== "undefined" && Perdido.teclasPressionadas) {
            Perdido.teclasPressionadas[tecla] = false;
        }
    },

    // =====================================================
    // CONTEXTOS / HOOKS
    // =====================================================

    registrarContexto(nome, handler) {
        if (!nome || typeof handler !== "function") return;
        this.contextos.set(nome, handler);
    },

    removerContexto(nome) {
        this.contextos.delete(nome);
    },

    registrarHook(nome, handler) {
        if (!nome || typeof handler !== "function") return;
        this.hooks.set(nome, handler);
    },

    removerHook(nome) {
        this.hooks.delete(nome);
    },

    limparTeclas() {
        this.teclas = {};

        if (typeof Movimento !== "undefined" && Movimento.teclas) {
            Movimento.teclas = {};
        }

        if (typeof Coracao !== "undefined" && typeof Coracao.limparTeclas === "function") {
            Coracao.limparTeclas();
        }

        if (typeof Perdido !== "undefined") {
            Perdido.teclasPressionadas = {};
        }
    },

    // =====================================================
    // BLOQUEAR ENTER
    // =====================================================

    bloquearEnter() {

        this.pressionado =
            true;


        setTimeout(
            () => {

                this.pressionado =
                    false;

            },
            250
        );

    },

    ativarEasterEggSpike() {

        if (this._spikeAtivado)
            return;

        this._spikeAtivado = true;

        // Interrompe a entrada imediatamente para que "Spike" seja
        // tratado como o gatilho do easter egg.
        this.entradaAtiva = false;
        this.tipoEntrada = "";

        if (typeof Game !== "undefined") {
            Game.tipoEntrada = "";
        }

        if (typeof TecladoMobile !== "undefined" &&
            typeof TecladoMobile.fechar === "function") {
            try {
                TecladoMobile.fechar();
            } catch (_) {}
        }

        // Mensagem NORMAL, em primeiro plano, como uma fala dirigida
        // diretamente ao Spike. Não é um easter egg escondido.
        if (typeof UI !== "undefined" &&
            typeof UI.texto === "function") {
            UI.texto(
                "",
                "VOCÊ ESTÁ PROCURANDO, NÃO ESTÁ?"
            );
        }

        // Som do easter egg.
        const audio = new Audio("assets/audio/Novamente.mp3");
        audio.volume = 1;
        audio.preload = "auto";

        try {
            const promessa = audio.play();
            if (promessa && typeof promessa.catch === "function") {
                promessa.catch(() => {});
            }
        } catch (_) {}

        console.log("EASTER EGG ATIVADO: SPIKE");

        // Deixa a mensagem visível por um momento e então fecha o jogo
        // sem abrir outra tela ou mostrar aviso.
        setTimeout(() => {

            try {
                window.close();
            } catch (_) {}

            // Navegadores costumam bloquear window.close() em abas
            // abertas manualmente. Nesse caso, esvaziamos a página.
            setTimeout(() => {

                try {
                    window.location.replace("about:blank");
                } catch (_) {
                    try {
                        document.documentElement.innerHTML = "";
                    } catch (_) {}
                }

            }, 100);

        }, 2500);

    },

    ativarEasterEggBaptista() {

        if (this._baptistaAtivado)
            return;

        this._baptistaAtivado = true;
        this.entradaAtiva = false;
        this.tipoEntrada = "";

        if (typeof Game !== "undefined") {
            Game.tipoEntrada = "";
        }

        if (typeof TecladoMobile !== "undefined" && typeof TecladoMobile.fechar === "function") {
            try {
                TecladoMobile.fechar();
            } catch (_) {}
        }

        // Congela o jogo imediatamente e deixa a tela preta, sem aviso.
        const bloqueio = document.createElement("div");
        bloqueio.id = "easterEggBaptista";
        Object.assign(bloqueio.style, {
            position: "fixed",
            inset: "0",
            background: "#000",
            zIndex: "2147483647",
            pointerEvents: "all"
        });
        document.body.appendChild(bloqueio);

        // Toca o áudio secreto.
        const audio = new Audio("assets/audio/Novamente.mp3");
        audio.volume = 1;
        audio.preload = "auto";

        let encerrado = false;
        const encerrarJogo = () => {
            if (encerrado) return;
            encerrado = true;

            // Alguns navegadores só permitem fechar abas abertas por script.
            // Quando window.close() for bloqueado, about:blank encerra a página do jogo.
            try {
                window.close();
            } catch (_) {}

            setTimeout(() => {
                try {
                    window.location.replace("about:blank");
                } catch (_) {
                    document.documentElement.innerHTML = "";
                }
            }, 150);
        };

        audio.addEventListener("ended", encerrarJogo, { once: true });
        audio.addEventListener("error", encerrarJogo, { once: true });

        try {
            const promessa = audio.play();
            if (promessa && typeof promessa.catch === "function") {
                promessa.catch(encerrarJogo);
            }
        } catch (_) {
            encerrarJogo();
        }

        console.log("EASTER EGG ATIVADO: BAPTISTA");

    },



};


// =========================================================
// COMPATIBILIDADE / GARANTIA DOS HOOKS
// =========================================================
// Mantém compatibilidade caso outro script tenha carregado uma versão
// antiga do Input. Não substitui os métodos existentes.
if (typeof Input !== "undefined") {

    if (typeof Input.registrarHook !== "function") {
        Input.hooks = Input.hooks || new Map();
        Input.registrarHook = function(nome, handler) {
            if (!nome || typeof handler !== "function") return;
            this.hooks.set(nome, handler);
        };
    }

    if (typeof Input.removerHook !== "function") {
        Input.hooks = Input.hooks || new Map();
        Input.removerHook = function(nome) {
            this.hooks.delete(nome);
        };
    }

    if (typeof Input.registrarContexto !== "function") {
        Input.contextos = Input.contextos || new Map();
        Input.registrarContexto = function(nome, handler) {
            if (!nome || typeof handler !== "function") return;
            this.contextos.set(nome, handler);
        };
    }

    if (typeof Input.removerContexto !== "function") {
        Input.contextos = Input.contextos || new Map();
        Input.removerContexto = function(nome) {
            this.contextos.delete(nome);
        };
    }

}

// =========================================================
// INICIALIZAR
// =========================================================

window.addEventListener(
    "load",
    () => {

        Input.iniciar();

    }
);