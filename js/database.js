const Pessoas = {

    "maria vitória": {

    falas: [

        "...",

        "Interessante.",

        "<vermelho>Verdadeiramente... Interessante.</vermelho>",


    ],

    fechar: false,

    continuar: true

},
    "mariane ameli": {

        falas: [
            "Boa sorte."
        ],

        audio: "Ameli",

        fechar: false,

        continuar: true

    },

    "rebeca araújo": {

        falas: [
            "Boa sorte."
        ],

        audio: "Ameli",

        fechar: false,

        continuar: true

    },

    "joão guilherme": {

        falas: [
            "..."
        ],

        audio: "novamente",

        fechar: true,

        continuar: false

    },

    "gabriel araújo": {

        falas: [
            "Não Agora."
        ],

        fechar: true,

        continuar: false

    },

    "arthur jonas": {

        falas: [
            "Não Agora."
        ],

        fechar: true,

        continuar: false

    },

    "arthur kaio": {

        falas: [
            "Arthur Kaio?",
            "Que Nome Familiar."
        ],

        fechar: false,

        continuar: true

    },

    "isabella laís": {

        falas: [
            "Bem-Vinda De Volta."
        ],

        fechar: false,

        continuar: true

    },

    "filipe costa": {

        falas: [
            "Novamente?",
            "Interessante...",
            "Que Interessante."
        ],

        audio: "novamente",

        fechar: false,

        continuar: false

    }

};

const Criacao = {

    verificar(nome) {

        nome = nome.toLowerCase().trim();


        if(nome === "bruno") {

            return "boss";

        }


        if(nome === "ash natori") {

            return "fechar";

        }


        if(nome === "roger") {

            return "roger";

        }


        return "normal";

    }

};