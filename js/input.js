const Input = {

    iniciado: false,

    pressionado: false,

    texto: "",


    // =====================================================
    // INICIAR
    // =====================================================

    iniciar(){

        if(this.iniciado)
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

    tecla(evento){

        const tecla = evento.key;


        // =================================================
        // CENA SECRETA - PERDIDO
        // =================================================

        if(
            typeof Perdido !== "undefined" &&
            Perdido.ativo
        ){

            evento.preventDefault();

            Perdido.tecla(tecla);

            return;

        }


        // =================================================
        // PEGAR CENA ATUAL
        // =================================================

        const cena =
            Introducao[
                Game.cenaAtual
            ];


        // =================================================
        // ENTRADA DE TEXTO
        //
        // IMPORTANTE:
        // Fica ANTES dos outros Enter.
        // Assim Enter e Backspace não são capturados
        // por outro sistema.
        // =================================================

        if(
            cena &&
            cena.tipo === "entrada"
        ){

            // =============================================
            // BACKSPACE
            // =============================================

            if(
                tecla === "Backspace"
            ){

                evento.preventDefault();

                evento.stopPropagation();


                if(
                    this.texto.length > 0
                ){

                    this.texto =
                        this.texto.slice(
                            0,
                            -1
                        );

                }


                UI.atualizarEntrada(
                    this.texto
                );


                console.log(
                    "APAGOU:",
                    this.texto
                );


                return;

            }


            // =============================================
            // ENTER
            // =============================================

            if(
                tecla === "Enter"
            ){

                evento.preventDefault();

                evento.stopPropagation();


                // Evita duplo Enter
                if(
                    this.pressionado
                )
                    return;


                this.bloquearEnter();


                // -----------------------------------------
                // NÃO DEIXA CONFIRMAR VAZIO
                // -----------------------------------------

                if(
                    this.texto.trim() === ""
                ){

                    console.log(
                        "NOME VAZIO"
                    );

                    return;

                }


                // -----------------------------------------
                // SALVAR NOME
                // -----------------------------------------

                Game.nome =
                    this.texto.trim();


                console.log(
                    "ENTRADA:",
                    Game.tipoEntrada,
                    Game.nome
                );


                // -----------------------------------------
                // FECHAR TECLADO MOBILE
                // -----------------------------------------

                if(
                    typeof TecladoMobile !==
                    "undefined"
                ){

                    if(
                        typeof TecladoMobile.fechar ===
                        "function"
                    ){

                        TecladoMobile.fechar();

                    }

                }


                // =========================================
                // ENTRADA DE PESSOA
                // =========================================

                if(
                    Game.tipoEntrada === "pessoa"
                ){

                    // =====================================
                    // MEME DAS MONTANHAS
                    // =====================================

                    if(
                        Game.nome.toLowerCase() ===
                        "montanhas"
                    ){

                        const mensagemOriginal =
                            document.getElementById(
                                "game"
                            );


                        if(
                            mensagemOriginal
                        ){

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

                                    if(
                                        typeof Engine !==
                                        "undefined" &&
                                        typeof Engine.receberNome ===
                                        "function"
                                    ){

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


                    // =====================================
                    // NOME NORMAL
                    // =====================================

                    if(
                        typeof Engine !==
                        "undefined" &&
                        typeof Engine.receberNome ===
                        "function"
                    ){

                        Engine.receberNome(
                            Game.nome
                        );

                    }

                }


                // =========================================
                // ENTRADA DE CRIAÇÃO
                // =========================================

                else if(
                    Game.tipoEntrada === "criacao"
                ){

                    if(
                        typeof Engine !==
                        "undefined" &&
                        typeof Engine.receberCriacao ===
                        "function"
                    ){

                        Engine.receberCriacao(
                            Game.nome
                        );

                    }

                }


                // =========================================
                // LIMPAR TEXTO
                // =========================================

                this.texto = "";


                return;

            }


            // =============================================
            // DIGITAÇÃO
            // =============================================

            if(
                tecla.length === 1
            ){

                // Evita caracteres estranhos de controle
                if(
                    !evento.ctrlKey &&
                    !evento.altKey &&
                    !evento.metaKey
                ){

                    if(
                        this.texto.length <
                        Game.limiteNome
                    ){

                        this.texto +=
                            tecla;


                        UI.atualizarEntrada(
                            this.texto
                        );


                        console.log(
                            "DIGITOU:",
                            this.texto
                        );

                    }

                }


                return;

            }


            // Se estiver na entrada de nome,
            // nenhuma outra lógica deve receber a tecla.
            return;

        }


        // =================================================
        // PERGUNTAS - INTRODUÇÃO
        // =================================================

        if(
            Game.perguntasInicio
        ){

            if(
                tecla === "Enter"
            ){

                evento.preventDefault();

                Engine.avancarInicioPerguntas();

            }


            return;

        }


        // =================================================
        // VOCÊ ACEITA?
        // =================================================

        if(
            Game.perguntasAceite
        ){

            if(
                tecla === "ArrowDown"
            ){

                evento.preventDefault();


                Game.perguntaSelecionada++;


                if(
                    Game.perguntaSelecionada >= 2
                ){

                    Game.perguntaSelecionada = 0;

                }


                UI.atualizarMenu(
                    Game.perguntaSelecionada
                );


                return;

            }


            if(
                tecla === "ArrowUp"
            ){

                evento.preventDefault();


                Game.perguntaSelecionada--;


                if(
                    Game.perguntaSelecionada < 0
                ){

                    Game.perguntaSelecionada = 1;

                }


                UI.atualizarMenu(
                    Game.perguntaSelecionada
                );


                return;

            }


            if(
                tecla === "Enter"
            ){

                evento.preventDefault();


                if(
                    this.pressionado
                )
                    return;


                this.bloquearEnter();


                Engine.escolherAceitePerguntas();


                return;

            }


            return;

        }


        // =================================================
        // RESPOSTA DA PERGUNTA
        // =================================================

        if(
            Game.perguntaRespostaAtiva
        ){

            if(
                tecla === "Enter"
            ){

                evento.preventDefault();


                if(
                    this.pressionado
                )
                    return;


                this.bloquearEnter();


                Engine.avancarRespostaPergunta();

            }


            return;

        }


        // =================================================
        // PERGUNTA PRINCIPAL
        // =================================================

        if(
            Game.perguntaAtual !== null
        ){

            const pergunta =
                Perguntas[
                    Game.perguntaAtual
                ];


            if(
                !pergunta
            )
                return;


            // ---------------------------------------------
            // BAIXO
            // ---------------------------------------------

            if(
                tecla === "ArrowDown"
            ){

                evento.preventDefault();


                Game.perguntaSelecionada++;


                if(
                    Game.perguntaSelecionada >=
                    pergunta.pergunta.opcoes.length
                ){

                    Game.perguntaSelecionada = 0;

                }


                UI.atualizarMenu(
                    Game.perguntaSelecionada
                );


                return;

            }


            // ---------------------------------------------
            // CIMA
            // ---------------------------------------------

            if(
                tecla === "ArrowUp"
            ){

                evento.preventDefault();


                Game.perguntaSelecionada--;


                if(
                    Game.perguntaSelecionada < 0
                ){

                    Game.perguntaSelecionada =
                        pergunta.pergunta.opcoes.length - 1;

                }


                UI.atualizarMenu(
                    Game.perguntaSelecionada
                );


                return;

            }


            // ---------------------------------------------
            // ENTER
            // ---------------------------------------------

            if(
                tecla === "Enter"
            ){

                evento.preventDefault();


                if(
                    this.pressionado
                )
                    return;


                this.bloquearEnter();


                Engine.escolherPergunta();


                return;

            }


            return;

        }


        // =================================================
        // GAME OVER
        // =================================================

        if(
            UI.gameOverAtivo &&
            !GameOver.escrevendo
        ){

            if(
                tecla === "ArrowDown"
            ){

                evento.preventDefault();


                Game.gameOverSelecionado++;


                if(
                    Game.gameOverSelecionado > 1
                ){

                    Game.gameOverSelecionado = 0;

                }


                GameOver.atualizarMenu();


                return;

            }


            if(
                tecla === "ArrowUp"
            ){

                evento.preventDefault();


                Game.gameOverSelecionado--;


                if(
                    Game.gameOverSelecionado < 0
                ){

                    Game.gameOverSelecionado = 1;

                }


                GameOver.atualizarMenu();


                return;

            }


            if(
                tecla === "Enter"
            ){

                evento.preventDefault();


                if(
                    this.pressionado
                )
                    return;


                this.bloquearEnter();


                GameOver.escolher();


                return;

            }

        }


        // =================================================
        // PESSOA FALANDO
        // =================================================

        if(
            Engine.pessoaAtual
        ){

            if(
                tecla === "Enter"
            ){

                evento.preventDefault();


                if(
                    this.pressionado
                )
                    return;


                this.bloquearEnter();


                Engine.mostrarFalaPessoa();

            }


            return;

        }


        // =================================================
        // SE NÃO TEM CENA
        // =================================================

        if(
            !cena
        )
            return;


        // =================================================
        // ENTER NORMAL
        // =================================================

        if(
            tecla === "Enter"
        ){

            evento.preventDefault();


            if(
                this.pressionado
            )
                return;


            this.bloquearEnter();


            if(
                typeof Engine.cancelarEspera ===
                "function"
            ){

                Engine.cancelarEspera();

            }


            // ---------------------------------------------
            // MENU
            // ---------------------------------------------

            if(
                cena.tipo === "menu"
            ){

                Engine.escolher(
                    Game.selecionado
                );

            }


            // ---------------------------------------------
            // TEXTO
            // ---------------------------------------------

            else if(
                cena.tipo === "texto"
            ){

                if(
                    Game.cenaAtual <
                    Introducao.length - 1
                ){

                    Engine.proximaCena();

                }

            }


            return;

        }


        // =================================================
        // MENU NORMAL
        // =================================================

        if(
            cena.tipo !== "menu"
        )
            return;


        // =================================================
        // BAIXO
        // =================================================

        if(
            tecla === "ArrowDown"
        ){

            evento.preventDefault();


            Game.selecionado++;


            if(
                Game.selecionado >=
                cena.opcoes.length
            ){

                Game.selecionado = 0;

            }


            Engine.atualizar();


            return;

        }


        // =================================================
        // CIMA
        // =================================================

        if(
            tecla === "ArrowUp"
        ){

            evento.preventDefault();


            Game.selecionado--;


            if(
                Game.selecionado < 0
            ){

                Game.selecionado =
                    cena.opcoes.length - 1;

            }


            Engine.atualizar();


            return;

        }

    },


    // =====================================================
    // BLOQUEAR ENTER
    // =====================================================

    bloquearEnter(){

        this.pressionado = true;


        setTimeout(
            () => {

                this.pressionado = false;

            },
            250
        );

    }

};