

const Perdido = {

    ativo: false,

    // =====================================================
    // MUNDO
    // =====================================================

    // BASE ORIGINAL QUE ESTAVA FUNCIONANDO
    mundoLargura: 1400,
    mundoAltura: 1123,

    escala: 1,

    offsetX: 0,
    offsetY: 0,


    // =====================================================
    // PLAYER
    // =====================================================

    x: 676,
    y: 950,

    velocidade: 3,

    direcao: "frente",

    teclasPressionadas: {},

    controlesConfigurados: false,


    // =====================================================
    // ÁRVORE
    // =====================================================

    /*
     * BARREIRA TEMPORÁRIA.
     *
     * Esta é uma área independente da imagem.
     * Depois você pode ajustar estes 4 valores
     * manualmente para encaixar exatamente no tronco.
     */

    areaArvore: {

        esquerda: 660,
        direita: 870,

        cima: 240,
        baixo: 400,

    },


    // =====================================================
    // ESTADOS
    // =====================================================

    atrasDaArvore: false,

    podeConversar: false,

    musica: null,


    // =====================================================
    // INICIAR
    // =====================================================

    iniciar(){

        console.log("=================================");
        console.log("☠ CENA SECRETA: PERDIDO ☠");
        console.log("=================================");


        this.ativo = true;


        // =================================================
        // POSIÇÃO INICIAL
        // =================================================

        this.x = 676;
        this.y = 950;

        this.direcao = "frente";


        // =================================================
        // RESET
        // =================================================

        this.atrasDaArvore = false;

        this.podeConversar = false;

        this.teclasPressionadas = {};


        // =================================================
        // PARAR MÚSICA ANTERIOR
        // =================================================

        if(
            typeof AudioManager !== "undefined"
        ){

            AudioManager.pararMusica();

        }


        // =================================================
        // LIMPAR TELA
        // =================================================

        document.body.innerHTML = "";

        document.body.className = "";

        document.body.style.margin = "0";

        document.body.style.padding = "0";

        document.body.style.width = "100vw";

        document.body.style.height = "100vh";

        document.body.style.overflow = "hidden";

        document.body.style.background = "#000";


        // =================================================
        // CSS
        // =================================================

        const estilo =
            document.createElement("style");


        estilo.id =
            "perdido-estilo";


        estilo.innerHTML = `

        @font-face {

    font-family: "Determination";

    src: url("../assets/fonts/determination.ttf");

}
            * {
                box-sizing: border-box;
            }


            html,
            body {

                margin: 0;
                padding: 0;

                width: 100%;
                height: 100%;

                overflow: hidden;

                background: #000;

            }


            /* =================================================
               TELA
            ================================================= */

            #perdido {

                position: fixed;

                inset: 0;

                width: 100vw;
                height: 100vh;

                overflow: hidden;

                background: #000;

                image-rendering: pixelated;
                image-rendering: crisp-edges;

            }


            /* =================================================
               MUNDO
            ================================================= */

            #perdidoMundo {

                position: absolute;

                width: 1400px;
                height: 1123px;

                left: 50%;
                top: 50%;

                transform-origin: center center;

                overflow: hidden;

                background: #000;

            }


            /* =================================================
               CENÁRIO
            ================================================= */

            #perdidoCenario {

                position: absolute;

                left: 0;
                top: 0;

                width: 1400px;
                height: 1123px;

                background-image:
                    url("assets/imagens/Perdido.png");

                background-position:
                    left top;

                background-repeat:
                    no-repeat;

                background-size:
                    1400px 1123px;

                image-rendering:
                    pixelated;

                image-rendering:
                    crisp-edges;

                z-index: 1;

            }


            /* =================================================
               RA
            ================================================= */

            #perdidoPlayer {

                position: absolute;

                left: 0;
                top: 0;

                width: 76px;
                height: 76px;

                object-fit: contain;

                object-position: center;

                image-rendering:
                    pixelated;

                image-rendering:
                    crisp-edges;

                display: block;

                z-index: 10;

                pointer-events: none;

                user-select: none;

                -webkit-user-drag: none;

                visibility: visible;

                opacity: 1;

            }


            /* =================================================
               DIÁLOGO
               AGORA É DO BONECO.JS
            ================================================= */

            /*
             * O Perdido.js NÃO controla mais
             * aparência ou conteúdo do diálogo.
             */


        `;


        document.head.appendChild(
            estilo
        );


        // =================================================
        // HTML
        // =================================================

        document.body.innerHTML = `

            <div id="perdido">

                <div id="perdidoMundo">

                    <div
                        id="perdidoCenario">
                    </div>


                    <img
                        id="perdidoPlayer"

                        src="assets/imagens/ra_frente.png"

                        alt=""

                        draggable="false"
                    >

                </div>

            </div>

        `;


        // =================================================
        // PLAYER
        // =================================================

        const player =
            document.getElementById(
                "perdidoPlayer"
            );


        if(player){

            player.dataset.sprite =
                "frente";


            player.onerror = () => {

                console.error(
                    "❌ ERRO AO CARREGAR RA:"
                );

                console.error(
                    player.src
                );

            };

        }


        // =================================================
        // MÚSICA
        // =================================================

        this.musica =
            new Audio(
                "assets/audio/Perdido.mp3"
            );


        this.musica.loop = true;

        this.musica.volume = 1;


        this.musica.play().catch(
            (erro) => {

                console.warn(
                    "Não foi possível iniciar Perdido.mp3:",
                    erro
                );

            }
        );


        // =================================================
        // CONTROLES
        // =================================================

        this.configurarControles();


        // =================================================
        // ESCALA
        // =================================================

        this.atualizarEscala();


        window.addEventListener(
            "resize",
            () => {

                if(this.ativo){

                    this.atualizarEscala();

                }

            }
        );


        // =================================================
        // PLAYER
        // =================================================

        this.atualizarPlayer();


        // =================================================
        // LOOP
        // =================================================

        this.loop();

    },


    // =====================================================
    // ESCALA
    // =====================================================

    atualizarEscala(){

        const telaLargura =
            window.innerWidth;


        const telaAltura =
            window.innerHeight;


        const escalaX =
            telaLargura /
            this.mundoLargura;


        const escalaY =
            telaAltura /
            this.mundoAltura;


        this.escala =
            Math.min(
                escalaX,
                escalaY
            );


        const mundo =
            document.getElementById(
                "perdidoMundo"
            );


        if(!mundo)
            return;


        this.offsetX =
            (
                telaLargura -
                this.mundoLargura *
                this.escala
            ) / 2;


        this.offsetY =
            (
                telaAltura -
                this.mundoAltura *
                this.escala
            ) / 2;


        mundo.style.transform =
            "translate(-50%, -50%) scale(" +
            this.escala +
            ")";

    },


    // =====================================================
    // CONTROLES
    // =====================================================

    configurarControles(){

        // Input.js é o único dono do teclado físico.
        this.controlesConfigurados = true;

    },

    // =====================================================
    // ENTRADA CENTRALIZADA
    // =====================================================

    tecla(tecla){

        if(!this.ativo)
            return false;

        const movimentos = [
            "ArrowUp",
            "ArrowDown",
            "ArrowLeft",
            "ArrowRight"
        ];

        if(movimentos.includes(tecla)){

            if(
                typeof Boneco !== "undefined" &&
                Boneco.dialogoAtivo
            ){
                Boneco.tecla(tecla);
                return true;
            }

            this.teclasPressionadas[tecla] = true;
            return true;
        }

        if(tecla === "Enter"){

            if(
                typeof Boneco !== "undefined"
            ){
                Boneco.tecla("Enter");
            }

            return true;
        }

        return false;
    },


    // =====================================================
    // MOVIMENTO
    // =====================================================

    atualizarMovimento(){

        if(!this.ativo)
            return;


        /*
         * Se o Boneco estiver em diálogo,
         * o RA fica parado.
         */

        if(
            typeof Boneco !== "undefined" &&
            Boneco.dialogoAtivo
        ){

            return;

        }


        let novoX =
            this.x;


        let novoY =
            this.y;


        let moveu =
            false;


        // =================================================
        // CIMA
        // =================================================

        if(
            this.teclasPressionadas[
                "ArrowUp"
            ]
        ){

            novoY -=
                this.velocidade;

            this.direcao =
                "atras";

            moveu =
                true;

        }


        // =================================================
        // BAIXO
        // =================================================

        if(
            this.teclasPressionadas[
                "ArrowDown"
            ]
        ){

            novoY +=
                this.velocidade;

            this.direcao =
                "frente";

            moveu =
                true;

        }


        // =================================================
        // ESQUERDA
        // =================================================

        if(
            this.teclasPressionadas[
                "ArrowLeft"
            ]
        ){

            novoX -=
                this.velocidade;

            this.direcao =
                "esquerda";

            moveu =
                true;

        }


        // =================================================
        // DIREITA
        // =================================================

        if(
            this.teclasPressionadas[
                "ArrowRight"
            ]
        ){

            novoX +=
                this.velocidade;

            this.direcao =
                "direita";

            moveu =
                true;

        }


        if(!moveu)
            return;


        // =================================================
        // TAMANHO DO RA
        // =================================================

        const largura =
            48;


        const altura =
            48;


        // =================================================
        // LIMITES
        // =================================================

        novoX =
            Math.max(
                0,
                Math.min(
                    novoX,
                    this.mundoLargura -
                    largura
                )
            );


        novoY =
            Math.max(
                0,
                Math.min(
                    novoY,
                    this.mundoAltura -
                    altura
                )
            );


        // =================================================
        // COLISÃO
        // =================================================

        if(
            !this.colideComArvore(
                novoX,
                novoY,
                largura,
                altura
            )
        ){

            this.x =
                novoX;

            this.y =
                novoY;

        }


        // =================================================
        // VERIFICAR INTERAÇÃO
        // =================================================

        this.verificarArvore();


        // =================================================
        // PLAYER
        // =================================================

        this.atualizarPlayer();

    },


    // =====================================================
    // COLISÃO DA ÁRVORE
    // =====================================================

    colideComArvore(
        x,
        y,
        largura,
        altura
    ){

        const area =
            this.areaArvore;


        return (

            x < area.direita &&

            x + largura >
                area.esquerda &&

            y < area.baixo &&

            y + altura >
                area.cima

        );

    },


    // =====================================================
    // VERIFICAR ÁRVORE / BONECO
    // =====================================================

    verificarArvore(){

        const area =
            this.areaArvore;


        const centroX =
            this.x + 24;


        const centroY =
            this.y + 24;


        /*
         * Área de interação.
         *
         * Pode ser alterada independentemente
         * da colisão.
         */

        const margem =
            45;


        const dentro =

            centroX >=
                area.esquerda - margem &&

            centroX <=
                area.direita + margem &&

            centroY >=
                area.cima - margem &&

            centroY <=
                area.baixo + margem;


        this.podeConversar =
            dentro;


        /*
         * Avisa o Boneco que o jogador
         * está perto dele.
         */

        if(
            typeof Boneco !== "undefined"
        ){

            Boneco.podeConversar =
                dentro;

        }

    },


    // =====================================================
    // PLAYER
    // =====================================================

    atualizarPlayer(){

        const player =
            document.getElementById(
                "perdidoPlayer"
            );


        if(!player)
            return;


        const sprites = {

            frente:
                "assets/imagens/ra_frente.png",

            atras:
                "assets/imagens/ra_atras.png",

            esquerda:
                "assets/imagens/ra_esquerdo.png",

            direita:
                "assets/imagens/ra_direito.png"

        };


        const caminho =
            sprites[this.direcao];


        if(!caminho)
            return;


        if(
            player.dataset.sprite !==
            this.direcao
        ){

            player.src =
                caminho;

            player.dataset.sprite =
                this.direcao;

        }


        player.style.left =
            Math.round(this.x) +
            "px";


        player.style.top =
            Math.round(this.y) +
            "px";


        player.style.zIndex =
            "10";

    },


    // =====================================================
    // LOOP
    // =====================================================

    loop(){

        if(!this.ativo)
            return;


        this.atualizarMovimento();


        requestAnimationFrame(
            () => this.loop()
        );

    },


    // =====================================================
    // FECHAR
    // =====================================================

    fecharJogo(){

        console.log(
            "SEGREDO PERDIDO FINALIZADO"
        );


        this.ativo =
            false;


        this.teclasPressionadas =
            {};


        if(this.musica){

            this.musica.pause();

            this.musica.currentTime =
                0;

            this.musica =
                null;

        }


        document.body.innerHTML =
            "";

    }

};
