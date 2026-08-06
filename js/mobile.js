const Mobile = {


    iniciar(){


        this.botao("btnUp","ArrowUp");

        this.botao("btnDown","ArrowDown");

        this.botao("btnLeft","ArrowLeft");

        this.botao("btnRight","ArrowRight");

        this.botao("btnOk","Enter");


        console.log("MOBILE INICIADO");


    },





    botao(id, tecla){


        const botao =
        document.getElementById(id);



        if(!botao)
            return;






        const pressionar = (e)=>{


            e.preventDefault();



            Input.tecla({

                key:tecla

            });




            // BATALHA

            if(typeof Movimento !== "undefined"){

                Movimento.teclas[tecla]=true;

            }



        };








        const soltar = (e)=>{


            e.preventDefault();



            if(typeof Movimento !== "undefined"){

                Movimento.teclas[tecla]=false;

            }



        };






        botao.addEventListener(
            "touchstart",
            pressionar
        );


        botao.addEventListener(
            "touchend",
            soltar
        );




        botao.addEventListener(
            "mousedown",
            pressionar
        );


        botao.addEventListener(
            "mouseup",
            soltar
        );



    }


};





window.addEventListener(
"load",
()=>{

    Mobile.iniciar();

});

const ataque =
document.getElementById("btnAtaque");


if(ataque){

    ataque.addEventListener(
        "click",
        ()=>{

            ataque.addEventListener("click",()=>{

    if(!Game.emBatalha) return;

    Batalha.atacar();

});

        }
    );


}