
const TecladoMobile = {


    input:null,


    iniciar(){


        this.input = document.createElement("input");


        this.input.id="tecladoMobile";


        this.input.type="text";


        this.input.style.position="fixed";
        this.input.style.opacity="0";
        this.input.style.height="1px";
        this.input.style.width="1px";


        this.input.autocomplete="off";


        document.body.appendChild(this.input);





        this.input.addEventListener(
            "input",
            ()=>{

            if(
    /Android|iPhone|iPad/i.test(
        navigator.userAgent
    ) === false
){

    return;

}
                const texto =
                this.input.value;



                if(texto.length > 0){


                    for(const letra of texto){


                        Input.tecla({

                            key:letra

                        });


                    }


                }



                this.input.value="";



            }
        );



        console.log(
            "TECLADO MOBILE PRONTO"
        );


    },





    abrir(){


        if(!this.input)
            return;



        this.input.value="";


        this.input.focus();



    },





    fechar(){


        if(this.input){

            this.input.blur();

        }


    }


};




window.addEventListener(
"load",
()=>{

    TecladoMobile.iniciar();

});