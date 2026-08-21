const Movimento = {

    teclas: {},

    atacando: false,

    tempoAtaque: 300,

    alcanceAtaque: 80,

    danoAtaque: 15,

    iniciado: false,


    // =========================
    // INICIAR
    // =========================

    iniciar() {

        if (this.iniciado)
            return;


        this.iniciado = true;


        // O teclado físico é centralizado pelo Input.js.
        // Movimento apenas consome this.teclas.

        console.log(
            "MOVIMENTO INICIADO"
        );

    },


    // =========================
    // ATAQUE
    // =========================

    atacar() {

        if (this.atacando)
            return;


        if (!Batalha.ativa)
            return;


        this.atacando = true;


        const jogador =
            Batalha.jogador;


        jogador.sprite =
            `assets/imagens/ra_atacando_${jogador.direcao}.png`;


        // Verifica se acertou

        this.verificarAcerto();


        setTimeout(() => {

            this.atacando = false;


            jogador.sprite =
                `assets/imagens/ra_${jogador.direcao}.png`;


        }, this.tempoAtaque);

    },


    // =========================
    // VERIFICAR ATAQUE
    // =========================

    verificarAcerto() {

        const jogador =
            Batalha.jogador;


        const jogadorX =
            jogador.x + 25;


        const jogadorY =
            jogador.y + 25;


        const mascaraX =
            Mascara.x +
            Mascara.hitbox.offsetX +
            Mascara.hitbox.largura / 2;


        const mascaraY =
            Mascara.y +
            Mascara.hitbox.offsetY +
            Mascara.hitbox.altura / 2;


        const dx =
            mascaraX - jogadorX;


        const dy =
            mascaraY - jogadorY;


        let acertou = false;


        switch (jogador.direcao) {


            // PARA BAIXO

            case "frente":

                acertou =
                    dy > 0 &&
                    Math.abs(dx) < 45 &&
                    dy < this.alcanceAtaque;

                break;


            // PARA CIMA

            case "atras":

                acertou =
                    dy < 0 &&
                    Math.abs(dx) < 45 &&
                    Math.abs(dy) < this.alcanceAtaque;

                break;


            // ESQUERDA

            case "esquerdo":

                acertou =
                    dx < 0 &&
                    Math.abs(dy) < 45 &&
                    Math.abs(dx) < this.alcanceAtaque;

                break;


            // DIREITA

            case "direito":

                acertou =
                    dx > 0 &&
                    Math.abs(dy) < 45 &&
                    Math.abs(dx) < this.alcanceAtaque;

                break;

        }


        if (acertou) {

            console.log(
                "ATAQUE ACERTOU!"
            );


            Batalha.danoMascara(
                this.danoAtaque
            );

        }

        else {

            console.log(
                "ATAQUE ERROU"
            );

        }

    },


    // =========================
    // ATUALIZAR MOVIMENTO
    // =========================

    atualizar() {

        if (!Batalha.ativa)
            return;


        const jogador =
            Batalha.jogador;


        let dx = 0;
        let dy = 0;


        // =========================
        // CIMA
        // =========================

        if (
            this.teclas["ArrowUp"] ||
            this.teclas["w"] ||
            this.teclas["W"]
        ) {

            dy = -1;

            jogador.direcao =
                "atras";

        }


        // =========================
        // BAIXO
        // =========================

        if (
            this.teclas["ArrowDown"] ||
            this.teclas["s"] ||
            this.teclas["S"]
        ) {

            dy = 1;

            jogador.direcao =
                "frente";

        }


        // =========================
        // ESQUERDA
        // =========================

        if (
            this.teclas["ArrowLeft"] ||
            this.teclas["a"] ||
            this.teclas["A"]
        ) {

            dx = -1;

            jogador.direcao =
                "esquerdo";

        }


        // =========================
        // DIREITA
        // =========================

        if (
            this.teclas["ArrowRight"] ||
            this.teclas["d"] ||
            this.teclas["D"]
        ) {

            dx = 1;

            jogador.direcao =
                "direito";

        }


        // =========================
        // DIAGONAL
        // =========================

        if (
            dx !== 0 &&
            dy !== 0
        ) {

            dx *= 0.707;

            dy *= 0.707;

        }


        // =========================
        // NOVA POSIÇÃO
        // =========================

        const novoX =
            jogador.x +
            dx * jogador.velocidade;


        const novoY =
            jogador.y +
            dy * jogador.velocidade;


        // =========================
        // TAMANHO DO JOGADOR
        // =========================

        const tamanhoJogador =
            CenarioMascara.jogador.largura;


        // =========================
        // COLISÃO HORIZONTAL
        // =========================

        if (
            this.podeAndar(
                novoX,
                jogador.y,
                tamanhoJogador
            )
        ) {

            jogador.x =
                novoX;

        }


        // =========================
        // COLISÃO VERTICAL
        // =========================

        if (
            this.podeAndar(
                jogador.x,
                novoY,
                tamanhoJogador
            )
        ) {

            jogador.y =
                novoY;

        }


        // =========================
        // SPRITE
        // =========================

        if (!this.atacando) {

            jogador.sprite =
                `assets/imagens/ra_${jogador.direcao}.png`;

        }

    },


    // =========================
    // PODE ANDAR
    // =========================

    podeAndar(x, y, tamanho) {

        // =========================
        // LIMITES DA ARENA
        // =========================

        if (x < 0)
            return false;


        if (
            x + tamanho >
            CenarioMascara.largura
        )
            return false;


        if (y < 0)
            return false;


        if (
            y + tamanho >
            CenarioMascara.altura
        )
            return false;


        // =========================
        // PILARES
        // =========================

        if (
            CenarioMascara.colidiuComPilar(
                x,
                y,
                tamanho
            )
        ) {

            return false;

        }


        // =========================
        // PODE ANDAR
        // =========================

        return true;

    }

};