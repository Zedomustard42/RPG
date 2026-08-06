const Cenario = {

    // =========================
    // TAMANHO DO MAPA
    // =========================

    largura: 1350,
    altura: 540,


    // =========================
    // ÁREAS BLOQUEADAS
    // =========================

    obstaculos: [

        // Parede de cima
        {
            x: 0,
            y: 0,
            largura: 1350,
            altura: 35
        },

        // Parede de baixo
        {
            x: 0,
            y: 505,
            largura: 1350,
            altura: 35
        },

        // Parede esquerda
        {
            x: 0,
            y: 0,
            largura: 35,
            altura: 540
        },

        // Parede direita
        {
            x: 1315,
            y: 0,
            largura: 35,
            altura: 540
        },


        // =====================
        // ALTAR
        // =====================

        {
            x: 545,
            y: 35,
            largura: 260,
            altura: 100
        },


        // =====================
        // BANCOS ESQUERDOS
        // =====================

        {
            x: 250,
            y: 190,
            largura: 260,
            altura: 45
        },

        {
            x: 250,
            y: 280,
            largura: 260,
            altura: 45
        },

        {
            x: 250,
            y: 370,
            largura: 260,
            altura: 45
        },


        // =====================
        // BANCOS DIREITOS
        // =====================

        {
            x: 840,
            y: 190,
            largura: 260,
            altura: 45
        },

        {
            x: 840,
            y: 280,
            largura: 260,
            altura: 45
        },

        {
            x: 840,
            y: 370,
            largura: 260,
            altura: 45
        }

    ],


    // =========================
    // VERIFICAR COLISÃO
    // =========================

    colidiuComObstaculo(
        x,
        y,
        largura,
        altura
    ) {

        for (
            const obstaculo
            of this.obstaculos
        ) {

            if (

                x <
                obstaculo.x +
                obstaculo.largura

                &&

                x + largura >
                obstaculo.x

                &&

                y <
                obstaculo.y +
                obstaculo.altura

                &&

                y + altura >
                obstaculo.y

            ) {

                return true;

            }

        }

        return false;

    },


    // =========================
    // DENTRO DO MAPA
    // =========================

    dentroDoMapa(
        x,
        y,
        largura,
        altura
    ) {

        if (x < 35)
            return false;

        if (
            x + largura >
            this.largura - 35
        )
            return false;

        if (y < 35)
            return false;

        if (
            y + altura >
            this.altura - 35
        )
            return false;

        return true;

    },


    // =========================
    // PODE ANDAR?
    // =========================

    podeAndar(
        x,
        y,
        largura,
        altura
    ) {

        if (
            !this.dentroDoMapa(
                x,
                y,
                largura,
                altura
            )
        ) {

            return false;

        }


        if (
            this.colidiuComObstaculo(
                x,
                y,
                largura,
                altura
            )
        ) {

            return false;

        }


        return true;

    }

};