const Game = {

    cenaAtual: 0,
    selecionado: 0,

    gameOverSelecionado: 0,

    textoPronto: false,

    nome: "",

    limiteNome: 14,

    tipoEntrada: "",

    emBatalha:false

};



const Engine = {


    tempoSemResposta:null,

    pessoaAtual:null,

    falaAtual:0,




    iniciar(){

    
console.trace("INPUT INICIAR CHAMADO");

if(this.iniciado)
    return;
        console.log(
            "ENGINE INICIOU"
        );


        Render.iniciar();

        Input.iniciar();


        this.iniciarCena();


    },





    iniciarCena(){


        const cena =
        Introducao[Game.cenaAtual];



        if(!cena){

            console.log(
                "FIM DA INTRODUÇÃO"
            );

            return;

        }




        console.log(
            "CENA:",
            Game.cenaAtual,
            cena.id
        );



        UI.limpar();




        switch(cena.tipo){



            case "menu":


                UI.criarMenu(

                    cena.titulo,
                    cena.mensagem,
                    cena.opcoes,
                    Game.selecionado

                );


                if(Game.cenaAtual === 0){

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



                Input.texto = "";



                if(cena.id === "proximo"){


                    Game.tipoEntrada="pessoa";


                }



                if(cena.id === "criacao"){


                    Game.tipoEntrada="criacao";


                }



                // ABRIR TECLADO CELULAR

                if(typeof TecladoMobile !== "undefined"){

                    setTimeout(()=>{

                        TecladoMobile.abrir();

                    },300);

                }



            break;



        }


    },









    iniciarEspera(){


        clearTimeout(
            this.tempoSemResposta
        );



        this.tempoSemResposta =
        setTimeout(()=>{


            AudioManager.tocar(
                "nao"
            );


            UI.texto(

                CenaNao.titulo,

                CenaNao.mensagem

            );


        },10000);



    },





    cancelarEspera(){


        clearTimeout(
            this.tempoSemResposta
        );


    },









    escolher(opcao){


        this.cancelarEspera();



        if(Game.cenaAtual !== 0)
            return;




        if(opcao===0){


            Fullscreen.entrar();


            AudioManager.tocarMusica(
                "musicaIntro"
            );


            Game.cenaAtual=1;


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









    proximaCena(){


        if(Game.cenaAtual >= Introducao.length-1)
            return;



        Game.cenaAtual++;


        this.iniciarCena();


    },









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









    executarPessoa(pessoa){



        if(!pessoa){


            AudioManager.tocar(
                "nao"
            );


            UI.texto(

                "...",

                "Você Não É Bem-Vindo Aqui."

            );



            setTimeout(()=>{

                document.body.innerHTML="";

            },4000);


            return;


        }






        this.pessoaAtual=pessoa;

        this.falaAtual=0;




        if(pessoa.audio){

            AudioManager.tocar(
                pessoa.audio
            );

        }




        this.mostrarFalaPessoa();



    },









    mostrarFalaPessoa(){


        const pessoa =
        this.pessoaAtual;



        if(!pessoa)
            return;




        if(this.falaAtual >= pessoa.falas.length){


            this.pessoaAtual=null;

            this.falaAtual=0;



            if(pessoa.fechar){


                setTimeout(()=>{

                    document.body.innerHTML="";

                },3000);


                return;

            }



            if(pessoa.continuar){

                this.proximaCena();

            }



            return;


        }




        UI.texto(

            "...",

            pessoa.falas[this.falaAtual]

        );



        this.falaAtual++;


    },









    receberCriacao(nome){



        console.log(
            "CRIAÇÃO:",
            nome
        );



        const resposta =
        Criacao.verificar(nome);




if(resposta==="boss"){


    Game.emBatalha=true;


    UI.limpar();


    AudioManager.pararMusica();



    Batalha.iniciarIntroducao();



    return;


}







        if(resposta==="fechar"){


            document.body.innerHTML="";

            return;


        }







        if(resposta==="roger"){



            AudioManager.tocar(
                "nao"
            );


            UI.texto(

                "...",

                "Você Não."

            );



            setTimeout(()=>{

                document.body.innerHTML="";

            },3000);



            return;


        }






        UI.texto(

            "...",

            "Bonito Nome..."

        );



        setTimeout(()=>{

            this.proximaCena();

        },3000);


    },


gameOver(){

    AudioManager.pararMusica();

    GameOver.iniciar();

},



    atualizar(){


        UI.atualizarMenu(
            Game.selecionado
        );


    }


};
