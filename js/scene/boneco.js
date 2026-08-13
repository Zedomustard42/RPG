
const Boneco = {

    // =====================================================
    // ESTADO
    // =====================================================

    ativo: false,

    dialogoAtivo: false,

    podeConversar: false,

    etapaDialogo: 0,

    escolha: 0,

    pegouOvo: false,


    // =====================================================
    // INICIAR
    // =====================================================

    iniciar(){

        console.log(
            "☠ BONECO INICIADO ☠"
        );


        this.ativo =
            true;


        this.dialogoAtivo =
            false;

        this.podeConversar =
            false;

        this.etapaDialogo =
            0;

        this.escolha =
            0;


        this.criarInterface();

    },


    // =====================================================
    // INTERFACE
    // =====================================================

    criarInterface(){

        const estilo =
            document.createElement("style");


        estilo.id =
            "boneco-estilo";


        estilo.innerHTML = `

            /* =================================================
               CAIXA DE DIÁLOGO
            ================================================= */

            #bonecoDialogo {

                position: fixed;

                left: 50%;

                bottom: 35px;

                transform:
                    translateX(-50%);

                width:
                    min(1000px, 90vw);

                min-height:
                    145px;

                padding:
                    22px 28px;

                border:
                    4px solid #ffffff;

                background:
                    #000000;

                color:
                    #ffffff;

                font-family:
                    "Determination",
                    Consolas,
                    monospace;

                font-size:
                    28px;

                line-height:
                    1.25;

                z-index:
                    5000;

                image-rendering:
                    pixelated;

            }


            #bonecoDialogo.escondido {

                display:
                    none;

            }


            /* =================================================
               TEXTO
            ================================================= */

            .bonecoTexto {

                margin:
                    0;

                white-space:
                    pre-wrap;

            }


            /* =================================================
               OPÇÕES
            ================================================= */

            .bonecoOpcoes {

                margin-top:
                    16px;

            }


            .bonecoOpcao {

                margin-top:
                    5px;

                white-space:
                    pre;

            }


            /* =================================================
               OBTENÇÃO DO ITEM
            ================================================= */

            #bonecoObtido {

                position:
                    fixed;

                left:
                    50%;

                top:
                    50%;

                transform:
                    translate(-50%, -50%);

                padding:
                    20px 30px;

                border:
                    4px solid white;

                background:
                    black;

                color:
                    white;

                font-family:
                    "Determination",
                    Consolas,
                    monospace;

                font-size:
                    28px;

                z-index:
                    6000;

            }


            #bonecoObtido.escondido {

                display:
                    none;

            }


            /* =================================================
               MOBILE
            ================================================= */

            @media(max-width:700px){

                #bonecoDialogo {

                    width:
                        92vw;

                    bottom:
                        20px;

                    min-height:
                        120px;

                    padding:
                        16px 18px;

                    font-size:
                        21px;

                }

            }

        `;


        document.head.appendChild(
            estilo
        );


        const caixa =
            document.createElement("div");


        caixa.id =
            "bonecoDialogo";


        caixa.className =
            "escondido";


        document.body.appendChild(
            caixa
        );

    },


    // =====================================================
    // TECLA
    // =====================================================

    tecla(tecla){

        if(!this.ativo)
            return;


        // =================================================
        // DIÁLOGO
        // =================================================

        if(this.dialogoAtivo){

            if(
                tecla === "ArrowUp"
            ){

                if(
                    this.etapaDialogo === 3
                ){

                    this.escolha--;

                    if(
                        this.escolha < 0
                    ){

                        this.escolha =
                            1;

                    }

                    this.atualizarEscolha();

                }

                return;

            }


            if(
                tecla === "ArrowDown"
            ){

                if(
                    this.etapaDialogo === 3
                ){

                    this.escolha++;

                    if(
                        this.escolha > 1
                    ){

                        this.escolha =
                            0;

                    }

                    this.atualizarEscolha();

                }

                return;

            }


            if(
                tecla === "Enter"
            ){

                this.avancar();

                return;

            }


            return;

        }


        // =================================================
        // INICIAR
        // =================================================

        if(
            tecla === "Enter" &&
            this.podeConversar
        ){

            this.iniciarDialogo();

        }

    },


    // =====================================================
    // INICIAR DIÁLOGO
    // =====================================================

    iniciarDialogo(){

        if(
            this.dialogoAtivo
        )
            return;


        this.dialogoAtivo =
            true;


        this.escolha =
            0;


        // =================================================
        // JÁ PEGOU
        // =================================================

        if(
            this.pegouOvo
        ){

            this.etapaDialogo =
                99;


            this.mostrar(
                "Bom, não tem ninguém aqui."
            );


            return;

        }


        // =================================================
        // PRIMEIRA FALA
        // =================================================

        this.etapaDialogo =
            0;


        this.mostrar(
            "Bom.... Tem um boneco aqui."
        );

    },


    // =====================================================
    // AVANÇAR
    // =====================================================

    avancar(){

        // =================================================
        // FINAL DO DIÁLOGO PÓS-OVO
        // =================================================

        if(
            this.etapaDialogo === 99
        ){

            this.fechar();

            return;

        }


        // =================================================
        // PRIMEIRA FALA
        // =================================================

        if(
            this.etapaDialogo === 0
        ){

            this.etapaDialogo =
                1;


            this.mostrar(
                "E ele parece feliz em te ver."
            );


            return;

        }


        // =================================================
        // SEGUNDA FALA
        // =================================================

        if(
            this.etapaDialogo === 1
        ){

            this.mostrarOpcoes();

            return;

        }


        // =================================================
        // ESCOLHA
        // =================================================

        if(
            this.etapaDialogo === 3
        ){

            this.confirmarEscolha();

        }

    },


    // =====================================================
    // MOSTRAR
    // =====================================================

    mostrar(texto){

        const caixa =
            document.getElementById(
                "bonecoDialogo"
            );


        if(!caixa)
            return;


        caixa.classList.remove(
            "escondido"
        );


        caixa.innerHTML = `

            <div class="bonecoTexto">

                ${texto}

            </div>

        `;

    },


    // =====================================================
    // OPÇÕES
    // =====================================================

    mostrarOpcoes(){

        const caixa =
            document.getElementById(
                "bonecoDialogo"
            );


        if(!caixa)
            return;


        this.etapaDialogo =
            3;


        this.escolha =
            0;


        caixa.classList.remove(
            "escondido"
        );


        caixa.innerHTML = `

            <div class="bonecoTexto">

                Ele te oferece algo. Pegar?

            </div>


            <div class="bonecoOpcoes">

                <div class="bonecoOpcao">

                    -> SIM

                </div>


                <div class="bonecoOpcao">

                       NÃO

                </div>

            </div>

        `;


        this.atualizarEscolha();

    },


    // =====================================================
    // ESCOLHA
    // =====================================================

    atualizarEscolha(){

        const opcoes =
            document.querySelectorAll(
                ".bonecoOpcao"
            );


        opcoes.forEach(
            (opcao, index) => {

                const nome =
                    index === 0
                        ? "SIM"
                        : "NÃO";


                opcao.textContent =
                    (
                        index ===
                        this.escolha
                    )
                    ? "-> " + nome
                    : "   " + nome;

            }
        );

    },


    // =====================================================
    // CONFIRMAR
    // =====================================================

    confirmarEscolha(){

        // =================================================
        // NÃO
        // =================================================

        if(
            this.escolha === 1
        ){

            this.fechar();

            if(
                typeof Perdido !== "undefined"
            ){

                Perdido.fecharJogo();

            }

            return;

        }


        // =================================================
        // SIM
        // =================================================

        this.pegouOvo =
            true;


        this.dialogoAtivo =
            false;


        this.etapaDialogo =
            0;


        this.mostrarObtido();

    },


    // =====================================================
    // ITEM OBTIDO
    // =====================================================

    mostrarObtido(){

        const caixa =
            document.getElementById(
                "bonecoDialogo"
            );


        if(!caixa)
            return;


        caixa.classList.remove(
            "escondido"
        );


        caixa.innerHTML = `

            <div class="bonecoTexto">

                *Você obteve o "Ovo do Corvo".*

            </div>

        `;


        setTimeout(
            () => {

                if(
                    !this.ativo
                )
                    return;


                this.fechar();

            },
            1200
        );

    },


    // =====================================================
    // FECHAR
    // =====================================================

    fechar(){

        this.dialogoAtivo =
            false;


        this.etapaDialogo =
            0;


        this.escolha =
            0;


        const caixa =
            document.getElementById(
                "bonecoDialogo"
            );


        if(caixa){

            caixa.classList.add(
                "escondido"
            );

            caixa.innerHTML =
                "";

        }

    }

};
