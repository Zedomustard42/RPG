const Introducao = [

    {
        id: "pergunta",

        tipo: "menu",

        titulo: "Olá...?",

        mensagem: "Você Consegue Me Escutar?",

        opcoes: [
            "SIM",
            "NÃO"
        ]

    },


    {
        id: "sim",

        tipo: "texto",

        titulo: "Bom...",

        mensagem: "Muito Bom."

    },


    {
        id: "continuacao",

        tipo: "texto",

        titulo: "Então...",

        mensagem: "Devemos Começar."

    },


    {
        id: "proximo",

        tipo: "entrada",

        entrada: "pessoa",

        titulo: "Primeiro...",

        mensagem: "Quem Está Por Trás Disto?"

    },


    {
        id: "criacao",

        tipo: "entrada",

        entrada: "criacao",

        titulo: "Agora...",

        mensagem: "Qual O Nome Da Sua Criação?"

    }

];



const CenaNao = {

    id: "nao",

    tipo: "texto",

    titulo: "...",

    mensagem: " "

};

console.log("INTRODUCAO CARREGADA");
console.log(Introducao);