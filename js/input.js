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

        const tecla =
            evento.key;

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
        // PERGUNTAS - INTRODUÇÃO
        // =================================================

        if(Game.perguntasInicio){

            if(tecla === "Enter"){

                evento.preventDefault();

                Engine.avancarInicioPerguntas();

            }

            return;

        }


        // =================================================
        // VOCÊ ACEITA?
        // =================================================

        if(Game.perguntasAceite){

            if(tecla === "ArrowDown"){

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


            if(tecla === "ArrowUp"){

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


            if(tecla === "Enter"){

                evento.preventDefault();

                if(this.pressionado)
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

        if(Game.perguntaRespostaAtiva){

            if(tecla === "Enter"){

                evento.preventDefault();

                if(this.pressionado)
                    return;


                this.bloquearEnter();

                Engine.avancarRespostaPergunta();

            }

            return;

        }


        // =================================================
        // PERGUNTA PRINCIPAL
        // =================================================

        if(Game.perguntaAtual !== null){

            const pergunta =
                Perguntas[
                    Game.perguntaAtual
                ];


            if(!pergunta)
                return;


            // ---------------------------------------------
            // BAIXO
            // ---------------------------------------------

            if(tecla === "ArrowDown"){

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


                console.log(
                    "PERGUNTA SELECIONADA:",
                    Game.perguntaSelecionada
                );


                return;

            }


            // ---------------------------------------------
            // CIMA
            // ---------------------------------------------

            if(tecla === "ArrowUp"){

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


                console.log(
                    "PERGUNTA SELECIONADA:",
                    Game.perguntaSelecionada
                );


                return;

            }


            // ---------------------------------------------
            // ENTER
            // ---------------------------------------------

            if(tecla === "Enter"){

                evento.preventDefault();


                if(this.pressionado)
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

            if(tecla === "ArrowDown"){

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


            if(tecla === "ArrowUp"){

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


            if(tecla === "Enter"){

                evento.preventDefault();

                if(this.pressionado)
                    return;


                this.bloquearEnter();

                GameOver.escolher();

                return;

            }

        }


        // =================================================
        // PESSOA FALANDO
        // =================================================

        if(Engine.pessoaAtual){

            if(tecla === "Enter"){

                evento.preventDefault();

                if(this.pressionado)
                    return;


                this.bloquearEnter();

                Engine.mostrarFalaPessoa();

            }


            return;

        }


        // =================================================
        // CENA ATUAL
        // =================================================

        const cena =
            Introducao[
                Game.cenaAtual
            ];


        if(!cena)
            return;


        // =================================================
        // ENTRADA DE TEXTO
        // =================================================

        if(cena.tipo === "entrada"){

            // ---------------------------------------------
            // BACKSPACE
            // ---------------------------------------------

            if(tecla === "Backspace"){

                evento.preventDefault();


                this.texto =
                    this.texto.slice(0, -1);


                UI.atualizarEntrada(
                    this.texto
                );


                return;

            }


            // ---------------------------------------------
            // ENTER
            // ---------------------------------------------

            if(tecla === "Enter"){

                evento.preventDefault();


                if(
                    this.texto.trim() === ""
                ){

                    return;

                }


                Game.nome =
                    this.texto.trim();


                console.log(
                    "ENTRADA:",
                    Game.tipoEntrada,
                    Game.nome
                );


                if(
                    typeof TecladoMobile !==
                    "undefined"
                ){

                    TecladoMobile.fechar();

                }


                if(
                    Game.tipoEntrada === "pessoa"
                ){

                    Engine.receberNome(
                        Game.nome
                    );

                }


                else if(
                    Game.tipoEntrada === "criacao"
                ){

                    Engine.receberCriacao(
                        Game.nome
                    );

                }


                this.texto = "";

                return;

            }


            // ---------------------------------------------
            // DIGITAÇÃO
            // ---------------------------------------------

            if(tecla.length === 1){

                if(
                    this.texto.length <
                    Game.limiteNome
                ){

                    this.texto += tecla;


                    UI.atualizarEntrada(
                        this.texto
                    );

                }

            }


            return;

        }


        // =================================================
        // ENTER NORMAL
        // =================================================

        if(tecla === "Enter"){

            evento.preventDefault();


            if(this.pressionado)
                return;


            this.bloquearEnter();


            Engine.cancelarEspera();


            if(cena.tipo === "menu"){

                Engine.escolher(
                    Game.selecionado
                );

            }


            else if(cena.tipo === "texto"){

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

        if(cena.tipo !== "menu")
            return;


        // =================================================
        // BAIXO
        // =================================================

        if(tecla === "ArrowDown"){

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

        if(tecla === "ArrowUp"){

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


        setTimeout(() => {

            this.pressionado = false;

        }, 250);

    }

};