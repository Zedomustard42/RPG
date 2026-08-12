const UI = {

    gameOverAtivo: false,


    // =====================================================
    // TRANSFORMAR HTML EM LETRAS
    // =====================================================

    transformarMensagemHTML(html){

        const div = document.createElement("div");

        div.innerHTML = html;


        const percorrer = (no) => {

            if(no.nodeType === 3){

                return no.textContent
                    .split("")
                    .map(letra => {

                        if(letra === " "){
                            return " ";
                        }


                        const duracao =
                            (Math.random() * 0.8 + 0.8)
                            .toFixed(2);

                        const atraso =
                            (Math.random() * 0.6)
                            .toFixed(2);


                        return `<span class="letra" style="animation-duration:${duracao}s;animation-delay:${atraso}s">${letra}</span>`;

                    })
                    .join("");

            }


            if(no.nodeType === 1){

                const filhos =
                    [...no.childNodes]
                    .map(percorrer)
                    .join("");


                const classe =
                    no.className
                        ? ` class="${no.className}"`
                        : "";


                return `<${no.tagName.toLowerCase()}${classe}>${filhos}</${no.tagName.toLowerCase()}>`;

            }


            return "";

        };


        return [...div.childNodes]
            .map(percorrer)
            .join("");

    },


    // =====================================================
    // TRANSFORMAR MENSAGEM
    // =====================================================

    transformarMensagem(texto){

        if(!texto)
            texto = "";


        texto = texto.replace(
            /<vermelho>(.*?)<\/vermelho>/g,
            '<span class="texto-vermelho">$1</span>'
        );


        return this.transformarMensagemHTML(texto);

    },


    // =====================================================
    // LIMPAR
    // =====================================================

    limpar(){

        const game =
            document.getElementById("game");


        if(game){

            game.innerHTML = "";

        }

    },


    // =====================================================
    // TEXTO
    // =====================================================

    texto(titulo, mensagem, aviso = false){

        this.limpar();


        const game =
            document.getElementById("game");


        if(!game)
            return;


        const caixa =
            document.createElement("div");


        caixa.className =
            "caixa-texto";


        if(aviso){

            caixa.classList.add("aviso");

        }


        caixa.innerHTML = `

            <div class="titulo">

                ${this.transformarMensagem(titulo)}

            </div>

            <div class="mensagem">

                ${this.transformarMensagem(mensagem)}

            </div>

        `;


        game.appendChild(caixa);

    },


    // =====================================================
    // MENU
    // =====================================================

    criarMenu(
        titulo,
        mensagem,
        opcoes,
        selecionado = 0
    ){

        this.limpar();


        const game =
            document.getElementById("game");


        if(!game)
            return;


        const caixa =
            document.createElement("div");


        caixa.className =
            "caixa-texto";


        caixa.innerHTML = `

            <div class="titulo">

                ${this.transformarMensagem(titulo)}

            </div>

            <div class="mensagem">

                ${this.transformarMensagem(mensagem)}

            </div>

            <div class="opcoes"></div>

        `;


        const lista =
            caixa.querySelector(".opcoes");


        opcoes.forEach((texto, index) => {

            const item =
                document.createElement("div");


            item.className =
                "opcao";


            item.innerHTML =
                index === selecionado
                    ? "♥ " + texto
                    : texto;


            lista.appendChild(item);

        });


        game.appendChild(caixa);

    },


    // =====================================================
    // ATUALIZAR MENU
    // =====================================================

    atualizarMenu(selecionado){

        const opcoes =
            document.querySelectorAll(".opcao");


        opcoes.forEach((item, index) => {

            const texto =
                item.innerText
                    .replace("♥ ", "");


            item.innerHTML =
                index === selecionado
                    ? "♥ " + texto
                    : texto;

        });

    },


    // =====================================================
    // ENTRADA
    // =====================================================

    entrada(titulo, mensagem){

        this.limpar();


        const game =
            document.getElementById("game");


        if(!game)
            return;


        const caixa =
            document.createElement("div");


        caixa.className =
            "caixa-texto";


        caixa.innerHTML = `

            <div class="titulo">

                ${this.transformarMensagem(titulo)}

            </div>

            <div class="mensagem">

                ${this.transformarMensagem(mensagem)}

            </div>

            <div class="entrada">

                > <span id="textoDigitado"></span><span id="cursor">_</span>

            </div>

        `;


        game.appendChild(caixa);

    },


    // =====================================================
    // ATUALIZAR ENTRADA
    // =====================================================

    atualizarEntrada(texto){

        const span =
            document.getElementById("textoDigitado");


        if(span){

            span.textContent =
                texto;

        }

    },


    // =====================================================
    // GAME OVER
    // =====================================================

        // =====================================================
    // TELA FINAL
    // =====================================================

    final(){

        this.limpar();


        const game =
            document.getElementById("game");


        if(!game)
            return;


        game.innerHTML = `

            <div id="final">

                <img
                    id="imagemTenebris"
                    src="assets/imagens/TENEBRIS.jpg"
                >

                <div id="finalTexto"></div>

            </div>

        `;

    },


    // =====================================================
    // TEXTO DO FINAL
    // =====================================================

    finalTexto(texto){

        const elemento =
            document.getElementById("finalTexto");


        if(!elemento)
            return;


        elemento.innerHTML =
            this.transformarMensagem(texto);

    },
    gameOver(){

        this.gameOverAtivo = true;


        this.limpar();


        const game =
            document.getElementById("game");


        if(!game)
            return;


        game.innerHTML = `

            <div id="fadePreto"></div>

            <div id="sangueTopo"></div>

            <div id="sangueBaixo"></div>

            <div id="gameOver">

                <div id="fraseGameOver">

                    <p>Não acabou ainda, Acabou?</p>

                    <p>Você não era fraco assim.</p>

                    <p class="levante">Levante.</p>

                </div>

            </div>

        `;

    },


    // =====================================================
    // ATUALIZAR GAME OVER
    // =====================================================

    atualizarGameOver(){

        const opcoes =
            document.querySelectorAll(
                ".opcaoGameOver"
            );


        opcoes.forEach((o, i) => {

            if(i === Game.gameOverSelecionado){

                o.classList.add(
                    "selecionado"
                );

            }

            else{

                o.classList.remove(
                    "selecionado"
                );

            }

        });

    }

};