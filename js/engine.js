const Game = {

    cenaAtual: 0,

    selecionado: 0,

    gameOverSelecionado: 0,

    textoPronto: false,

    nome: "",

    limiteNome: 14,

    tipoEntrada: "",

    emBatalha: false,

    finalIndice: 0,


    // =====================================================
    // PERGUNTAS
    // =====================================================

    perguntaAtual: null,

    perguntaSelecionada: 0,

    perguntasInicio: false,

    perguntasInicioEtapa: 0,

    perguntasAceite: false,

    perguntaRespostaAtiva: false,

    perguntaResposta: null,

    perguntaRespostaIndice: 0

};



const Engine = {

    tempoSemResposta: null,

    pessoaAtual: null,

    falaAtual: 0,

    iniciado: false,

    finalIndice: 0,


    // =====================================================
    // FALAS FINAIS
    // =====================================================

    finalMensagens: [

        "Interessante...",

        "Excelente.",

        "Obrigado, Máscara.",

        "Com tua ajuda... Seremos Melhores.",

        "Venha.",

        "Vamos Em Busca Do IMPOSSÍVEL."

    ],


    // =====================================================
    // INICIAR
    // =====================================================

    iniciar(){

        console.log(
            "ENGINE INICIANDO"
        );


        if(this.iniciado)
            return;


        this.iniciado =
            true;


        console.log(
            "ENGINE INICIOU"
        );


        Render.iniciar();

        Input.iniciar();

        this.iniciarCena();

    },


    // =====================================================
    // PERGUNTAS
    // =====================================================

    iniciarPerguntas(){

        Game.perguntaAtual =
            null;

        Game.perguntaSelecionada =
            0;

        Game.perguntasInicio =
            true;

        Game.perguntasInicioEtapa =
            0;

        Game.perguntasAceite =
            false;

        Game.perguntaRespostaAtiva =
            false;

        Game.perguntaResposta =
            null;

        Game.perguntaRespostaIndice =
            0;


        UI.texto(
            "Então...",
            "Então..."
        );

    },


    // =====================================================
    // AVANÇAR INTRODUÇÃO
    // =====================================================

    avancarInicioPerguntas(){

        if(
            Game.perguntasInicioEtapa === 0
        ){

            Game.perguntasInicioEtapa =
                1;


            UI.texto(
                "Devemos",
                "Começar."
            );


            return;

        }


        if(
            Game.perguntasInicioEtapa === 1
        ){

            Game.perguntasInicio =
                false;


            this.mostrarAceitePerguntas();

        }

    },


    // =====================================================
    // ACEITE
    // =====================================================

    mostrarAceitePerguntas(){

        Game.perguntasInicio =
            false;

        Game.perguntasAceite =
            true;

        Game.perguntaSelecionada =
            0;


        UI.criarMenu(

            "Você Aceita?",

            "",

            [
                "SIM",
                "NÃO"
            ],

            Game.perguntaSelecionada

        );

    },


    // =====================================================
    // ESCOLHER ACEITE
    // =====================================================

    escolherAceitePerguntas(){

        if(
            Game.perguntaSelecionada === 0
        ){

            Game.perguntasAceite =
                false;

            Game.perguntaAtual =
                "corpo";

            Game.perguntaSelecionada =
                0;


            this.mostrarPergunta();

            return;

        }


        if(
            Game.perguntaSelecionada === 1
        ){

            Game.perguntasAceite =
                false;


            AudioManager.tocar(
                "nao"
            );


            UI.limpar();


            setTimeout(() => {

                document.body.innerHTML =
                    "";

            }, 3000);

        }

    },


    // =====================================================
    // MOSTRAR PERGUNTA
    // =====================================================

    mostrarPergunta(){

        const pergunta =
            Perguntas[
                Game.perguntaAtual
            ];


        if(!pergunta){

            console.error(
                "PERGUNTA NÃO ENCONTRADA:",
                Game.perguntaAtual
            );

            return;

        }


        Game.perguntaRespostaAtiva =
            false;

        Game.perguntaResposta =
            null;

        Game.perguntaRespostaIndice =
            0;


        UI.criarMenu(

            pergunta.pergunta.titulo,

            pergunta.pergunta.mensagem || "",

            pergunta.pergunta.opcoes,

            Game.perguntaSelecionada

        );

    },


    // =====================================================
    // ESCOLHER PERGUNTA
    // =====================================================

    escolherPergunta(){

        const pergunta =
            Perguntas[
                Game.perguntaAtual
            ];


        if(!pergunta)
            return;


        const resposta =
            pergunta.respostas[
                Game.perguntaSelecionada
            ];


        if(!resposta)
            return;


        if(resposta.fechar){

            UI.limpar();


            setTimeout(() => {

                document.body.innerHTML =
                    "";

            }, 2000);


            return;

        }


        Game.perguntaResposta =
            resposta;

        Game.perguntaRespostaIndice =
            0;

        Game.perguntaRespostaAtiva =
            true;


        this.mostrarRespostaPergunta();

    },


    // =====================================================
    // RESPOSTA
    // =====================================================

    mostrarRespostaPergunta(){

        const resposta =
            Game.perguntaResposta;


        if(!resposta)
            return;


        const mensagens =
            Array.isArray(
                resposta.mensagens
            )
                ? resposta.mensagens
                : [
                    resposta.mensagem || ""
                ];


        if(
            Game.perguntaRespostaIndice >=
            mensagens.length
        ){

            this.finalizarRespostaPergunta();

            return;

        }


        UI.texto(

            resposta.titulo || "...",

            mensagens[
                Game.perguntaRespostaIndice
            ]

        );

    },


    // =====================================================
    // AVANÇAR RESPOSTA
    // =====================================================

    avancarRespostaPergunta(){

        const resposta =
            Game.perguntaResposta;


        if(!resposta)
            return;


        const mensagens =
            Array.isArray(
                resposta.mensagens
            )
                ? resposta.mensagens
                : [
                    resposta.mensagem || ""
                ];


        Game.perguntaRespostaIndice++;


        if(
            Game.perguntaRespostaIndice <
            mensagens.length
        ){

            this.mostrarRespostaPergunta();

            return;

        }


        this.finalizarRespostaPergunta();

    },


    // =====================================================
    // FINALIZAR RESPOSTA
    // =====================================================

    finalizarRespostaPergunta(){

        const resposta =
            Game.perguntaResposta;


        Game.perguntaRespostaAtiva =
            false;

        Game.perguntaResposta =
            null;

        Game.perguntaRespostaIndice =
            0;


        if(
            resposta &&
            resposta.proxima
        ){

            if(
                resposta.proxima ===
                "final"
            ){

                this.iniciarFinal();

                return;

            }


            Game.perguntaAtual =
                resposta.proxima;

            Game.perguntaSelecionada =
                0;


            this.mostrarPergunta();

            return;

        }


        console.log(
            "FIM DAS PERGUNTAS"
        );

    },


    // =====================================================
    // FINAL
    // =====================================================

    iniciarFinal(){

        Game.perguntaRespostaAtiva =
            false;

        Game.perguntaResposta =
            null;

        Game.perguntaRespostaIndice =
            0;

        Game.perguntaAtual =
            null;

        Game.perguntasInicio =
            false;

        Game.perguntasAceite =
            false;


        this.finalIndice =
            0;

        Game.finalIndice =
            0;


        // =================================================
        // PARAR BRUNO
        // =================================================

        AudioManager.pararMusica();


        // =================================================
        // LIMPAR
        // =================================================

        document.body.innerHTML =
            "";

        document.body.className =
            "";


        document.body.style.background =
            "#000000";

        document.body.style.backgroundImage =
            "none";

        document.body.style.backgroundColor =
            "#000000";


        // =================================================
        // TELA
        // =================================================

        const tela =
            document.createElement("div");


        tela.id =
            "tela-final";


        tela.style.position =
            "fixed";

        tela.style.inset =
            "0";

        tela.style.width =
            "100vw";

        tela.style.height =
            "100vh";

        tela.style.background =
            "#000000";

        tela.style.display =
            "flex";

        tela.style.alignItems =
            "center";

        tela.style.justifyContent =
            "center";

        tela.style.zIndex =
            "999999";


        // =================================================
        // TEXTO
        // =================================================

        const texto =
            document.createElement("div");


        texto.id =
            "texto-final";


        texto.style.color =
            "#FFFFFF";

        texto.style.fontFamily =
            "Consolas, monospace";

        texto.style.fontSize =
            "34px";

        texto.style.textAlign =
            "center";

        texto.style.maxWidth =
            "90vw";

        texto.style.padding =
            "20px";


        tela.appendChild(
            texto
        );


        document.body.appendChild(
            tela
        );


        setTimeout(() => {

            this.mostrarFinal();

        }, 500);

    },


    // =====================================================
    // MOSTRAR FINAL
    // =====================================================

    mostrarFinal(){

        if(
            this.finalIndice >=
            this.finalMensagens.length
        ){

            AudioManager.tocar(
                "chamado"
            );

            return;

        }


        const texto =
            document.getElementById(
                "texto-final"
            );


        if(!texto)
            return;


        texto.innerText =
            this.finalMensagens[
                this.finalIndice
            ];


        this.finalIndice++;


        setTimeout(() => {

            this.mostrarFinal();

        }, 1800);

    },


    // =====================================================
    // CENAS
    // =====================================================

    iniciarCena(){

        const cena =
            Introducao[
                Game.cenaAtual
            ];


        if(!cena){

            console.log(
                "FIM DA INTRODUÇÃO"
            );

            return;

        }


        UI.limpar();


        switch(cena.tipo){

            case "menu":

                UI.criarMenu(

                    cena.titulo,

                    cena.mensagem,

                    cena.opcoes,

                    Game.selecionado

                );


                if(
                    Game.cenaAtual === 0
                ){

                    this.iniciarEspera();

                }

            break;


            case "texto":

                UI.texto(

                    cena.titulo,

                    cena.mensagem

                );

            break;


            case "entrada":

                UI.entrada(

                    cena.titulo,

                    cena.mensagem

                );


                Input.texto =
                    "";


                if(
                    cena.id ===
                    "proximo"
                ){

                    Game.tipoEntrada =
                        "pessoa";

                }


                if(
                    cena.id ===
                    "criacao"
                ){

                    Game.tipoEntrada =
                        "criacao";

                }


                if(
                    typeof TecladoMobile !==
                    "undefined"
                ){

                    setTimeout(() => {

                        TecladoMobile.abrir();

                    }, 300);

                }

            break;

        }

    },


    // =====================================================
    // ESPERA
    // =====================================================

    iniciarEspera(){

        clearTimeout(
            this.tempoSemResposta
        );


        this.tempoSemResposta =
            setTimeout(() => {

                AudioManager.tocar(
                    "nao"
                );


                UI.texto(

                    CenaNao.titulo,

                    CenaNao.mensagem

                );

            }, 10000);

    },


    // =====================================================
    // CANCELAR ESPERA
    // =====================================================

    cancelarEspera(){

        clearTimeout(
            this.tempoSemResposta
        );

    },


    // =====================================================
    // ESCOLHER
    // =====================================================

    escolher(opcao){

        this.cancelarEspera();


        if(
            Game.cenaAtual !== 0
        )
            return;


        if(opcao === 0){

            Fullscreen.entrar();


            AudioManager.tocarMusica(
                "musicaIntro"
            );


            Game.cenaAtual =
                1;


            this.iniciarCena();

        }

        else{

            AudioManager.tocar(
                "nao"
            );


            UI.texto(

                CenaNao.titulo,

                CenaNao.mensagem

            );

        }

    },


    // =====================================================
    // PRÓXIMA CENA
    // =====================================================

    proximaCena(){

        if(
            Game.cenaAtual >=
            Introducao.length - 1
        )
            return;


        Game.cenaAtual++;


        this.iniciarCena();

    },


    // =====================================================
    // RECEBER NOME
    // =====================================================

    receberNome(nome){

        console.log(
            "RECEBEU NOME:",
            nome
        );


        const pessoa =
            Nome.verificar(nome);


        this.executarPessoa(
            pessoa
        );

    },


    // =====================================================
    // EXECUTAR PESSOA
    // =====================================================

    executarPessoa(pessoa){

        if(!pessoa){

            AudioManager.tocar(
                "nao"
            );


            UI.texto(

                "...",

                "Você Não É Bem-Vindo Aqui."

            );


            setTimeout(() => {

                document.body.innerHTML =
                    "";

            }, 4000);


            return;

        }


        this.pessoaAtual =
            pessoa;

        this.falaAtual =
            0;


        if(pessoa.audio){

            AudioManager.tocar(
                pessoa.audio
            );

        }


        this.mostrarFalaPessoa();

    },


    // =====================================================
    // FALA
    // =====================================================

    mostrarFalaPessoa(){

        const pessoa =
            this.pessoaAtual;


        if(!pessoa)
            return;


        if(
            this.falaAtual >=
            pessoa.falas.length
        ){

            this.pessoaAtual =
                null;

            this.falaAtual =
                0;


            if(pessoa.fechar){

                setTimeout(() => {

                    document.body.innerHTML =
                        "";

                }, 3000);


                return;

            }


            if(pessoa.continuar){

                this.proximaCena();

            }


            return;

        }


        UI.texto(

            "...",

            pessoa.falas[
                this.falaAtual
            ]

        );


        this.falaAtual++;

    },


    // =====================================================
    // RECEBER CRIAÇÃO
    // =====================================================

    receberCriacao(nome){

        console.log(
            "================================="
        );

        console.log(
            "RECEBER CRIAÇÃO"
        );

        console.log(
            "NOME:",
            nome
        );

        console.log(
            "================================="
        );


        Game.nome =
            nome;


        // =================================================
        // CHOKITO
        // =================================================

        const nomeNormalizado =
            nome.trim().toUpperCase();


        if(
            nomeNormalizado ===
            "CHOKITO"
        ){

            console.log(
                "☠ SEGREDO CHOKITO ATIVADO ☠"
            );


            // =============================================
            // VERIFICAR PERDIDO
            // =============================================

            if(
                typeof Perdido ===
                "undefined"
            ){

                console.error(
                    "ERRO: Perdido não está carregado!"
                );

                return;

            }


            // =============================================
            // PARAR BRUNO.mp3
            // =============================================

            console.log(
                "PARANDO BRUNO.mp3..."
            );


            if(
                typeof AudioManager !==
                "undefined"
            ){

                AudioManager.pararMusica();

            }


            // =============================================
            // LIMPAR ENGINE
            // =============================================

            UI.limpar();


            // =============================================
            // ENTRAR NO PERDIDO
            // =============================================

            setTimeout(() => {

                Perdido.iniciar();
Boneco.iniciar();

            }, 300);


            return;

        }


        // =================================================
        // SISTEMA NORMAL
        // =================================================

        const resposta =
            Criacao.verificar(nome);


        // =================================================
        // BOSS
        // =================================================

        if(
            resposta ===
            "boss"
        ){

            Game.emBatalha =
                true;


            UI.limpar();


            AudioManager.pararMusica();


            Batalha.iniciarIntroducao();


            return;

        }


        // =================================================
        // FECHAR
        // =================================================

        if(
            resposta ===
            "fechar"
        ){

            document.body.innerHTML =
                "";

            return;

        }


        // =================================================
        // ROGER
        // =================================================

        if(
            resposta ===
            "roger"
        ){

            AudioManager.tocar(
                "nao"
            );


            UI.texto(

                "...",

                "Você Não."

            );


            setTimeout(() => {

                document.body.innerHTML =
                    "";

            }, 3000);


            return;

        }


        // =================================================
        // NORMAL
        // =================================================

        UI.texto(

            "...",

            "Bonito Nome..."

        );


        setTimeout(() => {

            this.iniciarPerguntas();

        }, 1500);

    },


    // =====================================================
    // GAME OVER
    // =====================================================

    gameOver(){

        AudioManager.pararMusica();

        GameOver.iniciar();

    },


    // =====================================================
    // ATUALIZAR
    // =====================================================

    atualizar(){

        UI.atualizarMenu(
            Game.selecionado
        );

    }

};