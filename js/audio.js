const AudioManager = {



    falas:{

    Bruno1:"assets/falas/Bruno1.mp3",
    Bruno2:"assets/falas/Bruno2.mp3",
    Bruno3:"assets/falas/Bruno3.mp3",
    Bruno4:"assets/falas/Bruno4.mp3",
    Bruno5:"assets/falas/Bruno5.mp3",
    Bruno6:"assets/falas/Bruno6.mp3",
    Bruno7:"assets/falas/Bruno7.mp3",
    Bruno8:"assets/falas/Bruno8.mp3",
    Bruno9:"assets/falas/Bruno9.mp3",
    Bruno10:"assets/falas/Bruno10.mp3",
    Bruno11:"assets/falas/Bruno11.mp3"

},
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



        this.musicaAtual.volume=0.3;





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

},



tocarFala(nome){

    const caminho=this.falas[nome];


    if(!caminho){
        console.log("Fala não encontrada:",nome);
        return;
    }

    if(this.atual){

        this.atual.pause();
        this.atual.currentTime=0;

    }

    this.atual=new Audio(caminho);

    this.atual.volume=1;

    this.atual.play();

},
}