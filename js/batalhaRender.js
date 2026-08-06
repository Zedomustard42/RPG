const BatalhaRender = {

mascara: null,
jogador: null,

hp: null,
hpMascara: null,
faseMascara: null,

spriteMascara: null,
spriteJogador: null,


iniciar() {

    console.log("RENDER DA BATALHA INICIADO");


    const arena =
        document.getElementById("arena");


    if (!arena) {

        console.error("Arena não encontrada.");
        return;

    }


    arena.style.display = "block";


    // =========================
    // TAMANHO DA TELA
    // =========================

    arena.style.width =
        "100vw";

    arena.style.height =
        "100vh";

    arena.style.overflow =
        "auto";


    // =========================
    // MAPA DA IGREJA
    // =========================

    arena.style.backgroundImage =
        'url("assets/imagens/igreja.png")';

    arena.style.backgroundSize =
        "100% 100%";

    arena.style.backgroundPosition =
        "center center";

    arena.style.backgroundRepeat =
        "no-repeat";

    arena.style.imageRendering =
        "pixelated";


    // =========================
    // HTML DA ARENA
    // =========================

    arena.innerHTML = `

        <img
            id="mascara"
            src="${Mascara.sprite}"
            draggable="false"
        >

        <img
            id="jogador"
            src="${Batalha.jogador.sprite}"
            draggable="false"
        >

        <div id="hp">

            HP:

            <span id="vidaJogador">
                ${Batalha.jogador.hp}
            </span>

            /

            ${Batalha.jogador.hpMax}

        </div>


        <div id="hpMascara">

            MÁSCARA:

            <span id="vidaMascara">
                ${Mascara.hp}
            </span>

            /

            ${Mascara.hpMax}

        </div>


        <div id="faseMascara">

            FASE ${Mascara.fase}

        </div>


        <div id="controleMobile">

            <button id="botaoAtaque">
                🩸
            </button>

        </div>

    `;


    // =========================
    // PEGAR ELEMENTOS
    // =========================

    this.mascara =
        document.getElementById("mascara");


    this.jogador =
        document.getElementById("jogador");


    this.hp =
        document.getElementById("vidaJogador");


    this.hpMascara =
        document.getElementById("vidaMascara");


    this.faseMascara =
        document.getElementById("faseMascara");


    this.spriteMascara =
        Mascara.sprite;


    this.spriteJogador =
        Batalha.jogador.sprite;


    // =========================
    // BOTÃO DE ATAQUE
    // =========================

    const botao =
        document.getElementById("botaoAtaque");


    if (botao) {

        botao.addEventListener(
            "touchstart",
            e => {

                e.preventDefault();

                Movimento.atacar();

            }
        );


        botao.addEventListener(
            "mousedown",
            e => {

                e.preventDefault();

                Movimento.atacar();

            }
        );

    }


    this.atualizar();

},


// =========================
// ATUALIZAR
// =========================

atualizar() {

    const arena =
        document.getElementById("arena");


    if (!arena)
        return;


    const mobile =
        /Android|iPhone|iPad|iPod/i
            .test(navigator.userAgent);


    // =========================
    // CÂMERA
    // =========================

    if (!mobile) {

        const cameraX =
            Math.max(

                0,

                Math.min(

                    Batalha.jogador.x -
                    window.innerWidth / 2,

                    Math.max(
                        0,
                        CenarioMascara.largura -
                        window.innerWidth
                    )

                )

            );


        const cameraY =
            Math.max(

                0,

                Math.min(

                    Batalha.jogador.y -
                    window.innerHeight / 2,

                    Math.max(
                        0,
                        CenarioMascara.altura -
                        window.innerHeight
                    )

                )

            );


        arena.scrollLeft =
            cameraX;


        arena.scrollTop =
            cameraY;

    }


    // =========================
    // MÁSCARA
    // =========================

    if (this.mascara) {


        if (
            this.spriteMascara !==
            Mascara.sprite
        ) {

            this.spriteMascara =
                Mascara.sprite;


            this.mascara.src =
                Mascara.sprite;

        }


        this.mascara.style.position =
            "absolute";


        this.mascara.style.left =
            Mascara.x + "px";


        this.mascara.style.top =
            Mascara.y + "px";


        this.mascara.style.width =
            CenarioMascara.mascara.largura +
            "px";


        this.mascara.style.height =
            CenarioMascara.mascara.altura +
            "px";


        this.mascara.style.imageRendering =
            "pixelated";


        this.mascara.style.zIndex =
            "10";

    }


    // =========================
    // JOGADOR
    // =========================

    if (this.jogador) {


        if (
            this.spriteJogador !==
            Batalha.jogador.sprite
        ) {

            this.spriteJogador =
                Batalha.jogador.sprite;


            this.jogador.src =
                Batalha.jogador.sprite;

        }


        this.jogador.style.position =
            "absolute";


        this.jogador.style.imageRendering =
            "pixelated";


        this.jogador.style.left =
            Batalha.jogador.x + "px";


        this.jogador.style.top =
            Batalha.jogador.y + "px";


        this.jogador.style.zIndex =
            "11";


        // =========================
        // TAMANHO DO JOGADOR
        // =========================

        if (Movimento.atacando) {

            this.jogador.style.width =
                (
                    CenarioMascara.jogador.largura +
                    40
                ) + "px";


            this.jogador.style.height =
                (
                    CenarioMascara.jogador.altura +
                    40
                ) + "px";

        }

        else {

            this.jogador.style.width =
                CenarioMascara.jogador.largura +
                "px";


            this.jogador.style.height =
                CenarioMascara.jogador.altura +
                "px";

        }


        // =========================
        // HP JOGADOR
        // =========================

        if (this.hp) {

            this.hp.textContent =
                Batalha.jogador.hp;

        }


        // =========================
        // HP MÁSCARA
        // =========================

        if (this.hpMascara) {

            this.hpMascara.textContent =
                Mascara.hp;

        }


        // =========================
        // FASE
        // =========================

        if (this.faseMascara) {

            this.faseMascara.textContent =
                "FASE " +
                Mascara.fase;

        }

    }

}

};