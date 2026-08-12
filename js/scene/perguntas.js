const Perguntas = {

    // =====================================================
    // 1. O QUE MORRE PRIMEIRO?
    // =====================================================

    corpo: {

        pergunta: {

            titulo: "O Que Morre Primeiro?",

            mensagem: "",

            opcoes: [
                "O Corpo.",
                "O Nome.",
                "A Memória.",
                "Nada Morre."
            ]

        },

        respostas: [

            {
                titulo: "O Corpo.",

                mensagens: [
                    "Interessante.",
                    "Você acredita que aquilo que pode ser tocado é também aquilo que pode ser perdido.",
                    "Mas um corpo sem nome ainda é alguém?",
                    "Talvez você esteja pensando apenas no fim."
                ],

                proxima: "corpo_controle"
            },

            {
                titulo: "O Nome.",

                mensagens: [
                    "O Nome.",
                    "Então é isso que você considera mais frágil.",
                    "Não a carne.",
                    "Não os ossos.",
                    "Aquilo que os outros usam para chamar você.",
                    "E se ninguém mais lembrasse desse nome?"
                ],

                proxima: "nome_esquecido"
            },

            {
                titulo: "A Memória.",

                mensagens: [
                    "Você não hesitou.",
                    "Talvez porque saiba que uma pessoa pode continuar respirando...",
                    "...mesmo depois de perder tudo aquilo que a fazia ser ela.",
                    "Então me diga."
                ],

                proxima: "memoria_identidade"
            },

            {
                titulo: "Nada Morre.",

                mensagens: [
                    "Uma resposta curiosa.",
                    "Talvez seja esperança.",
                    "Talvez seja medo.",
                    "Ou talvez você simplesmente não aceite que alguma coisa possa terminar.",
                    "Mas tudo aquilo que permanece precisa carregar alguma coisa consigo."
                ],

                proxima: "nada_levar"
            }

        ]

    },


    // =====================================================
    // 2. QUANDO O CORPO DEIXA DE SER SEU?
    // =====================================================

    corpo_controle: {

        pergunta: {

            titulo: "Quando O Corpo Deixa De Ser Seu?",

            mensagem: "",

            opcoes: [
                "Quando ele morre.",
                "Quando deixa de obedecer.",
                "Quando outra pessoa decide por ele.",
                "Nunca deixou de ser meu."
            ]

        },

        respostas: [

            {
                titulo: "Quando ele morre.",

                mensagens: [
                    "Então, para você, o corpo deixa de pertencer a alguém quando a vida o abandona.",
                    "Mas e se a pessoa ainda estiver lá?",
                    "Sem poder mover um dedo sequer."
                ],

                proxima: "verdade"
            },

            {
                titulo: "Quando deixa de obedecer.",

                mensagens: [
                    "Interessante.",
                    "Então talvez você não considere o corpo uma parte completa de quem você é.",
                    "Talvez seja apenas aquilo que você usa para existir."
                ],

                proxima: "verdade"
            },

            {
                titulo: "Quando outra pessoa decide por ele.",

                mensagens: [
                    "Então liberdade importa mais do que carne.",
                    "Uma pessoa pode continuar respirando...",
                    "...e ainda assim já não possuir a própria vida."
                ],

                proxima: "verdade"
            },

            {
                titulo: "Nunca deixou de ser meu.",

                mensagens: [
                    "Nunca?",
                    "Mesmo quando ele falha?",
                    "Mesmo quando ele muda sem sua permissão?",
                    "Mesmo quando deixa de parecer com aquilo que você conhecia?"
                ],

                proxima: "verdade"
            }

        ]

    },


    // =====================================================
    // 3. SE TODOS ESQUECESSEM SEU NOME
    // =====================================================

    nome_esquecido: {

        pergunta: {

            titulo: "Se Todos Esquecessem Seu Nome...",

            mensagem: "",

            opcoes: [
                "Eu ainda saberia quem sou.",
                "Eu escolheria outro.",
                "Eu tentaria lembrá-los.",
                "Talvez eu desaparecesse junto."
            ]

        },

        respostas: [

            {
                titulo: "Eu ainda saberia quem sou.",

                mensagens: [
                    "Então seu nome não é aquilo que define você.",
                    "Mesmo sem ninguém para dizê-lo...",
                    "...você continuaria existindo."
                ],

                proxima: "verdade"
            },

            {
                titulo: "Eu escolheria outro.",

                mensagens: [
                    "Outro nome.",
                    "Talvez seja mais fácil começar de novo quando ninguém sabe quem você era."
                ],

                proxima: "verdade"
            },

            {
                titulo: "Eu tentaria lembrá-los.",

                mensagens: [
                    "Você lutaria contra o esquecimento.",
                    "Mesmo que precisasse gritar seu próprio nome para alguém que já não consegue reconhecê-lo."
                ],

                proxima: "verdade"
            },

            {
                titulo: "Talvez eu desaparecesse junto.",

                mensagens: [
                    "Talvez.",
                    "Porque, para algumas pessoas...",
                    "ser lembrado é quase a mesma coisa que existir."
                ],

                proxima: "verdade"
            }

        ]

    },


    // =====================================================
    // 4. SE VOCÊ ESQUECESSE QUEM É
    // =====================================================

    memoria_identidade: {

        pergunta: {

            titulo: "Se Você Esquecesse Quem É, Ainda Seria Você?",

            mensagem: "",

            opcoes: [
                "Sim.",
                "Não.",
                "Não Sei.",
                "Não sei quem sou."
            ]

        },

        respostas: [

            {
                titulo: "Sim.",

                mensagens: [
                    "Sim.",
                    "Então você acredita que existe alguma coisa dentro de você que permanece...",
                    "...mesmo quando todas as lembranças desaparecem."
                ],

                proxima: "verdade"
            },

            {
                titulo: "Não.",

                mensagens: [
                    "Não.",
                    "Então talvez você seja feito daquilo que lembra.",
                    "Se as memórias desaparecem...",
                    "o que exatamente sobra?"
                ],

                proxima: "verdade"
            },

            {
                titulo: "Não Sei.",

                mensagens: [
                    "Não sabe.",
                    "Talvez seja a resposta mais honesta.",
                    "Afinal...",
                    "como ter certeza de quem você é quando nem mesmo consegue lembrar?"
                ],

                proxima: "verdade"
            },

            {
                titulo: "",

                mensagens: [],

                fechar: true
            }

        ]

    },


    // =====================================================
    // 5. O QUE VOCÊ LEVARIA?
    // =====================================================

    nada_levar: {

        pergunta: {

            titulo: "O Que Você Levaria Se Tudo Fosse Embora?",

            mensagem: "",

            opcoes: [
                "Meu Nome.",
                "Minhas Memórias.",
                "Alguém.",
                "Nada."
            ]

        },

        respostas: [

            {
                titulo: "Meu Nome.",

                mensagens: [
                    "Mesmo quando tudo desaparecer...",
                    "você ainda quer deixar uma palavra para trás.",
                    "Talvez seja o suficiente."
                ],

                proxima: "verdade"
            },

            {
                titulo: "Minhas Memórias.",

                mensagens: [
                    "Então você prefere carregar o passado...",
                    "Mesmo sabendo o quanto ele pode pesar."
                ],

                proxima: "verdade"
            },

            {
                titulo: "Alguém.",

                mensagens: [
                    "Alguém.",
                    "Não importa o que aconteça com você...",
                    "essa pessoa ainda vale mais do que tudo aquilo que possui."
                ],

                proxima: "verdade"
            },

            {
                titulo: "Nada.",

                mensagens: [
                    "Nada.",
                    "Talvez você tenha entendido algo que os outros ainda não entenderam.",
                    "Algumas coisas não podem ser levadas."
                ],

                proxima: "verdade"
            }

        ]

    },


    // =====================================================
    // 6. QUAL VERDADE MAIS TE ASSUSTA?
    // =====================================================

    verdade: {

        pergunta: {

            titulo: "Qual Verdade Mais Te Assusta?",

            mensagem: "",

            opcoes: [
                "Ser Esquecido.",
                "Nunca Ser Perdoado.",
                "Nunca Mudar.",
                "Saber Demais."
            ]

        },

        respostas: [

            {
                titulo: "Ser Esquecido.",

                mensagens: [
                    "Então você não teme morrer.",
                    "Teme que ninguém perceba que esteve aqui.",
                    "Talvez seja por isso que ainda esteja respondendo."
                ],

                proxima: "lembrado"
            },

            {
                titulo: "Nunca Ser Perdoado.",

                mensagens: [
                    "Então existe algo que você ainda carrega.",
                    "Algo que não terminou.",
                    "Algo que talvez nem devesse ter começado.",
                    "Você se arrepende?"
                ],

                proxima: "arrependimento"
            },

            {
                titulo: "Nunca Mudar.",

                mensagens: [
                    "Engraçado.",
                    "A maioria das pessoas teme aquilo que pode se tornar.",
                    "Você teme permanecer aquilo que já é."
                ],

                proxima: "mudanca"
            },

            {
                titulo: "Saber Demais.",

                mensagens: [
                    "Finalmente.",
                    "Uma resposta honesta.",
                    "Porque algumas verdades não libertam ninguém.",
                    "Algumas apenas retiram o direito de continuar acreditando.",
                    "Você ainda quer descobrir?"
                ],

                proxima: "verdade_final"
            }

        ]

    },


    // =====================================================
    // 7. SER ESQUECIDO
    // =====================================================

    lembrado: {

        pergunta: {

            titulo: "Se Ninguém Lembrasse De Você...",

            mensagem: "",

            opcoes: [
                "Eu ainda teria vivido.",
                "Eu tentaria ser lembrado.",
                "Eu não suportaria.",
                "Não faria diferença."
            ]

        },

        respostas: [

            {
                titulo: "Eu ainda teria vivido.",

                mensagens: [
                    "Mesmo sem testemunhas.",
                    "Então sua existência não depende da memória dos outros."
                ],

                proxima: "ultima"
            },

            {
                titulo: "Eu tentaria ser lembrado.",

                mensagens: [
                    "Então talvez seja isso que você procura.",
                    "Não a vida eterna.",
                    "Apenas a certeza de que esteve aqui."
                ],

                proxima: "ultima"
            },

            {
                titulo: "Eu não suportaria.",

                mensagens: [
                    "Então ser esquecido seria pior do que morrer.",
                    "Interessante."
                ],

                proxima: "ultima"
            },

            {
                titulo: "Não faria diferença.",

                mensagens: [
                    "Não faria?",
                    "Talvez você realmente não precise daquilo que os outros pensam de você."
                ],

                proxima: "ultima"
            }

        ]

    },


    // =====================================================
    // 8. ARREPENDIMENTO
    // =====================================================

    arrependimento: {

        pergunta: {

            titulo: "Você Se Arrepende?",

            mensagem: "",

            opcoes: [
                "Sim.",
                "Não.",
                "Não Sei.",
                "Eu Não Me Arrependo De Nada."
            ]

        },

        respostas: [

            {
                titulo: "Sim.",

                mensagens: [
                    "Então existe algo que você mudaria...",
                    "se tivesse a oportunidade."
                ],

                proxima: "ultima"
            },

            {
                titulo: "Não.",

                mensagens: [
                    "Não?",
                    "Então talvez você aceite tudo aquilo que fez como parte de quem se tornou."
                ],

                proxima: "ultima"
            },

            {
                titulo: "Não Sei.",

                mensagens: [
                    "Talvez você ainda não tenha encontrado aquilo que realmente lamenta."
                ],

                proxima: "ultima"
            },

            {
                titulo: "Eu Não Me Arrependo De Nada.",

                mensagens: [
                    "Uma resposta muito segura.",
                    "Quase segura demais."
                ],

                proxima: "ultima"
            }

        ]

    },


    // =====================================================
    // 9. NUNCA MUDAR
    // =====================================================

    mudanca: {

        pergunta: {

            titulo: "Você Acredita Que Uma Memória Pode Matar?",

            mensagem: "",

            opcoes: [
                "Sim.",
                "Não.",
                "Ainda Não Sei."
            ]

        },

        respostas: [

            {
                titulo: "Sim.",

                mensagens: [
                    "Então você entende.",
                    "Algumas coisas não precisam tocar seu corpo para machucar.",
                    "Basta lembrar."
                ],

                proxima: "lembranca"
            },

            {
                titulo: "Não.",

                mensagens: [
                    "Você acredita que uma lembrança é apenas uma lembrança.",
                    "Um pedaço do passado.",
                    "Espero que continue pensando assim."
                ],

                proxima: "passado"
            },

            {
                titulo: "Ainda Não Sei.",

                mensagens: [
                    "Talvez seja a resposta mais honesta que você deu até agora.",
                    "Como ter certeza de algo que você não consegue lembrar?"
                ],

                proxima: "duvida"
            }

        ]

    },


    // =====================================================
    // 10. SABER DEMAIS
    // =====================================================

    verdade_final: {

        pergunta: {

            titulo: "Se A Verdade Destruísse Tudo Aquilo Em Que Você Acredita...",

            mensagem: "",

            opcoes: [
                "Eu ainda escolheria a verdade.",
                "Eu escolheria continuar acreditando.",
                "Eu fugiria.",
                "Eu não sei."
            ]

        },

        respostas: [

            {
                titulo: "Eu ainda escolheria a verdade.",

                mensagens: [
                    "Mesmo que ela destrua tudo?",
                    "Então talvez você seja mais corajoso do que deveria."
                ],

                proxima: "ultima"
            },

            {
                titulo: "Eu escolheria continuar acreditando.",

                mensagens: [
                    "Então algumas mentiras podem ser melhores do que certas verdades."
                ],

                proxima: "ultima"
            },

            {
                titulo: "Eu fugiria.",

                mensagens: [
                    "Fugir também é uma escolha.",
                    "Talvez você simplesmente não queira descobrir o que existe do outro lado."
                ],

                proxima: "ultima"
            },

            {
                titulo: "Eu não sei.",

                mensagens: [
                    "Não sabe.",
                    "Talvez ainda exista alguma coisa que você não está pronto para descobrir."
                ],

                proxima: "ultima"
            }

        ]

    },


    // =====================================================
    // 11. MEMÓRIA QUE PODE MATAR
    // =====================================================

    lembranca: {

        pergunta: {

            titulo: "Qual Lembrança Você Mais Teme Recuperar?",

            mensagem: "",

            opcoes: [
                "A Primeira.",
                "A Última.",
                "Aquela Que Esqueci.",
                "Aquela Que Nunca Aconteceu."
            ]

        },

        respostas: [

            {
                titulo: "A Primeira.",

                mensagens: [
                    "A primeira lembrança.",
                    "Talvez seja onde tudo começou."
                ],

                proxima: "ultima"
            },

            {
                titulo: "A Última.",

                mensagens: [
                    "A última.",
                    "Então talvez você tenha medo daquilo que ainda está por acontecer."
                ],

                proxima: "ultima"
            },

            {
                titulo: "Aquela Que Esqueci.",

                mensagens: [
                    "Uma lembrança esquecida.",
                    "Curioso.",
                    "Como você pode temer algo que nem consegue lembrar?"
                ],

                proxima: "ultima"
            },

            {
                titulo: "Aquela Que Nunca Aconteceu.",

                mensagens: [
                    "Então você teme até aquilo que poderia ter sido."
                ],

                proxima: "ultima"
            }

        ]

    },


    // =====================================================
    // 12. O PASSADO
    // =====================================================

    passado: {

        pergunta: {

            titulo: "Se O Passado Voltasse Para Você...",

            mensagem: "",

            opcoes: [
                "Eu O Enfrentaria.",
                "Eu Fugiria.",
                "Eu Fingiria Que Não Aconteceu.",
                "Eu Aceitaria."
            ]

        },

        respostas: [

            {
                titulo: "Eu O Enfrentaria.",

                mensagens: [
                    "Então você não pretende fugir daquilo que já aconteceu."
                ],

                proxima: "ultima"
            },

            {
                titulo: "Eu Fugiria.",

                mensagens: [
                    "Às vezes fugir é mais fácil do que olhar para aquilo que ficou para trás."
                ],

                proxima: "ultima"
            },

            {
                titulo: "Eu Fingiria Que Não Aconteceu.",

                mensagens: [
                    "Fingir também é uma forma de lembrar.",
                    "Você só precisa fingir que esqueceu."
                ],

                proxima: "ultima"
            },

            {
                titulo: "Eu Aceitaria.",

                mensagens: [
                    "Aceitar o passado não significa gostar dele.",
                    "Significa continuar carregando-o."
                ],

                proxima: "ultima"
            }

        ]

    },


    // =====================================================
    // 13. A DÚVIDA
    // =====================================================

    duvida: {

        pergunta: {

            titulo: "E Se A Sua Dúvida Fosse Uma Lembrança?",

            mensagem: "",

            opcoes: [
                "Eu Tentaria Lembrar.",
                "Eu Esqueceria De Propósito.",
                "Eu Perguntaria A Alguém.",
                "Eu Não Confiaria Em Ninguém."
            ]

        },

        respostas: [

            {
                titulo: "Eu Tentaria Lembrar.",

                mensagens: [
                    "Mesmo que a lembrança pudesse machucar?"
                ],

                proxima: "ultima"
            },

            {
                titulo: "Eu Esqueceria De Propósito.",

                mensagens: [
                    "Então talvez esquecer seja uma escolha."
                ],

                proxima: "ultima"
            },

            {
                titulo: "Eu Perguntaria A Alguém.",

                mensagens: [
                    "E se essa pessoa estivesse mentindo?"
                ],

                proxima: "ultima"
            },

            {
                titulo: "Eu Não Confiaria Em Ninguém.",

                mensagens: [
                    "Nem mesmo em mim?"
                ],

                proxima: "ultima"
            }

        ]

    },


    // =====================================================
    // 14. ÚLTIMA PERGUNTA
    // =====================================================

    ultima: {

        pergunta: {

            titulo: "Quando Você Fechar Os Olhos Pela Última Vez?",

            mensagem: "",

            opcoes: [
                "Quero Paz.",
                "Quero Respostas.",
                "Quero Ser Lembrado.",
                "Não Sei."
            ]

        },

        respostas: [

            {
                titulo: "Quero Paz.",

                mensagens: [
                    "Paz.",
                    "Então você já está cansado.",
                    "Talvez mais do que admite.",
                    "Mas paz não é necessariamente o fim da dor.",
                    "Às vezes...",
                    "é apenas parar de procurar."
                ],

                proxima: "final"
            },

            {
                titulo: "Quero Respostas.",

                mensagens: [
                    "Respostas.",
                    "Mesmo sabendo que algumas perguntas não possuem respostas?",
                    "Mesmo sabendo que algumas verdades poderiam ser piores?",
                    "Você ainda quer saber?"
                ],

                proxima: "final"
            },

            {
                titulo: "Quero Ser Lembrado.",

                mensagens: [
                    "Ser lembrado.",
                    "Então talvez seja isso que você realmente procura.",
                    "Não a vida eterna.",
                    "Não a imortalidade.",
                    "Apenas a certeza de que...",
                    "você esteve aqui."
                ],

                proxima: "final"
            },

            {
                titulo: "Não Sei.",

                mensagens: [
                    "Não sabe.",
                    "...",
                    "Pela primeira vez...",
                    "talvez você não precise saber.",
                    "Mas eu sei."
                ],

                proxima: "final"
            }

        ]

    },


    // =====================================================
    // 15. FINAL
    // =====================================================

    final: {

        mensagens: [
            "Interessante...",
            "Excelente.",
            "Obrigado, Máscara.",
            "Com tua ajuda... Seremos Melhores.",
            "Venha.",
            "Vamos Em Busca Do IMPOSSÍVEL."
        ],

        imagem: "assets/imagens/TENEBRIS.jpg",
        som: "assets/audio/CHAMADO.mp3",

        finalizar: true

    }

};


console.log("PERGUNTAS CARREGADAS");
console.log(Perguntas);