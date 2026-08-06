const AudioManager = {


    sons: {

        nao: "assets/audio/nao.mp3",

        Ameli: "assets/audio/Ameli.mp3",

        novamente: "assets/audio/Novamente.mp3",

        gameover: "assets/audio/gameover.mp3",

        batimento: "assets/audio/batimento.mp3"

    },





    musicas: {


        musicaIntro:
        "assets/audio/BRUNO.mp3",


        // Música da introdução da Máscara

        eramseismascaras:
        "assets/audio/ERAMSEISMASCARAS.mp3",



        // Música da batalha

        mascaras:
        "assets/audio/MASCARAS.mp3"


    },





    atual:null,

    musicaAtual:null,





    tocar(nome, loop=false){


        console.log(
            "Tentando tocar:",
            nome
        );



        const caminho =
        this.sons[nome];



        console.log(
            "Caminho:",
            caminho
        );



        if(!caminho){


            console.log(
                "Áudio não encontrado:",
                nome
            );


            return;


        }




        if(this.atual){


            this.atual.pause();

            this.atual.currentTime=0;


        }





        this.atual =
        new Audio(caminho);



        this.atual.loop = loop;



        switch(nome){


            case "batimento":

                this.atual.volume = 0.15;

            break;



            case "gameover":

                this.atual.volume = 0.55;

            break;



            default:

                this.atual.volume = 1;

            break;


        }





        this.atual.play()

        .then(()=>{


            console.log(
                "Som tocando:",
                nome
            );


        })

        .catch((erro)=>{


            console.log(
                "Erro ao tocar som:",
                erro
            );


        });



    },








    tocarMusica(nome){



        console.log(
            "Tentando música:",
            nome
        );



        const caminho =
        this.musicas[nome];



        console.log(
            "Caminho música:",
            caminho
        );



        if(!caminho){


            console.log(
                "Música não encontrada:",
                nome
            );


            return;


        }





        if(this.musicaAtual){


            this.musicaAtual.pause();

            this.musicaAtual.currentTime=0;


        }






        this.musicaAtual =
        new Audio(caminho);



        this.musicaAtual.loop=true;



        this.musicaAtual.volume=0.5;





        this.musicaAtual.play()

        .then(()=>{


            console.log(
                "Música iniciada:",
                nome
            );


        })

        .catch((erro)=>{


            console.log(
                "Erro na música:",
                erro
            );


        });



    },








    pararMusica(){



        if(this.musicaAtual){


            this.musicaAtual.pause();

            this.musicaAtual.currentTime=0;


            this.musicaAtual=null;


        }


    },








    pararSom(){


        if(this.atual){


            this.atual.pause();

            this.atual.currentTime=0;


            this.atual=null;


        }


    }



};