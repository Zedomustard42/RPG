const GameOver = {

    ativo: false,

    mortes: 0,

    escrevendo:true,

    frases: [

        "Não acabou ainda, Acabou?",

        "Você não era fraco assim.",

        "Levante."

    ],

    receberTeclaMobile(tecla) {

    if (!this.ativo)
        return;


    if (
        tecla === "ArrowUp" ||
        tecla === "ArrowLeft"
    ) {

        Game.gameOverSelecionado--;

        if (
            Game.gameOverSelecionado < 0
        ) {

            Game.gameOverSelecionado = 1;

        }

        this.atualizarMenu();

        return;

    }


    if (
        tecla === "ArrowDown" ||
        tecla === "ArrowRight"
    ) {

        Game.gameOverSelecionado++;

        if (
            Game.gameOverSelecionado > 1
        ) {

            Game.gameOverSelecionado = 0;

        }

        this.atualizarMenu();

        return;

    }


    if (
        tecla === "Enter"
    ) {

        this.escolher();

    }

},

atualizarMenu(){

    const opcoes =
    document.querySelectorAll(".opcaoGameOver");


    opcoes.forEach((opcao,index)=>{


        if(index === Game.gameOverSelecionado){


            opcao.classList.add("selecionado");


        }else{


            opcao.classList.remove("selecionado");


        }


    });

},



escolher(){


    if(Game.gameOverSelecionado===0){


        // DESISTIR

        document.body.innerHTML="";

        return;

    }



    // MORRER TENTANDO


    this.ativo=false;

    this.escrevendo=false;


    UI.gameOverAtivo=false;


    const tela = document.getElementById("gameOver");

if(tela){
    tela.remove();
}


    Game.emBatalha=true;



    if(typeof Batalha.resetar === "function"){

        Batalha.resetar();

    }



    Batalha.iniciar();


},

     async iniciar() {

    if (this.ativo) return;


    this.ativo = true;

    this.mortes++;


    UI.gameOverAtivo = true;

    Game.gameOverSelecionado = 0;


    AudioManager.pararMusica();


    UI.gameOver();



    setTimeout(() => {

        AudioManager.tocar("batimento", true);

    },2500);



    setTimeout(() => {

        AudioManager.tocar("gameover", true);

    },5000);



    await this.escrever();

},

   async escrever(){

    this.escrevendo=true;


        const div = document.getElementById("fraseGameOver");

        if (!div) return;

        div.innerHTML = "";

        for (let i = 0; i < this.frases.length; i++) {

            const p = document.createElement("p");

            div.appendChild(p);

            for (const letra of this.frases[i]) {

                p.innerHTML += letra;

                await new Promise(r => setTimeout(r, 45));

            }

            if (i === 2) {

                p.classList.add("levante");

                document.body.classList.add("treme");

                setTimeout(() => {

                    document.body.classList.remove("treme");

                }, 450);

            }

            await new Promise(r => setTimeout(r, 900));

        }

        this.escrevendo=false;

        this.menu();

    },

    menu() {

        const div = document.getElementById("fraseGameOver");

        if (!div) return;

        div.innerHTML += `

        <div id="menuGameOver">

            <div class="opcaoGameOver selecionado">

                🩸 DESISTIR

            </div>

            <div class="opcaoGameOver">

                MORRER TENTANDO

            </div>

        </div>

        `;

        Game.gameOverSelecionado = 0;

    }

};

