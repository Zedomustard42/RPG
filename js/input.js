const Input = {

    iniciado:false,

    pressionado:false,

    texto:"",



    iniciar(){


        if(this.iniciado)
            return;



        this.iniciado=true;



        document.addEventListener(
            "keydown",
            this.tecla.bind(this)
        );



        console.log(
            "INPUT INICIADO"
        );


    },









    tecla(evento){

// =====================
// DEBUG
// =====================

// =====================
// GAME OVER
// =====================

if(UI.gameOverAtivo && !GameOver.escrevendo){

    if(evento.key==="ArrowDown"){

        Game.gameOverSelecionado++;

        if(Game.gameOverSelecionado > 1){

            Game.gameOverSelecionado = 0;

        }


        GameOver.atualizarMenu();

        return;

    }



    if(evento.key==="ArrowUp"){


        Game.gameOverSelecionado--;


        if(Game.gameOverSelecionado < 0){

            Game.gameOverSelecionado = 1;

        }


        GameOver.atualizarMenu();

        return;

    }




    if(evento.key==="Enter"){


        GameOver.escolher();


        return;

    }


}


        // =====================
        // PESSOA FALANDO
        // =====================


        if(Engine.pessoaAtual){



            if(evento.key==="Enter"){


                Engine.mostrarFalaPessoa();


            }



            return;


        }








        const cena =
        Introducao[Game.cenaAtual];



        if(!cena)
            return;










        // =====================
        // ENTRADA DE TEXTO
        // =====================


        if(cena.tipo==="entrada"){





            // APAGAR LETRA


            if(evento.key==="Backspace"){



                this.texto =
                this.texto.slice(0,-1);



                UI.atualizarEntrada(
                    this.texto
                );


                return;


            }







            // MOBILE
if(
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
){

    if(
        evento.key.length===1 &&
        this.texto.length>=5
    ){

        const texto=this.texto.trim().toLowerCase();

        if(
            texto==="bruno" ||
            texto==="roger" ||
            texto==="ash natori"
        ){

            Game.nome=this.texto.trim();

            Engine.receberCriacao(Game.nome);

            this.texto="";

            if(typeof TecladoMobile!=="undefined"){

                TecladoMobile.fechar();

            }

            return;

        }

    }

}

        


            if(evento.key==="Enter"){



                if(this.texto.trim()==="")
                    return;





                Game.nome =
                this.texto.trim();




                console.log(
                    "ENTRADA:",
                    Game.tipoEntrada,
                    Game.nome
                );





                // fecha teclado do celular

                if(typeof TecladoMobile !== "undefined"){

                    TecladoMobile.fechar();

                }




            



                if(Game.tipoEntrada==="pessoa"){


                    Engine.receberNome(
                        Game.nome
                    );


                }







                else if(Game.tipoEntrada==="criacao"){


                    Engine.receberCriacao(
                        Game.nome
                    );


                }






                this.texto="";



                return;


            }









            // DIGITAÇÃO


            if(evento.key.length===1){



                if(
                    this.texto.length <
                    Game.limiteNome
                ){



                    this.texto += evento.key;



                    UI.atualizarEntrada(
                        this.texto
                    );



                }



            }





            return;


        }













        // =====================
        // ENTER NORMAL
        // =====================


        if(evento.key==="Enter"){





            if(this.pressionado)
                return;




            this.pressionado=true;



            setTimeout(()=>{


                this.pressionado=false;


            },300);







            Engine.cancelarEspera();








            if(cena.tipo==="menu"){



                Engine.escolher(
                    Game.selecionado
                );


            }








            else if(cena.tipo==="texto"){



                if(
                    Game.cenaAtual <
                    Introducao.length-1
                ){


                    Engine.proximaCena();


                }


            }






            return;


        }













        // =====================
        // MENU
        // =====================



        if(cena.tipo!=="menu")
            return;







        if(evento.key==="ArrowDown"){



            Game.selecionado++;




            if(
                Game.selecionado >=
                cena.opcoes.length
            ){


                Game.selecionado=0;


            }




            Engine.atualizar();



        }









        if(evento.key==="ArrowUp"){



            Game.selecionado--;





            if(Game.selecionado<0){


                Game.selecionado =
                cena.opcoes.length-1;


            }





            Engine.atualizar();



        }





    }


};