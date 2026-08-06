const BatalhaMobile = {


    iniciar(){


        if(mobile){

    arena.scrollLeft =
        (CenarioMascara.largura - window.innerWidth) / 2;

    arena.scrollTop =
        (CenarioMascara.altura - window.innerHeight) / 2;

}
        const botao =
        document.getElementById(
            "botaoAtaque"
        );


        if(!botao)
            return;



        botao.addEventListener(
            "touchstart",
            ()=>{


                Movimento.atacar();


            }

        );


    }


};