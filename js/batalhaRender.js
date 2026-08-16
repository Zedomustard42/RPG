const BatalhaRender = {

    elementos: {},


    // =====================================================
    // INICIAR
    // =====================================================

    iniciar() {

        const arena =
            document.getElementById(
                "arena"
            );


        if(!arena){

            console.error(
                "ARENA NÃO ENCONTRADA"
            );

            return;

        }


        arena.style.display =
            "block";


        arena.innerHTML = `

            <div id="batalha">

                <!-- ======================================
                     CAMPO
                ======================================= -->

                <div id="campoBatalha">

                    <div
                        id="personagemAsh"
                        class="spriteBatalha"
                    >

                        <img
                            draggable="false"
                            alt=""
                        >

                    </div>


                    <div
                        id="personagemSpike"
                        class="spriteBatalha"
                    >

                        <img
                            draggable="false"
                            alt=""
                        >

                    </div>


                    <div
                        id="personagemManel"
                        class="spriteBatalha"
                    >

                        <img
                            draggable="false"
                            alt=""
                        >

                    </div>

                </div>


                <!-- ======================================
                     HUD
                ======================================= -->

                <div id="hudBatalha">

                    <div id="cabecas">

                        <button
                            class="cabecaPersonagem"
                            data-personagem="ash"
                        >

                            <img
                                src="assets/imagens/batalha_imagens/cabeças/ash_cabeça.png"
                                draggable="false"
                                alt=""
                            >

                            <div class="nomeCabeca">
                                ASH
                            </div>

                            <div class="hpCabeca">

                                <span
                                    id="hpAsh"
                                >
                                    140
                                </span>

                                / 140

                            </div>

                        </button>


                        <button
                            class="cabecaPersonagem"
                            data-personagem="spike"
                        >

                            <img
                                src="assets/imagens/batalha_imagens/cabeças/ovo_cabeça.png"
                                draggable="false"
                                alt=""
                            >

                            <div class="nomeCabeca">
                                SPIKE
                            </div>

                            <div class="hpCabeca">

                                <span
                                    id="hpSpike"
                                >
                                    100
                                </span>

                                / 100

                            </div>

                        </button>


                        <button
                            class="cabecaPersonagem"
                            data-personagem="manel"
                        >

                            <img
                                src="assets/imagens/batalha_imagens/cabeças/manel_cabeça.png"
                                draggable="false"
                                alt=""
                            >

                            <div class="nomeCabeca">
                                MANEL
                            </div>

                            <div class="hpCabeca">

                                <span
                                    id="hpManel"
                                >
                                    190
                                </span>

                                / 190

                            </div>

                        </button>

                    </div>


                    <!-- ==================================
                         COMANDOS
                    =================================== -->

                    <div id="comandosBatalha">

                        <div
                            id="tituloComando"
                        >
                            Manel
                        </div>


                        <div
                            id="listaComandos"
                        ></div>

                    </div>

                </div>

            </div>

        `;


        this.elementos.arena =
            arena;


        this.elementos.batalha =
            document.getElementById(
                "batalha"
            );


        this.elementos.ash =
            document.querySelector(
                "#personagemAsh img"
            );


        this.elementos.spike =
            document.querySelector(
                "#personagemSpike img"
            );


        this.elementos.manel =
            document.querySelector(
                "#personagemManel img"
            );


        this.elementos.hpAsh =
            document.getElementById(
                "hpAsh"
            );


        this.elementos.hpSpike =
            document.getElementById(
                "hpSpike"
            );


        this.elementos.hpManel =
            document.getElementById(
                "hpManel"
            );


        this.configurarCabecas();

        this.atualizar();

        Batalha.loop();

    },


    // =====================================================
    // CABEÇAS
    // =====================================================

    configurarCabecas() {

        const botoes =
            document.querySelectorAll(
                ".cabecaPersonagem"
            );


        botoes.forEach(
            botao => {

                botao.addEventListener(
                    "click",
                    () => {

                        const personagem =
                            botao.dataset.personagem;


                        Batalha.selecionarPersonagem(
                            personagem
                        );

                    }
                );

            }
        );

    },


    // =====================================================
    // ATUALIZAR
    // =====================================================

    atualizar() {

        if(!Batalha.ativa)
            return;


        this.atualizarSprites();

        this.atualizarHP();

        this.atualizarMenu();

        this.atualizarSelecao();

    },


    // =====================================================
    // SPRITES
    // =====================================================

    atualizarSprites() {

        const ash =
            Batalha.personagens.ash;

        const spike =
            Batalha.personagens.spike;

        const manel =
            Batalha.personagens.manel;


        if(this.elementos.ash){

            this.elementos.ash.src =
                ash.spriteAtual;

        }


        if(this.elementos.spike){

            this.elementos.spike.src =
                spike.spriteAtual;

        }


        if(this.elementos.manel){

            this.elementos.manel.src =
                manel.spriteAtual;

        }

    },


    // =====================================================
    // HP
    // =====================================================

    atualizarHP() {

        if(this.elementos.hpAsh){

            this.elementos.hpAsh.textContent =
                Batalha.personagens.ash.hp;

        }


        if(this.elementos.hpSpike){

            this.elementos.hpSpike.textContent =
                Batalha.personagens.spike.hp;

        }


        if(this.elementos.hpManel){

            this.elementos.hpManel.textContent =
                Batalha.personagens.manel.hp;

        }

    },


    // =====================================================
    // MENU
    // =====================================================

    atualizarMenu() {

        const lista =
            document.getElementById(
                "listaComandos"
            );


        const titulo =
            document.getElementById(
                "tituloComando"
            );


        if(!lista || !titulo)
            return;


        const personagem =
            Batalha.personagens[
                Batalha.personagemSelecionado
            ];


        if(!personagem)
            return;


        titulo.textContent =
            personagem.nome;


        lista.innerHTML = "";


        personagem.acoes.forEach(
            acao => {

                const botao =
                    document.createElement(
                        "button"
                    );


                botao.className =
                    "botaoComando";


                botao.textContent =
                    acao;


                botao.addEventListener(
                    "click",
                    () => {

                        Batalha.executarAcao(
                            acao
                        );

                    }
                );


                lista.appendChild(
                    botao
                );

            }
        );

    },


    // =====================================================
    // SELEÇÃO
    // =====================================================

    atualizarSelecao() {

        const botoes =
            document.querySelectorAll(
                ".cabecaPersonagem"
            );


        botoes.forEach(
            botao => {

                if(
                    botao.dataset.personagem ===
                    Batalha.personagemSelecionado
                ){

                    botao.classList.add(
                        "selecionado"
                    );

                }

                else{

                    botao.classList.remove(
                        "selecionado"
                    );

                }

            }
        );

    }

};