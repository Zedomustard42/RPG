const Input = {

    iniciado: false,

    pressionado: false,

    texto: "",


    // =====================================================
    // INICIAR
    // =====================================================

    iniciar() {

        if (this.iniciado)
            return;

        this.iniciado = true;

        document.addEventListener(
            "keydown",
            this.tecla.bind(this)
        );

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
        // PREVENT DEFAULT SE EXISTIR
        // =================================================

        if (
            typeof evento.preventDefault === "function"
        ) {

            evento.preventDefault();

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

    }

};


// =========================================================
// INICIALIZAR
// =========================================================

window.addEventListener(
    "load",
    () => {

        Input.iniciar();

    }
);